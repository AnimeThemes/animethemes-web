import { serialize } from "next-mdx-remote/serialize";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import type { Heading } from "utils/rehypeExtractHeadings";
import rehypeExtractHeadings from "utils/rehypeExtractHeadings";
import type { Compatible } from "vfile";
import rehypePrettyCode from "rehype-pretty-code";

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
    });

    return {
        source,
        headings,
    };
}