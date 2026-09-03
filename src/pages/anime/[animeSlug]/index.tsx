import React, { useState } from "react";
import styled from "styled-components";
import type { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";
import type { MDXRemoteSerializeResult } from "next-mdx-remote";

import type { ParsedUrlQuery } from "querystring";

import { Column } from "@/components/box/Flex";
import { Card } from "@/components/card/Card";
import { SidebarContainer } from "@/components/container/SidebarContainer";
import { DescriptionList } from "@/components/description-list/DescriptionList";
import { ExternalLink } from "@/components/external-link/ExternalLink";
import { AnimeThemeFilter } from "@/components/filter/AnimeThemeFilter";
import { CoverImage } from "@/components/image/CoverImage";
import { Markdown } from "@/components/markdown/Markdown";
import { SEO } from "@/components/seo/SEO";
import { Text } from "@/components/text/Text";
import { HeightTransition } from "@/components/utils/HeightTransition";
import createApolloClient from "@/graphql/createApolloClient";
import { type FragmentType, getFragmentData, graphql } from "@/graphql/generated";
import { readCache, writeCache } from "@/utils/buildCache";
import collect from "@/utils/collect";
import { compare, seriesTitleComparator, studioNameComparator } from "@/utils/comparators";
import { PAGINATION_PAGE_SIZE } from "@/utils/config";
import extractImages from "@/utils/extractImages";
import fetchStaticPaths from "@/utils/fetchStaticPaths";
import type { SharedPageProps } from "@/utils/getSharedPageProps";
import getSharedPageProps from "@/utils/getSharedPageProps";
import { serializeMarkdownSafe } from "@/utils/serializeMarkdown";

const StyledList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;

    text-align: center;
`;

export const ANIME_DETAIL_PAGE_ANIME = graphql(`
    fragment AnimeDetailPageAnime on Anime {
        slug
        title {
            romaji
            english
            native
        }
        season
        seasonLocalized
        year
        synopsis
        formatLocalized
        synonyms {
            text
        }
        series {
            nodes {
                slug
                title {
                    romaji
                }
            }
        }
        studios {
            nodes {
                slug
                name
            }
        }
        resources {
            edges {
                node {
                    site
                    siteLocalized
                    link
                }
                as
            }
        }
        images {
            nodes {
                ...extractImagesImage
            }
        }
        themes {
            ...AnimeThemeFilterTheme
        }
    }
`);

export const ANIME_DETAIL_PAGE_PROPS = graphql(`
    query AnimeDetailPage($animeSlug: String!) {
        anime(slug: $animeSlug) {
            ...AnimeDetailPageAnime
        }
    }
`);

export const ANIME_DETAIL_PAGE_PATHS = graphql(`
    query AnimeDetailPageAll($pagination: PaginationInput) {
        animeConnection(pagination: $pagination) {
            nodes {
                ...AnimeDetailPageAnime
                slug
            }
            pageInfo {
                hasNextPage
                endCursor
            }
        }
    }
`);

interface AnimeDetailPageProps extends SharedPageProps {
    anime: FragmentType<typeof ANIME_DETAIL_PAGE_ANIME>;
    synopsisMarkdownSource: MDXRemoteSerializeResult | null;
}

interface AnimeDetailPageParams extends ParsedUrlQuery {
    animeSlug: string;
}

export default function AnimeDetailPage({ anime: animeFragment, synopsisMarkdownSource }: AnimeDetailPageProps) {
    const anime = getFragmentData(ANIME_DETAIL_PAGE_ANIME, animeFragment);

    const [collapseSynopsis, setCollapseSynopsis] = useState(true);
    const { smallCover, largeCover } = extractImages(anime.images.nodes);

    return (
        <>
            <SEO title={anime.title.romaji} image={largeCover} />
            <Text variant="h1">{anime.title.romaji}</Text>
            <SidebarContainer>
                <Column style={{ "--gap": "24px" }}>
                    <CoverImage
                        smallCover={smallCover}
                        largeCover={largeCover}
                        alt={`Cover image of ${anime.title.romaji}`}
                    />
                    <DescriptionList>
                        {anime.title.english || anime.title.native || anime.synonyms.length ? (
                            <DescriptionList.Item title="Alternative Titles">
                                <StyledList>
                                    {anime.title.english && (
                                        <Text key={anime.title.english}>{anime.title.english}</Text>
                                    )}
                                    {anime.title.native && <Text key={anime.title.native}>{anime.title.native}</Text>}
                                    {anime.synonyms.map((synonym) => (
                                        <Text key={synonym.text}>{synonym.text}</Text>
                                    ))}
                                </StyledList>
                            </DescriptionList.Item>
                        ) : null}
                        <DescriptionList.Item title="Premiere">
                            <Text
                                as={Link}
                                href={`/year/${anime.year}${anime.season ? `/${anime.season.toLowerCase()}` : ""}`}
                                link
                            >
                                {(anime.seasonLocalized ? anime.seasonLocalized + " " : "") + anime.year}
                            </Text>
                        </DescriptionList.Item>
                        {anime.series.nodes.length ? (
                            <DescriptionList.Item title="Series">
                                <StyledList>
                                    {anime.series.nodes.sort(seriesTitleComparator).map((series) => (
                                        <Text key={series.slug} as={Link} href={`/series/${series.slug}`} link>
                                            {series.title.romaji}
                                        </Text>
                                    ))}
                                </StyledList>
                            </DescriptionList.Item>
                        ) : null}
                        {anime.formatLocalized ? (
                            <DescriptionList.Item title="Format">{anime.formatLocalized}</DescriptionList.Item>
                        ) : null}
                        {anime.studios.nodes.length ? (
                            <DescriptionList.Item title="Studios">
                                <StyledList>
                                    {anime.studios.nodes.sort(studioNameComparator).map((studio) => (
                                        <Text key={studio.slug} as={Link} href={`/studio/${studio.slug}`} link>
                                            {studio.name}
                                        </Text>
                                    ))}
                                </StyledList>
                            </DescriptionList.Item>
                        ) : null}
                        {anime.resources.edges.length ? (
                            <DescriptionList.Item title="Links">
                                <StyledList>
                                    {[...anime.resources.edges]
                                        .sort((a, b) => compare(a.node.site, b.node.site) || compare(a.as, b.as))
                                        .map((resource) => (
                                            <ExternalLink key={resource.node.link} href={resource.node.link}>
                                                {resource.node.siteLocalized}
                                                {!!resource.as && ` (${resource.as})`}
                                            </ExternalLink>
                                        ))}
                                </StyledList>
                            </DescriptionList.Item>
                        ) : null}
                    </DescriptionList>
                </Column>
                <Column style={{ "--gap": "24px" }}>
                    {!!synopsisMarkdownSource && (
                        <>
                            <Text variant="h2">Synopsis</Text>
                            <Card $hoverable onClick={() => setCollapseSynopsis(!collapseSynopsis)}>
                                <HeightTransition>
                                    <Text as="div" maxLines={collapseSynopsis ? 2 : undefined}>
                                        <Markdown source={synopsisMarkdownSource} />
                                    </Text>
                                </HeightTransition>
                            </Card>
                        </>
                    )}
                    <Text variant="h2">
                        Themes
                        <Text color="text-disabled"> ({anime.themes.length || 0})</Text>
                    </Text>
                    {anime.themes.length ? (
                        <AnimeThemeFilter themes={anime.themes} />
                    ) : (
                        <Text as="p">There are no themes for this anime, yet.</Text>
                    )}
                </Column>
            </SidebarContainer>
        </>
    );
}

const buildCacheKey = "anime";

export const getStaticProps: GetStaticProps<AnimeDetailPageProps, AnimeDetailPageParams> = async ({
    params,
    revalidateReason,
}) => {
    if (!params) {
        return {
            notFound: true,
        };
    }

    const client = createApolloClient();

    const buildCache =
        revalidateReason === "build"
            ? await readCache<Map<string, FragmentType<typeof ANIME_DETAIL_PAGE_ANIME>>>(buildCacheKey)
            : null;

    const animeFragment =
        buildCache?.get(params.animeSlug) ??
        (
            await client.query({
                query: ANIME_DETAIL_PAGE_PROPS,
                variables: {
                    animeSlug: params.animeSlug,
                },
            })
        ).data.anime;

    if (!animeFragment) {
        return {
            notFound: true,
        };
    }

    const anime = getFragmentData(ANIME_DETAIL_PAGE_ANIME, animeFragment);

    return {
        props: {
            ...getSharedPageProps(),
            anime: animeFragment,
            synopsisMarkdownSource: anime.synopsis ? (await serializeMarkdownSafe(anime.synopsis)).source : null,
        },
        // Revalidate after 1 hour (= 3600 seconds).
        revalidate: 3600,
    };
};

export const getStaticPaths: GetStaticPaths<AnimeDetailPageParams> = () => {
    return fetchStaticPaths(async () => {
        const client = createApolloClient();

        const allAnime = await collect(async (cursor) => {
            const { data } = await client.query({
                query: ANIME_DETAIL_PAGE_PATHS,
                variables: {
                    pagination: {
                        first: PAGINATION_PAGE_SIZE,
                        after: cursor,
                    },
                },
            });

            return {
                items: data.animeConnection.nodes,
                nextCursor: data.animeConnection.pageInfo.endCursor,
                hasNextPage: data.animeConnection.pageInfo.hasNextPage,
            };
        });

        const buildCache: Map<string, FragmentType<typeof ANIME_DETAIL_PAGE_ANIME>> = new Map();
        for (const anime of allAnime) {
            buildCache.set(anime.slug, anime);
        }
        await writeCache(buildCacheKey, buildCache);

        return allAnime.map((anime) => ({
            params: {
                animeSlug: anime.slug,
            },
        }));
    });
};
