# Design map — Figma → code

Everything in this prototype traces back to a node in the ZIGO Figma file:

- **File:** `xbeDUwzlaw5EIddm7bhsbM` → [ZIGO](https://www.figma.com/design/xbeDUwzlaw5EIddm7bhsbM/ZIGO)
- **Implemented screen:** page `Vuelos` → frame `Flight with Ads` (`6706-1260`), 1440×901.
- Only the **with-ads** variant is used; the ad block is always present.
- Figma is the source of truth for spacing, colors and type. Do not restyle screens
  by eye: read the node, then match the numbers.

## Node → file

| Figma node | Name | Code |
| --- | --- | --- |
| `6706-1261` | `AppSidebar` | [sidebar.tsx](../src/components/sidebar.tsx) |
| `6706-1369` | `Header` (56px) | [top-bar.tsx](../src/components/top-bar.tsx) |
| `6706-1384` | `Header` content area (white, 80/32 padding) | [app-shell.tsx](../src/components/app-shell.tsx) |
| `6706-1386` | `FlightSearchSection` | [flight-search-section.tsx](../src/components/flight-search/flight-search-section.tsx) |
| `6706-1387` | `flightSearchTitle` | `FlightSearchSection` |
| `6706-1389` | `SearchPanel` | `FlightSearchSection` |
| `6706-1391` | `TripTypeSelector` | [trip-type-toggle.tsx](../src/components/flight-search/trip-type-toggle.tsx) |
| `6706-1398` | `PassengerSelectors` | [passenger-selectors.tsx](../src/components/flight-search/passenger-selectors.tsx) |
| `6706-1411` | `RouteAndDateFields` | [route-and-date-fields.tsx](../src/components/flight-search/route-and-date-fields.tsx) |
| `6706-1413` | `OriginDropdown` (also Destination / dates) | [select-field.tsx](../src/components/flight-search/select-field.tsx) |
| `6706-1423` | `AdvancedFlightFilters` | [advanced-filters.tsx](../src/components/flight-search/advanced-filters.tsx) |

Not built yet (next passes): `6706-1429` promo card, `6706-1452` flight cards.

## Layout constants (desktop, from Figma)

| Thing | Value |
| --- | --- |
| Sidebar | 250px wide, `#1E1E1E`, 20px padding, 36px nav rows |
| Top bar | 56px tall, `#F0F0F0`, 32px/12px padding |
| Main separator | 1px `#1E1E1E` at 7% |
| Content padding | 80px sides / 32px top-bottom at 1440 → `xl:px-20 xl:py-8`; 32/24 below |
| Section gap | 24px (title → panel) |
| Panel | 10px radius, 16px padding, 16px inner gap, 1px `#ECECEC` inset ring |
| Fields | 30px tall, 5px radius, 1px `#ECECEC` border, `10px/6px` padding, 6px gap |
| Field label | 12px/9px semibold, 6px gap → 45px field column |
| Filters | 30px tall, white, right-aligned, 8px gap |

## Assets

All imagery and icons live in the repo — nothing points at Figma or a CDN.

- **Icons:** `public/icons/*.svg`, exported from Figma, rendered by
  [icon.tsx](../src/components/icon.tsx) as a CSS mask so they take
  `currentColor`. Add the file, then add the name to
  [icons.ts](../src/lib/icons.ts).
- **Logo:** `public/brand/zigo-logo.svg`.
- **Photos:** `public/images/*` (exported at 2x from the node).
- **Font:** General Sans 400/500/600/700 in `public/fonts` (self-hosted).

To export another node:

```bash
TOKEN=$(cat ~/.figma-token)
curl -H "X-Figma-Token: $TOKEN" \
  "https://api.figma.com/v1/images/xbeDUwzlaw5EIddm7bhsbM?ids=<NODE_ID>&format=svg"
# PNG at 2x: &format=png&scale=2
```

## Conventions

- **TypeScript everywhere.** Props are typed; content lives in
  [src/lib](../src/lib) as `readonly` arrays with exported types, so screens
  are data-driven and easy to extend.
- **Server components by default.** Add `"use client"` only when a control needs
  state; the current screen is fully static.
- **One component per file**, named after the Figma layer when possible.
- **Tailwind + tokens.** Colors/type come from `@theme` in
  [globals.css](../src/app/globals.css). Prefer `bg-brand`, `text-h3`,
  `rounded-card` over raw hex values; keep raw values for one-off Figma
  measurements and say why in a comment.
- **At rest first.** Interactions (dropdowns, counters, navigation) are wired in
  later passes; controls already use real `button`/`a` semantics with ARIA
  labels so that work is additive.
- **Verify visually.** Screens are checked against a 2x PNG export of the Figma
  frame at 1440×901 (and 1280/1024 for responsiveness) before pushing.
