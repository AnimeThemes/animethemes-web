import { useContext } from "react";

import { faArrowTurnDown, faArrowTurnUp, faEllipsisVertical, faPlus } from "@fortawesome/free-solid-svg-icons";

import { Button } from "@/components/button/Button";
import { PlaylistTrackAddDialog } from "@/components/dialog/PlaylistTrackAddDialog";
import { Icon } from "@/components/icon/Icon";
import { Menu, MenuContent, MenuItem, MenuSeparator, MenuTrigger } from "@/components/menu/Menu";
import { Text } from "@/components/text/Text";
import PlayerContext from "@/context/playerContext";
import { type FragmentType, getFragmentData, graphql } from "@/graphql/generated";

const fragments = {
    theme: graphql(`
        fragment ThemeMenuTheme on AnimeTheme {
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
                name
                images {
                    nodes {
                        ...extractImagesImage
                    }
                }
            }
            song {
                ...SongTitleWithArtistsSong
            }
            animethemeentries {
                ...createVideoSlugEntry
                id
                videos {
                    nodes {
                        ...createVideoSlugVideo
                        id
                        basename
                        audio {
                            basename
                        }
                    }
                }
            }
        }
    `),
};

interface ThemeMenuProps {
    theme: FragmentType<typeof fragments.theme>;
}

export function ThemeMenu({ theme: themeFragment }: ThemeMenuProps) {
    const theme = getFragmentData(fragments.theme, themeFragment);

    const { watchList, addWatchListItem, addWatchListItemNext } = useContext(PlayerContext);

    const entry = theme.animethemeentries[0];
    const video = entry?.videos.nodes[0];

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
                    <Icon icon={faEllipsisVertical} />
                </Button>
            </MenuTrigger>
            <MenuContent>
                {/*<PlaylistTrackAddDialog*/}
                {/*    video={video}*/}
                {/*    entry={entryFlipped}*/}
                {/*    trigger={*/}
                {/*        <MenuItem onSelect={(event) => event.preventDefault()}>*/}
                {/*            <Icon icon={faPlus} />*/}
                {/*            <Text>Add to Playlist</Text>*/}
                {/*        </MenuItem>*/}
                {/*    }*/}
                {/*/>*/}
                {/*{watchList.length ? (*/}
                {/*    <>*/}
                {/*        <MenuSeparator />*/}
                {/*        <MenuItem onSelect={() => addWatchListItem(video, entryFlipped)}>*/}
                {/*            <Icon icon={faArrowTurnDown} color="text-disabled" />*/}
                {/*            <Text>Add to Watch List</Text>*/}
                {/*        </MenuItem>*/}
                {/*        <MenuItem onSelect={() => addWatchListItemNext(video, entryFlipped)}>*/}
                {/*            <Icon icon={faArrowTurnUp} color="text-disabled" />*/}
                {/*            <Text>Play Next</Text>*/}
                {/*        </MenuItem>*/}
                {/*    </>*/}
                {/*) : null}*/}
            </MenuContent>
        </Menu>
    );
}
