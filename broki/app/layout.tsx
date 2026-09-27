import type { Metadata } from "next";
import { Instrument_Sans, Zalando_Sans } from "next/font/google";
import "./globals.css";

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-instrument",
});

const zalandoSans = Zalando_Sans({
  subsets: ["latin"],
  display: "swap",
  adjustFontFallback: false,
  variable: "--font-zalando-sans",
});

export const metadata: Metadata = {
  title: "Broki · Proyectos",
  description: "Catálogo inmobiliario para brokers",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${zalandoSans.variable} ${instrumentSans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
