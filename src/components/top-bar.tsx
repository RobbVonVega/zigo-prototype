import { Icon } from "@/components/icon";

/**
 * Global app header (Figma node 6706-1369): menu + global search on the left,
 * notifications and profile on the right. 56px tall, #F0F0F0 background.
 */
export function TopBar() {
  return (
    <header className="flex h-14 shrink-0 items-center justify-between gap-2 bg-surface px-8">
      <div className="flex items-center gap-2">
        <button
          type="button"
          aria-label="Abrir menú lateral"
          className="grid size-8 place-items-center"
        >
          <Icon name="menu" className="h-4 w-6 text-ink" />
        </button>

        <button
          type="button"
          aria-label="Abrir búsqueda global"
          className="grid size-10 place-items-center rounded-control"
        >
          <Icon name="search" className="size-5 text-ink" />
        </button>
      </div>

      <div className="flex items-center">
        <button
          type="button"
          aria-label="Notificaciones"
          className="grid size-10 place-items-center rounded-pill bg-[#EDEDED]"
        >
          <Icon name="bell" className="h-5 w-[17px] text-[#1F2937]" />
        </button>

        <div className="grid size-14 place-items-center p-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/avatar.png"
            alt="Perfil de usuario"
            width={40}
            height={40}
            className="size-10 rounded-full object-cover"
          />
        </div>
      </div>
    </header>
  );
}
