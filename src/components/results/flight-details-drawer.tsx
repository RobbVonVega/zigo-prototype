"use client";

import { Fragment, useEffect } from "react";

import { Icon } from "@/components/icon";
import { cn } from "@/lib/cn";
import {
  buildFlightLeg,
  formatDuration,
  formatLongDate,
  formatTime12,
  type FlightPoint,
  type FlightSegment,
} from "@/lib/flight-details";
import type { Airport } from "@/lib/airports";
import type { FlightOption, PriceBlock } from "@/lib/results";

export type DetailsDirection = "outbound" | "returning";

export type FlightDetailsDrawerProps = {
  open: boolean;
  onClose: () => void;
  flight?: FlightOption;
  block: PriceBlock | null;
  direction: DetailsDirection;
  onDirectionChange: (direction: DetailsDirection) => void;
  /** Round-trip trip details show the Ida/Regreso tabs (Figma 6740-9495). */
  showTabs: boolean;
  origin: Airport | null;
  destination: Airport | null;
  departureDate?: Date;
  returnDate?: Date;
};

function Rail({
  icon,
  children,
  connector = "solid",
  last = false,
}: {
  icon?: React.ReactNode;
  children: React.ReactNode;
  connector?: "solid" | "dashed";
  last?: boolean;
}) {
  return (
    <li className="relative flex gap-4">
      <div className="relative flex w-6 shrink-0 justify-center">
        <span className="z-10 grid size-6 place-items-center rounded-full bg-surface">
          {icon}
        </span>

        {!last ? (
          <span
            className={cn(
              "absolute top-6 bottom-0 left-1/2 -translate-x-1/2",
              connector === "dashed"
                ? "border-l border-dashed border-line"
                : "w-px bg-line",
            )}
          />
        ) : null}
      </div>

      <div className="min-w-0 flex-1 pb-6">{children}</div>
    </li>
  );
}

function AirportLine({ point }: { point: FlightPoint }) {
  return (
    <p className="text-xs leading-[14.4px] font-medium text-ink">
      {point.code} {point.name}
    </p>
  );
}

function SegmentBlock({ segment }: { segment: FlightSegment }) {
  return (
    <>
      <Rail
        icon={
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={segment.airline.logo}
            alt=""
            width={16}
            height={16}
            className="size-4"
          />
        }
      >
        <p className="text-xs leading-[14.4px] font-medium text-muted">
          {segment.airline.name} - {segment.airline.operator} •{" "}
          {segment.airline.number}
        </p>
      </Rail>

      <Rail
        icon={<Icon name="plane-takeoff" className="size-4 text-ink" />}
        connector={segment.arrival > 1439 ? "dashed" : "solid"}
      >
        <p className="text-body-lg leading-[16px] font-semibold text-ink">
          {formatTime12(segment.departure)}
        </p>
        <AirportLine point={segment.from} />
        <p className="mt-1 text-xs leading-[14.4px] font-medium text-muted">
          Duración {formatDuration(segment.duration, "min")}
        </p>
      </Rail>

      <Rail
        icon={<Icon name="plane-landing" className="size-4 text-ink" />}
        connector="dashed"
      >
        <p className="text-body-lg leading-[16px] font-semibold text-ink">
          {formatTime12(segment.arrival)}
        </p>
        <AirportLine point={segment.to} />
        {segment.arrival > 1439 ? (
          <p className="mt-1 text-xs leading-[14.4px] font-medium text-muted">
            +1 día
          </p>
        ) : null}
      </Rail>
    </>
  );
}

/**
 * Right-side "Detalles del vuelo" drawer (Figma 6741-11055 without tabs,
 * 6740-9495 with Ida/Regreso tabs).
 */
export function FlightDetailsDrawer({
  open,
  onClose,
  flight,
  block,
  direction,
  onDirectionChange,
  showTabs,
  origin,
  destination,
  departureDate,
  returnDate,
}: FlightDetailsDrawerProps) {
  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  if (!open || !flight || !block) return null;

  const from = direction === "outbound" ? origin : destination;
  const to = direction === "outbound" ? destination : origin;
  const date = direction === "outbound" ? departureDate : returnDate;

  const leg = buildFlightLeg(flight, block, from, to);

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 [animation:loader-fade_0.2s_ease-out]"
      onClick={onClose}
    >
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Detalles del vuelo"
        onClick={(event) => event.stopPropagation()}
        className="absolute top-0 right-0 flex h-full w-[639px] max-w-full flex-col overflow-y-auto border-l border-line bg-white pt-8 pb-12 [animation:loader-slide_0.24s_ease-out]"
      >
        <div className="flex items-center justify-between px-8">
          <h2 className="text-[24px] leading-[18px] font-semibold tracking-[-0.04em] text-ink">
            Detalles del vuelo
          </h2>

          <button
            type="button"
            aria-label="Cerrar"
            onClick={onClose}
            className="grid size-[18px] place-items-center text-ink/30 transition-colors hover:text-ink/60"
          >
            <Icon name="close" className="size-[9px]" />
          </button>
        </div>

        {showTabs ? (
          <div className="mt-4 flex gap-5 border-b border-line px-8">
            {(
              [
                { id: "outbound", label: "Vuelo de Ida" },
                { id: "returning", label: "Vuelo de Regreso" },
              ] as const
            ).map((tab) => (
              <button
                key={tab.id}
                type="button"
                aria-pressed={direction === tab.id}
                onClick={() => onDirectionChange(tab.id)}
                className={cn(
                  "-mb-px border-b-2 pb-2 text-xs leading-[14.4px] font-medium tracking-[-0.04em]",
                  direction === tab.id
                    ? "border-brand text-ink"
                    : "border-transparent text-ink",
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        ) : (
          <div className="mt-4 h-4 border-b border-line" />
        )}

        <div className="mt-8 flex flex-col gap-5 px-8">
          <div className="flex items-center gap-3">
            <p className="text-body-lg leading-[16px] font-semibold text-ink">
              {date ? formatLongDate(date) : "—"}
            </p>
            <span aria-hidden="true" className="h-[11px] w-px bg-line" />
            <p className="text-body-lg leading-[16px] font-medium text-muted">
              Duración: {formatDuration(leg.total)}
            </p>
          </div>

          <ol className="flex flex-col">
            {leg.segments.map((segment, index) => (
              <Fragment key={`${segment.airline.number}-${index}`}>
                {index > 0 ? (
                  <Rail connector="dashed">
                    <p className="text-xs leading-[14.4px] font-medium text-muted">
                      Escala de{" "}
                      {formatDuration(leg.layovers[index - 1] ?? 0, "min")}
                    </p>
                  </Rail>
                ) : null}

                <SegmentBlock segment={segment} />
              </Fragment>
            ))}
          </ol>
        </div>
      </aside>
    </div>
  );
}
