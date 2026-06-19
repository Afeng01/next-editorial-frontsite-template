import Link from "next/link";

import type { SiteContent } from "@/lib/content/schemas";

import { MobileMenu } from "@/components/layout/MobileMenu";

type SiteHeaderProps = {
  site: SiteContent;
};

export function SiteHeader({ site }: SiteHeaderProps) {
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-stone-200 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          className="z-50 font-[family-name:var(--font-serif)] text-lg font-semibold tracking-tight text-stone-950 transition-colors hover:text-stone-600"
          href="/"
        >
          {site.siteTitle}
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          {site.navigation.map((item) => (
            <Link
              key={item.href}
              className="border-b border-transparent pb-1 text-[11px] uppercase tracking-[0.18em] text-stone-500 transition-colors hover:border-stone-300 hover:text-stone-950"
              href={item.href}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <MobileMenu navigation={site.navigation} />
      </div>
    </header>
  );
}
