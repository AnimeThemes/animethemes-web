import { marked } from "marked";
import Prism from "prismjs";
import "prismjs/components/prism-powershell";
import "prismjs/components/prism-json";

export default function markdownToHtml(markdown) {
    const headings = [];

    const html = marked.parse(markdown, {
        highlight(code, lang) {
            if (lang) {
                return Prism.highlight(code, Prism.languages[lang], lang);
            }
            return code;
        },
        walkTokens(token) {
            if (token.type === "heading" && token.depth === 2) {
                headings.push({ text: token.text, level: token.depth });
            }
        }
    });

    return {
        html,
        headings
    };
}
