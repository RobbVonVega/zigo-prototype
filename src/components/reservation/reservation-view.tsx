"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import { AppShell } from "@/components/app-shell";
import {
  FlightDetailsDrawer,
  type DetailsDirection,
} from "@/components/results/flight-details-drawer";
import { ContactSection, type ContactDetails } from "./contact-section";
import { ImportantInfoSection } from "./important-info-section";
import { PassengerOverlay } from "./passenger-overlay";
import { PassengersSection } from "./passengers-section";
import { PaymentSection } from "./payment-section";
import { ReservationFlightInfo } from "./reservation-flight-info";
import { ReservationSkeleton } from "./reservation-skeleton";
import { ReservationStepper } from "./reservation-stepper";
import { ReservationSummary } from "./reservation-summary";
import {
  buildPassengers,
  type PassengerInfo,
  type PassengerRecord,
} from "@/lib/passengers";
import { buildPaymentUrl } from "@/lib/payment";
import { priceBlocks } from "@/lib/results";
import { parseReservationParams } from "@/lib/results-url";

/** Fare hold shown in the summary (15 minutes). */
const HOLD_SECONDS = 15 * 60;

/** Skeleton time while the reservation "loads". */
const LOADING_MS = 700;

/**
 * Reservation screen, step 1 (Figma 6759-7498): stepper, the flight summary for
 * the chosen combination and the sticky trip summary with the countdown.
 * Passenger/contact/payment blocks come in later passes; the contact section
 * starts empty and fills as the flow advances.
 */
export function ReservationView() {
  const params = useSearchParams();
  const router = useRouter();

  const reservation = useMemo(
    () => parseReservationParams(new URLSearchParams(params.toString())),
    [params],
  );

  // Only arrivals from "Continuar" (loading=1) start with the skeleton.
  const [loading, setLoading] = useState(
    () => new URLSearchParams(params.toString()).get("loading") === "1",
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

  // Contact details: prefilled from passenger 1 until the user edits them.
  const [contact, setContact] = useState<ContactDetails>({
    name: "",
    phone: "",
    email: "",
  });
  const [contactEdited, setContactEdited] = useState(false);

  useEffect(() => {
    if (!loading) return;

    const timer = setTimeout(() => {
      setLoading(false);

      // Drop the flag so a refresh goes straight to the content.
      const next = new URLSearchParams(params.toString());
      next.delete("loading");
      router.replace(`/reserva?${next.toString()}`, { scroll: false });
    }, LOADING_MS);

    return () => clearTimeout(timer);
  }, [loading, params, router]);

  function savePassenger(info: PassengerInfo) {
    if (editingIndex === null) return;

    setPassengers((current) =>
      current.map((passenger, index) =>
        index === editingIndex ? { ...passenger, info } : passenger,
      ),
    );

    // Passenger 1 seeds the contact block while it is still untouched.
    if (editingIndex === 0 && !contactEdited) {
      setContact({
        name: `${info.firstName} ${info.lastName}`,
        phone: info.phone,
        email: info.email,
      });
    }

    setEditingIndex(null);
  }

  function updateContact(next: ContactDetails) {
    setContact(next);
    setContactEdited(true);
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

  // The contact block is the source of truth for the summary once it has data.
  const summaryContact =
    contact.name || contact.email || contact.phone ? contact : null;

  if (loading) {
    return (
      <AppShell>
        <ReservationSkeleton />
      </AppShell>
    );
  }

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

              <ContactSection value={contact} onChange={updateContact} />

              <ImportantInfoSection />

              <PaymentSection
                block={block}
                onPay={() =>
                  router.push(
                    buildPaymentUrl({
                      search: {
                        tripType: reservation.tripType,
                        origin: reservation.origin,
                        destination: reservation.destination,
                        departureDate: reservation.departureDate,
                        returnDate: reservation.returnDate,
                        counts: reservation.counts,
                      },
                      blockId: block.id,
                      outboundId: outbound.id,
                      returningId: isRoundTrip ? returning.id : undefined,
                      contact,
                    }),
                  )
                }
              />
            </div>

            <ReservationSummary
              block={block}
              travellers={travellers}
              tripLabel={isRoundTrip ? "Ida y vuelta" : "Solo ida"}
              contact={summaryContact}
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
