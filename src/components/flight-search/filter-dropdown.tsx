"use client";

import * as Popover from "@radix-ui/react-popover";

import { Icon } from "@/components/icon";
import { cn } from "@/lib/cn";
import type { IconName } from "@/lib/icons";

export type FilterDropdownProps = {
  /** Text on the trigger pill when the filter has no selection. */
  label: string;
  /** Heading inside the menu. */
  title: string;
  icon: IconName;
  onClear: () => void;
  /** Summary to show instead of `label` once the filter is active. */
  activeLabel?: string | null;
  children: React.ReactNode;
  /** Spacing/padding of the option area. */
  bodyClassName?: string;
  className?: string;
  /**
   * Icon-only 56px pill for the compact results rail. The full label appears on
   * hover next to the pill and menus open to the right.
   */
  compact?: boolean;
};

/**
 * Trigger + 240px menu shared by every advanced filter (Figma nodes 6729-6109…
 * 6729-6500 and the active pill 6729-5960).
 * Active pill: cyan (#D3F7FA) background, ink label and an X that clears the
 * filter. Idle pill: white, muted label, chevron.
 */
export function FilterDropdown({
  label,
  title,
  icon,
  onClear,
  activeLabel = null,
  children,
  bodyClassName = "gap-4 px-2",
  className = "",
  compact = false,
}: FilterDropdownProps) {
  const isActive = activeLabel !== null;
  const visibleLabel = activeLabel ?? label;

  const menu = (
    <Popover.Portal>
      <Popover.Content
        align="start"
        side={compact ? "right" : "bottom"}
        sideOffset={compact ? 6 : -1}
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
  );

  if (compact) {
    return (
      <div className={cn("group relative w-14 shrink-0", className)}>
        <div
          className={cn(
            "flex h-[30px] w-14 items-center rounded-control border border-line transition-colors",
            isActive ? "bg-cyan-soft" : "bg-white hover:border-ink/20",
          )}
        >
          <Popover.Root>
            <Popover.Trigger asChild>
              <button
                type="button"
                aria-haspopup="dialog"
                aria-label={title}
                className="flex h-full min-w-0 flex-1 items-center gap-[6px] pr-[6px] pl-[10px] text-left focus-visible:outline-none"
              >
                <Icon name={icon} className="size-4 shrink-0 text-ink" />

                {!isActive ? (
                  <Icon
                    name="chevron-down"
                    className="ml-auto size-[18px] shrink-0 text-ink transition-transform group-data-[state=open]:rotate-180"
                  />
                ) : null}
              </button>
            </Popover.Trigger>

            {menu}
          </Popover.Root>

          {isActive ? (
            <button
              type="button"
              aria-label={`Quitar filtro ${title}`}
              onClick={onClear}
              className="mr-[6px] grid size-[18px] shrink-0 place-items-center text-ink/30 transition-colors hover:text-ink/60"
            >
              <Icon name="close" className="size-[9px]" />
            </button>
          ) : null}
        </div>

        {/* Full selector label on hover */}
        <span
          role="tooltip"
          className={cn(
            "pointer-events-none absolute top-1/2 left-full z-50 ml-2 -translate-y-1/2 rounded-[5px] border border-line bg-white px-2 py-1 text-xs leading-[14.4px] font-semibold whitespace-nowrap text-ink opacity-0 shadow-pop transition-opacity duration-150 group-hover:opacity-100",
          )}
        >
          {visibleLabel}
        </span>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex h-[30px] items-center rounded-control border border-line transition-colors",
        isActive ? "bg-cyan-soft" : "bg-white hover:border-ink/20",
        className,
      )}
    >
      <Popover.Root>
        <Popover.Trigger asChild>
          <button
            type="button"
            aria-haspopup="dialog"
            className="group flex h-full min-w-0 flex-1 items-center gap-[6px] pr-[6px] pl-[10px] text-left focus-visible:outline-none data-[state=open]:text-ink"
          >
            <Icon name={icon} className="size-4 shrink-0 text-ink" />

            <span
              className={cn(
                "min-w-0 flex-1 truncate text-xs leading-[14.4px] font-semibold tracking-[-0.04em]",
                isActive ? "text-ink" : "text-muted",
              )}
            >
              {visibleLabel}
            </span>

            {!isActive ? (
              <Icon
                name="chevron-down"
                className="size-[18px] shrink-0 text-ink transition-transform group-data-[state=open]:rotate-180"
              />
            ) : null}
          </button>
        </Popover.Trigger>

        {menu}
      </Popover.Root>

      {isActive ? (
        <button
          type="button"
          aria-label={`Quitar filtro ${title}`}
          onClick={onClear}
          className="mr-[6px] grid size-[18px] shrink-0 place-items-center text-ink/30 transition-colors hover:text-ink/60"
        >
          <Icon name="close" className="size-[9px]" />
        </button>
      ) : null}
    </div>
  );
}
