import type { SiteContent } from "@/lib/content/schemas";

type QuoteSectionProps = {
  quote: SiteContent["quote"];
};

export function QuoteSection({ quote }: QuoteSectionProps) {
  return (
    <section className="border-t border-stone-200 bg-white">
      <div className="mx-auto max-w-4xl px-4 py-32 sm:px-6 lg:px-8">
        <div className="mb-12 flex items-center gap-4 text-[11px] uppercase tracking-[0.24em] text-stone-500">
          <span>{quote.label}</span>
          <span className="h-px flex-1 bg-stone-300" />
        </div>
        <blockquote className="font-[family-name:var(--font-serif)] text-3xl leading-[1.3] tracking-tight text-stone-950 sm:text-4xl lg:text-5xl">
          <span className="mr-2 text-stone-300">&ldquo;</span>
          {quote.value}
          <span className="ml-2 text-stone-300">&rdquo;</span>
        </blockquote>
        <div className="mt-12 text-[11px] uppercase tracking-[0.24em] text-stone-500">
          {quote.author}
        </div>
      </div>
    </section>
  );
}
