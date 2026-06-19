"use client";

import Link from "next/link";
import { useState } from "react";

type MobileMenuProps = {
  navigation: Array<{
    label: string;
    href: string;
  }>;
};

export function MobileMenu({ navigation }: MobileMenuProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        aria-label="Open menu"
        className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
        onClick={() => setOpen((value) => !value)}
        type="button"
      >
        <span className={`h-0.5 w-6 bg-stone-950 transition-all ${open ? "translate-y-2 rotate-45" : ""}`} />
        <span className={`h-0.5 w-6 bg-stone-950 transition-all ${open ? "opacity-0" : ""}`} />
        <span className={`h-0.5 w-6 bg-stone-950 transition-all ${open ? "-translate-y-2 -rotate-45" : ""}`} />
      </button>
      <div
        className={`fixed inset-0 z-30 bg-stone-950 transition-all duration-300 md:hidden ${open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`}
      >
        <div className="flex h-full flex-col px-6 pb-12 pt-24">
          <div className="mb-10 text-[11px] uppercase tracking-[0.24em] text-stone-500">
            Menu
          </div>
          <ul className="flex-1 space-y-6">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link
                  className="group flex items-baseline justify-between border-b border-stone-800 pb-4 transition-colors hover:border-stone-500"
                  href={item.href}
                  onClick={() => setOpen(false)}
                >
                  <span className="font-[family-name:var(--font-serif)] text-3xl text-stone-200 transition-colors group-hover:text-white">
                    {item.label}
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.24em] text-stone-500">
                    Open
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
