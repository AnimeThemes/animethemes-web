import type { GetStaticPaths, GetStaticProps } from "next";

import type { ResultOf } from "@graphql-typed-document-node/core";
import type { ParsedUrlQuery } from "querystring";

import { Column } from "@/components/box/Flex";
import { AnimeSummaryCard } from "@/components/card/AnimeSummaryCard";
import { SEO } from "@/components/seo/SEO";
import { Text } from "@/components/text/Text";
import createApolloClient from "@/graphql/createApolloClient";
import { type FragmentType, getFragmentData, graphql } from "@/graphql/generated";
import type { AnimeSeason } from "@/graphql/generated/graphql";
import { seasonComparator, sortTransformed } from "@/utils/comparators";
import fetchStaticPaths from "@/utils/fetchStaticPaths";
import type { SharedPageProps } from "@/utils/getSharedPageProps";
import getSharedPageProps from "@/utils/getSharedPageProps";

const fragments = {
    year: graphql(`
        fragment SeasonDetailPageYear on AnimeYear {
            ...SeasonNavigationYear
            year
        }
    `),
    season: graphql(`
        fragment SeasonDetailPageSeason on AnimeYearSeason {
            ...SeasonNavigationSeason
            season
            seasonLocalized
            anime {
                data {
                    ...AnimeSummaryCardAnime
                    ...AnimeSummaryCardAnimeExpandable
                    slug
                    name
                }
            }
        }
    `),
};

const pathsQuery = graphql(`
    query SeasonDetailPageAll {
        animeyears {
            year
            seasons {
                season
            }
        }
    }
`);

const propsQuery = graphql(`
    query SeasonDetailPage($year: Int!, $season: AnimeSeason!) {
        animeyear: animeyears(year: [$year]) {
            ...SeasonDetailPageYear
            ...YearNavigationYear
            season(season: $season) {
                ...SeasonDetailPageSeason
            }
            seasons {
                season
                seasonLocalized
            }
        }
        animeyears {
            ...YearNavigationYears
            year
        }
    }
`);

export interface SeasonDetailPageProps extends SharedPageProps {
    year: FragmentType<typeof fragments.year>;
    season: FragmentType<typeof fragments.season>;
    years: ResultOf<typeof propsQuery>["animeyears"];
}

interface SeasonDetailPageParams extends ParsedUrlQuery {
    year: string;
    season: Lowercase<AnimeSeason>;
}

export default function SeasonDetailPage({ year: yearFragment, season: seasonFragment }: SeasonDetailPageProps) {
    const year = getFragmentData(fragments.year, yearFragment);
    const season = getFragmentData(fragments.season, seasonFragment);
    const animeList = season.anime.data.filter((anime) => anime.name).sort((a, b) => a.name.localeCompare(b.name));

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
            year: {
                ...data.animeyear[0],
                seasons: [...(data.animeyear[0].seasons ?? [])].sort(
                    sortTransformed(seasonComparator, (season) => season.season),
                ),
            },
            season: data.animeyear[0].season,
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
