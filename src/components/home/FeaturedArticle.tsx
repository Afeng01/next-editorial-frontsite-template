import Link from "next/link";

import type { ArticleEntry } from "@/lib/content/schemas";
import { formatDisplayDate } from "@/lib/utils/format";
import { CardImage } from "@/components/shared/CardImage";

type FeaturedArticleProps = {
  article: ArticleEntry;
};

export function FeaturedArticle({ article }: FeaturedArticleProps) {
  return (
    <section className="border-t border-stone-200 bg-white">
      <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mb-10 text-[11px] uppercase tracking-[0.24em] text-stone-500">
          Featured
        </div>
        <Link className="group block" href={`/articles/${article.slug}`}>
          <div className="grid items-start gap-10 lg:grid-cols-12">
            <div className="order-2 lg:order-1 lg:col-span-7">
              <h2 className="font-[family-name:var(--font-serif)] text-4xl font-semibold leading-tight tracking-tight text-stone-950 transition-colors group-hover:text-stone-700 sm:text-5xl">
                {article.title}
              </h2>
              <p className="mt-6 font-[family-name:var(--font-serif)] text-lg leading-relaxed text-stone-600">
                {article.summary}
              </p>
              <div className="mt-8 flex items-center gap-4 text-[11px] uppercase tracking-[0.18em] text-stone-500">
                <span className="text-sm text-stone-500">
                  {formatDisplayDate(article.date)}
                </span>
                <span className="h-px flex-1 bg-stone-300" />
                <span className="transition-colors group-hover:text-stone-950">Read</span>
              </div>
            </div>
            <div className="order-1 lg:order-2 lg:col-span-5">
              <CardImage alt={article.title} ratio="feature" src={article.coverImage} />
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
}
