import type { WatchListItem } from "@/context/playerContext";
import { type FragmentType, getFragmentData, graphql } from "@/graphql/generated";
import { getAnimeFromVideoPageFragment, type VideoPageProps } from "@/pages/anime/[animeSlug]/[videoSlug]";

export const CREATE_VIDEO_SLUG_THEME = graphql(`
    fragment createVideoSlugTheme on Theme {
        type
        sequence
        group {
            slug
        }
    }
`);

export const CREATE_VIDEO_SLUG_ENTRY = graphql(`
    fragment createVideoSlugEntry on Entry {
        version
    }
`);

export const CREATE_VIDEO_SLUG_VIDEO = graphql(`
    fragment createVideoSlugVideo on Video {
        tags
    }
`);

/**
 * Slug format is:
 *
 * `<OP|ED><#>[v#][-<Group>][-<Tags>]`
 */
const createVideoSlug = (
    themeFragment: FragmentType<typeof CREATE_VIDEO_SLUG_THEME>,
    entryFragment: FragmentType<typeof CREATE_VIDEO_SLUG_ENTRY>,
    videoFragment: FragmentType<typeof CREATE_VIDEO_SLUG_VIDEO>,
) => {
    const theme = getFragmentData(CREATE_VIDEO_SLUG_THEME, themeFragment);
    const entry = getFragmentData(CREATE_VIDEO_SLUG_ENTRY, entryFragment);
    const video = getFragmentData(CREATE_VIDEO_SLUG_VIDEO, videoFragment);

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
        const { anime: animeFragment, themeIndex, entryIndex, videoIndex } = pageProps;
        const anime = getAnimeFromVideoPageFragment(animeFragment);

        const theme = anime.themes[themeIndex];
        const entry = theme.entries[entryIndex];
        const video = entry.videos.nodes[videoIndex];

        return `${anime.slug}/${createVideoSlug(theme, entry, video)}`;
    }
    return null;
}

export function getVideoSlugByWatchListItem(watchListItem: WatchListItem): string {
    const { video, entry, theme } = watchListItem;

    return `${theme.anime.slug}/${createVideoSlug(theme, entry, video)}`;
}

function isVideoPageProps(pageProps: object): pageProps is VideoPageProps {
    return "isVideoPage" in pageProps && !!pageProps.isVideoPage;
}
