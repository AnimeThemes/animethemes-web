import { faExclamationCircle } from "@fortawesome/pro-solid-svg-icons";
import { Tag } from "components/tag";
import { Icon } from "components/icon";

export function ContentWarningTags({ entry }) {
    return (
        <>
            {!!entry.spoiler && (
                <Tag icon={<Icon icon={faExclamationCircle} color="text-warning"/>} textColor="text-warning-muted">
                    SPOILER
                </Tag>
            )}
            {!!entry.nsfw && (
                <Tag icon={<Icon icon={faExclamationCircle} color="text-warning"/>} textColor="text-warning-muted">
                    NSFW
                </Tag>
            )}
        </>
    );
}
