import { Icon } from "@/components/icon";
import { stopsLabel, type FlightOption } from "@/lib/results";

/**
 * One selectable flight inside a price block (Figma "Flight Hour Item").
 * 31px row: radio, departure → arrival, stops tag, duration.
 */
export function FlightOptionRow({
  flight,
  selected,
  onSelect,
}: {
  flight: FlightOption;
  selected: boolean;
  onSelect: () => void;
}) {
  const isDirect = flight.stops === 0;

  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={onSelect}
      className="flex w-full items-center gap-3 px-3 py-2 text-left transition-colors hover:bg-surface/60"
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

      <span className="flex shrink-0 items-center gap-2">
        <span className="text-xs leading-[14.4px] font-semibold tabular-nums text-ink">
          {flight.departure}
        </span>
        <Icon name="arrow-right" className="size-[10px] text-muted" />
        <span className="text-xs leading-[14.4px] font-medium tabular-nums text-muted">
          {flight.arrival}
        </span>
      </span>

      <span
        className={
          isDirect
            ? "rounded-[8px] bg-cyan-soft px-2 py-[3px] text-xs leading-[9px] font-medium text-cyan-600"
            : "rounded-[8px] border border-brand px-2 py-[3px] text-xs leading-[9px] font-medium text-brand"
        }
      >
        {stopsLabel(flight.stops)}
      </span>

      <span className="ml-auto text-xs leading-[14.4px] font-medium text-muted">
        {flight.duration}
      </span>
    </button>
  );
}
