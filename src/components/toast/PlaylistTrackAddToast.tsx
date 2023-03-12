import Link from "next/link";
import { Toast } from "components/toast";
import { Text } from "components/text";
import { Row } from "components/box";
import { SongTitle } from "components/utils";
import type { PlaylistTrackAddToastPlaylistFragment, PlaylistTrackAddToastVideoFragment } from "generated/graphql";
import gql from "graphql-tag";

interface PlaylistTrackAddToastProps {
    playlist: PlaylistTrackAddToastPlaylistFragment;
    video: PlaylistTrackAddToastVideoFragment;
}

export function PlaylistTrackAddToast({ playlist, video }: PlaylistTrackAddToastProps) {
    return (
        <Link href={`/playlist/${playlist.id}`} passHref legacyBehavior>
            <Toast as="a" hoverable>
                <Row $wrap style={{ "--justify-content": "space-between", "--gap": "8px" }}>
                    <span>
                        <SongTitle song={video.entries[0]?.theme?.song ?? null} /> was added to <Text color="text-primary">{playlist.name}</Text>!
                    </span>
                    <Text color="text-disabled">(Click to view playlist.)</Text>
                </Row>
            </Toast>
        </Link>
    );
}

PlaylistTrackAddToast.fragments = {
    playlist: gql`
        fragment PlaylistTrackAddToastPlaylist on Playlist {
            id
            name
        }
    `,
    video: gql`
        ${SongTitle.fragments.song}

        fragment PlaylistTrackAddToastVideo on Video {
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
