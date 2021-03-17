import { Flex } from "components/box";
import { Switcher } from "components/switcher";
import { Link } from "gatsby";

export function SeasonNavigation({ year, season, seasonList }) {
    return (
        <Flex justifyContent="center">
            <Switcher
                items={seasonList.map((s) => s.toLowerCase())}
                selectedItem={season && season.toLowerCase()}
            >
                {({ Button, item, selected, content }) => (
                    <Link key={item.value} to={`/year/${year}/${item.value}`}>
                        <Button variant={selected && "primary"}>
                            {content}
                        </Button>
                    </Link>
                )}
            </Switcher>
        </Flex>
    );
}
