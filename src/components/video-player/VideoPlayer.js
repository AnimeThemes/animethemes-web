import { useContext, useEffect, useRef, useState } from "react";
import {
    StyledPlayer,
    StyledPlayerButton,
    StyledVideo,
    StyledOverlay
} from "./VideoPlayer.style";
import { faDownload, faExpandAlt, faPause, faPlay, faTimes } from "@fortawesome/free-solid-svg-icons";
import { navigate } from "gatsby";
import PlayerContext from "context/playerContext";
import createVideoSlug from "utils/createVideoSlug";
import { useMedia } from "use-media";
import { Icon } from "components/icon";
import { AspectRatio } from "components/utils";
import { Button } from "components/button";
import { Card } from "components/card";
import { Text } from "components/text";
import { Flex } from "components/box";

const videoBaseUrl = process.env.GATSBY_VIDEO_URL || "https://animethemes.moe";

export function VideoPlayer({ video, entry, background, ...props }) {
    const [isPlaying, setPlaying] = useState(false);
    const [canPlay, setCanPlay] = useState(true);
    const playerRef = useRef();
    const { setCurrentVideo } = useContext(PlayerContext);
    const isMobile = useMedia({ maxWidth: "720px" });
    const videoUrl = `${videoBaseUrl}/video/${video.basename}`;

    useEffect(() => {
        if (playerRef.current) {
            setCanPlay(!!playerRef.current.canPlayType("video/webm"));
        }
    }, []);

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
            {!!canPlay ? (
                <AspectRatio ratio={16 / 9}>
                    <StyledVideo
                        ref={playerRef}
                        src={videoUrl}
                        controls={!background}
                        autoPlay
                        onPlay={() => setPlaying(true)}
                        onPause={() => setPlaying(false)}
                        onEnded={() => setPlaying(false)}
                    >
                        Your browser doesn&apos;t support HTML5 video playback. Please use a modern browser.
                    </StyledVideo>
                </AspectRatio>
            ) : (
                <Card gapsColumn="1rem" m="1rem">
                    <Text as="p">Your browser or device doesn&apos;t seem to support WebM video which is required to play video files.</Text>
                    <Text as="p">You can try one of the options below to still watch the video:</Text>
                    <div>
                        <Flex gapsBoth="1rem" flexWrap="wrap">
                            <Button
                                as="a"
                                variant="on-card"
                                href={`vlc-x-callback://x-callback-url/stream?url=${videoUrl}`}
                                gapsRow="0.5rem"
                            >
                                <Icon icon={faPlay} color="text-disabled"/>
                                <Text>Play in VLC</Text>
                            </Button>
                            <Button
                                as="a"
                                variant="on-card"
                                href={videoUrl}
                                download
                                gapsRow="0.5rem"
                            >
                                <Icon icon={faDownload} color="text-disabled"/>
                                <Text>Download</Text>
                            </Button>
                        </Flex>
                    </div>
                </Card>
            )}
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
