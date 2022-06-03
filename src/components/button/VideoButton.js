import { useContext } from "react";
import Link from "next/link";
import { faCompactDisc, faPlay } from "@fortawesome/pro-solid-svg-icons";
import PlayerContext from "context/playerContext";
import createVideoSlug from "utils/createVideoSlug";
import { Icon } from "components/icon";
import { Button } from "components/button";
import { VideoTags } from "components/tag";

export function VideoButton({ anime, theme, entry, video, ...props }) {
    const { currentVideo } = useContext(PlayerContext);
    const videoSlug = createVideoSlug(theme, entry, video);
    const isPlaying = currentVideo && currentVideo.filename === video.filename;

    return (
        <Link href={`/anime/${anime.slug}/${videoSlug}`} passHref prefetch={false}>
            <Button as="a" {...props}>
                <Button as="span" variant="primary" isCircle>
                    <Icon icon={isPlaying ? faCompactDisc : faPlay} spin={isPlaying}/>
                </Button>
                <VideoTags video={video} hideTextOnMobile/>
            </Button>
        </Link>
    );
}
