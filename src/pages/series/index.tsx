import React from "react";
import type { GetStaticProps } from "next";
import Link from "next/link";

import gql from "graphql-tag";

import { BackToTopButton } from "@/components/button/BackToTopButton";
import { AlphabeticalIndex } from "@/components/index/AlphabeticalIndex";
import { Text } from "@/components/text/Text";
import type { SeriesIndexPageQuery } from "@/generated/graphql";
import { fetchData } from "@/lib/server";
import type { SharedPageProps } from "@/utils/getSharedPageProps";
import getSharedPageProps from "@/utils/getSharedPageProps";

interface SeriesIndexPageProps extends SharedPageProps, SeriesIndexPageQuery {}

export default function SeriesIndexPage({ seriesAll }: SeriesIndexPageProps) {
    return (
        <>
            <BackToTopButton />
            <Text variant="h1">Series Index</Text>
            <AlphabeticalIndex items={seriesAll}>
                {(series) => (
                    <Text key={series.slug} as={Link} href={`/series/${series.slug}`} prefetch={false} block link>
                        {series.name}
                    </Text>
                )}
            </AlphabeticalIndex>
        </>
    );
}

export const getStaticProps: GetStaticProps<SeriesIndexPageProps> = async () => {
    const { data, apiRequests } = await fetchData<SeriesIndexPageQuery>(gql`
        query SeriesIndexPage {
            seriesAll {
                slug
                name
            }
        }
    `);

    const props: SeriesIndexPageProps = {
        ...getSharedPageProps(apiRequests),
        seriesAll: data.seriesAll,
    };

    return {
        props,
        // Revalidate after 3 hours (= 10800 seconds).
        revalidate: 10800,
    };
};
