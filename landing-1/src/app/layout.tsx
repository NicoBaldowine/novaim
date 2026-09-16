import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const zalando = localFont({ src: "./fonts/zalando-sans-latin.woff2", variable: "--font-zalando", weight: "200 900", display: "swap", adjustFontFallback: false });

export const metadata: Metadata = {
  title: "novaim — Agentic engineering",
  description: "Agentic engineering services. Built for what’s next. We design, build and integrate AI agents that turn complex workflows into practical, scalable solutions.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return <html lang="en" className={zalando.variable}><body>{children}</body></html>;
}
