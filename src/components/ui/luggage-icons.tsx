import { cn } from "@/lib/cn";
import { luggageFlags, type LuggageType } from "@/lib/results";

const ICON_SIZES: readonly [number, number][] = [
  [7, 8],
  [8, 12],
  [11, 16],
];

/** Backpack / cabin bag / checked bag glyphs, lit per allowance. */
export function LuggageIcons({ type }: { type: LuggageType }) {
  return (
    <span className="flex items-end gap-[2px]">
      {luggageFlags(type).map((included, index) => (
        <span
          key={index}
          className={cn(
            "rounded-[2px] border",
            included ? "border-cyan-400" : "border-[#D3D3D3]",
          )}
          style={{
            width: ICON_SIZES[index][0],
            height: ICON_SIZES[index][1],
          }}
        />
      ))}
    </span>
  );
}
