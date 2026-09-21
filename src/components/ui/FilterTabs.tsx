"use client";

type Option<T extends string> = { value: T; label: string; count: number };

// Horizontal filter row; scrolls sideways on narrow screens instead of wrapping.
export function FilterTabs<T extends string>({
  options,
  value,
  onChange,
  label,
}: {
  options: Option<T>[];
  value: T;
  onChange: (v: T) => void;
  label: string;
}) {
  return (
    <div role="group" aria-label={label} className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:px-0">
      {options.map((o) => {
        const on = o.value === value;
        return (
          <button
            key={o.value}
            type="button"
            aria-pressed={on}
            onClick={() => onChange(o.value)}
            className={`inline-flex min-h-11 shrink-0 items-center gap-2 border px-4 text-sm font-semibold uppercase tracking-[0.08em] transition-colors ${
              on ? "border-gold bg-gold text-basalt" : "border-flint text-travertine hover:border-pumice"
            }`}
          >
            {o.label}
            <span className={`font-mono text-xs ${on ? "text-basalt/70" : "text-pumice"}`}>{o.count}</span>
          </button>
        );
      })}
    </div>
  );
}
