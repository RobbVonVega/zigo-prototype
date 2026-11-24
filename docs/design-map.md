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
| `6706-1413` | `OriginDropdown` (also Destination / dates) | [airport-select.tsx](../src/components/flight-search/airport-select.tsx) · [date-field.tsx](../src/components/flight-search/date-field.tsx) |
| `6706-1423` | `AdvancedFlightFilters` | [advanced-filters.tsx](../src/components/flight-search/advanced-filters.tsx) |
| `6729-6109` | Menú Escalas | [filter-dropdown.tsx](../src/components/flight-search/filter-dropdown.tsx) · [filter-choice.tsx](../src/components/flight-search/filter-choice.tsx) |
| `6729-6130` | Menú Aerolíneas (multi) | idem |
| `6729-6384` | Menú Tipo de cabina | idem |
| `6729-6448` | Menú Equipaje | idem |
| `6729-6500` | Menú Tiempos de vuelo | [time-filter.tsx](../src/components/flight-search/time-filter.tsx) · [ui/range-slider.tsx](../src/components/ui/range-slider.tsx) |
| `6706-1429` | Promo "Vuela a Bogotá" | [promo-banner.tsx](../src/components/promo-banner.tsx) |
| `6706-1447` | "Tus próximos vuelos" + grid | [upcoming-flights.tsx](../src/components/upcoming-flights.tsx) |
| `6725-9043` | Flight reservation card | [flight-card.tsx](../src/components/flight-card.tsx) |
| `6739-4961` | Search loader modal | [search-loader.tsx](../src/components/search-loader.tsx) · [lib/search-loader.ts](../src/lib/search-loader.ts) |
| `6724-5421` | Results — Lateral 2 Columns | [app/resultados/page.tsx](../src/app/resultados/page.tsx) · [results-view.tsx](../src/components/results/results-view.tsx) |
| ↳ | Left search column | [results-search-panel.tsx](../src/components/results/results-search-panel.tsx) |
| ↳ | Price block + flight row | [flight-price-block.tsx](../src/components/results/flight-price-block.tsx) · [flight-option-row.tsx](../src/components/results/flight-option-row.tsx) |
| ↳ | Sticky "Detalle de tu viaje" | [trip-summary-card.tsx](../src/components/results/trip-summary-card.tsx) |
| `6741-11055` / `6740-9495` | Flight details drawer (plain / with Ida-Regreso tabs) | [flight-details-drawer.tsx](../src/components/results/flight-details-drawer.tsx) · [lib/flight-details.ts](../src/lib/flight-details.ts) |
| `6729-3375` | Results — Top 1 Columns (compact layout) | [compact-query-bar.tsx](../src/components/results/compact-query-bar.tsx) · [layout-toggle.tsx](../src/components/results/layout-toggle.tsx) |
| `6733-4512` | Compact with the search editor open | [compact-search-editor.tsx](../src/components/results/compact-search-editor.tsx) |
| `6759-7498` | Reservation step 1 (page) | [app/reserva/page.tsx](../src/app/reserva/page.tsx) · [reservation-view.tsx](../src/components/reservation/reservation-view.tsx) · [reservation-stepper.tsx](../src/components/reservation/reservation-stepper.tsx) |
| `6761-15161` | "Tu viaje a …" flight info card | [reservation-flight-info.tsx](../src/components/reservation/reservation-flight-info.tsx) |
| `6761-15597` | Trip summary + fare-hold timer | [reservation-summary.tsx](../src/components/reservation/reservation-summary.tsx) · [hooks/use-countdown.ts](../src/hooks/use-countdown.ts) |
| `6761-15219` | "Pasajeros" block (banner + cards) | [passengers-section.tsx](../src/components/reservation/passengers-section.tsx) |
| `6761-15733` / `6761-15725` | Passenger card, empty / filled | [passenger-card.tsx](../src/components/reservation/passenger-card.tsx) |
| `6770-7206` | "Información de Pasajero" modal | [passenger-overlay.tsx](../src/components/reservation/passenger-overlay.tsx) · [lib/passengers.ts](../src/lib/passengers.ts) · [ui/select-menu.tsx](../src/components/ui/select-menu.tsx) · [ui/text-field.tsx](../src/components/ui/text-field.tsx) |
| ↳ | "Detalles de contacto" block | [contact-section.tsx](../src/components/reservation/contact-section.tsx) |
| ↳ | "Información importante" blocks | [important-info-section.tsx](../src/components/reservation/important-info-section.tsx) · [lib/important-info.ts](../src/lib/important-info.ts) |
| ↳ | "Proceder al pago" block | [payment-section.tsx](../src/components/reservation/payment-section.tsx) |
| ↳ | Loading skeleton | [reservation-skeleton.tsx](../src/components/reservation/reservation-skeleton.tsx) |
| `6770-7488` | Payment — waiting | [payment-view.tsx](../src/components/payment/payment-view.tsx) · [payment-status-card.tsx](../src/components/payment/payment-status-card.tsx) · [payment-methods.tsx](../src/components/payment/payment-methods.tsx) · [payment-strip.tsx](../src/components/payment/payment-strip.tsx) |
| `6775-15138` | Payment — error | idem (state `error`) |
| `6775-14878` | Payment — expired + extra fare | [payment-cards.tsx](../src/components/payment/payment-cards.tsx) (state `expired`) |
| `6775-7708` | Payment — success | [payment-cards.tsx](../src/components/payment/payment-cards.tsx) (state `success`) |
| — | Payment state toggle | [payment-state-toggle.tsx](../src/components/payment/payment-state-toggle.tsx) · [lib/payment.ts](../src/lib/payment.ts) |
| ↳ | Mock itineraries / COP format | [lib/results.ts](../src/lib/results.ts) |
| — | Calendar (shadcn-style) | [ui/calendar.tsx](../src/components/ui/calendar.tsx) |

