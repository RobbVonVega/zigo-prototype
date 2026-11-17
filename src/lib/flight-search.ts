import type { IconName } from "@/lib/icons";

/* ---------------------------------------------------------------------------
 * Flight search — static content and option lists.
 * Everything is typed and centralised here so the UI components stay dumb.
 * Source: Figma node 6706-1386 (search section) and 6729-6109…6729-6448
 * (advanced filter menus).
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
  /** Value shown at rest. */
  count: number;
  /** Lower bound for the counter (adults can never go below 1). */
  min: number;
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

export type FilterOption = {
  id: string;
  label: string;
};

export type AdvancedFilter = {
  id: AdvancedFilterId;
  /** Text on the trigger pill. */
  label: string;
  /** Heading inside the dropdown menu. */
  title: string;
  icon: IconName;
  kind: "single" | "multiple" | "time";
  options?: readonly FilterOption[];
};

export type PassengerCounts = Record<PassengerId, number>;

export const flightSearchTitle = "¿A donde quieres volar?";

/** "Ida y Vuelta" is the selected option in the design. */
export const activeTripTypeId: TripTypeId = "round-trip";

export const PASSENGER_MAX = 9;

export const tripTypes: readonly TripType[] = [
  { id: "one-way", label: "Solo Ida", icon: "arrow-right" },
  { id: "round-trip", label: "Ida y Vuelta", icon: "arrows-left-right" },
];

export const passengers: readonly PassengerOption[] = [
  { id: "adult", label: "Adultos", count: 1, min: 1 },
  { id: "child", label: "Niños", count: 0, min: 0 },
  { id: "infant", label: "Bebés", count: 0, min: 0 },
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
  {
    id: "airlines",
    label: "Aerolíneas",
    title: "Aerolíneas",
    icon: "plane-tilt",
    kind: "multiple",
    options: [
      { id: "avianca", label: "Avianca" },
      { id: "copa", label: "Copa Airlines" },
      { id: "iberia", label: "Iberia" },
      { id: "united", label: "United" },
      { id: "american", label: "American Airlines" },
      { id: "jetsmart", label: "JetSmart" },
      { id: "latam", label: "LATAM" },
      { id: "sky", label: "Sky" },
      { id: "zigo", label: "Zigo Airlines" },
    ],
  },
  {
    id: "stops",
    label: "Escalas",
    title: "Escalas",
    icon: "stops",
    kind: "single",
    options: [
      { id: "any", label: "Cualquier número de escalas" },
      { id: "zero", label: "Sin escalas" },
      { id: "one", label: "1 escala o menos" },
      { id: "two", label: "2 escalas o menos" },
    ],
  },
  {
    id: "time",
    label: "Rango de salida y regreso",
    title: "Tiempos de vuelo",
    icon: "clock",
    kind: "time",
  },
  {
    id: "cabin",
    label: "Tipo de Cabina",
    title: "Tipo de cabina",
    icon: "seat",
    kind: "single",
    options: [
      { id: "any", label: "Cualquier tipo de cabina" },
      { id: "economy", label: "Economy" },
      { id: "premium-economy", label: "Premium Económico" },
      { id: "premium-first", label: "Premium Primera Clase" },
      { id: "premium-business", label: "Premium Business" },
      { id: "business", label: "Business" },
      { id: "first", label: "Primera Clase" },
    ],
  },
  {
    id: "bags",
    label: "Maletas",
    title: "Equipaje",
    icon: "suitcase",
    kind: "single",
    options: [
      { id: "any", label: "Cualquier número de maletas" },
      { id: "backpack", label: "Solo mochila" },
      { id: "carry-on", label: "Mochila + De mano" },
      { id: "checked", label: "Mochila + De mano + Facturado" },
    ],
  },
];
