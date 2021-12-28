import React from "react";
import Link from "next/link";
import { Text } from "components/text";
import styled from "styled-components";
import { Box, Flex, Grid } from "components/box";
import { ExternalLink } from "components/external-link";
import { fetchData } from "lib/server";
import { Listbox } from "components/listbox";
import { SearchFilterGroup } from "components/search-filter";
import useSetting from "hooks/useSetting";
import { showAnnouncementsSetting } from "utils/settings";

const StyledLink = styled.a`
    max-width: 100%;
`;

export default function DevelopmentPage({ counter }) {
    const [showAnnouncementsSettingValue, setShowAnnouncementsSettingValue] = useSetting(showAnnouncementsSetting);

    return (
        <Box gapsColumn="1.5rem">
            <Text variant="h1">Development Hub</Text>
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
            <Text variant="h2">Pages</Text>
            <Box gapsColumn={["2rem", "1.5rem"]}>
                <PageGridItem
                    path="/"
                    description={
                        <Text>
                            <Text variant="small" color="text-primary" letterSpacing="0.1rem">NEW: </Text>
                            The new home page of AnimeThemes.
                        </Text>
                    }
                />
                <PageGridItem
                    path="/dev"
                    description="This page!"
                />
                <PageGridItem
                    path="/design"
                    description="A page listing various design components."
                    isNew
                />
                <PageGridItem
                    path="/search"
                    description="Search the AnimeThemes database."
                    otherPaths={{
                        "/search/anime": "Search only for anime or explore the list of all anime.",
                        "/search/theme": "Search only for themes or explore the list of all themes.",
                        "/search/artist": "Search only for artists or explore the list of all artists.",
                        "/search/series": (
                            <Text>
                                <Text variant="small" color="text-primary" letterSpacing="0.1rem">NEW: </Text>
                                Search only for series or explore the list of all series.
                            </Text>
                        ),
                        "/search/studio": (
                            <Text>
                                <Text variant="small" color="text-primary" letterSpacing="0.1rem">NEW: </Text>
                                Search only for studios or explore the list of all studios.
                            </Text>
                        ),
                    }}
                />
                <PageGridItem
                    path="/year"
                    description="Browse all years present in the database."
                />
                <PageGridItem
                    path="/year/2009"
                    description={(
                        <Text>
                            Browse all seasons of a specific year.
                            <Text color="text-disabled"> ({ counter.year } pages)</Text>
                        </Text>
                    )}
                    otherPaths={{
                        "/year/1963": "Every year has a page, even 60s, 70s, etc."
                    }}
                />
                <PageGridItem
                    path="/year/2009/summer"
                    description={(
                        <Text>
                            Browse all anime of a specific season.
                            <Text color="text-disabled"> ({ counter.season } pages)</Text>
                        </Text>
                    )}
                />
                <PageGridItem
                    path="/series/monogatari"
                    description={(
                        <Text>
                            Browse all anime which belong to the same series.
                            <Text color="text-disabled"> ({ counter.series } pages)</Text>
                        </Text>
                    )}
                    otherPaths={{
                        "/series/precure": "A lot of anime.",
                        "/series/clannad": "Only three anime.",
                        "/series/fma": "Only two anime."
                    }}
                />
                <PageGridItem
                    path="/studio/kyoto_animation"
                    description={
                        <Text>
                            <Text variant="small" color="text-primary" letterSpacing="0.1rem">NEW: </Text>
                            Browse all anime which were produced by the same studio.
                            <Text color="text-disabled"> ({ counter.studio } pages)</Text>
                        </Text>
                    }
                />
                <PageGridItem
                    path="/artist/kana_hanazawa"
                    description={(
                        <Text>
                            Browse all songs an artist has performed.
                            <Text color="text-disabled"> ({ counter.artist } pages)</Text>
                        </Text>
                    )}
                    otherPaths={{
                        "/artist/vickeblanka": "Very few songs."
                    }}
                />
                <PageGridItem
                    path="/anime/bakemonogatari"
                    description={(
                        <Text>
                            Browse all themes of a specific anime.
                            <Text color="text-disabled"> ({ counter.anime } pages)</Text>
                        </Text>
                    )}
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
                    description={(
                        <Text>
                            Watch themes.
                            <Text color="text-disabled"> ({ counter.video } pages)</Text>
                        </Text>
                    )}
                    otherPaths={{
                        "/anime/uma_musume_pretty_derby/ED5": "Many artists.",
                        "/anime/girls_und_panzer/ED-NCBD1080": "Many alternative versions.",
                        "/anime/fatekaleid_liner_prismaillya_2wei_herz/OP": "Many alternative sources.",
                        "/anime/shingeki_no_kyojin/ED1-NCBD1080": "Same video for two entries.",
                        "/anime/shingeki_no_kyojin_ova/ED1-NCBD1080": "See above."
                    }}
                />
                <PageGridItem
                    path="/bracket/best-anime-opening-ix-salty-arrow"
                    description={
                        <Text>
                            <Text variant="small" color="text-primary" letterSpacing="0.1rem">NEW: </Text>
                            Explore every theme competing in one of the brackets hosted at AnimeBracket.
                        </Text>
                    }
                />
            </Box>
            <Text variant="h2">Settings</Text>
            <SearchFilterGroup>
                <Flex flexDirection="column" alignItems="stretch" gapsColumn="0.5rem">
                    <Text>Show Announcements</Text>
                    <Listbox
                        options={Object.values(showAnnouncementsSetting.values)}
                        selectedValue={showAnnouncementsSettingValue}
                        defaultValue={showAnnouncementsSettingValue}
                        onSelect={setShowAnnouncementsSettingValue}
                    />
                </Flex>
            </SearchFilterGroup>
        </Box>
    );
}

function PageGridItem({ path, otherPaths = {}, description }) {
    return (
        <Grid gridTemplateColumns={["minmax(0, 1fr)", "minmax(0, 1fr) 1fr"]} gridColumnGap="1rem" gridRowGap="0.5rem" alignItems="center" justifyItems="flex-start">
            <PageLink path={path}/>
            <Text>{description}</Text>
            {Object.entries(otherPaths).map(([path, description]) => (
                <React.Fragment key={path}>
                    <PageLink path={path}/>
                    <Text color="text-muted">{description}</Text>
                </React.Fragment>
            ))}
        </Grid>
    );
}

function PageLink({ path }) {
    return (
        <Link key={path} href={path} passHref>
            <StyledLink to={path}>
                <Text variant="code" link maxLines={1}>{path}</Text>
            </StyledLink>
        </Link>
    );
}

export async function getStaticProps() {
    const { data } = await fetchData(`
        #graphql

        query {
            counter {
                anime
                artist
                series
                studio
                video
                year
                season
            }
        }
    `);

    return {
        props: {
            counter: data.counter
        },
        revalidate: 60
    };
}
