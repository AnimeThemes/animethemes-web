import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import type { PointerEvent, ReactNode, RefObject, SyntheticEvent } from "react";
import { useRouter } from "next/router";

import {
    StyledAside,
    StyledAudio,
    StyledAudioBackground,
    StyledAudioCover,
    StyledAudioCoverBackground,
    StyledPlaybackArea,
    StyledPlayer,
    StyledPlayerContent,
    StyledVideo,
    StyledVideoBackground,
} from "@/components/video-player/VideoPlayer.style";
import { VideoPlayerBar } from "@/components/video-player/VideoPlayerBar";
import FullscreenContext from "@/context/fullscreenContext";
import PlayerContext, { type WatchListItem } from "@/context/playerContext";
import type { VideoSummaryCardEntryFragment, VideoSummaryCardVideoFragment } from "@/generated/graphql";
import useMouseRelax from "@/hooks/useMouseRelax";
import useSetting from "@/hooks/useSetting";
import useWatchHistory from "@/hooks/useWatchHistory";
import { AUDIO_URL, VIDEO_URL } from "@/utils/config";
import createVideoSlug from "@/utils/createVideoSlug";
import extractImages from "@/utils/extractImages";
import { AudioMode, GlobalVolume, Muted } from "@/utils/settings";

interface VideoPlayerContextValue {
    video: VideoSummaryCardVideoFragment;
    entry: VideoSummaryCardEntryFragment;
    background: boolean;
    videoPagePath: string;
    playerRef: RefObject<HTMLVideoElement | HTMLAudioElement | null>;
    progressRef: RefObject<HTMLDivElement | null>;
    bufferedRef: RefObject<HTMLDivElement | null>;
    previousVideoPath: string | null;
    playPreviousTrack(navigate: boolean): void;
    nextVideoPath: string | null;
    playNextTrack(navigate: boolean): void;
    isPlaying: boolean;
    togglePlay(): void;
    videoUrl: string;
    audioUrl: string;
    updateAudioMode(audioMode: string): void;
    togglePip(): void;
}

export const VideoPlayerContext = createContext<VideoPlayerContextValue | null>(null);

type VideoPlayerProps = {
    watchListItem: WatchListItem;
    background: boolean;
    children?: ReactNode;
    overlay?: ReactNode;
};

