import useAuth from "hooks/useAuth";
import type { ReactNode } from "react";
import { Text } from "components/text";
import { Column, Row } from "components/box";
import { LoginDialog } from "components/dialog/LoginDialog";
import { RegisterDialog } from "components/dialog/RegisterDialog";

interface LoginGateProps {
    children: ReactNode;
}

export function LoginGate({ children }: LoginGateProps) {
    const { me } = useAuth();

    if (me.user) {
        // User is already logged in, so we can safely show the content.
        return (
            <>
                {children}
            </>
        );
    }

    return (
        <Column style={{ "--gap": "16px" }}>
            <Text>You need to log in to continue:</Text>
            <Row style={{ "--gap": "16px" }}>
                <LoginDialog />
                <RegisterDialog />
            </Row>
        </Column>
    );
}
