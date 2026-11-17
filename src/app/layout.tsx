import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ZIGO Business — Prototipo",
  description: "Prototipo interactivo de la plataforma ZIGO Business.",
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className="h-full">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
