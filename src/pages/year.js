import styled from "styled-components";
import { Flex } from "components/box";
import { Button } from "components/button";
import { SEO } from "components/seo";
import { graphql, Link } from "gatsby";
import { Text } from "components/text";

const StyledYearPage = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(16rem, 1fr));
    grid-auto-rows: 8rem;
`;

export default function YearIndexPage({ data: { allAnime } }) {
    const years = allAnime.groupedByYear
        .map((group) => group.year)
        .sort((a, b) => b - a);

    return (
        <StyledYearPage>
            <SEO title="Browse by Year" />
            {years.map((year) => (
                <Flex key={year} alignItems="center" justifyContent="center">
                    <Link to={`/year/${year}`}>
                        <Button>
                            <Text variant="h1">{year}</Text>
                        </Button>
                    </Link>
                </Flex>
            ))}
        </StyledYearPage>
    );
}

export const query = graphql`
    query YearPageQuery {
        allAnime {
            groupedByYear: group(field: year) {
                year: fieldValue
            }
        }
    }
`;
