import type { Metadata } from "next";

import { CollectionPageHeader } from "@/components/list/CollectionPageHeader";
import { CollectionCardGrid } from "@/components/list/CollectionCardGrid";
import { getAllProjects } from "@/lib/content/loaders";
import { selectOrderedProjects } from "@/lib/content/selectors";

export const metadata: Metadata = {
  title: "Projects | Cherry Xiao",
  description: "Placeholder project grid for the frontsite replica.",
};

export default async function ProjectsPage() {
  const projects = selectOrderedProjects(await getAllProjects());

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <CollectionPageHeader
        eyebrow="Projects"
        summary="Projects are still placeholder content, but the cards, spacing, and hierarchy are wired for the real pass later."
        title="Projects"
      />
      <div className="mt-12">
        <CollectionCardGrid entries={projects} hrefBase="/projects" />
      </div>
    </div>
  );
}
