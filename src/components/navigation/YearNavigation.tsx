import styled from "styled-components";
import Link from "next/link";

import { Row } from "@/components/box/Flex";
import { Button } from "@/components/button/Button";
import { Text } from "@/components/text/Text";
import type { YearDetailPageProps } from "@/pages/year/[year]";

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
                    <Button asChild variant="silent">
                        <Link href={`/year/${previousYear}`}>{previousYear}</Link>
                    </Button>
                )}
            </StyledYearPrevious>
            <Button asChild variant="silent">
                <Link href={`/year`}>
                    <Text variant="h1">{year.value}</Text>
                </Link>
            </Button>
            <StyledYearNext>
                {nextYear && (
                    <Button asChild variant="silent">
                        <Link href={`/year/${nextYear}`}>{nextYear}</Link>
                    </Button>
                )}
            </StyledYearNext>
        </Row>
    );
}
