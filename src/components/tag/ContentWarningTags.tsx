import { faExclamationCircle } from "@fortawesome/pro-solid-svg-icons";
import gql from "graphql-tag";

import { Icon } from "@/components/icon/Icon";
import { Tag } from "@/components/tag/Tag";
import type { ContentWarningTagsEntryFragment } from "@/generated/graphql";

interface ContentWarningTagsProps {
    entry: ContentWarningTagsEntryFragment
}

export function ContentWarningTags({ entry }: ContentWarningTagsProps) {
    return (
        <>
            {entry.spoiler && (
                <Tag icon={<Icon icon={faExclamationCircle} color="text-warning"/>} textColor="text-warning-muted">
                    SPOILER
                </Tag>
            )}
            {entry.nsfw && (
                <Tag icon={<Icon icon={faExclamationCircle} color="text-warning"/>} textColor="text-warning-muted">
                    NSFW
                </Tag>
            )}
        </>
    );
}

ContentWarningTags.fragments = {
    entry: gql`
        fragment ContentWarningTagsEntry on Entry {
            spoiler
            nsfw
        }
    `,
};
