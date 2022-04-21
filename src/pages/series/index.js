import React from "react";
import Link from "next/link";
import { fetchData } from "lib/server";
import { Text } from "components/text";
import { AlphabeticalIndex } from "components/index";

export default function SeriesIndexPage({ seriesAll }) {
    return (
        <>
            <Text variant="h1">Series Index</Text>
            <AlphabeticalIndex items={seriesAll}>
                {(series) => (
                    <Link key={series.slug} href={`/series/${series.slug}`} passHref prefetch={false}>
                        <Text as="a" block link>{series.name}</Text>
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
            seriesAll {
                slug
                name
            }
        }
    `);

    return {
        props: {
            seriesAll: data.seriesAll
        },
        revalidate: 60 * 60
    };
}
