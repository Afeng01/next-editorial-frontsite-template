import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ServiceDetailTemplate } from "@/components/detail/ServiceDetailTemplate";
import { getAllServices, getServiceBySlug } from "@/lib/content/loaders";

type ServicePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  const services = await getAllServices();

  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);

  if (!service) {
    return {};
  }

  return {
    title: `${service.title} | Cherry Xiao`,
    description: service.summary,
  };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  return <ServiceDetailTemplate service={service} />;
}
