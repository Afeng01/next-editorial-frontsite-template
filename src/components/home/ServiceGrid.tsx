import Link from "next/link";

import type { ServiceEntry } from "@/lib/content/schemas";
import { CardImage } from "@/components/shared/CardImage";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { formatDisplayDate } from "@/lib/utils/format";

type ServiceGridProps = {
  services: ServiceEntry[];
};

export function ServiceGrid({ services }: ServiceGridProps) {
  return (
    <section className="border-t border-stone-200 bg-white" id="services">
      <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Services" href="/services" ctaLabel="View all" title="Ways to work together" />
        <div className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2">
          {services.map((service) => (
            <Link key={service.slug} className="group block" href={`/services/${service.slug}`}>
              <CardImage alt={service.title} src={service.coverImage} />
              <div className="mt-5 text-[11px] uppercase tracking-[0.18em] text-stone-500">
                {service.date ? formatDisplayDate(service.date) : service.category}
              </div>
              <h3 className="mt-3 font-[family-name:var(--font-serif)] text-xl font-semibold leading-snug tracking-tight text-stone-950 transition-colors group-hover:text-stone-600">
                {service.title}
              </h3>
              <p className="mt-2 text-base leading-relaxed text-stone-600">{service.summary}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
