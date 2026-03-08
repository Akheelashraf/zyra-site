"use client";

import { cn } from "@/lib/utils";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  /** "default" = 1440px, "sm" = 1280px */
  size?: "default" | "sm";
}

/** Centers content and constrains max width (1280px or 1440px). */
export function Container({ children, className, size = "default" }: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-4 sm:px-6 lg:px-8",
        size === "sm" ? "max-w-container-sm" : "max-w-container",
        className
      )}
    >
      {children}
    </div>
  );
}
