import { useState } from "react";
import { graphql, Link } from "gatsby";
import styled from "styled-components";
import { ExternalLink } from "components/external-link";
import { DescriptionList } from "components/description-list";
import { Text } from "components/text";
import { Box } from "components/box";
import { SidebarContainer } from "components/container";
import { gapsColumn } from "styles/mixins";
import { SEO } from "components/seo";
import { Card } from "components/card";
import { HeightTransition } from "components/utils";
import { CoverImage } from "components/image";
import { ThemeGroupFilter } from "components/filter";

const StyledList = styled.div`
    display: flex;
    flex-direction: column;

    ${gapsColumn("0.5rem")}

    text-align: center;
`;

export default function AnimeDetailPage({ data: { anime } }) {
    const [ collapseSynopsis, setCollapseSynopsis ] = useState(true);

    return (
        <Box gapsColumn="1.5rem">
            <SEO title={anime.name} />
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
                            <Link to={`/year/${anime.year}${anime.season ? `/${anime.season.toLowerCase()}` : ""}`}>
                                <Text link>
                                    {(anime.season ? anime.season + " " : "") + anime.year}
                                </Text>
                            </Link>
                        </DescriptionList.Item>
                        {!!anime.series && !!anime.series.length && (
                            <DescriptionList.Item title="Series">
                                <StyledList>
                                    {anime.series.map((series) =>
                                        <Link key={series.slug} to={`/series/${series.slug}`}>
                                            <Text link>
                                                {series.name}
                                            </Text>
                                        </Link>
                                    )}
                                </StyledList>
                            </DescriptionList.Item>
                        )}
                        {!!anime.resources && !!anime.resources.length && (
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
                    <Text variant="h2">Synopsis</Text>
                    <Card hoverable onClick={() => setCollapseSynopsis(!collapseSynopsis)}>
                        <HeightTransition>
                            <Text as="p" maxLines={collapseSynopsis ? 2 : null} dangerouslySetInnerHTML={{ __html: anime.synopsis }}/>
                        </HeightTransition>
                    </Card>
                    <Text variant="h2">Themes</Text>
                    {
                        !!anime.themes && anime.themes.length
                            ? <ThemeGroupFilter themes={anime.themes}/>
                            : <Text>There are no themes for this anime.</Text>
                    }
                </Box>
            </SidebarContainer>
        </Box>
    );
}

export const query = graphql`
    query($slug: String!) {
        anime(slug: { eq: $slug }) {
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
            themes {
                group
                slug
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
                    }
                }
                ...VideoSlug
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
`;
