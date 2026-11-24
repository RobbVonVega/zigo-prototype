import { formatCop, type PriceBlock } from "@/lib/results";

/**
 * "Proceder al pago" (Figma 6759-7498): total recap and the primary CTA.
 * The payment step is not built yet, so the button has no action.
 */
export function PaymentSection({
  block,
  onPay,
}: {
  block: PriceBlock;
  onPay: () => void;
}) {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-[24px] leading-[17px] font-semibold tracking-[-0.04em] text-ink">
        Proceder al pago
      </h2>

      <div className="flex flex-col gap-3 rounded-[4px] border border-line bg-white p-3">
        <div className="flex items-center justify-between gap-3 text-xs leading-[14.4px] tracking-[-0.04em]">
          <span className="font-medium text-muted">Total</span>
          <span className="text-body-lg font-semibold text-ink">
            {formatCop(block.price)} COP
          </span>
        </div>

        <button
          type="button"
          onClick={onPay}
          className="h-[30px] w-full rounded-[4px] bg-brand text-xs font-semibold tracking-[-0.04em] text-white transition-colors hover:bg-brand-hover"
        >
          Ir al Pago
        </button>
      </div>
    </section>
  );
}
