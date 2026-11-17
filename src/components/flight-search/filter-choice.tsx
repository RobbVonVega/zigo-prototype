"use client";

import { Icon } from "@/components/icon";
import { cn } from "@/lib/cn";

export type FilterChoiceProps = {
  label: string;
  checked: boolean;
  /** Checkbox (multiple choice) instead of radio. */
  multiple?: boolean;
  onSelect: () => void;
};

/**
 * One row of a filter menu: 12px radio/checkbox + 12/500 label.
 * Selected = brand fill with a white check.
 */
export function FilterChoice({
  label,
  checked,
  multiple = false,
  onSelect,
}: FilterChoiceProps) {
  return (
    <button
      type="button"
      role={multiple ? "checkbox" : "radio"}
      aria-checked={checked}
      onClick={onSelect}
      className="flex items-center gap-2 text-left"
    >
      <span
        className={cn(
          "grid size-3 shrink-0 place-items-center border transition-colors",
          multiple ? "rounded-[2px]" : "rounded-full",
          checked ? "border-brand bg-brand" : "border-muted/60 bg-white",
        )}
      >
        {checked ? (
          <Icon name="check" className="h-[5px] w-[7px] text-white" />
        ) : null}
      </span>

      <span className="text-xs leading-3 font-medium tracking-[-0.04em] text-ink">
        {label}
      </span>
    </button>
  );
}
