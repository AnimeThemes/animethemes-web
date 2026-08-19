import Link from "next/link";

import { Row } from "@/components/box/Flex";
import { Switcher, SwitcherOption } from "@/components/switcher/Switcher";
import { HorizontalScroll } from "@/components/utils/HorizontalScroll";
import { type FragmentType, getFragmentData, graphql } from "@/graphql/generated";

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

interface SeasonNavigationProps {
    year: FragmentType<typeof SEASON_NAVIGATION_YEAR>;
    season?: FragmentType<typeof SEASON_NAVIGATION_SEASON>;
}

export function SeasonNavigation({ year: yearFragment, season: seasonFragment }: SeasonNavigationProps) {
    const year = getFragmentData(SEASON_NAVIGATION_YEAR, yearFragment);
    const season = seasonFragment ? getFragmentData(SEASON_NAVIGATION_SEASON, seasonFragment) : undefined;

    return (
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
    );
}
