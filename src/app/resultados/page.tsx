import { Suspense } from "react";

import { AppShell } from "@/components/app-shell";
import { ResultsView } from "@/components/results/results-view";

export const metadata = { title: "Resultados — ZIGO Business" };

/** Shell shown while the client reads the search from the URL. */
function ResultsFallback() {
  return (
    <AppShell>
      <div className="grid h-full place-items-center text-xs font-medium text-muted">
        Cargando resultados…
      </div>
    </AppShell>
  );
}

export default function ResultsPage() {
  return (
    <Suspense fallback={<ResultsFallback />}>
      <ResultsView />
    </Suspense>
  );
}
