import styled from "styled-components";
import Link from "next/link";

import { Row } from "@/components/box/Flex";
import { Button } from "@/components/button/Button";
import { Text } from "@/components/text/Text";
import { type FragmentType, getFragmentData, graphql } from "@/graphql/generated";

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

export const YEAR_NAVIGATION_YEAR = graphql(`
    fragment YearNavigationYear on AnimeYear {
        year
        seasons: season {
            season
            seasonLocalized
        }
    }
`);

export const YEAR_NAVIGATION_YEARS = graphql(`
    fragment YearNavigationYears on AnimeYear {
        year
    }
`);

interface YearNavigationProps {
    year: FragmentType<typeof YEAR_NAVIGATION_YEAR>;
    years: Array<FragmentType<typeof YEAR_NAVIGATION_YEARS>>;
}

export function YearNavigation({ year: yearFragment, years: yearsFragment }: YearNavigationProps) {
    const year = getFragmentData(YEAR_NAVIGATION_YEAR, yearFragment);
    const years = getFragmentData(YEAR_NAVIGATION_YEARS, yearsFragment);

    const previousYear = years.find((y) => y.year === year.year - 1)?.year ?? null;
    const nextYear = years.find((y) => y.year === year.year + 1)?.year ?? null;

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
                    <Text variant="h1">{year.year}</Text>
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
