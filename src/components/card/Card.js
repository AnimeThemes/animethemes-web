import styled, { css } from "styled-components";
import { Solid } from "components/box";
import theme from "theme";
import { withHover } from "styles/mixins";

export const Card = styled(Solid)`
    display: block;
    
    padding: 16px 24px;
    border-color: ${(props) => theme.colors[props.color] || props.color || theme.colors["text-primary"]};
    border-left-width: 4px;
    border-left-style: solid;
    border-radius: 0 8px 8px 0;

    box-shadow: ${theme.shadows.medium};

    ${(props) => props.hoverable && css`
        cursor: pointer;

        ${withHover(css`
            background-color: ${theme.colors["solid-on-card"]};
        `)}
    `}
`;
