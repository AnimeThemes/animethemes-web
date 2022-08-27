import React from "react";
import Link from "next/link";
import { Text } from "components/text";
import { AlphabeticalIndex } from "components/index";
import type { SharedPageProps } from "utils/getSharedPageProps";
import getSharedPageProps from "utils/getSharedPageProps";
import type { GetStaticProps } from "next";
import { fetchData } from "lib/server";
import gql from "graphql-tag";
import type { AnimeIndexPageQuery } from "generated/graphql";

interface AnimeIndexPageProps extends SharedPageProps, AnimeIndexPageQuery {}

export default function AnimeIndexPage({ animeAll }: AnimeIndexPageProps) {
    return <>
        <Text variant="h1">Anime Index</Text>
        <AlphabeticalIndex items={animeAll}>
            {(anime) => (
                <Link
                    key={anime.slug}
                    href={`/anime/${anime.slug}`}
                    passHref
                    legacyBehavior>
                    <Text as="a" block link>{anime.name}</Text>
                </Link>
            )}
        </AlphabeticalIndex>
    </>;
}

export const getStaticProps: GetStaticProps<AnimeIndexPageProps> = async () => {
    const { data, apiRequests } = await fetchData<AnimeIndexPageQuery>(gql`
        query AnimeIndexPage {
            animeAll {
                slug
                name
            }
        }
    `);

    const props: AnimeIndexPageProps = {
        ...getSharedPageProps(apiRequests),
        animeAll: data.animeAll,
    };

    return {
        props,
        // Revalidate after 3 hours (= 10800 seconds).
        revalidate: 10800
    };
};
