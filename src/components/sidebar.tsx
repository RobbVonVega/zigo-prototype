import { Icon, type IconName } from "@/components/icon";

type NavItem = {
  label: string;
  icon: IconName;
  href?: string;
  active?: boolean;
  badge?: string;
  expandable?: boolean;
};

const navItems: NavItem[] = [
  { label: "Inicio", icon: "nav-inicio" },
  { label: "Reservas", icon: "nav-reservas" },
  { label: "Vuelos", icon: "nav-vuelos", href: "/", active: true },
  { label: "Disponibilidad", icon: "nav-disponibilidad", badge: "New" },
  { label: "Auditoría de Reservas", icon: "nav-auditoria" },
  { label: "Establecimientos", icon: "nav-establecimientos" },
  { label: "Clientes", icon: "nav-clientes" },
  { label: "Tarifas", icon: "nav-tarifas" },
  { label: "Personas", icon: "nav-personas" },
  { label: "Facturación", icon: "nav-facturacion", expandable: true },
  { label: "Reportes", icon: "nav-reportes", expandable: true },
  { label: "Administración", icon: "nav-administracion", expandable: true },
];

export function Sidebar() {
  return (
    <aside className="hidden w-[250px] shrink-0 flex-col bg-sidebar p-5 lg:flex">
      {/* Logo + collapse control */}
      <div className="flex items-center justify-between">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/brand/zigo-logo.svg"
          alt="ZIGO Business"
          width={95}
          height={40}
          className="h-10 w-[95px]"
        />
        <button
          type="button"
          aria-label="Contraer menú lateral"
          className="grid size-[30px] place-items-center rounded-control text-white"
        >
          <Icon name="panel-toggle" className="size-[17px]" />
        </button>
      </div>

      <div className="mt-[30px] h-0 w-full border-t border-white/[0.07]" />

      <nav aria-label="Navegación principal" className="mt-[30px]">
        <ul className="flex flex-col">
          {navItems.map((item) => (
            <li key={item.label}>
              <a
                href={item.href ?? "#"}
                aria-current={item.active ? "page" : undefined}
                className={`flex h-9 items-center gap-2 rounded-[6px] px-2 text-[13px] leading-5 font-semibold whitespace-nowrap ${
                  item.active ? "bg-white/5 text-[#EDEDED]" : "text-white/60"
                }`}
              >
                <Icon
                  name={item.icon}
                  className={`size-5 ${item.active ? "text-brand" : "text-white/60"}`}
                />

                <span>{item.label}</span>

                {item.badge && (
                  <span className="rounded-[4px] bg-brand px-[8px] py-[2px] text-xs leading-4 font-semibold text-white">
                    {item.badge}
                  </span>
                )}

                {item.expandable && (
                  <Icon
                    name="chevron-down"
                    className="ml-auto size-[18px] text-white/60"
                  />
                )}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Country / currency switcher */}
      <button
        type="button"
        className="mt-auto flex h-10 w-full items-center gap-[5px] rounded-control p-[10px] text-left text-[16px] leading-[19.2px] font-semibold tracking-[-0.04em] text-white/60"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/icons/flag-ecu.svg"
          alt=""
          width={24}
          height={24}
          className="size-6"
        />
        ECU
      </button>
    </aside>
  );
}
