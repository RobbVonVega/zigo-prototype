"use client";

import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";

import { AppShell } from "@/components/app-shell";
import {
  FlightDetailsDrawer,
  type DetailsDirection,
} from "@/components/results/flight-details-drawer";
import { ReservationFlightInfo } from "./reservation-flight-info";
import { ReservationStepper } from "./reservation-stepper";
import { ReservationSummary } from "./reservation-summary";
import { priceBlocks } from "@/lib/results";
import { parseReservationParams } from "@/lib/results-url";

/** Fare hold shown in the summary (15 minutes). */
const HOLD_SECONDS = 15 * 60;

/**
 * Reservation screen, step 1 (Figma 6759-7498): stepper, the flight summary for
 * the chosen combination and the sticky trip summary with the countdown.
 * Passenger/contact/payment blocks come in later passes; the contact section
 * starts empty and fills as the flow advances.
 */
export function ReservationView() {
  const params = useSearchParams();

  const reservation = useMemo(
    () => parseReservationParams(new URLSearchParams(params.toString())),
    [params],
  );

  const [detailsOpen, setDetailsOpen] = useState(false);
  const [detailsDirection, setDetailsDirection] =
    useState<DetailsDirection>("outbound");

  const block =
    priceBlocks.find((item) => item.id === reservation.blockId) ??
    priceBlocks[0];

  const outbound =
    block.outbound.find((flight) => flight.id === reservation.outboundId) ??
    block.outbound[0];

  const returning =
    block.returning.find((flight) => flight.id === reservation.returningId) ??
    block.returning[0];

  const isRoundTrip = reservation.tripType === "round-trip";
  const travellers =
    reservation.counts.adult +
    reservation.counts.child +
    reservation.counts.infant;

  return (
    <AppShell>
      <div className="px-8 py-8">
        <div className="mx-auto flex w-full max-w-[938px] flex-col gap-[30px]">
          <ReservationStepper step={1} />

          <div className="flex items-start gap-4">
            <div className="flex min-w-0 flex-1 flex-col gap-12">
              <ReservationFlightInfo
                block={block}
                outbound={outbound}
                returning={returning}
                origin={reservation.origin}
                destination={reservation.destination}
                departureDate={reservation.departureDate}
                returnDate={reservation.returnDate}
                showReturn={isRoundTrip}
                onShowDetails={() => {
                  setDetailsDirection("outbound");
                  setDetailsOpen(true);
                }}
              />

              {/* Next passes: pasajeros, contacto, información y pago. */}
            </div>

            <ReservationSummary
              block={block}
              travellers={travellers}
              tripLabel={isRoundTrip ? "Ida y vuelta" : "Solo ida"}
              contact={null}
              holdSeconds={HOLD_SECONDS}
            />
          </div>
        </div>
      </div>

      <FlightDetailsDrawer
        open={detailsOpen}
        onClose={() => setDetailsOpen(false)}
        flight={detailsDirection === "outbound" ? outbound : returning}
        block={block}
        direction={detailsDirection}
        onDirectionChange={setDetailsDirection}
        showTabs={isRoundTrip}
        origin={reservation.origin}
        destination={reservation.destination}
        departureDate={reservation.departureDate}
        returnDate={reservation.returnDate}
      />
    </AppShell>
  );
}
