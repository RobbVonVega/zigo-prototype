import { useEffect, useId, useRef, useState } from "react";

import { Icon } from "@/components/icon";
import { FieldLabel } from "./field-label";
import { cn } from "@/lib/cn";
import { searchAirports, type Airport } from "@/lib/airports";
import type { IconName } from "@/lib/icons";

export type AirportSelectProps = {
  label: string;
  icon: IconName;
  value: Airport | null;
  onChange: (airport: Airport) => void;
  placeholder?: string;
  className?: string;
};

/**
 * Searchable origin/destination field. Keeps the design's 30px bar and opens a
 * listbox of Latin American airports (30 cities) filtered by city, country or
 * IATA code while typing.
 */
export function AirportSelect({
  label,
  icon,
  value,
  onChange,
  placeholder = "Seleccione",
  className = "",
}: AirportSelectProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [highlighted, setHighlighted] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listboxId = useId();

  const results = searchAirports(isTyping ? query : "");
  const inputValue = open && isTyping ? query : (value?.city ?? "");

  // Keep the highlighted row in view while arrowing through the list.
  useEffect(() => {
    if (!open) return;
    document
      .getElementById(`${listboxId}-option-${highlighted}`)
      ?.scrollIntoView({ block: "nearest" });
  }, [highlighted, listboxId, open]);

  function select(airport: Airport) {
    onChange(airport);
    close();
    inputRef.current?.blur();
  }

  function close() {
    setOpen(false);
    setIsTyping(false);
    setQuery("");
  }

  return (
    <div className={cn("flex flex-col gap-[6px]", className)}>
      <FieldLabel>{label}</FieldLabel>

      <div className="relative">
        <div className="flex h-[30px] items-center gap-[6px] rounded-control border border-line bg-surface pr-[6px] pl-[10px] transition-colors focus-within:border-ink/40 hover:border-ink/20">
          <Icon name={icon} className="size-4 shrink-0 text-ink" />

          <input
            ref={inputRef}
            value={inputValue}
            placeholder={placeholder}
            role="combobox"
            aria-expanded={open}
            aria-controls={listboxId}
            aria-autocomplete="list"
            aria-activedescendant={
              open && results[highlighted]
                ? `${listboxId}-option-${highlighted}`
                : undefined
            }
            className="min-w-0 flex-1 bg-transparent text-xs leading-[14.4px] font-semibold tracking-[-0.04em] text-ink outline-none placeholder:text-muted"
            onChange={(event) => {
              setQuery(event.target.value);
              setIsTyping(true);
              setHighlighted(0);
              setOpen(true);
            }}
            onFocus={() => setOpen(true)}
            onBlur={close}
            onKeyDown={(event) => {
              if (event.key === "ArrowDown" || event.key === "ArrowUp") {
                event.preventDefault();
                if (!open) {
                  setOpen(true);
                  return;
                }
                const delta = event.key === "ArrowDown" ? 1 : -1;
                setHighlighted((current) =>
                  Math.min(results.length - 1, Math.max(0, current + delta)),
                );
              }

              if (event.key === "Enter" && open && results[highlighted]) {
                event.preventDefault();
                select(results[highlighted]);
              }

              if (event.key === "Escape") {
                close();
                inputRef.current?.blur();
              }
            }}
          />

          <Icon
            name="chevron-down"
            className={cn(
              "size-[18px] shrink-0 text-ink transition-transform",
              open && "rotate-180",
            )}
          />
        </div>

        {open ? (
          <ul
            id={listboxId}
            role="listbox"
            aria-label={label}
            onMouseDown={(event) => event.preventDefault()}
            className="absolute left-0 top-[calc(100%+4px)] z-40 max-h-[264px] w-[280px] max-w-[calc(100vw-48px)] overflow-y-auto rounded-card bg-white p-1 shadow-pop ring-1 ring-line"
          >
            {results.length === 0 ? (
              <li className="px-3 py-6 text-center text-xs font-medium text-muted">
                Sin resultados
              </li>
            ) : (
              results.map((airport, index) => {
                const isSelected = value?.code === airport.code;

                return (
                  <li
                    key={airport.code}
                    id={`${listboxId}-option-${index}`}
                    role="option"
                    aria-selected={isSelected}
                    onMouseEnter={() => setHighlighted(index)}
                    onClick={() => select(airport)}
                    className={cn(
                      "flex cursor-pointer items-center gap-2 rounded-[5px] px-2 py-1.5",
                      index === highlighted && "bg-surface",
                      isSelected && "bg-brand-tint",
                    )}
                  >
                    <span className="flex min-w-0 flex-1 flex-col">
                      <span className="truncate text-xs leading-[15px] font-semibold text-ink">
                        {airport.city}
                      </span>
                      <span className="truncate text-2xs leading-[13px] font-medium text-muted">
                        {airport.country}
                      </span>
                    </span>

                    <span className="shrink-0 rounded-[3px] bg-surface px-1.5 py-0.5 text-2xs font-semibold text-muted">
                      {airport.code}
                    </span>
                  </li>
                );
              })
            )}
          </ul>
        ) : null}
      </div>
    </div>
  );
}
