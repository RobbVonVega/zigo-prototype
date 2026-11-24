"use client";

import * as Popover from "@radix-ui/react-popover";
import { useState } from "react";

import { Icon } from "@/components/icon";
import { cn } from "@/lib/cn";

export type SelectOption = {
  id: string;
  label: string;
  /** Highlighted option (e.g. "+ Nueva persona"). */
  accent?: boolean;
};

export type SelectMenuProps = {
  label: string;
  value: string;
  options: readonly SelectOption[];
  onChange: (id: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
};

/**
 * Form select for the passenger modal: 30px grey bar with a portal list so the
 * menu can overflow the scrolling dialog.
 */
export function SelectMenu({
  label,
  value,
  options,
  onChange,
  placeholder = "Seleccione",
  disabled = false,
  className = "",
}: SelectMenuProps) {
  const [open, setOpen] = useState(false);
  const selected = options.find((option) => option.id === value);

  return (
    <div className={cn("flex flex-col gap-[6px]", className)}>
      <span className="text-xs leading-[9px] font-semibold tracking-[-0.04em] text-ink">
        {label}
      </span>

      <Popover.Root open={open} onOpenChange={setOpen}>
        <Popover.Trigger asChild>
          <button
            type="button"
            disabled={disabled}
            aria-haspopup="listbox"
            className={cn(
              "flex h-[30px] w-full items-center gap-[6px] rounded-control border border-line bg-surface pr-[6px] pl-[10px] text-left transition-colors focus-visible:border-ink/40 focus-visible:outline-none",
              disabled
                ? "cursor-not-allowed opacity-60"
                : "hover:border-ink/20",
            )}
          >
            <span
              className={cn(
                "min-w-0 flex-1 truncate text-xs leading-[14.4px] font-semibold tracking-[-0.04em]",
                selected ? "text-ink" : "text-muted",
              )}
            >
              {selected?.label ?? placeholder}
            </span>

            <Icon name="chevron-down" className="size-[18px] text-ink" />
          </button>
        </Popover.Trigger>

        <Popover.Portal>
          <Popover.Content
            align="start"
            sideOffset={4}
            collisionPadding={12}
            className="z-[60] max-h-[220px] w-[var(--radix-popover-trigger-width)] overflow-y-auto rounded-[8px] bg-white p-1 shadow-pop ring-1 ring-line outline-none"
          >
            {options.length === 0 ? (
              <p className="px-3 py-4 text-center text-xs font-medium text-muted">
                Sin opciones
              </p>
            ) : (
              options.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  role="option"
                  aria-selected={option.id === value}
                  onClick={() => {
                    onChange(option.id);
                    setOpen(false);
                  }}
                  className={cn(
                    "flex w-full items-center gap-2 rounded-[4px] px-2 py-1.5 text-left text-xs leading-[14.4px] font-medium transition-colors",
                    option.accent
                      ? "bg-[#EDFEFF] text-[#51CFE2] hover:bg-[#DBFBFE]"
                      : "text-ink hover:bg-surface",
                    option.id === value && !option.accent && "bg-surface",
                  )}
                >
                  {option.label}
                </button>
              ))
            )}
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    </div>
  );
}
