"use client";

import { cn } from "@/lib/cn";

export type ResultsLayout = "standard" | "compact";

const OPTIONS: readonly { id: ResultsLayout; label: string }[] = [
  { id: "standard", label: "Estándar" },
  { id: "compact", label: "Compact" },
];

/** Segmented control in the top bar to switch results layouts. */
export function LayoutToggle({
  value,
  onChange,
}: {
  value: ResultsLayout;
  onChange: (layout: ResultsLayout) => void;
}) {
  return (
    <div
      role="group"
      aria-label="Diseño de resultados"
      className="ml-1 inline-flex items-center gap-0.5 rounded-[6px] border border-line bg-white p-0.5"
    >
      {OPTIONS.map((option) => (
        <button
          key={option.id}
          type="button"
          aria-pressed={value === option.id}
          onClick={() => onChange(option.id)}
          className={cn(
            "h-6 rounded-[4px] px-2 text-[11px] leading-[13px] font-semibold tracking-[-0.02em] transition-colors",
            value === option.id
              ? "bg-ink text-white"
              : "text-muted hover:bg-surface",
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
