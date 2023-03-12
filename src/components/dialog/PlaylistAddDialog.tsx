import { Dialog, DialogContent, DialogTrigger } from "components/dialog/Dialog";
import { Button, IconTextButton } from "components/button";
import { faPlus } from "@fortawesome/pro-solid-svg-icons";
import { Column, Row } from "components/box";
import { Text } from "components/text";
import { SearchFilter } from "components/search-filter";
import { Input } from "components/form";
import type { FormEvent } from "react";
import { useState } from "react";
import { Listbox2, Listbox2Option } from "components/listbox/Listbox2";
import axios from "lib/client/axios";
import styled from "styled-components";
import { LoginGate } from "components/auth/LoginGate";
import { mutate } from "swr";
import { Busy } from "components/utils/Busy";

export function PlaylistAddDialog() {
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <IconTextButton icon={faPlus} collapsible>New</IconTextButton>
            </DialogTrigger>
            <DialogContent title="Create a new playlist">
                {/* Only render the form when dialog is open, so it will reset after closing. */}
                {open ? (
                    <LoginGate>
                        <PlaylistAddForm
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

interface PlaylistAddFormProps {
    onSuccess(): void;
    onCancel(): void;
}

function PlaylistAddForm({ onSuccess, onCancel }: PlaylistAddFormProps) {
    const [title, setTitle] = useState("");
    const [visibility, setVisibility] = useState("PUBLIC");

    const isValid = title !== "";

    const [isBusy, setBusy] = useState(false);

    async function submit(event: FormEvent) {
        event.preventDefault();

        setBusy(true);

        try {
            await axios.post("/api/playlist", {
                name: title,
                visibility,
            });
            await mutate((key) => [key].flat().includes("/api/me/playlist"));
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
                    <Input
                        value={title}
                        onChange={setTitle}
                    />
                </SearchFilter>
                <SearchFilter>
                    <Text>Visibility</Text>
                    <Listbox2 value={visibility} onValueChange={setVisibility}>
                        <Listbox2Option value="PUBLIC">Public</Listbox2Option>
                        <Listbox2Option value="UNLISTED">Unlisted</Listbox2Option>
                        <Listbox2Option value="PRIVATE">Private</Listbox2Option>
                    </Listbox2>
                </SearchFilter>
                <Row $wrap style={{ "--gap": "8px", "--justify-content": "flex-end" }}>
                    <Button type="button" variant="silent" onClick={onCancel}>Cancel</Button>
                    <Button type="submit" variant="primary" disabled={!isValid || isBusy}>
                        <Busy isBusy={isBusy}>Create Playlist</Busy>
                    </Button>
                </Row>
            </Column>
        </StyledForm>
    );
}
