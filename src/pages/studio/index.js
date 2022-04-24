import React from "react";
import Link from "next/link";
import { fetchData } from "lib/server";
import { Text } from "components/text";
import { AlphabeticalIndex } from "components/index";
import getSharedPageProps from "utils/getSharedPageProps";

export default function StudioIndexPage({ studioAll }) {
    return (
        <>
            <Text variant="h1">Studio Index</Text>
            <AlphabeticalIndex items={studioAll}>
                {(studio) => (
                    <Link key={studio.slug} href={`/studio/${studio.slug}`} passHref prefetch={false}>
                        <Text as="a" block link>{studio.name}</Text>
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
            studioAll {
                slug
                name
            }
        }
    `);

    return {
        props: {
            ...getSharedPageProps(),
            studioAll: data.studioAll
        },
        // Revalidate after 3 hours (= 10800 seconds).
        revalidate: 10800
    };
}
