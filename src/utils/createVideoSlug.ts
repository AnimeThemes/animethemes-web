import gql from "graphql-tag";
import type { ASTNode } from "graphql";
import type {
    CreateVideoSlugEntryFragment,
    CreateVideoSlugThemeFragment,
    CreateVideoSlugVideoFragment
} from "generated/graphql";

interface CreateVideoSlug {
    (
        theme: CreateVideoSlugThemeFragment,
        entry: CreateVideoSlugEntryFragment,
        video: CreateVideoSlugVideoFragment
    ): string
    fragments: {
        theme: ASTNode
        entry: ASTNode
        video: ASTNode
    }
}

/**
 * Slug format is:
 *
 * `<OP|ED>[v#][-[Tags]]`
 */
const createVideoSlug: CreateVideoSlug = (theme, entry, video) => {
    let slug = theme.slug;

    if (entry.version && entry.version !== 1) {
        slug += `v${entry.version}`;
    }

    if (video.tags) {
        slug += `-${video.tags}`;
    }

    return slug;
};

export default createVideoSlug;

createVideoSlug.fragments = {
    theme: gql`
        fragment createVideoSlugTheme on Theme {
            slug
        }
    `,
    entry: gql`
        fragment createVideoSlugEntry on Entry {
            version
        }
    `,
    video: gql`
        fragment createVideoSlugVideo on Video {
            tags
        }
    `,
};
