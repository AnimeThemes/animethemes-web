import { useState } from "react";
import type { ReactNode } from "react";

import { useMutation } from "@apollo/client";
import { faMinus } from "@fortawesome/free-solid-svg-icons";
import type { ResultOf } from "@graphql-typed-document-node/core";

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
import { type FragmentType, getFragmentData, graphql } from "@/graphql/generated";
import { PROFILE_PAGE } from "@/pages/profile";

const fragments = {
    playlist: graphql(`
        fragment PlaylistRemoveDialogPlaylist on Playlist {
            ...PlaylistSummaryCardPlaylist
            ...PlaylistRemoveToastPlaylist
            id
            name
        }
    `),
};

interface PlaylistRemoveDialogProps {
    playlist: FragmentType<typeof fragments.playlist>;
    trigger?: ReactNode;
}

export function PlaylistRemoveDialog({ playlist: playlistFragment, trigger }: PlaylistRemoveDialogProps) {
    const playlist = getFragmentData(fragments.playlist, playlistFragment);

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

interface PlaylistRemoveFormProps {
    playlist: ResultOf<typeof fragments.playlist>;
    onSuccess(): void;
    onCancel(): void;
}

function PlaylistRemoveForm({ playlist, onSuccess, onCancel }: PlaylistRemoveFormProps) {
    const { dispatchToast } = useToasts();

    const [mutate, { loading, error }] = useMutation(
        graphql(`
            mutation PlaylistRemove($id: String!) {
                DeletePlaylist(id: $id) {
                    message
                }
            }
        `),
        {
            onCompleted: () => {
                dispatchToast(`playlist-remove-${playlist.id}`, <PlaylistRemoveToast playlist={playlist} />);

                onSuccess();
            },
            refetchQueries: [
                // Update the profile page because it includes a list of the user's playlists
                PROFILE_PAGE,
            ],
        },
    );

    async function removePlaylist() {
        await mutate({
            variables: {
                id: playlist.id,
            },
        });
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
                <Button variant="warning" disabled={loading} onClick={removePlaylist}>
                    <Busy isBusy={loading}>Delete playlist</Busy>
                </Button>
            </Row>
            {error ? (
                <Text color="text-warning">
                    <strong>The playlist could not be removed: </strong>
                    {error.message}
                </Text>
            ) : null}
        </Column>
    );
}
