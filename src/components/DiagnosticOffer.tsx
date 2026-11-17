import { DIAGNOSTIC_ANCHOR } from "@/lib/contact";

const benefits = [
  "Revisión de uno o dos procesos clave de tu operación",
  "Oportunidades de IA y automatización priorizadas por impacto",
  "Recomendación de próximos pasos, sin compromiso",
];

const steps = [
  { title: "Solicítalo", text: "Déjanos tus datos y agendamos la sesión." },
  { title: "Conversamos", text: "Revisamos contigo tus procesos y objetivos." },
  { title: "Recibe el plan", text: "Te entregamos las oportunidades priorizadas." },
];

export function DiagnosticOffer() {
  return (
    <section
      aria-labelledby="diagnostico-title"
      id="diagnostico"
      className="bg-linear-to-br from-ai-from to-ai-to text-accent-ink"
    >
      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:py-24">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-accent-ink/30 px-3 py-1 text-sm font-medium">
            <span
              aria-hidden="true"
              className="size-1.5 rounded-full bg-accent-ink"
            />
            Sin costo y sin compromiso
          </p>
          <h2
            id="diagnostico-title"
            className="mt-5 text-3xl font-semibold tracking-tight text-balance sm:text-4xl"
          >
            Diagnóstico de IA para tu empresa
          </h2>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-pretty">
            En una sesión con nuestro equipo revisamos tus procesos y te
            mostramos dónde la inteligencia artificial puede generar resultados
            reales en tu negocio.
          </p>

          <ul className="mt-8 space-y-3">
            {benefits.map((b) => (
              <li key={b} className="flex gap-3">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mt-0.5 shrink-0"
                  aria-hidden="true"
                >
                  <path d="M5 12l5 5L20 7" />
                </svg>
                {b}
              </li>
            ))}
          </ul>

          <a
            href={`#${DIAGNOSTIC_ANCHOR}`}
            className="mt-10 inline-block rounded-full bg-ink px-7 py-3.5 font-medium text-bg transition-opacity hover:opacity-85"
          >
            Solicitar mi diagnóstico
          </a>
        </div>

        <ol className="grid gap-3">
          {steps.map((s, i) => (
            <li
              key={s.title}
              className="flex items-start gap-4 rounded-2xl border border-accent-ink/20 bg-ink/10 p-5"
            >
              <span className="grid size-9 shrink-0 place-items-center rounded-full bg-accent-ink font-mono text-sm font-semibold text-accent">
                {i + 1}
              </span>
              <div>
                <h3 className="font-semibold">{s.title}</h3>
                <p className="mt-1 text-sm">{s.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
