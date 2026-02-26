import { Text } from "@/components/text/Text";
import { Toast } from "@/components/toast/Toast";
import { type FragmentType, getFragmentData, graphql } from "@/graphql/generated";

const fragments = {
    playlist: graphql(`
        fragment PlaylistRemoveToastPlaylist on Playlist {
            id
            name
        }
    `),
};

interface PlaylistRemoveToastProps {
    playlist: FragmentType<typeof fragments.playlist>;
}

export function PlaylistRemoveToast({ playlist: playlistFragment }: PlaylistRemoveToastProps) {
    const playlist = getFragmentData(fragments.playlist, playlistFragment);

    return (
        <Toast>
            <Text color="text-primary">{playlist.name}</Text> was deleted!
        </Toast>
    );
}
