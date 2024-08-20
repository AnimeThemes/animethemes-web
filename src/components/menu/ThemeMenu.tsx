import { useContext } from "react";

import { faArrowTurnDownRight, faArrowTurnRight, faEllipsisV, faPlus } from "@fortawesome/pro-solid-svg-icons";
import gql from "graphql-tag";

import { Button } from "@/components/button/Button";
import { PlaylistTrackAddDialog } from "@/components/dialog/PlaylistTrackAddDialog";
import { Icon } from "@/components/icon/Icon";
import { Menu, MenuContent, MenuItem, MenuSeparator, MenuTrigger } from "@/components/menu/Menu";
import { Text } from "@/components/text/Text";
import { SongTitleWithArtists } from "@/components/utils/SongTitleWithArtists";
import PlayerContext from "@/context/playerContext";
import type { ThemeMenuThemeFragment } from "@/generated/graphql";
import createVideoSlug from "@/utils/createVideoSlug";
import extractImages from "@/utils/extractImages";

interface ThemeMenuProps {
    theme: ThemeMenuThemeFragment;
}

export function ThemeMenu({ theme }: ThemeMenuProps) {
    const { watchList, addWatchListItem, addWatchListItemNext } = useContext(PlayerContext);

    const entry = theme.entries[0];
    const video = entry?.videos[0];

    if (!entry || !video) {
        return null;
    }

    // Flip the structure on it's head, because we need entry as the root object here.
    const entryFlipped = {
        ...entry,
        theme,
    };

    return (
        <Menu modal={false}>
            <MenuTrigger asChild>
                <Button variant="silent" isCircle>
                    <Icon icon={faEllipsisV} />
                </Button>
            </MenuTrigger>
            <MenuContent>
                <PlaylistTrackAddDialog
                    video={video}
                    entry={entryFlipped}
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
                        <MenuItem onSelect={() => addWatchListItem(video, entryFlipped)}>
                            <Icon icon={faArrowTurnDownRight} color="text-disabled" />
                            <Text>Add to Watch List</Text>
                        </MenuItem>
                        <MenuItem onSelect={() => addWatchListItemNext(video, entryFlipped)}>
                            <Icon icon={faArrowTurnRight} color="text-disabled" />
                            <Text>Play Next</Text>
                        </MenuItem>
                    </>
                ) : null}
            </MenuContent>
        </Menu>
    );
}

ThemeMenu.fragments = {
    theme: gql`
        ${SongTitleWithArtists.fragments.song}
        ${extractImages.fragments.resourceWithImages}
        ${createVideoSlug.fragments.theme}
        ${createVideoSlug.fragments.entry}
        ${createVideoSlug.fragments.video}

        fragment ThemeMenuTheme on Theme {
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
            entries {
                ...createVideoSlugEntry
                id
                videos {
                    ...createVideoSlugVideo
                    id
                    basename
                    audio {
                        basename
                    }
                }
            }
        }
    `,
};
