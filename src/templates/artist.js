import React from "react";
import {graphql, Link} from "gatsby";
import styled from "styled-components";
import useAniList from "../hooks/useAniListArtist";
import ExternalLink from "../components/externalLink";
import DescriptionList from "components/descriptionList";
import Text from "components/text";
import Title from "components/text/title";
import Flex from "components/flex";
import ContainerSidebar from "components/container/sidebar";
import {fullWidth, gapsColumn} from "styles/mixins";
import ThemeSearchResultCard from "components/card/searchResult/theme";
import SEO from "../components/seo";

const StyledArtistPage = styled.div`
    ${gapsColumn("1.5rem")}
`;
const StyledCover = styled.img(fullWidth);
const StyledList = styled.div`
    display: flex;
    flex-direction: column;

    ${gapsColumn("0.5rem")}

    text-align: center;
`;

export default function ArtistDetailPage({ data: { artist } }) {
    const { image } = useAniList(artist);

    const performances = artist.performances.sort((a, b) => {
        return a.song.theme.anime.name.localeCompare(b.song.theme.anime.name);
    });

    const sidebar = (
        <Flex gapsColumn="1.5rem">
            <StyledCover src={image} alt="Cover"/>
            <DescriptionList>
                {{
                    "Members": (
                        !!artist.members && !!artist.members.length && (
                            <StyledList>
                                {artist.members.map((member) =>
                                    <Link to={`/artist/${member.slug}`}>
                                        <Text link>
                                            {member.name}
                                        </Text>
                                    </Link>
                                )}
                            </StyledList>
                        )
                    ),
                    "Member of": (
                        !!artist.groups && !!artist.groups.length && (
                            <StyledList>
                                {artist.groups.map((group) =>
                                    <Link to={`/artist/${group.slug}`}>
                                        <Text link>
                                            {group.name}
                                        </Text>
                                    </Link>
                                )}
                            </StyledList>
                        )
                    ),
                    "Links": (
                        artist.resources.map((resource) => (
                            <ExternalLink key={resource.link} href={resource.link}>
                                {resource.site}
                            </ExternalLink>
                        ))
                    )
                }}
            </DescriptionList>
        </Flex>
    );

    return (
        <StyledArtistPage>
            <SEO title={artist.name} />
            <Title>{artist.name}</Title>
            <ContainerSidebar sidebar={sidebar}>
                <Flex gapsColumn="1rem">
                    <Title variant="section">Song Perfomances</Title>
                    {performances.map((performance) => (
                        <ThemeSearchResultCard theme={{ ...performance.song.theme, song: performance.song }}/>
                    ))}
                </Flex>
            </ContainerSidebar>
        </StyledArtistPage>
    );
}

export const query = graphql`
    query($slug: String!) {
        artist(slug: { eq: $slug }) {
            name
            performances {
                song {
                    title
                    performances {
                        artist {
                            slug
                            name
                        }
                        as
                    }
                    theme {
                        slug
                        anime {
                            slug
                            name
                        }
                        entries {
                            videos {
                                filename
                            }
                        }
                    }
                }
            }
            resources {
                link
                site
            }
        }
    }
`;