Not built yet (next passes): none of the Flight with Ads frame — the remaining work is interactions (resultados de búsqueda) and whatever comes after the four cards.

## Interactions implemented

State lives in [use-flight-search.ts](../src/hooks/use-flight-search.ts) (one hook,
typed) and is passed down to presentational components.

| Control | Behaviour |
| --- | --- |
| Trip type toggle | Cyan = selected, light grey hover on the idle option. Choosing `Solo Ida` hides `Fecha de regreso` (the value is kept, just hidden). |
| Passenger counters | `−` / `+` change one unit per click, clamped **1–9 for adults** and **0–9 for children/infants**; the minus disables at each floor. |
| Origen / Destino | Searchable combobox over 30 Latin American airports ([airports.ts](../src/lib/airports.ts)): the list matches the field width and any click on the field focuses + opens it; filters by city, country or IATA code as you type; arrow keys + Enter work; the swap button exchanges both. |
| Fechas | shadcn-style calendar (react-day-picker) with our tokens, Spanish locale. Past days are disabled; `Fecha de regreso` also disables days before the departure date, and changing departure after the return clears the return. One-way trips fade the return field out (width + opacity, 300ms) while the departure grows 160 → 332px. |
| Filtros avanzados | Each pill opens a 240px menu from the Figma nodes above. Defaults: Escalas / Tipo de cabina / Equipaje start on their first `Cualquier…` option (checked, but the pill stays neutral — choosing it again clears the filter); Aerolíneas starts empty; Tiempos starts on Ida with both ranges at the full day (`12:00 am - 11:59 pm`). With a real selection the pill turns cyan (#D3F7FA), swaps the chevron for an X and shows a summary: one airline by name, two or more as `Avianca +1`. |
| Promo + vuelos | Static for now: "Reserva ahora" and "Ver detalles" are real buttons with no action yet. Photos are local 2x exports (`public/images`). |
| Buscar / loader | `Buscar` opens the 6739-4961 modal for 5.2s: scrim 60%, 414×251 card, trip type, origin/destination codes, dates, 5 rotating phrases (1.1s each), gradient progress bar with the plane at its tip, and the closing line. It needs origin + destination + departure date, otherwise the button is disabled. Escape or the 5.2s timer closes it. On completion it navigates to `/resultados` with the search in the URL. |
| Layouts | The top-bar toggle (`Estándar` / `Compact`) switches presentation without losing state: search, filters, selection and the drawer are shared. Compact replaces the search column with a 51px query bar (route, dates, travellers, `Editar`); `Editar` floats the full search bar over the results (they don't move) and dims them 20% until closed. Its filters are the same menus in a sticky 56px icon rail; hovering a pill shows the full label. |
| Detalle del vuelo | Clicking a `Directo` / `N Escalas` tag opens the right drawer (639px, scrim 60%) for that flight, without tabs. The chevron next to "Detalle de tu viaje" opens the same drawer for the selected combination with `Vuelo de Ida` / `Vuelo de Regreso` tabs (round trips). Each leg shows date, duration, and a timeline: airline + flight number, departure/arrival airports with times, durations and layovers; segments are derived from the mock row (stops + duration) in `lib/flight-details.ts`. Escape, the X or the scrim close it. |
| Contacto | "Detalles de contacto" is prefilled from passenger 1 (name, phone, email) and is fully editable. Once the user types in it, it stops auto-syncing and becomes the source of truth for the sticky summary "Contacto" block. |
| Pasajeros | The modal uses the `overlay-pop` animation (float up 14px + fade, 250ms). One card per passenger from the search (adults → children → infants). Empty cards show `Pasajero N: Adulto` + "Agregar información de pasajero"; the modal has a company directory (mock in `lib/passengers.ts`) that filters people — picking one prefills the corporate/personal blocks (editable), "+ Nueva persona" clears them. Both blocks stay disabled until company + person (or new) are chosen; comments are always open. `Agregar` (needs names) replaces the card with the filled variant and the summary "Contacto" mirrors passenger 1. "Editar" reopens the modal with the saved values. |
| Pago | `Ir al Pago` pushes `/pago?…&name=&mail=&tel=` with the chosen combination and the contact. The waiting state shows the green "Esperando tu pago..." banner, the route strip with the total, the "computadora / QR" methods and the recap card; the timer sits in a pill next to the title. The top-bar toggle (`Pago / Error / Expirado / Éxito`) rewrites `estado` so all four Figma states can be reviewed: error (red banner), expired (yellow fare notice + paid/extra/total recap and `Pagar …` CTA) and success (green card with PNR + `Ver itinerario`, both steps checked). The summary in the payment screen drops the total and the timer. |
| Reserva | `Continuar` in the trip summary pushes `/reserva?block=…&out=…&back=…&trip=…&from=…&to=…&dep=…&ret=…&adults=…`. Arriving from `Continuar` adds `loading=1` to the URL, so the page opens with a skeleton (real column widths) for ~700ms and then drops the flag; direct links and refreshes skip it. It then shows the stepper (step 1), the itinerary card ("Mostrar detalles del viaje" opens the drawer) and the sticky summary with a 15-minute fare-hold countdown. The content reserves ~30vh of bottom space so `Proceder al pago` does not sit against the viewport edge (`15 min : 00 seg`, one tick per second). The contact block starts empty with "Se completará durante la reserva" and will fill as the flow advances; passenger/contact/payment sections are the next passes. |
| Resultados | `/resultados?trip=…&from=UIO&to=BOG&dep=2026-12-18&ret=…&adults=1` — the URL is the search state (direct links work, defaults match the Figma mock) and it updates **live** as the form changes; there is no submit step. Advanced filters apply to the mock itineraries instantly (airline, stops, cabin, luggage, time windows): rows/blocks that don't match disappear and an empty state offers `Borrar filtros`. Filters live in local state, not the URL. Nothing is selected on arrival, so the summary starts without a total. Flight options are radios inside each block and can only be combined within the same block: picking a flight in another block starts a fresh combination with that block's first flight in the other direction. The chosen block gets the cyan `#73DFED` border; the sticky card fades in the new details (price, airline, luggage, both flight times) on every change. `Buscar` in the left column rewrites the URL, clears the selection and both columns stay sticky. One-way hides the return column and the return row in the summary. Blocks collapse from their chevron. |

## Layout constants (desktop, from Figma)

| Thing | Value |
| --- | --- |
| Sidebar | 250px wide, `#1E1E1E`, 20px padding, 36px nav rows |
| Top bar | 56px tall, `#F0F0F0`, 32px/12px padding |
| Main separator | 1px `#1E1E1E` at 7% |
| Content padding | 80px sides / 32px top-bottom at 1440 → `xl:px-20 xl:py-8`; 32/24 below |
| Content max width | 1040px on the home screen; results screens stretch |
| Compact results | 80px sides, 51px query bar, 56px filter rail, 674px blocks, 284px summary |
| Section gap | 32px between blocks, 24px inside the flight-search section |
| Panel | 10px radius, 16px padding, 16px inner gap, 1px `#ECECEC` inset ring |
| Fields | 30px tall, 5px radius, 1px `#ECECEC` border, `10px/6px` padding, 6px gap |
| Field label | 12px/9px semibold, 6px gap → 45px field column |
| Filters | 30px tall, white, left-aligned under the panel, 8px gap |

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
