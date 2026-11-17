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
          title="Una sola visión de producto, en cada plataforma"
          description="Construimos la aplicación que tu negocio necesita, en las plataformas donde están tus usuarios."
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
      </div>
    </section>
  );
}
