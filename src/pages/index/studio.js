import React from "react";
import Link from "next/link";
import { fetchData } from "lib/server";
import { Box, Flex, Grid } from "components/box";
import { groupBy } from "lodash";
import { Text } from "components/text";
import { AlphabeticalIndex } from "components/index";

export default function StudioIndexPage({ studioAll }) {
    return (
        <Box gapsColumn="1.5rem">
            <Text variant="h1">Studio Index</Text>
            <AlphabeticalIndex items={studioAll}>
                {(studio) => (
                    <Link key={studio.slug} href={`/studio/${studio.slug}`} passHref>
                        <Text as="a" block link>{studio.name}</Text>
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
            studioAll {
                slug
                name
            }
        }
    `);

    return {
        props: {
            studioAll: data.studioAll
        },
        revalidate: 60 * 60
    };
}
