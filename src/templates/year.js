import { graphql, Link } from "gatsby";
import { AnimeSummaryCard } from "components/card";
import { Button } from "components/button";
import { Box, Flex } from "components/box";
import { SEO } from "components/seo";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { Icon } from "components/icon";
import { Text } from "components/text";

const seasonOrder = [ "Winter", "Spring", "Summer", "Fall" ];

export default function YearDetailPage({ data: { allAnime }, pageContext: { year } }) {
    const pageTitle = `${year} Anime`;
    const animeBySeason = allAnime.groupedBySeason.sort((a, b) => seasonOrder.indexOf(a.fieldValue) - seasonOrder.indexOf(b.fieldValue));

    return (
        <Box gapsColumn="1.5rem">
            <SEO title={pageTitle} />
            {animeBySeason.map(({ fieldValue: season, nodes: animeList }) => (
                <SeasonPreview key={season} season={season} year={year} animeList={animeList}/>
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
                <Link to={`/year/${year}/${season.toLowerCase()}`}>
                    <Button silent>
                        <Icon icon={faChevronDown}/>
                    </Button>
                </Link>
            </Flex>
        </>
    );
}

export const query = graphql`
    query($year: Int!) {
        allAnime(filter: { year: { eq: $year } }) {
            groupedBySeason: group(field: season, limit: 3) {
                fieldValue
                nodes {
                    ...AnimeCard
                    ...AnimeCardThemes
                }
            }
        }
    }
`;
