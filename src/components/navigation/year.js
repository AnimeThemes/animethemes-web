import {graphql, Link, useStaticQuery} from "gatsby";
import Button from "components/button";
import Title from "components/text/title";
import styled from "styled-components";
import { Flex } from "components/flex";

const StyledYear = styled.div`
    flex: 1;

    display: flex;

    margin: 0 1rem;
`;
const StyledYearPrevious = styled(StyledYear)`
    justify-content: flex-end;
`;
const StyledYearNext = styled(StyledYear)`
    justify-content: flex-start;
`;

export default function YearNavigation({ year }) {
    const yearList = useStaticQuery(graphql`
        query {
            allAnime {
                groupedByYear: group(field: year) {
                    year: fieldValue
                }
            }
        }
    `).allAnime.groupedByYear.map((group) => +group.year);

    const previousYear = yearList.indexOf(year) > 0 ? yearList[yearList.indexOf(year) - 1] : null;
    const nextYear = yearList.indexOf(year) < yearList.length - 1 ? yearList[yearList.indexOf(year) + 1] : null;

    return (
        <Flex alignItems="center">
            <StyledYearPrevious>
                {previousYear && (
                    <Link to={`/year/${previousYear}`}>
                        <Button silent>{previousYear}</Button>
                    </Link>
                )}
            </StyledYearPrevious>
            <Button to="/year" silent>
                <Title>{year}</Title>
            </Button>
            <StyledYearNext>
                {nextYear && (
                    <Link to={`/year/${nextYear}`}>
                        <Button silent>{nextYear}</Button>
                    </Link>
                )}
            </StyledYearNext>
        </Flex>
    );
}
