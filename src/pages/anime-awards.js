import { fetchData } from "lib/server";
import { SEO } from "components/seo";
import { Text } from "components/text";
import { Box, Grid } from "components/box";
import { ThemeSummaryCard } from "components/card";

export default function AnimeAwardsPage({ openings, endings }) {
    return (
        <Box gapsColumn="1.5rem">
            <SEO/>
            <Text variant="h1">/r/anime Awards</Text>
            <Text variant="h2">2021 Nominees</Text>
            <Grid gridTemplateColumns={[ "1fr", "1fr 1fr" ]} gridGap="2rem">
                <Box gapsColumn="1rem">
                    {openings.map((theme) => (
                        <ThemeSummaryCard theme={theme} key={theme.anime.slug + theme.slug + theme.group}/>
                    ))}
                </Box>
                <Box gapsColumn="1rem">
                    {endings.map((theme) => (
                        <ThemeSummaryCard theme={theme} key={theme.anime.slug + theme.slug + theme.group}/>
                    ))}
                </Box>
            </Grid>
        </Box>
    );
}

export async function getStaticProps() {
    const openings = await Promise.all([
        10388,
        10778,
        10145,
        10237,
        9465,
        10804,
        10698,
        10839,
        10229,
        10224
    ].map(fetchTheme));

    const endings = await Promise.all([
        9790,
        9467,
        10766,
        10184,
        9777,
        10550,
        10389,
        10830,
        10823,
        9722
    ].map(fetchTheme));

    return {
        props: {
            openings,
            endings
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
