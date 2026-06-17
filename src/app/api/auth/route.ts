import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

const SALES_EMAIL = "ventas@sirax.lat";
const SUPPORT_EMAIL = "soporte@sirax.lat";

// Plantilla del correo de confirmación automática al usuario
const AUTOCONFIRM_MESSAGE = `Gracias por solicitar acceso a Sirax.

Hemos recibido tu solicitud correctamente y nuestro equipo de ventas la está revisando. Te contactaremos en menos de 24 horas hábiles a este mismo correo para coordinar una demo y la activación de tu cuenta.

Mientras tanto, si tienes alguna duda, escríbenos a ${SUPPORT_EMAIL}.

— Equipo Sirax · SynkData
Identity & Risk Intelligence Platform`;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      name,
      email,
      company,
      phone,
      useCase,
      projectDescription,
    } = body || {};

    // Validaciones
    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json(
        { ok: false, error: "Tu nombre completo es obligatorio." },
        { status: 400 }
      );
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { ok: false, error: "Debes ingresar un correo electrónico válido." },
        { status: 400 }
      );
    }
    if (!company || typeof company !== "string") {
      return NextResponse.json(
        { ok: false, error: "El nombre de tu empresa es obligatorio." },
        { status: 400 }
      );
    }
    if (!phone || typeof phone !== "string") {
      return NextResponse.json(
        { ok: false, error: "Tu número de celular es obligatorio." },
        { status: 400 }
      );
    }
    if (!useCase || typeof useCase !== "string") {
      return NextResponse.json(
        { ok: false, error: "Selecciona un caso de uso." },
        { status: 400 }
      );
    }
    if (!projectDescription || typeof projectDescription !== "string" || projectDescription.trim().length < 10) {
      return NextResponse.json(
        { ok: false, error: "Cuéntanos brevemente sobre tu proyecto (mínimo 10 caracteres)." },
        { status: 400 }
      );
    }

    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "unknown";
    const userAgent = req.headers.get("user-agent") || "unknown";

    // 1) Persistir la solicitud en la base de datos local
    const record = await db.contactRequest.create({
      data: {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        company: company.trim(),
        phone: phone.trim(),
        useCase,
        projectDescription: projectDescription.trim(),
      },
    });

    // 2) Reenviar a ventas@sirax.lat vía FormSubmit.co
    //    Usamos _autoresponse para que FormSubmit envíe automáticamente
    //    el correo de confirmación al usuario (campo "email").
    const formData = {
      _subject: `🆕 Nueva solicitud de acceso a Sirax — ${name}`,
      _template: "box",
      _captcha: "false",
      _autoresponse: AUTOCONFIRM_MESSAGE,
      // Campo "email" en minúsculas — requerido por FormSubmit para el autoresponse
      email: email.trim().toLowerCase(),
      "Nombre completo": name.trim(),
      "Empresa": company.trim(),
      "Número de celular": phone.trim(),
      "Caso de uso": useCase,
      "Descripción del proyecto": projectDescription.trim(),
      "Fecha de solicitud": new Date().toLocaleString("es-MX", {
        timeZone: "America/Mexico_City",
      }),
      "IP de origen": ip,
      "User-Agent": userAgent,
      "Plataforma": "Sirax · Identity & Risk Intelligence Platform",
      "Destinatario interno": SALES_EMAIL,
    };

    let forwarded = false;
    try {
      const resp = await fetch(`https://formsubmit.co/ajax/${SALES_EMAIL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      });
      forwarded = resp.ok;
      if (!resp.ok) {
        const text = await resp.text().catch(() => "");
        console.error("[request-access] FormSubmit respondió con error:", resp.status, text);
      }
    } catch (mailErr) {
      console.error("[request-access] No se pudo reenviar a FormSubmit:", mailErr);
      // No fallamos el flujo: la solicitud quedó en la base de datos.
    }

    return NextResponse.json({
      ok: true,
      id: record.id,
      forwarded,
      message:
        "¡Solicitud enviada! Hemos enviado un correo de confirmación a tu inbox. Nuestro equipo de ventas te contactará en menos de 24 horas hábiles.",
    });
  } catch (err) {
    console.error("[request-access] Error inesperado:", err);
    return NextResponse.json(
      { ok: false, error: "Error interno del servidor. Intenta nuevamente." },
      { status: 500 }
    );
  }
}
