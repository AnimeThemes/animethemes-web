import { useState } from "react";
import type { FormEvent, ReactNode } from "react";
import styled from "styled-components";

import { useMutation } from "@apollo/client";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import type { ResultOf } from "@graphql-typed-document-node/core";

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
import { type FragmentType, getFragmentData, graphql } from "@/graphql/generated";
import type { PlaylistVisibility } from "@/graphql/generated/graphql";
import { PLAYLIST_DETAIL_PAGE_PLAYLIST } from "@/pages/playlist/[playlistId]";
import { PROFILE_PAGE } from "@/pages/profile";

export const PLAYLIST_EDIT_DIALOG_PLAYLIST = graphql(`
    fragment PlaylistEditDialogPlaylist on Playlist {
        id
        name
        visibility
    }
`);

interface PlaylistEditFormErrors {
    name?: string[];
}

interface PlaylistEditDialogProps {
    playlist: FragmentType<typeof PLAYLIST_EDIT_DIALOG_PLAYLIST>;
    trigger?: ReactNode;
}

export function PlaylistEditDialog({ playlist: playlistFragment, trigger }: PlaylistEditDialogProps) {
    const playlist = getFragmentData(PLAYLIST_EDIT_DIALOG_PLAYLIST, playlistFragment);

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
    playlist: ResultOf<typeof PLAYLIST_EDIT_DIALOG_PLAYLIST>;
    onSuccess(): void;
    onCancel(): void;
}

function PlaylistEditForm({ playlist, onSuccess, onCancel }: PlaylistEditFormProps) {
    const [title, setTitle] = useState(playlist.name);
    const [visibility, setVisibility] = useState<PlaylistVisibility>(playlist.visibility);

    const isValid = title !== "";

    const [errors, setErrors] = useState<PlaylistEditFormErrors>({});

    const [mutate, { loading, error }] = useMutation(
        graphql(`
            mutation PlaylistEdit($id: String!, $input: UpdatePlaylistInput!) {
                updatePlaylist(id: $id, input: $input) {
                    name
                }
            }
        `),
        {
            onCompleted: () => onSuccess(),
            onError(error) {
                const extensions = error.graphQLErrors?.[0]?.extensions;

                if (extensions?.code === "VALIDATION") {
                    setErrors(extensions.validation as PlaylistEditFormErrors);
                }
            },
            refetchQueries: [
                // Update the profile page because it includes a list of the user's playlists
                PROFILE_PAGE,
                // Update the playlist page in case the user is editing from there
                PLAYLIST_DETAIL_PAGE_PLAYLIST,
            ],
        },
    );

    async function submit(event: FormEvent) {
        event.preventDefault();

        await mutate({
            variables: {
                id: playlist.id,
                input: {
                    name: title,
                    visibility,
                },
            },
        });
    }

    return (
        <StyledForm onSubmit={submit}>
            <Column style={{ "--gap": "24px" }}>
                <SearchFilter>
                    <Text>Title</Text>
                    <Input value={title} onChange={setTitle} />
                    {errors.name
                            ? errors.name.map((error) => (
                                  <Text key={error} color="text-warning">
                                      {error}
                                  </Text>
                              ))
                            : null}
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
                    <Button type="submit" variant="primary" disabled={!isValid || loading}>
                        <Busy isBusy={loading}>Update Playlist</Busy>
                    </Button>
                </Row>
                {error ? (
                    <Text color="text-warning">
                        <strong>The playlist could not be updated: </strong>
                        {error.message}
                    </Text>
                ) : null}
            </Column>
        </StyledForm>
    );
}
