import { Button } from "components/button";
import {
    confirmPassword,
    twoFactorConfirm,
    twoFactorEnable,
    twoFactorQrCode,
    twoFactorSecretKey
} from "lib/client/auth";
import type { SyntheticEvent } from "react";
import { useState } from "react";
import { Input } from "components/form";
import { Text } from "components/text";
import styled from "styled-components";

const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

export default function TwoFactorPage() {
    const [passwordRequired, setPasswordRequired] = useState(false);
    const [password, setPassword] = useState("");
    const [qrCode, setQrCode] = useState("");
    const [secretKey, setSecretKey] = useState("");
    const [code, setCode] = useState("");

    async function performTwoFactorEnable() {
        const { passwordRequired } = await twoFactorEnable();

        if (passwordRequired) {
            setPasswordRequired(true);
            return;
        }

        const { svg } = await twoFactorQrCode();

        setQrCode(svg);

        const { secretKey } = await twoFactorSecretKey();

        setSecretKey(secretKey);
    }

    async function performConfirmPassword(event: SyntheticEvent) {
        event.preventDefault();

        await confirmPassword(password);

        await performTwoFactorEnable();
    }

    async function performConfirmCode(event: SyntheticEvent) {
        event.preventDefault();

        await twoFactorConfirm(code);
    }

    return (
        <>
            <Text variant="h1">Two-Factor Authentification</Text>
            <Button onClick={performTwoFactorEnable}>Enable Two-Factor Authentification</Button>
            {passwordRequired ? (
                <StyledForm onSubmit={performConfirmPassword}>
                    <Input value={password} onChange={setPassword}/>
                    <Button
                        as="input"
                        type="submit"
                        value="Confirm"
                    />
                </StyledForm>
            ) : null}
            {qrCode ? (
                <div dangerouslySetInnerHTML={{ __html: qrCode }}/>
            ) : null}
            {secretKey ? (
                <Text variant="code">{secretKey}</Text>
            ) : null}
            {(qrCode && secretKey) ? (
                <StyledForm onSubmit={performConfirmCode}>
                    <Input value={code} onChange={setCode}/>
                    <Button
                        as="input"
                        type="submit"
                        value="Confirm"
                    />
                </StyledForm>
            ) : null}
        </>
    );
}
