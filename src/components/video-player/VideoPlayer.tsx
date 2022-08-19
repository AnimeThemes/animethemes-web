import { SyntheticEvent, MouseEvent, useContext, useEffect, useRef, useState } from "react";
import {
    StyledAudio,
    StyledAudioBackground,
    StyledAudioCover,
    StyledOverlay,
    StyledPlayer,
    StyledPlayerButton,
    StyledPlayerInfo,
    StyledPlayerProgress,
    StyledPlayerProgressBar,
    StyledVideo
} from "./VideoPlayer.style";
import { faDownload, faExpandAlt, faPause, faPlay, faTimes } from "@fortawesome/pro-solid-svg-icons";
import PlayerContext from "context/playerContext";
import createVideoSlug from "utils/createVideoSlug";
import { Icon } from "components/icon";
import { IconTextButton } from "components/button";
import { Card } from "components/card";
import { Text } from "components/text";
import { Column, Row } from "components/box";
import { Container } from "components/container";
import useCompatability from "hooks/useCompatability";
import { useRouter } from "next/router";
import useMediaQuery from "hooks/useMediaQuery";
import styledTheme from "theme";
import { SongTitle } from "components/utils";
import useSetting from "hooks/useSetting";
import { AudioMode, GlobalVolume } from "utils/settings";
import { VIDEO_URL, AUDIO_URL } from "utils/config";
import gql from "graphql-tag";
import {
    VideoPlayerAnimeFragment,
    VideoPlayerEntryFragment,
    VideoPlayerThemeFragment,
    VideoPlayerVideoFragment
} from "generated/graphql";
import extractImages from "utils/extractImages";

interface VideoPlayerProps {
    anime: VideoPlayerAnimeFragment
    theme: VideoPlayerThemeFragment
    entry: VideoPlayerEntryFragment
    video: VideoPlayerVideoFragment
    background: boolean
}

export function VideoPlayer({ anime, theme, entry, video, background, ...props }: VideoPlayerProps) {
    const [isPlaying, setPlaying] = useState(false);
    const { canPlayVideo } = useCompatability();
    const playerRef = useRef<HTMLVideoElement>(null);
    const progressRef = useRef<HTMLDivElement>(null);
    const { clearCurrentVideo } = useContext(PlayerContext);
    const isMobile = useMediaQuery(`(max-width: ${styledTheme.breakpoints.mobileMax})`);
    const router = useRouter();
    const [globalVolume, setGlobalVolume] = useSetting(GlobalVolume);
    const [canRenderPlayer, setCanRenderPlayer] = useState(false);
    const { largeCover } = extractImages(anime);
    const [audioMode] = useSetting(AudioMode);

    const videoUrl = `${VIDEO_URL}/${video.basename}`;
    const audioUrl = `${AUDIO_URL}/${video.audio.basename}`;

    useEffect(() => setCanRenderPlayer(true), []);

    useEffect(() => {
        if (playerRef.current) {
            playerRef.current.volume = globalVolume;
        }
    }, [globalVolume]);

    function togglePlay() {
        if (isPlaying) {
            playerRef.current?.pause();
        } else {
            playerRef.current?.play();
        }
    }

    function maximize() {
        const videoSlug = createVideoSlug(theme, entry, video);
        router.push(`/anime/${anime.slug}/${videoSlug}`);
    }

    function preventTextSelection(event: MouseEvent) {
        if (event.detail > 1) {
            event.preventDefault();
        }
    }

    function updateProgress(event: SyntheticEvent<HTMLVideoElement>) {
        if (background && isMobile && progressRef.current) {
            // Update the progress bar using a ref to prevent re-rendering.
            const progress = event.currentTarget.currentTime / event.currentTarget.duration * 100;
            progressRef.current.style.width = `${progress}%`;
        }
    }

    if (!canPlayVideo) {
        // We don't want the mini player if there's no video to play.
        if (background) {
            return null;
        } else {
            return (
                <Container>
                    <Card>
                        <Column style={{ "--gap": "16px" }}>
                            <Text as="p">Your browser or device doesn&apos;t seem to support WebM video which is required to play video files.</Text>
                            <Text as="p">You can try one of the options below to still watch the video:</Text>
                            <Row $wrap style={{ "--gap": "16px" }}>
                                <IconTextButton
                                    variant="solid"
                                    forwardedAs="a"
                                    href={`vlc-x-callback://x-callback-url/stream?url=${videoUrl}`}
                                    icon={faPlay}
                                >Play in VLC</IconTextButton>
                                <IconTextButton
                                    variant="solid"
                                    forwardedAs="a"
                                    href={videoUrl}
                                    download
                                    icon={faDownload}
                                >Download</IconTextButton>
                            </Row>
                        </Column>
                    </Card>
                </Container>
            );
        }
    }

    return (
        <StyledPlayer
            $background={background}
            onDoubleClick={background ? maximize : undefined}
            onMouseDown={preventTextSelection}

            layout={!isMobile}
            transition={{ type: "tween" }}

            {...props}
        >
            {canRenderPlayer ? (
                audioMode === AudioMode.ENABLED ? (
                    <StyledAudioBackground>
                        <StyledAudioCover src={largeCover}/>
                        <StyledAudio
                            ref={playerRef}
                            src={audioUrl}
                            controls={!background}
                            autoPlay
                            onPlay={() => setPlaying(true)}
                            onPause={() => setPlaying(false)}
                            onEnded={() => setPlaying(false)}
                            onClick={background && isMobile ? maximize : undefined}
                            onTimeUpdate={updateProgress}
                            onVolumeChange={(event: SyntheticEvent<HTMLVideoElement>) => setGlobalVolume(event.currentTarget.volume)}
                        />
                    </StyledAudioBackground>
                ) : (
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
                        onVolumeChange={(event: SyntheticEvent<HTMLVideoElement>) => setGlobalVolume(event.currentTarget.volume)}
                    />
                )
            ) : null}
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
                            <SongTitle song={theme.song}/>
                        </Text>
                        <Text
                            variant="small"
                            color="text-muted"
                            noWrap="ellipsis"
                        >
                            {anime.name}
                        </Text>
                    </StyledPlayerInfo>
                    <StyledOverlay force={!isPlaying}>
                        <StyledPlayerButton onClick={clearCurrentVideo}>
                            <Icon icon={faTimes} />
                        </StyledPlayerButton>
                        <StyledPlayerButton size="32px" onClick={togglePlay}>
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

VideoPlayer.fragments = {
    anime: gql`
        ${extractImages.fragments.resourceWithImages}
        
        fragment VideoPlayerAnime on Anime {
            ...extractImagesResourceWithImages
            slug
            name
        }
    `,
    theme: gql`
        ${createVideoSlug.fragments.theme}
        ${SongTitle.fragments.song}
        
        fragment VideoPlayerTheme on Theme {
            ...createVideoSlugTheme
            song {
                ...SongTitleSong
            }
        }
    `,
    entry: gql`
        ${createVideoSlug.fragments.entry}

        fragment VideoPlayerEntry on Entry {
            ...createVideoSlugEntry
        }
    `,
    video: gql`
        ${createVideoSlug.fragments.video}

        fragment VideoPlayerVideo on Video {
            ...createVideoSlugVideo
            basename
            audio {
                basename
            }
        }
    `,
};
