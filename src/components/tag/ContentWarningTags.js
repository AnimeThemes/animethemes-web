import { faBomb, faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { Tag } from "components/tag";
import { Icon } from "components/icon";

export function ContentWarningTags({ entry }) {
    return (
        <>
            {!!entry.spoiler && (
                <Tag icon={<Icon icon={faBomb} color="text-warning"/>}>
                    SPOILER
                </Tag>
            )}
            {!!entry.nsfw && (
                <Tag icon={<Icon icon={faExclamationTriangle} color="text-warning"/>}>
                    NSFW
                </Tag>
            )}
        </>
    );
}
