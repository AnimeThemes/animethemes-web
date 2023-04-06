import type { ComponentPropsWithoutRef } from "react";
import { useContext } from "react";
import Link from "next/link";
import { faCompactDisc, faPlay } from "@fortawesome/pro-solid-svg-icons";
import PlayerContext from "context/playerContext";
import createVideoSlug from "utils/createVideoSlug";
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
    const { currentVideo } = useContext(PlayerContext);
    const videoSlug = createVideoSlug(theme, entry, video);
    const isPlaying = currentVideo ? currentVideo.id === video.id : false;

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
        fragment VideoButtonTheme on Theme {
            slug
        }
    `,
    entry: gql`
        fragment VideoButtonEntry on Entry {
            version
        }
    `,
    video: gql`
        ${VideoTags.fragments.video}
        
        fragment VideoButtonVideo on Video {
            ...VideoTagsVideo
            id
            tags
        }
    `,
};
