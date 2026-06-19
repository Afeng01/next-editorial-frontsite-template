import Link from "next/link";

import type { ProjectEntry } from "@/lib/content/schemas";
import { CardImage } from "@/components/shared/CardImage";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { formatDisplayDate } from "@/lib/utils/format";

type ProjectGridProps = {
  projects: ProjectEntry[];
};

export function ProjectGrid({ projects }: ProjectGridProps) {
  return (
    <section className="border-t border-stone-200 bg-white" id="projects">
      <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Projects" href="/projects" ctaLabel="View all" title="What is being built" />
        <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <Link key={project.slug} className="group block" href={`/projects/${project.slug}`}>
              <CardImage alt={project.title} src={project.coverImage} />
              <div className="mt-5 text-[11px] uppercase tracking-[0.18em] text-stone-500">
                {formatDisplayDate(project.date)}
              </div>
              <h3 className="mt-3 font-[family-name:var(--font-serif)] text-lg font-semibold leading-snug tracking-tight text-stone-950 transition-colors group-hover:text-stone-600">
                {project.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-stone-600">{project.summary}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
