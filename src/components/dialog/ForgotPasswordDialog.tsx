import { useState } from "react";
import type { SyntheticEvent } from "react";
import styled from "styled-components";

import { Column, Row } from "@/components/box/Flex";
import { Button } from "@/components/button/Button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/dialog/Dialog";
import { Input } from "@/components/form/Input";
import { SearchFilter } from "@/components/search-filter/SearchFilter";
import { Text } from "@/components/text/Text";
import { Toast } from "@/components/toast/Toast";
import { Busy } from "@/components/utils/Busy";
import { useToasts } from "@/context/toastContext";
import useAuth, { type ForgotPasswordOptions } from "@/hooks/useAuth";
import type { ValidationError } from "@/utils/errorHandling";

const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

export function ForgotPasswordDialog() {
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Text variant="small" link color="text-muted">
                    Forgot Password?
                </Text>
            </DialogTrigger>
            <DialogContent title="Request a Password Reset">
                {/* Only render the form when dialog is open, so it will reset after closing. */}
                {open ? <ForgotPasswordForm onSuccess={() => setOpen(false)} onCancel={() => setOpen(false)} /> : null}
            </DialogContent>
        </Dialog>
    );
}

interface ForgotPasswordFormProps {
    onSuccess(): void;
    onCancel(): void;
}

function ForgotPasswordForm({ onSuccess, onCancel }: ForgotPasswordFormProps) {
    const { forgotPassword } = useAuth();
    const { dispatchToast } = useToasts();

    const [email, setEmail] = useState("");

    const isValid = !!email;

    const [isBusy, setBusy] = useState(false);
    const [errors, setErrors] = useState<ValidationError<ForgotPasswordOptions>>({});

    async function performForgotPassword(event: SyntheticEvent) {
        event.preventDefault();
        event.stopPropagation();

        setBusy(true);
        setErrors({});

        try {
            const result = await forgotPassword({ email });

            if (!result.ok) {
                setErrors(result.error);
                return;
            }

            dispatchToast("forgot-password-sent", <Toast>We sent you an e-mail with a password reset link.</Toast>);

            onSuccess();
        } finally {
            setBusy(false);
        }
    }

    return (
        <>
            <StyledForm onSubmit={performForgotPassword}>
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
                    <Row $wrap style={{ "--gap": "8px", "--justify-content": "flex-end" }}>
                        <Button type="button" variant="silent" onClick={onCancel}>
                            Cancel
                        </Button>
                        <Button type="submit" variant="primary" disabled={!isValid || isBusy}>
                            <Busy isBusy={isBusy}>Submit</Busy>
                        </Button>
                    </Row>
                </Column>
            </StyledForm>
        </>
    );
}
