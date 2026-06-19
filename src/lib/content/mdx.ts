import { createElement } from "react";
import type { MDXComponents } from "mdx/types";

export const mdxComponents: MDXComponents = {
  h1: ({ children }) =>
    createElement(
      "h1",
      {
        className:
          "font-[family-name:var(--font-serif)] text-4xl font-semibold leading-tight tracking-tight text-stone-950 sm:text-5xl",
      },
      children,
    ),
  h2: ({ children }) =>
    createElement(
      "h2",
      {
        className:
          "mt-12 font-[family-name:var(--font-serif)] text-3xl font-semibold leading-tight tracking-tight text-stone-950 sm:text-4xl",
      },
      children,
    ),
  h3: ({ children }) =>
    createElement(
      "h3",
      {
        className:
          "mt-10 font-[family-name:var(--font-serif)] text-2xl font-semibold leading-snug text-stone-950",
      },
      children,
    ),
  p: ({ children }) =>
    createElement(
      "p",
      {
        className: "mt-5 text-lg leading-8 text-stone-700",
      },
      children,
    ),
  ul: ({ children }) =>
    createElement(
      "ul",
      {
        className: "mt-5 space-y-3 pl-5 text-lg text-stone-700",
      },
      children,
    ),
  li: ({ children }) =>
    createElement(
      "li",
      {
        className: "list-disc leading-8",
      },
      children,
    ),
  a: ({ children, href }) =>
    createElement(
      "a",
      {
        className:
          "border-b border-stone-300 transition-colors hover:border-stone-950 hover:text-stone-950",
        href,
      },
      children,
    ),
  blockquote: ({ children }) =>
    createElement(
      "blockquote",
      {
        className:
          "mt-8 border-l border-stone-300 pl-6 font-[family-name:var(--font-serif)] text-2xl leading-10 text-stone-900",
      },
      children,
    ),
  hr: () =>
    createElement("hr", {
      className: "mt-10 border-stone-200",
    }),
};
