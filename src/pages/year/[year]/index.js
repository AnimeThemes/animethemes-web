import Link from "next/link";
import { AnimeSummaryCard } from "components/card";
import { Button } from "components/button";
import { Column, Row } from "components/box";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { Icon } from "components/icon";
import { Text } from "components/text";
import { fetchData } from "lib/server";
import { SEO } from "components/seo";
import gql from "graphql-tag";
import { ANIME_A_Z, getComparator } from "utils/comparators";
import fetchStaticPaths from "utils/fetchStaticPaths";
import getSharedPageProps from "utils/getSharedPageProps";

const seasonOrder = [ "Winter", "Spring", "Summer", "Fall" ];

export default function YearDetailPage({ seasons, year }) {
    return (
        <>
            <SEO title={year}/>
            {seasons.map(({ season, anime }) => (
                <SeasonPreview key={season} season={season} year={year} animeList={anime}/>
            ))}
        </>
    );
}

function SeasonPreview({ season, year, animeList }) {
    return (
        <>
            <Text variant="h2">{season}</Text>
            <Column style={{ "--gap": "16px" }}>
                {animeList.map((anime) => (
                    <AnimeSummaryCard key={anime.slug} anime={anime} previewThemes expandable/>
                ))}
            </Column>
            <Row style={{ "--justify-content": "center" }}>
                <Link href={`/year/${year}/${season.toLowerCase()}`} passHref prefetch={false}>
                    <Button as="a" variant="silent" isCircle>
                        <Icon icon={faChevronDown}/>
                    </Button>
                </Link>
            </Row>
        </>
    );
}

export async function getStaticProps({ params: { year } }) {
    year = +year;

    const { data, apiRequests } = await fetchData(gql`
        ${AnimeSummaryCard.fragments.anime}
        ${AnimeSummaryCard.fragments.previewThemes}
        ${AnimeSummaryCard.fragments.expandable}

        query($year: Int!) {
            yearAll {
                value
            }
            year(value: $year) {
                seasons {
                    value
                    anime {
                        slug
                        ...AnimeSummaryCard_anime
                        ...AnimeSummaryCard_anime_previewThemes
                        ...AnimeSummaryCard_anime_expandable
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
            anime: season.anime
                .filter((anime) => anime.name)
                .sort(getComparator(ANIME_A_Z))
                .slice(0, 3)
        }))
        .sort((a, b) => seasonOrder.indexOf(a) - seasonOrder.indexOf(b));

    return {
        props: {
            ...getSharedPageProps(apiRequests),
            seasons,
            year,
            yearList: data.yearAll
                .map((year) => year.value)
                .sort((a, b) => a - b),
            seasonList: seasons.map((season) => season.season)
        },
        // Revalidate after 3 hours (= 10800 seconds).
        revalidate: 10800
    };
}

export async function getStaticPaths() {
    return fetchStaticPaths(async () => {
        const { data } = await fetchData(gql`
            query {
                yearAll {
                    value
                }
            }
        `);

        return data.yearAll.map((year) => ({
            params: {
                year: String(year.value)
            }
        }));
    });
}
