import { graphql, Link } from "gatsby";
import { Text } from "components/text";
import styled from "styled-components";
import { Card } from "components/card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfo } from "@fortawesome/free-solid-svg-icons";
import { Box, Flex, Grid } from "components/box";
import { ExternalLink } from "components/external-link";
import theme from "theme";
import moment from "moment";
import { useEffect, useState } from "react";

const StyledAnnouncement = styled(Text)`
    & a {
        color: ${theme.colors["text-primary"]};
        font-weight: 600;
      
        &:hover {
            text-decoration: underline;
        }
    }
`;
const StyledLink = styled(Link)`
    max-width: 100%;
`;

export default function DevelopmentPage({ data: { site, allAnnouncement } }) {
    const [ timeSinceBuild, setTimeSinceBuild ] = useState();

    useEffect(() => {
        setTimeSinceBuild(moment(site.buildTime).fromNow());
    }, [ site.buildTime ]);

    return (
        <Box gapsColumn="1.5rem">
            <Text variant="h1">Development Hub</Text>
            <Text as="p" color="text-disabled">
                <span>This site was last updated: </span>
                <Text fontWeight="700">{site.buildTimeFormatted}</Text>
                {!!timeSinceBuild && (
                    <span> ({timeSinceBuild})</span>
                )}
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
            {!!allAnnouncement.totalCount && (
                <>
                    <Text variant="h2">Announcements</Text>
                    <Text as="p">These are for demo purposes only. The content may not be accurate.</Text>
                    {allAnnouncement.nodes.map((announcement) => (
                        <Card key={announcement.id}>
                            <Flex gapsRow="1rem">
                                <Text link>
                                    <FontAwesomeIcon icon={faInfo}/>
                                </Text>
                                <StyledAnnouncement dangerouslySetInnerHTML={{ __html: announcement.content }}/>
                            </Flex>
                        </Card>
                    ))}
                </>
            )}
            <Text variant="h2">Pages</Text>
            <Box gapsColumn={["2rem", "1.5rem"]}>
                <PageGridItem
                    path="/"
                    description="This page!"
                />
                <PageGridItem
                    path="/design"
                    description={
                        <Text>
                            <Text variant="small" color="text-primary" letterSpacing="0.1rem">NEW: </Text>
                            A page listing various design components!
                        </Text>
                    }
                    isNew
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
                    <Text variant="h2">GitHub Pages</Text>
                    <Text as="p">
                        <span>You are browsing this site on GitHub Pages. On every commit in the </span>
                        <Text as="a" variant="code" link href="https://github.com/AnimeThemes/animethemes-web">animethemes-web</Text>
                        <span> repository this site gets updated.</span>
                    </Text>
                    <Text as="p">Don&apos;t expect everything on this site to work the same way as on the staging/production sites.</Text>
                </>
            )}
        </Box>
    );
}

function PageGridItem({ path, otherPaths = {}, description }) {
    return (
        <Grid gridTemplateColumns={["minmax(0, 1fr)", "minmax(0, 1fr) 1fr"]} gridColumnGap="1rem" gridRowGap="0.5rem" alignItems="center" justifyItems="flex-start">
            <PageLink path={path}/>
            <Text>{description}</Text>
            {Object.entries(otherPaths).map(([path, description]) => (
                <>
                    <PageLink path={path}/>
                    <Text color="text-muted">{description}</Text>
                </>
            ))}
        </Grid>
    );
}

function PageLink({ path }) {
    return (
        <StyledLink key={path} to={path}>
            <Text variant="code" link maxLines={1}>{path}</Text>
        </StyledLink>
    )
}

export const query = graphql`
    query IndexPageQuery {
        site {
            buildTime
            buildTimeFormatted: buildTime(formatString: "LLL")
        }
        allAnnouncement {
            nodes {
                id
                content
            }
            totalCount
        }
    }
`;
