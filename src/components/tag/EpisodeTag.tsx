import { faFilm } from "@fortawesome/free-solid-svg-icons";

import { Tag } from "@/components/tag/Tag";
import { type FragmentType, getFragmentData, graphql } from "@/graphql/generated";

const fragments = {
    entry: graphql(`
        fragment EpisodeTagEntry on AnimeThemeEntry {
            episodes
        }
    `),
};

interface EpisodeTagProps {
    entry: FragmentType<typeof fragments.entry>;
}

export function EpisodeTag({ entry: entryFragment }: EpisodeTagProps) {
    const entry = getFragmentData(fragments.entry, entryFragment);

    return (
        <Tag icon={faFilm} title={entry.episodes ? `Used in episode ${entry.episodes}` : "Used in all episodes"}>
            {entry.episodes || "—"}
        </Tag>
    );
}
