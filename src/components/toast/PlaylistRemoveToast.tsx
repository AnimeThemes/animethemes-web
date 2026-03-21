import { Text } from "@/components/text/Text";
import { Toast } from "@/components/toast/Toast";
import { type FragmentType, getFragmentData, graphql } from "@/graphql/generated";

export const PLAYLIST_REMOVE_TOAST_PLAYLIST = graphql(`
    fragment PlaylistRemoveToastPlaylist on Playlist {
        id
        name
    }
`);

interface PlaylistRemoveToastProps {
    playlist: FragmentType<typeof PLAYLIST_REMOVE_TOAST_PLAYLIST>;
}

export function PlaylistRemoveToast({ playlist: playlistFragment }: PlaylistRemoveToastProps) {
    const playlist = getFragmentData(PLAYLIST_REMOVE_TOAST_PLAYLIST, playlistFragment);

    return (
        <Toast>
            <Text color="text-primary">{playlist.name}</Text> was deleted!
        </Toast>
    );
}
