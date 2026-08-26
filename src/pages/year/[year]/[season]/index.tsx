import type { GetStaticPaths, GetStaticProps } from "next";

import type { ResultOf } from "@graphql-typed-document-node/core";
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
import { readCache, writeCache } from "@/utils/buildCache";
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

const pathsQuery = graphql(`
    query SeasonDetailPageAll {
        animeyears {
            year
            ...SeasonDetailPageYear
            ...SeasonNavigationYear
            ...SeasonNavigationYears
            seasons: season {
                season
                seasonLocalized
                ...SeasonDetailPageSeason
                ...SeasonNavigationSeason
            }
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

const buildCacheKey = "season";
const buildCacheMetaKey = "meta";
const buildCacheMetaYearsKey = "years";

export const getStaticProps: GetStaticProps<SeasonDetailPageProps, SeasonDetailPageParams> = async ({
    params,
    revalidateReason,
}) => {
    const client = createApolloClient();

    if (!params?.year || !params?.season) {
        return { notFound: true };
    }

    const buildCache =
        revalidateReason === "build"
            ? await readCache<Map<string, ResultOf<typeof propsQuery>["animeyear"][number]>>(buildCacheKey)
            : null;
    const buildCacheMeta =
        revalidateReason === "build"
            ? await readCache<Map<string, ResultOf<typeof propsQuery>["animeyears"]>>(buildCacheMetaKey)
            : null;

    const [year, years] = await (async () => {
        const cachedYear = buildCache?.get(`${params.year}-${params.season}`);
        const cachedYears = buildCacheMeta?.get(buildCacheMetaYearsKey);

        if (cachedYear && cachedYears) {
            return [cachedYear, cachedYears];
        }

        const { data } = await client.query({
            query: propsQuery,
            variables: {
                year: +params.year,
                season: params.season.toUpperCase() as AnimeSeason,
            },
        });

        return [data.animeyear[0], data.animeyears];
    })();

    if (!year || !year.season) {
        return { notFound: true };
    }

    return {
        props: {
            ...getSharedPageProps(),
            isYearOrSeasonPage: true,
            year: {
                ...year,
                seasons: [...(year.seasons ?? [])].sort(sortTransformed(seasonComparator, (season) => season.season)),
            },
            season: year.season[0],
            years: [...years].sort((a, b) => a.year - b.year),
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

        const buildCache: Map<string, ResultOf<typeof propsQuery>["animeyear"][number]> = new Map();
        for (const year of data.animeyears) {
            for (const season of year.seasons) {
                buildCache.set(`${year.year}-${season.season.toLowerCase()}`, { ...year, season: [season] });
            }
        }
        await writeCache(buildCacheKey, buildCache);

        const buildCacheMeta: Map<string, ResultOf<typeof propsQuery>["animeyears"]> = new Map();
        buildCacheMeta.set(buildCacheMetaYearsKey, data.animeyears);
        await writeCache(buildCacheMetaKey, buildCacheMeta);

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
