import React from "react";
import Link from "next/link";
import { fetchData } from "lib/server";
import { Box } from "components/box";
import { Text } from "components/text";
import { AlphabeticalIndex } from "components/index";

export default function ArtistIndexPage({ artistAll }) {
    return (
        <Box gapsColumn="1.5rem">
            <Text variant="h1">Artist Index</Text>
            <AlphabeticalIndex items={artistAll}>
                {(artist) => (
                    <Link key={artist.slug} href={`/artist/${artist.slug}`} passHref>
                        <Text as="a" block link>{artist.name}</Text>
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
            artistAll {
                slug
                name
            }
        }
    `);

    return {
        props: {
            artistAll: data.artistAll
        },
        revalidate: 60 * 60
    };
}
