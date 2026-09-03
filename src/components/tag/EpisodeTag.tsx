import { faFilm } from "@fortawesome/free-solid-svg-icons";

import { Tag } from "@/components/tag/Tag";
import { type FragmentType, getFragmentData, graphql } from "@/graphql/generated";

export const EPISODE_TAG_ENTRY = graphql(`
    fragment EpisodeTagEntry on Entry {
        episodes
    }
`);

interface EpisodeTagProps {
    entry: FragmentType<typeof EPISODE_TAG_ENTRY>;
}

export function EpisodeTag({ entry: entryFragment }: EpisodeTagProps) {
    const entry = getFragmentData(EPISODE_TAG_ENTRY, entryFragment);

    return (
        <Tag icon={faFilm} title={entry.episodes ? `Used in episode ${entry.episodes}` : "Used in all episodes"}>
            {entry.episodes || "—"}
        </Tag>
    );
}
