import Link from "next/link";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  href?: string;
  ctaLabel?: string;
};

export function SectionHeading({ eyebrow, title, href, ctaLabel }: SectionHeadingProps) {
  return (
    <div className="mb-12">
      <div className="mb-4 text-[11px] uppercase tracking-[0.24em] text-stone-500">
        {eyebrow}
      </div>
      <div className="flex items-end justify-between gap-6 border-b border-stone-300 pb-6">
        <h2 className="font-[family-name:var(--font-serif)] text-4xl font-semibold leading-none tracking-tight text-stone-950 sm:text-5xl">
          {title}
        </h2>
        {href && ctaLabel ? (
          <Link
            className="pb-1 text-[11px] uppercase tracking-[0.24em] text-stone-500 transition-colors hover:text-stone-950"
            href={href}
          >
            {ctaLabel}
          </Link>
        ) : null}
      </div>
    </div>
  );
}
