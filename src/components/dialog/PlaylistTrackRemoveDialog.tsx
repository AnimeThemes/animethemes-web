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

export const PLAYLIST_TRACK_REMOVE_DIALOG_PLAYLIST = graphql(`
    fragment PlaylistTrackRemoveDialogPlaylist on Playlist {
        ...PlaylistTrackRemoveToastPlaylist
        id
        name
    }
`);

export const PLAYLIST_TRACK_REMOVE_DIALOG_VIDEO = graphql(`
    fragment PlaylistTrackRemoveDialogVideo on Video {
        ...VideoSummaryCardVideo
    }
`);

export const PLAYLIST_TRACK_REMOVE_DIALOG_ENTRY = graphql(`
    fragment PlaylistTrackRemoveDialogEntry on AnimeThemeEntry {
        ...VideoSummaryCardEntry
        ...PlaylistTrackRemoveToastEntry
        animetheme {
            ...VideoSummaryCardTheme
        }
    }
`);

interface PlaylistTrackRemoveDialogProps {
    playlist: FragmentType<typeof PLAYLIST_TRACK_REMOVE_DIALOG_PLAYLIST>;
    trackId: string;
    video: FragmentType<typeof PLAYLIST_TRACK_REMOVE_DIALOG_VIDEO>;
    entry: FragmentType<typeof PLAYLIST_TRACK_REMOVE_DIALOG_ENTRY>;
    trigger?: ReactNode;
}

export function PlaylistTrackRemoveDialog({
    playlist: playlistFragment,
    trackId,
    video: videoFragment,
    entry: entryFragment,
    trigger,
}: PlaylistTrackRemoveDialogProps) {
    const playlist = getFragmentData(PLAYLIST_TRACK_REMOVE_DIALOG_PLAYLIST, playlistFragment);
    const video = getFragmentData(PLAYLIST_TRACK_REMOVE_DIALOG_VIDEO, videoFragment);
    const entry = getFragmentData(PLAYLIST_TRACK_REMOVE_DIALOG_ENTRY, entryFragment);

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
    playlist: ResultOf<typeof PLAYLIST_TRACK_REMOVE_DIALOG_PLAYLIST>;
    trackId: string;
    video: ResultOf<typeof PLAYLIST_TRACK_REMOVE_DIALOG_VIDEO>;
    entry: ResultOf<typeof PLAYLIST_TRACK_REMOVE_DIALOG_ENTRY>;
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
                deletePlaylistTrack(id: $id, playlist: $playlistId)
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
            <VideoSummaryCard video={video} entry={entry} theme={entry.animetheme} menu={null} />
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
