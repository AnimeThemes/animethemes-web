import gql from "graphql-tag";

import { Text } from "@/components/text/Text";
import { Toast } from "@/components/toast/Toast";
import type { PlaylistTrackRemoveToastPlaylistFragment } from "@/generated/graphql";

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
