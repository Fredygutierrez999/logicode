import type { ReactNode } from "react";
import { SectionHeading } from "./SectionHeading";

type Service = {
  title: string;
  description: string;
  points: string[];
  icon: ReactNode;
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

const services: Service[] = [
  {
    title: "Aplicaciones web",
    description:
      "Plataformas, portales y sistemas que funcionan en cualquier navegador: rápidos, seguros y fáciles de usar.",
    points: [
      "Sistemas de gestión y paneles administrativos",
      "Portales para clientes y proveedores",
      "Integración con tus sistemas y APIs existentes",
    ],
    icon: (
      <svg {...iconProps}>
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <path d="M3 9h18M8 14l-2 2 2 2M16 14l2 2-2 2" />
      </svg>
    ),
  },
  {
    title: "Apps para Android",
    description:
      "Aplicaciones que aprovechan el dispositivo y se sienten naturales en la gran variedad de teléfonos Android.",
    points: [
      "Experiencia fluida en distintos tamaños de pantalla",
      "Notificaciones, cámara, ubicación y modo sin conexión",
      "Publicación y actualizaciones en Google Play",
    ],
    icon: (
      <svg {...iconProps}>
        <rect x="6" y="2" width="12" height="20" rx="2.5" />
        <path d="M10 18h4" />
      </svg>
    ),
  },
  {
    title: "Apps para iOS",
    description:
      "Aplicaciones para iPhone y iPad que respetan las convenciones de Apple y la experiencia que sus usuarios esperan.",
    points: [
      "Diseño alineado con las guías de Apple",
      "Integración con los servicios del ecosistema",
      "Publicación y revisión en la App Store",
    ],
    icon: (
      <svg {...iconProps}>
        <rect x="6" y="2" width="12" height="20" rx="3" />
        <path d="M10.5 5h3" />
        <circle cx="12" cy="18.5" r="0.8" fill="currentColor" />
      </svg>
    ),
  },
];

export function Services() {
  return (
    <section
      aria-labelledby="servicios-title"
      id="servicios"
      className="border-t border-line bg-surface"
    >
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:py-28">
        <SectionHeading
          id="servicios-title"
          eyebrow="Servicios"
          title="Soluciones que generan valor para tu negocio"
          description="Construimos la aplicación que tu negocio necesita, en las plataformas donde están tus usuarios, y te ayudamos a llevar la inteligencia artificial a tus procesos."
        />

        <ul className="mt-14 grid gap-6 md:grid-cols-3">
          {services.map((service) => (
            <li
              key={service.title}
              className="flex flex-col rounded-2xl border border-line bg-bg p-7 transition-colors hover:border-accent/60"
            >
              <span className="grid size-12 place-items-center rounded-xl bg-accent-soft text-accent">
                {service.icon}
              </span>
              <h3 className="mt-6 text-xl font-semibold tracking-tight">
                {service.title}
              </h3>
              <p className="mt-3 leading-relaxed text-muted">
                {service.description}
              </p>
              <ul className="mt-6 space-y-3 border-t border-line pt-6 text-sm">
                {service.points.map((point) => (
                  <li key={point} className="flex gap-3">
                    <span
                      aria-hidden="true"
                      className="mt-2 size-1.5 shrink-0 rounded-full bg-accent"
                    />
                    {point}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>

        <AiConsulting />
      </div>
    </section>
  );
}

const consultingPoints = [
  {
    title: "Diagnóstico y hoja de ruta",
    text: "Identificamos qué procesos ganan más con IA y definimos un plan por etapas para adoptarla de forma segura y medible.",
  },
  {
    title: "Automatización de procesos",
    text: "Eliminamos tareas manuales y repetitivas conectando tus sistemas, datos y flujos de trabajo.",
  },
  {
    title: "Chatbots con IA",
    text: "Implementamos chatbots que atienden a clientes y colaboradores, resuelven consultas y ejecutan procesos conectados a tus sistemas.",
  },
  {
    title: "Agentes de IA",
    text: "Diseñamos agentes que ejecutan tareas dentro de tus procesos de negocio, trabajando junto a tus equipos.",
  },
];

function AiConsulting() {
  return (
    <div className="mt-6 grid gap-10 rounded-2xl border border-accent/50 bg-accent-soft/40 p-7 sm:p-10 lg:grid-cols-[0.9fr_1.1fr]">
      <div>
        <span className="grid size-12 place-items-center rounded-xl bg-accent text-accent-ink">
          <svg {...iconProps}>
            <circle cx="12" cy="12" r="3" />
            <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" />
          </svg>
        </span>
        <p className="mt-6 font-mono text-xs uppercase tracking-widest text-accent">
          Consultoría
        </p>
        <h3 className="mt-2 text-2xl font-semibold tracking-tight text-balance">
          Asesoría en IA empresarial y automatización
        </h3>
        <p className="mt-3 leading-relaxed text-muted text-pretty">
          Te acompañamos a modernizar tu empresa uniendo la inteligencia
          artificial con tus procesos de negocio. Empezamos por dónde se genera
          más valor y avanzamos con resultados medibles, no con experimentos
          sueltos.
        </p>
        <a
          href="#contacto"
          className="mt-6 inline-block rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-accent-ink transition-colors hover:bg-accent-hover"
        >
          Agenda una asesoría
        </a>
      </div>

      <ul className="grid gap-4 sm:grid-cols-2">
        {consultingPoints.map((p) => (
          <li
            key={p.title}
            className="rounded-xl border border-line bg-surface p-5"
          >
            <h4 className="font-semibold tracking-tight">{p.title}</h4>
            <p className="mt-1.5 text-sm leading-relaxed text-muted">
              {p.text}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
