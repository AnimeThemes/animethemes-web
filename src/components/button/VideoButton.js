import { VideoTags } from "components/utils";
import { useContext } from "react";
import PlayerContext from "context/playerContext";
import createVideoSlug from "utils/createVideoSlug";
import { Link } from "gatsby";
import { Icon } from "components/icon";
import { faCompactDisc, faPlay } from "@fortawesome/free-solid-svg-icons";
import { Button } from "components/button";

export function VideoButton({ anime, theme, entry, video, ...props }) {
    const { currentVideo } = useContext(PlayerContext);
    const videoSlug = createVideoSlug(theme, entry, video);
    const isPlaying = currentVideo && currentVideo.filename === video.filename;

    return (
        <Link to={`/anime/${anime.slug}/${videoSlug}`}>
            <Button {...props}>
                <Button as="span" variant="primary">
                    <Icon icon={isPlaying ? faCompactDisc : faPlay} spin={isPlaying}/>
                </Button>
                <VideoTags video={video}/>
            </Button>
        </Link>
    );
}
