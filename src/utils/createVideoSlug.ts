import type { WatchListItem } from "@/context/playerContext";
import { type FragmentType, getFragmentData, graphql } from "@/graphql/generated";
import type { VideoPageProps } from "@/pages/anime/[animeSlug]/[videoSlug]";

const fragments = {
    theme: graphql(`
        fragment createVideoSlugTheme on AnimeTheme {
            type
            sequence
            group {
                slug
            }
        }
    `),
    entry: graphql(`
        fragment createVideoSlugEntry on AnimeThemeEntry {
            version
        }
    `),
    video: graphql(`
        fragment createVideoSlugVideo on Video {
            tags
        }
    `),
};

/**
 * Slug format is:
 *
 * `<OP|ED><#>[v#][-<Group>][-<Tags>]`
 */
const createVideoSlug = (
    themeFragment: FragmentType<typeof fragments.theme>,
    entryFragment: FragmentType<typeof fragments.entry>,
    videoFragment: FragmentType<typeof fragments.video>,
) => {
    const theme = getFragmentData(fragments.theme, themeFragment);
    const entry = getFragmentData(fragments.entry, entryFragment);
    const video = getFragmentData(fragments.video, videoFragment);

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

export function getVideoSlugByProps(pageProps: object): string | null {
    if (isVideoPageProps(pageProps)) {
        const { anime, themeIndex, entryIndex, videoIndex } = pageProps;

        const theme = anime.themes[themeIndex];
        const entry = theme.entries[entryIndex];
        const video = entry.videos[videoIndex];

        return `${anime.slug}/${createVideoSlug(theme, entry, video)}`;
    }
    return null;
}

export function getVideoSlugByWatchListItem(watchListItem: WatchListItem): string {
    const { video, entry } = watchListItem;
    const theme = entry.theme;

    return `${theme.anime.slug}/${createVideoSlug(theme, entry, video)}`;
}

function isVideoPageProps(pageProps: object): pageProps is VideoPageProps {
    return "isVideoPage" in pageProps && !!pageProps.isVideoPage;
}
