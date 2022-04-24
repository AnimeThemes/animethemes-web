import { Row } from "components/box";
import { Switcher } from "components/switcher";
import Link from "next/link";
import { HorizontalScroll } from "components/utils";

export function SeasonNavigation({ year, season, seasonList }) {
    return (
        <Row style={{ "--justify-content": "center" }}>
            <HorizontalScroll fixShadows>
                <Switcher items={seasonList.map((s) => s.toLowerCase())} selectedItem={season && season.toLowerCase()}>
                    {seasonList.map((season) => (
                        <Link key={season} href={`/year/${year}/${season.toLowerCase()}`} passHref prefetch={false}>
                            <Switcher.Option as="a" value={season.toLowerCase()}>{season}</Switcher.Option>
                        </Link>
                    ))}
                </Switcher>
            </HorizontalScroll>
        </Row>
    );
}
