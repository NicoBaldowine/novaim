import type { Metadata } from "next";
import { Instrument_Sans } from "next/font/google";
import "./globals.css";

const instrument = Instrument_Sans({ variable: "--font-instrument", subsets: ["latin"], display: "swap", adjustFontFallback: false });

export const metadata: Metadata = {
  title: "NovaIM — Sinapsis — Brand Direction 2026",
  description: "Intelligence, built in. A new identity for the intelligence infrastructure behind modern business.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return <html lang="en" className={instrument.variable}><body>{children}</body></html>;
}
