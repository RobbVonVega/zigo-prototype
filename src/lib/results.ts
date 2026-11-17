/**
 * Results screen data (Figma node 6724-5421 "Lateral 2 Columns").
 * Each price block is an itinerary package: one airline, one luggage allowance,
 * a fixed price and a set of outbound/return flights. Combinations only happen
 * within a block.
 */

export type FlightStops = 0 | 1 | 2 | 3;

export type FlightOption = {
  id: string;
  /** HH:mm */
  departure: string;
  /** HH:mm */
  arrival: string;
  /** "1h 09m" */
  duration: string;
  stops: FlightStops;
};

export type LuggageType = "mochila" | "mano" | "facturado";

export type CabinClass = "economy" | "premium-economy" | "business";

export type PriceBlock = {
  id: string;
  airline: { name: string; logo: string };
  luggage: { type: LuggageType; label: string };
  /** Used by the "Tipo de cabina" filter. */
  cabin: CabinClass;
  /** Total in COP (no decimals). */
  price: number;
  /** "4 idas ⋅ 3 regresos ⋅ Todos directos" */
  summary: string;
  outbound: readonly FlightOption[];
  returning: readonly FlightOption[];
};

const STOP_LABELS: Record<FlightStops, string> = {
  0: "Directo",
  1: "1 Escala",
  2: "2 Escalas",
  3: "3+ Escalas",
};

export function stopsLabel(stops: FlightStops) {
  return STOP_LABELS[stops];
}

/**
 * 1658018 → "1 658,018.00", as printed in Figma (leading group separated by a
 * space, then commas, then a dot for decimals).
 */
export function formatCop(value: number) {
  const [integer, decimals] = value.toFixed(2).split(".");
  const groups = integer.split(/(?=(?:\d{3})+$)/);
  const head =
    groups.length >= 3
      ? `${groups[0]} ${groups.slice(1).join(",")}`
      : groups.join(",");
  return `${head}.${decimals}`;
}

/** Luggage icons lit per allowance: backpack, cabin bag, checked bag. */
export function luggageFlags(type: LuggageType): [boolean, boolean, boolean] {
  if (type === "mochila") return [true, false, false];
  if (type === "mano") return [true, true, false];
  return [true, true, true];
}

const latam = {
  name: "LATAM",
  logo: "/images/airlines/latam.svg",
};
const avianca = {
  name: "Avianca",
  logo: "/images/airlines/avianca.svg",
};
const copa = {
  name: "Copa Airlines",
  logo: "/images/airlines/copa.svg",
};
const jetsmart = {
  name: "JetSmart",
  logo: "/images/airlines/jetsmart.svg",
};

