export const projectTypes = [
  "Aplicación web",
  "App para Android",
  "App para iOS",
  "Android e iOS",
  "Aún no estoy seguro",
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
