/**
 * Slug format is:
 *
 * `<OP|ED>[v#][-[Tags]]`
 */
import gql from "graphql-tag";

export default function createVideoSlug(theme, entry, video) {
    let slug = theme.slug;

    if (entry.version && entry.version !== 1) {
        slug += `v${entry.version}`;
    }

    if (video.tags) {
        slug += `-${video.tags}`;
    }

    return slug;
}

createVideoSlug.fragments = {
    theme: gql`
        fragment createVideoSlug_theme on Theme {
            slug
        }
    `,
    entry: gql`
        fragment createVideoSlug_entry on Entry {
            version
        }
    `,
    video: gql`
        fragment createVideoSlug_video on Video {
            tags
        }
    `
};
