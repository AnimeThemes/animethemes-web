import { marked } from "marked";
import Prism from "prismjs";
import "prismjs/components/prism-powershell";
import "prismjs/components/prism-json";

export default function markdownToHtml(markdown) {
    const headings = [];

    const slugger = new marked.Slugger();

    const html = marked(markdown, {
        highlight(code, lang) {
            if (lang) {
                if (lang in Prism.languages) {
                    return Prism.highlight(code, Prism.languages[lang], lang);
                }
                return `[!] Unknown syntax highlighting language: ${lang}\n${code}`;
            }
            return code;
        },
        walkTokens(token) {
            if (token.type === "heading") {
                // To remove links and other markdown entities from the text we join only the text parts together.
                const text = joinTextDeep(token.tokens);
                // Slugger keeps track of seen slugs, so we have to generate a slug for every heading.
                // This way links will work in the table of contents later.
                const slug = slugger.slug(text);
                if (token.depth === 2 || token.depth === 3) {
                    headings.push({
                        text: text,
                        depth: token.depth,
                        slug
                    });
                }
            }
        }
    });

    return {
        html,
        headings
    };
}

function joinTextDeep(tokens) {
    return tokens.map((token) => token.tokens ? joinTextDeep(token.tokens) : token.text).join("");
}
