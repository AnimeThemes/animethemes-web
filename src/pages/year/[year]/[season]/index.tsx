import type { GetStaticPaths, GetStaticProps } from "next";

import type { ParsedUrlQuery } from "querystring";

import { Column } from "@/components/box/Flex";
import { AnimeSummaryCard } from "@/components/card/AnimeSummaryCard";
import {
    type SEASON_NAVIGATION_SEASON,
    type SEASON_NAVIGATION_YEAR,
    type SEASON_NAVIGATION_YEARS,
} from "@/components/navigation/SeasonNavigation";
import { SEO } from "@/components/seo/SEO";
import { Text } from "@/components/text/Text";
import createApolloClient from "@/graphql/createApolloClient";
import { type FragmentType, getFragmentData, graphql } from "@/graphql/generated";
import type { AnimeSeason } from "@/graphql/generated/graphql";
import { seasonComparator, sortTransformed } from "@/utils/comparators";
import fetchStaticPaths from "@/utils/fetchStaticPaths";
import type { SharedPageProps } from "@/utils/getSharedPageProps";
import getSharedPageProps from "@/utils/getSharedPageProps";

export const SEASON_DETAIL_PAGE_YEAR = graphql(`
    fragment SeasonDetailPageYear on AnimeYear {
        year
    }
`);

export const SEASON_DETAIL_PAGE_SEASON = graphql(`
    fragment SeasonDetailPageSeason on AnimeYearSeason {
        season
        seasonLocalized
        anime(pagination: { first: 100 }) {
            nodes {
                ...AnimeSummaryCardAnime
                ...AnimeSummaryCardAnimeExpandable
                slug
                title {
                    romaji
                }
            }
        }
    }
`);

const pathsQuery = graphql(`
    query SeasonDetailPageAll {
        animeyears {
            year
            seasons: season {
                season
            }
        }
    }
`);

const propsQuery = graphql(`
    query SeasonDetailPage($year: Int!, $season: AnimeSeason!) {
        animeyear: animeyears(year: [$year]) {
            ...SeasonDetailPageYear
            ...SeasonNavigationYear
            season(season: $season) {
                ...SeasonDetailPageSeason
                ...SeasonNavigationSeason
            }
            seasons: season {
                season
                seasonLocalized
            }
        }
        animeyears {
            ...SeasonNavigationYears
            year
        }
    }
`);

export interface SeasonDetailPageProps extends SharedPageProps {
    isYearOrSeasonPage: true;
    year: FragmentType<typeof SEASON_DETAIL_PAGE_YEAR> & FragmentType<typeof SEASON_NAVIGATION_YEAR>;
    season: FragmentType<typeof SEASON_DETAIL_PAGE_SEASON> & FragmentType<typeof SEASON_NAVIGATION_SEASON>;
    years: Array<FragmentType<typeof SEASON_NAVIGATION_YEARS>>;
}

interface SeasonDetailPageParams extends ParsedUrlQuery {
    year: string;
    season: Lowercase<AnimeSeason>;
}

export default function SeasonDetailPage({ year: yearFragment, season: seasonFragment }: SeasonDetailPageProps) {
    const year = getFragmentData(SEASON_DETAIL_PAGE_YEAR, yearFragment);
    const season = getFragmentData(SEASON_DETAIL_PAGE_SEASON, seasonFragment);
    const animeList = season.anime.nodes
        .filter((anime) => anime.title.romaji)
        .sort((a, b) => a.title.romaji.localeCompare(b.title.romaji));

    return (
        <>
            <SEO title={`${season.seasonLocalized} ${year.year}`} />
            <Text variant="h2">
                {`Anime from ${season.seasonLocalized} of ${year.year}`}
                <Text color="text-disabled"> ({animeList.length})</Text>
            </Text>
            <Column style={{ "--gap": "16px" }}>
                {animeList.map((anime) => (
                    <AnimeSummaryCard key={anime.slug} anime={anime} expandable={anime} />
                ))}
            </Column>
        </>
    );
}

export const getStaticProps: GetStaticProps<SeasonDetailPageProps, SeasonDetailPageParams> = async ({ params }) => {
    const client = createApolloClient();

    if (!params?.year || !params?.season) {
        return {
            notFound: true,
        };
    }

    const { data } = await client.query({
        query: propsQuery,
        variables: {
            year: +params.year,
            season: params.season.toUpperCase() as AnimeSeason,
        },
    });

    if (!data.animeyear[0] || !data.animeyear[0].season) {
        return {
            notFound: true,
        };
    }

    return {
        props: {
            ...getSharedPageProps(),
            isYearOrSeasonPage: true,
            year: {
                ...data.animeyear[0],
                seasons: [...(data.animeyear[0].seasons ?? [])].sort(
                    sortTransformed(seasonComparator, (season) => season.season),
                ),
            },
            season: data.animeyear[0].season[0],
            years: [...data.animeyears].sort((a, b) => a.year - b.year),
        },
        // Revalidate after 3 hours (= 10800 seconds).
        revalidate: 10800,
    };
};

export const getStaticPaths: GetStaticPaths<SeasonDetailPageParams> = async () => {
    const client = createApolloClient();

    return fetchStaticPaths(async () => {
        const { data } = await client.query({
            query: pathsQuery,
        });

        return data.animeyears.flatMap(
            (year) =>
                year.seasons?.map((season) => ({
                    params: {
                        year: String(year.year),
                        season: season.season.toLowerCase() as Lowercase<AnimeSeason>,
                    },
                })) ?? [],
        );
    });
};
