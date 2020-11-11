import ButtonPlay from "components/button/play";
import VideoTags from "components/utils/videoTags";
import {useContext} from "react";
import PlayerContext from "context/playerContext";

export default function VideoButton({ video, ...props }) {
    const { currentVideo } = useContext(PlayerContext);

    return (
        <ButtonPlay to={`/video/${video.filename}`} playing={currentVideo && currentVideo.filename === video.filename} {...props}>
            <VideoTags video={video}/>
        </ButtonPlay>
    );
}
