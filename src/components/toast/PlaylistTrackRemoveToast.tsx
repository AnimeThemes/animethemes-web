import Link from "next/link";

import gql from "graphql-tag";

import { Row } from "@/components/box/Flex";
import { Text } from "@/components/text/Text";
import { Toast } from "@/components/toast/Toast";
import { SongTitle } from "@/components/utils/SongTitle";
import type {
    PlaylistTrackRemoveToastPlaylistFragment,
    PlaylistTrackRemoveToastVideoFragment,
} from "@/generated/graphql";

interface PlaylistTrackRemoveToastProps {
    playlist: PlaylistTrackRemoveToastPlaylistFragment;
    video: PlaylistTrackRemoveToastVideoFragment;
}

export function PlaylistTrackRemoveToast({ playlist, video }: PlaylistTrackRemoveToastProps) {
    return (
        <Link href={`/playlist/${playlist.id}`} passHref legacyBehavior>
            <Toast as="a" hoverable>
                <Row $wrap style={{ "--justify-content": "space-between", "--gap": "8px" }}>
                    <span>
                        <SongTitle song={video.entries[0]?.theme?.song ?? null} /> was removed from{" "}
                        <Text color="text-primary">{playlist.name}</Text>!
                    </span>
                    <Text color="text-disabled">(Click to view playlist.)</Text>
                </Row>
            </Toast>
        </Link>
    );
}

PlaylistTrackRemoveToast.fragments = {
    playlist: gql`
        fragment PlaylistTrackRemoveToastPlaylist on Playlist {
            id
            name
        }
    `,
    video: gql`
        ${SongTitle.fragments.song}

        fragment PlaylistTrackRemoveToastVideo on Video {
            entries {
                theme {
                    song {
                        ...SongTitleSong
                    }
                }
            }
        }
    `,
};
