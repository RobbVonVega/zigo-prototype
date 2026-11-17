"use client";

import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";

import { AppShell } from "@/components/app-shell";
import { AdvancedFilters } from "@/components/flight-search/advanced-filters";
import { CompactQueryBar } from "./compact-query-bar";
import { CompactSearchEditor } from "./compact-search-editor";
import {
  FlightDetailsDrawer,
  type DetailsDirection,
} from "./flight-details-drawer";
import { FlightPriceBlock } from "./flight-price-block";
import { LayoutToggle, type ResultsLayout } from "./layout-toggle";
import { ResultsSearchPanel } from "./results-search-panel";
import { TripSummaryCard } from "./trip-summary-card";
import { useFlightFilters } from "@/hooks/use-flight-filters";
import { useFlightSearch } from "@/hooks/use-flight-search";
import { cn } from "@/lib/cn";
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

type DrawerState = {
  blockId: string;
  direction: DetailsDirection;
  /** Tabs only when opened from the summary card on a round trip. */
  showTabs: boolean;
  flightId?: string;
};

/**
 * Results screen. Two presentations over the same state:
 * - standard (6724-5421): search column on the left, filters on top.
 * - compact (6729-3375 / 6733-4512): compact query bar with an editable search,
 *   icon-only sticky filter rail on the left.
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

  const filters = useFlightFilters();

  const [layout, setLayout] = useState<ResultsLayout>("standard");
  const [editOpen, setEditOpen] = useState(false);

  // Nothing is selected on arrival: the summary starts without a total.
  const [selection, setSelection] = useState<Selection | null>(null);
  const [drawer, setDrawer] = useState<DrawerState | null>(null);

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

  const drawerBlock = drawer
    ? (priceBlocks.find((block) => block.id === drawer.blockId) ?? null)
    : null;

  const drawerFlight = drawer?.flightId
    ? [...(drawerBlock?.outbound ?? []), ...(drawerBlock?.returning ?? [])].find(
        (flight) => flight.id === drawer.flightId,
      )
    : drawer?.direction === "outbound"
      ? selectedOutbound
      : selectedReturning;

  /** Tag click: one leg, no tabs. */
  function showFlightDetails(
    blockId: string,
    direction: DetailsDirection,
    flightId: string,
  ) {
    setDrawer({ blockId, direction, showTabs: false, flightId });
  }

  /** Card button: the selected combination, with Ida/Regreso tabs. */
  function showTripDetails() {
    if (!selectedBlock) return;
    setDrawer({
      blockId: selectedBlock.id,
      direction: "outbound",
      showTabs: search.isRoundTrip,
    });
  }

  /** Re-runs the search: URL reflects the new params and the selection resets. */
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

  const layoutToggle = (
    <LayoutToggle
      value={layout}
      onChange={(next) => {
        setLayout(next);
        if (next === "standard") setEditOpen(false);
      }}
    />
  );

  const blocks = (
    <div
      className={cn(
        "flex flex-col",
        layout === "standard" ? "gap-4" : "gap-2",
      )}
    >
      {priceBlocks.map((block) => (
        <FlightPriceBlock
          key={block.id}
          block={block}
          selected={block.id === selection?.blockId}
          selectedOutboundId={
            block.id === selection?.blockId ? selection.outboundId : undefined
          }
          selectedReturnId={
            block.id === selection?.blockId ? selection.returnId : undefined
          }
          showReturn={search.isRoundTrip}
          originCode={originCode}
          destinationCode={destinationCode}
          departureLabel={departureLabel}
          returnLabel={returnLabel}
          onSelect={(direction, flightId) =>
            selectFlight(block.id, direction, flightId)
          }
          onShowDetails={(direction, flightId) =>
            showFlightDetails(block.id, direction, flightId)
          }
        />
      ))}
    </div>
  );

  const summaryCard = (
    <TripSummaryCard
      block={selectedBlock}
      outbound={selectedOutbound}
      returning={selectedReturning}
      showReturn={search.isRoundTrip}
      onOpenDetails={showTripDetails}
    />
  );

  const drawerNode = (
    <FlightDetailsDrawer
      open={drawer !== null}
      onClose={() => setDrawer(null)}
      flight={drawerFlight}
      block={drawerBlock}
      direction={drawer?.direction ?? "outbound"}
      onDirectionChange={(direction) =>
        setDrawer((current) => (current ? { ...current, direction } : current))
      }
      showTabs={drawer?.showTabs ?? false}
      origin={search.origin}
      destination={search.destination}
      departureDate={search.departureDate}
      returnDate={search.returnDate}
    />
  );

  if (layout === "compact") {
    return (
      <AppShell headerExtra={layoutToggle}>
        <CompactQueryBar
          search={search}
          editOpen={editOpen}
          onToggleEdit={() => setEditOpen((value) => !value)}
        />

        {editOpen ? (
          <CompactSearchEditor
            search={search}
            onSearch={() => {
              handleSearch();
              setEditOpen(false);
            }}
          />
        ) : null}

        <div className="relative px-20 pt-4">
          <div className="flex items-start gap-2">
            <AdvancedFilters filters={filters} variant="rail" />

            <div className="min-w-0 flex-1">{blocks}</div>

            <div className="sticky top-4 hidden w-[284px] shrink-0 min-[1400px]:block">
              {summaryCard}
            </div>
          </div>

          {editOpen ? (
            <button
              type="button"
              aria-label="Cerrar edición de búsqueda"
              onClick={() => setEditOpen(false)}
              className="absolute inset-0 z-10 cursor-default bg-black/20"
            />
          ) : null}
        </div>

        {drawerNode}
      </AppShell>
    );
  }

  return (
    <AppShell headerExtra={layoutToggle}>
      <div className="px-8 py-4">
        <div className="flex items-start gap-6">
          <ResultsSearchPanel search={search} onSearch={handleSearch} />

          <div className="flex min-w-0 flex-1 flex-col gap-2">
            <AdvancedFilters filters={filters} />

            <div className="flex items-start gap-2">
              <div className="min-w-0 flex-1">
                <p className="pb-4 text-xs leading-[19px] font-medium text-muted">
                  Aerolínea y equipaje dependen del bloque; las escalas, de cada
                  horario.
                </p>

                {blocks}
              </div>

              <div className="sticky top-4 hidden w-[240px] shrink-0 min-[1400px]:block">
                {summaryCard}
              </div>
            </div>
          </div>
        </div>
      </div>

      {drawerNode}
    </AppShell>
  );
}
