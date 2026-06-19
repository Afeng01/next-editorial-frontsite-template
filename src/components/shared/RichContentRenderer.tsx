import { MDXRemote } from "next-mdx-remote/rsc";

import { mdxComponents } from "@/lib/content/mdx";

type RichContentRendererProps = {
  source: string;
};

export async function RichContentRenderer({ source }: RichContentRendererProps) {
  return (
    <div className="rich-copy">
      <MDXRemote source={source} components={mdxComponents} />
    </div>
  );
}
