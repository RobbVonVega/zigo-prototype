import { FlightCard } from "@/components/flight-card";
import { upcomingFlights } from "@/lib/upcoming-flights";

/**
 * "Tus próximos vuelos" block (Figma node 6706-1447): 33px title, 24px gap,
 * 2×2 card grid with 20px gutters. Single column below 1280.
 */
export function UpcomingFlights() {
  return (
    <section className="flex flex-col gap-6">
      <h2 className="text-section leading-[24px] font-semibold">Tus próximos vuelos</h2>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        {upcomingFlights.map((flight) => (
          <FlightCard key={flight.id} flight={flight} />
        ))}
      </div>
    </section>
  );
}
