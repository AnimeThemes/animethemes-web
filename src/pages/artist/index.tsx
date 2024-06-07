import React from "react";
import type { GetStaticProps } from "next";
import Link from "next/link";

import gql from "graphql-tag";

import { BackToTopButton } from "@/components/button/BackToTopButton";
import { AlphabeticalIndex } from "@/components/index/AlphabeticalIndex";
import { Text } from "@/components/text/Text";
import type { ArtistIndexPageQuery } from "@/generated/graphql";
import { fetchData } from "@/lib/server";
import type { SharedPageProps } from "@/utils/getSharedPageProps";
import getSharedPageProps from "@/utils/getSharedPageProps";

interface ArtistIndexPageProps extends SharedPageProps, ArtistIndexPageQuery {}

export default function ArtistIndexPage({ artistAll }: ArtistIndexPageProps) {
    return (
        <>
            <BackToTopButton />
            <Text variant="h1">Artist Index</Text>
            <AlphabeticalIndex items={artistAll}>
                {(artist) => (
                    <Link key={artist.slug} href={`/artist/${artist.slug}`} passHref legacyBehavior prefetch={false}>
                        <Text as="a" block link>
                            {artist.name}
                        </Text>
                    </Link>
                )}
            </AlphabeticalIndex>
        </>
    );
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
        revalidate: 10800,
    };
};
