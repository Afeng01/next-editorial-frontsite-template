import type { Metadata } from "next";

import { CollectionPageHeader } from "@/components/list/CollectionPageHeader";
import { CollectionCardGrid } from "@/components/list/CollectionCardGrid";
import { getAllServices } from "@/lib/content/loaders";
import { selectOrderedServices } from "@/lib/content/selectors";

export const metadata: Metadata = {
  title: "Services | Cherry Xiao",
  description: "Placeholder service cards for the frontsite replica.",
};

export default async function ServicesPage() {
  const services = selectOrderedServices(await getAllServices());

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <CollectionPageHeader
        eyebrow="Services"
        summary="This route stays intentionally simple in phase 1 and exists to preserve the frontsite structure and detail-page flow."
        title="Services"
      />
      <div className="mt-12">
        <CollectionCardGrid entries={services} hrefBase="/services" />
      </div>
    </div>
  );
}
