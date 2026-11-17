"use client";

import * as Popover from "@radix-ui/react-popover";

import { Icon } from "@/components/icon";
import { cn } from "@/lib/cn";
import type { IconName } from "@/lib/icons";

export type FilterDropdownProps = {
  /** Text on the trigger pill (as in the design). */
  label: string;
  /** Heading inside the menu. */
  title: string;
  icon: IconName;
  onClear: () => void;
  children: React.ReactNode;
  /** Spacing/padding of the option area. */
  bodyClassName?: string;
  className?: string;
};

/**
 * Trigger + 240px menu shared by every advanced filter (Figma node 6729-6109).
 * Menu: 8px radius, 12/16 padding, 16px title, 24px gap, brand "Borrar selección".
 */
export function FilterDropdown({
  label,
  title,
  icon,
  onClear,
  children,
  bodyClassName = "gap-4 px-2",
  className = "",
}: FilterDropdownProps) {
  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <button
          type="button"
          aria-haspopup="dialog"
          className={cn(
            "group flex h-[30px] items-center gap-[6px] rounded-control border border-line bg-white pr-[6px] pl-[10px] text-left transition-colors hover:border-ink/20 data-[state=open]:border-ink/40 focus-visible:border-ink/40 focus-visible:outline-none",
            className,
          )}
        >
          <Icon name={icon} className="size-4 text-ink" />

          <span className="min-w-0 flex-1 truncate text-xs leading-[14.4px] font-semibold tracking-[-0.04em] text-muted">
            {label}
          </span>

          <Icon
            name="chevron-down"
            className="size-[18px] text-ink transition-transform group-data-[state=open]:rotate-180"
          />
        </button>
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content
          align="start"
          sideOffset={-1}
          collisionPadding={16}
          className="z-50 w-[240px] rounded-[8px] bg-white px-3 py-4 shadow-pop ring-1 ring-line outline-none"
        >
          <div className="flex flex-col gap-6">
            <div className="flex h-[18px] items-center justify-between gap-5">
              <p className="text-body font-semibold tracking-[-0.04em] text-ink">
                {title}
              </p>

              <Popover.Close
                aria-label="Cerrar"
                className="grid size-[18px] shrink-0 place-items-center text-ink/30 transition-colors hover:text-ink/60"
              >
                <Icon name="close" className="size-[9px]" />
              </Popover.Close>
            </div>

            <div className={cn("flex flex-col", bodyClassName)}>
              {children}

              <button
                type="button"
                onClick={onClear}
                className="mt-4 self-end text-xs font-semibold tracking-[-0.04em] text-brand transition-colors hover:text-brand-hover"
              >
                Borrar selección
              </button>
            </div>
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
