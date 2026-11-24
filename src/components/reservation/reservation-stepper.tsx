import { Icon } from "@/components/icon";
import { cn } from "@/lib/cn";

/** 3 = everything completed (payment success). */
export type ReservationStep = 1 | 2 | 3;

/**
 * Checkout stepper (Figma 6759-7498): "Contacto e Información de Pasajeros" →
 * "Paga tu viaje".
 */
export function ReservationStepper({ step }: { step: ReservationStep }) {
  const steps = [
    { id: 1 as const, label: "Contacto e Información de Pasajeros" },
    { id: 2 as const, label: "Paga tu viaje" },
  ];

  return (
    <ol className="flex items-center gap-[10px]" aria-label="Pasos de la reserva">
      {steps.map((item, index) => {
        const isCurrent = item.id === step;
        const isDone = item.id < step;

        return (
          <li key={item.id} className="flex items-center gap-[10px]">
            <div className="flex items-center gap-[5px]">
              <span
                className={cn(
                  "grid size-5 place-items-center rounded-full text-xs font-semibold",
                  isDone
                    ? "bg-brand text-white"
                    : isCurrent
                      ? "bg-brand/10 text-brand"
                      : "bg-line text-muted",
                )}
              >
                {isDone ? (
                  <Icon name="check" className="h-[6px] w-[8px] text-white" />
                ) : (
                  item.id
                )}
              </span>
              <span
                className={cn(
                  "text-xs leading-[14.4px] tracking-[-0.04em]",
                  "font-medium text-ink",
                )}
              >
                {item.label}
              </span>
            </div>

            {index < steps.length - 1 ? (
              <span
                aria-hidden="true"
                className="h-px w-5 border-t border-dashed border-ink/30"
              />
            ) : null}
          </li>
        );
      })}
    </ol>
  );
}
