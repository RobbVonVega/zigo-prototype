"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";

import { AppShell } from "@/components/app-shell";
import { ReservationStepper } from "@/components/reservation/reservation-stepper";
import { ReservationSummary } from "@/components/reservation/reservation-summary";
import { ExpiredPaymentSummary, PaymentSuccessCard } from "./payment-cards";
import { PaymentMethods } from "./payment-methods";
import { PaymentStateToggle } from "./payment-state-toggle";
import { PaymentStatusCard } from "./payment-status-card";
import { PaymentStrip } from "./payment-strip";
import { formatCountdown, useCountdown } from "@/hooks/use-countdown";
import {
  ADDITIONAL_FARE,
  BOOKING_PNR,
  buildPaymentUrl,
  parsePaymentParams,
  passengersLabel,
  shortDates,
  type PaymentState,
} from "@/lib/payment";
import { formatCop, priceBlocks } from "@/lib/results";
import { buildReservationUrl } from "@/lib/results-url";

const HOLD_SECONDS = 15 * 60;

/**
 * Payment screen (Figma 6770-7488 waiting, 6775-15138 error, 6775-14878 expired,
 * 6775-7708 success). The top-bar toggle switches between the four states.
 */
export function PaymentView() {
  const params = useSearchParams();
  const router = useRouter();

  const payment = useMemo(
    () => parsePaymentParams(new URLSearchParams(params.toString())),
    [params],
  );

  const state = payment.state;
  const remaining = useCountdown(HOLD_SECONDS);

  const block =
    priceBlocks.find((item) => item.id === payment.blockId) ?? priceBlocks[0];

  const originCode = payment.origin?.code ?? "UIO";
  const destinationCode = payment.destination?.code ?? "BOG";
  const dates = shortDates(
    payment.departureDate,
    payment.tripType === "round-trip" ? payment.returnDate : undefined,
  );
  const passengers = passengersLabel(payment.counts);

  const search = {
    tripType: payment.tripType,
    origin: payment.origin,
    destination: payment.destination,
    departureDate: payment.departureDate,
    returnDate: payment.returnDate,
    counts: payment.counts,
  };

  const contact = payment.contact;
  const hasContact = Boolean(contact.name || contact.email || contact.phone);

  function switchState(next: PaymentState) {
    router.replace(
      buildPaymentUrl({
        search,
        blockId: block.id,
        outboundId: payment.outboundId,
        returningId: payment.returningId,
        contact,
        state: next,
      }),
      { scroll: false },
    );
  }

  function viewItinerary() {
    router.push(
      buildReservationUrl({
        search,
        blockId: block.id,
        outboundId: payment.outboundId,
        returningId: payment.returningId,
      }),
    );
  }

  const isSuccess = state === "success";
  const isExpired = state === "expired";
  const showTimer = state === "waiting" || state === "error";

  return (
    <AppShell
      headerExtra={<PaymentStateToggle value={state} onChange={switchState} />}
    >
      <div className="px-8 py-8">
        <div className="mx-auto flex w-full max-w-[938px] flex-col gap-[30px]">
          <ReservationStepper step={isSuccess ? 3 : 2} />

          <div className="flex items-start gap-4">
            <div className="flex min-w-0 flex-1 flex-col gap-4">
              {!isSuccess ? (
                <div className="flex flex-wrap items-center gap-4">
                  <h1 className="text-[24px] leading-[17px] font-semibold tracking-[-0.04em] text-ink">
                    {isExpired ? "Ya casi terminas" : "Completa el pago de tu viaje"}
                  </h1>

                  {showTimer ? (
                    <span className="ml-auto flex h-[25px] items-center gap-2 rounded-full bg-[#FFF5ED] px-4">
                      <span className="text-xs leading-[9px] font-medium text-ink">
                        Precio reservado por
                      </span>
                      <span className="text-xs leading-[9px] font-semibold tabular-nums text-ink">
                        {formatCountdown(remaining)}
                      </span>
                    </span>
                  ) : null}
                </div>
              ) : null}

              <div className="flex flex-col gap-2">
                {isSuccess ? (
                  <>
                    <PaymentStrip
                      originCode={originCode}
                      destinationCode={destinationCode}
                      dates={dates}
                      passengers={passengers}
                    />

                    <PaymentSuccessCard
                      pnr={BOOKING_PNR}
                      contactName={contact.name || "el pasajero principal"}
                      contactEmail={contact.email}
                      onViewItinerary={viewItinerary}
                    />
                  </>
                ) : (
                  <>
                    <PaymentStatusCard
                      variant={isExpired ? "expired" : state === "error" ? "error" : "waiting"}
                    />

                    {isExpired ? (
                      <ExpiredPaymentSummary
                        originCode={originCode}
                        destinationCode={destinationCode}
                        dates={dates}
                        passengers={passengers}
                        paid={block.price}
                        additional={ADDITIONAL_FARE}
                      />
                    ) : (
                      <PaymentStrip
                        originCode={originCode}
                        destinationCode={destinationCode}
                        dates={dates}
                        passengers={passengers}
                        total={block.price}
                      />
                    )}

                    <PaymentMethods
                      actionLabel={
                        isExpired
                          ? `Pagar ${formatCop(ADDITIONAL_FARE)} COP`
                          : "Abrir link de pago"
                      }
                      footnote={
                        isExpired
                          ? `Por favor completa el pago antes de las 18:00 de hoy (GMT). Si no lo haces, cancelaremos la reserva y te reembolsaremos automáticamente el total de ${formatCop(block.price)} COP a tu método de pago original.`
                          : undefined
                      }
                    />
                  </>
                )}
              </div>
            </div>

            <div className="sticky top-6 hidden w-[240px] shrink-0 min-[1200px]:block">
              <ReservationSummary
                block={block}
                travellers={
                  payment.counts.adult +
                  payment.counts.child +
                  payment.counts.infant
                }
                tripLabel={
                  payment.tripType === "round-trip" ? "Ida y vuelta" : "Solo ida"
                }
                contact={hasContact ? contact : null}
                holdSeconds={HOLD_SECONDS}
                showTotal={false}
                showTimer={false}
              />
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
