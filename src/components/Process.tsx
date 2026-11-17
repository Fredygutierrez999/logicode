const steps = [
  {
    title: "Descubrimiento",
    text: "Definimos juntos los objetivos del negocio, quiénes son los usuarios y qué necesitan lograr.",
  },
  {
    title: "Diseño",
    text: "Convertimos ideas en flujos y prototipos que validamos antes de escribir código.",
  },
  {
    title: "Desarrollo",
    text: "Construimos en ciclos cortos, con pruebas y revisiones constantes contigo.",
  },
  {
    title: "Lanzamiento y evolución",
    text: "Publicamos en web y en las tiendas, y acompañamos la mejora continua del producto.",
  },
];

export function Process() {
  return (
    <section
      aria-labelledby="proceso-title"
      id="proceso"
      className="border-y border-line bg-band text-band-ink"
    >
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:py-28">
        <div className="max-w-2xl">
          <p className="font-mono text-sm uppercase tracking-widest text-band-accent">
            Cómo trabajamos
          </p>
          <h2
            id="proceso-title"
            className="mt-3 text-3xl font-semibold tracking-tight text-balance sm:text-4xl"
          >
            De la idea a una aplicación en manos de tus usuarios
          </h2>
        </div>

        <ol className="mt-14 grid gap-px overflow-hidden rounded-2xl bg-band-ink/15 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <li key={step.title} className="bg-band p-7">
              <span className="grid size-10 place-items-center rounded-full border border-band-accent font-mono text-sm text-band-accent">
                {i + 1}
              </span>
              <h3 className="mt-6 text-lg font-semibold tracking-tight">
                {step.title}
              </h3>
              <p className="mt-2 leading-relaxed text-band-ink/70">{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
