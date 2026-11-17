"use client";

import { useActionState } from "react";
import { submitContact } from "@/app/actions/contact";
import { projectTypes, type ContactState } from "@/lib/contact";

const initialState: ContactState = { status: "idle" };

const inputClass =
  "mt-2 w-full rounded-xl border border-line bg-bg px-4 py-3 text-ink placeholder:text-muted/70 outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/25 aria-[invalid=true]:border-danger";

export function ContactForm() {
  const [state, formAction, pending] = useActionState(
    submitContact,
    initialState,
  );

  if (state.status === "success") {
    return (
      <div
        role="status"
        className="flex min-h-80 flex-col items-center justify-center rounded-2xl border border-line bg-surface p-8 text-center"
      >
        <span className="grid size-14 place-items-center rounded-full bg-accent-soft text-accent">
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M5 12l5 5L20 7" />
          </svg>
        </span>
        <p className="mt-5 text-lg font-medium">{state.message}</p>
      </div>
    );
  }

  const errors = state.errors ?? {};
  const values = state.values ?? {};

  return (
    <form
      action={formAction}
      noValidate
      className="rounded-2xl border border-line bg-surface p-6 sm:p-8"
    >
      {/* Campo trampa anti-spam, oculto para personas */}
      <div aria-hidden="true" className="absolute -left-[9999px]">
        <label>
          No llenar
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Nombre" name="name" error={errors.name}>
          <input
            id="name"
            name="name"
            autoComplete="name"
            required
            defaultValue={values.name}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
            className={inputClass}
          />
        </Field>

        <Field label="Correo electrónico" name="email" error={errors.email}>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            defaultValue={values.email}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={inputClass}
          />
        </Field>

        <Field
          label="Empresa"
          optional
          name="company"
          error={errors.company}
        >
          <input
            id="company"
            name="company"
            autoComplete="organization"
            defaultValue={values.company}
            aria-invalid={!!errors.company}
            aria-describedby={errors.company ? "company-error" : undefined}
            className={inputClass}
          />
        </Field>

        <Field
          label="Tipo de proyecto"
          name="projectType"
          error={errors.projectType}
        >
          <select
            // React reinicia el formulario tras cada envío; la key fuerza
            // que el select vuelva a montarse con el valor devuelto.
            key={`${values.projectType ?? ""}-${JSON.stringify(errors)}`}
            id="projectType"
            name="projectType"
            required
            defaultValue={values.projectType ?? ""}
            aria-invalid={!!errors.projectType}
            aria-describedby={
              errors.projectType ? "projectType-error" : undefined
            }
            className={inputClass}
          >
            <option value="" disabled>
              Selecciona una opción
            </option>
            {projectTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </Field>

        <div className="sm:col-span-2">
          <Field
            label="Cuéntanos sobre tu proyecto"
            name="message"
            error={errors.message}
          >
            <textarea
              id="message"
              name="message"
              rows={5}
              required
              defaultValue={values.message}
              placeholder="¿Qué problema quieres resolver y para quién?"
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? "message-error" : undefined}
              className={`${inputClass} resize-y`}
            />
          </Field>
        </div>
      </div>

      {state.status === "error" && state.message && (
        <p role="alert" className="mt-5 text-sm text-danger">
          {state.message}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="mt-6 w-full rounded-full bg-accent px-6 py-3.5 font-medium text-accent-ink transition-colors hover:bg-accent-hover disabled:cursor-wait disabled:opacity-70 sm:w-auto"
      >
        {pending ? "Enviando…" : "Enviar mensaje"}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  error,
  optional,
  children,
}: {
  label: string;
  name: string;
  error?: string;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={name} className="text-sm font-medium">
        {label}
        {optional && <span className="font-normal text-muted"> (opcional)</span>}
      </label>
      {children}
      {error && (
        <p id={`${name}-error`} className="mt-1.5 text-sm text-danger">
          {error}
        </p>
      )}
    </div>
  );
}
