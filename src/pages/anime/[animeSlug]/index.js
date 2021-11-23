import { useState } from "react";
import Link from "next/link";
import styled from "styled-components";
import { ExternalLink } from "components/external-link";
import { DescriptionList } from "components/description-list";
import { Text } from "components/text";
import { Box } from "components/box";
import { SidebarContainer } from "components/container";
import { gapsColumn } from "styles/mixins";
import { Card } from "components/card";
import { HeightTransition } from "components/utils";
import { CoverImage } from "components/image";
import { AnimeThemeFilter } from "components/filter";
import { fetchData } from "lib/server";
import { SEO } from "components/seo";
import useImage from "hooks/useImage";

const StyledList = styled.div`
  display: flex;
  flex-direction: column;

  ${gapsColumn("0.5rem")}

  text-align: center;
`;

export default function AnimeDetailPage({ anime }) {
    const [collapseSynopsis, setCollapseSynopsis] = useState(true);
    const { largeCover } = useImage(anime);

    return (
        <Box gapsColumn="1.5rem">
            <SEO title={anime.name} image={largeCover}/>
            <Text variant="h1">{anime.name}</Text>
            <SidebarContainer>
                <Box gapsColumn="1.5rem">
                    <CoverImage resourceWithImages={anime}/>
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
                            <Link href={`/year/${anime.year}${anime.season ? `/${anime.season.toLowerCase()}` : ""}`} passHref>
                                <Text link>
                                    {(anime.season ? anime.season + " " : "") + anime.year}
                                </Text>
                            </Link>
                        </DescriptionList.Item>
                        {!!anime.series?.length && (
                            <DescriptionList.Item title="Series">
                                <StyledList>
                                    {anime.series.map((series) =>
                                        <Link key={series.slug} href={`/series/${series.slug}`} passHref>
                                            <Text link>
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
                                    {anime.studios.map((studio) =>
                                        <Link key={studio.slug} href={`/studio/${studio.slug}`} passHref>
                                            <Text link>
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
                                    {anime.resources.map((resource) => (
                                        <ExternalLink key={resource.link} href={resource.link}>
                                            {resource.site}
                                        </ExternalLink>
                                    ))}
                                </StyledList>
                            </DescriptionList.Item>
                        )}
                    </DescriptionList>
                </Box>
                <Box gapsColumn="1.5rem">
                    {!!anime.synopsis && (
                        <>
                            <Text variant="h2">Synopsis</Text>
                            <Card hoverable onClick={() => setCollapseSynopsis(!collapseSynopsis)}>
                                <HeightTransition>
                                    <Text as="p" maxLines={collapseSynopsis ? 2 : null}
                                        dangerouslySetInnerHTML={{ __html: anime.synopsis }}/>
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
                </Box>
            </SidebarContainer>
        </Box>
    );
}

export async function getStaticProps({ params: { animeSlug } }) {
    const { data } = await fetchData(`
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
            anime: data.anime
        },
        revalidate: 5 * 60
    };
}

export async function getStaticPaths() {
    const { data } = await fetchData(`
        #graphql

        query {
            animeAll {
                slug
            }
        }
    `);

    const paths = data.animeAll.map((anime) => ({
        params: {
            animeSlug: anime.slug
        }
    }));

    return {
        paths,
        fallback: "blocking"
    };
}
