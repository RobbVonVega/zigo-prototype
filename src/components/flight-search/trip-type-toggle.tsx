"use client";

import { Icon } from "@/components/icon";
import { cn } from "@/lib/cn";
import { tripTypes, type TripTypeId } from "@/lib/flight-search";

export type TripTypeToggleProps = {
  value: TripTypeId;
  onChange: (tripType: TripTypeId) => void;
};

/**
 * Segmented control for the trip type (Figma node 6706-1391).
 * Cyan (#D3F7FA) = selected, white = idle with a light-grey hover.
 */
export function TripTypeToggle({ value, onChange }: TripTypeToggleProps) {
  return (
    <div
      role="group"
      aria-label="Tipo de viaje"
      className="inline-flex items-center gap-1 rounded-lg border border-line p-0.5"
    >
      {tripTypes.map((tripType) => {
        const isActive = tripType.id === value;

        return (
          <button
            key={tripType.id}
            type="button"
            aria-pressed={isActive}
            onClick={() => onChange(tripType.id)}
            className={cn(
              "flex h-[26px] items-center gap-[5px] rounded-[5px] px-2 text-xs leading-[12px] font-semibold tracking-[-0.04em] text-ink transition-colors",
              isActive ? "bg-cyan-soft" : "bg-white hover:bg-surface",
            )}
          >
            <Icon name={tripType.icon} className="size-4" />
            {tripType.label}
          </button>
        );
      })}
    </div>
  );
}
