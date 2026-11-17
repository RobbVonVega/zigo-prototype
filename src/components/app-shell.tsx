import { Sidebar } from "@/components/sidebar";
import { TopBar } from "@/components/top-bar";

/**
 * Desktop application shell: 250px dark sidebar + fluid main column.
 * The main column keeps the 1px #1E1E1E/7% separator and the design's
 * 80px / 32px content padding, loosening to 32px / 24px on smaller desktops.
 */
export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-dvh overflow-hidden bg-panel">
      <Sidebar />

      <div className="flex min-w-0 flex-1 flex-col overflow-hidden border-l border-ink/[0.07]">
        <TopBar />

        <main className="flex-1 overflow-y-auto bg-white">
          <div className="px-8 py-6 xl:px-20 xl:py-8">
            {/* Figma caps the content inside the frame at 1040px. */}
            <div className="mx-auto w-full max-w-[1040px]">{children}</div>
          </div>
        </main>
      </div>
    </div>
  );
}
