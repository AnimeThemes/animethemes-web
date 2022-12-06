import { useState } from "react";
import Link from "next/link";
import styled from "styled-components";
import { ExternalLink } from "components/external-link";
import { DescriptionList } from "components/description-list";
import { Text } from "components/text";
import { Column } from "components/box";
import { SidebarContainer } from "components/container";
import { Card, ThemeDetailCard } from "components/card";
import { HeightTransition } from "components/utils";
import { CoverImage } from "components/image";
import { AnimeThemeFilter } from "components/filter";
import { SEO } from "components/seo";
import extractImages from "utils/extractImages";
import {
    either,
    resourceAsComparator,
    resourceSiteComparator,
    seriesNameComparator,
    studioNameComparator
} from "utils/comparators";
import fetchStaticPaths from "utils/fetchStaticPaths";
import type { SharedPageProps } from "utils/getSharedPageProps";
import getSharedPageProps from "utils/getSharedPageProps";
import type { GetStaticPaths, GetStaticProps } from "next";
import type { ParsedUrlQuery } from "querystring";
import { fetchData } from "lib/server";
import gql from "graphql-tag";
import type { AnimeDetailPageAllQuery, AnimeDetailPageQuery, AnimeDetailPageQueryVariables } from "generated/graphql";
import type { RequiredNonNullable } from "utils/types";

const StyledList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    
    text-align: center;
`;

interface AnimeDetailPageProps extends SharedPageProps, RequiredNonNullable<AnimeDetailPageQuery> {}

interface AnimeDetailPageParams extends ParsedUrlQuery {
    animeSlug: string
}

export default function AnimeDetailPage({ anime }: AnimeDetailPageProps) {
    const [collapseSynopsis, setCollapseSynopsis] = useState(true);
    const { largeCover } = extractImages(anime);

    return <>
        <SEO title={anime.name} image={largeCover}/>
        <Text variant="h1">{anime.name}</Text>
        <SidebarContainer>
            <Column style={{ "--gap": "24px" }}>
                <CoverImage resourceWithImages={anime} alt={`Cover image of ${anime.name}`}/>
                <DescriptionList>
                    {anime.synonyms.length ? (
                        <DescriptionList.Item title="Alternative Titles">
                            <StyledList>
                                {anime.synonyms.map((synonym) => (
                                    <Text key={synonym.text}>{synonym.text}</Text>
                                ))}
                            </StyledList>
                        </DescriptionList.Item>
                    ) : null}
                    <DescriptionList.Item title="Premiere">
                        <Link
                            href={`/year/${anime.year}${anime.season ? `/${anime.season.toLowerCase()}` : ""}`}
                            passHref
                            legacyBehavior>
                            <Text as="a" link>
                                {(anime.season ? anime.season + " " : "") + anime.year}
                            </Text>
                        </Link>
                    </DescriptionList.Item>
                    {anime.series?.length ? (
                        <DescriptionList.Item title="Series">
                            <StyledList>
                                {anime.series.sort(seriesNameComparator).map((series) =>
                                    <Link
                                        key={series.slug}
                                        href={`/series/${series.slug}`}
                                        passHref
                                        legacyBehavior>
                                        <Text as="a" link>
                                            {series.name}
                                        </Text>
                                    </Link>
                                )}
                            </StyledList>
                        </DescriptionList.Item>
                    ) : null}
                    {anime.studios?.length ? (
                        <DescriptionList.Item title="Studios">
                            <StyledList>
                                {anime.studios.sort(studioNameComparator).map((studio) =>
                                    <Link
                                        key={studio.slug}
                                        href={`/studio/${studio.slug}`}
                                        passHref
                                        legacyBehavior>
                                        <Text as="a" link>
                                            {studio.name}
                                        </Text>
                                    </Link>
                                )}
                            </StyledList>
                        </DescriptionList.Item>
                    ) : null}
                    {anime.resources?.length ? (
                        <DescriptionList.Item title="Links">
                            <StyledList>
                                {anime.resources.sort(either(resourceSiteComparator).or(resourceAsComparator).chain()).map((resource) => (
                                    <ExternalLink key={resource.link} href={resource.link}>
                                        {resource.site}{!!resource.as && ` (${resource.as})`}
                                    </ExternalLink>
                                ))}
                            </StyledList>
                        </DescriptionList.Item>
                    ) : null}
                </DescriptionList>
            </Column>
            <Column style={{ "--gap": "24px" }}>
                {!!anime.synopsis && (
                    <>
                        <Text variant="h2">Synopsis</Text>
                        <Card hoverable onClick={() => setCollapseSynopsis(!collapseSynopsis)}>
                            <HeightTransition>
                                <Text
                                    as="p"
                                    maxLines={collapseSynopsis ? 2 : null}
                                    dangerouslySetInnerHTML={{ __html: anime.synopsis }}
                                />
                            </HeightTransition>
                        </Card>
                    </>
                )}
                <Text variant="h2">
                    Themes
                    <Text color="text-disabled"> ({anime.themes?.length || 0})</Text>
                </Text>
                {
                    anime.themes?.length
                        ? <AnimeThemeFilter themes={anime.themes.map((theme) => ({ ...theme, anime }))}/>
                        : <Text as="p">There are no themes for this anime, yet.</Text>
                }
            </Column>
        </SidebarContainer>
    </>;
}

AnimeDetailPage.fragments = {
    anime: gql`
        ${extractImages.fragments.resourceWithImages}
        ${ThemeDetailCard.fragments.theme}

        fragment AnimeDetailPageAnime on Anime {
            ...extractImagesResourceWithImages
            slug
            name
            season
            year
            synopsis
            synonyms {
                text
            }
            series {
                slug
                name
            }
            studios {
                slug
                name
            }
            resources {
                site
                link
                as
            }
            themes {
                ...ThemeDetailCardTheme
            }
        }
    `,
};

const buildTimeCache: Map<string, AnimeDetailPageQuery> = new Map();

export const getStaticProps: GetStaticProps<AnimeDetailPageProps, AnimeDetailPageParams> = async ({ params }) => {
    let data = params ? buildTimeCache.get(params.animeSlug) : null;
    let apiRequests = 0;

    if (!data) {
        ({ data, apiRequests } = await fetchData<AnimeDetailPageQuery, AnimeDetailPageQueryVariables>(gql`
            ${AnimeDetailPage.fragments.anime}

            query AnimeDetailPage($animeSlug: String!) {
                anime(slug: $animeSlug) {
                    ...AnimeDetailPageAnime
                }
            }
        `, params));
    }

    if (!data.anime) {
        return {
            notFound: true
        };
    }

    return {
        props: {
            ...getSharedPageProps(apiRequests),
            anime: data.anime
        },
        // Revalidate after 1 hour (= 3600 seconds).
        revalidate: 3600
    };
};

export const getStaticPaths: GetStaticPaths<AnimeDetailPageParams> = () => {
    return fetchStaticPaths(async () => {
        const { data } = await fetchData<AnimeDetailPageAllQuery>(gql`
            ${AnimeDetailPage.fragments.anime}

            query AnimeDetailPageAll {
                animeAll {
                    ...AnimeDetailPageAnime
                }
            }
        `);

        data.animeAll.forEach((anime) => buildTimeCache.set(anime.slug, { anime }));

        return data.animeAll.map((anime) => ({
            params: {
                animeSlug: anime.slug
            }
        }));
    });
};
