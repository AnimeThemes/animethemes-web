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
    StyledPlayerBarControls,
    StyledPlayerContent,
    StyledScrollArea,
    StyledSwitcher,
    StyledVideo
} from "./VideoPlayer2.style";
import PlayerContext from "context/playerContext";
import createVideoSlug from "utils/createVideoSlug";
import { useRouter } from "next/router";
import useMediaQuery from "hooks/useMediaQuery";
import styledTheme from "theme";
import useSetting from "hooks/useSetting";
import { AudioMode, GlobalVolume } from "utils/settings";
import { AUDIO_URL, VIDEO_URL } from "utils/config";
import extractImages from "utils/extractImages";
import { Text } from "components/text";
import { AnimeSummaryCard, ArtistSummaryCard, SummaryCard, ThemeSummaryCard } from "components/card";
import { Column } from "components/box";
import type { VideoPageProps } from "pages/anime/[animeSlug]/[videoSlug]";
import { Switcher } from "components/switcher";
import { SwitcherOption } from "components/switcher/Switcher";
import { Button } from "components/button";
import { Icon } from "components/icon";
import { faBackwardStep, faForwardStep, faPause, faPlay, faShare } from "@fortawesome/pro-solid-svg-icons";
import { HorizontalScroll, Performances, SongTitle } from "components/utils";
import Link from "next/link";
import { PlaylistTrackAddDialog } from "components/dialog/PlaylistTrackAddDialog";
import { Menu } from "components/menu";
import { Toast } from "components/toast";
import { useToasts } from "context/toastContext";
import { VideoSummaryCard } from "components/card/VideoSummaryCard";
import useWatchHistory from "hooks/useWatchHistory";
import { ProgressBar } from "components/video-player-2/ProgressBar";

interface VideoPlayerProps extends VideoPageProps {
    background: boolean;
}

