import { Icon } from "@/components/icon";
import { SelectField } from "./select-field";
import { dateFields, routeFields } from "@/lib/flight-search";

/**
 * Route + date row plus the search CTA (Figma node 6706-1411).
 * In Figma origin/destination are 244px each and dates 160px each; the route
 * group flexes so the row fills any desktop width, while the dates + CTA keep
 * their design size and wrap as a unit on narrower desktops.
 */
export function RouteAndDateFields() {
  const [origin, destination] = routeFields;

  return (
    <div className="flex flex-wrap items-end gap-3">
      <div className="flex min-w-[320px] flex-1 items-end gap-1">
        <SelectField
          label={origin.label}
          value={origin.placeholder}
          icon={origin.icon}
          className="min-w-0 flex-1"
        />

        <button
          type="button"
          aria-label="Intercambiar origen y destino"
          className="grid h-[30px] w-4 shrink-0 place-items-center"
        >
          <Icon name="arrows-left-right" className="size-4 text-ink" />
        </button>

        <SelectField
          label={destination.label}
          value={destination.placeholder}
          icon={destination.icon}
          className="min-w-0 flex-1"
        />
      </div>

      <div className="ml-auto flex flex-wrap items-end gap-3">
        {dateFields.map((field) => (
          <SelectField
            key={field.id}
            label={field.label}
            value={field.placeholder}
            icon="calendar"
            className="w-40 shrink-0"
          />
        ))}

        <button
          type="button"
          className="flex h-[30px] w-[131px] shrink-0 items-center justify-center gap-1 rounded-[4px] bg-brand px-5 py-2 text-xs leading-3 font-semibold tracking-[-0.04em] text-white transition-colors hover:bg-brand-hover"
        >
          Buscar
        </button>
      </div>
    </div>
  );
}
