"use client";

import { cn } from "@/lib/cn";
import { PAYMENT_STATES, type PaymentState } from "@/lib/payment";

/** Top-bar toggle to review the payment states (Figma 4 variants). */
export function PaymentStateToggle({
  value,
  onChange,
}: {
  value: PaymentState;
  onChange: (state: PaymentState) => void;
}) {
  return (
    <div
      role="group"
      aria-label="Estado del pago"
      className="ml-1 inline-flex items-center gap-0.5 rounded-[6px] border border-line bg-white p-0.5"
    >
      {PAYMENT_STATES.map((state) => (
        <button
          key={state.id}
          type="button"
          aria-pressed={value === state.id}
          onClick={() => onChange(state.id)}
          className={cn(
            "h-6 rounded-[4px] px-2 text-[11px] leading-[13px] font-semibold tracking-[-0.02em] transition-colors",
            value === state.id
              ? "bg-ink text-white"
              : "text-muted hover:bg-surface",
          )}
        >
          {state.label}
        </button>
      ))}
    </div>
  );
}
