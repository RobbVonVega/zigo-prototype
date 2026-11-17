import { SelectField } from "./select-field";
import { advancedFilters } from "@/lib/flight-search";

/**
 * Secondary filters, right-aligned under the search panel (Figma node 6706-1423).
 */
export function AdvancedFilters() {
  return (
    <div className="flex flex-wrap items-center justify-end gap-2">
      {advancedFilters.map((filter) => (
        <SelectField
          key={filter.id}
          value={filter.label}
          icon={filter.icon}
          variant="outline"
          className="shrink-0"
        />
      ))}
    </div>
  );
}
