import type { ComponentPropsWithoutRef } from "react";
import { useContext } from "react";
import Link from "next/link";
import { faCompactDisc, faPlay } from "@fortawesome/pro-solid-svg-icons";
import PlayerContext from "context/playerContext";
import createVideoSlug, { getVideoSlugByWatchListItem } from "utils/createVideoSlug";
import { Icon } from "components/icon";
import { Button } from "components/button";
import { VideoTags } from "components/tag/VideoTags";
import gql from "graphql-tag";
import type {
    VideoButtonAnimeFragment,
    VideoButtonEntryFragment,
    VideoButtonThemeFragment,
    VideoButtonVideoFragment
} from "generated/graphql";

interface VideoButtonProps extends ComponentPropsWithoutRef<typeof Button> {
    anime: VideoButtonAnimeFragment
    theme: VideoButtonThemeFragment
    entry: VideoButtonEntryFragment
    video: VideoButtonVideoFragment
}

export function VideoButton({ anime, theme, entry, video, ...props }: VideoButtonProps) {
    const { currentWatchListItem } = useContext(PlayerContext);
    const videoSlug = createVideoSlug(theme, entry, video);
    const isPlaying = currentWatchListItem ? getVideoSlugByWatchListItem(currentWatchListItem) === videoSlug : false;

    return (
        <Link
            href={`/anime/${anime.slug}/${videoSlug}`}
            passHref
            legacyBehavior>
            <Button as="a" {...props}>
                <Button as="span" variant="primary" isCircle>
                    <Icon icon={isPlaying ? faCompactDisc : faPlay} className={isPlaying ? "fa-spin" : undefined}/>
                </Button>
                <VideoTags video={video} hideTextOnMobile/>
            </Button>
        </Link>
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
