import nodemailer from "nodemailer";
import { CONTACT_EMAIL } from "./site";

export type ContactMessage = {
  name: string;
  email: string;
  company: string;
  projectType: string;
  message: string;
};

type SmtpError = { code?: string; responseCode?: number; message?: string };

/** Resume un error de red o SMTP en una línea sin datos sensibles. */
export function describeSmtpError(error: unknown): string {
  const e = (error ?? {}) as SmtpError & { cause?: SmtpError };
  return [e.code ?? e.cause?.code, e.responseCode, e.message?.slice(0, 160)]
    .filter(Boolean)
    .join(" | ");
}

/** Credenciales SMTP desde el entorno, o null si faltan. */
export function smtpCredentials() {
  const user = process.env.SMTP_USER?.trim();
  // Google muestra la contraseña de aplicación con espacios; se eliminan.
  const pass = process.env.SMTP_PASS?.replace(/\s+/g, "");
  return user && pass ? { user, pass } : null;
}

/**
 * Puertos a intentar, en orden: el configurado (o 465) y luego 587 como
 * alternativa, por si el hosting bloquea uno de ellos.
 */
export function smtpPorts(): number[] {
  const first = Number(process.env.SMTP_PORT ?? 465);
  return first === 587 ? [587, 465] : [first, 587];
}

export function createSmtpTransport(
  port: number,
  auth: { user: string; pass: string },
) {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST ?? "smtp.gmail.com",
    port,
    secure: port === 465, // 465: TLS directo; 587: STARTTLS
    auth,
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 20_000,
  });
}

export const RESEND_ENDPOINT = "https://api.resend.com/emails";

/** Remitente para Resend. Usa EMAIL_FROM cuando el dominio esté verificado. */
export const resendFrom = () =>
  process.env.EMAIL_FROM ?? "Sitio Logi Code <onboarding@resend.dev>";

// Evita saltos de línea en el asunto (inyección de cabeceras).
const oneLine = (s: string) => s.replace(/[\r\n]+/g, " ").slice(0, 120);

function composeEmail(msg: ContactMessage) {
  const text = [
    `Nombre: ${msg.name}`,
    `Correo: ${msg.email}`,
    `Empresa: ${msg.company || "—"}`,
    `Objetivo: ${msg.projectType}`,
    "",
    "Mensaje:",
    msg.message,
  ].join("\n");
  return {
    to: process.env.CONTACT_TO ?? CONTACT_EMAIL,
    subject: `Nuevo contacto: ${oneLine(msg.name)} — ${oneLine(msg.projectType)}`,
    text,
  };
}

/**
 * Envía la solicitud de contacto.
 * - Con RESEND_API_KEY: por la API de Resend (HTTPS). Necesario en hostings
 *   que bloquean SMTP, como GoDaddy.
 * - Si no: por SMTP (Gmail) con SMTP_USER y SMTP_PASS.
 * Devuelve false si el envío no está configurado o falla.
 */
export async function sendContactEmail(msg: ContactMessage): Promise<boolean> {
  if (process.env.RESEND_API_KEY) return sendViaResend(msg);
  return sendViaSmtp(msg);
}

async function sendViaResend(msg: ContactMessage): Promise<boolean> {
  const { to, subject, text } = composeEmail(msg);
  try {
    const res = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: resendFrom(),
        to: [to],
        reply_to: msg.email,
        subject,
        text,
      }),
      signal: AbortSignal.timeout(15_000),
    });
    if (res.ok) return true;
    console.error(
      `[contacto] Resend rechazó el envío: HTTP ${res.status} ${(await res.text()).slice(0, 300)}`,
    );
  } catch (error) {
    console.error(
      `[contacto] No se pudo conectar con Resend: ${describeSmtpError(error)}`,
    );
  }
  return false;
}

async function sendViaSmtp(msg: ContactMessage): Promise<boolean> {
  const auth = smtpCredentials();
  if (!auth) {
    console.error(
      "[contacto] Sin RESEND_API_KEY ni SMTP_USER/SMTP_PASS en el servidor; no se envió el correo.",
    );
    return false;
  }
  const { to, subject, text } = composeEmail(msg);

  for (const port of smtpPorts()) {
    try {
      await createSmtpTransport(port, auth).sendMail({
        from: `"Sitio Logi Code" <${auth.user}>`,
        to,
        replyTo: { name: oneLine(msg.name), address: msg.email },
        subject,
        text,
      });
      return true;
    } catch (error) {
      console.error(
        `[contacto] Falló el envío por el puerto ${port}: ${describeSmtpError(error)}`,
      );
      // Si Gmail rechazó las credenciales, otro puerto no lo arreglará.
      if ((error as SmtpError)?.code === "EAUTH") break;
    }
  }
  return false;
}
