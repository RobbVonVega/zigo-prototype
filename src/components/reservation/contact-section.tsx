"use client";

import { TextField } from "@/components/ui/text-field";

export type ContactDetails = {
  name: string;
  phone: string;
  email: string;
};

/**
 * "Detalles de contacto" (Figma 6759-7498): prefilled from passenger 1 and fully
 * editable. It is the source of truth for the summary "Contacto" block.
 */
export function ContactSection({
  value,
  onChange,
}: {
  value: ContactDetails;
  onChange: (next: ContactDetails) => void;
}) {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-[24px] leading-[17px] font-semibold tracking-[-0.04em] text-ink">
        Detalles de contacto
      </h2>

      <div className="flex flex-col gap-3 rounded-[8px] border border-line bg-white p-4">
        <TextField
          label="Nombres"
          value={value.name}
          onChange={(name) => onChange({ ...value, name })}
        />

        <div className="flex flex-wrap gap-3">
          <TextField
            label="Número de teléfono"
            type="tel"
            value={value.phone}
            onChange={(phone) => onChange({ ...value, phone })}
            className="min-w-[200px] flex-1"
          />
          <TextField
            label="Correo electrónico"
            type="email"
            value={value.email}
            onChange={(email) => onChange({ ...value, email })}
            className="min-w-[200px] flex-1"
          />
        </div>
      </div>
    </section>
  );
}
