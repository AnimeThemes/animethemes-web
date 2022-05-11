import { SidebarContainer } from "components/container";
import styled from "styled-components";
import { AnimeSummaryCard } from "components/card";
import { Column, Row } from "components/box";
import { Text } from "components/text";
import { Collapse } from "components/utils";
import { useState } from "react";
import { SearchFilterGroup, SearchFilterSortBy } from "components/search-filter";
import useToggle from "hooks/useToggle";
import { FilterToggleButton } from "components/button";
import {
    ANIME_A_Z,
    ANIME_NEW_OLD,
    ANIME_OLD_NEW,
    ANIME_Z_A, chain,
    getComparator, resourceAsComparator,
    resourceSiteComparator,
} from "utils/comparators";
import { fetchData } from "lib/server";
import { DescriptionList } from "components/description-list";
import { ExternalLink } from "components/external-link";
import { SEO } from "components/seo";
import theme from "theme";
import { MultiCoverImage } from "components/image";
import gql from "graphql-tag";
import fetchStaticPaths from "utils/fetchStaticPaths";
import getSharedPageProps from "utils/getSharedPageProps";

const StyledDesktopOnly = styled.div`    
    @media (max-width: ${theme.breakpoints.mobileMax}) {
        display: none;
    }
`;
const StyledList = styled.div`
    display: flex;
    flex-direction: column;

    gap: 8px;

    text-align: center;
`;

export default function StudioDetailPage({ studio }) {
    const anime = studio.anime;

    const [ showFilter, toggleShowFilter ] = useToggle();
    const [ sortBy, setSortBy ] = useState(ANIME_A_Z);

    const animeSorted = [ ...anime ].sort(getComparator(sortBy));

    return (
        <>
            <SEO title={studio.name}/>
            <Text variant="h1">{studio.name}</Text>
            <SidebarContainer>
                <Column style={{ "--gap": "24px" }}>
                    <StyledDesktopOnly>
                        <MultiCoverImage resourcesWithImages={anime}/>
                    </StyledDesktopOnly>
                    <DescriptionList>
                        {!!studio.resources && !!studio.resources.length && (
                            <DescriptionList.Item title="Links">
                                <StyledList>
                                    {studio.resources.sort(chain(resourceSiteComparator, resourceAsComparator)).map((resource) => (
                                        <ExternalLink key={resource.link} href={resource.link}>
                                            {resource.site}{!!resource.as && ` (${resource.as})`}
                                        </ExternalLink>
                                    ))}
                                </StyledList>
                            </DescriptionList.Item>
                        )}
                    </DescriptionList>
                </Column>
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
                                <SearchFilterSortBy.Option value={ANIME_A_Z}>A ➜ Z</SearchFilterSortBy.Option>
                                <SearchFilterSortBy.Option value={ANIME_Z_A}>Z ➜ A</SearchFilterSortBy.Option>
                                <SearchFilterSortBy.Option value={ANIME_OLD_NEW}>Old ➜ New</SearchFilterSortBy.Option>
                                <SearchFilterSortBy.Option value={ANIME_NEW_OLD}>New ➜ Old</SearchFilterSortBy.Option>
                            </SearchFilterSortBy>
                        </SearchFilterGroup>
                    </Collapse>
                    <Column style={{ "--gap": "16px" }}>
                        {animeSorted.map((anime) => (
                            <AnimeSummaryCard key={anime.slug} anime={anime} previewThemes expandable/>
                        ))}
                    </Column>
                </Column>
            </SidebarContainer>
        </>
    );
}

export async function getStaticProps({ params: { studioSlug } }) {
    const { data, apiRequests } = await fetchData(gql`
        ${AnimeSummaryCard.fragments.anime}
        ${AnimeSummaryCard.fragments.previewThemes}
        ${AnimeSummaryCard.fragments.expandable}

        query($studioSlug: String!) {
            studio(slug: $studioSlug) {
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
                resources {
                    link
                    site
                    as
                }
            }
        }
    `, {
        studioSlug
    });

    if (!data.studio) {
        return {
            notFound: true
        };
    }

    return {
        props: {
            ...getSharedPageProps(apiRequests),
            studio: data.studio
        },
        // Revalidate after 1 hour (= 3600 seconds).
        revalidate: 3600
    };
}

export async function getStaticPaths() {
    return fetchStaticPaths(async () => {
        const { data } = await fetchData(gql`
            query {
                studioAll {
                    slug
                }
            }
        `);

        return data.studioAll.map((studio) => ({
            params: {
                studioSlug: studio.slug
            }
        }));
    });
}
