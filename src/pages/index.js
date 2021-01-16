import {graphql, Link} from "gatsby";
import Title from "components/text/title";
import Text from "components/text";
import styled from "styled-components";
import {gapsColumn} from "styles/mixins";
import Card from "components/card";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faInfo} from "@fortawesome/free-solid-svg-icons";
import { Box, Flex, Grid } from "components/flex";
import theme from "theme";

const StyledIndexPage = styled.div`
    ${gapsColumn("1.5rem")}
`;
const StyledAnnouncement = styled(Text)`
    & a {
        color: ${(props) => props.theme.colors.secondaryTitle};
      
        &:hover {
            text-decoration: underline;
        }
    }
`;

export default function IndexPage({ data: { allAnnouncement } }) {
    return (
        <StyledIndexPage>
            <Title>Welcome, to AnimeThemes.moe!</Title>
            <Text as="p">
                <span>This page is still activily being worked on. If you are a developer and interested in contributing feel free to contact us on </span>
                <Text as="a" link href="https://discordapp.com/invite/m9zbVyQ">Discord</Text>
                <span>.</span>
            </Text>
            <Text as="p">
                <span>The source code for this page can be found </span>
                <Text as="a" link href="https://github.com/AnimeThemes/animethemes-web">here</Text>
                <span> and our other open source projects can be found in our </span>
                <Text as="a" link href="https://github.com/AnimeThemes">GitHub organization</Text>
                <span>.</span>
            </Text>
            {!!allAnnouncement.totalCount && (
                <>
                    <Title variant="section">Announcements</Title>
                    <Text as="p">These are for demo purposes only. The content may not be accurate.</Text>
                    {allAnnouncement.nodes.map((announcement) => (
                        <Card key={announcement.id}>
                            <Flex gapsRow="1rem">
                                <Text link>
                                    <FontAwesomeIcon icon={faInfo}/>
                                </Text>
                                <StyledAnnouncement dangerouslySetInnerHTML={{__html: announcement.content}}/>
                            </Flex>
                        </Card>
                    ))}
                </>
            )}
            <Title variant="section">Pages</Title>
            <Box gapsColumn={["2rem", "1rem"]}>
                <PageGridItem
                    path="/"
                    description="This page!"
                />
                <PageGridItem
                    path="/search"
                    description="Search the AnimeThemes database. You can also use the search bar in the navigation."
                />
                <PageGridItem
                    path="/year"
                    description="Browse all years present in the database."
                />
                <PageGridItem
                    path="/year/2009"
                    description="Browse all seasons of a specific year."
                    otherPaths={{
                        "/year/1963": "Every year has a page, even 60s, 70s, etc."
                    }}
                />
                <PageGridItem
                    path="/year/2009/summer"
                    description="Browse all anime of a specific season."
                />
                <PageGridItem
                    path="/series/monogatari"
                    description="Browse all anime which belong to the same series."
                    otherPaths={{
                        "/series/precure": "A lot of anime.",
                        "/series/clannad": "Only three anime.",
                        "/series/fma": "Only two anime."
                    }}
                />
                <PageGridItem
                    path="/artist/kana_hanazawa"
                    description="Browse all songs an artist has performed."
                    otherPaths={{
                        "/artist/vickeblanka": "Very few songs."
                    }}
                />
                <PageGridItem
                    path="/anime/bakemonogatari"
                    description="Browse all themes of a specific anime."
                    otherPaths={{
                        "/anime/etotama": "Many themes with a lot of artists.",
                        "/anime/gintama": "Theme groups with many themes.",
                        "/anime/bleach": "Many themes and many variants.",
                        "/anime/tales_of_phantasia_the_animation": "Many sources.",
                        "/anime/isekai_quartet": "Multiple series."
                    }}
                />
                <PageGridItem
                    path="/anime/bakemonogatari/OP1-NCBD1080"
                    description="Watch themes."
                    otherPaths={{
                        "/anime/uma_musume_pretty_derby/ED5": "Many artists.",
                        "/anime/girls_und_panzer/ED-NCBD1080": "Many alternative versions.",
                        "/anime/fatekaleid_liner_prismaillya_2wei_herz/OP": "Many alternative sources.",
                        "/anime/shingeki_no_kyojin/ED1-NCBD1080": "Same video for two entries.",
                        "/anime/shingeki_no_kyojin_ova/ED1-NCBD1080": "See above."
                    }}
                />
            </Box>
            {!!process.env.GATSBY_CI && (
                <>
                    <Title variant="section">GitHub Pages</Title>
                    <Text as="p">
                        <span>You are browsing this site on GitHub Pages. On every commit in the </span>
                        <Text as="a" code link href="https://github.com/AnimeThemes/animethemes-web">animethemes-web</Text>
                        <span> repository this site gets updated. This also comes with some limitations like </span>
                        <Text code>.htaccess</Text>
                        <span> files not working. So don&apos;t expect everything on this site to work the same way as on the production site.</span>
                    </Text>
                </>
            )}
        </StyledIndexPage>
    );
}

function PageGridItem({ path, otherPaths = {}, description }) {
    return (
        <Grid gridTemplateColumns={["minmax(0, 1fr)", "minmax(0, 1fr) 2fr"]} gridColumnGap="1rem" gridRowGap="0.5rem">
            <PageLink path={path}/>
            <Text>{description}</Text>
            {Object.entries(otherPaths).map(([path, description]) => (
                <>
                    <PageLink path={path}/>
                    <Text color={theme.colors.primaryMediumEmphasis}>{description}</Text>
                </>
            ))}
        </Grid>
    );
}

function PageLink({ path }) {
    return (
        <Link key={path} to={path}>
            <Text link block truncate>
                <Text link code>{path}</Text>
            </Text>
        </Link>
    )
}

export const query = graphql`
    query IndexPageQuery {
        allAnnouncement {
            nodes {
                id
                content
            }
            totalCount
        }
    }
`;
