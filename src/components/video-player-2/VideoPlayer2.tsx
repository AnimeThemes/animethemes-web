import type { PointerEvent, ReactNode, RefObject, SyntheticEvent } from "react";
import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import {
    StyledAside,
    StyledAudio,
    StyledAudioBackground,
    StyledAudioCover,
    StyledPlaybackArea,
    StyledPlayer,
    StyledPlayerContent,
    StyledVideo,
    StyledVideoBackground
} from "./VideoPlayer2.style";
import PlayerContext from "context/playerContext";
import createVideoSlug from "utils/createVideoSlug";
import { useRouter } from "next/router";
import useSetting from "hooks/useSetting";
import { AudioMode, GlobalVolume } from "utils/settings";
import { AUDIO_URL, VIDEO_URL } from "utils/config.mjs";
import extractImages from "utils/extractImages";
import useWatchHistory from "hooks/useWatchHistory";
import type { VideoSummaryCardVideoFragment } from "generated/graphql";
import { VideoPlayerBar } from "components/video-player-2/VideoPlayerBar";
import useMouseRelax from "hooks/useMouseRelax";

interface VideoPlayerContextValue {
    video: VideoSummaryCardVideoFragment;
    background: boolean;
    videoPagePath: string;
    playerRef: RefObject<HTMLVideoElement | HTMLAudioElement | null>;
    progressRef: RefObject<HTMLDivElement>;
    previousVideoPath: string | null;
    playPreviousTrack(navigate: boolean): void;
    nextVideoPath: string | null;
    playNextTrack(navigate: boolean): void;
    isPlaying: boolean;
    togglePlay(): void;
    videoUrl: string;
    audioUrl: string;
    updateAudioMode(audioMode: string): void;
}

export const VideoPlayerContext = createContext<VideoPlayerContextValue | null>(null);

type VideoPlayerProps = {
    video: VideoSummaryCardVideoFragment;
    background: boolean;
    children?: ReactNode;
    overlay?: ReactNode;
}

