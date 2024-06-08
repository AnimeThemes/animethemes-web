import styled from "styled-components";

import { faExclamation } from "@fortawesome/pro-solid-svg-icons";

import { Row } from "@/components/box/Flex";
import { Card } from "@/components/card/Card";
import { Icon } from "@/components/icon/Icon";
import { Text } from "@/components/text/Text";
import theme from "@/theme";

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
    error: unknown;
}

export function ErrorCard({ error }: ErrorCardProps) {
    return (
        <StyledCard color="text-warning">
            <Row style={{ "--gap": "1rem" }}>
                <Text color="text-warning">
                    <Icon icon={faExclamation} />
                </Text>
                <Text block>
                    An error occurred while searching! Help improving the site by sending us the following error
                    message:
                </Text>
            </Row>
            <pre>
                <StyledErrorMessage>{JSON.stringify(error, null, 2)}</StyledErrorMessage>
            </pre>
        </StyledCard>
    );
}
