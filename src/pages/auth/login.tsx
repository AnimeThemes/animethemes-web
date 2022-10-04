import type { SyntheticEvent } from "react";
import { useState } from "react";
import { Button } from "components/button";
import { Input } from "components/form";
import { Text } from "components/text";
import { logIn, logOut, twoFactorChallenge } from "lib/client/auth";
import { SearchFilter } from "components/search-filter";
import styled from "styled-components";
import Link from "next/link";

enum LoginStatus {
    LOGIN,
    TWO_FACTOR,
    LOGGED_IN,
}

const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

export default function LoginPage() {
    const [loginStatus, setLoginStatus] = useState<LoginStatus>(LoginStatus.LOGIN);

    if (loginStatus === LoginStatus.LOGIN) {
        return <LoginForm onLoggedIn={(isTwoFactor) => {
            setLoginStatus(isTwoFactor ? LoginStatus.TWO_FACTOR : LoginStatus.LOGGED_IN);
        }}/>;
    } else if (loginStatus === LoginStatus.TWO_FACTOR) {
        return <TwoFactorForm onTwoFactorConfirm={() => {
            setLoginStatus(LoginStatus.LOGGED_IN);
        }}/>;
    }

    return (
        <>
            <p>Logged in!</p>
            <Button as={Link} href="/auth/two-factor">Manage Two-Factor Authentification</Button>
            <Button onClick={() => logOut()}>Log Out</Button>
        </>
    );
}

type LoginFormProps = {
    onLoggedIn(isTwoFactor: boolean): void
}

function LoginForm({ onLoggedIn }: LoginFormProps) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [isLoggingIn, setLoggingIn] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    function performLogIn(event: SyntheticEvent) {
        event.preventDefault();

        if (isLoggingIn) {
            return;
        }

        setLoggingIn(true);
        setErrorMessage("");

        logIn(email, password)
            .then((json) => onLoggedIn(json.two_factor))
            .catch((err) => setErrorMessage(err.message))
            .finally(() => setLoggingIn(false));
    }

    return (
        <>
            <Text variant="h1">Login</Text>
            <StyledForm onSubmit={performLogIn}>
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
                </SearchFilter>
                <Button
                    as="input"
                    type="submit"
                    value={isLoggingIn ? "Logging in..." : "Login"}
                    disabled={isLoggingIn}
                />
            </StyledForm>
            {errorMessage ? (
                <Text color="text-warning">{errorMessage}</Text>
            ) : null}
        </>
    );
}

type TwoFactorFormProps = {
    onTwoFactorConfirm(): void
}

function TwoFactorForm({ onTwoFactorConfirm }: TwoFactorFormProps) {
    const [code, setCode] = useState("");

    function performTwoFactorAuth() {
        twoFactorChallenge(code)
            .then(() => onTwoFactorConfirm());
    }

    return (
        <>
            <Text variant="h1">Two-Factor Authentication</Text>
            <SearchFilter>
                <Text>Confirmation Code</Text>
                <Input value={code} onChange={setCode}/>
            </SearchFilter>
            <Button onClick={performTwoFactorAuth}>Authenticate</Button>
        </>
    );
}
