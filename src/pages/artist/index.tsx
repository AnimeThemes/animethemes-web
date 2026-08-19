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
    query ArtistIndexPage($pagination: PaginationInput) {
        artistConnection(sort: NAME_MAIN, pagination: $pagination) {
            nodes {
                slug
                name {
                    main
                }
            }
        }
    }
`);

interface ArtistIndexPageProps extends SharedPageProps, ResultOf<typeof propsQuery> {}

export default function ArtistIndexPage({ artistConnection }: ArtistIndexPageProps) {
    return (
        <>
            <BackToTopButton />
            <Text variant="h1">Artist Index</Text>
            <AlphabeticalIndex items={artistConnection.nodes} getName={artist => artist.name.main}>
                {(artist) => (
                    <Text key={artist.slug} as={Link} href={`/artist/${artist.slug}`} prefetch={false} block link>
                        {artist.name.main}
                    </Text>
                )}
            </AlphabeticalIndex>
        </>
    );
}

export const getStaticProps: GetStaticProps<ArtistIndexPageProps> = async () => {
    const client = createApolloClient();

    const { data } = await client.query({
        query: propsQuery,
        variables: {
            pagination: {
                first: Math.pow(2, 16) - 1,
            },
        },
    });

    const props: ArtistIndexPageProps = {
        ...getSharedPageProps(),
        ...data,
    };

    return {
        props,
        // Revalidate after 3 hours (= 10800 seconds).
        revalidate: 10800,
    };
};
