import { fetchData } from "lib/server";
import { SEO } from "components/seo";
import { Text } from "components/text";
import type { SharedPageProps } from "utils/getSharedPageProps";
import getSharedPageProps from "utils/getSharedPageProps";
import type { GetStaticProps } from "next";
import gql from "graphql-tag";
import type { DocumentIndexPageQuery } from "generated/graphql";
import { TextLink } from "components/text/TextLink";
import { AlphabeticalIndex } from "components/index";

interface DocumentIndexPageProps extends SharedPageProps, DocumentIndexPageQuery {}

export default function DocumentIndexPage({ pageAll }: DocumentIndexPageProps) {
    return <>
        <SEO title="Wiki"/>
        <Text variant="h1">Wiki</Text>
        <AlphabeticalIndex items={pageAll}>
            {(page) => (
                <TextLink key={page.slug} href={`/wiki/${page.slug}`}>
                    {page.name}
                </TextLink>
            )}
        </AlphabeticalIndex>
    </>;
}

export const getStaticProps: GetStaticProps<DocumentIndexPageProps> = async () => {
    const { data, apiRequests } = await fetchData<DocumentIndexPageQuery>(gql`
        query DocumentIndexPage {
            pageAll {
                slug
                name
            }
        }
    `);

    return {
        props: {
            ...getSharedPageProps(apiRequests),
            pageAll: data.pageAll
        },
        // Revalidate after 3 hours (= 10800 seconds).
        revalidate: 10800
    };
};
