"use client";

import { Fragment } from "react";

import { Icon } from "@/components/icon";
import { cn } from "@/lib/cn";
import { passengers, type PassengerId } from "@/lib/flight-search";
import { PASSENGER_MAX, type PassengerCounts } from "@/hooks/use-flight-search";

export type PassengerSelectorsProps = {
  counts: PassengerCounts;
  onChange: (id: PassengerId, delta: 1 | -1) => void;
};

/**
 * Passenger counters (Figma node 6706-1398). Each click adds or removes one
 * passenger, clamped between 0 and 9.
 */
export function PassengerSelectors({ counts, onChange }: PassengerSelectorsProps) {
  return (
    <div className="flex h-8 items-center gap-3 px-[10px]">
      {passengers.map((passenger, index) => {
        const value = counts[passenger.id];
        const canDecrease = value > passenger.min;
        const canIncrease = value < PASSENGER_MAX;

        return (
          <Fragment key={passenger.id}>
            {index > 0 ? (
              <span aria-hidden="true" className="h-[18px] w-px bg-line" />
            ) : null}

            <div className="flex items-center gap-[10px]">
              <span className="text-xs leading-[14.4px] font-semibold tracking-[-0.04em] text-ink">
                {passenger.label}
              </span>

              <div className="flex items-center gap-[5px]">
                <button
                  type="button"
                  aria-label={`Quitar ${passenger.label.toLowerCase()}`}
                  disabled={!canDecrease}
                  onClick={() => onChange(passenger.id, -1)}
                  className={cn(
                    "grid size-[18px] place-items-center rounded-full transition-colors",
                    canDecrease
                      ? "text-ink/30 hover:text-ink/50"
                      : "cursor-not-allowed text-ink/20",
                  )}
                >
                  <Icon name="minus" className="size-[15px]" />
                </button>

                <span
                  aria-live="polite"
                  className="w-[18px] text-center text-base leading-[21.6px] font-semibold tracking-[-0.04em] text-ink tabular-nums"
                >
                  {value}
                </span>

                <button
                  type="button"
                  aria-label={`Agregar ${passenger.label.toLowerCase()}`}
                  disabled={!canIncrease}
                  onClick={() => onChange(passenger.id, 1)}
                  className={cn(
                    "grid size-[18px] place-items-center rounded-full text-ink transition-colors",
                    canIncrease
                      ? "hover:text-ink/70"
                      : "cursor-not-allowed text-ink/20",
                  )}
                >
                  <Icon name="plus" className="size-[15px]" />
                </button>
              </div>
            </div>
          </Fragment>
        );
      })}
    </div>
  );
}
