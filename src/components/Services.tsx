import type { ReactNode } from "react";
import { SectionHeading } from "./SectionHeading";

type Outcome = {
  title: string;
  text: string;
  builds: string[];
  tech: string[];
  icon: ReactNode;
  featured?: boolean;
};

const iconProps = {
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

const outcomes: Outcome[] = [
  {
    title: "Llega mejor a tus clientes",
    text: "Convierte la experiencia digital en una ventaja: canales donde tus clientes compran, consultan y resuelven por sí mismos, sin fricción.",
    builds: [
      "Portales y apps de autoservicio",
      "Canales de venta y atención digitales",
      "Experiencias móviles que fidelizan",
    ],
    tech: ["Web", "Android", "iOS", "React Native"],
    icon: (
      <svg {...iconProps}>
        <path d="M3 17l6-6 4 4 8-8" />
        <path d="M15 7h6v6" />
      </svg>
    ),
  },
  {
    title: "Opera con más eficiencia",
    text: "Menos trabajo manual, menos errores y equipos enfocados en lo que importa. Digitalizamos y conectamos la operación de tu empresa.",
    builds: [
      "Sistemas de gestión a la medida",
      "Integración entre tus sistemas y datos",
      "Aplicaciones de escritorio y servicios de Windows",
    ],
    tech: [".NET", "Java", "Go", "Node.js"],
    icon: (
      <svg {...iconProps}>
        <circle cx="12" cy="12" r="3" />
        <path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1" />
      </svg>
    ),
  },
  {
    title: "Moderniza sin detener tu negocio",
    text: "Tus sistemas actuales tienen valor. Los evolucionamos por etapas, sin interrumpir la operación ni empezar de cero.",
    builds: [
      "Migración de sistemas heredados",
      "Nuevas interfaces sobre sistemas existentes",
      "APIs para abrir tus datos a nuevos canales",
    ],
    tech: [".NET", "Java", "Angular", "React"],
    icon: (
      <svg {...iconProps}>
        <path d="M21 12a9 9 0 1 1-3-6.7" />
        <path d="M21 4v5h-5" />
      </svg>
    ),
  },
  {
    title: "Escala con inteligencia artificial",
    text: "Unimos IA y procesos de negocio para que tu empresa haga más con los mismos recursos, con un plan claro y resultados medibles.",
    builds: [
      "Diagnóstico y hoja de ruta de adopción de IA",
      "Automatización de procesos",
      "Chatbots y agentes de IA conectados a tus sistemas",
    ],
    tech: ["IA generativa", "Agentes", "Automatización"],
    featured: true,
    icon: (
      <svg {...iconProps}>
        <path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9L12 3z" />
        <path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8L19 15z" />
      </svg>
    ),
  },
];

export function Services() {
  return (
    <section
      aria-labelledby="soluciones-title"
      id="soluciones"
      className="border-t border-line bg-surface"
    >
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:py-28">
        <SectionHeading
          id="soluciones-title"
          eyebrow="Soluciones"
          title="No vendemos tecnología. Resolvemos objetivos de negocio."
          description="Empezamos por el resultado que tu empresa necesita y elegimos la tecnología que mejor lo consigue: web, móvil, escritorio, inteligencia artificial o una combinación de todas."
        />

        <ul className="mt-14 grid gap-6 md:grid-cols-2">
          {outcomes.map((o) => (
            <li
              key={o.title}
              className={
                o.featured
                  ? "rounded-2xl bg-linear-to-br from-ai-from to-ai-to p-px"
                  : "rounded-2xl border border-line"
              }
            >
              <OutcomeCard outcome={o} />
            </li>
          ))}
        </ul>

        <ResultsCallout />
      </div>
    </section>
  );
}

function OutcomeCard({ outcome: o }: { outcome: Outcome }) {
  return (
    <article
      className={`flex h-full flex-col rounded-[calc(1rem-1px)] p-7 sm:p-8 ${
        o.featured ? "bg-surface" : "bg-bg"
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <span
          className={`grid size-12 place-items-center rounded-xl ${
            o.featured
              ? "bg-linear-to-br from-ai-from to-ai-to text-accent-ink"
              : "bg-accent-soft text-accent"
          }`}
        >
          {o.icon}
        </span>
        {o.featured && (
          <span className="rounded-full bg-accent-soft px-3 py-1 text-xs font-medium text-accent">
            Asesoría en IA
          </span>
        )}
      </div>

      <h3 className="mt-6 text-2xl font-semibold tracking-tight text-balance">
        {o.title}
      </h3>
      <p className="mt-3 leading-relaxed text-muted text-pretty">{o.text}</p>

      <ul className="mt-6 space-y-2.5 text-sm">
        {o.builds.map((b) => (
          <li key={b} className="flex gap-3">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mt-0.5 shrink-0 text-accent"
              aria-hidden="true"
            >
              <path d="M5 12l5 5L20 7" />
            </svg>
            {b}
          </li>
        ))}
      </ul>

      {o.featured && (
        <a
          href="#diagnostico"
          className="mt-6 inline-flex items-center gap-1.5 self-start text-sm font-medium text-accent underline-offset-4 hover:underline"
        >
          Conoce el diagnóstico de IA sin costo
          <span aria-hidden="true">→</span>
        </a>
      )}

      <p className="mt-auto pt-7 font-mono text-xs text-muted">
        <span className="sr-only">Tecnologías: </span>
        {o.tech.join(" · ")}
      </p>
    </article>
  );
}

function ResultsCallout() {
  const metrics = [
    "Ventas y conversión",
    "Tiempos de proceso",
    "Costos operativos",
    "Satisfacción de usuarios",
  ];

  return (
    <div className="mt-6 grid items-center gap-8 rounded-2xl border border-line bg-bg p-7 sm:p-10 lg:grid-cols-[1.2fr_1fr]">
      <div>
        <h3 className="text-xl font-semibold tracking-tight text-balance">
          Medimos el éxito en resultados, no en líneas de código
        </h3>
        <p className="mt-3 leading-relaxed text-muted text-pretty">
          Desde el inicio definimos contigo los indicadores que importan a tu
          negocio, y cada entrega se evalúa por cómo los mueve.
        </p>
        <a
          href="#contacto"
          className="mt-6 inline-block rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-accent-ink transition-colors hover:bg-accent-hover"
        >
          Cuéntanos tu objetivo
        </a>
      </div>
      <ul className="grid grid-cols-2 gap-3">
        {metrics.map((m) => (
          <li
            key={m}
            className="rounded-xl border border-line bg-surface px-4 py-3 text-sm font-medium"
          >
            {m}
          </li>
        ))}
      </ul>
    </div>
  );
}
