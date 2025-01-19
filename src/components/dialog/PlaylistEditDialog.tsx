import { useState } from "react";
import type { FormEvent, ReactNode } from "react";
import styled from "styled-components";

import { faPen } from "@fortawesome/free-solid-svg-icons";
import { isAxiosError } from "axios";
import gql from "graphql-tag";
import { mutate } from "swr";

import { LoginGate } from "@/components/auth/LoginGate";
import { Column, Row } from "@/components/box/Flex";
import { Button } from "@/components/button/Button";
import { IconTextButton } from "@/components/button/IconTextButton";
import { Dialog, DialogContent, DialogTrigger } from "@/components/dialog/Dialog";
import { Input } from "@/components/form/Input";
import { Listbox, ListboxOption } from "@/components/listbox/Listbox";
import { SearchFilter } from "@/components/search-filter/SearchFilter";
import { Text } from "@/components/text/Text";
import { Busy } from "@/components/utils/Busy";
import type { PlaylistEditDialogPlaylistFragment } from "@/generated/graphql";
import axios from "@/lib/client/axios";

interface PlaylistEditDialogProps {
    playlist: PlaylistEditDialogPlaylistFragment;
    trigger?: ReactNode;
}

export function PlaylistEditDialog({ playlist, trigger }: PlaylistEditDialogProps) {
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {trigger ?? (
                    <IconTextButton icon={faPen} variant="solid">
                        Edit Playlist
                    </IconTextButton>
                )}
            </DialogTrigger>
            <DialogContent title="Edit playlist details">
                {/* Only render the form when dialog is open, so it will reset after closing. */}
                {open ? (
                    <LoginGate>
                        <PlaylistEditForm
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

PlaylistEditDialog.fragments = {
    playlist: gql`
        fragment PlaylistEditDialogPlaylist on Playlist {
            id
            name
            visibility
        }
    `,
};

const StyledForm = styled.form`
    position: relative;
`;

interface PlaylistEditFormProps {
    playlist: PlaylistEditDialogPlaylistFragment;
    onSuccess(): void;
    onCancel(): void;
}

function PlaylistEditForm({ playlist, onSuccess, onCancel }: PlaylistEditFormProps) {
    const [title, setTitle] = useState(playlist.name);
    const [visibility, setVisibility] = useState<string>(playlist.visibility);

    const isValid = title !== "";

    const [isBusy, setBusy] = useState(false);
    const [error, setError] = useState("");

    async function submit(event: FormEvent) {
        event.preventDefault();

        setBusy(true);
        setError("");

        try {
            await axios.put(`/playlist/${playlist.id}`, {
                name: title,
                visibility,
            });
            await mutate((key) =>
                [key].flat().some((key) => key === `/api/playlist/${playlist.id}` || key === "/api/me/playlist"),
            );
        } catch (error: unknown) {
            if (isAxiosError(error) && error.response) {
                setError(error.response.data.message ?? "An unknown error occured!");
            }

            return;
        } finally {
            setBusy(false);
        }

        onSuccess();
    }

    return (
        <StyledForm onSubmit={submit}>
            <Column style={{ "--gap": "24px" }}>
                <SearchFilter>
                    <Text>Title</Text>
                    <Input value={title} onChange={setTitle} />
                </SearchFilter>
                <SearchFilter>
                    <Text>Visibility</Text>
                    <Listbox value={visibility} onValueChange={setVisibility}>
                        <ListboxOption value="Public">Public</ListboxOption>
                        <ListboxOption value="Unlisted">Unlisted</ListboxOption>
                        <ListboxOption value="Private">Private</ListboxOption>
                    </Listbox>
                </SearchFilter>
                <Row $wrap style={{ "--gap": "8px", "--justify-content": "flex-end" }}>
                    <Button type="button" variant="silent" onClick={onCancel}>
                        Cancel
                    </Button>
                    <Button type="submit" variant="primary" disabled={!isValid || isBusy}>
                        <Busy isBusy={isBusy}>Update Playlist</Busy>
                    </Button>
                </Row>
                {error ? (
                    <Text color="text-warning">
                        <strong>The playlist could not be updated: </strong>
                        {error}
                    </Text>
                ) : null}
            </Column>
        </StyledForm>
    );
}
