import React from "react";
import type { GetStaticProps } from "next";
import Link from "next/link";

import gql from "graphql-tag";

import { BackToTopButton } from "@/components/button/BackToTopButton";
import { AlphabeticalIndex } from "@/components/index/AlphabeticalIndex";
import { Text } from "@/components/text/Text";
import type { StudioIndexPageQuery } from "@/generated/graphql";
import { fetchData } from "@/lib/server";
import type { SharedPageProps } from "@/utils/getSharedPageProps";
import getSharedPageProps from "@/utils/getSharedPageProps";

interface StudioIndexPageProps extends SharedPageProps, StudioIndexPageQuery {}

export default function StudioIndexPage({ studioAll }: StudioIndexPageProps) {
    return (
        <>
            <BackToTopButton />
            <Text variant="h1">Studio Index</Text>
            <AlphabeticalIndex items={studioAll}>
                {(studio) => (
                    <Text key={studio.slug} as={Link} href={`/studio/${studio.slug}`} prefetch={false} block link>
                        {studio.name}
                    </Text>
                )}
            </AlphabeticalIndex>
        </>
    );
}

export const getStaticProps: GetStaticProps<StudioIndexPageProps> = async () => {
    const { data, apiRequests } = await fetchData<StudioIndexPageQuery>(gql`
        query StudioIndexPage {
            studioAll {
                slug
                name
            }
        }
    `);

    const props: StudioIndexPageProps = {
        ...getSharedPageProps(apiRequests),
        studioAll: data.studioAll,
    };

    return {
        props,
        // Revalidate after 3 hours (= 10800 seconds).
        revalidate: 10800,
    };
};
