export const projectTypes = [
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
