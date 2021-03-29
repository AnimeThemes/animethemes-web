import { graphql } from "gatsby";
import { AnimeSummaryCard } from "components/card";
import { SEO } from "components/seo";
import { Text } from "components/text";
import { Box } from "components/box";

export default function SeasonDetailPage({ data: { allAnime }, pageContext: { year, season } }) {
    const pageTitle = `${season} ${year} Anime`;
    const animeList = allAnime.nodes;

    return (
        <Box gapsColumn="1.5rem">
            <SEO title={pageTitle} />
            <Text variant="h2">{`Anime from ${season} of ${year}`}</Text>
            <Box gapsColumn="1rem">
                {animeList.map((anime) => (
                    <AnimeSummaryCard key={anime.slug} anime={anime}/>
                ))}
            </Box>
        </Box>
    );
}

export const query = graphql`
    query($year: Int!, $season: String) {
        allAnime(filter: {year: {eq: $year}, season: {eq: $season}}) {
            nodes {
                slug
                name
                themes {
                    slug
                    ...VideoSlug
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
`;
