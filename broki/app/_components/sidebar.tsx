"use client";

import Link from "next/link";
import { Icon, type IconName } from "./icon";

export type SidebarItemProps = {
  icon: IconName;
  label: string;
  active?: boolean;
  disabled?: boolean;
  href?: string;
  onSelect?: () => void;
};

export function SidebarItem({ icon, label, active = false, disabled = false, href, onSelect }: SidebarItemProps) {
  const content = <><Icon name={icon} size={15}/><span>{label}</span></>;

  if (href && !disabled) {
    return (
      <Link
        href={href}
        className={`navItem ${active ? "navItemActive" : ""}`}
        onClick={onSelect}
        aria-current={active ? "page" : undefined}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      type="button"
      className={`navItem ${active ? "navItemActive" : ""} ${disabled ? "navItemDisabled" : ""}`}
      onClick={onSelect}
      disabled={disabled}
      aria-current={active ? "page" : undefined}
    >
      {content}
    </button>
  );
}

type SidebarSection = {
  label: string;
  items: Array<{ icon: IconName; label: string; href?: string }>;
};

export const sidebarSections: SidebarSection[] = [
  { label: "CATÁLOGO", items: [{ icon: "building", label: "Proyectos", href: "/" }] },
  {
    label: "GESTIÓN",
    items: [
      { icon: "users", label: "Leads / Setter", href: "/leads" },
      { icon: "calendar", label: "Agenda" },
      { icon: "columns", label: "Pipeline" },
      { icon: "users", label: "Clientes" },
      { icon: "document", label: "Cotizaciones" },
      { icon: "bookmark", label: "Reservas" },
      { icon: "mail", label: "Revisión de cierres" },
    ],
  },
  {
    label: "ADMINISTRACIÓN",
    items: [
      { icon: "shield", label: "Usuarios" },
      { icon: "building", label: "Proyectos" },
      { icon: "mail", label: "Invitaciones" },
      { icon: "building", label: "Inmobiliarias" },
      { icon: "building", label: "Equipos" },
      { icon: "activity", label: "Observabilidad" },
    ],
  },
];

function SidebarBrand() {
  return (
    <div className="brand" aria-label="Broki">
      <svg className="brandMark" viewBox="0 0 42 40" aria-hidden="true"><path d="M9 2h13L11 21H0L9 2Zm18 0h8l-8 14h-9L27 2Zm-12 19h12l-10 17H5l10-17Zm17-5 10 17-3 5H25l11-19-4-3Z" fill="currentColor"/></svg>
      <span>broki</span>
    </div>
  );
}

export function Sidebar({ open = false, onClose, preview = false, activePath = "/" }: { open?: boolean; onClose?: () => void; preview?: boolean; activePath?: string }) {
  return (
    <aside className={`sidebar ${open ? "sidebarOpen" : ""} ${preview ? "sidebarPreview" : ""}`}>
      <div className="mobileSidebarHeader"><SidebarBrand/><button className="iconButton" onClick={onClose} aria-label="Cerrar menú"><Icon name="x"/></button></div>
      <nav aria-label="Navegación principal">
        {sidebarSections.map((section) => (
          <section className="navSection" key={section.label}>
            <h2>{section.label}</h2>
            {section.items.map((item) => (
              <SidebarItem
                key={`${section.label}-${item.label}`}
                icon={item.icon}
                label={item.label}
                href={item.href}
                active={item.href === activePath}
                onSelect={onClose}
              />
            ))}
          </section>
        ))}
        <section className="navSection navSoon">
          <h2>PRÓXIMAMENTE</h2>
          <SidebarItem icon="headphones" label="Soporte" disabled />
        </section>
      </nav>
    </aside>
  );
}
