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
    query StudioIndexPage($first: Int!) {
        studioPagination(sort: NAME, first: $first) {
            data {
                slug
                name
            }
        }
    }
`);

interface StudioIndexPageProps extends SharedPageProps, ResultOf<typeof propsQuery> {}

export default function StudioIndexPage({ studioPagination }: StudioIndexPageProps) {
    return (
        <>
            <BackToTopButton />
            <Text variant="h1">Studio Index</Text>
            <AlphabeticalIndex items={studioPagination.data}>
                {(studio) => (
                    <Text key={studio.slug} as={Link} href={`/studio/${studio.slug}`} prefetch={false} block link>
                        {studio.name}
                    </Text>
                )}
            </AlphabeticalIndex>
        </>
    );
}

export const getStaticProps: GetStaticProps<StudioIndexPageProps> = async () => {
    const client = createApolloClient();

    const { data } = await client.query({
        query: propsQuery,
        variables: {
            first: Math.pow(2, 16) - 1,
        },
    });

    const props: StudioIndexPageProps = {
        ...getSharedPageProps(),
        ...data,
    };

    return {
        props,
        // Revalidate after 3 hours (= 10800 seconds).
        revalidate: 10800,
    };
};
