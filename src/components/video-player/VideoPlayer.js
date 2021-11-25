import { useContext, useRef, useState } from "react";
import {
    StyledPlayer,
    StyledPlayerButton,
    StyledVideo,
    StyledOverlay, StyledPlayerInfo, StyledPlayerProgress, StyledPlayerProgressBar
} from "./VideoPlayer.style";
import { faDownload, faExpandAlt, faPause, faPlay, faTimes } from "@fortawesome/free-solid-svg-icons";
import PlayerContext from "context/playerContext";
import createVideoSlug from "utils/createVideoSlug";
import { useMedia } from "use-media";
import { Icon } from "components/icon";
import { Button } from "components/button";
import { Card } from "components/card";
import { Text } from "components/text";
import { Flex } from "components/box";
import { Container } from "components/container";
import useCompatability from "hooks/useCompatability";
import { useRouter } from "next/router";
import { videoBaseUrl } from "lib/client/api";

export function VideoPlayer({ video, entry, background, ...props }) {
    const [isPlaying, setPlaying] = useState(false);
    const { canPlayVideo } = useCompatability();
    const playerRef = useRef();
    const progressRef = useRef();
    const { setCurrentVideo } = useContext(PlayerContext);
    const isMobile = useMedia({ maxWidth: "720px" });
    const videoUrl = `${videoBaseUrl}/video/${video.basename}`;
    const router = useRouter();

    function togglePlay() {
        if (isPlaying) {
            playerRef.current.pause();
        } else {
            playerRef.current.play();
        }
    }

    function maximize() {
        const videoSlug = createVideoSlug(entry.theme, entry, video);
        router.push(`/anime/${entry.theme.anime.slug}/${videoSlug}`);
    }

    function preventTextSelection(event) {
        if (event.detail > 1) {
            event.preventDefault();
        }
    }

    function updateProgress(event) {
        if (background && isMobile && progressRef.current) {
            // Update the progress bar using a ref to prevent re-rendering.
            const progress = event.target.currentTime / event.target.duration * 100;
            progressRef.current.style.width = `${progress}%`;
        }
    }

    if (!canPlayVideo) {
        // We don't want the mini player if there's no video to play.
        if (background) {
            return null;
        } else {
            return (
                <Container pb="0">
                    <Card gapsColumn="1rem">
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
                </Container>
            );
        }
    }

    return (
        <StyledPlayer
            background={background}
            onDoubleClick={background ? maximize : undefined}
            onMouseDown={preventTextSelection}

            layout={!isMobile}
            transition={{ type: "tween" }}

            {...props}
        >
            <StyledVideo
                ref={playerRef}
                src={videoUrl}
                controls={!background}
                autoPlay
                onPlay={() => setPlaying(true)}
                onPause={() => setPlaying(false)}
                onEnded={() => setPlaying(false)}
                onClick={background && isMobile ? maximize : undefined}
                onTimeUpdate={updateProgress}
            />
            {background && (
                <>
                    <StyledPlayerProgress>
                        <StyledPlayerProgressBar ref={progressRef} />
                    </StyledPlayerProgress>
                    <StyledPlayerInfo onClick={maximize}>
                        <Text
                            variant="small"
                            color="text-primary"
                            noWrap="ellipsis"
                        >
                            {entry.theme.song.title}
                        </Text>
                        <Text
                            variant="small"
                            color="text-muted"
                            noWrap="ellipsis"
                        >
                            {entry.theme.anime.name}
                        </Text>
                    </StyledPlayerInfo>
                    <StyledOverlay force={!isPlaying}>
                        <StyledPlayerButton onClick={() => setCurrentVideo(null)}>
                            <Icon icon={faTimes} />
                        </StyledPlayerButton>
                        <StyledPlayerButton size="2rem" onClick={togglePlay}>
                            <Icon icon={isPlaying ? faPause : faPlay} />
                        </StyledPlayerButton>
                        <StyledPlayerButton onClick={maximize} hideOnMobile>
                            <Icon icon={faExpandAlt} />
                        </StyledPlayerButton>
                    </StyledOverlay>
                </>
            )}
        </StyledPlayer>
    );
}
