const DEFAULT_SITE_URL = "https://example.com";

function normalizeSiteUrl(value?: string) {
  if (!value) {
    return null;
  }

  const input = value.trim();

  if (!input) {
    return null;
  }

  const withProtocol = /^https?:\/\//i.test(input) ? input : `https://${input}`;

  try {
    return new URL(withProtocol).origin;
  } catch {
    return null;
  }
}

function resolveSiteUrl() {
  return (
    normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL) ??
    normalizeSiteUrl(process.env.VERCEL_PROJECT_PRODUCTION_URL) ??
    normalizeSiteUrl(process.env.VERCEL_URL) ??
    DEFAULT_SITE_URL
  );
}

export const siteConfig = {
  name: "Paperframe",
  shortName: "Paperframe",
  description:
    "An editorial-style personal site template built with Next.js App Router, Tailwind CSS, and local MDX collections.",
  url: resolveSiteUrl(),
  lang: "en",
  locale: "en_US",
  themeColor: "#f5f5f4",
  keywords: [
    "Next.js template",
    "editorial website",
    "MDX blog",
    "portfolio template",
    "content site",
  ],
  author: {
    name: "Your Name",
    email: "hello@example.com",
  },
  social: {
    github: "https://github.com/your-handle",
    x: "https://x.com/your-handle",
    xHandle: "@yourhandle",
  },
  ogImagePath: "/opengraph-image",
  twitterImagePath: "/twitter-image",
} as const;

export function absoluteUrl(path = "/") {
  return new URL(path, siteConfig.url).toString();
}

export function resolveTitle(title?: string) {
  return title ? `${title} | ${siteConfig.name}` : siteConfig.name;
}
