"use client";

import { AirportSelect } from "./airport-select";
import { DateField } from "./date-field";
import { Icon } from "@/components/icon";
import { cn } from "@/lib/cn";
import { routeFields } from "@/lib/flight-search";
import type { Airport } from "@/lib/airports";

export type RouteAndDateFieldsProps = {
  origin: Airport | null;
  destination: Airport | null;
  departureDate?: Date;
  returnDate?: Date;
  /** One-way trips hide the return field. */
  showReturnDate: boolean;
  onOriginChange: (airport: Airport) => void;
  onDestinationChange: (airport: Airport) => void;
  onDepartureChange: (date: Date | undefined) => void;
  onReturnChange: (date: Date | undefined) => void;
  onSwap: () => void;
};

/**
 * Route + date row plus the search CTA (Figma node 6706-1411).
 * In Figma origin/destination are 244px each and dates 160px each; the route
 * group flexes so the row fills any desktop width, while the dates + CTA keep
 * their design size and wrap as a unit on narrower desktops.
 *
 * One-way trips hide the return field with a fade/size transition: the return
 * collapses to 0 and the departure grows from 160 to 332 (both dates + gap).
 */
export function RouteAndDateFields({
  origin,
  destination,
  departureDate,
  returnDate,
  showReturnDate,
  onOriginChange,
  onDestinationChange,
  onDepartureChange,
  onReturnChange,
  onSwap,
}: RouteAndDateFieldsProps) {
  const [originField, destinationField] = routeFields;

  return (
    <div className="flex flex-wrap items-end gap-3">
      <div className="flex min-w-[320px] flex-1 items-end gap-1">
        <AirportSelect
          label={originField.label}
          icon={originField.icon}
          value={origin}
          onChange={onOriginChange}
          placeholder={originField.placeholder}
          className="min-w-0 flex-1"
        />

        <button
          type="button"
          aria-label="Intercambiar origen y destino"
          onClick={onSwap}
          className="grid h-[30px] w-4 shrink-0 place-items-center transition-opacity hover:opacity-70"
        >
          <Icon name="arrows-left-right" className="size-4 text-ink" />
        </button>

        <AirportSelect
          label={destinationField.label}
          icon={destinationField.icon}
          value={destination}
          onChange={onDestinationChange}
          placeholder={destinationField.placeholder}
          className="min-w-0 flex-1"
        />
      </div>

      <div className="ml-auto flex items-end">
        <DateField
          label="Fecha de salida"
          value={departureDate}
          onChange={onDepartureChange}
          className={cn(
            "shrink-0 overflow-hidden transition-[width] duration-300 ease-out",
            showReturnDate ? "w-40" : "w-[332px]",
          )}
        />

        <div
          aria-hidden={!showReturnDate}
          inert={!showReturnDate}
          className={cn(
            "shrink-0 overflow-hidden transition-[width,opacity,margin] duration-300 ease-out",
            showReturnDate
              ? "ml-3 w-40 opacity-100"
              : "pointer-events-none ml-0 w-0 opacity-0",
          )}
        >
          <DateField
            label="Fecha de regreso"
            value={returnDate}
            onChange={onReturnChange}
            minDate={departureDate}
            className="w-40"
          />
        </div>

        <button
          type="button"
          className="ml-3 flex h-[30px] w-[131px] shrink-0 items-center justify-center gap-1 rounded-[4px] bg-brand px-5 py-2 text-xs leading-3 font-semibold tracking-[-0.04em] text-white transition-colors hover:bg-brand-hover"
        >
          Buscar
        </button>
      </div>
    </div>
  );
}
