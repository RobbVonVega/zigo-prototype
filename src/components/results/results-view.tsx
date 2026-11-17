"use client";

import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";

import { AppShell } from "@/components/app-shell";
import { FlightPriceBlock } from "./flight-price-block";
import { ResultsSearchPanel } from "./results-search-panel";
import { TripSummaryCard } from "./trip-summary-card";
import { AdvancedFilters } from "@/components/flight-search/advanced-filters";
import { useFlightSearch } from "@/hooks/use-flight-search";
import { priceBlocks } from "@/lib/results";
import {
  buildResultsUrl,
  formatDayMonth,
  parseResultsParams,
} from "@/lib/results-url";

type Direction = "outbound" | "returning";

type Selection = {
  blockId: string;
  outboundId?: string;
  returnId?: string;
};

/**
 * Results screen (Figma 6724-5421): narrow search column on the left, filters
 * and price blocks on the right, sticky trip summary. Flights can only be
 * combined inside the same block.
 */
export function ResultsView() {
  const params = useSearchParams();
  const router = useRouter();

  const initial = useMemo(
    () => parseResultsParams(new URLSearchParams(params.toString())),
    [params],
  );

  const search = useFlightSearch({
    tripType: initial.tripType,
    counts: initial.counts,
    origin: initial.origin,
    destination: initial.destination,
    departureDate: initial.departureDate,
    returnDate: initial.returnDate,
  });

  // Nothing is selected on arrival: the summary starts without a total.
  const [selection, setSelection] = useState<Selection | null>(null);

  const originCode = search.origin?.code ?? "UIO";
  const destinationCode = search.destination?.code ?? "BOG";
  const departureLabel = search.departureDate
    ? formatDayMonth(search.departureDate)
    : "—";
  const returnLabel = search.returnDate ? formatDayMonth(search.returnDate) : "—";

  const selectedBlock =
    priceBlocks.find((block) => block.id === selection?.blockId) ?? null;
  const selectedOutbound = selectedBlock?.outbound.find(
    (flight) => flight.id === selection?.outboundId,
  );
  const selectedReturning = selectedBlock?.returning.find(
    (flight) => flight.id === selection?.returnId,
  );

  function selectFlight(
    blockId: string,
    direction: Direction,
    flightId: string,
  ) {
    setSelection((current) => {
      if (!current || current.blockId !== blockId) {
        // Switching blocks starts a fresh combination with the first flight of
        // the other direction so the summary is always complete.
        const block = priceBlocks.find((item) => item.id === blockId);
        if (!block) return current;

        return {
          blockId,
          outboundId:
            direction === "outbound"
              ? flightId
              : (block.outbound[0]?.id ?? undefined),
          returnId:
            direction === "returning"
              ? flightId
              : (block.returning[0]?.id ?? undefined),
        };
      }

      return {
        ...current,
        [direction === "outbound" ? "outboundId" : "returnId"]: flightId,
      };
    });
  }

  /** Re-runs the search: URL reflects the new params and block 1 is selected. */
  function handleSearch() {
    router.replace(
      buildResultsUrl({
        tripType: search.tripType,
        origin: search.origin,
        destination: search.destination,
        departureDate: search.departureDate,
        returnDate: search.returnDate,
        counts: search.counts,
      }),
    );
    setSelection(null);
  }

  return (
    <AppShell>
      <div className="px-8 py-4">
        <div className="flex items-start gap-6">
          <ResultsSearchPanel search={search} onSearch={handleSearch} />

          <div className="flex min-w-0 flex-1 flex-col gap-2">
            <AdvancedFilters />

            <div className="flex items-start gap-2">
              <div className="min-w-0 flex-1">
                <p className="pb-4 text-xs leading-[19px] font-medium text-muted">
                  Aerolínea y equipaje dependen del bloque; las escalas, de cada
                  horario.
                </p>

                <div className="flex flex-col gap-4">
                  {priceBlocks.map((block) => (
                    <FlightPriceBlock
                      key={block.id}
                      block={block}
                      selected={block.id === selection?.blockId}
                      selectedOutboundId={
                        block.id === selection?.blockId
                          ? selection.outboundId
                          : undefined
                      }
                      selectedReturnId={
                        block.id === selection?.blockId
                          ? selection.returnId
                          : undefined
                      }
                      showReturn={search.isRoundTrip}
                      originCode={originCode}
                      destinationCode={destinationCode}
                      departureLabel={departureLabel}
                      returnLabel={returnLabel}
                      onSelect={(direction, flightId) =>
                        selectFlight(block.id, direction, flightId)
                      }
                    />
                  ))}
                </div>
              </div>

              <div className="sticky top-4 hidden w-[240px] shrink-0 min-[1400px]:block">
                <TripSummaryCard
                  block={selectedBlock}
                  outbound={selectedOutbound}
                  returning={selectedReturning}
                  showReturn={search.isRoundTrip}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
