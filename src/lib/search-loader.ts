/**
 * Copy for the "Buscando resultados" modal (Figma node 6739-4961).
 * The design shows `Revisando los mejores vuelos...`; the rest rotate while the
 * search runs (one phrase every ~1.1s).
 */

export const searchLoaderPhrases: readonly string[] = [
  "Revisando los mejores vuelos...",
  "Comparando tarifas de las aerolíneas...",
  "Confirmando disponibilidad...",
  "Filtrando las mejores opciones...",
  "Preparando tus resultados...",
];

export const searchLoaderFooter = "Viaja tranquilo. Viaja mejor.";

/** How long the mock search runs before the modal closes (ms). */
export const SEARCH_DURATION_MS = 5200;

/** Phrase rotation interval (ms). */
export const SEARCH_PHRASE_INTERVAL_MS = 1100;
