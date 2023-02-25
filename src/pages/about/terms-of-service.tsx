import type { GetStaticProps } from "next";
import getSharedPageProps from "utils/getSharedPageProps";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import type { DocumentPageProps } from "pages/wiki/[...pageSlug]";
import serializeMarkdown from "utils/serializeMarkdown";

export { default } from "pages/wiki/[...pageSlug]/index";

export const getStaticProps: GetStaticProps<DocumentPageProps> = async () => {
    const markdown = readFileSync(join(process.cwd(), "src/res/markdown/terms.md"), "utf-8");

    return {
        props: {
            ...getSharedPageProps(),
            page: {
                name: "Terms of Service",
                ...await serializeMarkdown(markdown),
            }
        },
    };
};
