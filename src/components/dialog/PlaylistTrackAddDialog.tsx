import { useState } from "react";
import type { ReactNode } from "react";

import { useMutation } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import { faArrowDown, faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import type { ResultOf } from "@graphql-typed-document-node/core";

import { LoginGate } from "@/components/auth/LoginGate";
import { Column, Row } from "@/components/box/Flex";
import { Button } from "@/components/button/Button";
import { IconTextButton } from "@/components/button/IconTextButton";
import PlaylistSummaryCard from "@/components/card/PlaylistSummaryCard";
import { VideoSummaryCard } from "@/components/card/VideoSummaryCard";
import { Dialog, DialogContent, DialogTrigger } from "@/components/dialog/Dialog";
import { PlaylistAddDialog } from "@/components/dialog/PlaylistAddDialog";
import { Icon } from "@/components/icon/Icon";
import { Skeleton } from "@/components/skeleton/Skeleton";
import { Text } from "@/components/text/Text";
import { PlaylistTrackAddToast } from "@/components/toast/PlaylistTrackAddToast";
import { PlaylistTrackRemoveToast } from "@/components/toast/PlaylistTrackRemoveToast";
import { Busy } from "@/components/utils/Busy";
import { useToasts } from "@/context/toastContext";
import { type FragmentType, getFragmentData, graphql } from "@/graphql/generated";
import { PLAYLIST_DETAIL_PAGE_PLAYLIST } from "@/pages/playlist/[playlistId]";
import { PROFILE_PAGE } from "@/pages/profile";

const fragments = {
    video: graphql(`
        fragment PlaylistTrackAddDialogVideo on Video {
            ...VideoSummaryCardVideo
            id
        }
    `),
    entry: graphql(`
        fragment PlaylistTrackAddDialogEntry on AnimeThemeEntry {
            ...VideoSummaryCardEntry
            ...PlaylistTrackAddToastEntry
            ...PlaylistTrackRemoveToastEntry
            id
        }
    `),
};

interface PlaylistTrackAddDialogProps {
    video: FragmentType<typeof fragments.video>;
    entry: FragmentType<typeof fragments.entry>;
    trigger?: ReactNode;
}

export function PlaylistTrackAddDialog({
    video: videoFragment,
    entry: entryFragment,
    trigger,
}: PlaylistTrackAddDialogProps) {
    const video = getFragmentData(fragments.video, videoFragment);
    const entry = getFragmentData(fragments.entry, entryFragment);
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {trigger ?? (
                    <IconTextButton icon={faPlus} variant="solid" collapsible>
                        Add to Playlist
                    </IconTextButton>
                )}
            </DialogTrigger>
            <DialogContent title="Add to playlist">
                {/* Only render the form when dialog is open, so it will reset after closing. */}
                {open ? (
                    <LoginGate>
                        <PlaylistTrackAddForm video={video} entry={entry} onCancel={() => setOpen(false)} />
                    </LoginGate>
                ) : null}
            </DialogContent>
        </Dialog>
    );
}

const PLAYLIST_TRACK_ADD_FORM_PLAYLIST = graphql(`
    query PlaylistTrackAddFormPlaylist($entryId: Mixed!, $videoId: Mixed!) {
        me {
            playlists {
                ...PlaylistTrackAddCardPlaylist
                id
                tracks(where: [{ field: ENTRY_ID, value: $entryId }, { field: VIDEO_ID, value: $videoId }]) {
                    ...PlaylistTrackAddCardTrack
                }
            }
        }
    }
`);

interface PlaylistTrackAddFormProps {
    video: ResultOf<typeof fragments.video>;
    entry: ResultOf<typeof fragments.entry>;
    onCancel(): void;
}

function PlaylistTrackAddForm({ video, entry, onCancel }: PlaylistTrackAddFormProps) {
    const { data } = useQuery(PLAYLIST_TRACK_ADD_FORM_PLAYLIST, {
        variables: {
            entryId: entry.id,
            videoId: video.id,
        },
    });

    if (!data) {
        return (
            <Column style={{ "--gap": "24px" }}>
                <Skeleton variant="summary-card" />
                <Skeleton variant="summary-card" />
                <Skeleton variant="summary-card" />
                <Skeleton variant="summary-card" />
            </Column>
        );
    }

    const playlists = data.me?.playlists ?? [];

    return (
        <Column style={{ "--gap": "24px" }}>
            <VideoSummaryCard video={video} entry={entry} menu={null} />
            <Row style={{ "--justify-content": "center" }}>
                <Icon icon={faArrowDown} color="text-disabled" />
            </Row>
            <Column style={{ "--gap": "16px" }}>
                {playlists?.length ? (
                    playlists.map((playlist) => (
                        <PlaylistTrackAddCard
                            key={playlist.id}
                            playlist={playlist}
                            track={playlist.tracks[0] ?? null}
                            video={video}
                            entry={entry}
                        />
                    ))
                ) : (
                    <Text>You have not created a playlist, yet.</Text>
                )}
                <PlaylistAddDialog
                    trigger={
                        <Button style={{ "--gap": "8px" }}>
                            <Icon icon={faPlus} />
                            <Text>Create new Playlist</Text>
                        </Button>
                    }
                />
            </Column>
            <Row $wrap style={{ "--gap": "8px", "--justify-content": "flex-end" }}>
                <Button variant="silent" onClick={onCancel}>
                    Close
                </Button>
            </Row>
        </Column>
    );
}

