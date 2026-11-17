import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-1 items-center justify-center px-6 py-16">
      <div className="w-full max-w-[520px] rounded-card border border-line bg-white p-10 shadow-card">
        <Image
          src="/brand/zigo-logo.svg"
          alt="ZIGO Business"
          width={96}
          height={40}
          priority
        />

        <h1 className="mt-10 text-h1 font-semibold">Prototipo en preparación</h1>

        <p className="mt-3 text-body-lg font-medium text-muted">
          Este espacio alojará el prototipo interactivo del flujo de vuelos de
          ZIGO Business. Estamos afinando la dirección de diseño con el equipo
          antes de publicar las pantallas.
        </p>

        <div className="mt-8 flex items-center gap-2 rounded-pill bg-brand-soft px-3 py-1.5 text-2xs font-semibold text-ink w-fit">
          <span className="size-1.5 rounded-full bg-brand" />
          Versión de trabajo
        </div>

        <div className="mt-10 border-t border-line pt-5 text-xs font-medium text-muted">
          ZIGO Business · Colombia
        </div>
      </div>
    </main>
  );
}
