import { Icon } from "@/components/icon";
import { formatCop } from "@/lib/results";

export type PaymentSuccessCardProps = {
  pnr: string;
  contactName: string;
  contactEmail: string;
  onViewItinerary: () => void;
};

/** Green "Reserva confirmada." card (Figma 6775-7708). */
export function PaymentSuccessCard({
  pnr,
  contactName,
  contactEmail,
  onViewItinerary,
}: PaymentSuccessCardProps) {
  return (
    <div className="flex items-start gap-4 rounded-[8px] border border-line bg-[#34C759]/10 p-6">
      <span className="grid size-11 shrink-0 place-items-center rounded-full bg-[#34C759]/20">
        <Icon name="check" className="h-[13px] w-[18px] text-ink" />
      </span>

      <div className="flex min-w-0 flex-1 flex-col gap-4">
        <h2 className="text-[24px] leading-[17px] font-semibold tracking-[-0.04em] text-ink">
          Reserva confirmada.
        </h2>

        <p className="text-body-lg leading-[19px] font-medium tracking-[-0.04em] text-ink">
          Pago confirmado. Tu código PNR es{" "}
          <span className="font-semibold">{pnr}</span>.
          <br />
          Los boletos electrónicos serán enviados a {contactName} al mail{" "}
          <span className="font-semibold">{contactEmail || "correo@correo.com"}</span>
        </p>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={onViewItinerary}
            className="h-[30px] rounded-[4px] bg-ink px-4 text-xs font-semibold tracking-[-0.04em] text-white transition-colors hover:bg-ink/90"
          >
            Ver itinerario
          </button>

          <span className="text-xs leading-[13px] font-medium tracking-[-0.04em] text-muted">
            Ya puedes cerrar la pestaña de pago y/o esta página.
          </span>
        </div>
      </div>
    </div>
  );
}

export type ExpiredPaymentSummaryProps = {
  originCode: string;
  destinationCode: string;
  dates: string;
  passengers: string;
  paid: number;
  additional: number;
};

/** "Ya pagado / Tarifa adicional / Total a pagar ahora" recap (6775-14878). */
export function ExpiredPaymentSummary({
  originCode,
  destinationCode,
  dates,
  passengers,
  paid,
  additional,
}: ExpiredPaymentSummaryProps) {
  return (
    <div className="flex flex-col gap-4 rounded-[8px] border border-line px-4 py-4 text-xs leading-[11px] tracking-[-0.04em]">
      <div className="flex flex-wrap items-center gap-2">
        <span className="font-semibold text-muted">Ya pagado</span>
        <span aria-hidden="true" className="h-[11px] w-px bg-[#D3D3D3]" />
        <span className="flex items-center gap-[2px] font-medium text-muted">
          {originCode}
          <Icon name="arrows-left-right" className="size-[10px]" />
          {destinationCode}
        </span>
        <span aria-hidden="true" className="h-[11px] w-px bg-[#D3D3D3]" />
        <span className="font-medium text-muted">{dates}</span>
        <span aria-hidden="true" className="h-[11px] w-px bg-[#D3D3D3]" />
        <span className="font-medium text-muted">{passengers}</span>
        <span className="ml-auto font-semibold text-muted">
          {formatCop(paid)} COP
        </span>
      </div>

      <div className="flex items-center justify-between gap-3">
        <span className="font-semibold text-muted">Tarifa adicional</span>
        <span className="font-semibold text-muted">
          + {formatCop(additional)} COP
        </span>
      </div>

      <div className="h-px w-full bg-line" />

      <div className="flex items-center justify-between gap-3">
        <span className="font-semibold text-muted">Total a pagar ahora</span>
        <span className="text-body-lg font-semibold text-ink">
          {formatCop(additional)} COP
        </span>
      </div>
    </div>
  );
}
