"use client";

import { FilterChoice } from "./filter-choice";
import { FilterDropdown } from "./filter-dropdown";
import { TimeFilter } from "./time-filter";
import { useFlightFilters } from "@/hooks/use-flight-filters";
import { advancedFilters } from "@/lib/flight-search";

/**
 * Secondary filters, right-aligned under the search panel (Figma node 6706-1423).
 * Each pill opens its menu from nodes 6729-6109 (Escalas), 6729-6130 (Aerolíneas),
 * 6729-6384 (Tipo de cabina), 6729-6448 (Equipaje) and 6729-6500 (Tiempos).
 */
export function AdvancedFilters() {
  const filters = useFlightFilters();

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
          : [filters.single[filter.id as "stops" | "cabin" | "bags"]];

        return (
          <FilterDropdown
            key={filter.id}
            label={filter.label}
            title={filter.title}
            icon={filter.icon}
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
                  onSelect={() =>
                    isMultiple
                      ? filters.toggleAirline(option.id)
                      : filters.selectSingle(
                          filter.id as "stops" | "cabin" | "bags",
                          option.id,
                        )
                  }
                />
              ))}
            </div>
          </FilterDropdown>
        );
      })}
    </div>
  );
}
