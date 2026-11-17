<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Project conventions (ZIGO prototype)

Read [docs/design-map.md](docs/design-map.md) first: it maps Figma nodes to files,
lists the layout constants and explains asset export.

- Figma file `xbeDUwzlaw5EIddm7bhsbM`, page `Vuelos`, frame `Flight with Ads` (`6706-1260`) is the source of truth. Desktop only, 1440 design that stretches to fill.
- Server components by default; add `"use client"` only for stateful controls.
- One component per file, props typed inline with exported `*Props` types.
- Screen copy and option lists live in `src/lib` as typed `readonly` arrays — do not hardcode strings in components.
- Style with Tailwind tokens from `src/app/globals.css` (`bg-brand`, `text-h3`, `rounded-card`, `text-muted`). Raw hex/px only for one-off Figma measurements, with a comment.
- Icons: SVG in `public/icons`, registered in `src/lib/icons.ts`, rendered via `<Icon name>` (CSS mask + `currentColor`). Never reference Figma URLs or remote CDNs.
- All imagery must be committed under `public/`.
- Verify against a 2x Figma PNG export at 1440×901 and at 1280/1024 before pushing.
