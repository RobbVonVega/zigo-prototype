"use client";

import { useEffect, useState } from "react";

/**
 * Simple countdown for the fare-hold timer on the reservation screen.
 * Starts at `initialSeconds` and ticks down to zero.
 */
export function useCountdown(initialSeconds: number) {
  const [remaining, setRemaining] = useState(initialSeconds);

  useEffect(() => {
    const interval = setInterval(() => {
      setRemaining((value) => (value > 0 ? value - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return remaining;
}

/** 788 → "13 min : 08 seg" (Figma format). */
export function formatCountdown(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const rest = seconds % 60;
  return `${minutes} min : ${String(rest).padStart(2, "0")} seg`;
}
