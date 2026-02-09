import { useState } from "react";
import type { FormEvent, ReactNode } from "react";
import styled from "styled-components";

import { faPen } from "@fortawesome/free-solid-svg-icons";
import type { ResultOf } from "@graphql-typed-document-node/core";
import { isAxiosError } from "axios";
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
import { client } from "@/graphql/client";
import { type FragmentType, getFragmentData, graphql } from "@/graphql/generated";
import type { PlaylistVisibility } from "@/graphql/generated/graphql";

const fragments = {
    playlist: graphql(`
        fragment PlaylistEditDialogPlaylist on Playlist {
            id
            name
            visibility
        }
    `),
};

interface PlaylistEditDialogProps {
    playlist: FragmentType<typeof fragments.playlist>;
    trigger?: ReactNode;
}

export function PlaylistEditDialog({ playlist: playlistFragment, trigger }: PlaylistEditDialogProps) {
    const playlist = getFragmentData(fragments.playlist, playlistFragment);

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

const StyledForm = styled.form`
    position: relative;
`;

interface PlaylistEditFormProps {
    playlist: ResultOf<typeof fragments.playlist>;
    onSuccess(): void;
    onCancel(): void;
}

function PlaylistEditForm({ playlist, onSuccess, onCancel }: PlaylistEditFormProps) {
    const [title, setTitle] = useState(playlist.name);
    const [visibility, setVisibility] = useState<PlaylistVisibility>(playlist.visibility);

    const isValid = title !== "";

    const [isBusy, setBusy] = useState(false);
    const [error, setError] = useState("");

    async function submit(event: FormEvent) {
        event.preventDefault();

        setBusy(true);
        setError("");

        try {
            await client.mutate({
                mutation: graphql(`
                    mutation PlaylistEdit($id: String!, $name: String, $visibility: PlaylistVisibility) {
                        UpdatePlaylist(id: $id, name: $name, visibility: $visibility) {
                            name
                        }
                    }
                `),
                variables: {
                    id: playlist.id,
                    name: title,
                    visibility,
                },
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
                    <Listbox
                        value={visibility}
                        onValueChange={(newVisibility) => setVisibility(newVisibility as PlaylistVisibility)}
                    >
                        <ListboxOption value="PUBLIC">Public</ListboxOption>
                        <ListboxOption value="UNLISTED">Unlisted</ListboxOption>
                        <ListboxOption value="PRIVATE">Private</ListboxOption>
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
