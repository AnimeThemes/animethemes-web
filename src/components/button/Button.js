import styled, { css } from "styled-components";
import { gaps } from "utils/gaps";
import { Icon } from "components/icon";
import theme from "theme";

export const Button = styled.button.attrs(({ children, circle }) => ({
    circle: (typeof children === "object" && "type" in children && children.type === Icon) || circle
}))`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    font-size: 0.9rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1rem;
    
    background-color: ${getBackgroundColor};
    color: ${getColor};
    box-shadow: ${theme.shadows.low};

    border-radius: 999px;
    padding: ${(props) => props.circle ? "0.5rem" : "0.5rem 1rem"};
    
    &:hover {
        background-color: ${(props) => getBackgroundColor(props, true)};
        color: ${(props) => getColor(props, true)};
    }

    & > &:first-child {
        margin: -0.5rem 0.5rem -0.5rem -1rem;
        box-shadow: none;
    }
    
    ${(props) => props.circle && css`
        aspect-ratio: 1 / 1;
    `}
    
    ${(props) => props.silent && css`
        &:not(:hover) {
            box-shadow: none;
        }
    `}
    
    ${gaps}
`;

function getColor({ variant, theme }, hover = false) {
    switch (variant) {
        case "primary":
            return theme.colors["text-on-primary"];
        case "on-card":
        case "default":
        default:
            return hover ? theme.colors["text"] : theme.colors["text-muted"];
    }
}

function getBackgroundColor({ variant, silent, theme }, hover = false) {
    if (silent && !hover) {
        return "transparent";
    }

    switch (variant) {
        case "primary":
            return theme.colors["solid-primary"];
        case "on-card":
            return theme.colors["solid-on-card"];
        case "default":
        default:
            return theme.colors["solid"];
    }
}
