import styled, { css } from "styled-components";
import theme from "theme";
import type { Property } from "csstype";
import type { Colors } from "theme/colors";
import type { ReactElement } from "react";

interface TextProps {
    variant?: "h1" | "h2" | "h3" | "small" | "code";
    link?: boolean
    maxLines?: number
    noWrap?: boolean | "ellipsis"
    block?: boolean
    italics?: boolean
    weight?: Property.FontWeight
    color?: keyof Colors
    as?: string | ReactElement
    wrapAnywhere?: boolean
}

export const Text = styled.span.attrs(getAttributes)<TextProps>`    
    // Reset margin for elements like <p>
    margin: 0;
    scroll-margin-top: 4rem;

    ${(props) => props.variant === "h1" && css`
        font-size: 2rem;
        font-weight: 700;
        color: ${theme.colors["text"]};
    `}

    ${(props) => props.variant === "h2" && css`
        font-size: 0.9rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 1px;
        color: ${theme.colors["text-muted"]};
    `}

    ${(props) => props.variant === "h3" && css`
        font-size: 0.9rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 1px;
        color: ${theme.colors["text-disabled"]};
    `}

    ${(props) => props.variant === "small" && css`
        font-size: 0.8rem;
        font-weight: 700;
    `}

    ${(props) => props.variant === "code" && css`
        font-family: monospace;
        line-height: 1.5;
        padding: 0.25rem 0.5rem;
        border-radius: 0.25rem;
        background-color: ${theme.colors["solid"]};
        box-shadow: ${theme.shadows.low};
        box-decoration-break: clone;
    `}

    ${(props) => props.link && css`
        cursor: pointer;
        color: ${theme.colors["text-primary"]};
        font-weight: 600;
        
        &:hover {
            text-decoration: underline;
        }
    `}

    ${(props) => props.maxLines && css`
        display: -webkit-box;
        -webkit-line-clamp: ${props.maxLines};
        -webkit-box-orient: vertical;
        overflow: hidden;
    `}

    ${(props) => props.noWrap && css<TextProps>`
        white-space: nowrap;
        
        ${(props) => props.noWrap === "ellipsis" && css`
            overflow: hidden;
            text-overflow: ellipsis;
        `}
    `}

    // Apply these styles last, so that props can override variant styles.
    display: ${(props) => props.block && "block"};
    
    font-style: ${(props) => props.italics && "italic"};
    font-weight: ${(props) => props.weight};
    color: ${(props) => props.color && theme.colors[props.color]};
    overflow-wrap: ${(props) => props.wrapAnywhere && "anywhere"};
`;

function getAttributes(props: TextProps) {
    if (props.as) {
        return props.as;
    }

    return {
        as: getAs(props.variant)
    };
}

function getAs(variant: TextProps["variant"]) {
    switch (variant) {
        case "h1":
            return "h1";
        case "h2":
            return "h2";
        case "h3":
            return "h3";
        case "small":
            return "small";
        case "code":
            return "code";
        default:
            return "span";
    }
}
