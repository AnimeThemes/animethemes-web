import React from "react";
import Link from "next/link";
import { Text } from "components/text";
import { AlphabeticalIndex } from "components/index";
import type { SharedPageProps } from "utils/getSharedPageProps";
import getSharedPageProps from "utils/getSharedPageProps";
import type { GetStaticProps } from "next";
import { fetchData } from "lib/server";
import gql from "graphql-tag";
import type { ArtistIndexPageQuery } from "generated/graphql";

interface ArtistIndexPageProps extends SharedPageProps, ArtistIndexPageQuery {}

export default function ArtistIndexPage({ artistAll }: ArtistIndexPageProps) {
    return <>
        <Text variant="h1">Artist Index</Text>
        <AlphabeticalIndex items={artistAll}>
            {(artist) => (
                <Link
                    key={artist.slug}
                    href={`/artist/${artist.slug}`}
                    passHref
                    legacyBehavior>
                    <Text as="a" block link>{artist.name}</Text>
                </Link>
            )}
        </AlphabeticalIndex>
    </>;
}

export const getStaticProps: GetStaticProps<ArtistIndexPageProps> = async () => {
    const { data, apiRequests } = await fetchData<ArtistIndexPageQuery>(gql`
        query ArtistIndexPage {
            artistAll {
                slug
                name
            }
        }
    `);

    const props: ArtistIndexPageProps = {
        ...getSharedPageProps(apiRequests),
        artistAll: data.artistAll,
    };

    return {
        props,
        // Revalidate after 3 hours (= 10800 seconds).
        revalidate: 10800
    };
};
