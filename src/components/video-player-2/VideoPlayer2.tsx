import type { SyntheticEvent } from "react";
import { useContext, useEffect, useRef, useState } from "react";
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
    StyledScrollArea,
    StyledSwitcher,
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
import { AnimeSummaryCard, ArtistSummaryCard, SummaryCard, ThemeSummaryCard } from "components/card";
import { Column, Row } from "components/box";
import type { VideoPageProps } from "pages/anime/[animeSlug]/[videoSlug]";
import { Switcher } from "components/switcher";
import { SwitcherOption } from "components/switcher/Switcher";
import { Button, VideoButton } from "components/button";
import { Icon } from "components/icon";
import { faBackwardStep, faForwardStep, faPause, faPlay, faShare } from "@fortawesome/pro-solid-svg-icons";
import { HorizontalScroll, Performances, SongTitle } from "components/utils";
import Link from "next/link";
import { PlaylistTrackAddDialog } from "components/dialog/PlaylistTrackAddDialog";
import { Menu, MenuItem, MenuTrigger, MenuContent } from "components/menu/Menu";
import { Toast } from "components/toast";
import { useToasts } from "context/toastContext";
import { VideoSummaryCard } from "components/card/VideoSummaryCard";
import useWatchHistory from "hooks/useWatchHistory";
import { ProgressBar } from "components/video-player-2/ProgressBar";
import { ThemeEntryTags } from "components/tag/ThemeEntryTags";

interface VideoPlayerProps extends VideoPageProps {
    background: boolean;
}

