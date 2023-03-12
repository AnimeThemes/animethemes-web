import { Toast } from "components/toast";
import { Text } from "components/text";
import type { PlaylistTrackRemoveToastPlaylistFragment } from "generated/graphql";
import gql from "graphql-tag";

interface PlaylistRemoveToastProps {
    playlist: PlaylistTrackRemoveToastPlaylistFragment;
}

export function PlaylistRemoveToast({ playlist }: PlaylistRemoveToastProps) {
    return (
        <Toast>
            <Text color="text-primary">{playlist.name}</Text> was deleted!
        </Toast>
    );
}

PlaylistRemoveToast.fragments = {
    playlist: gql`
        fragment PlaylistRemoveToastPlaylist on Playlist {
            id
            name
        }
    `,
};
