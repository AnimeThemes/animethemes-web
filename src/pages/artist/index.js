import React from "react";
import Link from "next/link";
import { fetchData } from "lib/server";
import { Text } from "components/text";
import { AlphabeticalIndex } from "components/index";
import getSharedPageProps from "utils/getSharedPageProps";

export default function ArtistIndexPage({ artistAll }) {
    return (
        <>
            <Text variant="h1">Artist Index</Text>
            <AlphabeticalIndex items={artistAll}>
                {(artist) => (
                    <Link key={artist.slug} href={`/artist/${artist.slug}`} passHref prefetch={false}>
                        <Text as="a" block link>{artist.name}</Text>
                    </Link>
                )}
            </AlphabeticalIndex>
        </>
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
            ...getSharedPageProps(),
            artistAll: data.artistAll
        },
        // Revalidate after 3 hours (= 10800 seconds).
        revalidate: 10800
    };
}
