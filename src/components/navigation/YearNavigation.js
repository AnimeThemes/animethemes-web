import Link from "next/link";
import { Button } from "components/button";
import styled from "styled-components";
import { Row } from "components/box";
import { Text } from "components/text";

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

export function YearNavigation({ year, yearList }) {
    const previousYear = yearList.indexOf(year) > 0 ? yearList[yearList.indexOf(year) - 1] : null;
    const nextYear = yearList.indexOf(year) < yearList.length - 1 ? yearList[yearList.indexOf(year) + 1] : null;

    return (
        <Row style={{ "--align-items": "center" }}>
            <StyledYearPrevious>
                {previousYear && (
                    <Link href={`/year/${previousYear}`} passHref prefetch={false}>
                        <Button as="a" variant="silent">{previousYear}</Button>
                    </Link>
                )}
            </StyledYearPrevious>
            <Link href={`/year`} passHref prefetch={false}>
                <Button as="a" variant="silent">
                    <Text variant="h1">{year}</Text>
                </Button>
            </Link>
            <StyledYearNext>
                {nextYear && (
                    <Link href={`/year/${nextYear}`} passHref prefetch={false}>
                        <Button as="a" variant="silent">{nextYear}</Button>
                    </Link>
                )}
            </StyledYearNext>
        </Row>
    );
}
