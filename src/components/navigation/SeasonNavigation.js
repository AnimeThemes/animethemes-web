import { Box } from "components/box";
import { Switcher } from "components/switcher";
import { Link } from "gatsby";

export function SeasonNavigation({ year, season, seasonList }) {
    return (
        <Box overflowX="auto">
            <Switcher
                items={seasonList.map((s) => s.toLowerCase())}
                selectedItem={season && season.toLowerCase()}
                mx="auto"
            >
                {({ Button, item, selected, content }) => (
                    <Link key={item.value} to={`/year/${year}/${item.value}`}>
                        <Button variant={selected && "primary"}>
                            {content}
                        </Button>
                    </Link>
                )}
            </Switcher>
        </Box>
    );
}