const PLAYLIST_TRACK_ADD_CARD_PLAYLIST = graphql(`
    fragment PlaylistTrackAddCardPlaylist on Playlist {
        ...PlaylistSummaryCardPlaylist
        ...PlaylistTrackAddToastPlaylist
        ...PlaylistTrackRemoveToastPlaylist
        id
    }
`);

const PLAYLIST_TRACK_ADD_CARD_TRACK = graphql(`
    fragment PlaylistTrackAddCardTrack on PlaylistTrack {
        id
    }
`);

interface PlaylistTrackAddCardProps {
    playlist: FragmentType<typeof PLAYLIST_TRACK_ADD_CARD_PLAYLIST>;
    track: FragmentType<typeof PLAYLIST_TRACK_ADD_CARD_TRACK> | null;
    video: ResultOf<typeof fragments.video>;
    entry: ResultOf<typeof fragments.entry>;
}

function PlaylistTrackAddCard({
    playlist: playlistFragment,
    track: trackFragment,
    video,
    entry,
}: PlaylistTrackAddCardProps) {
    const playlist = getFragmentData(PLAYLIST_TRACK_ADD_CARD_PLAYLIST, playlistFragment);
    const track = getFragmentData(PLAYLIST_TRACK_ADD_CARD_TRACK, trackFragment);

    const { dispatchToast } = useToasts();

    const [mutateAddTrack, { loading: loadingAddTrack, error: errorAddTrack }] = useMutation(
        graphql(`
            mutation PlaylistTrackAdd($playlistId: String!, $entryId: Int!, $videoId: Int!) {
                CreatePlaylistTrack(playlist: $playlistId, entryId: $entryId, videoId: $videoId) {
                    id
                }
            }
        `),
        {
            onCompleted: () => {
                dispatchToast(
                    `playlist-add-track-${playlist.id}-${video.id}`,
                    <PlaylistTrackAddToast playlist={playlist} entry={entry} />,
                );
            },
            refetchQueries: [
                // Update the profile page because it includes a list of the user's playlists
                PROFILE_PAGE,
                // Update the list in the dialog above
                PLAYLIST_TRACK_ADD_FORM_PLAYLIST,
            ],
        },
    );

    const [mutateRemoveTrack, { loading: loadingRemoveTrack, error: errorRemoveTrack }] = useMutation(
        graphql(`
            mutation PlaylistTrackRemove($id: String!, $playlistId: String!) {
                DeletePlaylistTrack(id: $id, playlist: $playlistId) {
                    message
                }
            }
        `),
        {
            onCompleted: () => {
                if (track === null) {
                    return;
                }

                dispatchToast(
                    `playlist-remove-track-${playlist.id}-${track.id}`,
                    <PlaylistTrackRemoveToast playlist={playlist} entry={entry} />,
                );
            },
            refetchQueries: [
                // Update the profile page because it includes a list of the user's playlists
                PROFILE_PAGE,
                // Update the list in the dialog above
                PLAYLIST_TRACK_ADD_FORM_PLAYLIST,
                // Update the playlist page in case the user is editing from there
                PLAYLIST_DETAIL_PAGE_PLAYLIST,
            ],
        },
    );

    const loading = loadingAddTrack || loadingRemoveTrack;

    async function addTrackToPlaylist() {
        await mutateAddTrack({
            variables: {
                playlistId: playlist.id,
                videoId: video.id,
                entryId: entry.id,
            },
        });
    }

    async function removeTrackFromPlaylist() {
        if (!track) {
            return;
        }

        await mutateRemoveTrack({
            variables: {
                id: track.id,
                playlistId: playlist.id,
            },
        });
    }

    return (
        <>
            <PlaylistSummaryCard key={playlist.id} playlist={playlist}>
                {track === null ? (
                    <IconTextButton icon={faPlus} disabled={loading} onClick={addTrackToPlaylist}>
                        <Busy isBusy={loading}>Add</Busy>
                    </IconTextButton>
                ) : (
                    <IconTextButton icon={faMinus} disabled={loading} onClick={removeTrackFromPlaylist}>
                        <Busy isBusy={loading}>Remove</Busy>
                    </IconTextButton>
                )}
            </PlaylistSummaryCard>
            {errorAddTrack ? (
                <Text color="text-warning">
                    <strong>The theme could not be added to the playlist: </strong>
                    {errorAddTrack.message}
                </Text>
            ) : null}
            {errorRemoveTrack ? (
                <Text color="text-warning">
                    <strong>The theme could not be removed from the playlist: </strong>
                    {errorRemoveTrack.message}
                </Text>
            ) : null}
        </>
    );
}
