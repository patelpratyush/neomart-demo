"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PageShellProps {
  children: ReactNode;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
  className?: string;
  noPadding?: boolean;
}

export function PageShell({
  children,
  maxWidth = "xl",
  className,
  noPadding = false,
}: PageShellProps) {
  const maxWidthClasses = {
    sm: "max-w-3xl",
    md: "max-w-4xl",
    lg: "max-w-5xl",
    xl: "max-w-7xl",
    "2xl": "max-w-screen-2xl",
    full: "max-w-full",
  };

  return (
    <div
      className={cn(
        "container mx-auto",
        maxWidthClasses[maxWidth],
        !noPadding && "px-4 py-6",
        className
      )}
    >
      {children}
    </div>
  );
}
