"use client";

import { format } from "date-fns";
import { useEffect, useState } from "react";

import { Icon } from "@/components/icon";
import {
  SEARCH_PHRASE_INTERVAL_MS,
  searchLoaderFooter,
  searchLoaderPhrases,
} from "@/lib/search-loader";

export type SearchLoaderProps = {
  open: boolean;
  tripTypeLabel: string;
  originCode?: string;
  destinationCode?: string;
  departureDate?: Date;
  returnDate?: Date;
  /** Dates are only shown when the trip type uses them. */
  showReturnDate: boolean;
  onClose: () => void;
};

/**
 * Search loader (Figma node 6739-4961): 60% scrim over the app, 414×251 white
 * card (8px radius, 32px padding), trip summary, rotating phrase, animated
 * progress bar with the plane at its tip, and the closing line.
 */
export function SearchLoader({
  open,
  tripTypeLabel,
  originCode,
  destinationCode,
  departureDate,
  returnDate,
  showReturnDate,
  onClose,
}: SearchLoaderProps) {
  const [phraseIndex, setPhraseIndex] = useState(0);

  useEffect(() => {
    if (!open) return;
    // The parent remounts the modal per search, so the phrase starts at 0.
    const interval = setInterval(() => {
      setPhraseIndex((current) => (current + 1) % searchLoaderPhrases.length);
    }, SEARCH_PHRASE_INTERVAL_MS);

    return () => clearInterval(interval);
  }, [open]);

  // Lock scroll + close on Escape while the modal is up.
  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  const dates = departureDate
    ? [departureDate, showReturnDate ? returnDate : undefined]
        .filter((date): date is Date => Boolean(date))
        .map((date) => format(date, "dd/MM/yyyy"))
        .join(" - ")
    : "dd/mm/yyyy";

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Buscando vuelos"
      className="fixed inset-0 z-50 grid place-items-center bg-black/60 animate-loader-fade"
    >
      <div className="w-[414px] rounded-[8px] ring-1 ring-ink/10 bg-white p-8 text-center animate-loader-pop">
        <div className="flex flex-col gap-4">
          <p className="text-body-lg leading-[11px] font-medium text-muted">
            {tripTypeLabel}
          </p>

          <div className="flex items-center justify-center gap-3">
            <span className="text-h1 leading-[23px] font-semibold">
              {originCode ?? "—"}
            </span>
            <Icon name="arrows-left-right" className="size-[23px] text-ink" />
            <span className="text-h1 leading-[23px] font-semibold">
              {destinationCode ?? "—"}
            </span>
          </div>

          <p className="text-body-lg leading-[11px] font-medium text-muted">
            {dates}
          </p>
        </div>

        <div className="mt-8 flex flex-col gap-4">
          <p
            aria-live="polite"
            className="text-body-lg leading-[11px] font-medium text-ink"
          >
            {searchLoaderPhrases[phraseIndex]}
          </p>

          <div className="relative mx-auto h-6 w-[350px]">
            <div className="absolute top-1/2 right-0 left-0 h-1 -translate-y-1/2 rounded-[8px] bg-line" />

            <div className="absolute top-1/2 left-0 h-1 -translate-y-1/2 rounded-[8px] bg-gradient-to-r from-brand-soft to-[#FF7332] animate-search-progress">
              <span className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2">
                <Icon name="plane" className="size-6 text-brand" />
              </span>
            </div>
          </div>

          <p className="text-body-lg leading-[11px] font-medium text-muted">
            {searchLoaderFooter}
          </p>
        </div>
      </div>
    </div>
  );
}
