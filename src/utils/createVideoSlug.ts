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
 * `<OP|ED><#>[v#][-<Group>][-<Tags>]`
 */
const createVideoSlug: CreateVideoSlug = (theme, entry, video) => {
    let slug = theme.type + (theme.sequence || 1);

    if (entry.version && entry.version !== 1) {
        slug += `v${entry.version}`;
    }

    if (theme.group) {
        slug += `-${theme.group.slug}`;
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
            type
            sequence
            group {
                slug
            }
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
