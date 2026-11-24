import { Icon } from "@/components/icon";
import {
  PASSENGER_TYPE_LABEL,
  type PassengerRecord,
} from "@/lib/passengers";

function Dot() {
  return <span aria-hidden="true" className="h-[9px] w-px bg-[#D3D3D3]" />;
}

/**
 * Passenger card (Figma 6761-15733 empty / 6761-15725 filled).
 */
export function PassengerCard({
  index,
  passenger,
  onEdit,
}: {
  index: number;
  passenger: PassengerRecord;
  onEdit: () => void;
}) {
  const { info, type } = passenger;
  const title = `Pasajero ${index + 1}: ${
    info ? `${info.firstName}/${info.lastName}` : PASSENGER_TYPE_LABEL[type]
  }`;

  if (!info) {
    return (
      <div className="flex items-center justify-between gap-4 rounded-[8px] border border-line bg-white px-4 py-4">
        <p className="text-body-lg leading-[18px] font-semibold tracking-[-0.04em] text-ink">
          {title}
        </p>

        <button
          type="button"
          onClick={onEdit}
          className="flex shrink-0 items-center gap-1 text-xs leading-[14.4px] font-semibold tracking-[-0.04em] text-brand transition-colors hover:text-brand-hover"
        >
          Agregar información de pasajero
          <Icon name="chevron-down" className="size-[18px] -rotate-90" />
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 rounded-[8px] border border-line bg-white p-4">
      <div className="flex items-start justify-between gap-4">
        <p className="text-body-lg leading-[18px] font-semibold tracking-[-0.04em] text-ink">
          {title}
        </p>

        <button
          type="button"
          onClick={onEdit}
          className="shrink-0 text-xs leading-[14.4px] font-semibold tracking-[-0.04em] text-brand underline underline-offset-[3px] transition-colors hover:text-brand-hover"
        >
          Editar
        </button>
      </div>

      <div className="flex flex-wrap items-center gap-2 text-xs leading-[14.4px] font-medium tracking-[-0.04em] text-ink">
        <span>Empresa: {info.companyName}</span>
        <Dot />
        <span>Departamento: {info.department}</span>
      </div>

      <div className="flex flex-wrap items-center gap-2 text-xs leading-[14.4px] font-medium tracking-[-0.04em] text-muted">
        <span>{PASSENGER_TYPE_LABEL[type]}</span>
        <Dot />
        <span>
          {info.idType} {info.identification}
        </span>
        <Dot />
        <span>{info.email}</span>
        <Dot />
        <span>{info.phone}</span>
      </div>
    </div>
  );
}
