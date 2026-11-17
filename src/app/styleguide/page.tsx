import { colors, radii, typography } from "@/lib/tokens";

export const metadata = { title: "Design tokens — ZIGO Business" };

export default function StyleguidePage() {
  return (
    <main className="mx-auto w-full max-w-[1100px] px-8 py-14">
      <header className="mb-12">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand">
          Referencia interna
        </p>
        <h1 className="mt-2 text-section font-semibold">Design tokens</h1>
        <p className="mt-2 max-w-[620px] text-body text-muted">
          Base visual extraída del archivo de Figma de ZIGO. Se usa como
          contrato entre diseño y prototipo mientras llega la dirección final.
        </p>
      </header>

      <section className="mb-14">
        <h2 className="mb-5 text-h3 font-semibold">Color</h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {colors.map((c) => (
            <div
              key={c.name}
              className="overflow-hidden rounded-card border border-line bg-white"
            >
              <div className="h-16" style={{ background: c.hex }} />
              <div className="p-3">
                <p className="text-sm font-semibold">{c.name}</p>
                <p className="mt-0.5 text-xs font-medium text-muted">{c.hex}</p>
                <p className="mt-2 text-2xs font-medium text-muted">{c.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-14">
        <h2 className="mb-5 text-h3 font-semibold">Tipografía</h2>
        <div className="divide-y divide-line overflow-hidden rounded-card border border-line bg-white">
          {typography.map((t) => (
            <div
              key={t.token}
              className="flex flex-wrap items-baseline justify-between gap-4 px-6 py-4"
            >
              <p
                className="text-ink"
                style={{
                  fontSize: t.size,
                  lineHeight: `${t.lineHeight}px`,
                  letterSpacing: "-0.04em",
                  fontWeight: t.weight,
                }}
              >
                {t.sample}
              </p>
              <p className="text-xs font-medium text-muted">
                {t.token} · {t.size}/{t.lineHeight} · {t.weight}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-14">
        <h2 className="mb-5 text-h3 font-semibold">Radios</h2>
        <div className="flex flex-wrap gap-6">
          {radii.map((r) => (
            <div key={r.token} className="w-[220px]">
              <div
                className="h-24 border border-line bg-white shadow-card"
                style={{ borderRadius: r.value }}
              />
              <p className="mt-2 text-sm font-semibold">{r.token}</p>
              <p className="text-xs font-medium text-muted">
                {r.value} · {r.role}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-5 text-h3 font-semibold">Componentes base</h2>
        <div className="flex flex-wrap items-end gap-4 rounded-card border border-line bg-white p-6">
          <button className="rounded-control bg-brand px-5 py-2.5 text-xs font-semibold text-white">
            Buscar
          </button>
          <button className="rounded-control border border-ink bg-white px-5 py-2.5 text-body font-semibold text-ink">
            Ver detalles
          </button>
          <div className="rounded-control bg-surface px-3 py-2 text-xs font-semibold text-muted">
            Seleccione
          </div>
          <div className="flex items-center gap-1.5 rounded-pill bg-brand-soft px-3 py-1.5 text-2xs font-semibold">
            <span className="size-1.5 rounded-full bg-brand" />
            Por tiempo limitado
          </div>
          <div className="rounded-control bg-cyan-soft px-3 py-1.5 text-xs font-semibold">
            Ida y Vuelta
          </div>
        </div>
      </section>
    </main>
  );
}
