/**
 * Latin American airports used by the origin/destination comboboxes.
 * 30 cities, one airport each; codes are IATA.
 */

export type Airport = {
  /** IATA code, also used as the React key and quick-search shortcut. */
  code: string;
  city: string;
  country: string;
};

export const airports: readonly Airport[] = [
  { code: "BOG", city: "Bogotá", country: "Colombia" },
  { code: "MDE", city: "Medellín", country: "Colombia" },
  { code: "CLO", city: "Cali", country: "Colombia" },
  { code: "CTG", city: "Cartagena", country: "Colombia" },
  { code: "BAQ", city: "Barranquilla", country: "Colombia" },
  { code: "SMR", city: "Santa Marta", country: "Colombia" },
  { code: "ADZ", city: "San Andrés", country: "Colombia" },
  { code: "PEI", city: "Pereira", country: "Colombia" },
  { code: "BGA", city: "Bucaramanga", country: "Colombia" },
  { code: "LIM", city: "Lima", country: "Perú" },
  { code: "CUZ", city: "Cusco", country: "Perú" },
  { code: "SCL", city: "Santiago", country: "Chile" },
  { code: "EZE", city: "Buenos Aires", country: "Argentina" },
  { code: "GRU", city: "São Paulo", country: "Brasil" },
  { code: "GIG", city: "Río de Janeiro", country: "Brasil" },
  { code: "BSB", city: "Brasilia", country: "Brasil" },
  { code: "MVD", city: "Montevideo", country: "Uruguay" },
  { code: "ASU", city: "Asunción", country: "Paraguay" },
  { code: "UIO", city: "Quito", country: "Ecuador" },
  { code: "GYE", city: "Guayaquil", country: "Ecuador" },
  { code: "MEX", city: "Ciudad de México", country: "México" },
  { code: "CUN", city: "Cancún", country: "México" },
  { code: "MTY", city: "Monterrey", country: "México" },
  { code: "PTY", city: "Ciudad de Panamá", country: "Panamá" },
  { code: "SJO", city: "San José", country: "Costa Rica" },
  { code: "SAL", city: "San Salvador", country: "El Salvador" },
  { code: "GUA", city: "Ciudad de Guatemala", country: "Guatemala" },
  { code: "SDQ", city: "Santo Domingo", country: "República Dominicana" },
  { code: "PUJ", city: "Punta Cana", country: "República Dominicana" },
  { code: "CCS", city: "Caracas", country: "Venezuela" },
];

/** Accent- and case-insensitive comparison key ("Bogota" matches "Bogotá"). */
function normalize(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

/**
 * Filters airports by city, country or IATA code.
 * An empty query returns the full list.
 */
export function searchAirports(query: string): Airport[] {
  const term = normalize(query);
  if (!term) return [...airports];

  return airports.filter((airport) =>
    [airport.city, airport.country, airport.code].some((field) =>
      normalize(field).includes(term),
    ),
  );
}
