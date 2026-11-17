"use client";

import { useState } from "react";

import { Icon } from "@/components/icon";
import { FilterDropdown } from "./filter-dropdown";
import { RangeSlider } from "@/components/ui/range-slider";
import { cn } from "@/lib/cn";
import type { IconName } from "@/lib/icons";
import type {
  TimeField,
  TimeTab,
  TimeWindow,
  TimeWindows,
} from "@/hooks/use-flight-filters";
import { DEFAULT_TIME_WINDOW } from "@/hooks/use-flight-filters";

const MINUTES_IN_DAY = 24 * 60 - 1;

/** 600 → "10:00 am" */
function formatTime(minutes: number) {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  const suffix = hours < 12 ? "am" : "pm";
  const hour12 = hours % 12 === 0 ? 12 : hours % 12;

  return `${hour12}:${String(mins).padStart(2, "0")} ${suffix}`;
}

function TimeSection({
  icon,
  label,
  window,
  onChange,
  onClear,
}: {
  icon: IconName;
  label: string;
  window: TimeWindow;
  onChange: (window: TimeWindow) => void;
  onClear: () => void;
}) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <Icon name={icon} className="size-4 text-ink" />

        <span className="text-xs leading-[14.4px] font-medium tracking-[-0.04em] text-ink">
          {label}
        </span>

        <span className="ml-auto text-xs leading-[14.4px] font-medium tracking-[-0.04em] text-ink">
          {formatTime(window.start)} - {formatTime(window.end)}
        </span>
      </div>

      <RangeSlider
        min={0}
        max={MINUTES_IN_DAY}
        value={[window.start, window.end]}
        onChange={([start, end]) => onChange({ start, end })}
        label={label}
      />

      <button
        type="button"
        onClick={onClear}
        className="self-end text-xs font-semibold tracking-[-0.04em] text-brand transition-colors hover:text-brand-hover"
      >
        Borrar
      </button>
    </div>
  );
}

export type TimeFilterProps = {
  times: TimeWindows;
  onChange: (tab: TimeTab, field: TimeField, window: TimeWindow) => void;
  onClearField: (tab: TimeTab, field: TimeField) => void;
  onClear: () => void;
};

/**
 * "Tiempos de vuelo" menu (Figma node 6729-6500): Ida/Regreso tabs with a
 * departure and arrival range per direction.
 */
export function TimeFilter({
  times,
  onChange,
  onClearField,
  onClear,
}: TimeFilterProps) {
  const [tab, setTab] = useState<TimeTab>("outbound");
  const current = times[tab];

  const isActive = Object.values(times).some((tabTimes) =>
    Object.values(tabTimes).some(
      (window) =>
        window.start !== DEFAULT_TIME_WINDOW.start ||
        window.end !== DEFAULT_TIME_WINDOW.end,
    ),
  );

  return (
    <FilterDropdown
      label="Rango de salida y regreso"
      title="Tiempos de vuelo"
      icon="clock"
      activeLabel={isActive ? "Rango de salida y regreso" : null}
      onClear={onClear}
      bodyClassName="gap-6"
    >
      <div className="flex gap-[10px] border-b border-line">
        {(
          [
            { id: "outbound", label: "Ida" },
            { id: "inbound", label: "Regreso" },
          ] as const
        ).map((item) => (
          <button
            key={item.id}
            type="button"
            aria-pressed={tab === item.id}
            onClick={() => setTab(item.id)}
            className={cn(
              "-mb-px border-b-2 pb-2 text-xs leading-[14.4px] font-medium tracking-[-0.04em]",
              tab === item.id
                ? "border-brand text-ink"
                : "border-transparent text-muted",
            )}
          >
            {item.label}
          </button>
        ))}
      </div>

      <p className="text-xs leading-[14.4px] font-semibold tracking-[-0.04em] text-ink">
        Ciudad X a Ciudad Y
      </p>

      <TimeSection
        icon="plane-takeoff"
        label="Salida"
        window={current.departure}
        onChange={(window) => onChange(tab, "departure", window)}
        onClear={() => onClearField(tab, "departure")}
      />

      <TimeSection
        icon="plane-landing"
        label="Llegada"
        window={current.arrival}
        onChange={(window) => onChange(tab, "arrival", window)}
        onClear={() => onClearField(tab, "arrival")}
      />
    </FilterDropdown>
  );
}
