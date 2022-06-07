import styled, { css } from "styled-components";
import { Solid } from "components/box";
import theme from "theme";
import { withHover } from "styles/mixins";

export const Card = styled(Solid)`
    display: block;
    position: relative;
    
    padding: 16px 24px 16px 28px;
    border-radius: ${theme.scalars.borderRadiusCard};
    overflow: hidden;

    box-shadow: ${theme.shadows.medium};

    ${(props) => props.hoverable && css`
        cursor: pointer;

        ${withHover(css`
            background-color: ${theme.colors["solid-on-card"]};
        `)}
    `}
    
    &:before {
        content: " ";
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        width: 4px;
        height: 100%;
        background-color: ${(props) => theme.colors[props.color] || props.color || theme.colors["text-primary"]};
    }
`;
