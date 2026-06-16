import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

const TARGET_EMAIL = "contacto@daxserdig.site";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action, name, email, company, phone, password } = body || {};

    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { ok: false, error: "El correo electrónico es obligatorio." },
        { status: 400 }
      );
    }

    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "unknown";
    const userAgent = req.headers.get("user-agent") || "unknown";

    // Persistir en la base de datos local
    let userRecord: { id: string; email: string; name?: string | null } | null = null;
    if (action === "register") {
      if (!name || !email) {
        return NextResponse.json(
          { ok: false, error: "Nombre y correo son obligatorios para registrarse." },
          { status: 400 }
        );
      }
      const existing = await db.user.findUnique({ where: { email } });
      if (existing) {
        return NextResponse.json(
          { ok: false, error: "Ya existe una cuenta con este correo." },
          { status: 409 }
        );
      }
      userRecord = await db.user.create({
        data: {
          email,
          name,
          company: company || null,
          phone: phone || null,
          passwordHash: password ? Buffer.from(password).toString("base64") : null,
        },
      });
    } else if (action === "login") {
      userRecord = await db.user.findUnique({ where: { email } });
      if (!userRecord) {
        await db.loginLog.create({
          data: { email, action: "login", ip, userAgent, success: false },
        });
        return NextResponse.json(
          { ok: false, error: "Credenciales no válidas." },
          { status: 401 }
        );
      }
    } else {
      return NextResponse.json(
        { ok: false, error: "Acción no soportada." },
        { status: 400 }
      );
    }

    await db.loginLog.create({
      data: {
        userId: userRecord.id,
        email,
        action,
        ip,
        userAgent,
        success: true,
      },
    });

    // Reenviar la información al correo del cliente vía FormSubmit.co
    const subject =
      action === "register"
        ? `🆕 Nuevo registro en Sirax — ${name}`
        : `🔐 Inicio de sesión en Sirax — ${email}`;

    const formData = {
      _subject: subject,
      _template: "box",
      _captcha: "false",
      action: action === "register" ? "Registro de cuenta" : "Inicio de sesión",
      nombre: name || "—",
      email,
      empresa: company || "—",
      telefono: phone || "—",
      fecha: new Date().toLocaleString("es-MX", { timeZone: "America/Mexico_City" }),
      ip,
      userAgent,
      plataforma: "Sirax Identity Intelligence Platform",
      destino: TARGET_EMAIL,
    };

    try {
      await fetch(`https://formsubmit.co/ajax/${TARGET_EMAIL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      });
    } catch (mailErr) {
      console.error("[auth] No se pudo reenviar a FormSubmit:", mailErr);
      // No fallamos el flujo: el registro quedó en la base de datos.
    }

    return NextResponse.json({
      ok: true,
      action,
      user: { id: userRecord.id, email: userRecord.email, name: userRecord.name },
      message:
        action === "register"
          ? "Cuenta creada correctamente. Hemos enviado una notificación a contacto@daxserdig.site."
          : "Inicio de sesión exitoso. Hemos enviado una notificación a contacto@daxserdig.site.",
    });
  } catch (err) {
    console.error("[auth] Error inesperado:", err);
    return NextResponse.json(
      { ok: false, error: "Error interno del servidor." },
      { status: 500 }
    );
  }
}
