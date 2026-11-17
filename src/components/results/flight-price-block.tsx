"use client";

import { useState } from "react";

import { FlightOptionRow } from "./flight-option-row";
import { Icon } from "@/components/icon";
import { cn } from "@/lib/cn";
import {
  formatCop,
  luggageFlags,
  type LuggageType,
  type PriceBlock,
} from "@/lib/results";

const LUGGAGE_SIZES: readonly [number, number][] = [
  [7, 8],
  [8, 12],
  [11, 16],
];

function LuggageIcons({ type }: { type: LuggageType }) {
  return (
    <span className="flex items-end gap-[2px]">
      {luggageFlags(type).map((included, index) => (
        <span
          key={index}
          className={cn(
            "rounded-[2px] border",
            included ? "border-cyan-400" : "border-[#D3D3D3]",
          )}
          style={{
            width: LUGGAGE_SIZES[index][0],
            height: LUGGAGE_SIZES[index][1],
          }}
        />
      ))}
    </span>
  );
}

function FlightColumn({
  title,
  fromCode,
  toCode,
  dateLabel,
  flights,
  selectedId,
  onSelect,
}: {
  title: string;
  fromCode: string;
  toCode: string;
  dateLabel: string;
  flights: PriceBlock["outbound"];
  selectedId?: string;
  onSelect: (flightId: string) => void;
}) {
  return (
    <div role="radiogroup" aria-label={title}>
      <div className="flex items-center gap-2 border-b border-line px-3 py-2 text-xs leading-[14px]">
        <span className="font-semibold text-muted">{title}</span>
        <span className="text-muted">⋅</span>
        <span className="flex items-center gap-1 font-medium text-muted">
          {fromCode}
          <Icon name="arrow-right" className="size-[10px]" />
          {toCode}
        </span>
        <span className="text-muted">⋅</span>
        <span className="font-medium text-muted">{dateLabel}</span>
      </div>

      {flights.map((flight) => (
        <FlightOptionRow
          key={flight.id}
          flight={flight}
          selected={flight.id === selectedId}
          onSelect={() => onSelect(flight.id)}
        />
      ))}
    </div>
  );
}

export type FlightPriceBlockProps = {
  block: PriceBlock;
  selected: boolean;
  selectedOutboundId?: string;
  selectedReturnId?: string;
  showReturn: boolean;
  originCode: string;
  destinationCode: string;
  departureLabel: string;
  returnLabel: string;
  onSelect: (direction: "outbound" | "returning", flightId: string) => void;
};

/**
 * Itinerary package (Figma 6724-5421 "Flight Price Block"): price, airline,
 * luggage, and the outbound/return options that can be combined. Selected
 * blocks get the cyan border (#73DFED).
 */
export function FlightPriceBlock({
  block,
  selected,
  selectedOutboundId,
  selectedReturnId,
  showReturn,
  originCode,
  destinationCode,
  departureLabel,
  returnLabel,
  onSelect,
}: FlightPriceBlockProps) {
  const [open, setOpen] = useState(true);

  return (
    <article
      className={cn(
        "overflow-hidden rounded-[8px] border bg-white",
        selected ? "border-[#73DFED]" : "border-line",
      )}
    >
      <div className="flex items-start gap-6 bg-surface p-3">
        <p className="whitespace-nowrap text-body-lg font-semibold tracking-[-0.04em] text-ink">
          {formatCop(block.price)} COP
        </p>

        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <div className="flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={block.airline.logo}
              alt=""
              width={16}
              height={16}
              className="size-4 shrink-0"
            />
            <span className="text-xs leading-[14.4px] font-medium text-ink">
              {block.airline.name}
            </span>

            <span aria-hidden="true" className="h-4 w-px bg-[#D3D3D3]" />

            <span className="flex items-center gap-2">
              <LuggageIcons type={block.luggage.type} />
              <span className="text-xs leading-[14.4px] font-semibold text-ink">
                {block.luggage.label}
              </span>
            </span>
          </div>

          <p className="text-xs leading-[14.4px] font-medium text-muted">
            {block.summary}
          </p>
        </div>

        <button
          type="button"
          aria-expanded={open}
          aria-label={open ? "Contraer bloque" : "Expandir bloque"}
          onClick={() => setOpen((value) => !value)}
          className="grid size-[18px] shrink-0 place-items-center"
        >
          <Icon
            name="chevron-down"
            className={cn(
              "size-[18px] text-ink transition-transform",
              open && "rotate-180",
            )}
          />
        </button>
      </div>

      {open ? (
        <div
          className={cn(
            "grid divide-x divide-line border-t border-line",
            showReturn ? "grid-cols-2" : "grid-cols-1",
          )}
        >
          <FlightColumn
            title="Ida"
            fromCode={originCode}
            toCode={destinationCode}
            dateLabel={departureLabel}
            flights={block.outbound}
            selectedId={selectedOutboundId}
            onSelect={(flightId) => onSelect("outbound", flightId)}
          />

          {showReturn ? (
            <FlightColumn
              title="Regreso"
              fromCode={destinationCode}
              toCode={originCode}
              dateLabel={returnLabel}
              flights={block.returning}
              selectedId={selectedReturnId}
              onSelect={(flightId) => onSelect("returning", flightId)}
            />
          ) : null}
        </div>
      ) : null}
    </article>
  );
}
