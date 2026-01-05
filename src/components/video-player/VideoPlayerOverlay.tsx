import { Fragment, useContext } from "react";
import styled from "styled-components";
import Link from "next/link";

import {
    faCheck,
    faCompress,
    faExpand,
    faGear,
    faKeyboard,
    faPlus,
    faShare,
    faUpRightFromSquare,
} from "@fortawesome/free-solid-svg-icons";
import { Dialog } from "@radix-ui/react-dialog";

import { Row } from "@/components/box/Flex";
import { IconTextButton } from "@/components/button/IconTextButton";
import { DialogContent, DialogTrigger } from "@/components/dialog/Dialog";
import { PlaylistTrackAddDialog } from "@/components/dialog/PlaylistTrackAddDialog";
import { Icon } from "@/components/icon/Icon";
import { Menu, MenuContent, MenuItem, MenuLabel, MenuSeparator, MenuTrigger } from "@/components/menu/Menu";
import { ShareMenu } from "@/components/menu/ShareMenu";
import { ThemeEntryTags } from "@/components/tag/ThemeEntryTags";
import { VideoTags } from "@/components/tag/VideoTags";
import { Text } from "@/components/text/Text";
import { VideoPlayerContext } from "@/components/video-player/VideoPlayer";
import { StyledPlaybackArea } from "@/components/video-player/VideoPlayer.style";
import FullscreenContext from "@/context/fullscreenContext";
import PlayerContext from "@/context/playerContext";
import useSetting from "@/hooks/useSetting";
import type { VideoPageProps } from "@/pages/anime/[animeSlug]/[videoSlug]";
import theme from "@/theme";
import createVideoSlug from "@/utils/createVideoSlug";
import { AudioMode } from "@/utils/settings";

const StyledOverlay = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    padding: 16px;

    opacity: 0;
    transition: opacity 500ms;

    &:has([data-state="open"]),
    &:has(:focus-visible),
    ${StyledPlaybackArea}:not([data-relaxed]) & {
        opacity: 1;
        transition: opacity 100ms;
    }
`;
const StyledOverlayButton = styled(IconTextButton)`
    background-color: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(5px);
`;

const StyledKeyList = styled.dl`
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 8px 16px;
    align-items: baseline;
    margin: 0;
`;
const StyledKey = styled.dt`
    text-align: right;
    color: ${theme.colors["text-muted"]};
`;
const StyledKeyDescription = styled.dd`
    margin: 0;
    color: ${theme.colors["text-disabled"]};
`;
const StyledKeyHint = styled.kbd`
    display: inline-flex;
    justify-content: center;
    align-items: center;

    width: 32px;
    height: 32px;
    border: 1px solid ${theme.colors["text-disabled"]};
    border-radius: 4px;

    font-size: 1.25rem;
    background-color: ${theme.colors["background"]};
`;
const StyledKeyHintSpace = styled(StyledKeyHint)`
    width: 96px;
