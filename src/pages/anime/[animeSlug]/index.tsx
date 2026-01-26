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
import { compare, seriesNameComparator, studioNameComparator } from "@/utils/comparators";
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

const fragments = {
    anime: graphql(`
        fragment AnimeDetailPageAnime on Anime {
            slug
            name
            season
            seasonLocalized
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
                ...AnimeThemeFilterTheme
            }
        }
    `),
};

const propsQuery = graphql(`
    query AnimeDetailPage($animeSlug: String!) {
        anime(slug: $animeSlug) {
            ...AnimeDetailPageAnime
        }
    }
`);

const pathsQuery = graphql(`
    query AnimeDetailPageAll {
        animePagination {
            data {
                ...AnimeDetailPageAnime
                slug
            }
        }
    }
`);

interface AnimeDetailPageProps extends SharedPageProps {
    anime: FragmentType<typeof fragments.anime>;
    synopsisMarkdownSource: MDXRemoteSerializeResult | null;
}

interface AnimeDetailPageParams extends ParsedUrlQuery {
    animeSlug: string;
}

export default function AnimeDetailPage({ anime: animeFragment, synopsisMarkdownSource }: AnimeDetailPageProps) {
    const anime = getFragmentData(fragments.anime, animeFragment);

    const [collapseSynopsis, setCollapseSynopsis] = useState(true);
    const { smallCover, largeCover } = extractImages(anime.images.nodes);

    return (
        <>
            <SEO title={anime.name} image={largeCover} />
            <Text variant="h1">{anime.name}</Text>
            <SidebarContainer>
                <Column style={{ "--gap": "24px" }}>
                    <CoverImage smallCover={smallCover} largeCover={largeCover} alt={`Cover image of ${anime.name}`} />
                    <DescriptionList>
                        {anime.animesynonyms.length ? (
                            <DescriptionList.Item title="Alternative Titles">
                                <StyledList>
                                    {anime.animesynonyms.map((synonym) => (
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
                        <Text color="text-disabled"> ({anime.animethemes.length || 0})</Text>
                    </Text>
                    {anime.animethemes.length ? (
                        <AnimeThemeFilter themes={anime.animethemes} />
                    ) : (
                        <Text as="p">There are no themes for this anime, yet.</Text>
                    )}
                </Column>
            </SidebarContainer>
        </>
    );
}

const buildTimeCache: Map<string, FragmentType<typeof fragments.anime>> = new Map();

export const getStaticProps: GetStaticProps<AnimeDetailPageProps, AnimeDetailPageParams> = async ({ params }) => {
    const client = createApolloClient();

    let animeFragment = params ? buildTimeCache.get(params.animeSlug) : null;

    if (!animeFragment) {
        animeFragment = (
            await client.query({
                query: propsQuery,
                variables: params,
            })
        ).data.anime;
    }

    if (!animeFragment) {
        return {
            notFound: true,
        };
    }

    const anime = getFragmentData(fragments.anime, animeFragment);

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

        const { data } = await client.query({
            query: pathsQuery,
        });

        for (const anime of data.animePagination.data) {
            buildTimeCache.set(anime.slug, anime);
        }

        return data.animePagination.data.map((anime) => ({
            params: {
                animeSlug: anime.slug,
            },
        }));
    });
};
