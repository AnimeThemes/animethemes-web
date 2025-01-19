import Link from "next/link";

import gql from "graphql-tag";

import { Row } from "@/components/box/Flex";
import { Text } from "@/components/text/Text";
import { Toast } from "@/components/toast/Toast";
import { SongTitle } from "@/components/utils/SongTitle";
import type {
    PlaylistTrackRemoveToastEntryFragment,
    PlaylistTrackRemoveToastPlaylistFragment,
} from "@/generated/graphql";

interface PlaylistTrackRemoveToastProps {
    playlist: PlaylistTrackRemoveToastPlaylistFragment;
    entry: PlaylistTrackRemoveToastEntryFragment;
}

export function PlaylistTrackRemoveToast({ playlist, entry }: PlaylistTrackRemoveToastProps) {
    return (
        <Toast as={Link} href={`/playlist/${playlist.id}`} $hoverable>
            <Row $wrap style={{ "--justify-content": "space-between", "--gap": "8px" }}>
                <span>
                    <SongTitle song={entry.theme?.song ?? null} /> was removed from{" "}
                    <Text color="text-primary">{playlist.name}</Text>!
                </span>
                <Text color="text-disabled">(Click to view playlist.)</Text>
            </Row>
        </Toast>
    );
}

PlaylistTrackRemoveToast.fragments = {
    playlist: gql`
        fragment PlaylistTrackRemoveToastPlaylist on Playlist {
            id
            name
        }
    `,
    entry: gql`
        ${SongTitle.fragments.song}

        fragment PlaylistTrackRemoveToastEntry on Entry {
            theme {
                song {
                    ...SongTitleSong
                }
            }
        }
    `,
};
