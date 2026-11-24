/**
 * Loading placeholder for the reservation screen: same column widths and block
 * rhythm as the real page, so nothing jumps when the data arrives.
 */
export function ReservationSkeleton() {
  return (
    <div className="px-8 py-8" role="status" aria-live="polite">
      <span className="sr-only">Cargando reserva…</span>

      <div className="mx-auto flex w-full max-w-[938px] animate-pulse flex-col gap-[30px]">
        <div className="h-5 w-[343px] rounded-full bg-ink/[0.06]" />

        <div className="flex items-start gap-4">
          <div className="flex min-w-0 flex-1 flex-col gap-12">
            <div className="flex flex-col gap-4">
              <div className="h-6 w-[240px] rounded bg-ink/[0.06]" />
              <div className="h-[126px] rounded-[8px] bg-ink/[0.05]" />
            </div>

            <div className="flex flex-col gap-4">
              <div className="h-6 w-[140px] rounded bg-ink/[0.06]" />
              <div className="h-[55px] rounded-[8px] bg-ink/[0.05]" />
              <div className="h-[50px] rounded-[8px] bg-ink/[0.05]" />
              <div className="h-[50px] rounded-[8px] bg-ink/[0.05]" />
            </div>

            <div className="flex flex-col gap-4">
              <div className="h-6 w-[200px] rounded bg-ink/[0.06]" />
              <div className="h-[136px] rounded-[8px] bg-ink/[0.05]" />
            </div>

            <div className="flex flex-col gap-4">
              <div className="h-6 w-[220px] rounded bg-ink/[0.06]" />
              <div className="h-[94px] rounded-[8px] bg-ink/[0.05]" />
              <div className="h-[213px] rounded-[8px] bg-ink/[0.05]" />
            </div>
          </div>

          <div className="hidden w-[240px] shrink-0 flex-col gap-2 min-[1200px]:flex">
            <div className="h-[208px] rounded-[8px] bg-ink/[0.05]" />
            <div className="h-[108px] rounded-[8px] bg-ink/[0.05]" />
            <div className="h-[124px] rounded-[8px] bg-ink/[0.05]" />
          </div>
        </div>
      </div>
    </div>
  );
}
