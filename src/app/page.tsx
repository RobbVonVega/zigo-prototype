import { AppShell } from "@/components/app-shell";
import { FlightSearchSection } from "@/components/flight-search/flight-search-section";

export default function Home() {
  return (
    <AppShell>
      <FlightSearchSection />
    </AppShell>
  );
}
