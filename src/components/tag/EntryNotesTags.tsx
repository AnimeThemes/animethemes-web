import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";

import { Tag } from "@/components/tag/Tag";
import { type FragmentType, getFragmentData, graphql } from "@/graphql/generated";

export const ENTRY_NOTES_TAGS_ENTRY = graphql(`
    fragment EntryNotesTagsEntry on Entry {
        id
        notes
    }
`);

interface EntryNotesTagsProps {
    entry: FragmentType<typeof ENTRY_NOTES_TAGS_ENTRY>;
}

export function EntryNotesTags({ entry: entryFragment }: EntryNotesTagsProps) {
    const entry = getFragmentData(ENTRY_NOTES_TAGS_ENTRY, entryFragment);

    return (
        <>
            {entry.notes && (
                <Tag icon={faCircleInfo} title={entry.notes} />
            )}
        </>
    );
}
