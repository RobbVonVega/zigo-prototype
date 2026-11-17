import { Sidebar } from "@/components/sidebar";
import { TopBar } from "@/components/top-bar";

/**
 * Desktop application shell: 250px dark sidebar + fluid main column.
 * Each screen owns its own content padding/width so the home and results
 * layouts can follow their Figma frames.
 */
export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-dvh overflow-hidden bg-panel">
      <Sidebar />

      <div className="flex min-w-0 flex-1 flex-col overflow-hidden border-l border-ink/[0.07]">
        <TopBar />

        <main className="flex-1 overflow-y-auto bg-white">{children}</main>
      </div>
    </div>
  );
}
