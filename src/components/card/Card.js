import styled, { css } from "styled-components";
import { Box } from "components/box";
import theme from "theme";

export const Card = styled(Box).attrs((props) => ({
    p: props.p ?? "1rem 1.5rem",
    bg: props.bg || props.backgroundColor || theme.colors["solid"],
    borderColor: props.borderColor || theme.colors["text-primary"]
}))`
    border-left-width: 4px;
    border-left-style: solid;
    border-radius: 0 0.5rem 0.5rem 0;

    box-shadow: ${theme.shadows.medium};

    ${(props) => props.hoverable && css`
        cursor: pointer;

        &:hover {
            background-color: ${theme.colors["solid-on-card"]};
        }
    `}
`;
