import { memo, useMemo, useState } from "react";
import styled from "styled-components";
import type { GetStaticPaths, GetStaticProps } from "next";

import type { ResultOf } from "@graphql-typed-document-node/core";
import type { ParsedUrlQuery } from "querystring";

import { Column, Row } from "@/components/box/Flex";
import { FilterToggleButton } from "@/components/button/FilterToggleButton";
import { AnimeSummaryCard } from "@/components/card/AnimeSummaryCard";
import { SidebarContainer } from "@/components/container/SidebarContainer";
import { DescriptionList } from "@/components/description-list/DescriptionList";
import { ExternalLink } from "@/components/external-link/ExternalLink";
import { StudioCoverImage } from "@/components/image/StudioCoverImage";
import { SearchFilterGroup } from "@/components/search-filter/SearchFilterGroup";
import { SearchFilterSortBy } from "@/components/search-filter/SearchFilterSortBy";
import { SEO } from "@/components/seo/SEO";
import { Text } from "@/components/text/Text";
import { Collapse } from "@/components/utils/Collapse";
import createApolloClient from "@/graphql/createApolloClient";
import { type FragmentType, getFragmentData, graphql } from "@/graphql/generated";
import useToggle from "@/hooks/useToggle";
import theme from "@/theme";
import collect from "@/utils/collect";
import { ANIME_A_Z, ANIME_NEW_OLD, ANIME_OLD_NEW, ANIME_Z_A, compare, getComparator } from "@/utils/comparators";
import extractImages from "@/utils/extractImages";
import fetchStaticPaths from "@/utils/fetchStaticPaths";
import getSharedPageProps from "@/utils/getSharedPageProps";

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

export const STUDIO_DETAIL_PAGE_STUDIO = graphql(`
    fragment StudioDetailPageStudio on Studio {
        ...StudioCoverImageStudio
        slug
        name
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
                        facet
                        link
                    }
                }
            }
        }
        resources {
            edges {
                as
                node {
                    link
                    site
                    siteLocalized
                }
            }
        }
        images {
            nodes {
                ...extractImagesImage
            }
        }
    }
`);

const propsQuery = graphql(`
    query StudioDetailPage($studioSlug: String!) {
        studio(slug: $studioSlug) {
            ...StudioDetailPageStudio
        }
    }
`);

const pathsQuery = graphql(`
    query StudioDetailPageAll($pagination: PaginationInput) {
        studioConnection(pagination: $pagination) {
            nodes {
                ...StudioDetailPageStudio
                slug
            }
            pageInfo {
                hasNextPage
                endCursor
            }
        }
    }
`);

interface StudioDetailPageProps {
    studio: FragmentType<typeof STUDIO_DETAIL_PAGE_STUDIO>;
}

interface StudioDetailPageParams extends ParsedUrlQuery {
    studioSlug: string;
}

export default function StudioDetailPage({ studio: studioFragment }: StudioDetailPageProps) {
    const studio = getFragmentData(STUDIO_DETAIL_PAGE_STUDIO, studioFragment);
    const anime = studio.anime.nodes;
    const { largeCover } = extractImages(studio.images.nodes);

    const [showFilter, toggleShowFilter] = useToggle();
    const [sortBy, setSortBy] = useState<
        typeof ANIME_A_Z | typeof ANIME_Z_A | typeof ANIME_OLD_NEW | typeof ANIME_NEW_OLD
    >(ANIME_A_Z);

    const animeSorted = useMemo(() => [...anime].sort(getComparator(sortBy)), [anime, sortBy]);

    return (
        <>
            <SEO title={studio.name} image={largeCover} />
            <Text variant="h1">{studio.name}</Text>
            <SidebarContainer>
                <Column style={{ "--gap": "24px" }}>
                    <StyledDesktopOnly>
                        <StudioCoverImage studio={studio} alt={`Logo of ${studio.name}`} />
                    </StyledDesktopOnly>
                    <DescriptionList>
                        {!!studio.resources.edges.length && (
                            <DescriptionList.Item title="Links">
                                <StyledList>
                                    {[...studio.resources.edges]
                                        .sort((a, b) => compare(a.node.site, b.node.site) || compare(a.as, b.as))
                                        .map((resource) => (
                                            <ExternalLink key={resource.node.link} href={resource.node.link}>
                                                {resource.node.siteLocalized}
                                                {!!resource.as && ` (${resource.as})`}
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
                        <FilterToggleButton onClick={toggleShowFilter} />
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
                        <StudioAnime anime={animeSorted} />
                    </Column>
                </Column>
            </SidebarContainer>
        </>
    );
}

interface StudioAnimeProps {
    anime: ResultOf<typeof STUDIO_DETAIL_PAGE_STUDIO>["anime"]["nodes"];
}

const StudioAnime = memo(function StudioAnime({ anime }: StudioAnimeProps) {
    const animeCards = anime.map((anime) => <AnimeSummaryCard key={anime.slug} anime={anime} expandable={anime} />);

    return <>{animeCards}</>;
});

const buildTimeCache: Map<string, FragmentType<typeof STUDIO_DETAIL_PAGE_STUDIO>> = new Map();

export const getStaticProps: GetStaticProps<StudioDetailPageProps, StudioDetailPageParams> = async ({ params }) => {
    if (!params) {
        return { notFound: true };
    }

    const client = createApolloClient();

    const studio =
        buildTimeCache.get(params.studioSlug) ??
        (
            await client.query({
                query: propsQuery,
                variables: {
                    studioSlug: params.studioSlug,
                },
            })
        ).data.studio;

    if (!studio) {
        return { notFound: true };
    }

    return {
        props: {
            ...getSharedPageProps(),
            studio: studio,
        },
        // Revalidate after 1 hour (= 3600 seconds).
        revalidate: 3600,
    };
};

export const getStaticPaths: GetStaticPaths<StudioDetailPageParams> = async () => {
    return fetchStaticPaths(async () => {
        const client = createApolloClient();

        const allStudios = await collect(async (cursor) => {
            const { data } = await client.query({
                query: pathsQuery,
                variables: {
                    pagination: {
                        first: 1000,
                        after: cursor,
                    },
                },
            });

            return {
                items: data.studioConnection.nodes,
                nextCursor: data.studioConnection.pageInfo.endCursor,
                hasNextPage: data.studioConnection.pageInfo.hasNextPage,
            };
        });

        for (const studio of allStudios) {
            buildTimeCache.set(studio.slug, studio);
        }

        return allStudios.map((studio) => ({
            params: {
                studioSlug: studio.slug,
            },
        }));
    });
};
