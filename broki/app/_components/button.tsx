"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Icon, type IconName } from "./icon";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  icon?: IconName;
  size?: "default" | "compact";
  variant?: "secondary" | "primary";
  children: ReactNode;
};

export function Button({ icon, size = "default", variant = "secondary", children, className = "", type = "button", ...props }: ButtonProps) {
  return (
    <button type={type} className={`actionButton ${size === "compact" ? "actionButtonCompact" : ""} ${variant === "primary" ? "actionButtonPrimary" : ""} ${className}`.trim()} {...props}>
      {icon && <Icon name={icon} />}
      <span>{children}</span>
    </button>
  );
}
