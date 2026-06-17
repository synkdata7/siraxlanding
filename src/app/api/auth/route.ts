import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import nodemailer from "nodemailer";

// 1. Constantes y configuración
const SALES_EMAIL = process.env.SIRAX_SALES_EMAIL || "ventas@sirax.lat";
const SUPPORT_EMAIL = process.env.SIRAX_SUPPORT_EMAIL || "soporte@sirax.lat";
const isProduction = process.env.NODE_ENV === "production";

// 2. Configuración optimizada del transporte SMTP (según tu solicitud + seguridad)
const smtpPort = Number(process.env.SMTP_PORT) || 587;

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: smtpPort,
  secure: process.env.SMTP_SECURE === "true" || smtpPort === 465,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
  connectionTimeout: Number(process.env.SMTP_CONNECTION_TIMEOUT) || 15000,
  greetingTimeout: Number(process.env.SMTP_GREETING_TIMEOUT) || 15000,
  socketTimeout: Number(process.env.SMTP_SOCKET_TIMEOUT) || 30000,
  // ⚠️ Optimización de seguridad: Desactivar logs en producción para no exponer datos sensibles
  logger: !isProduction,
  debug: !isProduction,
});

// 3. Función auxiliar para validaciones (DRY: Don't Repeat Yourself)
const validateString = (value: unknown, minLength = 1): value is string => {
  return typeof value === "string" && value.trim().length >= minLength;
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, company, phone, useCase, projectDescription } = body || {};

    // 4. Validaciones robustas (corregidos los espacios accidentales en "string ")
    if (!validateString(name, 2)) {
      return NextResponse.json({ ok: false, error: "Tu nombre completo es obligatorio." }, { status: 400 });
    }
    if (!validateString(email) || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ ok: false, error: "Debes ingresar un correo electrónico válido." }, { status: 400 });
    }
    if (!validateString(company)) {
      return NextResponse.json({ ok: false, error: "El nombre de tu empresa es obligatorio." }, { status: 400 });
    }
    if (!validateString(phone)) {
      return NextResponse.json({ ok: false, error: "Tu número de celular es obligatorio." }, { status: 400 });
    }
    if (!validateString(useCase)) {
      return NextResponse.json({ ok: false, error: "Selecciona un caso de uso." }, { status: 400 });
    }
    if (!validateString(projectDescription, 10)) {
      return NextResponse.json({ ok: false, error: "Cuéntanos brevemente sobre tu proyecto (mínimo 10 caracteres)." }, { status: 400 });
    }

    // 5. Extracción segura de metadatos
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
               req.headers.get("x-real-ip") || "unknown";
    const userAgent = req.headers.get("user-agent") || "unknown";
    
    // Corregido: eliminado el espacio extra en "America/Mexico_City "
    const dateStr = new Date().toLocaleString("es-MX", { timeZone: "America/Mexico_City" });

    // 6. Persistir en la base de datos
    const record = await db.contactRequest.create({
      data: {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        company: company.trim(),
        phone: phone.trim(),
        useCase: useCase.trim(),
        projectDescription: projectDescription.trim(),
      },
    });

    // 7. Envío de correos
    let forwarded = false;
    try {
      const defaultFrom = process.env.SMTP_FROM || process.env.SMTP_USER || "Sirax <no-reply@sirax.lat>";

      // A) Correo al equipo de ventas
      await transporter.sendMail({
        from: defaultFrom,
        to: SALES_EMAIL,
        subject: `🆕 Nueva solicitud de acceso a Sirax — ${name}`,
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; color: #1f2937;">
            <div style="background: linear-gradient(135deg, #06b6d4 0%, #10b981 100%); padding: 24px; border-radius: 8px 8px 0 0; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 24px;">🚀 Nueva Solicitud de Acceso</h1>
              <p style="color: rgba(255,255,255,0.9); margin: 8px 0 0 0;">Plataforma Sirax</p>
            </div>
            <div style="background: #f9fafb; padding: 24px; border-radius: 0 0 8px 8px;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr style="border-bottom: 1px solid #e5e7eb;"><td style="padding: 12px; font-weight: 600; width: 150px;">Nombre:</td><td style="padding: 12px;">${name}</td></tr>
                <tr style="border-bottom: 1px solid #e5e7eb;"><td style="padding: 12px; font-weight: 600;">Email:</td><td style="padding: 12px;"><a href="mailto:${email}" style="color: #0891b2; text-decoration: none;">${email}</a></td></tr>
                <tr style="border-bottom: 1px solid #e5e7eb;"><td style="padding: 12px; font-weight: 600;">Empresa:</td><td style="padding: 12px;">${company}</td></tr>
                <tr style="border-bottom: 1px solid #e5e7eb;"><td style="padding: 12px; font-weight: 600;">Teléfono:</td><td style="padding: 12px;">${phone}</td></tr>
                <tr style="border-bottom: 1px solid #e5e7eb;"><td style="padding: 12px; font-weight: 600;">Caso de uso:</td><td style="padding: 12px;">${useCase}</td></tr>
                <tr style="border-bottom: 1px solid #e5e7eb;"><td style="padding: 12px; font-weight: 600;">Descripción:</td><td style="padding: 12px;">${projectDescription}</td></tr>
                <tr style="border-bottom: 1px solid #e5e7eb;"><td style="padding: 12px; font-weight: 600;">Fecha:</td><td style="padding: 12px;">${dateStr}</td></tr>
                <tr style="border-bottom: 1px solid #e5e7eb;"><td style="padding: 12px; font-weight: 600;">IP:</td><td style="padding: 12px; font-size: 12px; color: #6b7280;">${ip}</td></tr>
                <tr><td style="padding: 12px; font-weight: 600;">User-Agent:</td><td style="padding: 12px; font-size: 11px; color: #6b7280; word-break: break-all;">${userAgent}</td></tr>
              </table>
              <div style="background: #eff6ff; border-left: 4px solid #0891b2; padding: 12px; margin-top: 16px; border-radius: 4px; font-size: 12px; color: #0c4a6e;">
                <strong>ID de solicitud:</strong> ${record.id}
              </div>
            </div>
          </div>
        `,
      });

      // B) Correo de confirmación al usuario
      await transporter.sendMail({
        from: defaultFrom,
        to: email,
        subject: "✅ Hemos recibido tu solicitud · Sirax",
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; color: #1f2937;">
            <div style="background: linear-gradient(135deg, #06b6d4 0%, #10b981 100%); padding: 24px; border-radius: 8px 8px 0 0; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 24px;">✅ Solicitud Recibida</h1>
              <p style="color: rgba(255,255,255,0.9); margin: 8px 0 0 0;">Sirax · Identity & Risk Intelligence Platform</p>
            </div>
            <div style="background: #f9fafb; padding: 24px; line-height: 1.6; color: #374151; border-radius: 0 0 8px 8px;">
              <p>¡Hola <strong>${name}</strong>!</p>
              <p>Gracias por solicitar acceso a <strong>Sirax</strong>.</p>
              <p>Hemos recibido tu solicitud correctamente y nuestro equipo de ventas la está revisando. Te contactaremos <strong>en menos de 24 horas hábiles</strong> a este mismo correo para:</p>
              <ul style="margin: 16px 0; padding-left: 20px;">
                <li>Coordinar una demo personalizada</li>
                <li>Responder todas tus preguntas</li>
                <li>Activar tu acceso a la plataforma</li>
              </ul>
              <p>Mientras tanto, si tienes alguna duda o pregunta urgente, no dudes en escribirnos a <a href="mailto:${SUPPORT_EMAIL}" style="color: #0891b2; text-decoration: none;">${SUPPORT_EMAIL}</a>.</p>
              <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 24px 0;">
              <p style="font-size: 12px; color: #6b7280; margin: 16px 0 0 0;">
                <strong>Referencia de solicitud:</strong> ${record.id}<br>
                <strong>Correo recibido:</strong> ${dateStr}
              </p>
            </div>
            <div style="text-align: center; padding: 16px; font-size: 12px; color: #9ca3af;">
              <p>— Equipo Sirax · SynkData</p>
              <p><em>Identity Verification + Government Intelligence + Compliance Screening</em></p>
            </div>
          </div>
        `,
      });

      forwarded = true;
      console.log(`[request-access] ✅ Emails enviados exitosamente para ${email} (ID: ${record.id})`);
    } catch (mailErr) {
      console.error("[request-access] ❌ Error al enviar emails:", mailErr);
      // El flujo no falla: la solicitud ya quedó guardada en la base de datos
    }

    return NextResponse.json({
      ok: true,
      id: record.id,
      forwarded,
      message: "¡Solicitud enviada! Hemos enviado un correo de confirmación a tu inbox. Nuestro equipo de ventas te contactará en menos de 24 horas hábiles.",
    });

  } catch (err) {
    console.error("[request-access] ❌ Error inesperado:", err);
    return NextResponse.json(
      { ok: false, error: "Error interno del servidor. Intenta nuevamente." },
      { status: 500 }
    );
  }
}
