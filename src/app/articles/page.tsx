import type { Metadata } from "next";

import { CollectionPageHeader } from "@/components/list/CollectionPageHeader";
import { StreamList } from "@/components/list/StreamList";
import { getAllArticles } from "@/lib/content/loaders";
import { selectArticleList } from "@/lib/content/selectors";

export const metadata: Metadata = {
  title: "Articles | Cherry Xiao",
  description: "Placeholder writing archive for the frontsite replica.",
};

export default async function ArticlesPage() {
  const articles = selectArticleList(await getAllArticles());

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <CollectionPageHeader
        eyebrow="Archive"
        summary="A placeholder article stream that keeps the layout and density close to the public reference site."
        title="Articles"
      />
      <div className="mt-12">
        <StreamList articles={articles} />
      </div>
    </div>
  );
}
