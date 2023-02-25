import styled, { css } from "styled-components";
import { Solid } from "components/box";
import theme from "theme";
import { withHover } from "styles/mixins";
import type { Colors } from "theme/colors";

export const Card = styled(Solid)<{
    hoverable?: boolean
    color?: keyof Colors
}>`
    display: block;
    position: relative;
    
    padding: 16px 24px 16px 28px;
    border-radius: ${theme.scalars.borderRadiusCard};
    overflow: hidden;

    box-shadow: ${theme.shadows.medium};

    ${Solid} & {
        background-color: ${theme.colors["solid-on-card"]};
    }

    ${(props) => props.hoverable && css`
        cursor: pointer;

        ${withHover`
            background-color: ${theme.colors["solid-on-card"]};
        `}
    `}
    
    &:before {
        content: " ";
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        width: 4px;
        height: 100%;
        background-color: ${(props) => props.color ? theme.colors[props.color] : theme.colors["text-primary"]};
    }
`;
