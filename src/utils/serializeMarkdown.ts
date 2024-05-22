import { serialize } from "next-mdx-remote/serialize";

import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import type { Compatible } from "vfile";

import type { Heading } from "@/utils/rehypeExtractHeadings";
import rehypeExtractHeadings from "@/utils/rehypeExtractHeadings";

export default async function serializeMarkdown(markdown: Compatible) {
    const headings: Heading[] = [];

    const source = await serialize(markdown, {
        mdxOptions: {
            remarkPlugins: [
                remarkGfm,
            ],
            rehypePlugins: [
                rehypeSlug,
                [rehypeExtractHeadings, { headings }],
                [rehypePrettyCode, { theme: "github-dark-dimmed" }],
            ],
        },
        parseFrontmatter: true,
    });

    return {
        source,
        headings,
    };
}