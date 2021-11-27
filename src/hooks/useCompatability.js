import { useEffect, useState } from "react";

export default function useCompatability(initialValues = {}) {
    const [canPlayVideo, setCanPlayVideo] = useState(initialValues.canPlayVideo ?? true);

    useEffect(() => {
        if (document?.createElement) {
            const videoElement = document.createElement("video");

            setCanPlayVideo(!!videoElement.canPlayType(`video/webm; codecs="vp8, vp9, opus"`));
        }
    }, []);

    return {
        canPlayVideo
    };
}
