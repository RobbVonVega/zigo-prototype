"use client";

import { format, startOfToday } from "date-fns";
import { useState } from "react";
import * as Popover from "@radix-ui/react-popover";

import { Icon } from "@/components/icon";
import { Calendar } from "@/components/ui/calendar";
import { FieldLabel } from "./field-label";

export type DateFieldProps = {
  label: string;
  value?: Date;
  onChange: (date: Date | undefined) => void;
  /** Earliest selectable day (e.g. departure date for the return field). */
  minDate?: Date;
  placeholder?: string;
  className?: string;
};

/**
 * Calendar body. It only renders inside an open popover, so reading the current
 * date here is safe (no prerender) and Next does not flag it.
 */
function DateCalendar({
  value,
  minDate,
  onChange,
}: Pick<DateFieldProps, "value" | "minDate" | "onChange"> & {
  onChange: (date: Date | undefined) => void;
}) {
  const earliestDay = minDate ?? startOfToday();

  return (
    <Calendar
      mode="single"
      selected={value}
      defaultMonth={value ?? earliestDay}
      disabled={{ before: earliestDay }}
      onSelect={(date) => onChange(date)}
    />
  );
}

/**
 * Date picker that keeps the search-panel field look (30px bar, 5px radius)
 * and opens a shadcn-style calendar adapted to the design tokens.
 */
export function DateField({
  label,
  value,
  onChange,
  minDate,
  placeholder = "dd/mm/yyyy",
  className = "",
}: DateFieldProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`flex flex-col gap-[6px] ${className}`}>
      <FieldLabel>{label}</FieldLabel>

      <Popover.Root open={open} onOpenChange={setOpen}>
        <Popover.Trigger asChild>
          <button
            type="button"
            aria-label={`${label}: ${value ? format(value, "dd/MM/yyyy") : placeholder}`}
            className="flex h-[30px] items-center gap-[6px] rounded-control border border-line bg-surface pr-[6px] pl-[10px] text-left transition-colors hover:border-ink/20 data-[state=open]:border-ink/40 focus-visible:border-ink/40 focus-visible:outline-none"
          >
            <Icon name="calendar" className="size-4 text-ink" />

            <span
              className={`min-w-0 flex-1 truncate text-xs leading-[14.4px] font-semibold tracking-[-0.04em] ${
                value ? "text-ink" : "text-muted"
              }`}
            >
              {value ? format(value, "dd/MM/yyyy") : placeholder}
            </span>

            <Icon name="chevron-down" className="size-[18px] text-ink" />
          </button>
        </Popover.Trigger>

        <Popover.Portal>
          <Popover.Content
            align="start"
            sideOffset={6}
            className="z-50 rounded-card bg-white p-3 shadow-pop ring-1 ring-line outline-none"
          >
            <DateCalendar
              value={value}
              minDate={minDate}
              onChange={(date) => {
                onChange(date);
                setOpen(false);
              }}
            />
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    </div>
  );
}
