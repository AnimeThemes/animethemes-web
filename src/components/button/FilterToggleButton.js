import { faFilter } from "@fortawesome/pro-solid-svg-icons";
import { IconTextButton } from "components/button";

export function FilterToggleButton(props) {
    return (
        <IconTextButton icon={faFilter} collapsible {...props}>Filter</IconTextButton>
    );
}
