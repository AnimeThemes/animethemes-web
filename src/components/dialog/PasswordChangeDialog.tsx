import type { SyntheticEvent } from "react";
import { useState } from "react";
import { Text } from "components/text";
import { SearchFilter } from "components/search-filter";
import { Input } from "components/form";
import { Button } from "components/button";
import styled from "styled-components";
import { Column, Row } from "components/box";
import { Dialog, DialogContent, DialogTrigger } from "components/dialog/Dialog";
import { Busy } from "components/utils/Busy";
import axios from "lib/client/axios";
import { isAxiosError } from "axios";
import { useToasts } from "context/toastContext";
import { Toast } from "components/toast";
import { AUTH_PATH } from "utils/config.mjs";

export function PasswordChangeDialog() {
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>Change Password</Button>
            </DialogTrigger>
            <DialogContent title="Change Password">
                {/* Only render the form when dialog is open, so it will reset after closing. */}
                {open ? (
                    <PasswordChangeForm
                        onSuccess={() => setOpen(false)}
                        onCancel={() => setOpen(false)}
                    />
                ) : null}
            </DialogContent>
        </Dialog>
    );
}

const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

interface PasswordChangeFormProps {
    onSuccess(): void;
    onCancel(): void;
}

function PasswordChangeForm({ onSuccess, onCancel }: PasswordChangeFormProps) {
    const { dispatchToast } = useToasts();

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [newPasswordConfirmation, setNewPasswordConfirmation] = useState("");

    const isValid = currentPassword && newPassword && newPasswordConfirmation;

    const [isBusy, setBusy] = useState(false);
    const [errors, setErrors] = useState<{
        current_password?: string[];
        password?: string[];
    }>({});

    async function performChangePassword(event: SyntheticEvent) {
        event.preventDefault();

        setBusy(true);
        setErrors({});

        try {
            await axios.put(
                `${AUTH_PATH}/user/password`,
                {
                    current_password: currentPassword,
                    password: newPassword,
                    password_confirmation: newPasswordConfirmation,
                }
            );

            dispatchToast(
                "password-change",
                <Toast>Password changed successfully.</Toast>
            );

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
            <StyledForm onSubmit={performChangePassword}>
                <Column style={{ "--gap": "24px" }}>
                    <SearchFilter>
                        <Text>Current Password</Text>
                        <Input
                            value={currentPassword}
                            onChange={setCurrentPassword}
                            inputProps={{
                                type: "password",
                                required: true,
                            }}
                        />
                        {errors.current_password ? errors.current_password.map((error) => (
                            <Text key={error} color="text-warning">{error}</Text>
                        )) : null}
                    </SearchFilter>
                    <SearchFilter>
                        <Text>New Password</Text>
                        <Input
                            value={newPassword}
                            onChange={setNewPassword}
                            inputProps={{
                                type: "password",
                                required: true,
                            }}
                        />
                        {errors.password ? errors.password.map((error) => (
                            <Text key={error} color="text-warning">{error}</Text>
                        )) : null}
                    </SearchFilter>
                    <SearchFilter>
                        <Text>Confirm New Password</Text>
                        <Input
                            value={newPasswordConfirmation}
                            onChange={setNewPasswordConfirmation}
                            inputProps={{
                                type: "password",
                                required: true,
                            }}
                        />
                    </SearchFilter>
                    <Row $wrap style={{ "--gap": "8px", "--justify-content": "flex-end" }}>
                        <Button type="button" variant="silent" onClick={onCancel}>Cancel</Button>
                        <Button type="submit" variant="primary" disabled={!isValid || isBusy}>
                            <Busy isBusy={isBusy}>Change Password</Busy>
                        </Button>
                    </Row>
                </Column>
            </StyledForm>
        </>
    );
}
