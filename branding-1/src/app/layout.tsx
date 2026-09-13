import type { Metadata } from "next";
import { Zalando_Sans } from "next/font/google";
import "./globals.css";

const zalando = Zalando_Sans({ variable: "--font-zalando", subsets: ["latin"], display: "swap", adjustFontFallback: false });

export const metadata: Metadata = {
  title: "NovaIM — Brand Direction 2026",
  description: "From individual points to connected intelligence. The NovaIM identity brings distinct capabilities into one shared system.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return <html lang="en" className={zalando.variable}><body>{children}</body></html>;
}