`;

export function VideoPlayerOverlay({ anime, themeIndex, entryIndex, videoIndex }: VideoPageProps) {
    const theme = anime.themes[themeIndex];
    const entry = theme.entries[entryIndex];
    const video = entry.videos[videoIndex];

    const { watchList, setWatchList, currentWatchListItem } = useContext(PlayerContext);
    const { isFullscreen, toggleFullscreen } = useContext(FullscreenContext);
    const isIOS = /iPhone|iPad|iPod/.test(navigator.userAgent);
    const isPIPSupported = typeof document !== "undefined" && document.pictureInPictureEnabled;
    const context = useContext(VideoPlayerContext);
    const [audioMode] = useSetting(AudioMode, { storageSync: false });

    if (!context) {
        throw new Error("VideoPlayerOverlay needs to be inside VideoPlayer!");
    }

    const { updateAudioMode } = context;

    const otherEntries = theme.entries
        .map((otherEntry) => {
            const videos = otherEntry.videos;

            if (!videos.length) {
                return null;
            }

            return {
                ...otherEntry,
                videos,
            };
        })
        .filter((otherEntry) => !!otherEntry);

    return (
        <StyledOverlay>
            <Row style={{ "--gap": "16px" }}>
                <PlaylistTrackAddDialog
                    video={video}
                    entry={{ ...entry, theme }}
                    trigger={<StyledOverlayButton icon={faPlus} isCircle title="Add to playlist" />}
                />
                <Dialog>
                    <DialogTrigger asChild>
                        <StyledOverlayButton icon={faKeyboard} isCircle title="Keyboard shortcuts" />
                    </DialogTrigger>
                    <DialogContent title="Keyboard Shortcuts">
                        <StyledKeyList>
                            <StyledKey>
                                <StyledKeyHintSpace title="Space">_</StyledKeyHintSpace> or{" "}
                                <StyledKeyHint>K</StyledKeyHint>
                            </StyledKey>
                            <StyledKeyDescription>Play / Pause</StyledKeyDescription>
                            <StyledKey>
                                <StyledKeyHint>→</StyledKeyHint>
                            </StyledKey>
                            <StyledKeyDescription>Seek forward 5 seconds</StyledKeyDescription>
                            <StyledKey>
                                <StyledKeyHint>←</StyledKeyHint>
                            </StyledKey>
                            <StyledKeyDescription>Seek backward 5 seconds</StyledKeyDescription>
                            <StyledKey>
                                <StyledKeyHint>L</StyledKeyHint>
                            </StyledKey>
                            <StyledKeyDescription>Seek forward 10 seconds</StyledKeyDescription>
                            <StyledKey>
                                <StyledKeyHint>J</StyledKeyHint>
                            </StyledKey>
                            <StyledKeyDescription>Seek backward 10 seconds</StyledKeyDescription>
                            <StyledKey>
                                <StyledKeyHint>.</StyledKeyHint>
                            </StyledKey>
                            <StyledKeyDescription>Seek forward 1 frame</StyledKeyDescription>
                            <StyledKey>
                                <StyledKeyHint>,</StyledKeyHint>
                            </StyledKey>
                            <StyledKeyDescription>Seek backward 1 frame</StyledKeyDescription>
                            <StyledKey>
                                <StyledKeyHint>N</StyledKeyHint>
                            </StyledKey>
                            <StyledKeyDescription>Next track</StyledKeyDescription>
                            <StyledKey>
                                <StyledKeyHint>B</StyledKeyHint>
                            </StyledKey>
                            <StyledKeyDescription>Previous track</StyledKeyDescription>
                            <StyledKey>
                                <StyledKeyHint>M</StyledKeyHint>
                            </StyledKey>
                            <StyledKeyDescription>Mute / Unmute</StyledKeyDescription>
                            <StyledKey>
                                <StyledKeyHint>↑</StyledKeyHint>
                            </StyledKey>
                            <StyledKeyDescription>Volume up</StyledKeyDescription>
                            <StyledKey>
                                <StyledKeyHint>↓</StyledKeyHint>
                            </StyledKey>
                            <StyledKeyDescription>Volume down</StyledKeyDescription>
                            <StyledKey>
                                <StyledKeyHint>D</StyledKeyHint>
                            </StyledKey>
                            <StyledKeyDescription>Download track</StyledKeyDescription>
                            <StyledKey>
                                <StyledKeyHint>F</StyledKeyHint>
                            </StyledKey>
                            <StyledKeyDescription>Toggle fullscreen</StyledKeyDescription>
                            <StyledKey>
                                <StyledKeyHint>A</StyledKeyHint>
                            </StyledKey>
                            <StyledKeyDescription>Toggle audio mode</StyledKeyDescription>
                            <StyledKey>
                                <StyledKeyHint>P</StyledKeyHint>
                            </StyledKey>
                            <StyledKeyDescription>Toggle picture-in-picture</StyledKeyDescription>
                        </StyledKeyList>
                    </DialogContent>
                </Dialog>
                <ShareMenu
                    pagePath={context.videoPagePath}
                    videoUrl={context.videoUrl}
                    audioUrl={context.audioUrl}
                    trigger={<StyledOverlayButton icon={faShare} isCircle title="Share" />}
                />
                <Menu modal={false}>
                    <MenuTrigger asChild>
                        <StyledOverlayButton icon={faGear} isCircle title="Change media type" />
                    </MenuTrigger>
                    <MenuContent collisionPadding={16}>
                        <MenuLabel>
                            <Text variant="small">Media type</Text>
                        </MenuLabel>
                        <MenuItem onSelect={() => updateAudioMode(AudioMode.DISABLED)}>
                            <Icon
                                icon={faCheck}
                                color={audioMode === AudioMode.DISABLED ? "text-primary" : "transparent"}
                            />
                            Video
                        </MenuItem>
                        <MenuItem onSelect={() => updateAudioMode(AudioMode.ENABLED)}>
                            <Icon
                                icon={faCheck}
                                color={audioMode === AudioMode.ENABLED ? "text-primary" : "transparent"}
                            />
                            Audio
                        </MenuItem>
                        <MenuSeparator />
                        {otherEntries.map((otherEntry) =>
                            otherEntry ? (
                                <Fragment key={otherEntry.version ?? 1}>
                                    <MenuLabel>
                                        <Row style={{ "--gap": "8px", "--align-items": "baseline" }}>
                                            <Text variant="small">Version {otherEntry.version || 1}</Text>
                                            <ThemeEntryTags entry={otherEntry} />
                                        </Row>
                                    </MenuLabel>
                                    {otherEntry.videos.map((otherVideo) => (
                                        <MenuItem
                                            key={otherVideo.basename}
                                            asChild
                                            onSelect={() => {
                                                const currentItemIndex = watchList.findIndex(
                                                    (item) => item.watchListId === currentWatchListItem?.watchListId,
                                                );
                                                const currentItem = watchList[currentItemIndex];

                                                const newItem = {
                                                    watchListId: currentItem.watchListId,
                                                    video: otherVideo,
                                                    entry: { ...otherEntry, theme },
                                                };
                                                const newWatchList = [...watchList];

                                                newWatchList[currentItemIndex] = newItem;

                                                setWatchList(newWatchList);
                                            }}
                                        >
                                            <Link
                                                href={`/anime/${anime.slug}/${createVideoSlug(theme, otherEntry, otherVideo)}`}
                                            >
                                                <Icon
                                                    icon={faCheck}
                                                    color={
                                                        otherVideo.basename === video.basename
                                                            ? "text-primary"
                                                            : "transparent"
                                                    }
                                                />
                                                <VideoTags video={otherVideo} />
                                            </Link>
                                        </MenuItem>
                                    ))}
                                </Fragment>
                            ) : null,
                        )}
                    </MenuContent>
                </Menu>
                {isPIPSupported && audioMode === AudioMode.DISABLED && (
                    <StyledOverlayButton
                        icon={faUpRightFromSquare}
                        isCircle
                        onClick={context.togglePip}
                        title="Toggle picture-in-picture"
                    />
                )}
                {!(isIOS && audioMode === AudioMode.ENABLED) && ( // Hide fullscreen button on iOS when audio mode is enabled
                    <StyledOverlayButton
                        icon={isFullscreen ? faCompress : faExpand}
                        isCircle
                        onClick={toggleFullscreen}
                        title="Toggle fullscreen"
                    />
                )}
            </Row>
        </StyledOverlay>
    );
}
