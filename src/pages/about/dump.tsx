import type { GetStaticProps } from "next";
import Link from "next/link";

import { faDownload } from "@fortawesome/free-solid-svg-icons";
import type { ResultOf } from "@graphql-typed-document-node/core";

import { Column } from "@/components/box/Flex";
import { IconTextButton } from "@/components/button/IconTextButton";
import { SummaryCard } from "@/components/card/SummaryCard";
import { SEO } from "@/components/seo/SEO";
import { Text } from "@/components/text/Text";
import createApolloClient from "@/graphql/createApolloClient";
import { graphql } from "@/graphql/generated";
import { sortTransformed } from "@/utils/comparators";
import type { SharedPageProps } from "@/utils/getSharedPageProps";
import getSharedPageProps from "@/utils/getSharedPageProps";
import type { Comparator } from "@/utils/types";

const propsQuery = graphql(`
    query DumpIndexPage {
        dumpPagination {
            data {
                path
                link
                createdAt
            }
        }
    }
`);

interface DumpIndexPageProps extends SharedPageProps, ResultOf<typeof propsQuery> {}

const sortByDateDesc: Comparator<Date> = (a, b) => b.getTime() - a.getTime();

export default function DumpIndexPage({ dumpPagination }: DumpIndexPageProps) {
    return (
        <>
            <SEO title="Database Dumps" description="Download dumps of the AnimeThemes.moe database." />
            <Text variant="h1">AnimeThemes.moe Database Dumps</Text>
            <Column style={{ "--gap": "16px" }}>
                <Text as="p">
                    Here you can find sanitized database dumps from AnimeThemes.moe intended for seeding local
                    environments.
                </Text>
                <Text as="p">These are two types of dumps:</Text>
                <ul>
                    <li>
                        <Text weight="bold">Wiki</Text> dumps contain information to anime, themes, videos, artists,
                        etc.
                    </li>
                    <li>
                        <Text weight="bold">Document</Text> dumps contain all the pages you also find in the{" "}
                        <Text as={Link} link href="/wiki">
                            Wiki
                        </Text>{" "}
                        section.
                    </li>
                </ul>
            </Column>
            <Text variant="h2">Available dumps</Text>
            {dumpPagination.data
                .sort(
                    sortTransformed(sortByDateDesc, (dump) => (dump.createdAt ? new Date(dump.createdAt) : new Date())),
                )
                .map((dump) => (
                    <SummaryCard
                        key={dump.path}
                        title={dump.path}
                        description={
                            dump.createdAt ? `Created at: ${new Date(dump.createdAt).toLocaleString("en")}` : undefined
                        }
                    >
                        <IconTextButton asChild variant="solid" icon={faDownload} collapsible>
                            <a href={dump.link} download>
                                Download
                            </a>
                        </IconTextButton>
                    </SummaryCard>
                ))}
        </>
    );
}

export const getStaticProps: GetStaticProps<DumpIndexPageProps> = async () => {
    const client = createApolloClient();

    const { data } = await client.query({
        query: propsQuery,
    });

    const props: DumpIndexPageProps = {
        ...getSharedPageProps(),
        ...data,
    };

    return {
        props,
        // Revalidate after 3 hours (= 10800 seconds).
        revalidate: 10800,
    };
};
