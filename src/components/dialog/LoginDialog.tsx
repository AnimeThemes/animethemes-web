import { useState } from "react";
import type { SyntheticEvent } from "react";
import styled from "styled-components";

import { Column, Row } from "@/components/box/Flex";
import { Button } from "@/components/button/Button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/dialog/Dialog";
import { ForgotPasswordDialog } from "@/components/dialog/ForgotPasswordDialog";
import { Input } from "@/components/form/Input";
import Switch from "@/components/form/Switch";
import { SearchFilter } from "@/components/search-filter/SearchFilter";
import { Text } from "@/components/text/Text";
import { Busy } from "@/components/utils/Busy";
import useAuth, { type LoginErrors } from "@/hooks/useAuth";

const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

export function LoginDialog() {
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>Login</Button>
            </DialogTrigger>
            <DialogContent title="Login">
                {/* Only render the form when dialog is open, so it will reset after closing. */}
                {open ? <LoginForm onCancel={() => setOpen(false)} /> : null}
            </DialogContent>
        </Dialog>
    );
}

interface LoginFormProps {
    onCancel(): void;
}

function LoginForm({ onCancel }: LoginFormProps) {
    const { login } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isRemember, setRemember] = useState(false);

    const isValid = email && password;

    const [isBusy, setBusy] = useState(false);
    const [errors, setErrors] = useState<LoginErrors>({});

    function performLogin(event: SyntheticEvent) {
        event.preventDefault();

        setBusy(true);

        login({
            setErrors,
            email,
            password,
            remember: isRemember,
        }).finally(() => setBusy(false));
    }

    return (
        <>
            <StyledForm onSubmit={performLogin}>
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
                        <Text>Password</Text>
                        <Input
                            value={password}
                            onChange={setPassword}
                            inputProps={{
                                type: "password",
                                required: true,
                            }}
                        />
                        <ForgotPasswordDialog />
                    </SearchFilter>
                    <Row style={{ "--gap": "12px", "--align-items": "center" }}>
                        <Switch id="input-remember" isChecked={isRemember} onCheckedChange={setRemember} />
                        <Text as="label" htmlFor="input-remember">
                            Remember my login on this device.
                        </Text>
                    </Row>
                    <Row $wrap style={{ "--gap": "8px", "--justify-content": "flex-end" }}>
                        <Button type="button" variant="silent" onClick={onCancel}>
                            Cancel
                        </Button>
                        <Button type="submit" variant="primary" disabled={!isValid || isBusy}>
                            <Busy isBusy={isBusy}>Login</Busy>
                        </Button>
                    </Row>
                </Column>
            </StyledForm>
        </>
    );
}
