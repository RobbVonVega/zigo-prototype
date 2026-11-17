"use client";

import { useEffect, useRef, useState } from "react";

import { AdvancedFilters } from "./advanced-filters";
import { PassengerSelectors } from "./passenger-selectors";
import { RouteAndDateFields } from "./route-and-date-fields";
import { TripTypeToggle } from "./trip-type-toggle";
import { SearchLoader } from "@/components/search-loader";
import { useFlightSearch } from "@/hooks/use-flight-search";
import { flightSearchTitle } from "@/lib/flight-search";
import { SEARCH_DURATION_MS } from "@/lib/search-loader";

/**
 * Title + search panel + advanced filters (Figma node 6706-1386).
 * State lives in `useFlightSearch`; the controls below are presentational.
 * "Buscar" opens the search loader (6739-4961) for SEARCH_DURATION_MS.
 */
export function FlightSearchSection() {
  const search = useFlightSearch();
  const [isSearching, setIsSearching] = useState(false);
  // Bumped on every search so the loader remounts and restarts its phrases.
  const [searchRun, setSearchRun] = useState(0);
  const searchTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function closeLoader() {
    if (searchTimer.current) clearTimeout(searchTimer.current);
    setIsSearching(false);
  }

  function startSearch() {
    if (searchTimer.current) clearTimeout(searchTimer.current);
    setSearchRun((run) => run + 1);
    setIsSearching(true);
    searchTimer.current = setTimeout(() => setIsSearching(false), SEARCH_DURATION_MS);
  }

  useEffect(() => {
    return () => {
      if (searchTimer.current) clearTimeout(searchTimer.current);
    };
  }, []);

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
            onSearch={startSearch}
            canSearch={Boolean(
              search.origin && search.destination && search.departureDate,
            )}
          />
        </div>

        <AdvancedFilters />
      </div>

      <SearchLoader
        key={searchRun}
        open={isSearching}
        onClose={closeLoader}
        tripTypeLabel={
          search.isRoundTrip ? "Viaje ida y vuelta" : "Viaje solo ida"
        }
        originCode={search.origin?.code}
        destinationCode={search.destination?.code}
        departureDate={search.departureDate}
        returnDate={search.returnDate}
        showReturnDate={search.isRoundTrip}
      />
    </section>
  );
}
