import Link from "next/link";

import { Row } from "@/components/box/Flex";
import { Text } from "@/components/text/Text";
import { Toast } from "@/components/toast/Toast";
import { SongTitle } from "@/components/utils/SongTitle";
import { type FragmentType, getFragmentData, graphql } from "@/graphql/generated";

export const PLAYLIST_TRACK_ADD_TOAST_PLAYLIST = graphql(`
    fragment PlaylistTrackAddToastPlaylist on Playlist {
        id
        name
    }
`);

export const PLAYLIST_TRACK_ADD_TOAST_ENTRY = graphql(`
    fragment PlaylistTrackAddToastEntry on AnimeThemeEntry {
        animetheme {
            song {
                ...SongTitleSong
            }
        }
    }
`);

interface PlaylistTrackAddToastProps {
    playlist: FragmentType<typeof PLAYLIST_TRACK_ADD_TOAST_PLAYLIST>;
    entry: FragmentType<typeof PLAYLIST_TRACK_ADD_TOAST_ENTRY>;
}

export function PlaylistTrackAddToast({
    playlist: playlistFragment,
    entry: entryFragment,
}: PlaylistTrackAddToastProps) {
    const playlist = getFragmentData(PLAYLIST_TRACK_ADD_TOAST_PLAYLIST, playlistFragment);
    const entry = getFragmentData(PLAYLIST_TRACK_ADD_TOAST_ENTRY, entryFragment);

    return (
        <Toast as={Link} href={`/playlist/${playlist.id}`} $hoverable>
            <Row $wrap style={{ "--justify-content": "space-between", "--gap": "8px" }}>
                <span>
                    <SongTitle song={entry.animetheme.song} /> was added to{" "}
                    <Text color="text-primary">{playlist.name}</Text>!
                </span>
                <Text color="text-disabled">(Click to view playlist.)</Text>
            </Row>
        </Toast>
    );
}
