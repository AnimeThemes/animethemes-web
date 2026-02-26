import Link from "next/link";

import { Row } from "@/components/box/Flex";
import { Text } from "@/components/text/Text";
import { Toast } from "@/components/toast/Toast";
import { SongTitle } from "@/components/utils/SongTitle";
import { type FragmentType, getFragmentData, graphql } from "@/graphql/generated";

const fragments = {
    playlist: graphql(`
        fragment PlaylistTrackAddToastPlaylist on Playlist {
            id
            name
        }
    `),
    entry: graphql(`
        fragment PlaylistTrackAddToastEntry on AnimeThemeEntry {
            animetheme {
                song {
                    ...SongTitleSong
                }
            }
        }
    `),
};

interface PlaylistTrackAddToastProps {
    playlist: FragmentType<typeof fragments.playlist>;
    entry: FragmentType<typeof fragments.entry>;
}

export function PlaylistTrackAddToast({
    playlist: playlistFragment,
    entry: entryFragment,
}: PlaylistTrackAddToastProps) {
    const playlist = getFragmentData(fragments.playlist, playlistFragment);
    const entry = getFragmentData(fragments.entry, entryFragment);

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
