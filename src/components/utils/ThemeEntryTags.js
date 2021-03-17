import { Tag } from "components/tag";
import { faBomb, faExclamationTriangle, faFilm } from "@fortawesome/free-solid-svg-icons";
import { Flex } from "components/box";
import { Icon } from "components/icon";

export function ThemeEntryTags({ entry }) {
    return (
        <div>
            <Flex flexWrap="wrap" gapsBoth="0.5rem">
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
        </div>
    );
}
