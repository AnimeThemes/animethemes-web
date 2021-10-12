import { Icon } from "components/icon";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { Text } from "components/text";
import { Button } from "components/button";
import { useMedia } from "use-media";

export function FilterToggleButton(props) {
    const isMobile = useMedia({ maxWidth: "720px" });

    return (
        <Button silent gapsRow="0.5rem" circle={isMobile} {...props}>
            <Icon icon={faFilter} color="text-disabled"/>
            <Text display={[ "none", "inline" ]}>Filter</Text>
        </Button>
    );
}
