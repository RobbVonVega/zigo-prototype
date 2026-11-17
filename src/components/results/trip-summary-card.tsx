import {
  formatCop,
  stopsLabel,
  type FlightOption,
  type PriceBlock,
} from "@/lib/results";

function SummaryFlight({
  label,
  flight,
}: {
  label: string;
  flight?: FlightOption;
}) {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-xs leading-[9px] font-medium text-muted">{label}</p>

      <div className="flex items-start justify-between gap-2">
        <p className="text-xs leading-[9px] font-medium text-muted">
          {flight
            ? `${stopsLabel(flight.stops)} · ${flight.duration}`
            : "Selecciona un vuelo"}
        </p>

        {flight ? (
          <p className="whitespace-nowrap text-xs leading-[9px] font-semibold tabular-nums text-ink">
            {flight.departure} → {flight.arrival}
          </p>
        ) : null}
      </div>
    </div>
  );
}

export type TripSummaryCardProps = {
  block: PriceBlock | null;
  outbound?: FlightOption;
  returning?: FlightOption;
  showReturn: boolean;
};

/**
 * Sticky "Detalle de tu viaje" card (Figma 6724-5421, right column): total of
 * the selected block plus airline, luggage and the chosen flights.
 *
 * It starts empty (no price) and every change fades the details in. Leading
 * values follow Figma's glyph boxes (9/11px) so the card keeps its height.
 */
export function TripSummaryCard({
  block,
  outbound,
  returning,
  showReturn,
}: TripSummaryCardProps) {
  const detailKey = `${block?.id ?? "none"}-${outbound?.id ?? ""}-${
    returning?.id ?? ""
  }`;

  return (
    <div className="rounded-[8px] bg-white px-3 pt-6 pb-6 ring-1 ring-ink/10">
      <h2 className="text-body-lg leading-[11px] font-medium text-ink">
        Detalle de tu viaje
      </h2>

      <div key={detailKey} className="animate-loader-fade">
        <div className="mt-5 rounded-[4px] border border-line p-3">
          <p className="text-xs leading-[9px] font-semibold text-muted">Total</p>
          <p className="mt-1 text-body-lg leading-[11px] font-semibold text-ink">
            {block ? `Desde ${formatCop(block.price)} COP` : "—"}
          </p>
        </div>

        <dl className="mt-5 flex flex-col gap-4">
          <div className="flex items-center justify-between gap-2">
            <dt className="text-xs leading-[9px] font-medium text-muted">
              Aerolínea
            </dt>
            <dd className="text-xs leading-[9px] font-semibold text-ink">
              {block?.airline.name ?? "—"}
            </dd>
          </div>

          <div className="flex items-center justify-between gap-2">
            <dt className="text-xs leading-[9px] font-medium text-muted">
              Equipaje
            </dt>
            <dd className="text-right text-xs leading-[9px] font-semibold text-ink">
              {block?.luggage.label ?? "—"}
            </dd>
          </div>
        </dl>

        <div className="my-4 h-px bg-line" />

        <SummaryFlight label="Vuelo de ida" flight={outbound} />

        {showReturn ? (
          <>
            <div className="my-4 h-px bg-line" />
            <SummaryFlight label="Vuelo de regreso" flight={returning} />
          </>
        ) : null}
      </div>

      <button
        type="button"
        disabled={!block}
        className="mt-5 h-[30px] w-full rounded-[4px] bg-brand text-xs font-semibold tracking-[-0.04em] text-white transition-colors hover:bg-brand-hover disabled:cursor-not-allowed disabled:opacity-40"
      >
        Continuar
      </button>
    </div>
  );
}
