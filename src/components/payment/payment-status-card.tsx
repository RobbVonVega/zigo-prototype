import { cn } from "@/lib/cn";

export type PaymentStatusVariant = "waiting" | "error" | "expired";

const COPY: Record<
  PaymentStatusVariant,
  { title: string; text: string }
> = {
  waiting: {
    title: "Esperando tu pago...",
    text: "Termina el pago en la página de pago. Esta pantalla se actualiza sola, no necesitas recargar.",
  },
  error: {
    title: "El pago no se completó",
    text: "No se te ha cobrado nada. Creamos un nuevo enlace de pago abajo, inténtalo de nuevo o usa otra tarjeta.",
  },
  expired: {
    title: "La tarifa de tu vuelo ha subido un poco",
    text: "Tu enlace de pago expiró mientras la aerolínea actualizaba sus precios. Tus asientos siguen reservados y solo necesitas pagar la diferencia.",
  },
};

const BACKGROUND: Record<PaymentStatusVariant, string> = {
  waiting: "bg-ink/[0.03]",
  error: "bg-[#FF3B30]/10",
  expired: "bg-[#FFCC00]/10",
};

/**
 * Status banner of the payment screen: waiting (green dot), failed (red
 * warning) or expired fare (yellow notice).
 */
export function PaymentStatusCard({
  variant,
}: {
  variant: PaymentStatusVariant;
}) {
  const copy = COPY[variant];
  const showIcon = variant !== "expired";

  return (
    <div
      role="status"
      className={cn(
        "flex items-start gap-4 rounded-[8px] border border-line p-4",
        BACKGROUND[variant],
      )}
    >
      {showIcon ? (
        variant === "waiting" ? (
          <span className="grid size-5 shrink-0 place-items-center rounded-full bg-[#34C759]/20">
            <span className="size-2 rounded-full bg-[#34C759]" />
          </span>
        ) : (
          <span className="grid size-5 shrink-0 place-items-center rounded-full border border-[#FF3B30] text-[11px] leading-none font-bold text-[#FF3B30]">
            !
          </span>
        )
      ) : null}

      <div className="flex min-w-0 flex-1 flex-col gap-3">
        <p className="text-body-lg leading-[14px] font-semibold tracking-[-0.04em] text-ink">
          {copy.title}
        </p>
        <p className="text-xs leading-[13px] font-medium tracking-[-0.04em] text-muted">
          {copy.text}
        </p>
      </div>
    </div>
  );
}
