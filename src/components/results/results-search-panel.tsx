"use client";

import { AirportSelect } from "@/components/flight-search/airport-select";
import { DateField } from "@/components/flight-search/date-field";
import { PassengerSelectors } from "@/components/flight-search/passenger-selectors";
import { TripTypeToggle } from "@/components/flight-search/trip-type-toggle";
import type { FlightSearchModel } from "@/hooks/use-flight-search";

/**
 * Narrow search column on the results screen (Figma 6724-5421, left side):
 * trip type, route, dates, passengers and the outline "Buscar" that re-runs
 * the search.
 */
export function ResultsSearchPanel({
  search,
  onSearch,
}: {
  search: FlightSearchModel;
  onSearch: () => void;
}) {
  const canSearch = Boolean(
    search.origin && search.destination && search.departureDate,
  );

  return (
    <aside className="flex w-[240px] shrink-0 flex-col gap-4">
      <TripTypeToggle
        fullWidth
        value={search.tripType}
        onChange={search.setTripType}
      />

      <AirportSelect
        label="Origen"
        icon="plane-takeoff"
        value={search.origin}
        onChange={search.setOrigin}
      />

      <AirportSelect
        label="Destino"
        icon="plane-landing"
        value={search.destination}
        onChange={search.setDestination}
      />

      <DateField
        label="Fecha de salida"
        value={search.departureDate}
        onChange={search.setDepartureDate}
      />

      {search.isRoundTrip ? (
        <DateField
          label="Fecha de regreso"
          value={search.returnDate}
          onChange={search.setReturnDate}
          minDate={search.departureDate}
        />
      ) : null}

      <PassengerSelectors
        stacked
        counts={search.counts}
        onChange={search.changePassenger}
      />

      <button
        type="button"
        onClick={onSearch}
        disabled={!canSearch}
        title={canSearch ? undefined : "Completa origen, destino y fecha de salida"}
        className="mt-4 flex h-[30px] w-full items-center justify-center rounded-[4px] border border-ink bg-white text-xs font-semibold tracking-[-0.04em] text-ink transition-colors hover:bg-surface disabled:cursor-not-allowed disabled:opacity-40"
      >
        Buscar
      </button>
    </aside>
  );
}
