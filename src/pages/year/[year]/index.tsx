import type { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";

import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import type { ResultOf } from "@graphql-typed-document-node/core";
import type { ParsedUrlQuery } from "querystring";

import { Column, Row } from "@/components/box/Flex";
import { Button } from "@/components/button/Button";
import { AnimeSummaryCard } from "@/components/card/AnimeSummaryCard";
import { Icon } from "@/components/icon/Icon";
import { SEO } from "@/components/seo/SEO";
import { Text } from "@/components/text/Text";
import createApolloClient from "@/graphql/createApolloClient";
import { type FragmentType, getFragmentData, graphql } from "@/graphql/generated";
import { seasonComparator, sortTransformed } from "@/utils/comparators";
import fetchStaticPaths from "@/utils/fetchStaticPaths";
import type { SharedPageProps } from "@/utils/getSharedPageProps";
import getSharedPageProps from "@/utils/getSharedPageProps";

const pathsQuery = graphql(`
    query YearDetailPageAll {
        animeyears {
            year
        }
    }
`);

const propsQuery = graphql(`
    query YearDetailPage($year: Int!) {
        animeyear: animeyears(year: [$year]) {
            ...SeasonDetailPageYear
            ...YearNavigationYear
            year
            seasons {
                season
                seasonLocalized
                anime(sort: NAME, first: 3) {
                    data {
                        ...SeasonPreviewAnime
                    }
                }
            }
        }
        animeyears {
            ...YearNavigationYears
            year
        }
    }
`);

export interface YearDetailPageProps extends SharedPageProps {
    year: ResultOf<typeof propsQuery>["animeyear"][number];
    years: ResultOf<typeof propsQuery>["animeyears"];
}

interface YearDetailPageParams extends ParsedUrlQuery {
    year: string;
}

export default function YearDetailPage({ year }: YearDetailPageProps) {
    return (
        <>
            <SEO title={String(year.year)} />
            {year.seasons?.map((season) => (
                <SeasonPreview key={season.season} season={season.season} year={year.year} animes={season.anime.data} />
            ))}
        </>
    );
}

const fragments = {
    anime: graphql(`
        fragment SeasonPreviewAnime on Anime {
            ...AnimeSummaryCardAnime
            ...AnimeSummaryCardAnimeExpandable
            slug
        }
    `),
};

interface SeasonPreviewProps {
    season: string;
    year: number;
    animes: Array<FragmentType<typeof fragments.anime>>;
}

function SeasonPreview({ season, year, animes: animesFragment }: SeasonPreviewProps) {
    const animes = getFragmentData(fragments.anime, animesFragment);

    return (
        <>
            <Text variant="h2">{season}</Text>
            <Column style={{ "--gap": "16px" }}>
                {animes.map((anime) => (
                    <AnimeSummaryCard key={anime.slug} anime={anime} expandable={anime} />
                ))}
            </Column>
            <Row style={{ "--justify-content": "center" }}>
                <Button asChild variant="silent" isCircle>
                    <Link href={`/year/${year}/${season.toLowerCase()}`}>
                        <Icon icon={faChevronDown} />
                    </Link>
                </Button>
            </Row>
        </>
    );
}

export const getStaticProps: GetStaticProps<YearDetailPageProps, YearDetailPageParams> = async ({ params }) => {
    const client = createApolloClient();

    if (!params?.year) {
        return {
            notFound: true,
        };
    }

    const { data } = await client.query({
        query: propsQuery,
        variables: {
            year: +params.year,
        },
    });

    if (!data.animeyear[0]) {
        return {
            notFound: true,
        };
    }

    return {
        props: {
            ...getSharedPageProps(),
            year: {
                ...data.animeyear[0],
                seasons: [...(data.animeyear[0].seasons ?? [])].sort(
                    sortTransformed(seasonComparator, (season) => season.season),
                ),
            },
            years: [...data.animeyears].sort((a, b) => a.year - b.year),
        },
        // Revalidate after 3 hours (= 10800 seconds).
        revalidate: 10800,
    };
};

export const getStaticPaths: GetStaticPaths<YearDetailPageParams> = () => {
    const client = createApolloClient();

    return fetchStaticPaths(async () => {
        const { data } = await client.query({
            query: pathsQuery,
        });

        return data.animeyears.map((year) => ({
            params: {
                year: String(year.year),
            },
        }));
    });
};
