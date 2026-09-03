import { useContext } from "react";

import { faArrowTurnDown, faArrowTurnUp, faEllipsisVertical, faPlus } from "@fortawesome/free-solid-svg-icons";

import { Button } from "@/components/button/Button";
import { PlaylistTrackAddDialog } from "@/components/dialog/PlaylistTrackAddDialog";
import { Icon } from "@/components/icon/Icon";
import { Menu, MenuContent, MenuItem, MenuSeparator, MenuTrigger } from "@/components/menu/Menu";
import { Text } from "@/components/text/Text";
import PlayerContext, {
    WATCH_LIST_ITEM_ENTRY,
    WATCH_LIST_ITEM_THEME,
    WATCH_LIST_ITEM_VIDEO,
} from "@/context/playerContext";
import { type FragmentType, getFragmentData, graphql } from "@/graphql/generated";

export const VIDEO_MENU_ENTRY = graphql(`
    fragment VideoMenuEntry on Entry {
        ...createVideoSlugEntry
        ...PlaylistTrackAddDialogEntry
        ...WatchListItemEntry
        id
        theme {
            ...WatchListItemTheme
            ...createVideoSlugTheme
            id
            type
            sequence
            group {
                name
                slug
            }
            anime {
                slug
                title {
                    romaji
                }
                images {
                    nodes {
                        ...extractImagesImage
                    }
                }
            }
            song {
                ...SongTitleWithArtistsSong
            }
        }
    }
`);

export const VIDEO_MENU_VIDEO = graphql(`
    fragment VideoMenuVideo on Video {
        ...createVideoSlugVideo
        ...PlaylistTrackAddDialogVideo
        ...WatchListItemVideo
        id
        basename
        audio {
            basename
        }
    }
`);

interface VideoMenuProps {
    entry: FragmentType<typeof VIDEO_MENU_ENTRY>;
    video: FragmentType<typeof VIDEO_MENU_VIDEO>;
}

export function VideoMenu({ entry: entryFragment, video: videoFragment }: VideoMenuProps) {
    const entry = getFragmentData(VIDEO_MENU_ENTRY, entryFragment);
    const video = getFragmentData(VIDEO_MENU_VIDEO, videoFragment);

    const { watchList, addWatchListItem, addWatchListItemNext } = useContext(PlayerContext);

    return (
        <Menu modal={false}>
            <MenuTrigger asChild>
                <Button variant="silent" isCircle>
                    <Icon icon={faEllipsisVertical} />
                </Button>
            </MenuTrigger>
            <MenuContent>
                <PlaylistTrackAddDialog
                    video={video}
                    entry={entry}
                    trigger={
                        <MenuItem onSelect={(event) => event.preventDefault()}>
                            <Icon icon={faPlus} />
                            <Text>Add to Playlist</Text>
                        </MenuItem>
                    }
                />
                {watchList.length ? (
                    <>
                        <MenuSeparator />
                        <MenuItem
                            onSelect={() =>
                                addWatchListItem(
                                    getFragmentData(WATCH_LIST_ITEM_VIDEO, video),
                                    getFragmentData(WATCH_LIST_ITEM_ENTRY, entry),
                                    getFragmentData(WATCH_LIST_ITEM_THEME, entry.theme),
                                )
                            }
                        >
                            <Icon icon={faArrowTurnDown} color="text-disabled" />
                            <Text>Add to Watch List</Text>
                        </MenuItem>
                        <MenuItem
                            onSelect={() =>
                                addWatchListItemNext(
                                    getFragmentData(WATCH_LIST_ITEM_VIDEO, video),
                                    getFragmentData(WATCH_LIST_ITEM_ENTRY, entry),
                                    getFragmentData(WATCH_LIST_ITEM_THEME, entry.theme),
                                )
                            }
                        >
                            <Icon icon={faArrowTurnUp} color="text-disabled" />
                            <Text>Play Next</Text>
                        </MenuItem>
                    </>
                ) : null}
            </MenuContent>
        </Menu>
    );
}
