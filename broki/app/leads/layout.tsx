import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Broki · Leads del equipo",
  description: "Gestión y seguimiento comercial de leads inmobiliarios",
};

export default function LeadsLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
