import { useState } from "react";
import Link from "next/link";
import styled from "styled-components";
import { ExternalLink } from "components/external-link";
import { DescriptionList } from "components/description-list";
import { Text } from "components/text";
import { Column } from "components/box";
import { SidebarContainer } from "components/container";
import { Card } from "components/card";
import { HeightTransition } from "components/utils";
import { CoverImage } from "components/image";
import { AnimeThemeFilter } from "components/filter";
import { fetchData } from "lib/server";
import { SEO } from "components/seo";
import useImage from "hooks/useImage";
import {
    chain,
    resourceAsComparator,
    resourceSiteComparator,
    seriesNameComparator,
    studioNameComparator
} from "utils/comparators";
import fetchStaticPaths from "utils/fetchStaticPaths";
import gql from "graphql-tag";
import getSharedPageProps from "utils/getSharedPageProps";

const StyledList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    
    text-align: center;
`;

export default function AnimeDetailPage({ anime }) {
    const [collapseSynopsis, setCollapseSynopsis] = useState(true);
    const { largeCover } = useImage(anime);

    return (
        <>
            <SEO title={anime.name} image={largeCover}/>
            <Text variant="h1">{anime.name}</Text>
            <SidebarContainer>
                <Column style={{ "--gap": "24px" }}>
                    <CoverImage resourceWithImages={anime} alt={`Cover image of ${anime.name}`}/>
                    <DescriptionList>
                        {!!anime.synonyms.length && (
                            <DescriptionList.Item title="Alternative Titles">
                                <StyledList>
                                    {anime.synonyms.map((synonym) => (
                                        <Text key={synonym.text}>{synonym.text}</Text>
                                    ))}
                                </StyledList>
                            </DescriptionList.Item>
                        )}
                        <DescriptionList.Item title="Premiere">
                            <Link href={`/year/${anime.year}${anime.season ? `/${anime.season.toLowerCase()}` : ""}`} passHref prefetch={false}>
                                <Text as="a" link>
                                    {(anime.season ? anime.season + " " : "") + anime.year}
                                </Text>
                            </Link>
                        </DescriptionList.Item>
                        {!!anime.series?.length && (
                            <DescriptionList.Item title="Series">
                                <StyledList>
                                    {anime.series.sort(seriesNameComparator).map((series) =>
                                        <Link key={series.slug} href={`/series/${series.slug}`} passHref prefetch={false}>
                                            <Text as="a" link>
                                                {series.name}
                                            </Text>
                                        </Link>
                                    )}
                                </StyledList>
                            </DescriptionList.Item>
                        )}
                        {!!anime.studios?.length && (
                            <DescriptionList.Item title="Studios">
                                <StyledList>
                                    {anime.studios.sort(studioNameComparator).map((studio) =>
                                        <Link key={studio.slug} href={`/studio/${studio.slug}`} passHref prefetch={false}>
                                            <Text as="a" link>
                                                {studio.name}
                                            </Text>
                                        </Link>
                                    )}
                                </StyledList>
                            </DescriptionList.Item>
                        )}
                        {!!anime.resources?.length && (
                            <DescriptionList.Item title="Links">
                                <StyledList>
                                    {anime.resources.sort(chain(resourceSiteComparator, resourceAsComparator)).map((resource) => (
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
                        !!anime.themes?.length
                            ? <AnimeThemeFilter themes={anime.themes}/>
                            : <Text as="p">There are no themes for this anime, yet.</Text>
                    }
                </Column>
            </SidebarContainer>
        </>
    );
}

export async function getStaticProps({ params: { animeSlug } }) {
    const { data, apiRequests } = await fetchData(`
        #graphql

        query($animeSlug: String!) {
            anime(slug: $animeSlug) {
                name
                year
                season
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
                themes {
                    id
                    group
                    slug
                    type
                    sequence
                    song {
                        title
                        performances {
                            artist {
                                slug
                                name
                            }
                            as
                        }
                    }
                    anime {
                        slug
                        name
                        images {
                            facet
                            link
                        }
                    }
                    entries {
                        episodes
                        nsfw
                        spoiler
                        version
                        videos {
                            filename
                            lyrics
                            nc
                            overlap
                            resolution
                            source
                            subbed
                            uncen
                            tags
                        }
                    }
                }
                resources {
                    link
                    site
                    as
                }
                images {
                    facet
                    link
                }
            }
        }
    `, {
        animeSlug
    });

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
}

export async function getStaticPaths() {
    return fetchStaticPaths(async () => {
        const { data } = await fetchData(gql`
            query {
                animeAll {
                    id
                    slug
                }
            }
        `);

        return data.animeAll.map((anime) => ({
            params: {
                animeSlug: anime.slug
            }
        }));
    });
}
