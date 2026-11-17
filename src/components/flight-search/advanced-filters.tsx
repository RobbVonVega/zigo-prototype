"use client";

import { FilterChoice } from "./filter-choice";
import { FilterDropdown } from "./filter-dropdown";
import { TimeFilter } from "./time-filter";
import type { FlightFiltersModel } from "@/hooks/use-flight-filters";
import { advancedFilters, type AdvancedFilter } from "@/lib/flight-search";
import { cn } from "@/lib/cn";

type SingleId = "stops" | "cabin" | "bags";

/**
 * Secondary filters (Figma node 6706-1423). Two presentations share the same
 * state and menus:
 * - `row`: labelled pills above the results (standard layout).
 * - `rail`: sticky 56px icon-only pills on the left (compact layout, 6729-3375);
 *   hovering shows the full label.
 */
export function AdvancedFilters({
  filters,
  variant = "row",
}: {
  filters: FlightFiltersModel;
  variant?: "row" | "rail";
}) {
  const compact = variant === "rail";

  /** "Avianca", "Avianca +1", "Sin escalas", … */
  function summaryFor(filter: AdvancedFilter): string | null {
    if (!filters.isActive(filter.id)) return null;

    if (filter.kind === "multiple") {
      const chosen =
        filter.options?.filter((option) =>
          filters.airlines.includes(option.id),
        ) ?? [];
      if (chosen.length === 0) return null;
      return chosen.length === 1
        ? chosen[0].label
        : `${chosen[0].label} +${chosen.length - 1}`;
    }

    if (filter.kind === "single") {
      const optionId = filters.single[filter.id as SingleId];
      return (
        filter.options?.find((option) => option.id === optionId)?.label ?? null
      );
    }

    // The time filter has no compact summary in the design.
    return filter.label;
  }

  /**
   * Single filters start on their first ("Cualquier…") option, which is the
   * neutral state: the radio is checked but the pill stays inactive.
   */
  function checkedSingleId(filter: AdvancedFilter): string | undefined {
    return filters.single[filter.id as SingleId] ?? filter.options?.[0]?.id;
  }

  return (
    <div
      className={cn(
        compact
          ? "sticky top-4 flex w-14 shrink-0 flex-col gap-2 self-start"
          : "flex flex-wrap items-center justify-start gap-2",
      )}
    >
      {advancedFilters.map((filter) => {
        if (filter.kind === "time") {
          return (
            <TimeFilter
              key={filter.id}
              times={filters.times}
              onChange={filters.setTimeWindow}
              onClearField={filters.clearTimeField}
              onClear={() => filters.clear(filter.id)}
              compact={compact}
            />
          );
        }

        const isMultiple = filter.kind === "multiple";
        const selected = isMultiple
          ? filters.airlines
          : [checkedSingleId(filter)];

        return (
          <FilterDropdown
            key={filter.id}
            label={filter.label}
            title={filter.title}
            icon={filter.icon}
            activeLabel={summaryFor(filter)}
            onClear={() => filters.clear(filter.id)}
            compact={compact}
          >
            <div
              role={isMultiple ? "group" : "radiogroup"}
              aria-label={filter.title}
              className="flex max-h-[200px] flex-col gap-4 overflow-y-auto"
            >
              {filter.options?.map((option) => (
                <FilterChoice
                  key={option.id}
                  label={option.label}
                  multiple={isMultiple}
                  checked={selected.includes(option.id)}
                  onSelect={() => {
                    if (isMultiple) {
                      filters.toggleAirline(option.id);
                      return;
                    }

                    // The first option is "Cualquier…": clearing the filter.
                    if (option.id === filter.options?.[0]?.id) {
                      filters.clear(filter.id);
                      return;
                    }

                    filters.selectSingle(filter.id as SingleId, option.id);
                  }}
                />
              ))}
            </div>
          </FilterDropdown>
        );
      })}
    </div>
  );
}
