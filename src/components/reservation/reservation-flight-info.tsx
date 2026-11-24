"use client";

import { Icon } from "@/components/icon";
import { LuggageIcons } from "@/components/ui/luggage-icons";
import { cn } from "@/lib/cn";
import type { Airport } from "@/lib/airports";
import type { FlightOption, PriceBlock } from "@/lib/results";
import { formatFlightDate } from "@/lib/results-url";

function Divider() {
  return <span aria-hidden="true" className="h-[15px] w-px bg-[#D3D3D3]" />;
}

function StopsTag({ stops }: { stops: FlightOption["stops"] }) {
  const label =
    stops === 0
      ? "Directo"
      : stops === 1
        ? "1 Escala"
        : stops === 2
          ? "2 Escalas"
          : "3+ Escalas";

  return (
    <span
      className={cn(
        "rounded-[8px] border px-2 py-[3px] text-xs leading-[9px] font-medium",
        stops === 0
          ? "border-cyan-600 bg-cyan-soft text-cyan-600"
          : "border-brand bg-brand-soft text-brand",
      )}
    >
      {label}
    </span>
  );
}

function FlightRow({
  from,
  to,
  date,
  flight,
  label,
}: {
  from: Airport | null;
  to: Airport | null;
  date?: Date;
  flight: FlightOption;
  label: string;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2 text-xs leading-[15px] tracking-[-0.04em]">
      <span className="font-semibold text-ink">
        {from?.city} ({from?.code})<span className="px-1">→</span>
        {to?.city} ({to?.code})
      </span>

      <Divider />

      <span className="font-medium text-muted">
        {date ? formatFlightDate(date) : "—"}
      </span>

      <Divider />

      <span className="font-medium text-muted">
        {flight.departure} - {flight.arrival}
      </span>

      <Divider />

      <span className="font-medium text-muted">
        {label}: {flight.duration}
      </span>

      <StopsTag stops={flight.stops} />
    </div>
  );
}

export type ReservationFlightInfoProps = {
  block: PriceBlock;
  outbound: FlightOption;
  returning?: FlightOption;
  origin: Airport | null;
  destination: Airport | null;
  departureDate?: Date;
  returnDate?: Date;
  showReturn: boolean;
  onShowDetails: () => void;
};

/**
 * "Tu viaje a {ciudad}" + the itinerary card (Figma 6761-15161).
 * Card: #1E1E1E at 3%, 1px #ECECEC, 8px radius, 16px padding.
 */
export function ReservationFlightInfo({
  block,
  outbound,
  returning,
  origin,
  destination,
  departureDate,
  returnDate,
  showReturn,
  onShowDetails,
}: ReservationFlightInfoProps) {
  return (
    <section className="flex flex-col gap-4">
      <h1 className="text-[24px] leading-[17px] font-semibold tracking-[-0.04em] text-ink">
        Tu viaje a {destination?.city ?? "tu destino"}
      </h1>

      <div className="flex flex-col gap-4 rounded-[8px] border border-line bg-ink/[0.03] p-4">
        <div className="flex flex-wrap items-center gap-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={block.airline.logo}
            alt=""
            width={16}
            height={16}
            className="size-4"
          />
          <span className="text-xs leading-[14.4px] font-medium text-ink">
            {block.airline.name}
          </span>

          <span aria-hidden="true" className="h-4 w-px bg-[#D3D3D3]" />

          <span className="flex items-center gap-[2px] text-xs leading-[14.4px] font-medium text-ink">
            {origin?.code ?? "—"}
            <Icon name="arrows-left-right" className="size-[10px]" />
            {destination?.code ?? "—"}
          </span>

          <span aria-hidden="true" className="h-4 w-px bg-[#D3D3D3]" />

          <span className="flex items-center gap-2">
            <LuggageIcons type={block.luggage.type} />
            <span className="text-xs leading-[14.4px] font-medium text-ink">
              {block.luggage.label}
            </span>
          </span>

          <button
            type="button"
            onClick={onShowDetails}
            className="ml-auto text-xs leading-[14.4px] font-semibold text-brand underline underline-offset-[3px] transition-colors hover:text-brand-hover"
          >
            Mostrar detalles del viaje
          </button>
        </div>

        <div className="h-px w-full bg-line" />

        <FlightRow
          from={origin}
          to={destination}
          date={departureDate}
          flight={outbound}
          label="Vuelo de ida"
        />

        {showReturn && returning ? (
          <FlightRow
            from={destination}
            to={origin}
            date={returnDate}
            flight={returning}
            label="Vuelo de regreso"
          />
        ) : null}
      </div>
    </section>
  );
}
