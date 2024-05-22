import { faEllipsisV, faListMusic } from "@fortawesome/pro-solid-svg-icons";
import gql from "graphql-tag";

import { Button } from "@/components/button/Button";
import { PlaylistTrackAddDialog } from "@/components/dialog/PlaylistTrackAddDialog";
import { Icon } from "@/components/icon/Icon";
import { Menu, MenuContent, MenuItem, MenuTrigger } from "@/components/menu/Menu";
import { Text } from "@/components/text/Text";
import { SongTitleWithArtists } from "@/components/utils/SongTitleWithArtists";
import type { ThemeMenuThemeFragment } from "@/generated/graphql";
import createVideoSlug from "@/utils/createVideoSlug";
import extractImages from "@/utils/extractImages";

interface ThemeMenuProps {
    theme: ThemeMenuThemeFragment;
}

export function ThemeMenu({ theme }: ThemeMenuProps) {
    const entry = theme.entries[0];
    const video = entry?.videos[0];

    if (!entry || !video) {
        return null;
    }

    return (
        <Menu modal={false}>
            <MenuTrigger asChild>
                <Button variant="silent" isCircle>
                    <Icon icon={faEllipsisV} />
                </Button>
            </MenuTrigger>
            <MenuContent>
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
                        <MenuItem onSelect={(event) => event.preventDefault()}>
                            <Icon icon={faListMusic} />
                            <Text>Add to Playlist</Text>
                        </MenuItem>
                    }
                />
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
