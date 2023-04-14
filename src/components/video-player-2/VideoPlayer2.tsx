import type { ReactNode, SyntheticEvent } from "react";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import {
    StyledAside,
    StyledAudio,
    StyledAudioBackground,
    StyledAudioCover,
    StyledPlaybackArea,
    StyledPlayer,
    StyledPlayerBar,
    StyledPlayerBarActions,
    StyledPlayerBarControl,
    StyledPlayerBarControls,
    StyledPlayerContent,
    StyledVideo,
    StyledVideoBackground
} from "./VideoPlayer2.style";
import PlayerContext from "context/playerContext";
import createVideoSlug from "utils/createVideoSlug";
import { useRouter } from "next/router";
import useSetting from "hooks/useSetting";
import { AudioMode, GlobalVolume } from "utils/settings";
import { AUDIO_URL, VIDEO_URL } from "utils/config";
import extractImages from "utils/extractImages";
import { Text } from "components/text";
import { Column } from "components/box";
import { Switcher } from "components/switcher";
import { SwitcherOption } from "components/switcher/Switcher";
import { Button, IconTextButton } from "components/button";
import { Icon } from "components/icon";
import { faBackwardStep, faForwardStep, faPause, faPlay, faShare, faXmark } from "@fortawesome/pro-solid-svg-icons";
import { Performances, SongTitle } from "components/utils";
import Link from "next/link";
import { PlaylistTrackAddDialog } from "components/dialog/PlaylistTrackAddDialog";
import { Menu, MenuContent, MenuItem, MenuTrigger } from "components/menu/Menu";
import { Toast } from "components/toast";
import { useToasts } from "context/toastContext";
import useWatchHistory from "hooks/useWatchHistory";
import { ProgressBar } from "components/video-player-2/ProgressBar";
import type { VideoSummaryCardVideoFragment } from "generated/graphql";
import { ConditionalWrapper } from "components/utils/ConditionalWrapper";

interface VideoPlayerProps {
    video: VideoSummaryCardVideoFragment;
    background: boolean;
    children?: ReactNode;
}

