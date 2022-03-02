import { AnimeSummaryCard } from "components/card";
import { Text } from "components/text";
import { Column } from "components/box";
import { fetchData } from "lib/server";
import { SEO } from "components/seo";

const seasonOrder = [ "Winter", "Spring", "Summer", "Fall" ];

export default function SeasonDetailPage({ animeAll, year, season }) {
    const animeList = animeAll
        .filter((anime) => anime.name)
        .sort((a, b) => a.name.localeCompare(b.name));
    const seasonCapitalized = season[0].toUpperCase() + season.slice(1);

    return (
        <>
            <SEO title={`${seasonCapitalized} ${year}`}/>
            <Text variant="h2">
                {`Anime from ${season} of ${year}`}
                <Text color="text-disabled"> ({animeList.length})</Text>
            </Text>
            <Column style={{ "--gap": "16px" }}>
                {animeList.map((anime) => (
                    <AnimeSummaryCard key={anime.slug} anime={anime}/>
                ))}
            </Column>
        </>
    );
}

export async function getStaticProps({ params: { year, season } }) {
    year = +year;

    const { data } = await fetchData(`
        #graphql

        query($year: Int = 0, $season: String!) {
            yearAll {
                value
            }
            seasonAll(year: $year) {
                value
            }
            season(year: $year, value: $season) {
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
    `, {
        year,
        season
    });

    if (!data?.season) {
        return {
            notFound: true
        };
    }

    return {
        props: {
            animeAll: data.season.anime,
            year,
            season,
            yearList: data.yearAll
                .map((year) => year.value)
                .sort((a, b) => a - b),
            seasonList: data.seasonAll
                .map((season) => season.value)
                .sort((a, b) => seasonOrder.indexOf(a) - seasonOrder.indexOf(b))
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
                seasons {
                    value
                }
            }
        }
    `);

    const paths = data.yearAll.flatMap(
        (year) => year.seasons.map((season) => ({
            params: {
                year: String(year.value),
                season: season.value
            }
        }))
    );

    return {
        paths,
        fallback: "blocking"
    };
}
