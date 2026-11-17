import { SectionHeading } from "./SectionHeading";

const principles = [
  {
    title: "Entendemos antes de construir",
    text: "Conocemos a tus usuarios, sus tareas y sus frustraciones para resolver el problema real, no solo el que aparece en la lista de requisitos.",
  },
  {
    title: "Diseñamos para la experiencia",
    text: "Interfaces claras, accesibles y consistentes. Si una pantalla necesita un manual para usarse, todavía no está lista.",
  },
  {
    title: "Experimentamos en cada paso",
    text: "Probamos las ideas en pequeño con prototipos, pruebas con usuarios y entregas frecuentes antes de invertir en grande.",
  },
  {
    title: "Decidimos con datos",
    text: "Medimos el uso real y los indicadores de tu negocio. Cada decisión se apoya en evidencia, no en suposiciones ni opiniones.",
  },
];

const cycle = [
  { title: "Hipótesis", text: "¿Qué creemos que generará valor?" },
  { title: "Experimento", text: "Lo probamos en pequeño, rápido" },
  { title: "Datos", text: "Medimos el resultado real" },
  { title: "Decisión", text: "Escalamos, ajustamos o descartamos" },
];

export function Approach() {
  return (
    <section
      aria-labelledby="enfoque-title"
      id="enfoque"
      className="border-t border-line"
    >
      <div className="mx-auto grid max-w-6xl gap-14 px-4 py-20 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:py-28">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading
            id="enfoque-title"
            eyebrow="Nuestro enfoque"
            title="El valor para el usuario va primero"
            description="Una aplicación exitosa no es la que tiene más funciones, sino la que las personas adoptan porque les facilita el día. Por eso cada decisión de diseño y tecnología se apoya en datos y en experimentos con usuarios reales."
          />
          <DataCycle />
        </div>

        <ol className="grid gap-4 sm:grid-cols-2">
          {principles.map((p, i) => (
            <li
              key={p.title}
              className="rounded-2xl border border-line bg-surface p-7"
            >
              <span className="font-mono text-sm text-accent">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 text-lg font-semibold tracking-tight">
                {p.title}
              </h3>
              <p className="mt-2 leading-relaxed text-muted">{p.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/** Ciclo de decisiones basado en datos: hipótesis → experimento → datos → decisión. */
function DataCycle() {
  return (
    <figure className="mt-10 rounded-2xl border border-line bg-surface p-6">
      <figcaption className="font-mono text-xs uppercase tracking-widest text-muted">
        Cómo tomamos decisiones
      </figcaption>
      <ol className="mt-5 space-y-0">
        {cycle.map((step, i) => (
          <li key={step.title} className="relative flex gap-4 pb-5 last:pb-0">
            {i < cycle.length - 1 && (
              <span
                aria-hidden="true"
                className="absolute left-[15px] top-8 h-[calc(100%-2rem)] w-px bg-linear-to-b from-ai-from to-ai-to opacity-40"
              />
            )}
            <span className="grid size-8 shrink-0 place-items-center rounded-full bg-linear-to-br from-ai-from to-ai-to font-mono text-xs font-semibold text-accent-ink">
              {i + 1}
            </span>
            <div className="pt-1">
              <p className="font-semibold leading-tight">{step.title}</p>
              <p className="mt-0.5 text-sm text-muted">{step.text}</p>
            </div>
          </li>
        ))}
      </ol>
      <p className="mt-5 flex items-center gap-2 border-t border-line pt-4 text-sm text-muted">
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="shrink-0 text-accent"
          aria-hidden="true"
        >
          <path d="M21 12a9 9 0 1 1-3-6.7" />
          <path d="M21 4v5h-5" />
        </svg>
        El ciclo se repite en cada etapa del proyecto.
      </p>
    </figure>
  );
}
