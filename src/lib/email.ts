import nodemailer from "nodemailer";
import { CONTACT_EMAIL } from "./site";

export type ContactMessage = {
  name: string;
  email: string;
  company: string;
  projectType: string;
  message: string;
};

/**
 * Envía la solicitud de contacto por SMTP (por defecto, Gmail).
 * Requiere SMTP_USER y SMTP_PASS en las variables de entorno.
 * Devuelve false si el envío no está configurado o falla.
 */
export async function sendContactEmail(msg: ContactMessage): Promise<boolean> {
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!user || !pass) {
    console.error(
      "[contacto] SMTP_USER/SMTP_PASS no configurados; no se envió el correo.",
    );
    return false;
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST ?? "smtp.gmail.com",
    port: Number(process.env.SMTP_PORT ?? 465),
    secure: (process.env.SMTP_PORT ?? "465") === "465",
    auth: { user, pass },
  });

  // Evita saltos de línea en el asunto (inyección de cabeceras).
  const oneLine = (s: string) => s.replace(/[\r\n]+/g, " ").slice(0, 120);

  const text = [
    `Nombre: ${msg.name}`,
    `Correo: ${msg.email}`,
    `Empresa: ${msg.company || "—"}`,
    `Tipo de proyecto: ${msg.projectType}`,
    "",
    "Mensaje:",
    msg.message,
  ].join("\n");

  try {
    await transporter.sendMail({
      from: `"Sitio Logi Code" <${user}>`,
      to: process.env.CONTACT_TO ?? CONTACT_EMAIL,
      replyTo: { name: oneLine(msg.name), address: msg.email },
      subject: `Nuevo contacto: ${oneLine(msg.name)} — ${oneLine(msg.projectType)}`,
      text,
    });
    return true;
  } catch (error) {
    console.error("[contacto] Error al enviar el correo:", error);
    return false;
  }
}
