# ZIGO Business — Prototipo

Prototipo interactivo del flujo de **Vuelos** de ZIGO Business, construido a
partir del archivo de Figma del proyecto y publicado en Vercel para revisión del
cliente.

- **Diseño:** [ZIGO en Figma](https://www.figma.com/design/xbeDUwzlaw5EIddm7bhsbM/ZIGO?node-id=6706-1260)
- **Producción:** [zigo-prototype.vercel.app](https://zigo-prototype.vercel.app)
- **Stack:** Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 4
- **Mapa Figma → código:** [docs/design-map.md](docs/design-map.md)

## Estado

| Bloque | Estado |
| --- | --- |
| Repositorio, tipografías y tokens de diseño | Listo |
| Sidebar | Listo |
| Top bar | Listo |
| Búsqueda de vuelos + filtros avanzados | Listo |
| Toggle de tipo de viaje, contadores de pasajeros | Listo |
| Buscador de aeropuertos (30 ciudades) | Listo |
| Selector de fechas (calendario) | Listo |
| Promo "Vuela a Bogotá" | Pendiente |
| Tarjetas de próximos vuelos | Pendiente |
| Menús de filtros avanzados, acción de "Buscar" | Pendiente |

El sitio lleva `noindex, nofollow` para que el prototipo no se indexe en
buscadores. Todo el contenido está en estado de reposo / vacío por ahora.

## Cómo correrlo

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # build de producción
```

## Estructura

```
src/
  app/
    globals.css        # tokens de diseño (color, tipo, radios, sombras)
    layout.tsx         # fuentes, metadata
    page.tsx           # pantalla de vuelos (solo composición)
    styleguide/        # referencia interna de tokens y componentes base
  components/
    app-shell.tsx      # sidebar + top bar + área de contenido
    sidebar.tsx        # navegación lateral
    top-bar.tsx        # header de 56px
    icon.tsx           # iconos SVG con mask + currentColor
    flight-search/
      flight-search-section.tsx
      trip-type-toggle.tsx
      passenger-selectors.tsx
      route-and-date-fields.tsx
      airport-select.tsx
      date-field.tsx
      select-field.tsx
      advanced-filters.tsx
      field-label.tsx
    ui/
      calendar.tsx     # calendario shadcn-style con tokens ZIGO
  hooks/
    use-flight-search.ts # estado del formulario (toggle, pasajeros, rutas, fechas)
  lib/
    flight-search.ts   # tipos + contenido de la pantalla (datos)
    icons.ts           # nombres de iconos disponibles
    airports.ts        # 30 aeropuertos de Latinoamérica (código IATA)
    cn.ts              # helper de clases
    tokens.ts          # espejo JS de los tokens, para /styleguide
public/
  brand/               # logo ZIGO (SVG exportado de Figma)
  fonts/               # General Sans 400/500/600/700 (woff2, self-hosted)
  icons/               # iconos SVG exportados de Figma
  images/              # fotos y avatar exportados de Figma
docs/
  design-map.md        # nodo de Figma → archivo, medidas y convenciones
```

## Diseño

- Naranja de marca `#FF3500` (`bg-brand`), hover `#FF4D1D`.
- Tinta `#1E1E1E`, gris `#727272`, superficies `#F0F0F0` / `#FCFCFC`, bordes `#ECECEC`.
- General Sans (400/500/600/700), tracking `-0.04em`, escala
  `33 / 32 / 28 / 23 / 16 / 14 / 13 / 12 / 11`.
- Radios 5 px (controles), 10 px (tarjetas), 100 px (pills).

Referencia viva de tokens y componentes base: `/styleguide`.

## Publicación

Vercel despliega desde `main` (auto-deploy en cada push). Cada rama genera un
preview URL.
