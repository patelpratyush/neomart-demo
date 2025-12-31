"use client";

import { ReactNode } from "react";

interface AisleShelfRowProps {
  children: ReactNode;
  label?: string;
}

/**
 * Horizontal scrolling shelf row with scroll-snap
 * Creates the "walking down the aisle, looking along shelves" feeling
 */
export function AisleShelfRow({ children, label }: AisleShelfRowProps) {
  return (
    <div className="relative mb-12">
      {/* Shelf Label */}
      {label && (
        <div className="mb-4 flex items-center gap-3">
          <div className="h-px flex-1 bg-neutral-300" />
          <span className="text-sm font-medium text-neutral-600">{label}</span>
          <div className="h-px flex-1 bg-neutral-300" />
        </div>
      )}

      {/* Horizontal Scroll Container */}
      <div
        className="overflow-x-auto pb-4 -mx-4 px-4"
        style={{
          scrollSnapType: "x mandatory",
          scrollPaddingLeft: "1rem",
        }}
      >
        <div className="flex gap-4 min-w-max">
          {children}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 h-24 w-12 bg-gradient-to-l from-white to-transparent pointer-events-none" />
    </div>
  );
}
