import { faFilm } from "@fortawesome/pro-solid-svg-icons";
import { Tag } from "components/tag";
import gql from "graphql-tag";
import { EpisodeTagEntryFragment } from "generated/graphql";

interface EpisodeTagProps {
    entry: EpisodeTagEntryFragment
}

export function EpisodeTag({ entry }: EpisodeTagProps) {
    return (
        <Tag icon={faFilm}>
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
