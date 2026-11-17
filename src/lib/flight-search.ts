import type { IconName } from "@/lib/icons";

/* ---------------------------------------------------------------------------
 * Flight search — static content and option lists.
 * Everything is typed and centralised here so the UI components stay dumb.
 * Source: Figma node 6706-1386 ("FlightSearchSection").
--------------------------------------------------------------------------- */

export type TripTypeId = "one-way" | "round-trip";
export type PassengerId = "adult" | "child" | "infant";
export type RouteFieldId = "origin" | "destination";
export type DateFieldId = "departure" | "return";
export type AdvancedFilterId = "airlines" | "stops" | "time" | "cabin" | "bags";

export type TripType = {
  id: TripTypeId;
  label: string;
  icon: IconName;
};

export type PassengerOption = {
  id: PassengerId;
  label: string;
  /** Mock value shown at rest; no interaction yet. */
  count: number;
};

export type RouteField = {
  id: RouteFieldId;
  label: string;
  placeholder: string;
  icon: IconName;
};

export type DateField = {
  id: DateFieldId;
  label: string;
  placeholder: string;
};

export type AdvancedFilter = {
  id: AdvancedFilterId;
  label: string;
  icon: IconName;
};

export const flightSearchTitle = "¿A donde quieres volar?";

/** "Ida y Vuelta" is the selected option in the design. */
export const activeTripTypeId: TripTypeId = "round-trip";

export const tripTypes: readonly TripType[] = [
  { id: "one-way", label: "Solo Ida", icon: "arrow-right" },
  { id: "round-trip", label: "Ida y Vuelta", icon: "arrows-left-right" },
];

export const passengers: readonly PassengerOption[] = [
  { id: "adult", label: "Adultos", count: 1 },
  { id: "child", label: "Niños", count: 0 },
  { id: "infant", label: "Bebés", count: 0 },
];

export const routeFields: readonly RouteField[] = [
  {
    id: "origin",
    label: "Origen",
    placeholder: "Seleccione",
    icon: "plane-takeoff",
  },
  {
    id: "destination",
    label: "Destino",
    placeholder: "Seleccione",
    icon: "plane-landing",
  },
];

export const dateFields: readonly DateField[] = [
  { id: "departure", label: "Fecha de salida", placeholder: "dd/mm/yyyy" },
  { id: "return", label: "Fecha de regreso", placeholder: "dd/mm/yyyy" },
];

export const advancedFilters: readonly AdvancedFilter[] = [
  { id: "airlines", label: "Aerolíneas", icon: "plane-tilt" },
  { id: "stops", label: "Escalas", icon: "stops" },
  { id: "time", label: "Rango de salida y regreso", icon: "clock" },
  { id: "cabin", label: "Tipo de Cabina", icon: "seat" },
  { id: "bags", label: "Maletas", icon: "suitcase" },
];
