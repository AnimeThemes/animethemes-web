import React from "react";
import type { GetStaticProps } from "next";
import Link from "next/link";

import type { ResultOf } from "@graphql-typed-document-node/core";

import { BackToTopButton } from "@/components/button/BackToTopButton";
import { AlphabeticalIndex } from "@/components/index/AlphabeticalIndex";
import { Text } from "@/components/text/Text";
import createApolloClient from "@/graphql/createApolloClient";
import { graphql } from "@/graphql/generated";
import type { SharedPageProps } from "@/utils/getSharedPageProps";
import getSharedPageProps from "@/utils/getSharedPageProps";

const propsQuery = graphql(`
    query SeriesIndexPage($first: Int!) {
        seriesPagination(sort: NAME, first: $first) {
            data {
                slug
                name
            }
        }
    }
`);

interface SeriesIndexPageProps extends SharedPageProps, ResultOf<typeof propsQuery> {}

export default function SeriesIndexPage({ seriesPagination }: SeriesIndexPageProps) {
    return (
        <>
            <BackToTopButton />
            <Text variant="h1">Series Index</Text>
            <AlphabeticalIndex items={seriesPagination.data}>
                {(series) => (
                    <Text key={series.slug} as={Link} href={`/series/${series.slug}`} prefetch={false} block link>
                        {series.name}
                    </Text>
                )}
            </AlphabeticalIndex>
        </>
    );
}

export const getStaticProps: GetStaticProps<SeriesIndexPageProps> = async () => {
    const client = createApolloClient();

    const { data } = await client.query({
        query: propsQuery,
        variables: {
            first: Math.pow(2, 16) - 1,
        },
    });

    const props: SeriesIndexPageProps = {
        ...getSharedPageProps(),
        ...data,
    };

    return {
        props,
        // Revalidate after 3 hours (= 10800 seconds).
        revalidate: 10800,
    };
};
