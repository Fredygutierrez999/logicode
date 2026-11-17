export function Hero() {
  return (
    <section id="inicio" className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(45%_45%_at_85%_20%,var(--secondary-soft),transparent_70%),radial-gradient(45%_50%_at_65%_55%,var(--accent-soft),transparent_70%)]"
      />
      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-4 pb-20 pt-16 sm:px-6 md:pt-24 lg:grid-cols-[1.1fr_1fr] lg:pb-28">
        <div>
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1 text-sm text-muted">
            <span className="size-1.5 rounded-full bg-accent" aria-hidden="true" />
            Desarrollo de software a la medida
          </p>
          <h1 className="text-4xl font-semibold leading-[1.08] tracking-tight text-balance sm:text-5xl lg:text-6xl">
            Aplicaciones que tus usuarios{" "}
            <span className="bg-linear-to-r from-ai-from to-ai-to bg-clip-text text-transparent">
              quieren usar.
            </span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted text-pretty">
            En Logi Code diseñamos y desarrollamos aplicaciones web y móviles
            para Android e iOS, construidas alrededor de las personas que las
            van a usar. Cada decisión parte de una pregunta: ¿esto le aporta
            valor al usuario?
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a
              href="#contacto"
              className="rounded-full bg-accent px-6 py-3 text-center font-medium text-accent-ink transition-colors hover:bg-accent-hover"
            >
              Cuéntanos tu proyecto
            </a>
            <a
              href="#servicios"
              className="rounded-full border border-line bg-surface px-6 py-3 text-center font-medium text-ink transition-colors hover:border-muted"
            >
              Ver servicios
            </a>
          </div>
          <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
            {["Aplicaciones web", "Android", "iOS"].map((item) => (
              <li key={item} className="flex items-center gap-2">
                <CheckIcon />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <DeviceIllustration />
      </div>
    </section>
  );
}

function CheckIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-accent"
      aria-hidden="true"
    >
      <path d="M5 12l5 5L20 7" />
    </svg>
  );
}

/** Ilustración decorativa: una ventana de navegador y un teléfono. */
function DeviceIllustration() {
  return (
    <div aria-hidden="true" className="relative mx-auto w-full max-w-md lg:max-w-none">
      {/* Navegador */}
      <div className="rounded-2xl border border-line bg-surface shadow-2xl shadow-ink/10">
        <div className="flex items-center gap-1.5 border-b border-line px-4 py-3">
          <span className="size-2.5 rounded-full bg-line" />
          <span className="size-2.5 rounded-full bg-line" />
          <span className="size-2.5 rounded-full bg-line" />
          <span className="ml-3 h-5 flex-1 rounded-md bg-surface-2" />
        </div>
        <div className="grid grid-cols-[72px_1fr] gap-4 p-4 sm:grid-cols-[96px_1fr]">
          <div className="space-y-2.5">
            <div className="h-3 w-3/4 rounded bg-accent/70" />
            <div className="h-2.5 rounded bg-surface-2" />
            <div className="h-2.5 rounded bg-surface-2" />
            <div className="h-2.5 w-2/3 rounded bg-surface-2" />
          </div>
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-3">
              {[0, 1, 2].map((i) => (
                <div key={i} className="rounded-lg bg-surface-2 p-3">
                  <div className="h-2 w-1/2 rounded bg-line" />
                  <div className="mt-2 h-4 w-3/4 rounded bg-ink/15" />
                </div>
              ))}
            </div>
            <div className="flex h-28 items-end gap-2 rounded-lg bg-surface-2 p-3">
              {[40, 65, 50, 80, 60, 92, 74].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-t bg-accent/80"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
            <div className="space-y-2">
              <div className="h-2.5 rounded bg-surface-2" />
              <div className="h-2.5 w-5/6 rounded bg-surface-2" />
            </div>
          </div>
        </div>
      </div>

      {/* Teléfono */}
      <div className="absolute -bottom-10 -right-2 w-[34%] min-w-[118px] rounded-[1.6rem] border-4 border-ink bg-surface p-2 shadow-2xl shadow-ink/20 sm:-right-6">
        <div className="mx-auto mb-2 h-1.5 w-10 rounded-full bg-ink/80" />
        <div className="space-y-2 px-1 pb-3">
          <div className="h-16 rounded-xl bg-accent" />
          <div className="h-2 w-3/4 rounded bg-ink/20" />
          <div className="h-2 w-1/2 rounded bg-surface-2" />
          <div className="grid grid-cols-2 gap-1.5 pt-1">
            <div className="h-10 rounded-lg bg-surface-2" />
            <div className="h-10 rounded-lg bg-surface-2" />
            <div className="h-10 rounded-lg bg-surface-2" />
            <div className="h-10 rounded-lg bg-accent-soft" />
          </div>
          <div className="mt-1 h-6 rounded-full bg-ink" />
        </div>
      </div>
    </div>
  );
}
