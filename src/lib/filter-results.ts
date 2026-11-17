import type { TimeWindows } from "@/hooks/use-flight-filters";
import type { FlightOption, PriceBlock } from "@/lib/results";

/**
 * Applies the advanced filters to the mock itineraries so the results react
 * instantly (no search button needed).
 */

export type FilterCriteria = {
  airlines: readonly string[];
  /** "any" | "zero" | "one" | "two" | null */
  stops: string | null;
  /** "any" | "economy" | "premium-economy" | … | null */
  cabin: string | null;
  /** "any" | "backpack" | "carry-on" | "checked" | null */
  bags: string | null;
  time: TimeWindows;
};

const AIRLINE_IDS: Record<string, string> = {
  LATAM: "latam",
  Avianca: "avianca",
  "Copa Airlines": "copa",
  JetSmart: "jetsmart",
};

const STOP_LIMITS: Record<string, number> = {
  zero: 0,
  one: 1,
  two: 2,
};

function toMinutes(value: string) {
  const [hours, minutes] = value.split(":").map(Number);
  return hours * 60 + minutes;
}

function rowMatches(
  flight: FlightOption,
  stopLimit: number | null,
  departureWindow: { start: number; end: number },
  arrivalWindow: { start: number; end: number },
) {
  if (stopLimit !== null && flight.stops > stopLimit) return false;

  const departure = toMinutes(flight.departure);
  const arrival = toMinutes(flight.arrival) % 1440;

  return (
    departure >= departureWindow.start &&
    departure <= departureWindow.end &&
    arrival >= arrivalWindow.start &&
    arrival <= arrivalWindow.end
  );
}

export function filterBlocks(
  blocks: readonly PriceBlock[],
  criteria: FilterCriteria,
): PriceBlock[] {
  const stopLimit =
    criteria.stops && criteria.stops !== "any"
      ? (STOP_LIMITS[criteria.stops] ?? null)
      : null;

  return blocks.flatMap((block) => {
    if (
      criteria.airlines.length > 0 &&
      !criteria.airlines.includes(AIRLINE_IDS[block.airline.name] ?? "")
    ) {
      return [];
    }

    if (criteria.cabin && criteria.cabin !== "any" && block.cabin !== criteria.cabin) {
      return [];
    }

    if (criteria.bags === "carry-on" && block.luggage.type === "mochila") {
      return [];
    }

    if (criteria.bags === "checked" && block.luggage.type !== "facturado") {
      return [];
    }

    const outbound = block.outbound.filter((flight) =>
      rowMatches(
        flight,
        stopLimit,
        criteria.time.outbound.departure,
        criteria.time.outbound.arrival,
      ),
    );

    const returning = block.returning.filter((flight) =>
      rowMatches(
        flight,
        stopLimit,
        criteria.time.inbound.departure,
        criteria.time.inbound.arrival,
      ),
    );

    if (outbound.length === 0 || returning.length === 0) return [];

    return [{ ...block, outbound, returning }];
  });
}
