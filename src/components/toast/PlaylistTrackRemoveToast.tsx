import Link from "next/link";

import { Row } from "@/components/box/Flex";
import { Text } from "@/components/text/Text";
import { Toast } from "@/components/toast/Toast";
import { SongTitle } from "@/components/utils/SongTitle";
import { type FragmentType, getFragmentData, graphql } from "@/graphql/generated";

const fragments = {
    playlist: graphql(`
        fragment PlaylistTrackRemoveToastPlaylist on Playlist {
            id
            name
        }
    `),
    entry: graphql(`
        fragment PlaylistTrackRemoveToastEntry on AnimeThemeEntry {
            animetheme {
                song {
                    ...SongTitleSong
                }
            }
        }
    `),
};

interface PlaylistTrackRemoveToastProps {
    playlist: FragmentType<typeof fragments.playlist>;
    entry: FragmentType<typeof fragments.entry>;
}

export function PlaylistTrackRemoveToast({
    playlist: playlistFragment,
    entry: entryFragment,
}: PlaylistTrackRemoveToastProps) {
    const playlist = getFragmentData(fragments.playlist, playlistFragment);
    const entry = getFragmentData(fragments.entry, entryFragment);

    return (
        <Toast as={Link} href={`/playlist/${playlist.id}`} $hoverable>
            <Row $wrap style={{ "--justify-content": "space-between", "--gap": "8px" }}>
                <span>
                    <SongTitle song={entry.animetheme.song} /> was removed from{" "}
                    <Text color="text-primary">{playlist.name}</Text>!
                </span>
                <Text color="text-disabled">(Click to view playlist.)</Text>
            </Row>
        </Toast>
    );
}
