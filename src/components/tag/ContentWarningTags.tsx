import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";

import { Icon } from "@/components/icon/Icon";
import { Tag } from "@/components/tag/Tag";
import { type FragmentType, getFragmentData, graphql } from "@/graphql/generated";

const fragments = {
    entry: graphql(`
        fragment ContentWarningTagsEntry on AnimeThemeEntry {
            spoiler
            nsfw
        }
    `),
};

interface ContentWarningTagsProps {
    entry: FragmentType<typeof fragments.entry>;
}

export function ContentWarningTags({ entry: entryFragment }: ContentWarningTagsProps) {
    const entry = getFragmentData(fragments.entry, entryFragment);

    return (
        <>
            {entry.spoiler && (
                <Tag icon={<Icon icon={faCircleExclamation} color="text-warning" />} textColor="text-warning-muted">
                    SPOILER
                </Tag>
            )}
            {entry.nsfw && (
                <Tag icon={<Icon icon={faCircleExclamation} color="text-warning" />} textColor="text-warning-muted">
                    NSFW
                </Tag>
            )}
        </>
    );
}
