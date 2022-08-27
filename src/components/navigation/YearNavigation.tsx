import Link from "next/link";
import { Button } from "components/button";
import styled from "styled-components";
import { Row } from "components/box";
import { Text } from "components/text";
import type { YearDetailPageProps } from "pages/year/[year]";

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

export function YearNavigation({ year, yearAll }: YearDetailPageProps) {
    const previousYear = yearAll.find((y) => y.value === year.value - 1)?.value ?? null;
    const nextYear = yearAll.find((y) => y.value === year.value + 1)?.value ?? null;

    return (
        <Row style={{ "--align-items": "center" }}>
            <StyledYearPrevious>
                {previousYear && (
                    <Link href={`/year/${previousYear}`} passHref legacyBehavior>
                        <Button as="a" variant="silent">{previousYear}</Button>
                    </Link>
                )}
            </StyledYearPrevious>
            <Link href={`/year`} passHref legacyBehavior>
                <Button as="a" variant="silent">
                    <Text variant="h1">{year.value}</Text>
                </Button>
            </Link>
            <StyledYearNext>
                {nextYear && (
                    <Link href={`/year/${nextYear}`} passHref legacyBehavior>
                        <Button as="a" variant="silent">{nextYear}</Button>
                    </Link>
                )}
            </StyledYearNext>
        </Row>
    );
}
