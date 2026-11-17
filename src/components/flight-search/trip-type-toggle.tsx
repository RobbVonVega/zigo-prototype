import { Icon } from "@/components/icon";
import {
  activeTripTypeId,
  tripTypes,
  type TripTypeId,
} from "@/lib/flight-search";

type TripTypeToggleProps = {
  activeId?: TripTypeId;
};

/**
 * Segmented control for the trip type (Figma node 6706-1391).
 * White pill = idle, cyan (#D3F7FA) pill = selected.
 */
export function TripTypeToggle({ activeId = activeTripTypeId }: TripTypeToggleProps) {
  return (
    <div
      role="group"
      aria-label="Tipo de viaje"
      className="inline-flex items-center gap-1 rounded-lg border border-line p-0.5"
    >
      {tripTypes.map((tripType) => {
        const isActive = tripType.id === activeId;

        return (
          <button
            key={tripType.id}
            type="button"
            aria-pressed={isActive}
            className={`flex h-[26px] items-center gap-[5px] rounded-[5px] px-2 text-xs leading-[12px] font-semibold tracking-[-0.04em] text-ink ${
              isActive ? "bg-cyan-soft" : "bg-white"
            }`}
          >
            <Icon name={tripType.icon} className="size-4" />
            {tripType.label}
          </button>
        );
      })}
    </div>
  );
}
