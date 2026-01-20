import React, { useState } from "react";
import styled from "styled-components";
import type { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";
import type { MDXRemoteSerializeResult } from "next-mdx-remote";

import type { ResultOf } from "@graphql-typed-document-node/core";
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
import { getFragmentData, graphql } from "@/graphql/generated";
import {
    either,
    resourceAsComparator,
    resourceSiteComparator,
    seriesNameComparator,
    sortTransformed,
    studioNameComparator,
} from "@/utils/comparators";
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

const propsQuery = graphql(`
    fragment AnimeDetailPageAnime on Anime {
        slug
        name
        season
        year
        synopsis
        mediaFormatLocalized
        animesynonyms {
            text
        }
        series {
            nodes {
                slug
                name
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
        animethemes {
            ...ThemeDetailCardTheme
        }
    }
`);

interface AnimeDetailPageProps extends SharedPageProps {
    anime: ResultOf<typeof propsQuery>;
    synopsisMarkdownSource: MDXRemoteSerializeResult | null;
}

interface AnimeDetailPageParams extends ParsedUrlQuery {
    animeSlug: string;
}

export default function AnimeDetailPage({ anime, synopsisMarkdownSource }: AnimeDetailPageProps) {
    const [collapseSynopsis, setCollapseSynopsis] = useState(true);
    const { largeCover } = extractImages(anime.images.nodes);

    return (
        <>
            <SEO title={anime.name} image={largeCover} />
            <Text variant="h1">{anime.name}</Text>
            <SidebarContainer>
                <Column style={{ "--gap": "24px" }}>
                    <CoverImage resourceWithImages={anime} alt={`Cover image of ${anime.name}`} />
                    <DescriptionList>
                        {anime.animesynonyms.data.length ? (
                            <DescriptionList.Item title="Alternative Titles">
                                <StyledList>
                                    {anime.animesynonyms.data.map((synonym) => (
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
                                {(anime.season ? anime.season + " " : "") + anime.year}
                            </Text>
                        </DescriptionList.Item>
                        {anime.series.nodes.length ? (
                            <DescriptionList.Item title="Series">
                                <StyledList>
                                    {anime.series.nodes.sort(seriesNameComparator).map((series) => (
                                        <Text key={series.slug} as={Link} href={`/series/${series.slug}`} link>
                                            {series.name}
                                        </Text>
                                    ))}
                                </StyledList>
                            </DescriptionList.Item>
                        ) : null}
                        {anime.mediaFormatLocalized ? (
                            <DescriptionList.Item title="Format">{anime.mediaFormatLocalized}</DescriptionList.Item>
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
                                    {anime.resources.edges
                                        .sort(
                                            sortTransformed(
                                                either(resourceSiteComparator).or(resourceAsComparator).chain(),
                                                (resource) => ({ ...resource.node, ...resource }),
                                            ),
                                        )
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
                        <Text color="text-disabled"> ({anime.themes?.length || 0})</Text>
                    </Text>
                    {anime.themes?.length ? (
                        <AnimeThemeFilter themes={anime.themes.map((theme) => ({ ...theme, anime }))} />
                    ) : (
                        <Text as="p">There are no themes for this anime, yet.</Text>
                    )}
                </Column>
            </SidebarContainer>
        </>
    );
}

const buildTimeCache: Map<string, ResultOf<typeof propsQuery>> = new Map();

export const getStaticProps: GetStaticProps<AnimeDetailPageProps, AnimeDetailPageParams> = async ({ params }) => {
    const client = createApolloClient();

    let data = params ? buildTimeCache.get(params.animeSlug) : null;

    if (!data) {
        data =
            (
                await client.query({
                    query: graphql(`
                        query AnimeDetailPage($animeSlug: String!) {
                            animePaginator(slug: $animeSlug) {
                                data {
                                    ...AnimeDetailPageAnime
                                }
                            }
                        }
                    `),
                    variables: params,
                })
            ).data.animes.data?.[0] ?? null;
    }

    if (!data) {
        return {
            notFound: true,
        };
    }

    return {
        props: {
            ...getSharedPageProps(1),
            anime: data.anime,
            synopsisMarkdownSource: data.anime.synopsis
                ? (await serializeMarkdownSafe(data.anime.synopsis)).source
                : null,
        },
        // Revalidate after 1 hour (= 3600 seconds).
        revalidate: 3600,
    };
};

export const getStaticPaths: GetStaticPaths<AnimeDetailPageParams> = () => {
    return fetchStaticPaths(async () => {
        const client = createApolloClient();

        const { data } = await client.query({
            query: graphql(`
                query AnimeDetailPageAll {
                    animePaginator {
                        data {
                            slug
                            ...AnimeDetailPageAnime
                        }
                    }
                }
            `),
        });

        data.animes.data.forEach((anime) => buildTimeCache.set(anime.slug, getFragmentData(propsQuery, anime)));

        return data.animes.data.map((anime) => ({
            params: {
                animeSlug: anime.slug,
            },
        }));
    });
};
