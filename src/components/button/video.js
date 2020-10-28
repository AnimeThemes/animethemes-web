import ButtonPlay from "components/button/play";
import VideoTags from "components/utils/videoTags";

export default function VideoButton({ video }) {
    return (
        <ButtonPlay to={`/video/${video.filename}`}>
            <VideoTags video={video}/>
        </ButtonPlay>
    );
}
