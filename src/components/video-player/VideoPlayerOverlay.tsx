import { Fragment, useContext } from "react";
import styled from "styled-components";
import Link from "next/link";

import { faCheck, faCog, faCompress, faExpand, faListMusic, faShare } from "@fortawesome/pro-solid-svg-icons";

import { Row } from "@/components/box/Flex";
import { IconTextButton } from "@/components/button/IconTextButton";
import { PlaylistTrackAddDialog } from "@/components/dialog/PlaylistTrackAddDialog";
import { Icon } from "@/components/icon/Icon";
import { Menu, MenuContent, MenuItem, MenuLabel, MenuSeparator, MenuTrigger } from "@/components/menu/Menu";
import { ShareMenu } from "@/components/menu/ShareMenu";
import { ThemeEntryTags } from "@/components/tag/ThemeEntryTags";
import { VideoTags } from "@/components/tag/VideoTags";
import { Text } from "@/components/text/Text";
import { VideoPlayerContext } from "@/components/video-player/VideoPlayer";
import { StyledPlaybackArea, StyledPlayer } from "@/components/video-player/VideoPlayer.style";
import FullscreenContext from "@/context/fullscreenContext";
import PlayerContext from "@/context/playerContext";
import useSetting from "@/hooks/useSetting";
import type { VideoPageProps } from "@/pages/anime/[animeSlug]/[videoSlug]";
import createVideoSlug from "@/utils/createVideoSlug";
import { AudioMode } from "@/utils/settings";

const StyledOverlay = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    padding: 16px;

    opacity: 0;
    transition: opacity 500ms;

    &:hover,
    html:not([data-fullscreen]) ${StyledPlaybackArea}:hover &,
    ${StyledPlayer}:not([data-relaxed]) ${StyledPlaybackArea}:hover & {
        opacity: 1;
        transition: opacity 100ms;
    }
`;
const StyledOverlayButton = styled(IconTextButton)`
    background-color: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(5px);
`;

export function VideoPlayerOverlay({ anime, themeIndex, entryIndex, videoIndex }: VideoPageProps) {
    const theme = anime.themes[themeIndex];
    const entry = theme.entries[entryIndex];
    const video = entry.videos[videoIndex];

    const { watchList, setWatchList, currentWatchListItem } = useContext(PlayerContext);
    const { isFullscreen, toggleFullscreen, } = useContext(FullscreenContext);
    const context = useContext(VideoPlayerContext);
    const [audioMode] = useSetting(AudioMode, { storageSync: false });

    if (!context) {
        throw new Error("VideoPlayerOverlay needs to be inside VideoPlayer!");
    }

    const {
        updateAudioMode,
    } = context;

    const otherEntries = theme.entries.map((otherEntry) => {
        const videos = otherEntry.videos;

        if (!videos.length) {
            return null;
        }

        return {
            ...otherEntry,
            videos
        };
    }).filter((otherEntry) => !!otherEntry);

    return (
        <StyledOverlay>
            <Row style={{ "--gap": "16px" }}>
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
                    trigger={
                        <StyledOverlayButton icon={faListMusic} isCircle />
                    }
                />
                <ShareMenu
                    pagePath={context.videoPagePath}
                    videoUrl={context.videoUrl}
                    audioUrl={context.audioUrl}
                    trigger={<StyledOverlayButton icon={faShare} isCircle />}
                />
                <Menu modal={false}>
                    <MenuTrigger asChild>
                        <StyledOverlayButton icon={faCog} isCircle />
                    </MenuTrigger>
                    <MenuContent collisionPadding={16}>
                        <MenuLabel>
                            <Text variant="small">Media type</Text>
                        </MenuLabel>
                        <MenuItem onSelect={() => updateAudioMode(AudioMode.DISABLED)}>
                            <Icon icon={faCheck} color={audioMode === AudioMode.DISABLED ? "text-primary" : "transparent"} />
                            Video
                        </MenuItem>
                        <MenuItem onSelect={() => updateAudioMode(AudioMode.ENABLED)}>
                            <Icon icon={faCheck} color={audioMode === AudioMode.ENABLED ? "text-primary" : "transparent"} />
                            Audio
                        </MenuItem>
                        <MenuSeparator />
                        {otherEntries.map((otherEntry) => otherEntry ? (
                            <Fragment key={otherEntry.version ?? 1}>
                                <MenuLabel>
                                    <Row style={{ "--gap": "8px", "--align-items": "baseline" }}>
                                        <Text variant="small">Version {otherEntry.version || 1}</Text>
                                        <ThemeEntryTags entry={otherEntry}/>
                                    </Row>
                                </MenuLabel>
                                {otherEntry.videos.map((otherVideo) => (
                                    <MenuItem key={otherVideo.basename} asChild onSelect={() => {
                                        const currentItemIndex = watchList.findIndex((item) => item.watchListId === currentWatchListItem?.watchListId);
                                        const currentItem = watchList[currentItemIndex];

                                        const newItem = {
                                            watchListId: currentItem.watchListId,
                                            ...otherVideo,
                                            entries: [
                                                {
                                                    ...otherEntry,
                                                    theme,
                                                },
                                            ],
                                        };
                                        const newWatchList = [...watchList];

                                        newWatchList[currentItemIndex] = newItem;

                                        setWatchList(newWatchList);
                                    }}>
                                        <Link href={`/anime/${anime.slug}/${createVideoSlug(theme, otherEntry, otherVideo)}`}>
                                            <Icon icon={faCheck} color={otherVideo.basename === video.basename ? "text-primary" : "transparent"} />
                                            <VideoTags video={otherVideo} hideTextOnMobile />
                                        </Link>
                                    </MenuItem>
                                ))}
                            </Fragment>
                        ) : null)}
                    </MenuContent>
                </Menu>
                <StyledOverlayButton icon={isFullscreen ? faCompress : faExpand} isCircle onClick={toggleFullscreen} />
            </Row>
        </StyledOverlay>
    );
}
