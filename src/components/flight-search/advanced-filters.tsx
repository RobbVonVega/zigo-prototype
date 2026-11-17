"use client";

import { FilterChoice } from "./filter-choice";
import { FilterDropdown } from "./filter-dropdown";
import { TimeFilter } from "./time-filter";
import { useFlightFilters } from "@/hooks/use-flight-filters";
import { advancedFilters, type AdvancedFilter } from "@/lib/flight-search";

type SingleId = "stops" | "cabin" | "bags";

/**
 * Secondary filters, right-aligned under the search panel (Figma node 6706-1423).
 * Each pill opens its menu from nodes 6729-6109 (Escalas), 6729-6130 (Aerolíneas),
 * 6729-6384 (Tipo de cabina), 6729-6448 (Equipaje) and 6729-6500 (Tiempos).
 * Once a filter has a selection the pill turns cyan and shows a summary + X
 * (node 6729-5960).
 */
export function AdvancedFilters() {
  const filters = useFlightFilters();

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
    return (
      filters.single[filter.id as SingleId] ??
      filter.options?.[0]?.id
    );
  }

  return (
    <div className="flex flex-wrap items-center justify-end gap-2">
      {advancedFilters.map((filter) => {
        if (filter.kind === "time") {
          return (
            <TimeFilter
              key={filter.id}
              times={filters.times}
              onChange={filters.setTimeWindow}
              onClearField={filters.clearTimeField}
              onClear={() => filters.clear(filter.id)}
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

                    filters.selectSingle(
                      filter.id as SingleId,
                      option.id,
                    );
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
