import styled from "styled-components";
import Flex from "components/flex";
import Button from "components/button";
import Title from "components/text/title";
import SEO from "components/seo";
import {graphql} from "gatsby";

const StyledYearPage = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(16rem, 1fr));
    grid-auto-rows: 8rem;
`;

export default function YearIndexPage({ data: { allAnime } }) {
    return (
        <StyledYearPage>
            <SEO title="Browse by Year"></SEO>
            {allAnime.groupedByYear.map(({ year }) => (
                <Flex key={year} alignItems="center" justifyContent="center">
                    <Button to={`/year/${year}`}>
                        <Title variant="page">{year}</Title>
                    </Button>
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
