import { useState } from "react";
import type { SyntheticEvent } from "react";
import styled from "styled-components";

import { isAxiosError } from "axios";
import { mutate } from "swr";

import { Column, Row } from "@/components/box/Flex";
import { Button } from "@/components/button/Button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/dialog/Dialog";
import { Input } from "@/components/form/Input";
import { SearchFilter } from "@/components/search-filter/SearchFilter";
import { Text } from "@/components/text/Text";
import { Toast } from "@/components/toast/Toast";
import { Busy } from "@/components/utils/Busy";
import { useToasts } from "@/context/toastContext";
import useAuth from "@/hooks/useAuth";
import axios from "@/lib/client/axios";
import { AUTH_PATH } from "@/utils/config";

export function UserInformationDialog() {
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>Change User Information</Button>
            </DialogTrigger>
            <DialogContent title="Change User Information">
                {/* Only render the form when dialog is open, so it will reset after closing. */}
                {open ? <UserInformationForm onSuccess={() => setOpen(false)} onCancel={() => setOpen(false)} /> : null}
            </DialogContent>
        </Dialog>
    );
}

const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

interface UserInformationFormProps {
    onSuccess(): void;
    onCancel(): void;
}

function UserInformationForm({ onSuccess, onCancel }: UserInformationFormProps) {
    const { me } = useAuth();
    const { dispatchToast } = useToasts();

    const [username, setUsername] = useState(me.user?.name ?? "");
    const [email, setEmail] = useState(me.user?.email ?? "");

    const isValid = username && email;

    const [isBusy, setBusy] = useState(false);
    const [errors, setErrors] = useState<{
        name?: string[];
        email?: string[];
    }>({});

    async function performChangeUserInformation(event: SyntheticEvent) {
        event.preventDefault();

        setBusy(true);
        setErrors({});

        try {
            await axios.put(`${AUTH_PATH}/user/profile-information`, {
                name: username,
                email: email,
            });
            await mutate((key) => [key].flat().some((key) => key === "/api/me"));

            dispatchToast("email-change", <Toast>User information changed successfully.</Toast>);

            onSuccess();
        } catch (error) {
            if (!isAxiosError(error) || !error.response || error.response.status !== 422) {
                throw error;
            }

            setErrors(error.response.data.errors);
        } finally {
            setBusy(false);
        }
    }

    return (
        <>
            <StyledForm onSubmit={performChangeUserInformation}>
                <Column style={{ "--gap": "24px" }}>
                    <SearchFilter>
                        <Text>Username</Text>
                        <Input
                            value={username}
                            onChange={setUsername}
                            inputProps={{
                                required: true,
                            }}
                        />
                        {errors.name
                            ? errors.name.map((error) => (
                                  <Text key={error} color="text-warning">
                                      {error}
                                  </Text>
                              ))
                            : null}
                    </SearchFilter>
                    <SearchFilter>
                        <Text>E-Mail Address</Text>
                        <Input
                            value={email}
                            onChange={setEmail}
                            inputProps={{
                                type: "email",
                                required: true,
                            }}
                        />
                        {errors.email
                            ? errors.email.map((error) => (
                                  <Text key={error} color="text-warning">
                                      {error}
                                  </Text>
                              ))
                            : null}
                    </SearchFilter>
                    <Row $wrap style={{ "--gap": "8px", "--justify-content": "flex-end" }}>
                        <Button type="button" variant="silent" onClick={onCancel}>
                            Cancel
                        </Button>
                        <Button type="submit" variant="primary" disabled={!isValid || isBusy}>
                            <Busy isBusy={isBusy}>Update</Busy>
                        </Button>
                    </Row>
                </Column>
            </StyledForm>
        </>
    );
}
