import { useContext } from "react";

import { faArrowTurnDown, faArrowTurnUp, faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";

import { Button } from "@/components/button/Button";
import { Icon } from "@/components/icon/Icon";
import { Menu, MenuContent, MenuItem, MenuSeparator, MenuTrigger } from "@/components/menu/Menu";
import { Text } from "@/components/text/Text";
import PlayerContext from "@/context/playerContext";
import { type FragmentType, getFragmentData, graphql } from "@/graphql/generated";

const fragments = {
    entry: graphql(`
        fragment VideoMenuEntry on AnimeThemeEntry {
            ...createVideoSlugEntry
            id
            animetheme {
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
            }
        }
    `),
    video: graphql(`
        fragment VideoMenuVideo on Video {
            ...createVideoSlugVideo
            id
            basename
            audio {
                basename
            }
        }
    `),
};

interface VideoMenuProps {
    entry: FragmentType<typeof fragments.entry>;
    video: FragmentType<typeof fragments.video>;
}

export function VideoMenu({ entry: entryFragment, video: videoFragment }: VideoMenuProps) {
    const entry = getFragmentData(fragments.entry, entryFragment);
    const video = getFragmentData(fragments.video, videoFragment);

    const { watchList, addWatchListItem, addWatchListItemNext } = useContext(PlayerContext);

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
                {/*    entry={entry}*/}
                {/*    trigger={*/}
                {/*        <MenuItem onSelect={(event) => event.preventDefault()}>*/}
                {/*            <Icon icon={faPlus} />*/}
                {/*            <Text>Add to Playlist</Text>*/}
                {/*        </MenuItem>*/}
                {/*    }*/}
                {/*/>*/}
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