export function VideoPlayer2({ anime, themeIndex, entryIndex, videoIndex, background, ...props }: VideoPlayerProps) {
    const theme = anime.themes[themeIndex];
    const entry = theme.entries[entryIndex];
    const video = entry.videos[videoIndex];

    const [isPlaying, setPlaying] = useState(false);
    const playerRef = useRef<HTMLVideoElement | HTMLAudioElement | null>(null);
    const progressRef = useRef<HTMLDivElement>(null);
    const { watchList } = useContext(PlayerContext);
    const isMobile = useMediaQuery(`(max-width: ${styledTheme.breakpoints.mobileMax})`);
    const router = useRouter();
    const [globalVolume, setGlobalVolume] = useSetting(GlobalVolume);
    const [canRenderPlayer, setCanRenderPlayer] = useState(false);
    const { largeCover } = extractImages(anime);
    const [audioMode, setAudioMode] = useSetting(AudioMode, { storageSync: false });
    const [selectedTab, setSelectedTab] = useState<"watch-list" | "info" | "related">("info");
    const { dispatchToast } = useToasts();
    const { addToHistory } = useWatchHistory();

    const relatedThemes = anime.themes
        .filter((relatedTheme) => relatedTheme.slug !== theme.slug);

    const usedAlsoAs = video.entries
        .map((entry) => entry.theme)
        .filter((otherTheme) => otherTheme?.anime && otherTheme.anime.slug !== anime.slug);

    const videoUrl = `${VIDEO_URL}/${video.basename}`;
    const audioUrl = `${AUDIO_URL}/${video.audio.basename}`;
    const videoSlug = createVideoSlug(theme, entry, video);

    const nextTrackPath = getNextTrackPath();

    useEffect(() => setCanRenderPlayer(true), []);

    useEffect(() => {
        if (playerRef.current) {
            playerRef.current.volume = globalVolume;
        }
    }, [globalVolume]);

    // We don't want to re-add the theme when the history changes, because it can cause
    // various issues when multiple tabs are open.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => addToHistory(theme), [theme]);
    
    useEffect(() => {
        if (nextTrackPath) {
            router.prefetch(nextTrackPath);
        }
    }, [nextTrackPath, router]);

    function onPlayerMount(player: HTMLVideoElement) {
        playerRef.current = player;
        if (playerRef.current) {
            playerRef.current.volume = globalVolume;
        }
    }

    function togglePlay() {
        if (isPlaying) {
            playerRef.current?.pause();
        } else {
            playerRef.current?.play();
        }
    }

    function maximize() {
        router.push(`/anime/${anime.slug}/${videoSlug}`);
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

    function playNextTrack() {
        if (nextTrackPath) {
            router.push(nextTrackPath);
        }
    }

    function getNextTrackPath() {
        const currentTrackIndex = watchList.findIndex((v) => video.id === v.id);
        const nextTrackIndex = currentTrackIndex + 1;

        if (watchList[nextTrackIndex]) {
            const nextVideo = watchList[nextTrackIndex];
            const nextEntry = nextVideo.entries[0];
            const nextTheme = nextEntry.theme;
            const nextAnime = nextTheme.anime;
            return `/anime/${nextAnime.slug}/${createVideoSlug(nextTheme, nextEntry, nextVideo)}`;
        }
    }

    return (
        <>
            <StyledPlayer style={{ flex: background ? undefined : "1" }} {...props}>
                <StyledPlayerContent style={{ display: background ? "none" : undefined }}>
                    <StyledPlaybackArea>
                        {audioMode === AudioMode.ENABLED ? (
                            <StyledAudioBackground>
                                <StyledAudioCover src={largeCover} onClick={background && isMobile ? maximize : undefined}/>
                                <StyledAudio
                                    ref={onPlayerMount}
                                    src={audioUrl}
                                    controls={!background}
                                    autoPlay
                                    onPlay={() => setPlaying(true)}
                                    onPause={() => setPlaying(false)}
                                    onEnded={() => setPlaying(false)}
                                    onTimeUpdate={updateProgress}
                                    onVolumeChange={(event: SyntheticEvent<HTMLAudioElement>) => setGlobalVolume(event.currentTarget.volume)}
                                />
                            </StyledAudioBackground>
                        ) : (
                            <StyledVideo
                                ref={onPlayerMount}
                                src={videoUrl}
                                controls={!background}
                                autoPlay
                                onPlay={() => setPlaying(true)}
                                onPause={() => setPlaying(false)}
                                onEnded={() => {
                                    setPlaying(false);
                                    playNextTrack();
                                }}
                                onClick={background && isMobile ? maximize : undefined}
                                onTimeUpdate={updateProgress}
                                onVolumeChange={(event: SyntheticEvent<HTMLVideoElement>) => setGlobalVolume(event.currentTarget.volume)}
                            />
                        )}
                    </StyledPlaybackArea>
                    <StyledAside>
                        <HorizontalScroll fixShadows>
                            <StyledSwitcher selectedItem={selectedTab} onChange={setSelectedTab}>
                                <SwitcherOption value="watch-list">Watch List</SwitcherOption>
                                <SwitcherOption value="info">Information</SwitcherOption>
                                <SwitcherOption value="related">Related</SwitcherOption>
                            </StyledSwitcher>
                        </HorizontalScroll>
                        {selectedTab === "watch-list" ? (
                            <StyledScrollArea>
                                <Column style={{ "--gap": "16px" }}>
                                    {watchList.map((video) => (
                                        <VideoSummaryCard key={video.id} video={video} />
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
                                </Column>
                            </StyledScrollArea>
                        ) : null}
                    </StyledAside>
                </StyledPlayerContent>
                <StyledPlayerBar>
                    <Column style={{ "--gap": "8px" }}>
                        <Text color="text-muted" maxLines={1}>
                            <SongTitle song={theme.song} songTitleLinkTo={`/anime/${anime.slug}/${videoSlug}`} />
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
                        <Icon icon={faBackwardStep} />
                        <Icon icon={isPlaying ? faPause : faPlay} onClick={togglePlay} />
                        <Icon icon={faForwardStep} onClick={playNextTrack} />
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
                        <Menu button={(MenuButton) => (
                            <Button as={MenuButton} style={{ "--gap": "8px" }}>
                                <Icon icon={faShare}/>
                                <Text>Share</Text>
                            </Button>
                        )}>
                            <Menu.Option onSelect={() => saveToClipboard(location.href)}>Copy URL to this Page</Menu.Option>
                            {audioMode === AudioMode.ENABLED ? (
                                <Menu.Option onSelect={() => saveToClipboard(audioUrl)}>Copy URL to Embeddable Audio</Menu.Option>
                            ) : (
                                <Menu.Option onSelect={() => saveToClipboard(videoUrl)}>Copy URL to Embeddable Video</Menu.Option>
                            )}
                        </Menu>
                        {canRenderPlayer ? (
                            <Switcher selectedItem={audioMode} onChange={setAudioMode}>
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