export function VideoPlayer({ watchListItem, background, children, overlay, ...props }: VideoPlayerProps) {
    const { video, entry } = watchListItem;
    const theme = entry.theme;
    const anime = theme.anime;

    const videoPagePath = `/anime/${anime.slug}/${createVideoSlug(theme, entry, video)}`;

    const videoUrl = `${VIDEO_URL}/${video.basename}`;
    const audioUrl = `${AUDIO_URL}/${video.audio.basename}`;

    const [isPlaying, setPlaying] = useState(false);
    const [aspectRatio, setAspectRatio] = useState(16 / 9);
    const [isMiniPlayerAnimating, setMiniPlayerAnimating] = useState(false);

    const containerRef = useRef<HTMLDivElement>(null);
    const playerRef = useRef<HTMLVideoElement | HTMLAudioElement | null>(null);
    const progressRef = useRef<HTMLDivElement>(null);
    const bufferedRef = useRef<HTMLDivElement>(null);
    const currentTimeBeforeModeSwitch = useRef<number | null>(null);

    const {
        watchList,
        currentWatchListItem,
        setCurrentWatchListItem,
        isGlobalAutoPlay,
        isLocalAutoPlay,
        isWatchListUsingLocalAutoPlay,
        isRepeat,
    } = useContext(PlayerContext);
    const { toggleFullscreen } = useContext(FullscreenContext);
    const router = useRouter();
    const [globalVolume, setGlobalVolume] = useSetting(GlobalVolume);
    const [muted, setMuted] = useSetting(Muted);
    const { smallCover, largeCover } = extractImages(anime);
    const [audioMode, setAudioMode] = useSetting(AudioMode, { storageSync: false });
    const { addToHistory } = useWatchHistory();

    const playerMouseRelaxProps = useMouseRelax();
    const playbackAreaMouseRelaxProps = useMouseRelax();

    const previousWatchListItem = getRelativeWatchListItem(-1);
    const previousVideo = previousWatchListItem?.video;
    const previousEntry = previousWatchListItem?.entry;
    const previousTheme = previousEntry?.theme;
    const previousAnime = previousTheme?.anime;

    const previousVideoPath =
        previousAnime && previousTheme && previousVideo
            ? `/anime/${previousAnime.slug}/${createVideoSlug(previousTheme, previousEntry, previousVideo)}`
            : null;

    const playPreviousTrack = useCallback(
        (navigate = false) => {
            if (previousVideoPath) {
                setCurrentWatchListItem(previousWatchListItem);
                if (navigate) {
                    router.push(previousVideoPath);
                }
            }
        },
        [previousVideoPath, previousWatchListItem, router, setCurrentWatchListItem],
    );

    const nextWatchListItem = getRelativeWatchListItem(1);
    const nextVideo = nextWatchListItem?.video;
    const nextEntry = nextWatchListItem?.entry;
    const nextTheme = nextEntry?.theme;
    const nextAnime = nextTheme?.anime;

    const nextVideoPath =
        nextAnime && nextTheme && nextVideo
            ? `/anime/${nextAnime.slug}/${createVideoSlug(nextTheme, nextEntry, nextVideo)}`
            : null;

    const playNextTrack = useCallback(
        (navigate = false) => {
            if (nextVideoPath) {
                setCurrentWatchListItem(nextWatchListItem);
                if (navigate) {
                    router.push(nextVideoPath);
                }
                // For repeating videos
                if (currentWatchListItem?.video.basename === nextVideo?.basename) {
                    playerRef.current?.play();
                }
            }
        },
        [
            currentWatchListItem?.video.basename,
            nextVideo?.basename,
            nextVideoPath,
            nextWatchListItem,
            router,
            setCurrentWatchListItem,
        ],
    );
    

    const togglePip = () => {
        const videoElement = document.querySelector("video");
        if (videoElement) {
            if (document.pictureInPictureElement) {
                document.exitPictureInPicture();
            } else {
                videoElement.requestPictureInPicture();
            }
        }
    };

    // Handle keyboard inputs
    const onKeyDown = useCallback((event: KeyboardEvent) => {
        if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) {
            return;
        }

        switch (event.key.toLocaleLowerCase()) {
            case " ": // Play/Pause
            case "k":
                event.preventDefault();
                togglePlay();
                break;
            case "arrowright": // Seek forward
                event.preventDefault();
                if (playerRef.current) {
                    playerRef.current.currentTime += 5;
                }
                break;
            case ".": // Seek forward large
                event.preventDefault();
                if (playerRef.current) {
                    playerRef.current.currentTime += 10;
                }
                break;
            case "arrowleft": // Seek backward
                event.preventDefault();
                if (playerRef.current) {
                    playerRef.current.currentTime -= 5;
                }
                break;
            case ",": // Seek backward large
                event.preventDefault();
                if (playerRef.current) {
                    playerRef.current.currentTime -= 10;
                }
                break;
            case "n": // Next track
                event.preventDefault();
                playNextTrack(true);
                break;
            case "b": // Previous track
                event.preventDefault();
                playPreviousTrack(true);
                break;
            case "m": // Mute
                event.preventDefault();
                if (playerRef.current) {
                    setMuted(!muted);
                }
                break;
            case "arrowup": // Volume up
                event.preventDefault();
                if (playerRef.current) {
                    setGlobalVolume(Math.min(globalVolume + 0.1, 1));
                    setMuted(false);
                }
                break;
            case "arrowdown": // Volume down
                event.preventDefault();
                if (playerRef.current) {
                    setGlobalVolume(Math.max(globalVolume - 0.1, 0));
                    setMuted(false);
                }
                break;
            case "d": // Download
                event.preventDefault();
                if (audioMode === AudioMode.ENABLED) {
                    const link = document.createElement("a");
                    link.href = `${audioUrl}?download`;
                    link.click();
                } else {
                    const link = document.createElement("a");
                    link.href = `${videoUrl}?download`;
                    link.click();
                }
                break;
            case "f": // Fullscreen
                event.preventDefault();
                toggleFullscreen();
                break;
            case "a": // Toggle audio mode
                event.preventDefault();
                updateAudioMode(audioMode === AudioMode.ENABLED ? AudioMode.DISABLED : AudioMode.ENABLED);
                break;
            case "p": // Toggle Picture-in-Picture
                event.preventDefault();
                togglePip();
                break;
        }
    }, [togglePlay, playNextTrack, playPreviousTrack, audioMode, audioUrl, videoUrl, toggleFullscreen]);

    const autoPlayNextTrack = useCallback(() => {
        if (
            (isWatchListUsingLocalAutoPlay && isLocalAutoPlay) ||
            (!isWatchListUsingLocalAutoPlay && isGlobalAutoPlay)
        ) {
            playNextTrack(!background);
        }
    }, [background, isGlobalAutoPlay, isLocalAutoPlay, isWatchListUsingLocalAutoPlay, playNextTrack]);

    useEffect(() => {
        if (playerRef.current) {
            playerRef.current.muted = muted;
            playerRef.current.volume = globalVolume;
        }
    }, [globalVolume, muted]);

    useEffect(() => {
        addToHistory({
            ...theme,
            entries: [
                {
                    ...entry,
                    videos: [video],
                },
            ],
        });

        // Reset the progress bar (otherwise we'd have to wait for the player to load).
        if (progressRef.current) {
            progressRef.current.style.width = "0%";
        }

        if (bufferedRef.current) {
            bufferedRef.current.style.width = "0%";
        }

        // We don't want to re-add the theme when the history changes, because it can cause
        // various issues when multiple tabs are open.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [theme]);

    useEffect(() => {
        if (theme && smallCover && navigator.mediaSession) {
            navigator.mediaSession.metadata = new MediaMetadata({
                title: `${theme.type + (theme.sequence || "")} • ${theme.song?.title || "T.B.A."}`,
                artist: theme.song?.performances
                    ? theme.song.performances.map((performance) => performance.as || performance.artist.name).join(", ")
                    : undefined,
                album: anime.name,
                artwork: [{ src: smallCover, sizes: "512x512", type: "image/jpeg" }],
            });

            navigator.mediaSession.setActionHandler("previoustrack", () => {
                playPreviousTrack(true);
            });
            navigator.mediaSession.setActionHandler("nexttrack", () => {
                playNextTrack(true);
            });
        }
    }, [anime, theme, smallCover, playNextTrack, playPreviousTrack]);

    // Keyboard shortcuts
    useEffect(() => {
        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [onKeyDown]);

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
        const duration = event.currentTarget.duration;

        if (progressRef.current) {
            // Update the progress bar using a ref to prevent re-rendering.
            const progress = (event.currentTarget.currentTime / duration) * 100;
            progressRef.current.style.width = `${progress}%`;
        }

        if (bufferedRef.current) {
            const buffered = event.currentTarget.buffered;
            if (buffered.length > 0) {
                const bufferedEnd = buffered.end(buffered.length - 1);
                bufferedRef.current.style.width = `${(bufferedEnd / duration) * 100}%`;
            }
        }
    }

    function updateAudioMode(audioMode: string) {
        currentTimeBeforeModeSwitch.current = playerRef.current?.currentTime ?? null;
        setAudioMode(audioMode);
    }

    function getRelativeWatchListItem(offset: 1 | -1) {
        if (!currentWatchListItem) {
            return null;
        }

        const currentTrackIndex = watchList.findIndex((item) => item.watchListId === currentWatchListItem.watchListId);

        if (currentTrackIndex < 0) {
            return null;
        }

        const nextTrackIndex = currentTrackIndex + offset;

        if (!watchList[nextTrackIndex]) {
            if (!isRepeat) {
                return null;
            }

            if (nextTrackIndex < 0) {
                return watchList[watchList.length - 1];
            } else if (nextTrackIndex > watchList.length - 1) {
                return watchList[0];
            }
        }

        return watchList[nextTrackIndex];
    }

    const constraintRef = useRef<HTMLDivElement>(null);

    return (
        <VideoPlayerContext.Provider
            value={{
                video,
                entry,
                background,
                videoPagePath,
                playerRef,
                progressRef,
                bufferedRef,
                previousVideoPath,
                playPreviousTrack,
                nextVideoPath,
                playNextTrack,
                isPlaying,
                togglePlay,
                videoUrl,
                audioUrl,
                updateAudioMode,
                togglePip,
            }}
        >
            <StyledPlayer
                ref={containerRef}
                data-background={background || undefined}
                {...playerMouseRelaxProps}
                {...props}
            >
                <StyledPlayerContent ref={constraintRef}>
                    <StyledPlaybackArea
                        layout
                        drag={background && !isMiniPlayerAnimating}
                        dragConstraints={constraintRef}
                        animate={
                            background
                                ? undefined
                                : {
                                      x: 0,
                                      y: 0,
                                  }
                        }
                        onLayoutAnimationStart={() => setMiniPlayerAnimating(true)}
                        onLayoutAnimationComplete={() => setMiniPlayerAnimating(false)}
                        onDoubleClick={() => router.push(videoPagePath)}
                        {...playbackAreaMouseRelaxProps}
                    >
                        {audioMode === AudioMode.ENABLED ? (
                            <StyledAudioBackground style={{ aspectRatio }}>
                                <StyledAudioCoverBackground
                                    src={largeCover}
                                    onPointerDown={onPlayerClick}
                                    onLoad={(event) => {
                                        setAspectRatio(
                                            event.currentTarget.naturalWidth / event.currentTarget.naturalHeight,
                                        );
                                    }}
                                />
                                <StyledAudioCover
                                    src={largeCover}
                                    onPointerDown={onPlayerClick}
                                    onLoad={(event) => {
                                        setAspectRatio(
                                            event.currentTarget.naturalWidth / event.currentTarget.naturalHeight,
                                        );
                                    }}
                                />
                                <StyledAudio
                                    ref={onPlayerMount}
                                    src={audioUrl}
                                    autoPlay
                                    playsInline
                                    onPlay={() => setPlaying(true)}
                                    onPause={() => setPlaying(false)}
                                    onEnded={() => {
                                        setPlaying(false);
                                        autoPlayNextTrack();
                                    }}
                                    onTimeUpdate={updateProgress}
                                    onVolumeChange={(event: SyntheticEvent<HTMLAudioElement>) =>
                                        setGlobalVolume(event.currentTarget.volume)
                                    }
                                />
                                {overlay}
                            </StyledAudioBackground>
                        ) : (
                            <StyledVideoBackground style={{ aspectRatio }}>
                                <StyledVideo
                                    ref={onPlayerMount}
                                    src={videoUrl}
                                    autoPlay
                                    playsInline
                                    onPlay={() => setPlaying(true)}
                                    onPause={() => setPlaying(false)}
                                    onEnded={() => {
                                        setPlaying(false);
                                        autoPlayNextTrack();
                                    }}
                                    onPointerDown={onPlayerClick}
                                    onTimeUpdate={updateProgress}
                                    onVolumeChange={(event: SyntheticEvent<HTMLVideoElement>) =>
                                        setGlobalVolume(event.currentTarget.volume)
                                    }
                                    onLoadedMetadata={(event) => {
                                        setAspectRatio(
                                            event.currentTarget.videoWidth / event.currentTarget.videoHeight,
                                        );
                                    }}
                                />
                                {overlay}
                            </StyledVideoBackground>
                        )}
                    </StyledPlaybackArea>
                    <StyledAside>{children}</StyledAside>
                </StyledPlayerContent>
                <VideoPlayerBar />
            </StyledPlayer>
        </VideoPlayerContext.Provider>
    );
}
