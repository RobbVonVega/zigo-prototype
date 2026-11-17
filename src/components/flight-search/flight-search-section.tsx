"use client";

import { AdvancedFilters } from "./advanced-filters";
import { PassengerSelectors } from "./passenger-selectors";
import { RouteAndDateFields } from "./route-and-date-fields";
import { TripTypeToggle } from "./trip-type-toggle";
import { useFlightSearch } from "@/hooks/use-flight-search";
import { flightSearchTitle } from "@/lib/flight-search";

/**
 * Title + search panel + advanced filters (Figma node 6706-1386).
 * State lives in `useFlightSearch`; the controls below are presentational.
 */
export function FlightSearchSection() {
  const search = useFlightSearch();

  return (
    <section className="flex flex-col gap-6">
      <h1 className="text-h1 leading-[23px] font-semibold">{flightSearchTitle}</h1>

      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-4 rounded-card bg-white p-4 ring-1 ring-line ring-inset">
          <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-4">
            <TripTypeToggle value={search.tripType} onChange={search.setTripType} />
            <PassengerSelectors
              counts={search.counts}
              onChange={search.changePassenger}
            />
          </div>

          <RouteAndDateFields
            origin={search.origin}
            destination={search.destination}
            departureDate={search.departureDate}
            returnDate={search.returnDate}
            showReturnDate={search.isRoundTrip}
            onOriginChange={search.setOrigin}
            onDestinationChange={search.setDestination}
            onDepartureChange={search.setDepartureDate}
            onReturnChange={search.setReturnDate}
            onSwap={search.swapRoute}
          />
        </div>

        <AdvancedFilters />
      </div>
    </section>
  );
}
