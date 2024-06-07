import { useState } from "react";
import type { SyntheticEvent } from "react";
import styled from "styled-components";
import Link from "next/link";

import { Column, Row } from "@/components/box/Flex";
import { Button } from "@/components/button/Button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/dialog/Dialog";
import { Input } from "@/components/form/Input";
import Switch from "@/components/form/Switch";
import { SearchFilter } from "@/components/search-filter/SearchFilter";
import { Text } from "@/components/text/Text";
import { Busy } from "@/components/utils/Busy";
import useAuth, { type RegisterErrors } from "@/hooks/useAuth";

export function RegisterDialog() {
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>Create new account</Button>
            </DialogTrigger>
            <DialogContent title="Create a new account">
                {/* Only render the form when dialog is open, so it will reset after closing. */}
                {open ? <RegisterForm onCancel={() => setOpen(false)} /> : null}
            </DialogContent>
        </Dialog>
    );
}

const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

interface RegisterFormProps {
    onCancel(): void;
}

function RegisterForm({ onCancel }: RegisterFormProps) {
    const { register } = useAuth();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [isTermsAccepted, setTermsAccepted] = useState(false);

    const isValid = username && email && password && passwordConfirmation && isTermsAccepted;

    const [isBusy, setBusy] = useState(false);
    const [errors, setErrors] = useState<RegisterErrors>({});

    function performRegister(event: SyntheticEvent) {
        event.preventDefault();

        setBusy(true);

        register({
            setErrors,
            name: username,
            email,
            password,
            password_confirmation: passwordConfirmation,
            terms: isTermsAccepted,
        }).finally(() => setBusy(false));
    }

    return (
        <>
            <StyledForm onSubmit={performRegister}>
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
                        {errors.password
                            ? errors.password.map((error) => (
                                  <Text key={error} color="text-warning">
                                      {error}
                                  </Text>
                              ))
                            : null}
                    </SearchFilter>
                    <SearchFilter>
                        <Text>Confirm Password</Text>
                        <Input
                            value={passwordConfirmation}
                            onChange={setPasswordConfirmation}
                            inputProps={{
                                type: "password",
                                required: true,
                            }}
                        />
                    </SearchFilter>
                    <Row style={{ "--gap": "12px", "--align-items": "center" }}>
                        <Switch id="input-terms" isChecked={isTermsAccepted} onCheckedChange={setTermsAccepted} />
                        <Text as="label" htmlFor="input-terms">
                            I accept the{" "}
                            <Text as={Link} href="/about/terms-of-service" link>
                                Terms of Service
                            </Text>{" "}
                            and{" "}
                            <Text as={Link} href="/about/privacy-policy" link>
                                Privacy Policy
                            </Text>
                            .
                        </Text>
                    </Row>
                    <Row $wrap style={{ "--gap": "8px", "--justify-content": "flex-end" }}>
                        <Button type="button" variant="silent" onClick={onCancel}>
                            Cancel
                        </Button>
                        <Button type="submit" variant="primary" disabled={!isValid || isBusy}>
                            <Busy isBusy={isBusy}>Create Account</Busy>
                        </Button>
                    </Row>
                </Column>
            </StyledForm>
        </>
    );
}
