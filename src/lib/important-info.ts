/** Copy for "Información importante" (Figma 6759-7498, contactBlock 6761-…). */

export type FaqItem = {
  question: string;
  answer: string;
};

export type InfoBlock = {
  title: string;
  body?: string;
  faqs?: readonly FaqItem[];
  footer?: string;
};

export const importantInfo: readonly InfoBlock[] = [
  {
    title: "Registraduria",
    body: "Una copia física original del registro civil (expedida por la Registraduría Nacional del Estado Civil), en caso de que viajen con un menor de hasta 7 años.",
  },
  {
    title: "Cambio de fecha o itinerario",
    faqs: [
      {
        question: "¿Qué pasa si quiero cambiar el pasaje antes del viaje?",
        answer:
          "La aerolínea te cobrará $ 331300 como penalidad por el cambio. Ten en cuenta que si el pasaje nuevo es más caro que el original, deberás sumar la diferencia de tarifas entre ambos.",
      },
      {
        question:
          "¿Qué pasa si quiero cambiar alguno de los tramos del vuelo y ya tomé el primer avión?",
        answer:
          "La aerolínea te cobrará $ 331300 como penalidad por el cambio. Ten en cuenta que si el pasaje nuevo es más caro que el original, deberás sumar la diferencia de tarifas entre ambos.",
      },
      {
        question:
          "¿Qué pasa si no me presenté en el aeropuerto y quiero cambiar el pasaje?",
        answer: "La aerolínea no permite cambios en el pasaje.",
      },
    ],
  },
  {
    title: "Cancelación",
    faqs: [
      {
        question: "¿Qué pasa si quiero cancelar el pasaje antes del viaje?",
        answer: "El pasaje no es reembolsable.",
      },
      {
        question:
          "¿Qué pasa si quiero cambiar alguno de los tramos del vuelo y ya tomé el primer avión?",
        answer: "El pasaje no es reembolsable.",
      },
      {
        question:
          "¿Qué pasa si no me presenté en el aeropuerto y quiero cambiar el pasaje?",
        answer: "El pasaje no es reembolsable.",
      },
    ],
    footer:
      "Los costos informados se aplican a cada pasajero adulto y están convertidos a la moneda local según el cambio del día. Los montos deben ser abonados en un sólo pago. Los cambios y cancelaciones, si es que son permitidos, pueden realizarse hasta 24 horas previas al embarque y durante un año a partir de la fecha de compra. Los cargos por servicios de la compañía cobrados en la reserva original no son reembolsables.",
  },
  {
    title: "Disclaimers",
    faqs: [
      {
        question:
          "¿Qué pasa si quiero hacer un cambio o cancelación o si tengo una reprogramación en vuelos combinados o de tickets diferentes?",
        answer:
          "En vuelos combinados o en reservas que incluyan tickets diferentes, como las políticas de cambio y cancelación son distintas para cada ticket, se deben gestionar por separado, ya que estos pasajes son emitidos de forma independiente. Es importante que consideres el tiempo de conexión entre estos tickets, así evitarás perder alguno de los vuelos. Ten en cuenta que ni las aerolíneas ni la compañía podrán asumir costos asociados a reprogramaciones, cambios o cancelaciones que ocurran en caso de la pérdida de uno de los vuelos o que la modificación de uno de los tickets afecte el estado del otro.",
      },
      {
        question: "¿Cómo sé que tengo este tipo de vuelo?",
        answer:
          "Podrías saber si elegiste estos tickets al principio del pago, a través de la aclaración: “Con esta combinación de vuelos viajarás con tickets diferentes”. Antes de comprar, te recomendamos revisar el equipaje incluido en cada ticket, las políticas de cambio y cancelación, y el tiempo requerido previo al abordaje de cada vuelo.",
      },
    ],
  },
];
