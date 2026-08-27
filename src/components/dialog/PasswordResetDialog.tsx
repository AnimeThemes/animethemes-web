import { useState } from "react";
import type { SyntheticEvent } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";

import { Column, Row } from "@/components/box/Flex";
import { Button } from "@/components/button/Button";
import { Dialog, DialogContent } from "@/components/dialog/Dialog";
import { Input } from "@/components/form/Input";
import { SearchFilter } from "@/components/search-filter/SearchFilter";
import { Text } from "@/components/text/Text";
import { Toast } from "@/components/toast/Toast";
import { Busy } from "@/components/utils/Busy";
import { useToasts } from "@/context/toastContext";
import useAuth, { type ResetPasswordOptions } from "@/hooks/useAuth";
import type { ValidationError } from "@/utils/errorHandling";

export function PasswordResetDialog() {
    const router = useRouter();

    return (
        <Dialog open>
            <DialogContent title="Reset Password">
                <PasswordResetForm onSuccess={() => router.push("/profile")} onCancel={() => router.push("/")} />
            </DialogContent>
        </Dialog>
    );
}

const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

interface PasswordResetFormProps {
    onSuccess(): void;
    onCancel(): void;
}

function PasswordResetForm({ onSuccess, onCancel }: PasswordResetFormProps) {
    const { resetPassword } = useAuth();
    const { dispatchToast } = useToasts();
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [newPasswordConfirmation, setNewPasswordConfirmation] = useState("");
    const token = router.query.token;

    const isValid = email && newPassword && newPasswordConfirmation;

    const [isBusy, setBusy] = useState(false);
    const [errors, setErrors] = useState<ValidationError<ResetPasswordOptions>>({});

    async function performResetPassword(event: SyntheticEvent) {
        event.preventDefault();

        setBusy(true);
        setErrors({});

        try {
            const result = await resetPassword({
                email,
                password: newPassword,
                passwordConfirmation: newPasswordConfirmation,
                token: (Array.isArray(token) ? token[0] : token) ?? "",
            });

            if (!result.ok) {
                setErrors(result.error);
                return;
            }

            dispatchToast("password-reset", <Toast>Password reset successfully.</Toast>);

            onSuccess();
        } finally {
            setBusy(false);
        }
    }

    return (
        <>
            <StyledForm onSubmit={performResetPassword}>
                <Column style={{ "--gap": "24px" }}>
                    <SearchFilter>
                        <Text>E-Mail</Text>
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
                        {errors.password
                            ? errors.password.map((error) => (
                                  <Text key={error} color="text-warning">
                                      {error}
                                  </Text>
                              ))
                            : null}
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
                        <Button type="button" variant="silent" onClick={onCancel}>
                            Cancel
                        </Button>
                        <Button type="submit" variant="primary" disabled={!isValid || isBusy}>
                            <Busy isBusy={isBusy}>Reset Password</Busy>
                        </Button>
                    </Row>
                </Column>
            </StyledForm>
        </>
    );
}
