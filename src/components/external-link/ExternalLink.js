import { faChevronCircleRight } from "@fortawesome/free-solid-svg-icons";
import { Text } from "components/text";
import { Icon } from "components/icon";

export function ExternalLink({ href, children, ...props }) {
    return (
        <Text as="a" link href={href} target="_blank" rel="noopener" {...props}>
            <Text>{children}</Text>
            &nbsp;
            <Icon icon={faChevronCircleRight}/>
        </Text>
    );
}
