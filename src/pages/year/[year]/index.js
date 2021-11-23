import Link from "next/link";
import { AnimeSummaryCard } from "components/card";
import { Button } from "components/button";
import { Box, Flex } from "components/box";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { Icon } from "components/icon";
import { Text } from "components/text";
import { fetchData } from "lib/server";
import { SEO } from "components/seo";

const seasonOrder = [ "Winter", "Spring", "Summer", "Fall" ];

export default function YearDetailPage({ seasons, year }) {
    return (
        <Box gapsColumn="1.5rem">
            <SEO title={year}/>
            {seasons.map(({ season, anime }) => (
                <SeasonPreview key={season} season={season} year={year} animeList={anime}/>
            ))}
        </Box>
    );
}

function SeasonPreview({ season, year, animeList }) {
    return (
        <>
            <Text variant="h2">{season}</Text>
            <Box gapsColumn="1rem">
                {animeList.map((anime) => (
                    <AnimeSummaryCard key={anime.slug} anime={anime}/>
                ))}
            </Box>
            <Flex justifyContent="center">
                <Link href={`/year/${year}/${season.toLowerCase()}`} passHref>
                    <Button as="a" silent>
                        <Icon icon={faChevronDown}/>
                    </Button>
                </Link>
            </Flex>
        </>
    );
}

export async function getStaticProps({ params: { year } }) {
    year = +year;

    const { data } = await fetchData(`
        #graphql

        query($year: Int!) {
            yearAll {
                value
            }
            year(value: $year) {
                seasons {
                    value
                    anime {
                        slug
                        name
                        themes {
                            slug
                            type
                            sequence
                            entries {
                                version
                                videos {
                                    tags
                                }
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
            }
        }
    `, {
        year
    });

    if (!data.year) {
        return {
            notFound: true
        };
    }

    const seasons = data.year.seasons
        .map((season) => ({
            season: season.value,
            anime: season.anime.slice(0, 3)
        }))
        .sort((a, b) => seasonOrder.indexOf(a) - seasonOrder.indexOf(b));

    return {
        props: {
            seasons,
            year,
            yearList: data.yearAll
                .map((year) => year.value)
                .sort((a, b) => a - b),
            seasonList: seasons.map((season) => season.season)
        },
        revalidate: 5 * 60
    };
}

export async function getStaticPaths() {
    const { data } = await fetchData(`
        #graphql

        query {
            yearAll {
                value
            }
        }
    `);

    const paths = data.yearAll.map((year) => ({
        params: {
            year: String(year.value)
        }
    }));

    return {
        paths,
        fallback: "blocking"
    };
}
