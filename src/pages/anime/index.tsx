import React from "react";
import type { GetStaticProps } from "next";
import Link from "next/link";

import gql from "graphql-tag";

import { BackToTopButton } from "@/components/button/BackToTopButton";
import { AlphabeticalIndex } from "@/components/index/AlphabeticalIndex";
import { Text } from "@/components/text/Text";
import type { AnimeIndexPageQuery } from "@/generated/graphql";
import { fetchData } from "@/lib/server";
import type { SharedPageProps } from "@/utils/getSharedPageProps";
import getSharedPageProps from "@/utils/getSharedPageProps";

interface AnimeIndexPageProps extends SharedPageProps, AnimeIndexPageQuery {}

export default function AnimeIndexPage({ animeAll }: AnimeIndexPageProps) {
    return <>
        <BackToTopButton/>
        <Text variant="h1">Anime Index</Text>
        <AlphabeticalIndex items={animeAll}>
            {(anime) => (
                <Link
                    key={anime.slug}
                    href={`/anime/${anime.slug}`}
                    passHref
                    legacyBehavior
                    prefetch={false}
                >
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
