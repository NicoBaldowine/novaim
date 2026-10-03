"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { Icon, type IconName } from "./icon";

type ControlMenuProps = {
  active?: boolean;
  badge?: number;
  children: ReactNode;
  icon?: IconName;
  label: string;
  open: boolean;
  onToggle: () => void;
  panelLabel: string;
  panelRole?: "group" | "menu";
  size?: "default" | "compact";
};

export function ControlMenu({ active = false, badge, children, icon, label, open, onToggle, panelLabel, panelRole = "group", size = "default" }: ControlMenuProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const closeOnOutsideClick = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) onToggle();
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onToggle();
    };

    document.addEventListener("pointerdown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [onToggle, open]);

  return (
    <div ref={rootRef} className={`controlMenu${size === "compact" ? " controlMenuCompact" : ""}`}>
      <button className={`controlTrigger${size === "compact" ? " controlTriggerCompact" : ""}${active ? " controlTriggerActive" : ""}`} type="button" onClick={onToggle} aria-expanded={open} aria-haspopup={panelRole === "menu" ? "menu" : "dialog"}>
        {icon && <Icon name={icon}/>} 
        <span>{label}</span>
        {badge ? <b className="controlBadge">{badge}</b> : null}
        <Icon name="chevronDown" className="controlChevron"/>
      </button>
      {open && <div className={`controlPopover${size === "compact" ? " controlPopoverCompact" : ""}`} role={panelRole} aria-label={panelLabel}>{children}</div>}
    </div>
  );
}
