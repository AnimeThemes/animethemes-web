import Link from "next/link";

import gql from "graphql-tag";

import { Row } from "@/components/box/Flex";
import { Text } from "@/components/text/Text";
import { Toast } from "@/components/toast/Toast";
import { SongTitle } from "@/components/utils/SongTitle";
import type { PlaylistTrackAddToastEntryFragment, PlaylistTrackAddToastPlaylistFragment } from "@/generated/graphql";

interface PlaylistTrackAddToastProps {
    playlist: PlaylistTrackAddToastPlaylistFragment;
    entry: PlaylistTrackAddToastEntryFragment;
}

export function PlaylistTrackAddToast({ playlist, entry }: PlaylistTrackAddToastProps) {
    return (
        <Toast as={Link} href={`/playlist/${playlist.id}`} $hoverable>
            <Row $wrap style={{ "--justify-content": "space-between", "--gap": "8px" }}>
                <span>
                    <SongTitle song={entry.theme?.song ?? null} /> was added to{" "}
                    <Text color="text-primary">{playlist.name}</Text>!
                </span>
                <Text color="text-disabled">(Click to view playlist.)</Text>
            </Row>
        </Toast>
    );
}

PlaylistTrackAddToast.fragments = {
    playlist: gql`
        fragment PlaylistTrackAddToastPlaylist on Playlist {
            id
            name
        }
    `,
    entry: gql`
        ${SongTitle.fragments.song}

        fragment PlaylistTrackAddToastEntry on Entry {
            theme {
                song {
                    ...SongTitleSong
                }
            }
        }
    `,
};
