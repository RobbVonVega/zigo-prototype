import { AppShell } from "@/components/app-shell";
import { FlightSearchSection } from "@/components/flight-search/flight-search-section";
import { PromoBanner } from "@/components/promo-banner";
import { UpcomingFlights } from "@/components/upcoming-flights";

export default function Home() {
  return (
    <AppShell>
      <div className="flex flex-col gap-8">
        <FlightSearchSection />
        <PromoBanner />
        <UpcomingFlights />
      </div>
    </AppShell>
  );
}
