import ButtonPlay from "components/button/play";
import VideoTags from "components/utils/videoTags";
import {useContext} from "react";
import PlayerContext from "context/playerContext";
import createVideoSlug from "utils/createVideoSlug";

export default function VideoButton({ anime, theme, entry, video, ...props }) {
    const { currentVideo } = useContext(PlayerContext);
    const videoSlug = createVideoSlug(theme, entry, video);

    return (
        <ButtonPlay to={`/anime/${anime.slug}/${videoSlug}`} playing={currentVideo && currentVideo.filename === video.filename} {...props}>
            <VideoTags video={video}/>
        </ButtonPlay>
    );
}
