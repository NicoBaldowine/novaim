import type { ReactNode } from "react";
import { Icon, type IconName } from "./icon";

export type BadgeTone = "green" | "white" | "pink" | "outline" | "muted";

export function Badge({ children, tone = "green", icon }: { children: ReactNode; tone?: BadgeTone; icon?: IconName }) {
  return (
    <span className={`badge badge-${tone}`}>
      {icon && <Icon name={icon} size={15}/>}<span>{children}</span>
    </span>
  );
}
