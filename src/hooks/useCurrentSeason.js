import { graphql, useStaticQuery } from "gatsby";

const seasonOrder = [
    "winter",
    "spring",
    "summer",
    "fall"
];

export default function useCurrentSeason() {
    const { currentSeasonAnime } = useStaticQuery(graphql`
        query {
            currentSeasonAnime: allAnime {
                groupedByYear: group(field: year) {
                    year: fieldValue
                    nodes {
                        season
                    }
                }
            }
        }
    `);

    const currentYearGroup = currentSeasonAnime.groupedByYear.sort((a, b) => b.year - a.year)[0];
    const currentYear = currentYearGroup.year;
    const currentSeason = seasonOrder[currentYearGroup.nodes.map(({ season }) => seasonOrder.indexOf(season.toLowerCase())).sort().pop()];

    return { currentYear, currentSeason };
}
