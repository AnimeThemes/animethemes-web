import { graphql, Link } from "gatsby";
import styled from "styled-components";
import { ExternalLink } from "components/external-link";
import { DescriptionList } from "components/description-list";
import { Text } from "components/text";
import { Box } from "components/box";
import { SidebarContainer } from "components/container";
import { gapsColumn } from "styles/mixins";
import { SEO } from "components/seo";
import { ThemeSummaryCard } from "components/card";
import { CoverImage } from "components/image";

const StyledList = styled.div`
    display: flex;
    flex-direction: column;

    ${gapsColumn("0.5rem")}

    text-align: center;
`;

export default function ArtistDetailPage({ data: { artist } }) {
    const themes = artist.performances
        .flatMap(
            (performance) => performance.song.themes.map(
                (theme) => ({ ...theme, song: performance.song })
            )
        )
        .sort((a, b) => a.anime.name.localeCompare(b.anime.name));

    return (
        <Box gapsColumn="1.5rem">
            <SEO title={artist.name} />
            <Text variant="h1">{artist.name}</Text>
            <SidebarContainer>
                <Box gapsColumn="1.5rem">
                    <CoverImage resourceWithImages={artist}/>
                    <DescriptionList>
                        {!!artist.members?.length && (
                            <DescriptionList.Item title="Members">
                                <StyledList>
                                    {artist.members.map(({ member }) =>
                                        <Link key={member.slug} to={`/artist/${member.slug}`}>
                                            <Text link>
                                                {member.name}
                                            </Text>
                                        </Link>
                                    )}
                                </StyledList>
                            </DescriptionList.Item>
                        )}
                        {!!artist.groups?.length && (
                            <DescriptionList.Item title="Member of">
                                <StyledList>
                                    {artist.groups.map(({ group }) =>
                                        <Link key={group.slug} to={`/artist/${group.slug}`}>
                                            <Text link>
                                                {group.name}
                                            </Text>
                                        </Link>
                                    )}
                                </StyledList>
                            </DescriptionList.Item>
                        )}
                        {!!artist.resources && !!artist.resources.length && (
                            <DescriptionList.Item title="Links">
                                <StyledList>
                                    {artist.resources.map((resource) => (
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
                    <Text variant="h2">Song Perfomances</Text>
                    <Box gapsColumn="1rem">
                        {themes.map((theme, index) => (
                            <ThemeSummaryCard key={index} theme={theme} artist={artist}/>
                        ))}
                    </Box>
                </Box>
            </SidebarContainer>
        </Box>
    );
}

export const query = graphql`
    query($slug: String!) {
        artist(slug: { eq: $slug }) {
            slug
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
                    themes {
                        slug
                        anime {
                            slug
                            name
                            images {
                                facet
                                link
                            }
                        }
                        ...VideoSlug
                    }
                }
            }
            members {
                member {
                    slug
                    name
                }
            }
            groups {
                group {
                    slug
                    name
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
`;
