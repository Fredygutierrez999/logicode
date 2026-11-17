/** Opción del formulario que se preselecciona desde la oferta de diagnóstico. */
export const DIAGNOSTIC_OPTION = "Diagnóstico de IA sin costo";
/** Ancla que lleva al formulario con el diagnóstico preseleccionado. */
export const DIAGNOSTIC_ANCHOR = "solicitar-diagnostico";

export const projectTypes = [
  DIAGNOSTIC_OPTION,
  "Llegar mejor a mis clientes",
  "Operar con más eficiencia",
  "Modernizar mis sistemas",
  "Adoptar inteligencia artificial",
  "Otro objetivo",
  "Aún no lo tengo claro",
] as const;

export type ContactField =
  | "name"
  | "email"
  | "company"
  | "projectType"
  | "message";

export type ContactState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Partial<Record<ContactField, string>>;
  values?: Partial<Record<ContactField, string>>;
};
