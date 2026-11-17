export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <span
        aria-hidden="true"
        className="grid size-8 place-items-center rounded-lg bg-accent font-mono text-sm font-semibold text-accent-ink"
      >
        {"</>"}
      </span>
      <span className="text-lg font-semibold tracking-tight text-ink">
        Logi<span className="text-accent">Code</span>
      </span>
    </span>
  );
}
