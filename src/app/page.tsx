import { AppShell } from "@/components/app-shell";
import { FlightSearchSection } from "@/components/flight-search/flight-search-section";
import { PromoBanner } from "@/components/promo-banner";
import { UpcomingFlights } from "@/components/upcoming-flights";

export default function Home() {
  return (
    <AppShell>
      <div className="px-8 py-6 xl:px-20 xl:py-8">
        {/* Figma caps the home content at 1040px. */}
        <div className="mx-auto w-full max-w-[1040px]">
          <div className="flex flex-col gap-8">
            <FlightSearchSection />
            <PromoBanner />
            <UpcomingFlights />
          </div>
        </div>
      </div>
    </AppShell>
  );
}
