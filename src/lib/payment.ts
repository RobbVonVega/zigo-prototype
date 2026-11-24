import { format } from "date-fns";

import type { Airport } from "@/lib/airports";
import type { PassengerCounts } from "@/lib/flight-search";
import {
  parseResultsParams,
  type ResultsSearch,
} from "@/lib/results-url";

/** Payment screen states (Figma 6770-7488, 6775-7708, 6775-15138, 6775-14878). */
export type PaymentState = "waiting" | "error" | "expired" | "success";

export const PAYMENT_STATES: readonly { id: PaymentState; label: string }[] = [
  { id: "waiting", label: "Pago" },
  { id: "error", label: "Error" },
  { id: "expired", label: "Expirado" },
  { id: "success", label: "Éxito" },
];

/** Extra fare charged when the payment link expires. */
export const ADDITIONAL_FARE = 320157;

/** Mock PNR shown on the confirmation card. */
export const BOOKING_PNR = "H15@5O";

export type PaymentContact = {
  name: string;
  email: string;
  phone: string;
};

export type PaymentSearch = ResultsSearch & {
  blockId: string;
  outboundId?: string;
  returningId?: string;
  contact: PaymentContact;
  state: PaymentState;
};

export function parsePaymentState(value: string | null): PaymentState {
  return value === "error" || value === "expired" || value === "success"
    ? value
    : "waiting";
}

export function parsePaymentParams(params: URLSearchParams): PaymentSearch {
  const base = parseResultsParams(params);
  return {
    ...base,
    blockId: params.get("block") ?? "block-1",
    outboundId: params.get("out") ?? undefined,
    returningId: params.get("back") ?? undefined,
    contact: {
      name: params.get("name") ?? "",
      email: params.get("mail") ?? "",
      phone: params.get("tel") ?? "",
    },
    state: parsePaymentState(params.get("estado")),
  };
}

export function buildPaymentUrl(input: {
  search: ResultsSearch;
  blockId: string;
  outboundId?: string;
  returningId?: string;
  contact: PaymentContact;
  state?: PaymentState;
}): string {
  const params = new URLSearchParams();
  params.set("trip", input.search.tripType);
  if (input.search.origin) params.set("from", input.search.origin.code);
  if (input.search.destination) params.set("to", input.search.destination.code);
  if (input.search.departureDate) {
    params.set("dep", format(input.search.departureDate, "yyyy-MM-dd"));
  }
  if (input.search.tripType === "round-trip" && input.search.returnDate) {
    params.set("ret", format(input.search.returnDate, "yyyy-MM-dd"));
  }
  params.set("adults", String(input.search.counts.adult));
  params.set("children", String(input.search.counts.child));
  params.set("infants", String(input.search.counts.infant));
  params.set("block", input.blockId);
  if (input.outboundId) params.set("out", input.outboundId);
  if (input.returningId) params.set("back", input.returningId);
  if (input.contact.name) params.set("name", input.contact.name);
  if (input.contact.email) params.set("mail", input.contact.email);
  if (input.contact.phone) params.set("tel", input.contact.phone);
  if (input.state && input.state !== "waiting") {
    params.set("estado", input.state);
  }
  return `/pago?${params.toString()}`;
}

/** "2 adultos" / "1 adulto, 1 niño" */
export function passengersLabel(counts: PassengerCounts) {
  const parts: string[] = [];
  if (counts.adult > 0) {
    parts.push(`${counts.adult} ${counts.adult === 1 ? "adulto" : "adultos"}`);
  }
  if (counts.child > 0) {
    parts.push(`${counts.child} ${counts.child === 1 ? "niño" : "niños"}`);
  }
  if (counts.infant > 0) {
    parts.push(`${counts.infant} ${counts.infant === 1 ? "bebé" : "bebés"}`);
  }
  return parts.join(", ");
}

/** "18/12/26 - 03/01/27" */
export function shortDates(
  departureDate?: Date,
  returnDate?: Date,
): string {
  if (!departureDate) return "—";
  const departure = format(departureDate, "dd/MM/yy");
  if (!returnDate) return departure;
  return `${departure} - ${format(returnDate, "dd/MM/yy")}`;
}

export type PaymentAirports = {
  origin: Airport | null;
  destination: Airport | null;
};
