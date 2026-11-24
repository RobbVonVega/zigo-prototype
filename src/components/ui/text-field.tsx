"use client";

import { cn } from "@/lib/cn";

export type TextFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  type?: "text" | "email" | "tel" | "date";
  max?: string;
  className?: string;
};

/** 45px form field (label + 30px bar) used by the passenger modal. */
export function TextField({
  label,
  value,
  onChange,
  placeholder,
  disabled = false,
  type = "text",
  max,
  className = "",
}: TextFieldProps) {
  return (
    <div className={cn("flex flex-col gap-[6px]", className)}>
      <span className="text-xs leading-[9px] font-semibold tracking-[-0.04em] text-ink">
        {label}
      </span>

      <input
        type={type}
        value={value}
        max={max}
        placeholder={placeholder}
        disabled={disabled}
        onChange={(event) => onChange(event.target.value)}
        className={cn(
          "h-[30px] w-full rounded-control border border-line bg-surface px-[10px] text-xs leading-[14.4px] font-semibold tracking-[-0.04em] text-ink outline-none transition-colors placeholder:font-medium placeholder:text-muted focus:border-ink/40",
          disabled && "cursor-not-allowed opacity-60",
          type === "date" &&
            "[&::-webkit-calendar-picker-indicator]:hidden",
        )}
      />
    </div>
  );
}
