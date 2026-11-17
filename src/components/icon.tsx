import type { CSSProperties } from "react";

import type { IconName } from "@/lib/icons";

export type { IconName };

type IconProps = {
  name: IconName;
  className?: string;
  style?: CSSProperties;
};

/**
 * Monochrome icons exported from Figma into `public/icons` and painted with
 * `currentColor` through a CSS mask, so they inherit text color and stay crisp.
 *
 * Size with Tailwind (`size-4`, `h-4 w-6`, …).
 */
export function Icon({ name, className = "", style }: IconProps) {
  const url = `url(/icons/${name}.svg)`;

  return (
    <span
      aria-hidden="true"
      className={`inline-block shrink-0 bg-current ${className}`}
      style={{
        maskImage: url,
        WebkitMaskImage: url,
        maskRepeat: "no-repeat",
        WebkitMaskRepeat: "no-repeat",
        maskPosition: "center",
        WebkitMaskPosition: "center",
        maskSize: "contain",
        WebkitMaskSize: "contain",
        ...style,
      }}
    />
  );
}
