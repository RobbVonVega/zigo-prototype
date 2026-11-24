"use client";

import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";

import { AppShell } from "@/components/app-shell";
import {
  FlightDetailsDrawer,
  type DetailsDirection,
} from "@/components/results/flight-details-drawer";
import { PassengerOverlay } from "./passenger-overlay";
import { PassengersSection } from "./passengers-section";
import { ReservationFlightInfo } from "./reservation-flight-info";
import { ReservationStepper } from "./reservation-stepper";
import { ReservationSummary } from "./reservation-summary";
import {
  buildPassengers,
  type PassengerInfo,
  type PassengerRecord,
} from "@/lib/passengers";
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

  // One passenger card per person in the search.
  const [passengers, setPassengers] = useState<PassengerRecord[]>(() =>
    buildPassengers(
      reservation.counts.adult,
      reservation.counts.child,
      reservation.counts.infant,
    ),
  );
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  function savePassenger(info: PassengerInfo) {
    if (editingIndex === null) return;
    setPassengers((current) =>
      current.map((passenger, index) =>
        index === editingIndex ? { ...passenger, info } : passenger,
      ),
    );
    setEditingIndex(null);
  }

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

  // The trip summary contact mirrors the first passenger once it is filled.
  const firstPassenger = passengers[0]?.info;
  const contact = firstPassenger
    ? {
        name: `${firstPassenger.firstName} ${firstPassenger.lastName}`,
        email: firstPassenger.email,
        phone: firstPassenger.phone,
      }
    : null;

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

              <PassengersSection
                passengers={passengers}
                onEdit={(index) => setEditingIndex(index)}
              />

              {/* Next passes: contacto, información y pago. */}
            </div>

            <ReservationSummary
              block={block}
              travellers={travellers}
              tripLabel={isRoundTrip ? "Ida y vuelta" : "Solo ida"}
              contact={contact}
              holdSeconds={HOLD_SECONDS}
            />
          </div>
        </div>
      </div>

      {editingIndex !== null && passengers[editingIndex] ? (
        <PassengerOverlay
          index={editingIndex}
          passenger={passengers[editingIndex]}
          onClose={() => setEditingIndex(null)}
          onSave={savePassenger}
        />
      ) : null}

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
