import type { Metadata } from "next";

import { absoluteUrl, resolveTitle, siteConfig } from "@/lib/site-config";

type PageMetadataInput = {
  title?: string;
  description: string;
  path?: string;
  imagePath?: string;
  keywords?: string[];
  type?: "website" | "article";
  publishedTime?: string;
};

export function buildPageMetadata({
  title,
  description,
  path = "/",
  imagePath = siteConfig.ogImagePath,
  keywords,
  type = "website",
  publishedTime,
}: PageMetadataInput): Metadata {
  const canonicalUrl = absoluteUrl(path);
  const imageUrl = absoluteUrl(imagePath);

  return {
    title,
    description,
    keywords: keywords ? [...keywords] : undefined,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: resolveTitle(title),
      description,
      url: canonicalUrl,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title ? `${title} preview` : `${siteConfig.name} preview`,
        },
      ],
      ...(publishedTime ? { publishedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: resolveTitle(title),
      description,
      creator: siteConfig.social.xHandle,
      images: [imageUrl],
    },
  };
}
