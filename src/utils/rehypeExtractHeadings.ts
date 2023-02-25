import { hasProperty } from "hast-util-has-property";
import { headingRank } from "hast-util-heading-rank";
import { toString } from "hast-util-to-string";
import { visit } from "unist-util-visit";
import type { Root } from "hast";

export interface Heading {
    text: string
    depth: number
    slug: string
}

interface ExtractHeadingsConfig {
    minRank?: number;
    maxRank?: number;
    headings: Heading[];
}

export default function rehypeExtractHeadings({
    minRank = 2,
    maxRank = 3,
    headings,
}: ExtractHeadingsConfig) {
    return (tree: Root) => {
        visit(tree, "element" as const, (node) => {
            const rank = headingRank(node);
            if (
                rank &&
                rank >= minRank &&
                rank <= maxRank &&
                hasProperty(node, "id") &&
                node.properties?.id
            ) {
                headings.push({
                    text: toString(node),
                    slug: node.properties.id.toString(),
                    depth: rank,
                });
            }
        });
    };
}