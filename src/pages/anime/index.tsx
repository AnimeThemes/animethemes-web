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
    query AnimeIndexPage($pagination: PaginationInput) {
        animeConnection(sort: TITLE_ROMAJI, pagination: $pagination) {
            nodes {
                slug
                title {
                    romaji
                }
            }
        }
    }
`);

interface AnimeIndexPageProps extends SharedPageProps, ResultOf<typeof propsQuery> {}

export default function AnimeIndexPage({ animeConnection }: AnimeIndexPageProps) {
    return (
        <>
            <BackToTopButton />
            <Text variant="h1">Anime Index</Text>
            <AlphabeticalIndex items={animeConnection.nodes} getName={anime => anime.title.romaji}>
                {(anime) => (
                    <Text key={anime.slug} as={Link} href={`/anime/${anime.slug}`} prefetch={false} block link>
                        {anime.title.romaji}
                    </Text>
                )}
            </AlphabeticalIndex>
        </>
    );
}

export const getStaticProps: GetStaticProps<AnimeIndexPageProps> = async () => {
    const client = createApolloClient();

    const { data } = await client.query({
        query: propsQuery,
        variables: {
            pagination: {
                first: Math.pow(2, 16) - 1,
            },
        },
    });

    const props: AnimeIndexPageProps = {
        ...getSharedPageProps(),
        ...data,
    };

    return {
        props,
        // Revalidate after 3 hours (= 10800 seconds).
        revalidate: 10800,
    };
};
