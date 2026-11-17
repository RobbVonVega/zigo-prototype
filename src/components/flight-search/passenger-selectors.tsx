import { Fragment } from "react";

import { Icon } from "@/components/icon";
import { passengers } from "@/lib/flight-search";

/**
 * Passenger counters shown at rest (Figma node 6706-1398).
 * No wiring yet: the buttons exist so counters can be enabled later.
 */
export function PassengerSelectors() {
  return (
    <div className="flex h-8 items-center gap-3 px-[10px]">
      {passengers.map((passenger, index) => (
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
                className="grid size-[18px] place-items-center"
              >
                <Icon name="minus" className="size-[15px] text-ink" />
              </button>

              <span
                aria-live="polite"
                className="w-[18px] text-center text-base leading-[21.6px] font-semibold tracking-[-0.04em] text-ink"
              >
                {passenger.count}
              </span>

              <button
                type="button"
                aria-label={`Agregar ${passenger.label.toLowerCase()}`}
                className="grid size-[18px] place-items-center"
              >
                <Icon name="plus" className="size-[15px] text-ink" />
              </button>
            </div>
          </div>
        </Fragment>
      ))}
    </div>
  );
}
