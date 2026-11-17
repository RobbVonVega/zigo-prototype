import { Icon } from "@/components/icon";
import { stopsLabel, type FlightOption } from "@/lib/results";

/**
 * One selectable flight inside a price block (Figma "Flight Hour Item").
 * 31px row: radio, departure → arrival, stops tag, duration.
 * The row is a radio; the stops tag is its own button that opens the flight
 * details drawer without changing the selection.
 */
export function FlightOptionRow({
  flight,
  selected,
  onSelect,
  onShowDetails,
}: {
  flight: FlightOption;
  selected: boolean;
  onSelect: () => void;
  onShowDetails: () => void;
}) {
  const isDirect = flight.stops === 0;

  return (
    <div
      role="radio"
      aria-checked={selected}
      tabIndex={0}
      onClick={onSelect}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onSelect();
        }
      }}
      className="flex w-full cursor-pointer items-center gap-3 px-3 py-2 text-left transition-colors hover:bg-surface/60 focus-visible:bg-surface/60 focus-visible:outline-none"
    >
      <span
        className={`grid size-3 shrink-0 place-items-center rounded-full border ${
          selected ? "border-brand bg-brand" : "border-muted/60 bg-white"
        }`}
      >
        {selected ? (
          <Icon name="check" className="h-[5px] w-[7px] text-white" />
        ) : null}
      </span>

      <span className="flex w-[92px] shrink-0 items-center gap-2">
        <span className="text-xs leading-[14.4px] font-semibold tabular-nums text-ink">
          {flight.departure}
        </span>
        <Icon name="arrow-right" className="size-[10px] text-muted" />
        <span className="text-xs leading-[14.4px] font-medium tabular-nums text-muted">
          {flight.arrival}
        </span>
      </span>

      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          onShowDetails();
        }}
        className={
          isDirect
            ? "cursor-pointer rounded-[8px] bg-cyan-soft px-2 py-[3px] text-xs leading-[9px] font-medium text-cyan-600 transition-colors hover:bg-cyan-400/40"
            : "cursor-pointer rounded-[8px] border border-brand px-2 py-[3px] text-xs leading-[9px] font-medium text-brand transition-colors hover:bg-brand-tint"
        }
      >
        {stopsLabel(flight.stops)}
      </button>

      <span className="ml-auto text-xs leading-[14.4px] font-medium text-muted">
        {flight.duration}
      </span>
    </div>
  );
}
