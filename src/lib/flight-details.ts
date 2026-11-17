import { findAirport, type Airport } from "@/lib/airports";
import type { FlightOption, PriceBlock } from "@/lib/results";

/**
 * Flight-detail timeline for the "Detalles del vuelo" drawer (Figma 6741-11055
 * and 6740-9495). The mock rows only carry times/stops, so segments, layovers
 * and flight numbers are derived deterministically from each option.
 */

export type FlightPoint = {
  code: string;
  /** "UIO Aeropuerto Internacional Mariscal Sucre" is rendered as code + name. */
  name: string;
};

export type FlightSegment = {
  airline: { name: string; logo: string; operator: string; number: string };
  from: FlightPoint;
  to: FlightPoint;
  /** Minutes from 00:00; arrival may exceed 1440 (+1 day). */
  departure: number;
  arrival: number;
  duration: number;
};

export type FlightLegDetails = {
  segments: FlightSegment[];
  /** Layover minutes between segments. */
  layovers: number[];
  total: number;
};

const AIRPORT_NAMES: Record<string, string> = {
  BOG: "El Dorado",
  UIO: "Mariscal Sucre",
  GYE: "José Joaquín de Olmedo",
  CLO: "Alfonso Bonilla Aragón",
  MDE: "José María Córdova",
  BAQ: "Ernesto Cortissoz",
  CTG: "Rafael Núñez",
  PTY: "Tocumen",
  LIM: "Jorge Chávez",
  SCL: "Arturo Merino Benítez",
  EZE: "Ministro Pistarini",
  MEX: "Benito Juárez",
  CUN: "Cancún",
  GRU: "Guarulhos",
  GIG: "Galeão",
  MVD: "Carrasco",
  ASU: "Silvio Pettirossi",
  SJO: "Juan Santamaría",
  SDQ: "Las Américas",
  CCS: "Maiquetía",
};

const OPERATORS: Record<string, string> = {
  LATAM: "LATAM Ecuador",
  Avianca: "Avianca",
  "Copa Airlines": "Copa Airlines",
  JetSmart: "JetSmart",
};

const AIRLINE_CODES: Record<string, string> = {
  LATAM: "LA",
  Avianca: "AV",
  "Copa Airlines": "CM",
  JetSmart: "JA",
};

const HUBS = ["PTY", "LIM", "MDE", "BOG", "UIO"];

function toMinutes(value: string) {
  const [hours, minutes] = value.split(":").map(Number);
  return hours * 60 + minutes;
}

function point(airport: Airport | null, code: string): FlightPoint {
  const airportName = AIRPORT_NAMES[code];
  return {
    code,
    name: airportName
      ? `Aeropuerto Internacional ${airportName}`
      : `Aeropuerto Internacional de ${airport?.city ?? code}`,
  };
}

function hash(value: string) {
  let result = 0;
  for (let index = 0; index < value.length; index += 1) {
    result = (result * 31 + value.charCodeAt(index)) % 9973;
  }
  return result;
}

/** "6:32 pm" */
export function formatTime12(minutes: number) {
  const normalized = ((minutes % 1440) + 1440) % 1440;
  const hours = Math.floor(normalized / 60);
  const mins = normalized % 60;
  const suffix = hours < 12 ? "am" : "pm";
  const hour12 = hours % 12 === 0 ? 12 : hours % 12;
  return `${hour12}:${String(mins).padStart(2, "0")} ${suffix}`;
}

/** "5h 48m" (totals) / "2h 01min" (segments). */
export function formatDuration(minutes: number, unit: "m" | "min" = "m") {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (hours === 0) return `${mins}min`;
  return `${hours}h ${String(mins).padStart(2, "0")}${unit}`;
}

/** "18 de Diciembre, 2026" */
export function formatLongDate(date: Date) {
  const day = date.getDate();
  const month = date.toLocaleDateString("es-CO", { month: "long" });
  const capitalized = month.charAt(0).toUpperCase() + month.slice(1);
  return `${day} de ${capitalized}, ${date.getFullYear()}`;
}

export function buildFlightLeg(
  option: FlightOption,
  block: PriceBlock,
  origin: Airport | null,
  destination: Airport | null,
): FlightLegDetails {
  const departure = toMinutes(option.departure);
  let arrival = toMinutes(option.arrival);
  if (arrival <= departure) arrival += 24 * 60;
  const total = arrival - departure;

  const segmentCount = Math.min(option.stops + 1, 3);
  const seed = hash(option.id);

  const layovers: number[] = [];
  for (let index = 1; index < segmentCount; index += 1) {
    layovers.push(50 + ((seed + index * 37) % 80));
  }

  const layoverTotal = layovers.reduce((sum, value) => sum + value, 0);
  const airTime = total - layoverTotal;
  const baseLeg = Math.floor(airTime / segmentCount);

  const hubs = HUBS.filter(
    (code) => code !== origin?.code && code !== destination?.code,
  );
  const airlineName = block.airline.name;
  const operator = OPERATORS[airlineName] ?? airlineName;
  const airlineCode = AIRLINE_CODES[airlineName] ?? "ZZ";

  const points: FlightPoint[] = [point(origin, origin?.code ?? "—")];
  for (let index = 0; index < segmentCount - 1; index += 1) {
    const hubCode = hubs[index % Math.max(hubs.length, 1)] ?? "PTY";
    points.push(point(findAirport(hubCode), hubCode));
  }
  points.push(point(destination, destination?.code ?? "—"));

  const segments: FlightSegment[] = [];
  let cursor = departure;

  for (let index = 0; index < segmentCount; index += 1) {
    const isLast = index === segmentCount - 1;
    const duration = isLast
      ? arrival - cursor
      : baseLeg + (seed + index) % 11;

    segments.push({
      airline: {
        name: airlineName,
        logo: block.airline.logo,
        operator,
        number: `${airlineCode} ${3000 + ((seed + index * 211) % 6000)}`,
      },
      from: points[index],
      to: points[index + 1],
      departure: cursor,
      arrival: cursor + duration,
      duration,
    });

    cursor += duration;
    if (!isLast) cursor += layovers[index];
  }

  return { segments, layovers, total };
}
