import { useContext } from "react";
import type { ComponentPropsWithoutRef } from "react";
import Link from "next/link";

import { faCompactDisc, faPlay } from "@fortawesome/free-solid-svg-icons";
import gql from "graphql-tag";

import { Button } from "@/components/button/Button";
import { Icon } from "@/components/icon/Icon";
import { VideoTags } from "@/components/tag/VideoTags";
import PlayerContext from "@/context/playerContext";
import type {
    VideoButtonAnimeFragment,
    VideoButtonEntryFragment,
    VideoButtonThemeFragment,
    VideoButtonVideoFragment,
} from "@/generated/graphql";
import createVideoSlug, { getVideoSlugByWatchListItem } from "@/utils/createVideoSlug";

interface VideoButtonProps extends ComponentPropsWithoutRef<typeof Button> {
    anime: VideoButtonAnimeFragment;
    theme: VideoButtonThemeFragment;
    entry: VideoButtonEntryFragment;
    video: VideoButtonVideoFragment;
}

export function VideoButton({ anime, theme, entry, video, ...props }: VideoButtonProps) {
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

VideoButton.fragments = {
    anime: gql`
        fragment VideoButtonAnime on Anime {
            slug
        }
    `,
    theme: gql`
        ${createVideoSlug.fragments.theme}

        fragment VideoButtonTheme on Theme {
            ...createVideoSlugTheme
        }
    `,
    entry: gql`
        ${createVideoSlug.fragments.entry}

        fragment VideoButtonEntry on Entry {
            ...createVideoSlugEntry
        }
    `,
    video: gql`
        ${createVideoSlug.fragments.video}
        ${VideoTags.fragments.video}

        fragment VideoButtonVideo on Video {
            ...createVideoSlugVideo
            ...VideoTagsVideo
            id
        }
    `,
};
