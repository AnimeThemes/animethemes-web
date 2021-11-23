import { Box } from "components/box";
import { Switcher } from "components/switcher";
import Link from "next/link";

export function SeasonNavigation({ year, season, seasonList }) {
    return (
        <Box overflowX="auto">
            <Switcher
                items={seasonList.map((s) => s.toLowerCase())}
                selectedItem={season && season.toLowerCase()}
                mx="auto"
            >
                {({ Button, item, selected, content }) => (
                    <Link key={item.value} href={`/year/${year}/${item.value}`} passHref>
                        <Button as="a" variant={selected && "primary"}>
                            {content}
                        </Button>
                    </Link>
                )}
            </Switcher>
        </Box>
    );
}
