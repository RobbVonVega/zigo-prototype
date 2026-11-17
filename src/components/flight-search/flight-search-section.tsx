import { AdvancedFilters } from "./advanced-filters";
import { PassengerSelectors } from "./passenger-selectors";
import { RouteAndDateFields } from "./route-and-date-fields";
import { TripTypeToggle } from "./trip-type-toggle";
import { flightSearchTitle } from "@/lib/flight-search";

/**
 * Title + search panel + advanced filters (Figma node 6706-1386).
 * All controls are at their rest/empty state.
 */
export function FlightSearchSection() {
  return (
    <section className="flex flex-col gap-6">
      <h1 className="text-h1 leading-[23px] font-semibold">{flightSearchTitle}</h1>

      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-4 rounded-card bg-white p-4 ring-1 ring-line ring-inset">
          <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-4">
            <TripTypeToggle />
            <PassengerSelectors />
          </div>

          <RouteAndDateFields />
        </div>

        <AdvancedFilters />
      </div>
    </section>
  );
}
