import { useContext } from "react";
import Link from "next/link";
import { faCompactDisc, faPlay } from "@fortawesome/free-solid-svg-icons";
import { VideoTags } from "components/utils";
import PlayerContext from "context/playerContext";
import createVideoSlug from "utils/createVideoSlug";
import { Icon } from "components/icon";
import { Button } from "components/button";

export function VideoButton({ anime, theme, entry, video, ...props }) {
    const { currentVideo } = useContext(PlayerContext);
    const videoSlug = createVideoSlug(theme, entry, video);
    const isPlaying = currentVideo && currentVideo.filename === video.filename;

    return (
        <Link href={`/anime/${anime.slug}/${videoSlug}`} passHref>
            <Button as="a" {...props}>
                <Button as="span" variant="primary" isCircle>
                    <Icon icon={isPlaying ? faCompactDisc : faPlay} spin={isPlaying}/>
                </Button>
                <VideoTags video={video} hideTextOnMobile/>
            </Button>
        </Link>
    );
}
