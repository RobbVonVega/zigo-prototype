import { Icon } from "@/components/icon";
import type { UpcomingFlight } from "@/lib/upcoming-flights";

/**
 * Upcoming-flight card (Figma node 6725-9043): 505×146, 10px radius,
 * 1px #1E1E1E/7% border, 145px photo + 15px padded content.
 */
export function FlightCard({ flight }: { flight: UpcomingFlight }) {
  return (
    <article className="flex h-[146px] overflow-hidden rounded-card border border-ink/[0.07] bg-white">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={flight.image.src}
        alt={flight.image.alt}
        width={290}
        height={290}
        className="h-full w-[145px] shrink-0 object-cover"
      />

      <div className="flex min-w-0 flex-1 flex-col justify-between p-[15px]">
        <div className="flex items-start justify-between gap-5">
          <div className="flex min-w-0 flex-col gap-[3px]">
            <p className="text-body-lg leading-[16px] font-medium text-ink/30">
              Vuelo
            </p>
            <p className="text-h3 leading-[24px] font-bold">
              {flight.from.code} → {flight.to.code}
            </p>
            <p className="truncate text-body leading-[14px] font-medium text-ink/30">
              {flight.from.city} → {flight.to.city}
            </p>
          </div>

          <div className="flex w-[131px] shrink-0 flex-col gap-[10px]">
            <button
              type="button"
              className="h-[38px] rounded-control border border-ink bg-white text-body font-semibold text-ink transition-colors hover:bg-surface"
            >
              Ver detalles
            </button>

            <p className="flex items-center gap-[5px] text-sm leading-[13px] font-semibold text-ink">
              <span className="text-ink/30">Ref:</span>
              {flight.reference}
              <Icon name="copy" className="size-[10px] text-ink" />
            </p>
          </div>
        </div>

        <div className="h-px w-full bg-line" />

        <div className="flex gap-[10px]">
          <div className="flex min-w-0 flex-1 flex-col gap-[6px]">
            <p className="text-sm leading-[13px] font-medium text-ink/30">
              Pasajero Principal
            </p>
            <p className="truncate text-body-lg leading-[16px] font-medium text-ink">
              {flight.passenger}
            </p>
          </div>

          <div className="flex shrink-0 flex-col gap-[6px]">
            <p className="text-sm leading-[13px] font-medium text-ink/30">
              Fecha salida
            </p>
            <p className="text-sm leading-[13px] font-semibold text-ink">
              {flight.date}
            </p>
          </div>

          <div className="flex shrink-0 flex-col gap-[6px]">
            <p className="text-sm leading-[13px] font-medium text-ink/30">
              Hora salida
            </p>
            <p className="text-sm leading-[13px] font-semibold text-ink">
              {flight.time}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}
