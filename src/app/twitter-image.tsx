import { ImageResponse } from "next/og";

import { ShareImage } from "@/lib/metadata-images";
import { siteConfig } from "@/lib/site-config";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function TwitterImage() {
  return new ImageResponse(
    (
      <ShareImage
        description="A clean editorial frontsite starter with articles, projects, services, and local MDX collections."
        eyebrow="Template preview"
        title={siteConfig.name}
      />
    ),
    size,
  );
}
