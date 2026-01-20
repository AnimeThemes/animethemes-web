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
import { ANIME_A_Z, ANIME_NEW_OLD, ANIME_OLD_NEW, ANIME_Z_A, getComparator } from "@/utils/comparators";
import fetchStaticPaths from "@/utils/fetchStaticPaths";
import getSharedPageProps from "@/utils/getSharedPageProps";

const StyledDesktopOnly = styled.div`
    gap: 24px;

    @media (max-width: ${theme.breakpoints.mobileMax}) {
        display: none;
    }
`;

const fragments = {
    series: graphql(`
        fragment SeriesDetailPageSeries on Series {
            slug
            name
            anime {
                nodes {
                    ...AnimeSummaryCardAnime
                    ...AnimeSummaryCardAnimeExpandable
                    name
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
    `),
};

const propsQuery = graphql(`
    query SeriesDetailPage($seriesSlug: String!) {
        series(slug: $seriesSlug) {
            ...SeriesDetailPageSeries
        }
    }
`);

const pathsQuery = graphql(`
    query SeriesDetailPageAll {
        seriesPagination {
            data {
                ...SeriesDetailPageSeries
                slug
            }
        }
    }
`);

interface SeriesDetailPageProps {
    series: FragmentType<typeof fragments.series>;
}

interface SeriesDetailPageParams extends ParsedUrlQuery {
    seriesSlug: string;
}

export default function SeriesDetailPage({ series: seriesFragment }: SeriesDetailPageProps) {
    const series = getFragmentData(fragments.series, seriesFragment);
    const anime = series.anime.nodes;

    const [showFilter, toggleShowFilter] = useToggle();
    const [sortBy, setSortBy] = useState<
        typeof ANIME_OLD_NEW | typeof ANIME_NEW_OLD | typeof ANIME_A_Z | typeof ANIME_Z_A
    >(ANIME_OLD_NEW);

    const animeSorted = useMemo(() => [...anime].sort(getComparator(sortBy)), [anime, sortBy]);

    return (
        <>
            <SEO title={series.name} />
            <Text variant="h1">{series.name}</Text>
            <SidebarContainer>
                <StyledDesktopOnly>
                    <MultiCoverImage items={anime.map((anime) => ({ images: anime.images.nodes, name: anime.name }))} />
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
    anime: ResultOf<typeof fragments.series>["anime"]["nodes"];
}

const SeriesAnime = memo(function SeriesAnime({ anime }: SeriesAnimeProps) {
    const animeCards = anime.map((anime) => <AnimeSummaryCard key={anime.slug} anime={anime} expandable={anime} />);

    return <>{animeCards}</>;
});

const buildTimeCache: Map<string, FragmentType<typeof fragments.series>> = new Map();

export const getStaticProps: GetStaticProps<SeriesDetailPageProps, SeriesDetailPageParams> = async ({ params }) => {
    const client = createApolloClient();

    let series = params ? buildTimeCache.get(params.seriesSlug) : null;

    if (!series) {
        series = (
            await client.query({
                query: propsQuery,
                variables: params,
            })
        ).data.series;
    }

    if (!series) {
        return {
            notFound: true,
        };
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

        const { data } = await client.query({
            query: pathsQuery,
        });

        for (const series of data.seriesPagination.data) {
            buildTimeCache.set(series.slug, series);
        }

        return data.seriesPagination.data.map((series) => ({
            params: {
                seriesSlug: series.slug,
            },
        }));
    });
};
