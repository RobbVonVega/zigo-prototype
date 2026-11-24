"use client";

import { formatCop, type PriceBlock } from "@/lib/results";
import { formatCountdown, useCountdown } from "@/hooks/use-countdown";

export type ReservationContact = {
  name: string;
  email: string;
  phone: string;
};

function SummaryRow({
  label,
  value,
  strong = false,
}: {
  label: string;
  value: string;
  strong?: boolean;
}) {
  return (
    <div className="flex items-start justify-between gap-3 text-xs leading-[9px] tracking-[-0.04em]">
      <dt className={strong ? "font-semibold text-muted" : "font-medium text-muted"}>
        {label}
      </dt>
      <dd className="text-right font-semibold text-ink">{value}</dd>
    </div>
  );
}

export type ReservationSummaryProps = {
  block: PriceBlock;
  travellers: number;
  tripLabel: string;
  contact: ReservationContact | null;
  /** Fare hold in seconds. */
  holdSeconds: number;
  /** Payment screen hides the total (it moves to the strip). */
  showTotal?: boolean;
  /** Payment screen shows the timer in the title row instead. */
  showTimer?: boolean;
};

/**
 * Right column of the reservation screen (Figma 6761-15597): trip summary,
 * contact (empty until the flow fills it) and the fare-hold timer.
 */
export function ReservationSummary({
  block,
  travellers,
  tripLabel,
  contact,
  holdSeconds,
  showTotal = true,
  showTimer = true,
}: ReservationSummaryProps) {
  const remaining = useCountdown(holdSeconds);

  return (
    <aside className="sticky top-6 w-[240px] shrink-0 self-start">
      <div className="overflow-hidden rounded-[8px] bg-white ring-1 ring-ink/10">
        <section className="px-3 py-6">
          <h2 className="text-body-lg leading-[11px] font-semibold tracking-[-0.04em] text-ink">
            Resumen de tu viaje
          </h2>

          <dl className="mt-6 flex flex-col gap-4">
            <SummaryRow
              label="Número de pasajeros"
              value={String(travellers)}
            />
            <SummaryRow label="Tipo de viaje" value={tripLabel} />
            <SummaryRow label="Aerolínea" value={block.airline.name} />
            <SummaryRow label="Equipaje" value={block.luggage.label} />

            {showTotal ? (
              <>
                <div className="h-px w-full bg-line" />

                <SummaryRow
                  strong
                  label="Total"
                  value={`${formatCop(block.price)} COP`}
                />
              </>
            ) : null}
          </dl>
        </section>

        <section className="border-t border-line px-3 py-6">
          <p className="text-xs leading-[9px] font-semibold tracking-[-0.04em] text-muted">
            Contacto
          </p>

          {contact ? (
            <div className="mt-3 flex flex-col gap-2 text-xs leading-[9px] tracking-[-0.04em]">
              <p className="font-semibold text-ink">{contact.name}</p>
              <p className="font-medium text-ink">{contact.email}</p>
              <p className="font-medium text-ink">{contact.phone}</p>
            </div>
          ) : (
            <p className="mt-3 text-xs leading-[13px] font-medium tracking-[-0.04em] text-muted">
              Se completará durante la reserva.
            </p>
          )}
        </section>

        {showTimer ? (
        <section className="border-t border-line bg-[#FFF5ED] px-3 py-6">
          <div className="flex items-start justify-between gap-2">
            <p className="text-xs leading-[9px] font-medium tracking-[-0.04em] text-ink">
              Precio reservado por
            </p>
            <p
              aria-live="off"
              className="text-xs leading-[9px] font-semibold tracking-[-0.04em] tabular-nums text-ink"
            >
              {formatCountdown(remaining)}
            </p>
          </div>

          <p className="mt-4 text-xs leading-[13px] font-medium tracking-[-0.04em] text-muted">
            Reserva antes de que se acabe el tiempo para asegurar esta tarifa. Si
            el tiempo expira, tendrás que volver a realizar tu búsqueda.
          </p>
        </section>
        ) : null}
      </div>
    </aside>
  );
}
