/**
 * Design tokens lifted from the ZIGO Figma file (xbeDUwzlaw5EIddm7bhsbM,
 * page "Vuelos" / node 6706-1260 and the shared components page).
 *
 * Keep in sync with the matching custom properties in `app/globals.css`.
 * Tailwind consumes them as `bg-brand`, `text-ink`, `text-h3`, `rounded-card`…
 */

export const colors = [
  { name: "brand", hex: "#FF3500", role: "CTA, active nav, accents" },
  { name: "brand-hover", hex: "#FF4D1D", role: "Hover state for CTAs" },
  { name: "brand-soft", hex: "#FFE6D3", role: "Promo badge background" },
  { name: "brand-tint", hex: "#FFEFEB", role: "Promo surfaces" },
  { name: "ink", hex: "#1E1E1E", role: "Primary text, sidebar" },
  { name: "ink-alt", hex: "#272A3E", role: "Dark secondary surface" },
  { name: "muted", hex: "#727272", role: "Labels, placeholders, meta" },
  { name: "line", hex: "#ECECEC", role: "Borders and dividers" },
  { name: "surface", hex: "#F0F0F0", role: "App background, inputs" },
  { name: "panel", hex: "#FCFCFC", role: "Main content background" },
  { name: "cyan-soft", hex: "#D3F7FA", role: "Selected trip type" },
  { name: "cyan-600", hex: "#1689A4", role: "Info accents" },
  { name: "cyan-400", hex: "#51CFE2", role: "Charts, highlights" },
  { name: "blue-600", hex: "#324DDD", role: "Links, secondary actions" },
] as const;

export const typography = [
  { token: "text-section", size: 33, lineHeight: 41.25, weight: 600, sample: "Tus próximos vuelos" },
  { token: "text-h1", size: 32, lineHeight: 38.4, weight: 600, sample: "¿A dónde quieres volar?" },
  { token: "text-h2", size: 28, lineHeight: 36, weight: 600, sample: "Resumen de reserva" },
  { token: "text-h3", size: 23, lineHeight: 31, weight: 700, sample: "BOG → LIM" },
  { token: "text-body-lg", size: 16, lineHeight: 21.6, weight: 500, sample: "Vuela a Bogotá" },
  { token: "text-body", size: 14, lineHeight: 18.9, weight: 500, sample: "Descubre Bogotá en tu próximo viaje." },
  { token: "text-sm", size: 13, lineHeight: 17.55, weight: 600, sample: "Ref: BL7GHT54JQDK" },
  { token: "text-xs", size: 12, lineHeight: 14.4, weight: 600, sample: "Ida y Vuelta" },
  { token: "text-2xs", size: 11, lineHeight: 13.2, weight: 600, sample: "Por tiempo limitado" },
] as const;

export const radii = [
  { token: "rounded-control", value: "5px", role: "Inputs, selects, small buttons" },
  { token: "rounded-card", value: "10px", role: "Cards, panels" },
  { token: "rounded-pill", value: "100px", role: "Badges, avatars, toggles" },
] as const;
