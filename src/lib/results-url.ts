import { format } from "date-fns";
import { es } from "date-fns/locale";

import { findAirport, type Airport } from "@/lib/airports";
import type { PassengerCounts } from "@/lib/flight-search";
import type { TripTypeId } from "@/lib/flight-search";

export type ResultsSearch = {
  tripType: TripTypeId;
  origin: Airport | null;
  destination: Airport | null;
  departureDate?: Date;
  returnDate?: Date;
  counts: PassengerCounts;
};

/** "/resultados?trip=round-trip&from=UIO&to=BOG&dep=2026-12-18&…" */
export function buildResultsUrl(search: ResultsSearch): string {
  const params = new URLSearchParams();
  params.set("trip", search.tripType);
  if (search.origin) params.set("from", search.origin.code);
  if (search.destination) params.set("to", search.destination.code);
  if (search.departureDate) {
    params.set("dep", format(search.departureDate, "yyyy-MM-dd"));
  }
  if (search.tripType === "round-trip" && search.returnDate) {
    params.set("ret", format(search.returnDate, "yyyy-MM-dd"));
  }
  params.set("adults", String(search.counts.adult));
  params.set("children", String(search.counts.child));
  params.set("infants", String(search.counts.infant));
  return `/resultados?${params.toString()}`;
}

export function parseIsoDate(value?: string | null): Date | undefined {
  if (!value) return undefined;
  const [year, month, day] = value.split("-").map(Number);
  if (!year || !month || !day) return undefined;
  return new Date(year, month - 1, day);
}

function count(value: string | null, fallback: number) {
  if (value === null || value.trim() === "") return fallback;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

/** Defaults mirror the Figma mock so `/resultados` works as a direct link. */
export function parseResultsParams(params: URLSearchParams): ResultsSearch {
  return {
    tripType: params.get("trip") === "one-way" ? "one-way" : "round-trip",
    origin: findAirport(params.get("from")) ?? findAirport("UIO"),
    destination: findAirport(params.get("to")) ?? findAirport("BOG"),
    departureDate: parseIsoDate(params.get("dep")) ?? new Date(2026, 11, 18),
    returnDate: parseIsoDate(params.get("ret")) ?? new Date(2027, 0, 3),
    counts: {
      adult: count(params.get("adults"), 1),
      child: count(params.get("children"), 0),
      infant: count(params.get("infants"), 0),
    },
  };
}

/** "Vie, 18/Dic/2026" */
export function formatFlightDate(date: Date) {
  const weekday = format(date, "EEE", { locale: es });
  const month = format(date, "MMM", { locale: es });
  const capitalizedWeekday =
    weekday.charAt(0).toUpperCase() + weekday.slice(1);
  const capitalizedMonth = month.charAt(0).toUpperCase() + month.slice(1);
  return `${capitalizedWeekday}, ${format(date, "dd")}/${capitalizedMonth}/${format(date, "yyyy")}`;
}

/* ---------------------------------------------------------------------------
 * Reservation screen (/reserva): the search plus the chosen combination.
--------------------------------------------------------------------------- */

export type ReservationSearch = ResultsSearch & {
  blockId: string;
  outboundId?: string;
  returningId?: string;
};

function searchParams(search: ResultsSearch) {
  const params = new URLSearchParams();
  params.set("trip", search.tripType);
  if (search.origin) params.set("from", search.origin.code);
  if (search.destination) params.set("to", search.destination.code);
  if (search.departureDate) {
    params.set("dep", format(search.departureDate, "yyyy-MM-dd"));
  }
  if (search.tripType === "round-trip" && search.returnDate) {
    params.set("ret", format(search.returnDate, "yyyy-MM-dd"));
  }
  params.set("adults", String(search.counts.adult));
  params.set("children", String(search.counts.child));
  params.set("infants", String(search.counts.infant));
  return params;
}

export function buildReservationUrl(input: {
  search: ResultsSearch;
  blockId: string;
  outboundId?: string;
  returningId?: string;
}): string {
  const params = searchParams(input.search);
  params.set("block", input.blockId);
  if (input.outboundId) params.set("out", input.outboundId);
  if (input.returningId) params.set("back", input.returningId);
  return `/reserva?${params.toString()}`;
}

export function parseReservationParams(params: URLSearchParams): ReservationSearch {
  return {
    ...parseResultsParams(params),
    blockId: params.get("block") ?? "block-1",
    outboundId: params.get("out") ?? undefined,
    returningId: params.get("back") ?? undefined,
  };
}

/** "18 Dic" */
export function formatDayMonth(date: Date) {
  const day = format(date, "d", { locale: es });
  const month = format(date, "MMM", { locale: es });
  return `${day} ${month.charAt(0).toUpperCase()}${month.slice(1)}`;
}
