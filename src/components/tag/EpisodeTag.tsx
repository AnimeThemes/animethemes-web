import { faFilm } from "@fortawesome/pro-solid-svg-icons";
import gql from "graphql-tag";

import { Tag } from "@/components/tag/Tag";
import type { EpisodeTagEntryFragment } from "@/generated/graphql";

interface EpisodeTagProps {
    entry: EpisodeTagEntryFragment
}

export function EpisodeTag({ entry }: EpisodeTagProps) {
    return (
        <Tag icon={faFilm} title={entry.episodes ? `Used in episode ${entry.episodes}` : "Used in all episodes"}>
            {entry.episodes || "—"}
        </Tag>
    );
}

EpisodeTag.fragments = {
    entry: gql`
        fragment EpisodeTagEntry on Entry {
            episodes
        }
    `,
};
