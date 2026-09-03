import Link from "next/link";

import { Row } from "@/components/box/Flex";
import { Text } from "@/components/text/Text";
import { Toast } from "@/components/toast/Toast";
import { SongTitle } from "@/components/utils/SongTitle";
import { type FragmentType, getFragmentData, graphql } from "@/graphql/generated";

export const PLAYLIST_TRACK_REMOVE_TOAST_PLAYLIST = graphql(`
    fragment PlaylistTrackRemoveToastPlaylist on Playlist {
        id
        name
    }
`);

export const PLAYLIST_TRACK_REMOVE_TOAST_ENTRY = graphql(`
    fragment PlaylistTrackRemoveToastEntry on Entry {
        theme {
            song {
                ...SongTitleSong
            }
        }
    }
`);

interface PlaylistTrackRemoveToastProps {
    playlist: FragmentType<typeof PLAYLIST_TRACK_REMOVE_TOAST_PLAYLIST>;
    entry: FragmentType<typeof PLAYLIST_TRACK_REMOVE_TOAST_ENTRY>;
}

export function PlaylistTrackRemoveToast({
    playlist: playlistFragment,
    entry: entryFragment,
}: PlaylistTrackRemoveToastProps) {
    const playlist = getFragmentData(PLAYLIST_TRACK_REMOVE_TOAST_PLAYLIST, playlistFragment);
    const entry = getFragmentData(PLAYLIST_TRACK_REMOVE_TOAST_ENTRY, entryFragment);

    return (
        <Toast as={Link} href={`/playlist/${playlist.id}`} $hoverable>
            <Row $wrap style={{ "--justify-content": "space-between", "--gap": "8px" }}>
                <span>
                    <SongTitle song={entry.theme.song} /> was removed from{" "}
                    <Text color="text-primary">{playlist.name}</Text>!
                </span>
                <Text color="text-disabled">(Click to view playlist.)</Text>
            </Row>
        </Toast>
    );
}
