import { memo, useMemo, useState } from "react";
import styled from "styled-components";
import type { GetStaticPaths, GetStaticProps } from "next";

import type { ResultOf } from "@graphql-typed-document-node/core";
import type { ParsedUrlQuery } from "querystring";

import { Column, Row } from "@/components/box/Flex";
import { FilterToggleButton } from "@/components/button/FilterToggleButton";
import { AnimeSummaryCard } from "@/components/card/AnimeSummaryCard";
import { SidebarContainer } from "@/components/container/SidebarContainer";
import { MultiCoverImage } from "@/components/image/MultiCoverImage";
import { SearchFilterGroup } from "@/components/search-filter/SearchFilterGroup";
import { SearchFilterSortBy } from "@/components/search-filter/SearchFilterSortBy";
import { SEO } from "@/components/seo/SEO";
import { Text } from "@/components/text/Text";
import { Collapse } from "@/components/utils/Collapse";
import createApolloClient from "@/graphql/createApolloClient";
import { type FragmentType, getFragmentData, graphql } from "@/graphql/generated";
import useToggle from "@/hooks/useToggle";
import theme from "@/theme";
import { readCache, writeCache } from "@/utils/buildCache";
import collect from "@/utils/collect";
import { ANIME_A_Z, ANIME_NEW_OLD, ANIME_OLD_NEW, ANIME_Z_A, getComparator } from "@/utils/comparators";
import { PAGINATION_PAGE_SIZE } from "@/utils/config";
import fetchStaticPaths from "@/utils/fetchStaticPaths";
import getSharedPageProps from "@/utils/getSharedPageProps";

const StyledDesktopOnly = styled.div`
    gap: 24px;

    @media (max-width: ${theme.breakpoints.mobileMax}) {
        display: none;
    }
`;

export const SERIES_DETAIL_PAGE_SERIES = graphql(`
    fragment SeriesDetailPageSeries on Series {
        slug
        title {
            romaji
        }
        anime {
            nodes {
                ...AnimeSummaryCardAnime
                ...AnimeSummaryCardAnimeExpandable
                title {
                    romaji
                }
                slug
                year
                season
                animethemes {
                    type
                    sequence
                    animethemeentries {
                        version
                        videos {
                            nodes {
                                tags
                            }
                        }
                    }
                }
                images {
                    nodes {
                        ...extractImagesImage
                    }
                }
            }
        }
    }
`);

const propsQuery = graphql(`
    query SeriesDetailPage($seriesSlug: String!) {
        series(slug: $seriesSlug) {
            ...SeriesDetailPageSeries
        }
    }
`);

const pathsQuery = graphql(`
    query SeriesDetailPageAll($pagination: PaginationInput) {
        seriesConnection(pagination: $pagination) {
            nodes {
                ...SeriesDetailPageSeries
                slug
            }
            pageInfo {
                hasNextPage
                endCursor
            }
        }
    }
`);

interface SeriesDetailPageProps {
    series: FragmentType<typeof SERIES_DETAIL_PAGE_SERIES>;
}

interface SeriesDetailPageParams extends ParsedUrlQuery {
    seriesSlug: string;
}

