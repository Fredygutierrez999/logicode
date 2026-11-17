import { SectionHeading } from "./SectionHeading";

const points = [
  {
    title: "Analizamos tu necesidad a fondo",
    text: "Organizamos requisitos, procesos y datos con apoyo de IA para detectar oportunidades que a simple vista pasan desapercibidas.",
  },
  {
    title: "Comparamos alternativas",
    text: "Exploramos varias soluciones posibles y te presentamos sus ventajas, costos y riesgos para que elijas con claridad.",
  },
  {
    title: "Prototipos en menos tiempo",
    text: "Llevamos las ideas a prototipos navegables más rápido, para validarlas con usuarios reales desde el inicio.",
  },
  {
    title: "Criterio humano en cada decisión",
    text: "Cada propuesta pasa por la revisión de nuestro equipo. La IA acelera el trabajo; las personas responden por el resultado.",
  },
];

export function AiSection() {
  return (
    <section
      aria-labelledby="ia-title"
      id="ia"
      className="relative overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(40%_50%_at_10%_15%,var(--secondary-soft),transparent_70%),radial-gradient(45%_55%_at_30%_40%,var(--accent-soft),transparent_70%)]"
      />
      <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:py-28">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <div>
            <SectionHeading
              id="ia-title"
              eyebrow="Potenciados con IA"
              title="Usamos inteligencia artificial para proponerte mejores soluciones"
              description="Nos apalancamos en herramientas de IA para entender tu necesidad desde más ángulos, explorar alternativas y llegar más rápido a una propuesta concreta. Tú recibes opciones mejor fundamentadas, en menos tiempo."
            />
          </div>
          <ProposalIllustration />
        </div>

        <ul className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {points.map((p) => (
            <li
              key={p.title}
              className="rounded-2xl border border-line bg-surface p-6"
            >
              <SparkIcon />
              <h3 className="mt-4 font-semibold tracking-tight">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {p.text}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function SparkIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinejoin="round"
      className={`text-accent ${className}`}
      aria-hidden="true"
    >
      <path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9L12 3z" />
      <path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8L19 15z" />
    </svg>
  );
}

/** Ilustración decorativa: una idea convertida en propuestas comparadas. */
function ProposalIllustration() {
  const options = [
    { label: "Opción A", bars: [70, 45], recommended: true },
    { label: "Opción B", bars: [55, 60], recommended: false },
    { label: "Opción C", bars: [40, 35], recommended: false },
  ];

  return (
    <div
      aria-hidden="true"
      className="rounded-2xl border border-line bg-surface p-5 shadow-2xl shadow-ink/10 sm:p-6"
    >
      <div className="flex items-center gap-3 rounded-xl bg-surface-2 p-4">
        <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-ink font-mono text-xs text-bg">
          Tú
        </span>
        <div className="flex-1 space-y-2">
          <div className="h-2.5 w-4/5 rounded bg-ink/20" />
          <div className="h-2.5 w-3/5 rounded bg-ink/10" />
        </div>
      </div>

      <div className="my-4 flex items-center gap-2 px-1 text-xs text-muted">
        <SparkIcon className="size-4" />
        <span className="font-mono">Analizando y generando propuestas</span>
        <span className="ml-auto flex gap-1">
          <span className="size-1.5 rounded-full bg-accent" />
          <span className="size-1.5 rounded-full bg-accent/60" />
          <span className="size-1.5 rounded-full bg-accent/30" />
        </span>
      </div>

      <ul className="space-y-3">
        {options.map((o) => (
          <li
            key={o.label}
            className={`rounded-xl border p-4 ${
              o.recommended
                ? "border-accent bg-accent-soft/60"
                : "border-line bg-bg"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold">{o.label}</span>
              {o.recommended && (
                <span className="rounded-full bg-accent px-2.5 py-0.5 text-xs font-medium text-accent-ink">
                  Recomendada
                </span>
              )}
            </div>
            <div className="mt-3 grid grid-cols-2 gap-3">
              {o.bars.map((w, i) => (
                <div key={i} className="h-1.5 rounded-full bg-line">
                  <div
                    className="h-full rounded-full bg-accent"
                    style={{ width: `${w}%` }}
                  />
                </div>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
