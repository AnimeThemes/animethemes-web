import { faFilm } from "@fortawesome/free-solid-svg-icons";
import { Tag } from "components/tag";

export function EpisodeTag({ entry }) {
    return (
        <Tag icon={faFilm}>
            {entry.episodes || "—"}
        </Tag>
    );
}
