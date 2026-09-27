"use client";

import type { ReactNode } from "react";
import { Icon, type IconName } from "./icon";

type ControlMenuProps = {
  active?: boolean;
  badge?: number;
  children: ReactNode;
  icon: IconName;
  label: string;
  open: boolean;
  onToggle: () => void;
  panelLabel: string;
  panelRole?: "group" | "menu";
};

export function ControlMenu({ active = false, badge, children, icon, label, open, onToggle, panelLabel, panelRole = "group" }: ControlMenuProps) {
  return (
    <div className="controlMenu">
      <button className={`controlTrigger${active ? " controlTriggerActive" : ""}`} type="button" onClick={onToggle} aria-expanded={open} aria-haspopup={panelRole === "menu" ? "menu" : "dialog"}>
        <Icon name={icon}/>
        <span>{label}</span>
        {badge ? <b className="controlBadge">{badge}</b> : null}
        <Icon name="chevronDown" className="controlChevron"/>
      </button>
      {open && <div className="controlPopover" role={panelRole} aria-label={panelLabel}>{children}</div>}
    </div>
  );
}
