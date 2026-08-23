import styled from "styled-components";
import Link from "next/link";

import { Column, Row } from "@/components/box/Flex";
import { Button } from "@/components/button/Button";
import { Switcher, SwitcherOption } from "@/components/switcher/Switcher";
import { Text } from "@/components/text/Text";
import { HorizontalScroll } from "@/components/utils/HorizontalScroll";
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

export const SEASON_NAVIGATION_YEAR = graphql(`
    fragment SeasonNavigationYear on AnimeYear {
        year
        seasons: season {
            season
            seasonLocalized
        }
    }
`);

export const SEASON_NAVIGATION_SEASON = graphql(`
    fragment SeasonNavigationSeason on AnimeYearSeason {
        season
    }
`);

export const SEASON_NAVIGATION_YEARS = graphql(`
    fragment SeasonNavigationYears on AnimeYear {
        year
    }
`);

interface SeasonNavigationProps {
    year: FragmentType<typeof SEASON_NAVIGATION_YEAR>;
    season?: FragmentType<typeof SEASON_NAVIGATION_SEASON>;
    years: Array<FragmentType<typeof SEASON_NAVIGATION_YEARS>>;
}

export function SeasonNavigation({
    year: yearFragment,
    season: seasonFragment,
    years: yearsFragment,
}: SeasonNavigationProps) {
    const year = getFragmentData(SEASON_NAVIGATION_YEAR, yearFragment);
    const season = seasonFragment ? getFragmentData(SEASON_NAVIGATION_SEASON, seasonFragment) : undefined;
    const years = getFragmentData(SEASON_NAVIGATION_YEARS, yearsFragment);

    const previousYear = years.find((y) => y.year === year.year - 1)?.year ?? null;
    const nextYear = years.find((y) => y.year === year.year + 1)?.year ?? null;

    return (
        <Column style={{ "--gap": "16px" }}>
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
            <Row style={{ "--justify-content": "center" }}>
                <HorizontalScroll $fixShadows>
                    <Switcher selectedItem={season ? season.season : null}>
                        {year.seasons?.map((season) => (
                            <SwitcherOption key={season.season} asChild value={season.season}>
                                <Link href={`/year/${year.year}/${season.season.toLowerCase()}`}>
                                    {season.seasonLocalized}
                                </Link>
                            </SwitcherOption>
                        ))}
                    </Switcher>
                </HorizontalScroll>
            </Row>
        </Column>
    );
}
