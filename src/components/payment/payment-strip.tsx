import { Icon } from "@/components/icon";
import { formatCop } from "@/lib/results";

function Divider() {
  return <span aria-hidden="true" className="h-[11px] w-px bg-[#D3D3D3]" />;
}

export type PaymentStripProps = {
  originCode: string;
  destinationCode: string;
  dates: string;
  passengers: string;
  total?: number;
};

/** Route + dates + passengers strip; the total is omitted on the success state. */
export function PaymentStrip({
  originCode,
  destinationCode,
  dates,
  passengers,
  total,
}: PaymentStripProps) {
  return (
    <div className="flex flex-wrap items-center gap-2 rounded-[8px] border border-line px-4 py-4 text-xs leading-[11px] tracking-[-0.04em]">
      <span className="flex items-center gap-[2px] font-medium text-ink">
        {originCode}
        <Icon name="arrows-left-right" className="size-[10px]" />
        {destinationCode}
      </span>

      <Divider />
      <span className="font-medium text-muted">{dates}</span>
      <Divider />
      <span className="font-medium text-muted">{passengers}</span>

      {total !== undefined ? (
        <span className="ml-auto text-body-lg font-semibold text-ink">
          {formatCop(total)} COP
        </span>
      ) : null}
    </div>
  );
}
