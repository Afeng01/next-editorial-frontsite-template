import Link from "next/link";

import type { ArticleEntry } from "@/lib/content/schemas";
import { formatDisplayDate } from "@/lib/utils/format";

type RecentStreamListProps = {
  articles: ArticleEntry[];
};

export function RecentStreamList({ articles }: RecentStreamListProps) {
  return (
    <section className="bg-stone-950 text-stone-100">
      <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="mb-4 text-[11px] uppercase tracking-[0.24em] text-stone-500">
              Stream
            </div>
            <h2 className="font-[family-name:var(--font-serif)] text-4xl leading-[1.1] text-white sm:text-5xl">
              Recent notes and
              <br />
              working thoughts
            </h2>
            <p className="mt-6 max-w-xs font-[family-name:var(--font-serif)] text-sm leading-relaxed text-stone-400">
              Ordered by date. Seed content now, real archive later.
            </p>
            <Link
              className="mt-8 inline-flex items-center gap-2 border-b border-stone-700 pb-1 text-[11px] uppercase tracking-[0.24em] text-stone-300 transition-colors hover:border-stone-300 hover:text-white"
              href="/articles"
            >
              View all
            </Link>
          </div>
          <ol className="space-y-px bg-stone-800/40 lg:col-span-8">
            {articles.map((article, index) => (
              <li key={article.slug} className="bg-stone-950">
                <Link
                  className="group block px-1 py-6 transition-[padding] duration-300 hover:px-3"
                  href={`/articles/${article.slug}`}
                >
                  <div className="grid grid-cols-12 items-baseline gap-4">
                    <div className="col-span-2 text-[11px] uppercase tracking-[0.18em] text-stone-500">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                    <div className="col-span-3 text-[11px] text-stone-500">
                      {formatDisplayDate(article.date)}
                    </div>
                    <div className="col-span-7">
                      <h3 className="font-[family-name:var(--font-serif)] text-xl leading-snug text-stone-100 transition-colors group-hover:text-white">
                        {article.title}
                      </h3>
                      <p className="mt-2 text-sm text-stone-500">{article.summary}</p>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
