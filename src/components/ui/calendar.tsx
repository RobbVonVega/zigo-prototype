"use client";

import { DayPicker } from "react-day-picker";
import { es } from "react-day-picker/locale";

import { Icon } from "@/components/icon";
import { cn } from "@/lib/cn";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

/**
 * shadcn-style calendar (react-day-picker v10) restyled with the ZIGO tokens:
 * 5px day cells, brand selection, muted outside days, General Sans.
 */
export function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      locale={es}
      showOutsideDays={showOutsideDays}
      className={cn("w-[252px]", className)}
      classNames={{
        root: "relative",
        months: "flex flex-col",
        month: "flex w-[252px] flex-col gap-3",
        month_caption: "flex h-8 items-center justify-center",
        caption_label: "text-body font-semibold capitalize",
        nav: "absolute inset-x-0 top-0 flex items-center justify-between",
        button_previous:
          "grid size-8 place-items-center rounded-control text-ink transition-colors hover:bg-surface disabled:opacity-40",
        button_next:
          "grid size-8 place-items-center rounded-control text-ink transition-colors hover:bg-surface disabled:opacity-40",
        month_grid: "w-full border-collapse",
        weekdays: "flex",
        weekday:
          "flex-1 text-center text-2xs font-semibold uppercase text-muted",
        weeks: "flex flex-col gap-0.5",
        week: "flex w-full",
        day: "flex-1 p-0 text-center",
        day_button:
          "mx-auto grid size-9 place-items-center rounded-control text-sm font-medium text-ink transition-colors hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40",
        selected: "[&>button]:bg-brand [&>button]:text-white [&>button:hover]:bg-brand-hover",
        today: "[&>button]:ring-1 [&>button]:ring-line",
        outside: "[&>button]:text-muted/50",
        disabled: "[&>button]:pointer-events-none [&>button]:text-muted/40",
        hidden: "invisible",
        ...classNames,
      }}
      components={{
        Chevron: ({ orientation }) => (
          <Icon
            name="chevron-down"
            className={cn(
              "size-4 text-ink",
              orientation === "left" && "rotate-90",
              orientation === "right" && "-rotate-90",
              orientation === "up" && "rotate-180",
            )}
          />
        ),
      }}
      {...props}
    />
  );
}
