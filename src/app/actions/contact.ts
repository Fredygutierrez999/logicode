"use server";

import { projectTypes, type ContactState } from "@/lib/contact";
import { sendContactEmail } from "@/lib/email";
import { CONTACT_EMAIL } from "@/lib/site";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function text(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

export async function submitContact(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  // Campo trampa: los humanos no lo ven; si viene lleno, es un bot.
  if (text(formData, "website")) {
    return { status: "success", message: "¡Gracias! Recibimos tu mensaje." };
  }

  const values = {
    name: text(formData, "name"),
    email: text(formData, "email"),
    company: text(formData, "company"),
    projectType: text(formData, "projectType"),
    message: text(formData, "message"),
  };

  const errors: ContactState["errors"] = {};
  if (values.name.length < 2 || values.name.length > 100)
    errors.name = "Escribe tu nombre (entre 2 y 100 caracteres).";
  if (!EMAIL_RE.test(values.email) || values.email.length > 200)
    errors.email = "Escribe un correo electrónico válido.";
  if (values.company.length > 120)
    errors.company = "El nombre de la empresa es demasiado largo.";
  if (!(projectTypes as readonly string[]).includes(values.projectType))
    errors.projectType = "Selecciona qué quieres lograr.";
  if (values.message.length < 10 || values.message.length > 3000)
    errors.message = "Cuéntanos un poco más (entre 10 y 3000 caracteres).";

  if (Object.keys(errors).length > 0) {
    return {
      status: "error",
      message: "Revisa los campos marcados.",
      errors,
      values,
    };
  }

  const sent = await sendContactEmail(values);
  if (!sent) {
    return {
      status: "error",
      message: `No pudimos enviar tu mensaje. Inténtalo de nuevo o escríbenos directamente a ${CONTACT_EMAIL}.`,
      values,
    };
  }

  return {
    status: "success",
    message: "¡Gracias! Recibimos tu mensaje y te responderemos pronto.",
  };
}
