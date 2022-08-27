import React from "react";
import Link from "next/link";
import { Text } from "components/text";
import { AlphabeticalIndex } from "components/index";
import type { SharedPageProps } from "utils/getSharedPageProps";
import getSharedPageProps from "utils/getSharedPageProps";
import type { GetStaticProps } from "next";
import { fetchData } from "lib/server";
import gql from "graphql-tag";
import type { SeriesIndexPageQuery } from "generated/graphql";

interface SeriesIndexPageProps extends SharedPageProps, SeriesIndexPageQuery {}

export default function SeriesIndexPage({ seriesAll }: SeriesIndexPageProps) {
    return <>
        <Text variant="h1">Series Index</Text>
        <AlphabeticalIndex items={seriesAll}>
            {(series) => (
                <Link
                    key={series.slug}
                    href={`/series/${series.slug}`}
                    passHref
                    legacyBehavior>
                    <Text as="a" block link>{series.name}</Text>
                </Link>
            )}
        </AlphabeticalIndex>
    </>;
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
        revalidate: 10800
    };
};
