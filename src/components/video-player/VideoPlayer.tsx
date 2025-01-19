import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import type { PointerEvent, ReactNode, RefObject, SyntheticEvent } from "react";
import { useRouter } from "next/router";

import {
    StyledAside,
    StyledAudio,
    StyledAudioBackground,
    StyledAudioCover,
    StyledPlaybackArea,
    StyledPlayer,
    StyledPlayerContent,
    StyledVideo,
    StyledVideoBackground,
} from "@/components/video-player/VideoPlayer.style";
import { VideoPlayerBar } from "@/components/video-player/VideoPlayerBar";
import PlayerContext, { type WatchListItem } from "@/context/playerContext";
import type { VideoSummaryCardEntryFragment, VideoSummaryCardVideoFragment } from "@/generated/graphql";
import useMouseRelax from "@/hooks/useMouseRelax";
import useSetting from "@/hooks/useSetting";
import useWatchHistory from "@/hooks/useWatchHistory";
import { AUDIO_URL, VIDEO_URL } from "@/utils/config";
import createVideoSlug from "@/utils/createVideoSlug";
import extractImages from "@/utils/extractImages";
import { AudioMode, GlobalVolume } from "@/utils/settings";

interface VideoPlayerContextValue {
    video: VideoSummaryCardVideoFragment;
    entry: VideoSummaryCardEntryFragment;
    background: boolean;
    videoPagePath: string;
    playerRef: RefObject<HTMLVideoElement | HTMLAudioElement | null>;
    progressRef: RefObject<HTMLDivElement | null>;
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
    const router = useRouter();
    const [globalVolume, setGlobalVolume] = useSetting(GlobalVolume);
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
            playerRef.current.volume = globalVolume;
        }
    }, [globalVolume]);

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
            const progress = (event.currentTarget.currentTime / event.currentTarget.duration) * 100;
            progressRef.current.style.width = `${progress}%`;
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
                previousVideoPath,
                playPreviousTrack,
                nextVideoPath,
                playNextTrack,
                isPlaying,
                togglePlay,
                videoUrl,
                audioUrl,
                updateAudioMode,
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
