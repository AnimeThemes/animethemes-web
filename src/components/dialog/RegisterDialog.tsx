import { useState } from "react";
import type { SyntheticEvent } from "react";
import styled, { css } from "styled-components";
import Link from "next/link";

import { Column, Row } from "@/components/box/Flex";
import { Button } from "@/components/button/Button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/dialog/Dialog";
import { Input } from "@/components/form/Input";
import Switch from "@/components/form/Switch";
import { SearchFilter } from "@/components/search-filter/SearchFilter";
import { Text } from "@/components/text/Text";
import { Busy } from "@/components/utils/Busy";
import { ErrorList } from "@/components/utils/ErrorList";
import type { RegisterInput } from "@/graphql/generated/graphql";
import useAuth, { type RegisterOptions } from "@/hooks/useAuth";
import theme from "@/theme";
import type { ValidationError } from "@/utils/errorHandling";
import { validate } from "@/utils/validation";

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

const StyledPasswordRule = styled.li<{ $fulfilled: boolean }>`
    color: ${theme.colors["text-muted"]};

    ${(props) =>
        props.$fulfilled &&
        css`
            text-decoration: line-through;
            color: ${theme.colors["text-disabled"]};
        `}
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

    const passwordRules = {
        "Password must be at least 8 characters.": password.length < 8,
        "Password must contain at least one upper- and lowercase letter.":
            !/[A-Z]/.test(password) || !/[a-z]/.test(password),
        "Password must contain at least one number.": !/[0-9]/.test(password),
        "Password must contain at least one symbol.": !/[\u0021-\u002f\u003a-\u0040\u005b-\u0060\u007b-\u007e]/.test(
            password,
        ),
    };

    const validation = validate<RegisterInput>({
        name: {
            "Username is required.": username.trim().length === 0,
            "Username must be less then 35 characters.": username.length > 35,
        },
        email: {
            "E-Mail is required.": email.trim().length === 0,
            "E-Mail must be less then 255 characters.": email.length > 255,
        },
        password: passwordRules,
        passwordConfirmation: {
            "Passwords do not match.": password !== passwordConfirmation,
        },
        terms: {
            "You must accept the terms of service.": !isTermsAccepted,
        },
    });

    const [isBusy, setBusy] = useState(false);
    const [isValidating, setValidating] = useState(false);
    const [serverErrors, setServerErrors] = useState<ValidationError<RegisterOptions> | null>(null);

    const errors = isValidating ? (serverErrors ?? (!validation.valid ? validation.errors : {})) : {};

    async function performRegister(event: SyntheticEvent) {
        event.preventDefault();

        if (isBusy) {
            return;
        }

        setValidating(false);
        if (!validation.valid) {
            setValidating(true);
            return;
        }

        setBusy(true);

        try {
            const result = await register({
                name: username,
                email,
                password,
                passwordConfirmation,
                terms: isTermsAccepted,
            });

            if (!result.ok) {
                setServerErrors(result.error);
                setValidating(true);
                return;
            }
        } finally {
            setBusy(false);
        }
    }

    return (
        <>
            <StyledForm onSubmit={performRegister} noValidate>
                <Column style={{ "--gap": "24px" }}>
                    <SearchFilter>
                        <Text>Username</Text>
                        <Input value={username} onChange={setUsername} />
                        <ErrorList errors={errors.name} />
                    </SearchFilter>
                    <SearchFilter>
                        <Text>E-Mail</Text>
                        <Input
                            value={email}
                            onChange={setEmail}
                            inputProps={{
                                type: "email",
                            }}
                        />
                        <ErrorList errors={errors.email} />
                    </SearchFilter>
                    <SearchFilter>
                        <Text>Password</Text>
                        <Input
                            value={password}
                            onChange={setPassword}
                            inputProps={{
                                type: "password",
                            }}
                        />
                        <ErrorList errors={errors.password} />
                        {!isValidating ? (
                            <ul>
                                {Object.entries(passwordRules).map(([error, failing]) => (
                                    <StyledPasswordRule key={error} $fulfilled={!failing}>
                                        {error}
                                    </StyledPasswordRule>
                                ))}
                            </ul>
                        ) : null}
                    </SearchFilter>
                    <SearchFilter>
                        <Text>Confirm Password</Text>
                        <Input
                            value={passwordConfirmation}
                            onChange={setPasswordConfirmation}
                            inputProps={{
                                type: "password",
                            }}
                        />
                        <ErrorList errors={errors.passwordConfirmation} />
                    </SearchFilter>
                    <SearchFilter>
                        <Row style={{ "--gap": "12px", "--align-items": "center" }}>
                            <Switch id="input-terms" isChecked={isTermsAccepted} onCheckedChange={setTermsAccepted} />
                            <Text as="label" htmlFor="input-terms">
                                I accept the{" "}
                                <Text as={Link} href="/about/terms-of-service" link target="_blank">
                                    Terms of Service
                                </Text>{" "}
                                and{" "}
                                <Text as={Link} href="/about/privacy-policy" link target="_blank">
                                    Privacy Policy
                                </Text>
                                .
                            </Text>
                        </Row>
                        <ErrorList errors={errors.terms} />
                    </SearchFilter>
                    <Row $wrap style={{ "--gap": "8px", "--justify-content": "flex-end" }}>
                        <Button type="button" variant="silent" onClick={onCancel}>
                            Cancel
                        </Button>
                        <Button type="submit" variant="primary" disabled={isBusy}>
                            <Busy isBusy={isBusy}>Create Account</Busy>
                        </Button>
                    </Row>
                </Column>
            </StyledForm>
        </>
    );
}
