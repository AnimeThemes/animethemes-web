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

const fragments = {
    anime: graphql(`
        fragment VideoButtonAnime on Anime {
            slug
        }
    `),
    theme: graphql(`
        fragment VideoButtonTheme on AnimeTheme {
            ...createVideoSlugTheme
        }
    `),
    entry: graphql(`
        fragment VideoButtonEntry on AnimeThemeEntry {
            ...createVideoSlugEntry
        }
    `),
    video: graphql(`
        fragment VideoButtonVideo on Video {
            ...createVideoSlugVideo
            ...VideoTagsVideo
            id
        }
    `),
};

interface VideoButtonProps extends ComponentPropsWithoutRef<typeof Button> {
    anime: FragmentType<typeof fragments.anime>;
    theme: FragmentType<typeof fragments.theme>;
    entry: FragmentType<typeof fragments.entry>;
    video: FragmentType<typeof fragments.video>;
}

export function VideoButton({
    anime: animeFragment,
    theme: themeFragment,
    entry: entryFragment,
    video: videoFragment,
    ...props
}: VideoButtonProps) {
    const anime = getFragmentData(fragments.anime, animeFragment);
    const theme = getFragmentData(fragments.theme, themeFragment);
    const entry = getFragmentData(fragments.entry, entryFragment);
    const video = getFragmentData(fragments.video, videoFragment);

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
