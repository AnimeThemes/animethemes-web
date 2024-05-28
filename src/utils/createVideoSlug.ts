import type { ASTNode } from "graphql";
import gql from "graphql-tag";

import type { WatchListItem } from "@/context/playerContext";
import type {
    CreateVideoSlugEntryFragment,
    CreateVideoSlugThemeFragment,
    CreateVideoSlugVideoFragment
} from "@/generated/graphql";
import type { VideoPageProps } from "@/pages/anime/[animeSlug]/[videoSlug]";

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

export function getVideoSlugByProps(pageProps: any): string | null {
    if (pageProps.isVideoPage) {
        const { anime, themeIndex, entryIndex, videoIndex }: VideoPageProps = pageProps;

        const theme = anime.themes[themeIndex];
        const entry = theme.entries[entryIndex];
        const video = entry.videos[videoIndex];

        return `${anime.slug}/${createVideoSlug(theme, entry, video)}`;
    }
    return null;
}

export function getVideoSlugByWatchListItem(watchListItem: WatchListItem): string {
    const entry = watchListItem.entries[0];
    const theme = entry.theme;

    return `${theme.anime.slug}/${createVideoSlug(theme, entry, watchListItem)}`;
}
