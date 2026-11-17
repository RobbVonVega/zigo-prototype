import { Icon } from "@/components/icon";

/**
 * 12px field label. Figma draws it as a 9px-tall box (node 6706-1413), so the
 * line-height is pinned to 9px and paired with a 6px gap to keep fields at the
 * design's exact 45px height (9 + 6 + 30).
 */
export function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="h-[9px] text-xs leading-[9px] font-semibold tracking-[-0.04em] text-ink">
      {children}
    </span>
  );
}

type SelectFieldVariant = "surface" | "outline";

const variantClasses: Record<SelectFieldVariant, string> = {
  /** Search-panel fields: grey fill (#F0F0F0). */
  surface: "bg-surface",
  /** Filter pills: white fill. */
  outline: "bg-white",
};

export type SelectFieldProps = {
  value: string;
  icon: React.ComponentProps<typeof Icon>["name"];
  label?: string;
  variant?: SelectFieldVariant;
  className?: string;
};

/**
 * Read-only dropdown control (30px tall, 5px radius, 1px #ECECEC border).
 * It is a button with `aria-haspopup` so the menu can be wired up later
 * without changing the markup.
 */
export function SelectField({
  value,
  icon,
  label,
  variant = "surface",
  className = "",
}: SelectFieldProps) {
  return (
    <div className={`flex flex-col gap-[6px] ${className}`}>
      {label ? <FieldLabel>{label}</FieldLabel> : null}

      <button
        type="button"
        aria-haspopup="listbox"
        className={`flex h-[30px] items-center gap-[6px] rounded-control border border-line pr-[6px] pl-[10px] text-left transition-colors hover:border-ink/20 focus-visible:border-ink/40 focus-visible:outline-none ${variantClasses[variant]}`}
      >
        <Icon name={icon} className="size-4 text-ink" />

        <span className="min-w-0 flex-1 truncate text-xs leading-[14.4px] font-semibold tracking-[-0.04em] text-muted">
          {value}
        </span>

        <Icon name="chevron-down" className="size-[18px] text-ink" />
      </button>
    </div>
  );
}
