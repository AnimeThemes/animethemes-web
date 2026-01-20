import { useContext } from "react";

import { faArrowTurnDown, faArrowTurnUp, faEllipsisVertical, faPlus } from "@fortawesome/free-solid-svg-icons";
import gql from "graphql-tag";

import { Button } from "@/components/button/Button";
import { PlaylistTrackAddDialog } from "@/components/dialog/PlaylistTrackAddDialog";
import { Icon } from "@/components/icon/Icon";
import { Menu, MenuContent, MenuItem, MenuSeparator, MenuTrigger } from "@/components/menu/Menu";
import { Text } from "@/components/text/Text";
import { SongTitleWithArtists } from "@/components/utils/SongTitleWithArtists";
import PlayerContext from "@/context/playerContext";
import type { VideoMenuEntryFragment, VideoMenuVideoFragment } from "@/generated/graphql";
import createVideoSlug from "@/utils/createVideoSlug";
import extractImages from "@/utils/extractImages";

interface VideoMenuProps {
    entry: VideoMenuEntryFragment;
    video: VideoMenuVideoFragment;
}

export function VideoMenu({ entry, video }: VideoMenuProps) {
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
                        <MenuItem onSelect={() => addWatchListItem(video, entry)}>
                            <Icon icon={faArrowTurnDown} color="text-disabled" />
                            <Text>Add to Watch List</Text>
                        </MenuItem>
                        <MenuItem onSelect={() => addWatchListItemNext(video, entry)}>
                            <Icon icon={faArrowTurnUp} color="text-disabled" />
                            <Text>Play Next</Text>
                        </MenuItem>
                    </>
                ) : null}
            </MenuContent>
        </Menu>
    );
}

VideoMenu.fragments = {
    entry: gql`
        ${SongTitleWithArtists.fragments.song}
        ${extractImages.fragments.resourceWithImages}
        ${createVideoSlug.fragments.theme}
        ${createVideoSlug.fragments.entry}

        fragment VideoMenuEntry on Entry {
            ...createVideoSlugEntry
            id
            theme {
                ...createVideoSlugTheme
                id
                type
                sequence
                group {
                    name
                    slug
                }
                anime {
                    ...extractImagesResourceWithImages
                    slug
                    name
                }
                song {
                    ...SongTitleWithArtistsSong
                }
            }
        }
    `,
    video: gql`
        ${createVideoSlug.fragments.video}

        fragment VideoMenuVideo on Video {
            ...createVideoSlugVideo
            id
            basename
            audio {
                basename
            }
        }
    `
};
