import { Fragment, useState } from "react";
import event from "lib/server/animeawards/index.json";
import { fetchData } from "lib/server";
import { SEO } from "components/seo";
import { Text } from "components/text";
import { Box, Flex, Grid } from "components/box";
import { ThemeSummaryCard } from "components/card";
import { Switcher } from "components/switcher";

export default function AnimeAwardsPage({ awards }) {
    const [ typeFilter, setTypeFilter ] = useState(null);

    return (
        <Box gapsColumn="1.5rem">
            <SEO title="/r/anime Awards" description="Listen to all themes nominated for the /r/anime Awards."/>
            <Text variant="h1">/r/anime Awards</Text>
            {awards.map((award) => (
                <Fragment key={award.year}>
                    <Flex alignItems="center" justifyContent="space-between">
                        <Text variant="h2">{award.year} Nominees</Text>
                        <Switcher
                            items={[ null, "op", "ed" ]}
                            selectedItem={typeFilter}
                            onChange={setTypeFilter}
                        />
                    </Flex>
                    <Grid gridTemplateColumns={[ "1fr", typeFilter ? "1fr" : "1fr 1fr" ]} gridGap="2rem">
                        {(typeFilter === null || typeFilter === "op") && (
                            <Box gapsColumn="1rem">
                                {award.nominees.openings.map((theme) => (
                                    <ThemeSummaryCard theme={theme} key={theme.anime.slug + theme.slug + theme.group}/>
                                ))}
                            </Box>
                        )}
                        {(typeFilter === null || typeFilter === "ed") && (
                            <Box gapsColumn="1rem">
                                {award.nominees.endings.map((theme) => (
                                    <ThemeSummaryCard theme={theme} key={theme.anime.slug + theme.slug + theme.group}/>
                                ))}
                            </Box>
                        )}
                    </Grid>
                </Fragment>
            ))}

        </Box>
    );
}

export async function getStaticProps() {
    const awards = await Promise.all(event.map(async (award) => {
        const { openings, endings } = award.nominees;

        return {
            year: award.year,
            nominees: {
                openings: await Promise.all(openings.map(fetchTheme)),
                endings: await Promise.all(endings.map(fetchTheme))
            }
        };
    }));

    return {
        props: {
            awards
        }
    };
}

async function fetchTheme(opening) {
    const { data } = await fetchData(`
        #graphql

        query ($id: Int) {
            theme(id: $id) {
                id
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
                    version
                    videos {
                        basename
                        tags
                    }
                }
            }
        }
    `, { id: opening });

    return data.theme;
}
