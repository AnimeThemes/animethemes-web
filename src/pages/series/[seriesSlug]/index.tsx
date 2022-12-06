import { SidebarContainer } from "components/container";
import styled from "styled-components";
import { AnimeSummaryCard } from "components/card";
import { Column, Row } from "components/box";
import { Text } from "components/text";
import { Collapse } from "components/utils";
import useToggle from "hooks/useToggle";
import { memo, useMemo, useState } from "react";
import { SearchFilterGroup, SearchFilterSortBy } from "components/search-filter";
import { FilterToggleButton } from "components/button";
import { ANIME_A_Z, ANIME_NEW_OLD, ANIME_OLD_NEW, ANIME_Z_A, getComparator } from "utils/comparators";
import { fetchData } from "lib/server";
import { SEO } from "components/seo";
import theme from "theme";
import { MultiCoverImage } from "components/image";
import gql from "graphql-tag";
import fetchStaticPaths from "utils/fetchStaticPaths";
import getSharedPageProps from "utils/getSharedPageProps";
import type { GetStaticPaths, GetStaticProps } from "next";
import type { RequiredNonNullable } from "utils/types";
import type { SeriesDetailPageAllQuery, SeriesDetailPageQuery, SeriesDetailPageQueryVariables } from "generated/graphql";
import type { ParsedUrlQuery } from "querystring";

const StyledDesktopOnly = styled.div`
    gap: 24px;
    
    @media (max-width: ${theme.breakpoints.mobileMax}) {
        display: none;
    }
`;

interface SeriesDetailPageProps extends RequiredNonNullable<SeriesDetailPageQuery> {}

interface SeriesDetailPageParams extends ParsedUrlQuery {
    seriesSlug: string
}

export default function SeriesDetailPage({ series }: SeriesDetailPageProps) {
    const anime = series.anime;

    const [ showFilter, toggleShowFilter ] = useToggle();
    const [ sortBy, setSortBy ] = useState(ANIME_OLD_NEW);

    const animeSorted = useMemo(() => [ ...anime ].sort(getComparator(sortBy)), [anime, sortBy]);

    return (
        <>
            <SEO title={series.name}/>
            <Text variant="h1">{series.name}</Text>
            <SidebarContainer>
                <StyledDesktopOnly>
                    <MultiCoverImage resourcesWithImages={anime}/>
                </StyledDesktopOnly>
                <Column style={{ "--gap": "24px" }}>
                    <Row style={{ "--justify-content": "space-between", "--align-items": "center" }}>
                        <Text variant="h2">
                            Anime
                            <Text color="text-disabled"> ({anime.length})</Text>
                        </Text>
                        <FilterToggleButton onClick={toggleShowFilter}/>
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
                        <SeriesAnime anime={animeSorted}/>
                    </Column>
                </Column>
            </SidebarContainer>
        </>
    );
}

interface SeriesAnimeProps {
    anime: SeriesDetailPageProps["series"]["anime"]
}

const SeriesAnime = memo(function SeriesAnime({ anime }: SeriesAnimeProps) {
    const animeCards = anime.map((anime) => (
        <AnimeSummaryCard key={anime.slug} anime={anime} expandable/>
    ));

    return <>{animeCards}</>;
});

SeriesDetailPage.fragments = {
    series: gql`
        ${AnimeSummaryCard.fragments.anime}
        ${AnimeSummaryCard.fragments.expandable}
        
        fragment SeriesDetailPageSeries on Series {
            slug
            name
            anime {
                ...AnimeSummaryCardAnime
                ...AnimeSummaryCardAnimeExpandable
                name
                slug
                year
                season
                themes {
                    slug
                    type
                    sequence
                    entries {
                        version
                        videos {
                            tags
                        }
                    }
                }
                images {
                    facet
                    link
                }
            }
        }
    `,
};

const buildTimeCache: Map<string, SeriesDetailPageQuery> = new Map();

export const getStaticProps: GetStaticProps<SeriesDetailPageProps, SeriesDetailPageParams> = async ({ params }) => {
    let data = params ? buildTimeCache.get(params.seriesSlug) : null;
    let apiRequests = 0;

    if (!data) {
        ({ data, apiRequests } = await fetchData<SeriesDetailPageQuery, SeriesDetailPageQueryVariables>(gql`
            ${SeriesDetailPage.fragments.series}

            query SeriesDetailPage($seriesSlug: String!) {
                series(slug: $seriesSlug) {
                    ...SeriesDetailPageSeries
                }
            }
        `, params));
    }

    if (!data.series) {
        return {
            notFound: true
        };
    }

    return {
        props: {
            ...getSharedPageProps(apiRequests),
            series: data.series
        },
        // Revalidate after 1 hour (= 3600 seconds).
        revalidate: 3600
    };
};

export const getStaticPaths: GetStaticPaths<SeriesDetailPageParams> = async () => {
    return fetchStaticPaths(async () => {
        const { data } = await fetchData<SeriesDetailPageAllQuery>(gql`
            ${SeriesDetailPage.fragments.series}
            
            query SeriesDetailPageAll {
                seriesAll {
                    ...SeriesDetailPageSeries
                }
            }
        `);

        data.seriesAll.forEach((series) => buildTimeCache.set(series.slug, { series }));

        return data.seriesAll.map((series) => ({
            params: {
                seriesSlug: series.slug
            }
        }));
    });
};
