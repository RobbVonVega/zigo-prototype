import { Suspense } from "react";

import { AppShell } from "@/components/app-shell";
import { ReservationView } from "@/components/reservation/reservation-view";

export const metadata = { title: "Reserva — ZIGO Business" };

/** Shell shown while the client reads the chosen combination from the URL. */
function ReservationFallback() {
  return (
    <AppShell>
      <div className="grid h-full place-items-center text-xs font-medium text-muted">
        Cargando reserva…
      </div>
    </AppShell>
  );
}

export default function ReservationPage() {
  return (
    <Suspense fallback={<ReservationFallback />}>
      <ReservationView />
    </Suspense>
  );
}
