import React from "react";
import Link from "next/link";
import { fetchData } from "lib/server";
import { Text } from "components/text";
import { AlphabeticalIndex } from "components/index";
import getSharedPageProps from "utils/getSharedPageProps";

export default function AnimeIndexPage({ animeAll }) {
    return (
        <>
            <Text variant="h1">Anime Index</Text>
            <AlphabeticalIndex items={animeAll}>
                {(anime) => (
                    <Link key={anime.slug} href={`/anime/${anime.slug}`} passHref prefetch={false}>
                        <Text as="a" block link>{anime.name}</Text>
                    </Link>
                )}
            </AlphabeticalIndex>
        </>
    );
}

export async function getStaticProps() {
    const { data, apiRequests } = await fetchData(`
        #graphql

        query {
            animeAll {
                slug
                name
            }
        }
    `);

    return {
        props: {
            ...getSharedPageProps(apiRequests),
            animeAll: data.animeAll
        },
        // Revalidate after 3 hours (= 10800 seconds).
        revalidate: 10800
    };
}
