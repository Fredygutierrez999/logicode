const groups = [
  {
    title: "Web",
    items: ["React", "Angular", "Node.js"],
  },
  {
    title: "Móvil",
    items: ["Android", "iOS", "React Native", ".NET MAUI / Xamarin"],
  },
  {
    title: "Escritorio y Windows",
    items: [".NET", "C#", "Apps de escritorio", "Servicios de Windows"],
  },
  {
    title: "Backend y servicios",
    items: ["Java", "Go", "Node.js", ".NET"],
  },
];

export function TechStack() {
  return (
    <section
      aria-labelledby="tecnologias-title"
      id="tecnologias"
      className="border-b border-line bg-surface"
    >
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_2fr]">
          <div>
            <h2
              id="tecnologias-title"
              className="text-xl font-semibold tracking-tight"
            >
              Tecnologías
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted text-pretty">
              Elegimos la tecnología según lo que tu proyecto necesita, no al
              revés. Estas son algunas con las que trabajamos.
            </p>
          </div>

          <div>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {groups.map((group) => (
                <div key={group.title}>
                  <h3 className="font-mono text-xs uppercase tracking-widest text-muted">
                    {group.title}
                  </h3>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="rounded-md border border-line bg-bg px-2.5 py-1 text-sm"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <p className="mt-8 text-sm text-muted">
              …y otras herramientas cuando la solución lo requiere.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
