import { SidebarContainer } from "components/container";
import styled from "styled-components";
import { AnimeSummaryCard } from "components/card";
import { Column, Row } from "components/box";
import { Text } from "components/text";
import { Collapse } from "components/utils";
import useToggle from "hooks/useToggle";
import { useState } from "react";
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

const StyledDesktopOnly = styled.div`
    gap: 24px;
    
    @media (max-width: ${theme.breakpoints.mobileMax}) {
        display: none;
    }
`;

export default function SeriesDetailPage({ series }) {
    const anime = series.anime;

    const [ showFilter, toggleShowFilter ] = useToggle();
    const [ sortBy, setSortBy ] = useState(ANIME_OLD_NEW);

    const animeSorted = [ ...anime ].sort(getComparator(sortBy));

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
                        {animeSorted.map((anime) => (
                            <AnimeSummaryCard key={anime.slug} anime={anime} expandable/>
                        ))}
                    </Column>
                </Column>
            </SidebarContainer>
        </>
    );
}

export async function getStaticProps({ params: { seriesSlug } }) {
    const { data, apiRequests } = await fetchData(gql`
        ${AnimeSummaryCard.fragments.anime}
        ${AnimeSummaryCard.fragments.previewThemes}
        ${AnimeSummaryCard.fragments.expandable}

        query($seriesSlug: String!) {
            series(slug: $seriesSlug) {
                slug
                name
                anime {
                    ...AnimeSummaryCard_anime
                    ...AnimeSummaryCard_anime_previewThemes
                    ...AnimeSummaryCard_anime_expandable
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
        }
    `, {
        seriesSlug
    });

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
}

export async function getStaticPaths() {
    return fetchStaticPaths(async () => {
        const { data } = await fetchData(gql`
            query {
                seriesAll {
                    slug
                }
            }
        `);

        return data.seriesAll.map((series) => ({
            params: {
                seriesSlug: series.slug
            }
        }));
    });
}
