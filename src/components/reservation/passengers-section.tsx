"use client";

import { PassengerCard } from "./passenger-card";
import type { PassengerRecord } from "@/lib/passengers";

/**
 * "Pasajeros" block (Figma 6761-15219): guidance banner + one card per
 * passenger, where the count comes from the search.
 */
export function PassengersSection({
  passengers,
  onEdit,
}: {
  passengers: readonly PassengerRecord[];
  onEdit: (index: number) => void;
}) {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-[24px] leading-[17px] font-semibold tracking-[-0.04em] text-ink">
        Pasajeros
      </h2>

      <div className="flex flex-col gap-2">
        <div className="rounded-[8px] border border-line bg-[#EDFEFF] p-4">
          <p className="text-xs leading-[12px] font-medium tracking-[-0.04em] text-muted">
            <span className="font-semibold text-ink/70">
              Los nombres deben coincidir con la identificación.
            </span>{" "}
            Asegúrate de ingresar el nombre exactamente como aparece en la
            identificación que se utilizará al momento de registrarte
            (check-in).
          </p>
        </div>

        {passengers.map((passenger, index) => (
          <PassengerCard
            key={index}
            index={index}
            passenger={passenger}
            onEdit={() => onEdit(index)}
          />
        ))}
      </div>
    </section>
  );
}
