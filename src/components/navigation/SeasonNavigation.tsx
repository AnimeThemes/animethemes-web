import { Row } from "components/box";
import { Switcher } from "components/switcher";
import Link from "next/link";
import { HorizontalScroll } from "components/utils";
import type { YearDetailPageProps } from "pages/year/[year]";
import { SwitcherOption } from "components/switcher/Switcher";
import type { SeasonDetailPageProps } from "pages/year/[year]/[season]";

export function SeasonNavigation(props: YearDetailPageProps | SeasonDetailPageProps) {
    const { year } = props;

    return (
        <Row style={{ "--justify-content": "center" }}>
            <HorizontalScroll fixShadows>
                <Switcher selectedItem={"season" in props ? props.season.value.toLowerCase() : null}>
                    {year.seasons.map((season) => (
                        <SwitcherOption
                            key={season.value}
                            href={`/year/${year.value}/${season.value.toLowerCase()}`}
                            as={Link}
                            value={season.value.toLowerCase()}
                        >
                            {season.value}
                        </SwitcherOption>
                    ))}
                </Switcher>
            </HorizontalScroll>
        </Row>
    );
}
