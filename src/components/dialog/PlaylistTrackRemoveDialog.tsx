import { useState } from "react";
import type { ReactNode } from "react";

import { useMutation } from "@apollo/client";
import { faMinus } from "@fortawesome/free-solid-svg-icons";
import type { ResultOf } from "@graphql-typed-document-node/core";

import { LoginGate } from "@/components/auth/LoginGate";
import { Column, Row } from "@/components/box/Flex";
import { Button } from "@/components/button/Button";
import { IconTextButton } from "@/components/button/IconTextButton";
import { VideoSummaryCard } from "@/components/card/VideoSummaryCard";
import { Dialog, DialogContent, DialogTrigger } from "@/components/dialog/Dialog";
import { Text } from "@/components/text/Text";
import { PlaylistTrackRemoveToast } from "@/components/toast/PlaylistTrackRemoveToast";
import { Busy } from "@/components/utils/Busy";
import { useToasts } from "@/context/toastContext";
import { type FragmentType, getFragmentData, graphql } from "@/graphql/generated";
import { PLAYLIST_DETAIL_PAGE_PLAYLIST } from "@/pages/playlist/[playlistId]";

const fragments = {
    playlist: graphql(`
        fragment PlaylistTrackRemoveDialogPlaylist on Playlist {
            ...PlaylistTrackRemoveToastPlaylist
            id
            name
        }
    `),
    video: graphql(`
        fragment PlaylistTrackRemoveDialogVideo on Video {
            ...VideoSummaryCardVideo
        }
    `),
    entry: graphql(`
        fragment PlaylistTrackRemoveDialogEntry on AnimeThemeEntry {
            ...VideoSummaryCardEntry
            ...PlaylistTrackRemoveToastEntry
        }
    `),
};

interface PlaylistTrackRemoveDialogProps {
    playlist: FragmentType<typeof fragments.playlist>;
    trackId: string;
    video: FragmentType<typeof fragments.video>;
    entry: FragmentType<typeof fragments.entry>;
    trigger?: ReactNode;
}

export function PlaylistTrackRemoveDialog({
    playlist: playlistFragment,
    trackId,
    video: videoFragment,
    entry: entryFragment,
    trigger,
}: PlaylistTrackRemoveDialogProps) {
    const playlist = getFragmentData(fragments.playlist, playlistFragment);
    const video = getFragmentData(fragments.video, videoFragment);
    const entry = getFragmentData(fragments.entry, entryFragment);

    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {trigger ?? (
                    <IconTextButton icon={faMinus} variant="solid" collapsible>
                        Remove from Playlist
                    </IconTextButton>
                )}
            </DialogTrigger>
            <DialogContent title="Remove from playlist">
                {/* Only render the form when dialog is open, so it will reset after closing. */}
                {open ? (
                    <LoginGate>
                        <PlaylistTrackRemoveForm
                            playlist={playlist}
                            trackId={trackId}
                            video={video}
                            entry={entry}
                            onSuccess={() => setOpen(false)}
                            onCancel={() => setOpen(false)}
                        />
                    </LoginGate>
                ) : null}
            </DialogContent>
        </Dialog>
    );
}

interface PlaylistTrackRemoveFormProps {
    playlist: ResultOf<typeof fragments.playlist>;
    trackId: string;
    video: ResultOf<typeof fragments.video>;
    entry: ResultOf<typeof fragments.entry>;
    onSuccess(): void;
    onCancel(): void;
}

function PlaylistTrackRemoveForm({
    playlist,
    trackId,
    video,
    entry,
    onSuccess,
    onCancel,
}: PlaylistTrackRemoveFormProps) {
    const { dispatchToast } = useToasts();

    const [mutate, { loading, error }] = useMutation(
        graphql(`
            mutation PlaylistTrackRemove($id: String!, $playlistId: String!) {
                DeletePlaylistTrack(id: $id, playlist: $playlistId) {
                    message
                }
            }
        `),
        {
            onCompleted: () => {
                dispatchToast(
                    `playlist-remove-track-${playlist.id}-${trackId}`,
                    <PlaylistTrackRemoveToast playlist={playlist} entry={entry} />,
                );

                onSuccess();
            },
            refetchQueries: [
                // Update the playlist page in case the user is editing from there
                PLAYLIST_DETAIL_PAGE_PLAYLIST,
            ],
        },
    );

    async function removeTrackFromPlaylist() {
        await mutate({
            variables: {
                id: trackId,
                playlistId: playlist.id,
            },
        });
    }

    return (
        <Column style={{ "--gap": "24px" }}>
            <Text>
                Do you really want to remove this video from{" "}
                <Text color="text-primary" link noWrap>
                    {playlist.name}
                </Text>
                ?
            </Text>
            <VideoSummaryCard video={video} entry={entry} menu={null} />
            <Row $wrap style={{ "--gap": "8px", "--justify-content": "flex-end" }}>
                <Button variant="silent" onClick={onCancel}>
                    Close
                </Button>
                <Button variant="warning" disabled={loading} onClick={removeTrackFromPlaylist}>
                    <Busy isBusy={loading}>Remove from playlist</Busy>
                </Button>
            </Row>
            {error ? (
                <Text color="text-warning">
                    <strong>The theme could not be removed from the playlist: </strong>
                    {error.message}
                </Text>
            ) : null}
        </Column>
    );
}
