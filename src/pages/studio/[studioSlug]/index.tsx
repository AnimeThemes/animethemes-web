import { SidebarContainer } from "components/container";
import styled from "styled-components";
import { AnimeSummaryCard } from "components/card";
import { Column, Row } from "components/box";
import { Text } from "components/text";
import { Collapse } from "components/utils";
import { memo, useMemo, useState } from "react";
import { SearchFilterGroup, SearchFilterSortBy } from "components/search-filter";
import useToggle from "hooks/useToggle";
import { FilterToggleButton } from "components/button";
import {
    ANIME_A_Z,
    ANIME_NEW_OLD,
    ANIME_OLD_NEW,
    ANIME_Z_A,
    either,
    getComparator,
    resourceAsComparator,
    resourceSiteComparator,
} from "utils/comparators";
import { fetchData } from "lib/server";
import { DescriptionList } from "components/description-list";
import { ExternalLink } from "components/external-link";
import { SEO } from "components/seo";
import theme from "theme";
import gql from "graphql-tag";
import fetchStaticPaths from "utils/fetchStaticPaths";
import getSharedPageProps from "utils/getSharedPageProps";
import type { GetStaticPaths, GetStaticProps } from "next";
import type { RequiredNonNullable } from "utils/types";
import type { StudioDetailPageAllQuery, StudioDetailPageQuery, StudioDetailPageQueryVariables } from "generated/graphql";
import type { ParsedUrlQuery } from "querystring";
import extractImages from "utils/extractImages";
import { StudioCoverImage } from "components/image/StudioCoverImage";

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

interface StudioDetailPageProps extends RequiredNonNullable<StudioDetailPageQuery> {}

interface StudioDetailPageParams extends ParsedUrlQuery {
    studioSlug: string
}

export default function StudioDetailPage({ studio }: StudioDetailPageProps) {
    const anime = studio.anime;
    const { largeCover } = extractImages(studio);

    const [ showFilter, toggleShowFilter ] = useToggle();
    const [ sortBy, setSortBy ] = useState(ANIME_A_Z);

    const animeSorted = useMemo(() => [ ...anime ].sort(getComparator(sortBy)), [anime, sortBy]);

    return (
        <>
            <SEO title={studio.name} image={largeCover}/>
            <Text variant="h1">{studio.name}</Text>
            <SidebarContainer>
                <Column style={{ "--gap": "24px" }}>
                    <StyledDesktopOnly>
                        <StudioCoverImage studio={studio} alt={`Logo of ${studio.name}`}/>
                    </StyledDesktopOnly>
                    <DescriptionList>
                        {!!studio.resources && !!studio.resources.length && (
                            <DescriptionList.Item title="Links">
                                <StyledList>
                                    {studio.resources.sort(either(resourceSiteComparator).or(resourceAsComparator).chain()).map((resource) => (
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
                        <StudioAnime anime={animeSorted}/>
                    </Column>
                </Column>
            </SidebarContainer>
        </>
    );
}

interface StudioAnimeProps {
    anime: StudioDetailPageProps["studio"]["anime"]
}

const StudioAnime = memo(function StudioAnime({ anime }: StudioAnimeProps) {
    const animeCards = anime.map((anime) => (
        <AnimeSummaryCard key={anime.slug} anime={anime} expandable/>
    ));

    return <>{animeCards}</>;
});

StudioDetailPage.fragments = {
    studio: gql`
        ${AnimeSummaryCard.fragments.anime}
        ${AnimeSummaryCard.fragments.expandable}
        ${StudioCoverImage.fragments.studio}
        ${extractImages.fragments.resourceWithImages}
        
        fragment StudioDetailPageStudio on Studio {
            ...StudioCoverImageStudio
            ...extractImagesResourceWithImages
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
            resources {
                link
                site
                as
            }
        }
    `,
};

const buildTimeCache: Map<string, StudioDetailPageQuery> = new Map();

export const getStaticProps: GetStaticProps<StudioDetailPageProps, StudioDetailPageParams> = async ({ params }) => {
    let data = params ? buildTimeCache.get(params.studioSlug) : null;
    let apiRequests = 0;

    if (!data) {
        ({ data, apiRequests } = await fetchData<StudioDetailPageQuery, StudioDetailPageQueryVariables>(gql`
            ${StudioDetailPage.fragments.studio}

            query StudioDetailPage($studioSlug: String!) {
                studio(slug: $studioSlug) {
                    ...StudioDetailPageStudio
                }
            }
        `, params));
    }

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
};

export const getStaticPaths: GetStaticPaths<StudioDetailPageParams> = async () => {
    return fetchStaticPaths(async () => {
        const { data } = await fetchData<StudioDetailPageAllQuery>(gql`
            ${StudioDetailPage.fragments.studio}
            
            query StudioDetailPageAll {
                studioAll {
                    ...StudioDetailPageStudio
                }
            }
        `);

        data.studioAll.forEach((studio) => buildTimeCache.set(studio.slug, { studio }));

        return data.studioAll.map((studio) => ({
            params: {
                studioSlug: studio.slug
            }
        }));
    });
};
