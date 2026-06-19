import { siteContentSchema, type SiteContent } from "@/lib/content/schemas";

export const siteContent = siteContentSchema.parse({
  siteTitle: "Cherry Xiao",
  siteSubtitle: "Building, writing, and organizing ideas in public.",
  navigation: [
    { label: "Articles", href: "/articles" },
    { label: "Projects", href: "/projects" },
    { label: "Services", href: "/services" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/#contact" },
  ],
  footerLinks: [
    { label: "Home", href: "/" },
    { label: "Articles", href: "/articles" },
    { label: "Projects", href: "/projects" },
    { label: "Services", href: "/services" },
    { label: "About", href: "/about" },
  ],
  heroMeta: [
    { label: "Issue", value: "VOL.26.06" },
    { label: "Focus", value: "Frontsite Replica" },
    { label: "Updated", value: "06.19" },
  ],
  stats: [
    { label: "Articles", value: "06", note: "Placeholder archive" },
    { label: "Projects", value: "06", note: "Current build set" },
    { label: "Services", value: "03", note: "Phase 1 cards" },
    { label: "Days writing", value: "128", note: "Static placeholder" },
  ],
  quote: {
    label: "Quote of the month",
    value: "Build the shell first, then make the content worth keeping.",
    author: "Cherry Xiao",
  },
  contact: {
    title: "Start a conversation",
    summary:
      "This phase keeps the structure and typography close to the reference site while leaving all real content replaceable later.",
    links: [
      { label: "Email", value: "hello@example.com", href: "mailto:hello@example.com" },
      { label: "GitHub", value: "github.com/example", href: "https://github.com/example" },
      { label: "Notes", value: "Request the real content pass later", href: "/about" },
    ],
  },
}) satisfies SiteContent;
