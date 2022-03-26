import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypePrism from "@mapbox/rehype-prism";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";

export default function markdownToHtml(markdown) {
    const html = unified()
        .use(remarkParse)
        .use(remarkGfm)
        .use(remarkRehype)
        .use(rehypePrism)
        .use(rehypeSlug)
        .use(rehypeStringify)
        .processSync(markdown)
        .toString();

    const headings = getHeadings(markdown);

    return {
        html,
        headings
    };
}

function getHeadings(markdown) {
    return [...markdown.matchAll(/^(##) (.*)$/gm)].map(([, prefix, text]) => ({
        text: stripMarkdown(text),
        level: prefix.length
    }));
}

function stripMarkdown(markdown) {
    return markdown.replaceAll(/\[(.*?)]\(.*?\)/g, "$1");
}
