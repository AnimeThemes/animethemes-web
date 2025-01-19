import type { HTMLAttributes, ReactNode } from "react";
import styled from "styled-components";

import { Text } from "@/components/text/Text";
import theme from "@/theme";

const StyledTag = styled.span`
    display: flex;
    padding: 2px 4px;
    border-radius: 4px;

    background-color: ${theme.colors["text-disabled"]};
    color: ${theme.colors["solid-on-card"]};
`;

const StyledText = styled(Text)`
    font-size: 0.7rem;
    font-weight: 900;
    line-height: 1;
    text-transform: uppercase;
`;

interface BorderTagProps extends HTMLAttributes<HTMLSpanElement> {
    children: ReactNode;
}

export function BorderTag({ children, ...props }: BorderTagProps) {
    return (
        <StyledTag {...props}>
            <StyledText variant="small">{children}</StyledText>
        </StyledTag>
    );
}