export const priceBlocks: readonly PriceBlock[] = [
  {
    id: "block-1",
    airline: latam,
    luggage: { type: "mochila", label: "Solo mochila" },
    cabin: "economy",
    price: 1658018,
    summary: "4 idas ⋅ 3 regresos ⋅ Todos directos",
    outbound: [
      { id: "b1-o1", departure: "06:15", arrival: "07:25", duration: "1h 10m", stops: 0 },
      { id: "b1-o2", departure: "09:30", arrival: "10:40", duration: "1h 10m", stops: 0 },
      { id: "b1-o3", departure: "16:45", arrival: "17:55", duration: "1h 10m", stops: 0 },
      { id: "b1-o4", departure: "12:10", arrival: "13:20", duration: "1h 10m", stops: 0 },
    ],
    returning: [
      { id: "b1-r1", departure: "08:20", arrival: "09:30", duration: "1h 10m", stops: 0 },
      { id: "b1-r2", departure: "13:40", arrival: "14:50", duration: "1h 10m", stops: 0 },
      { id: "b1-r3", departure: "19:15", arrival: "20:25", duration: "1h 10m", stops: 0 },
    ],
  },
  {
    id: "block-2",
    airline: avianca,
    luggage: { type: "mano", label: "Mochila + De mano" },
    cabin: "economy",
    price: 1942120,
    summary: "4 idas ⋅ 7 regresos ⋅ Regresos con escala",
    outbound: [
      { id: "b2-o1", departure: "06:37", arrival: "07:46", duration: "1h 09m", stops: 0 },
      { id: "b2-o2", departure: "06:37", arrival: "10:20", duration: "3h 43m", stops: 1 },
      { id: "b2-o3", departure: "10:15", arrival: "11:24", duration: "1h 09m", stops: 0 },
      { id: "b2-o4", departure: "18:20", arrival: "19:29", duration: "1h 09m", stops: 0 },
    ],
    returning: [
      { id: "b2-r1", departure: "08:20", arrival: "09:25", duration: "1h 05m", stops: 0 },
      { id: "b2-r2", departure: "13:40", arrival: "14:50", duration: "1h 10m", stops: 0 },
      { id: "b2-r3", departure: "07:10", arrival: "11:38", duration: "4h 28m", stops: 3 },
      { id: "b2-r4", departure: "16:05", arrival: "17:15", duration: "1h 10m", stops: 0 },
      { id: "b2-r5", departure: "19:15", arrival: "20:30", duration: "1h 15m", stops: 0 },
      { id: "b2-r6", departure: "09:00", arrival: "11:53", duration: "2h 53m", stops: 2 },
      { id: "b2-r7", departure: "21:40", arrival: "22:50", duration: "1h 10m", stops: 0 },
    ],
  },
  {
    id: "block-3",
    airline: latam,
    luggage: { type: "mochila", label: "Solo mochila" },
    cabin: "economy",
    price: 1658018,
    summary: "4 idas ⋅ 3 regresos ⋅ Todos directos",
    outbound: [
      { id: "b3-o1", departure: "06:15", arrival: "07:25", duration: "1h 10m", stops: 0 },
      { id: "b3-o2", departure: "09:30", arrival: "10:40", duration: "1h 10m", stops: 0 },
      { id: "b3-o3", departure: "16:45", arrival: "17:55", duration: "1h 10m", stops: 0 },
      { id: "b3-o4", departure: "12:10", arrival: "13:20", duration: "1h 10m", stops: 0 },
    ],
    returning: [
      { id: "b3-r1", departure: "08:20", arrival: "09:30", duration: "1h 10m", stops: 0 },
      { id: "b3-r2", departure: "13:40", arrival: "14:50", duration: "1h 10m", stops: 0 },
      { id: "b3-r3", departure: "19:15", arrival: "20:25", duration: "1h 10m", stops: 0 },
    ],
  },
  {
    id: "block-4",
    airline: copa,
    luggage: { type: "facturado", label: "Mochila + De mano + Facturado" },
    cabin: "business",
    price: 2210450,
    summary: "3 idas ⋅ 5 regresos ⋅ Ida con escala",
    outbound: [
      { id: "b4-o1", departure: "05:05", arrival: "06:15", duration: "1h 10m", stops: 0 },
      { id: "b4-o2", departure: "08:40", arrival: "12:34", duration: "3h 54m", stops: 1 },
      { id: "b4-o3", departure: "15:25", arrival: "16:35", duration: "1h 10m", stops: 0 },
    ],
    returning: [
      { id: "b4-r1", departure: "07:35", arrival: "08:45", duration: "1h 10m", stops: 0 },
      { id: "b4-r2", departure: "12:20", arrival: "13:30", duration: "1h 10m", stops: 0 },
      { id: "b4-r3", departure: "09:15", arrival: "13:05", duration: "3h 50m", stops: 1 },
      { id: "b4-r4", departure: "18:10", arrival: "19:20", duration: "1h 10m", stops: 0 },
      { id: "b4-r5", departure: "22:05", arrival: "23:15", duration: "1h 10m", stops: 0 },
    ],
  },
  {
    id: "block-5",
    airline: jetsmart,
    luggage: { type: "mochila", label: "Solo mochila" },
    cabin: "economy",
    price: 1480900,
    summary: "2 idas ⋅ 4 regresos ⋅ Todos directos",
    outbound: [
      { id: "b5-o1", departure: "07:00", arrival: "08:10", duration: "1h 10m", stops: 0 },
      { id: "b5-o2", departure: "17:30", arrival: "18:40", duration: "1h 10m", stops: 0 },
    ],
    returning: [
      { id: "b5-r1", departure: "06:30", arrival: "07:40", duration: "1h 10m", stops: 0 },
      { id: "b5-r2", departure: "10:45", arrival: "11:55", duration: "1h 10m", stops: 0 },
      { id: "b5-r3", departure: "15:10", arrival: "16:20", duration: "1h 10m", stops: 0 },
      { id: "b5-r4", departure: "20:00", arrival: "21:10", duration: "1h 10m", stops: 0 },
    ],
  },
];
