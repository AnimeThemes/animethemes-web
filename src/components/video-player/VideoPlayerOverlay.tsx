import { Fragment, useContext, useEffect, useState } from "react";
import styled from "styled-components";
import Link from "next/link";

import {
    faCheck,
    faCompress,
    faExpand,
    faGear,
    faHeart,
    faKeyboard,
    faPlus,
    faShare,
    faUpRightFromSquare,
} from "@fortawesome/free-solid-svg-icons";

import { Row } from "@/components/box/Flex";
import { IconTextButton } from "@/components/button/IconTextButton";
import { FavoriteDialog } from "@/components/dialog/FavoriteDialog";
import { KeyboardShortcutDialog } from "@/components/dialog/KeyboardShortcutDialog";
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
import PlayerContext, {
    WATCH_LIST_ITEM_ENTRY,
    WATCH_LIST_ITEM_THEME,
    WATCH_LIST_ITEM_VIDEO,
} from "@/context/playerContext";
import { getFragmentData } from "@/graphql/generated";
import useFavorite from "@/hooks/useFavorite";
import useSetting from "@/hooks/useSetting";
import { getAnimeFromVideoPageFragment, type VideoPageProps } from "@/pages/anime/[animeSlug]/[videoSlug]";
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
    background-color: rgba(0, 0, 0, 0.75);
    backdrop-filter: blur(5px);
`;

export function VideoPlayerOverlay({ anime: animeFragment, themeIndex, entryIndex, videoIndex }: VideoPageProps) {
    const anime = getAnimeFromVideoPageFragment(animeFragment);
    const theme = anime.themes[themeIndex];
    const entry = theme.entries[entryIndex];
    const video = entry.videos.nodes[videoIndex];

    const { watchList, setWatchList, currentWatchListItem } = useContext(PlayerContext);
    const { isFullscreen, toggleFullscreen } = useContext(FullscreenContext);
    const [isIOS, setIOS] = useState(false);
    const [isPIPSupported, setPIPSupported] = useState(false);
    const context = useContext(VideoPlayerContext);
    const [audioMode] = useSetting(AudioMode, { storageSync: false });
    const { isFavorite } = useFavorite(entry.id);

    if (!context) {
        throw new Error("VideoPlayerOverlay needs to be inside VideoPlayer!");
    }

    const { updateAudioMode } = context;

    const otherEntries = theme.entries
        .map((otherEntry) => {
            const videos = otherEntry.videos.nodes;

            if (!videos.length) {
                return null;
            }

            return {
                ...otherEntry,
                videos,
            };
        })
        .filter((otherEntry) => !!otherEntry);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setIOS(/iPhone|iPad|iPod/.test(navigator.userAgent));
        setPIPSupported(typeof document !== "undefined" && document.pictureInPictureEnabled);
    }, []);

    return (
        <StyledOverlay>
            <Row style={{ "--gap": "16px" }}>
                <FavoriteDialog
                    entryId={entry.id}
                    trigger={
                        <StyledOverlayButton
                            icon={faHeart}
                            isCircle
                            variant={isFavorite ? "primary" : undefined}
                            title="Add to favorites"
                        />
                    }
                />
                <PlaylistTrackAddDialog
                    video={video}
                    entry={entry}
                    trigger={<StyledOverlayButton icon={faPlus} isCircle title="Add to playlist" />}
                />
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
                                                    video: getFragmentData(WATCH_LIST_ITEM_VIDEO, otherVideo),
                                                    entry: getFragmentData(WATCH_LIST_ITEM_ENTRY, otherEntry),
                                                    theme: getFragmentData(WATCH_LIST_ITEM_THEME, theme),
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
                        <MenuSeparator />
                        {isPIPSupported && audioMode === AudioMode.DISABLED && (
                            <MenuItem onSelect={() => context.togglePip()}>
                                <Icon icon={faUpRightFromSquare} color="text-disabled" />
                                Toggle picture-in-picture
                            </MenuItem>
                        )}
                        <KeyboardShortcutDialog
                            trigger={
                                <MenuItem onSelect={(event) => event.preventDefault()}>
                                    <Icon icon={faKeyboard} color="text-disabled" />
                                    Keyboard shortcuts
                                </MenuItem>
                            }
                        />
                    </MenuContent>
                </Menu>
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
