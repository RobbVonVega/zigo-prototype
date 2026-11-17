"use client";

import { cn } from "@/lib/cn";

export type RangeSliderProps = {
  min: number;
  max: number;
  step?: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
  label: string;
};

/**
 * Dual-thumb range slider built on two native range inputs (keyboard- and
 * screen-reader-friendly) with the design's 4px track, brand fill and 16px
 * thumbs. Values are clamped so the thumbs never cross.
 */
export function RangeSlider({
  min,
  max,
  step = 15,
  value,
  onChange,
  label,
}: RangeSliderProps) {
  const [start, end] = value;
  const toPercent = (current: number) => ((current - min) / (max - min)) * 100;

  const thumbClasses =
    "[&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:size-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-brand [&::-webkit-slider-thumb]:shadow-sm [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:size-4 [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-brand [&::-webkit-slider-runnable-track]:bg-transparent [&::-moz-range-track]:bg-transparent";

  return (
    <div
      className="relative h-4 w-full"
      role="group"
      aria-label={label}
    >
      <div className="pointer-events-none absolute inset-x-0 top-1/2 h-[4px] -translate-y-1/2 rounded-full bg-[#D3D3D3]" />

      <div
        className="pointer-events-none absolute top-1/2 h-[4px] -translate-y-1/2 rounded-full bg-brand"
        style={{
          left: `${toPercent(start)}%`,
          right: `${100 - toPercent(end)}%`,
        }}
      />

      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={start}
        aria-label={`${label}: desde`}
        onChange={(event) =>
          onChange([
            Math.min(Number(event.target.value), end - step),
            end,
          ])
        }
        className={cn(
          "pointer-events-none absolute inset-0 h-4 w-full appearance-none bg-transparent",
          thumbClasses,
        )}
      />

      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={end}
        aria-label={`${label}: hasta`}
        onChange={(event) =>
          onChange([
            start,
            Math.max(Number(event.target.value), start + step),
          ])
        }
        className={cn(
          "pointer-events-none absolute inset-0 h-4 w-full appearance-none bg-transparent",
          thumbClasses,
        )}
      />
    </div>
  );
}
