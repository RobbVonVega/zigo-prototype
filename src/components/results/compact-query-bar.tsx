"use client";

import { format } from "date-fns";

import { Icon } from "@/components/icon";
import { cn } from "@/lib/cn";
import type { FlightSearchModel } from "@/hooks/use-flight-search";

/** "18/12/2026 - 03/01/2027" */
function datesLabel(search: FlightSearchModel) {
  if (!search.departureDate) return "dd/mm/yyyy";
  const departure = format(search.departureDate, "dd/MM/yyyy");
  if (!search.isRoundTrip || !search.returnDate) return departure;
  return `${departure} - ${format(search.returnDate, "dd/MM/yyyy")}`;
}

/**
 * Compact results header (Figma 6729-3375 "searchQuery"): route, dates,
 * travellers and the "Editar" toggle that reveals the full search bar.
 */
export function CompactQueryBar({
  search,
  editOpen,
  onToggleEdit,
}: {
  search: FlightSearchModel;
  editOpen: boolean;
  onToggleEdit: () => void;
}) {
  const travellers =
    search.counts.adult + search.counts.child + search.counts.infant;

  return (
    <div className="flex h-[51px] items-center gap-4 border-b border-line bg-white px-20">
      <div className="flex items-center gap-4">
        <span className="flex items-center gap-[4px]">
          <span className="text-xs leading-[14.4px] font-semibold text-ink">
            {search.origin?.code ?? "—"}
          </span>
          <Icon name="arrows-left-right" className="size-4 text-ink" />
          <span className="text-xs leading-[14.4px] font-semibold text-ink">
            {search.destination?.code ?? "—"}
          </span>
        </span>

        <span aria-hidden="true" className="h-[18px] w-px bg-line" />

        <span className="flex items-center gap-2">
          <Icon name="calendar" className="size-4 text-ink" />
          <span className="text-xs leading-[14.4px] font-semibold text-ink">
            {datesLabel(search)}
          </span>
        </span>

        <span aria-hidden="true" className="h-[18px] w-px bg-line" />

        <span className="text-xs leading-[14.4px] font-semibold text-ink">
          {travellers} {travellers === 1 ? "viajero" : "viajeros"}
        </span>

        <span aria-hidden="true" className="h-[18px] w-px bg-line" />

        <button
          type="button"
          aria-expanded={editOpen}
          onClick={onToggleEdit}
          className="flex h-[18px] items-center gap-1 text-xs leading-[14.4px] font-semibold text-brand transition-colors hover:text-brand-hover"
        >
          Editar
          <Icon
            name="chevron-down"
            className={cn(
              "size-[18px] text-brand transition-transform",
              editOpen && "rotate-180",
            )}
          />
        </button>
      </div>
    </div>
  );
}
