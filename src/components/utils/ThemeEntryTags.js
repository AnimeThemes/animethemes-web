import { Tag } from "components/tag";
import { faBomb, faExclamationTriangle, faFilm } from "@fortawesome/free-solid-svg-icons";
import { Icon } from "components/icon";
import { Flex } from "components/box";

export function ThemeEntryTags({ entry }) {
    return (
        <Flex gapsRow="0.5rem">
            <Tag icon={faFilm}>
                {entry.episodes || "—"}
            </Tag>
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
        </Flex>
    );
}
