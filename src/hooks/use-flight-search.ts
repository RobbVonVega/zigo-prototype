"use client";

import { useState } from "react";

import {
  PASSENGER_MAX,
  activeTripTypeId,
  passengers,
  type PassengerCounts,
  type PassengerId,
  type TripTypeId,
} from "@/lib/flight-search";
import type { Airport } from "@/lib/airports";

export { PASSENGER_MAX };
export type { PassengerCounts };

const defaultCounts = Object.fromEntries(
  passengers.map((passenger) => [passenger.id, passenger.count]),
) as PassengerCounts;

/** Optional seed, used by the results screen when it reads the URL. */
export type FlightSearchInitial = {
  tripType?: TripTypeId;
  counts?: Partial<PassengerCounts>;
  origin?: Airport | null;
  destination?: Airport | null;
  departureDate?: Date;
  returnDate?: Date;
};

/** Counter floor per passenger type: adults never drop below 1. */
const minimums = Object.fromEntries(
  passengers.map((passenger) => [passenger.id, passenger.min]),
) as PassengerCounts;

/**
 * Single source of truth for the flight-search form.
 * The section owns the hook and passes values/handlers down, so every control
 * stays a dumb, typed component.
 */
export function useFlightSearch(initial: FlightSearchInitial = {}) {
  const [tripType, setTripType] = useState<TripTypeId>(
    initial.tripType ?? activeTripTypeId,
  );
  const [counts, setCounts] = useState<PassengerCounts>({
    ...defaultCounts,
    ...initial.counts,
  });
  const [origin, setOrigin] = useState<Airport | null>(initial.origin ?? null);
  const [destination, setDestination] = useState<Airport | null>(
    initial.destination ?? null,
  );
  const [departureDate, setDepartureDate] = useState<Date | undefined>(
    initial.departureDate,
  );
  const [returnDate, setReturnDate] = useState<Date | undefined>(
    initial.returnDate,
  );

  /** Steps one unit, clamped between the passenger's floor and 9. */
  function changePassenger(id: PassengerId, delta: 1 | -1) {
    setCounts((current) => ({
      ...current,
      [id]: Math.min(PASSENGER_MAX, Math.max(minimums[id], current[id] + delta)),
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
