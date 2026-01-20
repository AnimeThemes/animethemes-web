import Link from "next/link";

import { Row } from "@/components/box/Flex";
import { Switcher, SwitcherOption } from "@/components/switcher/Switcher";
import { HorizontalScroll } from "@/components/utils/HorizontalScroll";
import { type FragmentType, getFragmentData, graphql } from "@/graphql/generated";

const fragments = {
    year: graphql(`
        fragment SeasonNavigationYear on AnimeYear {
            year
            seasons {
                season
                seasonLocalized
            }
        }
    `),
    season: graphql(`
        fragment SeasonNavigationSeason on AnimeYearSeason {
            season
        }
    `),
};

interface SeasonNavigationProps {
    year: FragmentType<typeof fragments.year>;
    season?: FragmentType<typeof fragments.season>;
}

export function SeasonNavigation({ year: yearFragment, season: seasonFragment }: SeasonNavigationProps) {
    const year = getFragmentData(fragments.year, yearFragment);
    const season = seasonFragment ? getFragmentData(fragments.season, seasonFragment) : undefined;

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
