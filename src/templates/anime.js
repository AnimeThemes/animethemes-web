import React from "react";
import { graphql, Link } from "gatsby";
import styled from "styled-components";
import ExternalLink from "../components/externalLink";
import DescriptionList from "components/descriptionList";
import Text from "components/text";
import Title from "components/text/title";
import { Box } from "components/flex";
import ContainerSidebar from "components/container/sidebar";
import CollapseCard from "components/card/collapse";
import { fullWidth, gapsColumn } from "styles/mixins";
import ThemeSwitcher from "components/switcher/theme";
import SEO from "components/seo";
import useImage from "hooks/useImage";

const StyledAnimePage = styled.div`
    ${gapsColumn("1.5rem")}
`;
const StyledCover = styled.img(fullWidth);
const StyledList = styled.div`
    display: flex;
    flex-direction: column;

    ${gapsColumn("0.5rem")}

    text-align: center;
`;

export default function AnimeDetailPage({ data: { anime } }) {
    const { largeCover } = useImage(anime);

    const sidebar = (
        <Box gapsColumn="1.5rem">
            <StyledCover src={largeCover} alt="Cover"/>
            <DescriptionList>
                {{
                    "Alternative Titles": (
                        !!anime.synonyms.length && (
                            <StyledList>
                                {anime.synonyms.map((synonym) => (
                                    <Text key={synonym}>{synonym}</Text>
                                ))}
                            </StyledList>
                        )
                    ),
                    "Premiere": (
                        <Link to={`/year/${anime.year}${anime.season ? `/${anime.season.toLowerCase()}` : ""}`}>
                            <Text link>
                                {(anime.season ? anime.season + " " : "") + anime.year}
                            </Text>
                        </Link>
                    ),
                    "Series": (
                        !!anime.series && !!anime.series.length && (
                            <StyledList>
                                {anime.series.map((series) =>
                                    <Link key={series.slug} to={`/series/${series.slug}`}>
                                        <Text link>
                                            {series.name}
                                        </Text>
                                    </Link>
                                )}
                            </StyledList>
                        )
                    ),
                    "Links": (
                        !!anime.resources && !!anime.resources.length && (
                            <StyledList>
                                {anime.resources.map((resource) => (
                                    <ExternalLink key={resource.link} href={resource.link}>
                                        {resource.site}
                                    </ExternalLink>
                                ))}
                            </StyledList>
                        )
                    )
                }}
            </DescriptionList>
        </Box>
    );

    return (
        <StyledAnimePage>
            <SEO title={anime.name} />
            <Title>{anime.name}</Title>
            <ContainerSidebar sidebar={sidebar}>
                <Box gapsColumn="1rem">
                    <Title variant="section">Synopsis</Title>
                    <CollapseCard>
                        {(collapse) => (
                            <Text maxLines={collapse ? 2 : null} dangerouslySetInnerHTML={{ __html: anime.synopsis }}/>
                        )}
                    </CollapseCard>
                    <Title variant="section">Themes</Title>
                    {
                        !!anime.themes && anime.themes.length
                            ? <ThemeSwitcher themes={anime.themes}/>
                            : <Text>There are no themes for this anime.</Text>
                    }
                </Box>
            </ContainerSidebar>
        </StyledAnimePage>
    );
}

export const query = graphql`
    query($slug: String!) {
        anime(slug: { eq: $slug }) {
            name
            year
            season
            synopsis
            synonyms
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
