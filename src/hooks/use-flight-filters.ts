"use client";

import { useState } from "react";

import type { AdvancedFilterId } from "@/lib/flight-search";

/** A time window in minutes from 00:00. */
export type TimeWindow = { start: number; end: number };

/** "Ida" / "Regreso" of the flight-time filter. */
export type TimeTab = "outbound" | "inbound";
export type TimeField = "departure" | "arrival";

export type TimeWindows = Record<
  TimeTab,
  Record<TimeField, TimeWindow>
>;

/** 10:00 am – 5:00 pm, the range shown in the Figma menu. */
export const DEFAULT_TIME_WINDOW: TimeWindow = { start: 10 * 60, end: 17 * 60 };

type SingleFilterId = "stops" | "cabin" | "bags";

const initialTimes: TimeWindows = {
  outbound: {
    departure: DEFAULT_TIME_WINDOW,
    arrival: DEFAULT_TIME_WINDOW,
  },
  inbound: {
    departure: DEFAULT_TIME_WINDOW,
    arrival: DEFAULT_TIME_WINDOW,
  },
};

/**
 * Selections for the advanced filter menus.
 * Single-choice filters hold one id, airlines hold many, times hold a range per
 * direction and per departure/arrival.
 */
export function useFlightFilters() {
  const [airlines, setAirlines] = useState<string[]>([]);
  const [single, setSingle] = useState<Record<SingleFilterId, string | null>>({
    stops: null,
    cabin: null,
    bags: null,
  });
  const [times, setTimes] = useState<TimeWindows>(initialTimes);

  function toggleAirline(optionId: string) {
    setAirlines((current) =>
      current.includes(optionId)
        ? current.filter((id) => id !== optionId)
        : [...current, optionId],
    );
  }

  function selectSingle(filterId: SingleFilterId, optionId: string) {
    setSingle((current) => ({ ...current, [filterId]: optionId }));
  }

  function setTimeWindow(tab: TimeTab, field: TimeField, window: TimeWindow) {
    setTimes((current) => ({
      ...current,
      [tab]: { ...current[tab], [field]: window },
    }));
  }

  function clearTimeField(tab: TimeTab, field: TimeField) {
    setTimeWindow(tab, field, DEFAULT_TIME_WINDOW);
  }

  function isActive(filterId: AdvancedFilterId) {
    if (filterId === "airlines") return airlines.length > 0;
    if (filterId === "time") {
      return Object.values(times).some((tab) =>
        Object.values(tab).some(
          (window) =>
            window.start !== DEFAULT_TIME_WINDOW.start ||
            window.end !== DEFAULT_TIME_WINDOW.end,
        ),
      );
    }
    return single[filterId] !== null;
  }

  function clear(filterId: AdvancedFilterId) {
    if (filterId === "airlines") {
      setAirlines([]);
      return;
    }
    if (filterId === "time") {
      setTimes(initialTimes);
      return;
    }
    setSingle((current) => ({ ...current, [filterId]: null }));
  }

  return {
    airlines,
    toggleAirline,
    single,
    selectSingle,
    times,
    setTimeWindow,
    clearTimeField,
    isActive,
    clear,
  };
}

export type FlightFiltersModel = ReturnType<typeof useFlightFilters>;
