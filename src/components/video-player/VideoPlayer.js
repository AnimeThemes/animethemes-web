import { useContext, useRef, useState } from "react";
import {
    StyledPlayer,
    StyledPlayerButton,
    StyledVideo,
    StyledOverlay
} from "./VideoPlayer.style";
import { faExpandAlt, faPause, faPlay, faTimes } from "@fortawesome/free-solid-svg-icons";
import { navigate } from "gatsby";
import PlayerContext from "context/playerContext";
import createVideoSlug from "utils/createVideoSlug";
import { useMedia } from "react-media";
import { Icon } from "components/icon";
import { AspectRatio } from "components/utils";

const videoBaseUrl = process.env.GATSBY_VIDEO_URL || "https://animethemes.moe";

export function VideoPlayer({ video, entry, background, ...props }) {
    const [isPlaying, setPlaying] = useState(false);
    const playerRef = useRef();
    const { setCurrentVideo } = useContext(PlayerContext);
    const isMobile = useMedia({ query: "(max-width: 720px)" });

    function togglePlay() {
        if (isPlaying) {
            playerRef.current.pause();
        } else {
            playerRef.current.play();
        }
    }

    function maximize() {
        const videoSlug = createVideoSlug(entry.theme, entry, video);
        navigate(`/anime/${entry.theme.anime.slug}/${videoSlug}`);
    }

    function preventTextSelection(event) {
        if (event.detail > 1) {
            event.preventDefault();
        }
    }

    return (
        <StyledPlayer
            background={background}
            onDoubleClick={background ? maximize : undefined}
            onMouseDown={preventTextSelection}
            onClick={background && isMobile ? maximize : undefined}

            layout
            transition={{ type: "tween" }}

            {...props}
        >
            <AspectRatio ratio={16 / 9}>
                <StyledVideo
                    ref={playerRef}
                    src={`${videoBaseUrl}/video/${video.basename}`}
                    controls={!background}
                    autoPlay
                    onPlay={() => setPlaying(true)}
                    onPause={() => setPlaying(false)}
                    onEnded={() => setPlaying(false)}
                >
                    Your browser doesn&apos;t support HTML5 video playback. Please use a modern browser.
                </StyledVideo>
            </AspectRatio>
            {background && (
                <StyledOverlay force={!isPlaying}>
                    <StyledPlayerButton onClick={() => setCurrentVideo(null)}>
                        <Icon icon={faTimes} />
                    </StyledPlayerButton>
                    <StyledPlayerButton size="2rem" onClick={togglePlay}>
                        <Icon icon={isPlaying ? faPause : faPlay} />
                    </StyledPlayerButton>
                    <StyledPlayerButton onClick={maximize}>
                        <Icon icon={faExpandAlt} />
                    </StyledPlayerButton>
                </StyledOverlay>
            )}
        </StyledPlayer>
    );
}
