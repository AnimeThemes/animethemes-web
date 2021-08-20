import { graphql, Link } from "gatsby";
import { ThemeSummaryCard } from "components/card";
import { Box, Grid } from "components/box";
import { Text } from "components/text";
import styled from "styled-components";
import { Button } from "components/button";
import { Icon } from "components/icon";
import { faArrowRight, faRandom, faSearch, faTv } from "@fortawesome/free-solid-svg-icons";
import theme from "theme";
import { ExternalLink } from "components/external-link";
import useCurrentSeason from "hooks/useCurrentSeason";
import navigateToRandomTheme from "utils/navigateToRandomTheme";

const videoBaseUrl = process.env.GATSBY_VIDEO_URL || "https://animethemes.moe";

const FeaturedTheme = styled(Box)`
    display: flex;
    justify-content: center;
    align-items: center;
    
    max-height: 200px;
    position: relative;
    overflow: hidden;
    
    @media (min-width: ${theme.breakpoints[0]}) {
        border-radius: 0.5rem;
    }
    
    & > :last-child {
        position: absolute;
        
        @media (max-width: ${theme.breakpoints[0]}) {
            left: 1rem;
            right: 1rem;   
        }
    }
`;

const FeaturedVideo = styled.video`
    width: 100%;
    filter: blur(5px);
`;

const BigButton = styled(Button).attrs({
    gapsRow: "0.5rem"
})`
    overflow: hidden;
    border-radius: 0.5rem;
    height: ${(props) => props.height || "4rem"};
    justify-content: flex-end;
`;

const BigIcon = styled(Icon)`
    margin: 0 auto -1rem -2rem;
    
    font-size: 4rem;
    color: ${theme.colors["text-disabled"]};
`;

export default function HomePage({ data: { featuredTheme, recentlyAdded } }) {
    const featuredVideo = featuredTheme.entries[0].videos[0];

    const { currentYear, currentSeason } = useCurrentSeason();

    return (
        <Box gapsColumn="1.5rem">
            <Text variant="h1">Welcome, to AnimeThemes.moe!</Text>
            <Text variant="h2">Featured Theme</Text>
            <FeaturedTheme mx={[ "-1rem", 0 ]}>
                <FeaturedVideo
                    src={`${videoBaseUrl}/video/${featuredVideo.basename}`}
                    autoPlay
                    muted
                    loop
                />
                <ThemeSummaryCard theme={featuredTheme}/>
            </FeaturedTheme>
            <Grid gridTemplateColumns={[ "1fr", "1fr 1fr 1fr" ]} gridGap="1.5rem">
                <Box gridColumn={[ "1", "1 / 3" ]}>
                    <Text variant="h2">Explore The Database</Text>
                </Box>
                <Box gridRow={[ "6", "auto" ]}>
                    <Text variant="h2">Recently Added</Text>
                </Box>
                <BigButton as={Link} to="/search">
                    <BigIcon icon={faSearch} flip="horizontal"/>
                    <Text>Search</Text>
                    <Icon icon={faArrowRight} color="text-primary"/>
                </BigButton>
                <BigButton onClick={navigateToRandomTheme}>
                    <BigIcon icon={faRandom}/>
                    <Text>Play Random</Text>
                    <Icon icon={faArrowRight} color="text-primary"/>
                </BigButton>
                <BigButton as={Link} to={`/year/${currentYear}/${currentSeason}`}>
                    <BigIcon icon={faTv}/>
                    <Text>Current Season</Text>
                    <Icon icon={faArrowRight} color="text-primary"/>
                </BigButton>
                <Box gridColumn={[ "1", "1 / 3" ]} gapsColumn="1.5rem">
                    <Grid gridTemplateColumns={[ "1fr 1fr", "1fr 1fr 1fr" ]} gridGap="1rem">
                        <BigButton as={Link} to="/search/anime" height="3rem">
                            <Text>Anime Index</Text>
                            <Icon icon={faArrowRight} color="text-primary"/>
                        </BigButton>
                        <BigButton as={Link} to="/search/artist" height="3rem">
                            <Text>Artist Index</Text>
                            <Icon icon={faArrowRight} color="text-primary"/>
                        </BigButton>
                        <BigButton as={Link} to="/year" height="3rem">
                            <Text>Year Index</Text>
                            <Icon icon={faArrowRight} color="text-primary"/>
                        </BigButton>
                    </Grid>
                    <Text variant="h2">About The Project</Text>
                    <Text as="p">
                        A simple and consistent repository of anime opening and ending themes.
                        We provide high quality WebMs of your favorite OPs and EDs for your listening and discussion needs.
                    </Text>
                    <Text as="p">
                        <span>This page is still activily being worked on. If you are a developer and interested in contributing feel free to contact us on </span>
                        <ExternalLink href="https://discordapp.com/invite/m9zbVyQ">Discord</ExternalLink>
                        <span>.</span>
                    </Text>
                    <Text as="p">
                        <span>The source code for this page can be found on </span>
                        <ExternalLink href="https://github.com/AnimeThemes/animethemes-web">GitHub</ExternalLink>
                        <span>. For our other open source projects we also have a </span>
                        <ExternalLink href="https://github.com/AnimeThemes">GitHub organization</ExternalLink>
                        <span>.</span>
                    </Text>
                </Box>
                <Box gapsColumn="1rem">
                    {recentlyAdded.nodes.map((theme, index) => (
                        <ThemeSummaryCard key={index} theme={theme}/>
                    ))}
                </Box>
            </Grid>
        </Box>
    );
}

export const query = graphql`
    query HomePageQuery {
        featuredTheme: theme(idRaw: { eq: 10388 }) {
            slug
            anime {
                slug
                name
                images {
                    facet
                    link
                }
            }
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
            entries {
                videos {
                    basename
                }
            }
            ...VideoSlug
        }
        recentlyAdded: allTheme(sort: { fields: idRaw, order: DESC }, limit: 10) {
            nodes {
                slug
                anime {
                    slug
                    name
                    images {
                        facet
                        link
                    }
                }
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
                entries {
                    videos {
                        basename
                    }
                }
                ...VideoSlug
            }
        }
    }
`;
