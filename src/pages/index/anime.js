import React from "react";
import Link from "next/link";
import { fetchData } from "lib/server";
import { Box } from "components/box";
import { Text } from "components/text";
import { AlphabeticalIndex } from "components/index";

export default function AnimeIndexPage({ animeAll }) {
    return (
        <Box gapsColumn="1.5rem">
            <Text variant="h1">Anime Index</Text>
            <AlphabeticalIndex items={animeAll}>
                {(anime) => (
                    <Link key={anime.slug} href={`/anime/${anime.slug}`} passHref>
                        <Text as="a" block link>{anime.name}</Text>
                    </Link>
                )}
            </AlphabeticalIndex>
        </Box>
    );
}

export async function getStaticProps() {
    const { data } = await fetchData(`
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
            animeAll: data.animeAll
        },
        revalidate: 60 * 60
    };
}
