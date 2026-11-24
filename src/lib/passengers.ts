/**
 * Passenger data for the reservation flow (Figma 6761-15219, 6761-15733,
 * 6761-15725, 6770-7206).
 *
 * The company directory below is mock data: picking a company filters its
 * people, and picking a person prefills the passenger form.
 */

export type PassengerType = "adult" | "child" | "infant";

export const PASSENGER_TYPE_LABEL: Record<PassengerType, string> = {
  adult: "Adulto",
  child: "Niño",
  infant: "Bebé",
};

export type CompanyPerson = {
  id: string;
  firstName: string;
  lastName: string;
  department: string;
  costCenter: string;
  account: string;
  nationality: string;
  idType: string;
  idOrigin: string;
  identification: string;
  gender: string;
  birthDate: string;
  phone: string;
  email: string;
};

export type Company = {
  id: string;
  name: string;
  people: readonly CompanyPerson[];
};

export const companies: readonly Company[] = [
  {
    id: "zigo",
    name: "Zigo Empresas",
    people: [
      {
        id: "jose",
        firstName: "José Andres",
        lastName: "Pardo Zúñiga",
        department: "Comercial",
        costCenter: "CC-1024",
        account: "4200-118",
        nationality: "Ecuatoriana",
        idType: "Pasaporte",
        idOrigin: "Ecuador",
        identification: "A12345678",
        gender: "Masculino",
        birthDate: "1990-04-12",
        phone: "+593 964 868 1234",
        email: "correo@correo.com",
      },
      {
        id: "maria",
        firstName: "María Fernanda",
        lastName: "López",
        department: "Finanzas",
        costCenter: "CC-2031",
        account: "4100-052",
        nationality: "Ecuatoriana",
        idType: "Cédula",
        idOrigin: "Ecuador",
        identification: "1712345678",
        gender: "Femenino",
        birthDate: "1988-09-03",
        phone: "+593 987 112 233",
        email: "maria.lopez@zigo.com",
      },
      {
        id: "carlos",
        firstName: "Carlos Eduardo",
        lastName: "García",
        department: "Operaciones",
        costCenter: "CC-3010",
        account: "4300-201",
        nationality: "Colombiana",
        idType: "Cédula",
        idOrigin: "Colombia",
        identification: "1020304050",
        gender: "Masculino",
        birthDate: "1985-01-26",
        phone: "+57 310 555 8899",
        email: "carlos.garcia@zigo.com",
      },
      {
        id: "ana",
        firstName: "Ana Sofía",
        lastName: "Martínez",
        department: "Tecnología",
        costCenter: "CC-4055",
        account: "4400-377",
        nationality: "Ecuatoriana",
        idType: "Pasaporte",
        idOrigin: "Ecuador",
        identification: "B98765432",
        gender: "Femenino",
        birthDate: "1994-07-18",
        phone: "+593 998 445 112",
        email: "ana.martinez@zigo.com",
      },
    ],
  },
  {
    id: "acme",
    name: "Acme Corp",
    people: [
      {
        id: "luis",
        firstName: "Luis Fernando",
        lastName: "Pérez",
        department: "Ventas",
        costCenter: "AC-1102",
        account: "5100-010",
        nationality: "Peruana",
        idType: "DNI",
        idOrigin: "Perú",
        identification: "45678912",
        gender: "Masculino",
        birthDate: "1982-11-30",
        phone: "+51 987 654 321",
        email: "luis.perez@acme.com",
      },
      {
        id: "camila",
        firstName: "Camila Isabel",
        lastName: "Sánchez",
        department: "Marketing",
        costCenter: "AC-2040",
        account: "5200-118",
        nationality: "Chilena",
        idType: "Pasaporte",
        idOrigin: "Chile",
        identification: "C33445566",
        gender: "Femenino",
        birthDate: "1993-03-08",
        phone: "+56 9 8877 6655",
        email: "camila.sanchez@acme.com",
      },
    ],
  },
  {
    id: "globant",
    name: "Globant",
    people: [
      {
        id: "valentina",
        firstName: "Valentina",
        lastName: "Rodríguez",
        department: "Diseño",
        costCenter: "GL-3001",
        account: "6100-330",
        nationality: "Colombiana",
        idType: "Cédula",
        idOrigin: "Colombia",
        identification: "1098765432",
        gender: "Femenino",
        birthDate: "1996-05-21",
        phone: "+57 320 445 6677",
        email: "valentina.rodriguez@globant.com",
      },
      {
        id: "diego",
        firstName: "Diego Alejandro",
        lastName: "Torres",
        department: "Ingeniería",
        costCenter: "GL-4020",
        account: "6200-145",
        nationality: "Argentina",
        idType: "DNI",
        idOrigin: "Argentina",
        identification: "33445566",
        gender: "Masculino",
        birthDate: "1991-08-14",
        phone: "+54 11 5566 7788",
        email: "diego.torres@globant.com",
      },
    ],
  },
];

export const departments: readonly string[] = [
  "Comercial",
  "Finanzas",
  "Operaciones",
  "Tecnología",
  "Ventas",
  "Marketing",
  "Diseño",
  "Ingeniería",
  "Recursos Humanos",
  "Administración",
];

export const nationalities: readonly string[] = [
  "Ecuatoriana",
  "Colombiana",
  "Peruana",
  "Chilena",
  "Argentina",
  "Mexicana",
  "Panameña",
  "Venezolana",
];

export const identificationTypes: readonly string[] = [
  "Pasaporte",
  "Cédula",
  "DNI",
  "RUC",
];

export const identificationOrigins: readonly string[] = [
  "Ecuador",
  "Colombia",
  "Perú",
  "Chile",
  "Argentina",
  "México",
  "Panamá",
  "Venezuela",
];

export const genders: readonly string[] = [
  "Femenino",
  "Masculino",
  "Otro",
  "Prefiero no decirlo",
];

export type PassengerInfo = {
  type: PassengerType;
  companyId: string;
  companyName: string;
  /** null when the user creates a new person. */
  personId: string | null;
  firstName: string;
  lastName: string;
  department: string;
  costCenter: string;
  account: string;
  nationality: string;
  idType: string;
  idOrigin: string;
  identification: string;
  gender: string;
  birthDate: string;
  phone: string;
  email: string;
  comments: string;
};

export type PassengerRecord = {
  type: PassengerType;
  info?: PassengerInfo;
};

/** One card per passenger, in the order adults → children → infants. */
export function buildPassengers(
  adults: number,
  children: number,
  infants: number,
): PassengerRecord[] {
  const list: PassengerRecord[] = [];
  for (let index = 0; index < adults; index += 1) {
    list.push({ type: "adult" });
  }
  for (let index = 0; index < children; index += 1) {
    list.push({ type: "child" });
  }
  for (let index = 0; index < infants; index += 1) {
    list.push({ type: "infant" });
  }
  return list;
}

/** Empty draft used by the overlay; company/person selection fills it. */
export function emptyPassengerInfo(type: PassengerType): PassengerInfo {
  return {
    type,
    companyId: "",
    companyName: "",
    personId: null,
    firstName: "",
    lastName: "",
    department: "",
    costCenter: "",
    account: "",
    nationality: "",
    idType: "",
    idOrigin: "",
    identification: "",
    gender: "",
    birthDate: "",
    phone: "",
    email: "",
    comments: "",
  };
}
