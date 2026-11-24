import { Suspense } from "react";

import { AppShell } from "@/components/app-shell";
import { PaymentView } from "@/components/payment/payment-view";

export const metadata = { title: "Pago — ZIGO Business" };

function PaymentFallback() {
  return (
    <AppShell>
      <div className="grid h-full place-items-center text-xs font-medium text-muted">
        Cargando pago…
      </div>
    </AppShell>
  );
}

export default function PaymentPage() {
  return (
    <Suspense fallback={<PaymentFallback />}>
      <PaymentView />
    </Suspense>
  );
}
