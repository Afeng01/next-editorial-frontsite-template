import { ImageResponse } from "next/og";

import { ShareImage } from "@/lib/metadata-images";
import { siteConfig } from "@/lib/site-config";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <ShareImage
        description={siteConfig.description}
        eyebrow="Next.js + MDX template"
        title={siteConfig.name}
      />
    ),
    size,
  );
}
