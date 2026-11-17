# ZIGO Business — Prototipo

Prototipo interactivo del flujo de **Vuelos** de ZIGO Business, construido a
partir del archivo de Figma del proyecto y publicado en Vercel para revisión del
cliente.

- **Diseño:** [ZIGO en Figma](https://www.figma.com/design/xbeDUwzlaw5EIddm7bhsbM/ZIGO?node-id=6706-1260)
- **Producción:** _pendiente de la primera publicación_
- **Stack:** Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 4

## Estado

| Fase | Estado |
| --- | --- |
| Repositorio, tipografías y tokens de diseño | Listo |
| Dirección de diseño con el cliente | En revisión |
| Pantallas del flujo de vuelos | Pendiente |
| Publicación en Vercel | Primera versión lista |

El sitio lleva `noindex, nofollow` para que el prototipo no se indexe en
buscadores.

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
    page.tsx           # portada provisional
    styleguide/        # referencia interna de tokens y componentes base
  lib/
    tokens.ts          # espejo JS de los tokens, para la página de referencia
public/
  brand/               # logo ZIGO (SVG exportado de Figma)
  fonts/               # General Sans 400/500/600/700 (woff2, self-hosted)
```

## Tokens

Extraídos del archivo de Figma (página `Vuelos`, frame `Flight with Ads`,
`6706-1260`) y del resto del documento:

- **Naranja de marca** `#FF3500` (`bg-brand`), hover `#FF4D1D`.
- **Tinta** `#1E1E1E` para texto y sidebar, gris `#727272` para labels.
- **Superficies** `#F0F0F0` / `#FCFCFC`, bordes `#ECECEC`.
- **Tipografía** General Sans (400/500/600/700), tracking `-0.04em` y escala
  `33 / 32 / 28 / 23 / 16 / 14 / 13 / 12 / 11`.
- **Radios** 5 px (controles), 10 px (tarjetas), 100 px (pills).

Cualquier cambio de diseño debe entrar primero acá para que todas las pantallas
queden consistentes. La referencia viva está en `/styleguide`.

## Flujo a prototipar

Alcance acordado: el flujo enlazado de Figma (búsqueda de vuelos y sus pasos
inmediatos), con UI clickeable y datos mock. Sin backend.

## Publicación

Vercel despliega desde `main`. Cada push a una rama genera un preview URL.
