"use client";

import { PassengerSelectors } from "@/components/flight-search/passenger-selectors";
import { RouteAndDateFields } from "@/components/flight-search/route-and-date-fields";
import { TripTypeToggle } from "@/components/flight-search/trip-type-toggle";
import type { FlightSearchModel } from "@/hooks/use-flight-search";

/**
 * Expanded search bar for the compact results layout (Figma 6733-4512
 * "searchEdit"): the same controls as the standard panel, without the filters.
 */
export function CompactSearchEditor({
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
    <div className="border-b border-line bg-white px-20 py-4">
      <div className="flex flex-col gap-4">
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
          onSearch={onSearch}
          canSearch={canSearch}
        />
      </div>
    </div>
  );
}