export default function SeriesDetailPage({ series: seriesFragment }: SeriesDetailPageProps) {
    const series = getFragmentData(SERIES_DETAIL_PAGE_SERIES, seriesFragment);
    const anime = series.anime.nodes;

    const [showFilter, toggleShowFilter] = useToggle();
    const [sortBy, setSortBy] = useState<
        typeof ANIME_OLD_NEW | typeof ANIME_NEW_OLD | typeof ANIME_A_Z | typeof ANIME_Z_A
    >(ANIME_OLD_NEW);

    const animeSorted = useMemo(() => [...anime].sort(getComparator(sortBy)), [anime, sortBy]);

    return (
        <>
            <SEO title={series.title.romaji} />
            <Text variant="h1">{series.title.romaji}</Text>
            <SidebarContainer>
                <StyledDesktopOnly>
                    <MultiCoverImage
                        items={anime.map((anime) => ({ images: anime.images.nodes, name: anime.title.romaji }))}
                    />
                </StyledDesktopOnly>
                <Column style={{ "--gap": "24px" }}>
                    <Row style={{ "--justify-content": "space-between", "--align-items": "center" }}>
                        <Text variant="h2">
                            Anime
                            <Text color="text-disabled"> ({anime.length})</Text>
                        </Text>
                        <FilterToggleButton onClick={toggleShowFilter} />
                    </Row>
                    <Collapse collapse={!showFilter}>
                        <SearchFilterGroup>
                            <SearchFilterSortBy value={sortBy} setValue={setSortBy}>
                                <SearchFilterSortBy.Option value={ANIME_OLD_NEW}>Old ➜ New</SearchFilterSortBy.Option>
                                <SearchFilterSortBy.Option value={ANIME_NEW_OLD}>New ➜ Old</SearchFilterSortBy.Option>
                                <SearchFilterSortBy.Option value={ANIME_A_Z}>A ➜ Z</SearchFilterSortBy.Option>
                                <SearchFilterSortBy.Option value={ANIME_Z_A}>Z ➜ A</SearchFilterSortBy.Option>
                            </SearchFilterSortBy>
                        </SearchFilterGroup>
                    </Collapse>
                    <Column style={{ "--gap": "16px" }}>
                        <SeriesAnime anime={animeSorted} />
                    </Column>
                </Column>
            </SidebarContainer>
        </>
    );
}

interface SeriesAnimeProps {
    anime: ResultOf<typeof SERIES_DETAIL_PAGE_SERIES>["anime"]["nodes"];
}

const SeriesAnime = memo(function SeriesAnime({ anime }: SeriesAnimeProps) {
    const animeCards = anime.map((anime) => <AnimeSummaryCard key={anime.slug} anime={anime} expandable={anime} />);

    return <>{animeCards}</>;
});

const buildCacheKey = "series";

export const getStaticProps: GetStaticProps<SeriesDetailPageProps, SeriesDetailPageParams> = async ({
    params,
    revalidateReason,
}) => {
    if (!params) {
        return { notFound: true };
    }

    const client = createApolloClient();

    const buildCache =
        revalidateReason === "build"
            ? await readCache<Map<string, FragmentType<typeof SERIES_DETAIL_PAGE_SERIES>>>(buildCacheKey)
            : null;

    const series =
        buildCache?.get(params.seriesSlug) ??
        (
            await client.query({
                query: propsQuery,
                variables: {
                    seriesSlug: params.seriesSlug,
                },
            })
        ).data.series;

    if (!series) {
        return { notFound: true };
    }

    return {
        props: {
            ...getSharedPageProps(),
            series,
        },
        // Revalidate after 1 hour (= 3600 seconds).
        revalidate: 3600,
    };
};

export const getStaticPaths: GetStaticPaths<SeriesDetailPageParams> = async () => {
    return fetchStaticPaths(async () => {
        const client = createApolloClient();

        const allSeries = await collect(async (cursor) => {
            const { data } = await client.query({
                query: pathsQuery,
                variables: {
                    pagination: {
                        first: PAGINATION_PAGE_SIZE,
                        after: cursor,
                    },
                },
            });

            return {
                items: data.seriesConnection.nodes,
                nextCursor: data.seriesConnection.pageInfo.endCursor,
                hasNextPage: data.seriesConnection.pageInfo.hasNextPage,
            };
        });

        const buildCache: Map<string, FragmentType<typeof SERIES_DETAIL_PAGE_SERIES>> = new Map();
        for (const series of allSeries) {
            buildCache.set(series.slug, series);
        }
        await writeCache(buildCacheKey, buildCache);

        return allSeries.map((series) => ({
            params: {
                seriesSlug: series.slug,
            },
        }));
    });
};
