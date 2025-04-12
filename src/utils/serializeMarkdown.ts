import { serialize } from "next-mdx-remote/serialize";

import { isObject } from "lodash-es";
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
            remarkPlugins: [remarkGfm],
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

export async function serializeMarkdownSafe(markdown: Compatible) {
    try {
        return await serializeMarkdown(markdown);
    } catch (error) {
        if (!isObject(error) || !("message" in error) || typeof error.message !== "string") {
            throw error;
        }

        return await serializeMarkdown(`*Failed to parse Markdown!*\n\n\`\`\`\n${error.message}\n\`\`\``);
    }
}
