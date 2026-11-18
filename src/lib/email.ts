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

/** Resume un error de SMTP en una línea sin datos sensibles. */
export function describeSmtpError(error: unknown): string {
  const e = (error ?? {}) as SmtpError;
  return [e.code, e.responseCode, e.message?.slice(0, 160)]
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

/**
 * Envía la solicitud de contacto por SMTP (por defecto, Gmail).
 * Requiere SMTP_USER y SMTP_PASS en las variables de entorno.
 * Devuelve false si el envío no está configurado o falla.
 */
export async function sendContactEmail(msg: ContactMessage): Promise<boolean> {
  const auth = smtpCredentials();
  if (!auth) {
    console.error(
      "[contacto] SMTP_USER/SMTP_PASS no están disponibles en el servidor; no se envió el correo.",
    );
    return false;
  }

  // Evita saltos de línea en el asunto (inyección de cabeceras).
  const oneLine = (s: string) => s.replace(/[\r\n]+/g, " ").slice(0, 120);

  const text = [
    `Nombre: ${msg.name}`,
    `Correo: ${msg.email}`,
    `Empresa: ${msg.company || "—"}`,
    `Objetivo: ${msg.projectType}`,
    "",
    "Mensaje:",
    msg.message,
  ].join("\n");

  for (const port of smtpPorts()) {
    try {
      await createSmtpTransport(port, auth).sendMail({
        from: `"Sitio Logi Code" <${auth.user}>`,
        to: process.env.CONTACT_TO ?? CONTACT_EMAIL,
        replyTo: { name: oneLine(msg.name), address: msg.email },
        subject: `Nuevo contacto: ${oneLine(msg.name)} — ${oneLine(msg.projectType)}`,
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
