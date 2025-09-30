"use client";
import { ReactNode } from "react";

export default function Info({ children }: { children: ReactNode }) {
  return (
    <span className="relative inline-flex items-center group">
      <span className="ml-2 inline-flex h-4 w-4 items-center justify-center rounded-full border border-white/20 text-[10px] leading-none opacity-70">?</span>
      <span className="pointer-events-none invisible group-hover:visible absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 text-xs p-2 rounded bg-black/80 border border-white/10 shadow-lg">
        {children}
      </span>
    </span>
  );
}
