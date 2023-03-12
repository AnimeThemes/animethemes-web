import { Icon } from "components/icon";
import { faListMusic } from "@fortawesome/pro-solid-svg-icons";
import { Text } from "components/text";
import { Menu } from "components/menu";
import type { ThemeMenuThemeFragment } from "generated/graphql";
import { PlaylistTrackAddDialog } from "components/dialog/PlaylistTrackAddDialog";
import gql from "graphql-tag";
import { SongTitleWithArtists } from "components/utils";
import extractImages from "utils/extractImages";
import createVideoSlug from "utils/createVideoSlug";

interface ThemeMenuProps {
    theme: ThemeMenuThemeFragment;
}

export function ThemeMenu({ theme }: ThemeMenuProps) {
    const entry = theme.entries[0];
    const video = entry.videos[0];

    if (!entry || !video) {
        return null;
    }

    return (
        <Menu>
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
                    <Menu.Option>
                        <Icon icon={faListMusic}/>
                        <Text>Add to Playlist</Text>
                    </Menu.Option>
                }
            />
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
            slug
            type
            sequence
            group
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
                videos {
                    ...createVideoSlugVideo
                    id
                }
            }
        }
    `,
};