export function VideoPlayer2({ video, background, children, ...props }: VideoPlayerProps) {
    const entry = video.entries[0];
    const theme = entry.theme!;
    const anime = theme.anime!;

    const videoPath = `/anime/${anime.slug}/${createVideoSlug(theme, entry, video)}`;

    const videoUrl = `${VIDEO_URL}/${video.basename}`;
    const audioUrl = `${AUDIO_URL}/${video.audio.basename}`;

    const [isPlaying, setPlaying] = useState(false);
    const playerRef = useRef<HTMLVideoElement | HTMLAudioElement | null>(null);
    const progressRef = useRef<HTMLDivElement>(null);
    const currentTimeBeforeModeSwitch = useRef<number | null>(null);
    const { watchList, currentWatchListItem, setCurrentWatchListItem } = useContext(PlayerContext);
    const router = useRouter();
    const [globalVolume, setGlobalVolume] = useSetting(GlobalVolume);
    const [canRenderPlayer, setCanRenderPlayer] = useState(false);
    const { smallCover, largeCover } = extractImages(anime);
    const [audioMode, setAudioMode] = useSetting(AudioMode, { storageSync: false });
    const { dispatchToast } = useToasts();
    const { addToHistory } = useWatchHistory();

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

    useEffect(() => setCanRenderPlayer(true), []);

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
            playerRef.current.volume = globalVolume;
            if (currentTimeBeforeModeSwitch.current) {
                playerRef.current.currentTime = currentTimeBeforeModeSwitch.current;
                currentTimeBeforeModeSwitch.current = null;
            }
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

    function saveToClipboard(url: string) {
        navigator.clipboard.writeText(url)
            .then(() => dispatchToast("clipboard", <Toast>Copied to clipboard!</Toast>));
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
        <>
            <StyledPlayer data-background={background || undefined} {...props}>
                <StyledPlayerContent ref={constraintRef}>
                    <StyledPlaybackArea
                        layout
                        drag={background}
                        dragConstraints={constraintRef}
                        animate={background ? undefined : {
                            x: 0,
                            y: 0,
                        }}
                    >
                        {audioMode === AudioMode.ENABLED ? (
                            <StyledAudioBackground>
                                <StyledAudioCover src={largeCover} onClick={background ? undefined : togglePlay}/>
                                <StyledAudio
                                    ref={onPlayerMount}
                                    src={audioUrl}
                                    autoPlay
                                    onPlay={() => setPlaying(true)}
                                    onPause={() => setPlaying(false)}
                                    onEnded={() => {
                                        setPlaying(false);
                                        playNextTrack(true);
                                    }}
                                    onTimeUpdate={updateProgress}
                                    onVolumeChange={(event: SyntheticEvent<HTMLAudioElement>) => setGlobalVolume(event.currentTarget.volume)}
                                />
                            </StyledAudioBackground>
                        ) : (
                            <StyledVideoBackground>
                                <StyledVideo
                                    ref={onPlayerMount}
                                    src={videoUrl}
                                    autoPlay
                                    onPlay={() => setPlaying(true)}
                                    onPause={() => setPlaying(false)}
                                    onEnded={() => {
                                        setPlaying(false);
                                        playNextTrack(true);
                                    }}
                                    onClick={background ? undefined : togglePlay}
                                    onTimeUpdate={updateProgress}
                                    onVolumeChange={(event: SyntheticEvent<HTMLVideoElement>) => setGlobalVolume(event.currentTarget.volume)}
                                />
                            </StyledVideoBackground>
                        )}
                    </StyledPlaybackArea>
                    <StyledAside>
                        {children}
                    </StyledAside>
                </StyledPlayerContent>
                <StyledPlayerBar>
                    <Column style={{ "--gap": "8px" }}>
                        <Text color="text-muted" maxLines={1}>
                            <SongTitle song={theme.song} href={videoPath} />
                            <Text variant="small"> - </Text>
                            <Text weight={600}>{theme.type}{theme.sequence || null}{theme.group && ` (${theme.group})`}</Text>
                            <Text variant="small"> from </Text>
                            <Link href={`/anime/${anime.slug}`} passHref legacyBehavior>
                                <Text as="a" link>{anime.name}</Text>
                            </Link>
                        </Text>
                        {!!theme.song?.performances?.length && (
                            <Text variant="small" color="text-muted">
                                <Text>Performed</Text>
                                <Performances song={theme.song} maxPerformances={3} />
                            </Text>
                        )}
                    </Column>
                    <StyledPlayerBarControls>
                        {previousVideoPath ? (
                            <ConditionalWrapper
                                condition={!background}
                                wrap={(children) => <Link href={previousVideoPath}>{children}</Link>}
                            >
                                <StyledPlayerBarControl
                                    icon={faBackwardStep}
                                    isCircle
                                    onClick={() => playPreviousTrack(!background)}
                                />
                            </ConditionalWrapper>
                        ) : (
                            <StyledPlayerBarControl
                                icon={faBackwardStep}
                                isCircle
                                disabled
                            />
                        )}
                        <StyledPlayerBarControl
                            icon={isPlaying ? faPause :  <Icon icon={faPlay} color="text-disabled" style={{ transform: "translateX(2px)" }} />}
                            isCircle
                            onClick={togglePlay}
                        />
                        {nextVideoPath ? (
                            <ConditionalWrapper
                                condition={!background}
                                wrap={(children) => <Link href={nextVideoPath}>{children}</Link>}
                            >
                                <StyledPlayerBarControl
                                    icon={faForwardStep}
                                    isCircle
                                    onClick={() => playNextTrack(!background)}
                                />
                            </ConditionalWrapper>
                        ) : (
                            <StyledPlayerBarControl
                                icon={faForwardStep}
                                isCircle
                                disabled
                            />
                        )}
                    </StyledPlayerBarControls>
                    <StyledPlayerBarActions>
                        <PlaylistTrackAddDialog
                            video={{
                                // Flip the structure on it's head,
                                // because we need video as the root object here.
                                ...video,
                                entries: [{
                                    ...entry,
                                    theme,
                                }],
                            }}
                        />
                        <Menu modal={false}>
                            <MenuTrigger asChild>
                                <Button style={{ "--gap": "8px" }}>
                                    <Icon icon={faShare}/>
                                    <Text>Share</Text>
                                </Button>
                            </MenuTrigger>
                            <MenuContent>
                                <MenuItem onSelect={() => saveToClipboard(location.href)}>Copy URL to this Page</MenuItem>
                                {audioMode === AudioMode.ENABLED ? (
                                    <MenuItem onSelect={() => saveToClipboard(audioUrl)}>Copy URL to Embeddable Audio</MenuItem>
                                ) : (
                                    <MenuItem onSelect={() => saveToClipboard(videoUrl)}>Copy URL to Embeddable Video</MenuItem>
                                )}
                            </MenuContent>
                        </Menu>
                        {canRenderPlayer ? (
                            <Switcher selectedItem={audioMode} onChange={updateAudioMode}>
                                <SwitcherOption value={AudioMode.DISABLED}>Video</SwitcherOption>
                                <SwitcherOption value={AudioMode.ENABLED}>Audio</SwitcherOption>
                            </Switcher>
                        ) : null}
                        <IconTextButton
                            icon={faXmark}
                            isCircle
                            disabled={!background}
                            onClick={() => setCurrentWatchListItem(null)}
                        />
                    </StyledPlayerBarActions>
                    <ProgressBar
                        playerRef={playerRef}
                        progressRef={progressRef}
                    />
                </StyledPlayerBar>
            </StyledPlayer>
        </>
    );
}
