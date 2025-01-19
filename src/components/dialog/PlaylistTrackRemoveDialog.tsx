import { useState } from "react";
import type { ReactNode } from "react";

import { faMinus } from "@fortawesome/free-solid-svg-icons";
import gql from "graphql-tag";
import { mutate } from "swr";

import { LoginGate } from "@/components/auth/LoginGate";
import { Column, Row } from "@/components/box/Flex";
import { Button } from "@/components/button/Button";
import { IconTextButton } from "@/components/button/IconTextButton";
import {
    VideoSummaryCard,
    VideoSummaryCardFragmentEntry,
    VideoSummaryCardFragmentVideo,
} from "@/components/card/VideoSummaryCard";
import { Dialog, DialogContent, DialogTrigger } from "@/components/dialog/Dialog";
import { Text } from "@/components/text/Text";
import { PlaylistTrackRemoveToast } from "@/components/toast/PlaylistTrackRemoveToast";
import { Busy } from "@/components/utils/Busy";
import { useToasts } from "@/context/toastContext";
import type {
    PlaylistTrackRemoveDialogEntryFragment,
    PlaylistTrackRemoveDialogPlaylistFragment,
    PlaylistTrackRemoveDialogVideoFragment,
} from "@/generated/graphql";
import axios from "@/lib/client/axios";

interface PlaylistTrackRemoveDialogProps {
    playlist: PlaylistTrackRemoveDialogPlaylistFragment;
    trackId: string;
    video: PlaylistTrackRemoveDialogVideoFragment;
    entry: PlaylistTrackRemoveDialogEntryFragment;
    trigger?: ReactNode;
}

export function PlaylistTrackRemoveDialog({
    playlist,
    trackId,
    video,
    entry,
    trigger,
}: PlaylistTrackRemoveDialogProps) {
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

PlaylistTrackRemoveDialog.fragments = {
    playlist: gql`
        ${PlaylistTrackRemoveToast.fragments.playlist}

        fragment PlaylistTrackRemoveDialogPlaylist on Playlist {
            ...PlaylistTrackRemoveToastPlaylist
            id
            name
        }
    `,
    video: gql`
        ${VideoSummaryCardFragmentVideo}

        fragment PlaylistTrackRemoveDialogVideo on Video {
            ...VideoSummaryCardVideo
        }
    `,
    entry: gql`
        ${VideoSummaryCardFragmentEntry}
        ${PlaylistTrackRemoveToast.fragments.entry}

        fragment PlaylistTrackRemoveDialogEntry on Entry {
            ...VideoSummaryCardEntry
            ...PlaylistTrackRemoveToastEntry
        }
    `,
};

interface PlaylistTrackRemoveFormProps {
    playlist: PlaylistTrackRemoveDialogPlaylistFragment;
    trackId: string;
    video: PlaylistTrackRemoveDialogVideoFragment;
    entry: PlaylistTrackRemoveDialogEntryFragment;
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

    const [isBusy, setBusy] = useState(false);

    async function removeTrackFromPlaylist() {
        setBusy(true);

        try {
            await axios.delete(`/playlist/${playlist.id}/track/${trackId}`);
            await mutate((key) =>
                [key].flat().some((key) => key === `/api/playlist/${playlist.id}` || key === "/api/me/playlist"),
            );
        } finally {
            setBusy(false);
        }

        dispatchToast(
            `playlist-remove-track-${playlist.id}-${trackId}`,
            <PlaylistTrackRemoveToast playlist={playlist} entry={entry} />,
        );

        onSuccess();
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
            <VideoSummaryCard video={video} entry={entry} />
            <Row $wrap style={{ "--gap": "8px", "--justify-content": "flex-end" }}>
                <Button variant="silent" onClick={onCancel}>
                    Close
                </Button>
                <Button variant="warning" disabled={isBusy} onClick={removeTrackFromPlaylist}>
                    <Busy isBusy={isBusy}>Remove from playlist</Busy>
                </Button>
            </Row>
        </Column>
    );
}
