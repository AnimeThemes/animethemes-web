import { useState } from "react";
import type { ReactNode } from "react";

import { faMinus } from "@fortawesome/free-solid-svg-icons";
import gql from "graphql-tag";
import { mutate } from "swr";

import { LoginGate } from "@/components/auth/LoginGate";
import { Column, Row } from "@/components/box/Flex";
import { Button } from "@/components/button/Button";
import { IconTextButton } from "@/components/button/IconTextButton";
import PlaylistSummaryCard from "@/components/card/PlaylistSummaryCard";
import { Dialog, DialogContent, DialogTrigger } from "@/components/dialog/Dialog";
import { Text } from "@/components/text/Text";
import { PlaylistRemoveToast } from "@/components/toast/PlaylistRemoveToast";
import { Busy } from "@/components/utils/Busy";
import { useToasts } from "@/context/toastContext";
import type { PlaylistRemoveDialogPlaylistFragment } from "@/generated/graphql";
import axios from "@/lib/client/axios";

interface PlaylistRemoveDialogProps {
    playlist: PlaylistRemoveDialogPlaylistFragment;
    trigger?: ReactNode;
}

export function PlaylistRemoveDialog({ playlist, trigger }: PlaylistRemoveDialogProps) {
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {trigger ?? (
                    <IconTextButton icon={faMinus} variant="solid" collapsible>
                        Delete playlist
                    </IconTextButton>
                )}
            </DialogTrigger>
            <DialogContent title="Delete playlist">
                {/* Only render the form when dialog is open, so it will reset after closing. */}
                {open ? (
                    <LoginGate>
                        <PlaylistRemoveForm
                            playlist={playlist}
                            onSuccess={() => setOpen(false)}
                            onCancel={() => setOpen(false)}
                        />
                    </LoginGate>
                ) : null}
            </DialogContent>
        </Dialog>
    );
}

PlaylistRemoveDialog.fragments = {
    playlist: gql`
        ${PlaylistSummaryCard.fragments.playlist}
        ${PlaylistRemoveToast.fragments.playlist}

        fragment PlaylistRemoveDialogPlaylist on Playlist {
            ...PlaylistSummaryCardPlaylist
            ...PlaylistRemoveToastPlaylist
            id
            name
        }
    `,
};

interface PlaylistRemoveFormProps {
    playlist: PlaylistRemoveDialogPlaylistFragment;
    onSuccess(): void;
    onCancel(): void;
}

function PlaylistRemoveForm({ playlist, onSuccess, onCancel }: PlaylistRemoveFormProps) {
    const { dispatchToast } = useToasts();

    const [isBusy, setBusy] = useState(false);

    async function removePlaylist() {
        setBusy(true);

        try {
            await axios.delete(`/playlist/${playlist.id}`);
            await mutate((key) => [key].flat().includes("/api/me/playlist"));
        } finally {
            setBusy(false);
        }

        dispatchToast(`playlist-remove-${playlist.id}`, <PlaylistRemoveToast playlist={playlist} />);

        onSuccess();
    }

    return (
        <Column style={{ "--gap": "24px" }}>
            <Text>
                Do you really want to delete{" "}
                <Text color="text-primary" link noWrap>
                    {playlist.name}
                </Text>
                ?
            </Text>
            <PlaylistSummaryCard playlist={playlist} />
            <Row $wrap style={{ "--gap": "8px", "--justify-content": "flex-end" }}>
                <Button variant="silent" onClick={onCancel}>
                    Close
                </Button>
                <Button variant="warning" disabled={isBusy} onClick={removePlaylist}>
                    <Busy isBusy={isBusy}>Delete playlist</Busy>
                </Button>
            </Row>
        </Column>
    );
}