export function VideoPlayer2({ anime, themeIndex, entryIndex, videoIndex, background, ...props }: VideoPlayerProps) {
    const theme = anime.themes[themeIndex];
    const entry = theme.entries[entryIndex];
    const video = entry.videos[videoIndex];

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
    const [selectedTab, setSelectedTab] = useState<"watch-list" | "info" | "related">("info");
    const { dispatchToast } = useToasts();
    const { addToHistory } = useWatchHistory();

    const relatedThemes = anime.themes
        .filter((relatedTheme) => relatedTheme.slug !== theme.slug);

    const usedAlsoAs = video.entries
        .map((entry) => entry.theme)
        .filter((otherTheme) => otherTheme?.anime && otherTheme.anime.slug !== anime.slug);

    const previousVideo = getWatchListVideo(-1);
    const previousEntry = previousVideo?.entries[0];
    const previousTheme = previousEntry?.theme;
    const previousAnime = previousTheme?.anime;

    const previousVideoPath = (previousAnime && previousTheme && previousVideo)
        ? `/anime/${previousAnime.slug}/${createVideoSlug(previousTheme, previousEntry, previousVideo)}`
        : null;

    const nextVideo = getWatchListVideo(1);
    const nextEntry = nextVideo?.entries[0];
    const nextTheme = nextEntry?.theme;
    const nextAnime = nextTheme?.anime;

    const nextVideoPath = (nextAnime && nextTheme && nextVideo)
        ? `/anime/${nextAnime.slug}/${createVideoSlug(nextTheme, nextEntry, nextVideo)}`
        : null;

    useEffect(() => setCanRenderPlayer(true), []);

    useEffect(() => {
        if (playerRef.current) {
            playerRef.current.volume = globalVolume;
        }
    }, [globalVolume]);

    useEffect(() => {
        addToHistory(theme);

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
        }
    }, [ anime, theme, smallCover ]);

    const otherEntries = theme.entries.map(otherEntry => {
        const videos = otherEntry.videos.filter((otherVideo) => otherVideo.filename !== video.filename);

        if (!videos.length) {
            return null;
        }

        return {
            ...otherEntry,
            videos
        };
    }).filter((otherEntry) => !!otherEntry);

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

    function playNextTrack() {
        if (nextVideoPath) {
            router.push(nextVideoPath);
            setCurrentWatchListItem(nextVideo);
        }
    }

    function getWatchListVideo(offset: 1 | -1) {
        if (!currentWatchListItem) {
            return null;
        }

        const currentTrackIndex = watchList.indexOf(currentWatchListItem);
        const nextTrackIndex = currentTrackIndex + offset;

        if (!watchList[nextTrackIndex]) {
            return null;
        }

        return watchList[nextTrackIndex];
    }

    return (
        <>
            <StyledPlayer style={{ flex: background ? undefined : "1" }} {...props}>
                <StyledPlayerContent style={{ display: background ? "none" : undefined }}>
                    <StyledPlaybackArea>
                        {audioMode === AudioMode.ENABLED ? (
                            <StyledAudioBackground>
                                <StyledAudioCover src={largeCover} onClick={togglePlay}/>
                                <StyledAudio
                                    ref={onPlayerMount}
                                    src={audioUrl}
                                    controls={!background}
                                    autoPlay
                                    onPlay={() => setPlaying(true)}
                                    onPause={() => setPlaying(false)}
                                    onEnded={() => {
                                        setPlaying(false);
                                        playNextTrack();
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
                                        playNextTrack();
                                    }}
                                    onClick={togglePlay}
                                    onTimeUpdate={updateProgress}
                                    onVolumeChange={(event: SyntheticEvent<HTMLVideoElement>) => setGlobalVolume(event.currentTarget.volume)}
                                />
                            </StyledVideoBackground>
                        )}
                    </StyledPlaybackArea>
                    <StyledAside>
                        <HorizontalScroll fixShadows>
                            <StyledSwitcher selectedItem={selectedTab} onChange={setSelectedTab}>
                                <SwitcherOption value="watch-list">Next Up</SwitcherOption>
                                <SwitcherOption value="info">Info</SwitcherOption>
                                <SwitcherOption value="related">Related</SwitcherOption>
                            </StyledSwitcher>
                        </HorizontalScroll>
                        {selectedTab === "watch-list" ? (
                            <StyledScrollArea>
                                <Column style={{ "--gap": "16px" }}>
                                    {watchList.map((video) => (
                                        <VideoSummaryCard key={video.id} video={video} onPlay={() => setCurrentWatchListItem(video)} />
                                    ))}
                                </Column>
                            </StyledScrollArea>
                        ) : null}
                        {selectedTab === "info" ? (
                            <StyledScrollArea>
                                <Column style={{ "--gap": "16px" }}>
                                    <Text variant="h2">Origin</Text>
                                    <AnimeSummaryCard anime={anime}/>
                                    {anime.series.map((series) => (
                                        <SummaryCard key={series.slug} title={series.name} description="Series" to={`/series/${series.slug}`} />
                                    ))}
                                    {anime.studios.map((studio) => (
                                        <SummaryCard key={studio.slug} title={studio.name} description="Studio" to={`/studio/${studio.slug}`} />
                                    ))}
                                    {!!theme.song?.performances?.length && (
                                        <>
                                            <Text variant="h2">Artists</Text>
                                            {theme.song.performances.sort((a, b) => a.artist.name.localeCompare(b.artist.name)).map((performance) => (
                                                <ArtistSummaryCard
                                                    key={performance.artist.name}
                                                    artist={performance.artist}
                                                    as={performance.as}
                                                />
                                            ))}
                                        </>
                                    )}
                                    {!!usedAlsoAs.length && (
                                        <>
                                            <Text variant="h2">Also Used As</Text>
                                            {usedAlsoAs.map((theme) => theme?.anime ? (
                                                <ThemeSummaryCard key={theme.anime.slug} theme={theme}/>
                                            ) : null)}
                                        </>
                                    )}
                                </Column>
                            </StyledScrollArea>
                        ) : null}
                        {selectedTab === "related" ? (
                            <StyledScrollArea>
                                <Column style={{ "--gap": "16px" }}>
                                    {!!relatedThemes.length && (
                                        <>
                                            <Text variant="h2">Related themes</Text>
                                            {relatedThemes.map((theme) => (
                                                <ThemeSummaryCard key={theme.slug} theme={{ ...theme, anime }}/>
                                            ))}
                                        </>
                                    )}
                                    {!!otherEntries.length && (
                                        <>
                                            <Text variant="h2">Other versions</Text>
                                            <Column style={{ "--gap": "32px" }}>
                                                {otherEntries.map((otherEntry) => otherEntry ? (
                                                    <Column style={{ "--gap": "16px" }} key={otherEntry.version ?? 1}>
                                                        <Text color="text-muted">
                                                            <Row style={{ "--gap": "8px", "--align-items": "baseline" }}>
                                                                <Text variant="small">Version {otherEntry.version || 1}</Text>
                                                                <ThemeEntryTags entry={otherEntry}/>
                                                            </Row>
                                                        </Text>
                                                        <Row $wrap style={{ "--gap": "16px" }}>
                                                            {otherEntry.videos.map((video, index) => (
                                                                <VideoButton
                                                                    key={index}
                                                                    anime={anime}
                                                                    theme={theme}
                                                                    entry={otherEntry}
                                                                    video={video}
                                                                />
                                                            ))}
                                                        </Row>
                                                    </Column>
                                                ) : null)}
                                            </Column>
                                        </>
                                    )}
                                </Column>
                            </StyledScrollArea>
                        ) : null}
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
                            <Link href={previousVideoPath}>
                                <StyledPlayerBarControl
                                    icon={faBackwardStep}
                                    isCircle
                                    onClick={() => setCurrentWatchListItem(previousVideo)}
                                />
                            </Link>
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
                            <Link href={nextVideoPath}>
                                <StyledPlayerBarControl
                                    icon={faForwardStep}
                                    isCircle
                                    onClick={() => setCurrentWatchListItem(nextVideo)}
                                />
                            </Link>
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