export function VideoPlayer2({ video, background, children, overlay, ...props }: VideoPlayerProps) {
    const entry = video.entries[0];
    const theme = entry.theme;
    const anime = theme.anime;

    const videoPagePath = `/anime/${anime.slug}/${createVideoSlug(theme, entry, video)}`;

    const videoUrl = `${VIDEO_URL}/${video.basename}`;
    const audioUrl = `${AUDIO_URL}/${video.audio.basename}`;

    const [isPlaying, setPlaying] = useState(false);
    const [aspectRatio, setAspectRatio] = useState(16 / 9);

    const containerRef = useRef<HTMLDivElement>(null);
    const playerRef = useRef<HTMLVideoElement | HTMLAudioElement | null>(null);
    const progressRef = useRef<HTMLDivElement>(null);
    const currentTimeBeforeModeSwitch = useRef<number | null>(null);

    const { watchList, currentWatchListItem, setCurrentWatchListItem } = useContext(PlayerContext);
    const router = useRouter();
    const [globalVolume, setGlobalVolume] = useSetting(GlobalVolume);
    const { smallCover, largeCover } = extractImages(anime);
    const [audioMode, setAudioMode] = useSetting(AudioMode, { storageSync: false });
    const { addToHistory } = useWatchHistory();
    const isRelaxed = useMouseRelax();

    const previousVideo = getWatchListVideo(-1);
    const previousEntry = previousVideo?.entries[0];
    const previousTheme = previousEntry?.theme;
    const previousAnime = previousTheme?.anime;

    const previousVideoPath = (previousAnime && previousTheme && previousVideo)
        ? `/anime/${previousAnime.slug}/${createVideoSlug(previousTheme, previousEntry, previousVideo)}`
        : null;

    const playPreviousTrack = useCallback((navigate = false) => {
        if (previousVideoPath) {
            setCurrentWatchListItem(previousVideo);
            if (navigate) {
                router.push(previousVideoPath);
            }
        }
    }, [previousVideo, previousVideoPath, router, setCurrentWatchListItem]);
    
    const nextVideo = getWatchListVideo(1);
    const nextEntry = nextVideo?.entries[0];
    const nextTheme = nextEntry?.theme;
    const nextAnime = nextTheme?.anime;

    const nextVideoPath = (nextAnime && nextTheme && nextVideo)
        ? `/anime/${nextAnime.slug}/${createVideoSlug(nextTheme, nextEntry, nextVideo)}`
        : null;

    const playNextTrack = useCallback((navigate = false) => {
        if (nextVideoPath) {
            setCurrentWatchListItem(nextVideo);
            if (navigate) {
                router.push(nextVideoPath);
            }
        }
    }, [nextVideo, nextVideoPath, router, setCurrentWatchListItem]);

    useEffect(() => {
        if (playerRef.current) {
            playerRef.current.volume = globalVolume;
        }
    }, [globalVolume]);

    useEffect(() => {
        addToHistory({
            ...theme,
            entries: [
                {
                    ...entry,
                    videos: [
                        video,
                    ],
                },
            ],
        });

        // Reset the progress bar (otherwise we'd have to wait for the player to load).
        if (progressRef.current) {
            progressRef.current.style.width = "0%";
        }

        // We don't want to re-add the theme when the history changes, because it can cause
        // various issues when multiple tabs are open.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [theme]);

    useEffect(() => {
        if (theme && smallCover && navigator.mediaSession) {
            navigator.mediaSession.metadata = new MediaMetadata({
                title: `${theme.slug} • ${theme.song?.title || "T.B.A."}`,
                artist: theme.song?.performances
                    ? theme.song.performances.map((performance) => performance.as || performance.artist.name).join(", ")
                    : undefined,
                album: anime.name,
                artwork: [
                    { src: smallCover, sizes: "512x512", type: "image/jpeg" }
                ]
            });
            
            navigator.mediaSession.setActionHandler("previoustrack", () => { playPreviousTrack(true); });
            navigator.mediaSession.setActionHandler("nexttrack", () => { playNextTrack(true); });
        }
    }, [anime, theme, smallCover, playNextTrack, playPreviousTrack]);

    function onPlayerMount(player: HTMLVideoElement) {
        playerRef.current = player;
        if (playerRef.current) {
            setPlaying(!playerRef.current.paused);
            if ("videoWidth" in playerRef.current) {
                setAspectRatio(playerRef.current.videoWidth / playerRef.current.videoHeight);
            }
            playerRef.current.volume = globalVolume;
            if (currentTimeBeforeModeSwitch.current) {
                playerRef.current.currentTime = currentTimeBeforeModeSwitch.current;
                currentTimeBeforeModeSwitch.current = null;
            }
        }
    }

    function onPlayerClick(event: PointerEvent) {
        if (!background && event.nativeEvent.pointerType === "mouse" && event.nativeEvent.button === 0) {
            togglePlay();
        }
    }

    function togglePlay() {
        if (isPlaying) {
            playerRef.current?.pause();
        } else {
            playerRef.current?.play();
        }
    }

    function updateProgress(event: SyntheticEvent<HTMLVideoElement | HTMLAudioElement>) {
        if (progressRef.current) {
            // Update the progress bar using a ref to prevent re-rendering.
            const progress = event.currentTarget.currentTime / event.currentTarget.duration * 100;
            progressRef.current.style.width = `${progress}%`;
        }
    }

    function updateAudioMode(audioMode: string) {
        currentTimeBeforeModeSwitch.current = playerRef.current?.currentTime ?? null;
        setAudioMode(audioMode);
    }

    function getWatchListVideo(offset: 1 | -1) {
        if (!currentWatchListItem) {
            return null;
        }

        const currentTrackIndex = watchList.findIndex((item) => item.watchListId === currentWatchListItem.watchListId);

        if (currentTrackIndex < 0) {
            return null;
        }

        const nextTrackIndex = currentTrackIndex + offset;

        if (!watchList[nextTrackIndex]) {
            return null;
        }

        return watchList[nextTrackIndex];
    }

    const constraintRef = useRef<HTMLDivElement>(null);

    return (
        <VideoPlayerContext.Provider value={{
            video,
            background,
            videoPagePath,
            playerRef,
            progressRef,
            previousVideoPath,
            playPreviousTrack,
            nextVideoPath,
            playNextTrack,
            isPlaying,
            togglePlay,
            videoUrl,
            audioUrl,
            updateAudioMode,
        }}>
            <StyledPlayer
                ref={containerRef}
                data-background={background || undefined}
                data-relaxed={isRelaxed || undefined}
                {...props}
            >
                <StyledPlayerContent ref={constraintRef}>
                    <StyledPlaybackArea
                        layout
                        drag={background}
                        dragConstraints={constraintRef}
                        animate={background ? undefined : {
                            x: 0,
                            y: 0,
                        }}
                        onDoubleClick={() => router.push(videoPagePath)}
                    >
                        {audioMode === AudioMode.ENABLED ? (
                            <StyledAudioBackground style={{ aspectRatio }}>
                                <StyledAudioCover
                                    src={largeCover}
                                    onPointerDown={onPlayerClick}
                                    onLoad={(event) => {
                                        setAspectRatio(event.currentTarget.naturalWidth / event.currentTarget.naturalHeight);
                                    }}
                                />
                                <StyledAudio
                                    ref={onPlayerMount}
                                    src={audioUrl}
                                    autoPlay
                                    onPlay={() => setPlaying(true)}
                                    onPause={() => setPlaying(false)}
                                    onEnded={() => {
                                        setPlaying(false);
                                        playNextTrack(!background);
                                    }}
                                    onTimeUpdate={updateProgress}
                                    onVolumeChange={(event: SyntheticEvent<HTMLAudioElement>) => setGlobalVolume(event.currentTarget.volume)}
                                />
                                {overlay}
                            </StyledAudioBackground>
                        ) : (
                            <StyledVideoBackground style={{ aspectRatio }}>
                                <StyledVideo
                                    ref={onPlayerMount}
                                    src={videoUrl}
                                    autoPlay
                                    onPlay={() => setPlaying(true)}
                                    onPause={() => setPlaying(false)}
                                    onEnded={() => {
                                        setPlaying(false);
                                        playNextTrack(!background);
                                    }}
                                    onPointerDown={onPlayerClick}
                                    onTimeUpdate={updateProgress}
                                    onVolumeChange={(event: SyntheticEvent<HTMLVideoElement>) => setGlobalVolume(event.currentTarget.volume)}
                                    onLoadedMetadata={(event) => {
                                        setAspectRatio(event.currentTarget.videoWidth / event.currentTarget.videoHeight);
                                    }}
                                />
                                {overlay}
                            </StyledVideoBackground>
                        )}
                    </StyledPlaybackArea>
                    <StyledAside>
                        {children}
                    </StyledAside>
                </StyledPlayerContent>
                <VideoPlayerBar />
            </StyledPlayer>
        </VideoPlayerContext.Provider>
    );
}
