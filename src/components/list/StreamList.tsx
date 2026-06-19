import Link from "next/link";

import type { ArticleEntry } from "@/lib/content/schemas";
import { formatDisplayDate } from "@/lib/utils/format";

type StreamListProps = {
  articles: ArticleEntry[];
};

export function StreamList({ articles }: StreamListProps) {
  return (
    <ol className="space-y-px bg-stone-200">
      {articles.map((article, index) => (
        <li key={article.slug} className="bg-white">
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
                <h2 className="font-[family-name:var(--font-serif)] text-xl leading-snug text-stone-950 transition-colors group-hover:text-stone-600">
                  {article.title}
                </h2>
                <p className="mt-2 text-sm text-stone-500">{article.summary}</p>
              </div>
            </div>
          </Link>
        </li>
      ))}
    </ol>
  );
}
