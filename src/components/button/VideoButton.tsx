import { useContext } from "react";
import type { ComponentPropsWithoutRef } from "react";
import Link from "next/link";

import { faCompactDisc, faPlay } from "@fortawesome/free-solid-svg-icons";

import { Button } from "@/components/button/Button";
import { Icon } from "@/components/icon/Icon";
import { VideoTags } from "@/components/tag/VideoTags";
import PlayerContext from "@/context/playerContext";
import { type FragmentType, getFragmentData, graphql } from "@/graphql/generated";
import createVideoSlug, { getVideoSlugByWatchListItem } from "@/utils/createVideoSlug";

export const VIDEO_BUTTON_ANIME = graphql(`
    fragment VideoButtonAnime on Anime {
        slug
    }
`);

export const VIDEO_BUTTON_THEME = graphql(`
    fragment VideoButtonTheme on AnimeTheme {
        ...createVideoSlugTheme
    }
`);

export const VIDEO_BUTTON_ENTRY = graphql(`
    fragment VideoButtonEntry on AnimeThemeEntry {
        ...createVideoSlugEntry
    }
`);

export const VIDEO_BUTTON_VIDEO = graphql(`
    fragment VideoButtonVideo on Video {
        ...createVideoSlugVideo
        ...VideoTagsVideo
        id
    }
`);

interface VideoButtonProps extends ComponentPropsWithoutRef<typeof Button> {
    anime: FragmentType<typeof VIDEO_BUTTON_ANIME>;
    theme: FragmentType<typeof VIDEO_BUTTON_THEME>;
    entry: FragmentType<typeof VIDEO_BUTTON_ENTRY>;
    video: FragmentType<typeof VIDEO_BUTTON_VIDEO>;
}

export function VideoButton({
    anime: animeFragment,
    theme: themeFragment,
    entry: entryFragment,
    video: videoFragment,
    ...props
}: VideoButtonProps) {
    const anime = getFragmentData(VIDEO_BUTTON_ANIME, animeFragment);
    const theme = getFragmentData(VIDEO_BUTTON_THEME, themeFragment);
    const entry = getFragmentData(VIDEO_BUTTON_ENTRY, entryFragment);
    const video = getFragmentData(VIDEO_BUTTON_VIDEO, videoFragment);

    const { currentWatchListItem } = useContext(PlayerContext);
    const videoSlug = createVideoSlug(theme, entry, video);
    const isPlaying = currentWatchListItem
        ? getVideoSlugByWatchListItem(currentWatchListItem) === `${anime.slug}/${videoSlug}`
        : false;

    return (
        <Button asChild {...props}>
            <Link href={`/anime/${anime.slug}/${videoSlug}`}>
                <Button asChild variant="primary" isCircle>
                    <span>
                        <Icon icon={isPlaying ? faCompactDisc : faPlay} className={isPlaying ? "fa-spin" : undefined} />
                    </span>
                </Button>
                <VideoTags video={video} />
            </Link>
        </Button>
    );
}
