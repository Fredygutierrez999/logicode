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
    title: "Entregamos con frecuencia",
    text: "Ves avances funcionando desde temprano y decides con información real, no con suposiciones.",
  },
  {
    title: "Medimos y mejoramos",
    text: "El lanzamiento es el comienzo. Usamos datos de uso y retroalimentación para que la aplicación siga ganando valor.",
  },
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
            description="Una aplicación exitosa no es la que tiene más funciones, sino la que las personas adoptan porque les facilita el día. Ese es el criterio con el que tomamos cada decisión de diseño y tecnología."
          />
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
