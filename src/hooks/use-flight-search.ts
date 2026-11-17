"use client";

import { useState } from "react";

import type { Airport } from "@/lib/airports";
import {
  activeTripTypeId,
  passengers,
  type PassengerId,
  type TripTypeId,
} from "@/lib/flight-search";

/** Passengers can be counted from 0 to 9 per category. */
export const PASSENGER_MIN = 0;
export const PASSENGER_MAX = 9;

export type PassengerCounts = Record<PassengerId, number>;

const initialCounts = Object.fromEntries(
  passengers.map((passenger) => [passenger.id, passenger.count]),
) as PassengerCounts;

/**
 * Single source of truth for the flight-search form.
 * The section owns the hook and passes values/handlers down, so every control
 * stays a dumb, typed component.
 */
export function useFlightSearch() {
  const [tripType, setTripType] = useState<TripTypeId>(activeTripTypeId);
  const [counts, setCounts] = useState<PassengerCounts>(initialCounts);
  const [origin, setOrigin] = useState<Airport | null>(null);
  const [destination, setDestination] = useState<Airport | null>(null);
  const [departureDate, setDepartureDate] = useState<Date | undefined>();
  const [returnDate, setReturnDate] = useState<Date | undefined>();

  /** Clamps between the allowed passenger range. */
  function changePassenger(id: PassengerId, delta: 1 | -1) {
    setCounts((current) => ({
      ...current,
      [id]: Math.min(
        PASSENGER_MAX,
        Math.max(PASSENGER_MIN, current[id] + delta),
      ),
    }));
  }

  /** A departure after the current return date invalidates it. */
  function changeDepartureDate(date: Date | undefined) {
    setDepartureDate(date);
    if (date && returnDate && returnDate < date) setReturnDate(undefined);
  }

  /** Origin ⇄ destination, keeping the dates untouched. */
  function swapRoute() {
    setOrigin(destination);
    setDestination(origin);
  }

  return {
    tripType,
    setTripType,
    isRoundTrip: tripType === "round-trip",
    counts,
    changePassenger,
    origin,
    setOrigin,
    destination,
    setDestination,
    swapRoute,
    departureDate,
    setDepartureDate: changeDepartureDate,
    returnDate,
    setReturnDate,
  };
}

export type FlightSearchModel = ReturnType<typeof useFlightSearch>;
