import { Icon } from "@/components/icon";

export type PaymentMethodsProps = {
  /** CTA label, e.g. "Abrir link de pago" or "Pagar 320,157.00 COP". */
  actionLabel: string;
  /** Footnote shown under the methods card (expired state). */
  footnote?: string;
};

/**
 * "Paga desde esta computadora" / QR column (Figma 6770-7488).
 */
export function PaymentMethods({ actionLabel, footnote }: PaymentMethodsProps) {
  return (
    <div className="flex flex-col gap-8 rounded-[8px] border border-ink/10 bg-white p-8">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-center">
        <div className="w-full lg:w-[274px]">
          <p className="text-body-lg leading-[14px] font-semibold tracking-[-0.04em] text-ink">
            Paga desde esta computadora
          </p>
          <p className="mt-3 text-xs leading-[13px] font-medium tracking-[-0.04em] text-muted">
            Abre nuestro socio de pago seguro en una nueva pestaña.
          </p>

          <button
            type="button"
            className="mt-4 flex h-[30px] items-center gap-1 rounded-[4px] bg-ink px-4 text-xs font-semibold tracking-[-0.04em] text-white transition-colors hover:bg-ink/90"
          >
            {actionLabel}
            <Icon name="arrow-square-out" className="size-[18px]" />
          </button>
        </div>

        <div className="flex flex-row items-center gap-4 lg:flex-col lg:gap-1">
          <span aria-hidden="true" className="hidden h-[87px] w-px bg-[#D3D3D3] lg:block" />
          <span className="text-[9px] leading-none font-medium text-muted">o</span>
          <span aria-hidden="true" className="hidden h-[87px] w-px bg-[#D3D3D3] lg:block" />
        </div>

        <div className="flex items-center gap-4">
          <div className="relative size-[129px] shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/payment-qr.svg"
              alt="Código QR para pagar desde el teléfono"
              width={129}
              height={129}
              className="size-full"
            />
            <span className="absolute inset-0 m-auto grid size-[26px] place-items-center rounded-[4px] bg-white">
              <Icon name="plane" className="size-4 text-brand" />
            </span>
          </div>

          <div className="w-[129px]">
            <p className="text-body-lg leading-[15px] font-semibold tracking-[-0.04em] text-ink">
              Paga desde tu teléfono
            </p>
            <p className="mt-3 text-xs leading-[13px] font-medium tracking-[-0.04em] text-muted">
              Escanéa con tu cámara.
            </p>
          </div>
        </div>
      </div>

      {footnote ? (
        <p className="text-center text-xs leading-[13px] font-medium tracking-[-0.04em] text-muted">
          {footnote}
        </p>
      ) : null}
    </div>
  );
}
