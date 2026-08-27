import { useState } from "react";
import type { FormEvent, ReactNode } from "react";
import styled from "styled-components";

import { CombinedGraphQLErrors } from "@apollo/client";
import { useMutation } from "@apollo/client/react";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

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
import { graphql } from "@/graphql/generated";
import type { PlaylistVisibility } from "@/graphql/generated/graphql";
import { PROFILE_PAGE } from "@/pages/profile";

interface PlaylistAddDialogProps {
    trigger?: ReactNode;
}

export function PlaylistAddDialog({ trigger }: PlaylistAddDialogProps) {
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {trigger ?? (
                    <IconTextButton icon={faPlus} collapsible>
                        New
                    </IconTextButton>
                )}
            </DialogTrigger>
            <DialogContent title="Create a new playlist">
                {/* Only render the form when dialog is open, so it will reset after closing. */}
                {open ? (
                    <LoginGate>
                        <PlaylistAddForm onSuccess={() => setOpen(false)} onCancel={() => setOpen(false)} />
                    </LoginGate>
                ) : null}
            </DialogContent>
        </Dialog>
    );
}

const StyledForm = styled.form`
    position: relative;
`;

interface PlaylistAddFormProps {
    onSuccess(): void;
    onCancel(): void;
}

interface PlaylistAddFormErrors {
    name?: Array<string>;
}

function PlaylistAddForm({ onSuccess, onCancel }: PlaylistAddFormProps) {
    const [title, setTitle] = useState("");
    const [visibility, setVisibility] = useState<PlaylistVisibility>("PUBLIC");

    const isValid = title !== "";

    const [errors, setErrors] = useState<PlaylistAddFormErrors>({});

    const [mutate, { loading, error }] = useMutation(
        graphql(`
            mutation PlaylistAdd($input: CreatePlaylistInput!) {
                createPlaylist(input: $input) {
                    id
                }
            }
        `),
        {
            onCompleted: () => onSuccess(),
            onError(error) {
                if (!CombinedGraphQLErrors.is(error)) {
                    return;
                }

                if (error.extensions?.code === "VALIDATION") {
                    setErrors(error.extensions.validation as PlaylistAddFormErrors);
                }
            },
            refetchQueries: [
                // Update the profile page because it includes a list of the user's playlists
                PROFILE_PAGE,
            ],
        },
    );

    async function submit(event: FormEvent) {
        event.preventDefault();

        await mutate({
            variables: {
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
                        <Busy isBusy={loading}>Create Playlist</Busy>
                    </Button>
                </Row>
                {error ? (
                    <Text color="text-warning">
                        <strong>The playlist could not be created: </strong>
                        {error.message}
                    </Text>
                ) : null}
            </Column>
        </StyledForm>
    );
}
