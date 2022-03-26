import Link from "next/link";
import { ThemeSummaryCard } from "components/card";
import { Column } from "components/box";
import { Text } from "components/text";
import styled from "styled-components";
import { Button } from "components/button";
import { Icon } from "components/icon";
import { faArrowRight, faAward, faRandom, faSearch, faTv, faUser } from "@fortawesome/free-solid-svg-icons";
import theme from "theme";
import { ExternalLink } from "components/external-link";
import useCurrentSeason from "hooks/useCurrentSeason";
import navigateToRandomTheme from "utils/navigateToRandomTheme";
import { fetchData } from "lib/server";
import { SEO } from "components/seo";
import { FeaturedTheme } from "components/featured-theme";
import gql from "graphql-tag";

const BigButton = styled(Button)`
    justify-content: flex-end;
    height: var(--height, 64px);
    border-radius: 0.5rem;
    gap: 8px;
    overflow: hidden;
`;

const BigIcon = styled(Icon)`
    margin: 0 auto -1rem -2rem;
    
    font-size: 56px;
    color: ${theme.colors["text-disabled"]};
`;

const MainGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-areas: "a . b"
                         "c d e"
                         "f f g"
                         "h i g"
                         "j j g"
                         ". . g";
    grid-gap: 24px;
    
    @media (max-width: ${theme.breakpoints.mobileMax}) {
        grid-template-columns: 1fr;
        grid-template-areas: "a" "c" "d" "e" "h" "i" "f" "b" "g" "j";
    }
`;

const MainGridArea = styled.div`
    grid-area: ${(props) => props.area};
    
    display: flex;
    flex-direction: column;
`;

const SmallButtonGrid = styled.div`
    grid-area: f;
    
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 16px;

    @media (max-width: ${theme.breakpoints.mobileMax}) {
        grid-template-columns: 1fr 1fr;
    }
`;

const RecentlyAdded = styled(Column)`
    grid-area: g;
    
    gap: 16px;
`;

const About = styled(Column)`
    grid-area: j;
    
    gap: 24px;
`;

export default function HomePage({ featuredTheme, recentlyAdded }) {
    const { currentYear, currentSeason } = useCurrentSeason();

    return (
        <>
            <SEO/>
            <Text variant="h1">Welcome, to AnimeThemes.moe!</Text>

            <Text variant="h2">Featured Theme</Text>
            <FeaturedTheme theme={featuredTheme}/>

            <MainGrid style={{ "--gap": "16px" }}>
                <MainGridArea area="a">
                    <Text variant="h2">Explore The Database</Text>
                </MainGridArea>
                <MainGridArea area="b">
                    <Text variant="h2">Recently Added</Text>
                </MainGridArea>

                <RecentlyAdded>
                    {recentlyAdded.map((theme, index) => (
                        <ThemeSummaryCard key={index} theme={theme}/>
                    ))}
                </RecentlyAdded>

                <MainGridArea area="c">
                    <Link href="/search" passHref>
                        <BigButton forwardedAs="a">
                            <BigIcon icon={faSearch} flip="horizontal"/>
                            <Text>Search</Text>
                            <Icon icon={faArrowRight} color="text-primary"/>
                        </BigButton>
                    </Link>
                </MainGridArea>
                <MainGridArea area="d">
                    <BigButton onClick={navigateToRandomTheme}>
                        <BigIcon icon={faRandom}/>
                        <Text>Play Random</Text>
                        <Icon icon={faArrowRight} color="text-primary"/>
                    </BigButton>
                </MainGridArea>
                <MainGridArea area="e">
                    <Link href={(currentYear && currentSeason) ? `/year/${currentYear}/${currentSeason}` : "/"} passHref>
                        <BigButton forwardedAs="a">
                            <BigIcon icon={faTv}/>
                            <Text>Current Season</Text>
                            <Icon icon={faArrowRight} color="text-primary"/>
                        </BigButton>
                    </Link>
                </MainGridArea>
                <MainGridArea area="h">
                    <Link href="/event" passHref>
                        <BigButton forwardedAs="a">
                            <BigIcon icon={faAward}/>
                            <Text>Events</Text>
                            <Icon icon={faArrowRight} color="text-primary"/>
                        </BigButton>
                    </Link>
                </MainGridArea>
                <MainGridArea area="i">
                    <Link href="/profile" passHref>
                        <BigButton forwardedAs="a">
                            <BigIcon icon={faUser}/>
                            <Text>My Profile</Text>
                            <Icon icon={faArrowRight} color="text-primary"/>
                        </BigButton>
                    </Link>
                </MainGridArea>

                <SmallButtonGrid>
                    <Link href="/search/anime" passHref>
                        <BigButton forwardedAs="a" style={{ "--height": "48px" }}>
                            <Text>Anime Index</Text>
                            <Icon icon={faArrowRight} color="text-primary"/>
                        </BigButton>
                    </Link>
                    <Link href="/search/artist" passHref>
                        <BigButton forwardedAs="a" style={{ "--height": "48px" }}>
                            <Text>Artist Index</Text>
                            <Icon icon={faArrowRight} color="text-primary"/>
                        </BigButton>
                    </Link>
                    <Link href="/year" passHref>
                        <BigButton forwardedAs="a" style={{ "--height": "48px" }}>
                            <Text>Year Index</Text>
                            <Icon icon={faArrowRight} color="text-primary"/>
                        </BigButton>
                    </Link>
                </SmallButtonGrid>

                <About>
                    <Text variant="h2">About The Project</Text>
                    <Text as="p">
                        A simple and consistent repository of anime opening and ending themes.
                        We provide high quality WebMs of your favorite OPs and EDs for your listening and discussion needs.
                    </Text>
                    <Text as="p">
                        <span>This page is still actively being worked on. If you are a developer and interested in contributing feel free to contact us on </span>
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
                </About>
            </MainGrid>
        </>
    );
}

export async function getStaticProps() {
    const { data } = await fetchData(gql`
        ${FeaturedTheme.fragment}
        ${ThemeSummaryCard.fragments.theme}
        
        query {
            featuredTheme: theme(id: 10968) {
                ...FeaturedTheme_theme
            }
            recentlyAdded: themeAll(orderBy: "theme_id", orderDesc: true, limit: 10) {
                ...ThemeSummaryCard_theme
            }
        }
    `);

    return {
        props: {
            featuredTheme: data.featuredTheme,
            recentlyAdded: data.recentlyAdded
        },
        revalidate: 60
    };
}
