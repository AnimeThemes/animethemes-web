import { Card } from "components/card";
import { Row } from "components/box";
import { Text } from "components/text";
import { faExclamation } from "@fortawesome/pro-solid-svg-icons";
import styled from "styled-components";
import theme from "theme";
import { Icon } from "components/icon";

const StyledCard = styled(Card)`
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

const StyledErrorMessage = styled(Text).attrs({ variant: "code" })`
    display: block;
    background-color: ${theme.colors["solid-on-card"]};
    overflow: auto;
`;

interface ErrorCardProps {
    error: any
}

export function ErrorCard({ error }: ErrorCardProps) {
    return (
        <StyledCard color="text-warning">
            <Row style={{ "--gap": "1rem" }}>
                <Text color="text-warning">
                    <Icon icon={faExclamation}/>
                </Text>
                <Text block>An error occurred while searching! Help improving the site by sending us the following error message:</Text>
            </Row>
            <pre>
                <StyledErrorMessage>
                    {JSON.stringify(error, null, 2)}
                </StyledErrorMessage>
            </pre>
        </StyledCard>
    );
}
