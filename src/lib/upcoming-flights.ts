/**
 * Promo banner + upcoming-flight cards shown under the search panel.
 * Source: Figma nodes 6706-1429 (promo) and 6725-9043 (flight card).
 */

export type PromoImage = {
  src: string;
  alt: string;
};

export type PromoBanner = {
  badge: string;
  pricePrefix: string;
  price: string;
  title: string;
  cta: string;
  caption: string;
  images: readonly PromoImage[];
};

export type FlightEndpoint = {
  code: string;
  city: string;
};

export type UpcomingFlight = {
  id: string;
  from: FlightEndpoint;
  to: FlightEndpoint;
  passenger: string;
  date: string;
  time: string;
  reference: string;
  image: PromoImage;
};

export const promoBanner: PromoBanner = {
  badge: "Por tiempo limitado",
  pricePrefix: "Desde",
  price: "420.000 COP",
  title: "Vuela a Bogotá",
  cta: "Reserva ahora",
  caption: "Descubre Bogotá en tu próximo viaje.",
  images: [
    { src: "/images/promo-bogota-1.png", alt: "Panorámica de Bogotá" },
    { src: "/images/promo-bogota-2.png", alt: "La Candelaria, Bogotá" },
    { src: "/images/promo-bogota-3.png", alt: "Monserrate, Bogotá" },
  ],
};

export const upcomingFlights: readonly UpcomingFlight[] = [
  {
    id: "bog-lim",
    from: { code: "BOG", city: "Bogotá" },
    to: { code: "LIM", city: "Lima" },
    passenger: "Darwin Bracero",
    date: "20-nov-2026",
    time: "08:30",
    reference: "BL7GHT54JQDK",
    image: { src: "/images/flight-bog-lim.png", alt: "Costa de Lima" },
  },
  {
    id: "lim-scl",
    from: { code: "LIM", city: "Lima" },
    to: { code: "SCL", city: "Santiago" },
    passenger: "Darwin Bracero",
    date: "23-nov-2026",
    time: "10:15",
    reference: "BL7GHT54JQDK",
    image: { src: "/images/flight-lim-scl.png", alt: "Santiago de Chile" },
  },
  {
    id: "scl-eze",
    from: { code: "SCL", city: "Santiago" },
    to: { code: "EZE", city: "Buenos Aires" },
    passenger: "Darwin Bracero",
    date: "27-nov-2026",
    time: "14:40",
    reference: "BL7GHT54JQDK",
    image: { src: "/images/flight-scl-eze.png", alt: "Buenos Aires" },
  },
  {
    id: "mex-pty",
    from: { code: "MEX", city: "C. de México" },
    to: { code: "PTY", city: "Panamá" },
    passenger: "Darwin Bracero",
    date: "02-dic-2026",
    time: "09:20",
    reference: "BL7GHT54JQDK",
    image: { src: "/images/flight-mex-pty.png", alt: "Ciudad de Panamá" },
  },
];
