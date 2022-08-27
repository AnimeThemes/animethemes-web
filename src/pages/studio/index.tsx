import React from "react";
import Link from "next/link";
import { Text } from "components/text";
import { AlphabeticalIndex } from "components/index";
import type { SharedPageProps } from "utils/getSharedPageProps";
import getSharedPageProps from "utils/getSharedPageProps";
import type { GetStaticProps } from "next";
import { fetchData } from "lib/server";
import gql from "graphql-tag";
import type { StudioIndexPageQuery } from "generated/graphql";

interface StudioIndexPageProps extends SharedPageProps, StudioIndexPageQuery {}

export default function StudioIndexPage({ studioAll }: StudioIndexPageProps) {
    return <>
        <Text variant="h1">Studio Index</Text>
        <AlphabeticalIndex items={studioAll}>
            {(studio) => (
                <Link
                    key={studio.slug}
                    href={`/studio/${studio.slug}`}
                    passHref
                    legacyBehavior>
                    <Text as="a" block link>{studio.name}</Text>
                </Link>
            )}
        </AlphabeticalIndex>
    </>;
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
        revalidate: 10800
    };
};
