import styled from "styled-components";
import theme from "theme";
import { withHover } from "styles/mixins";
import { Solid } from "components/box";
import type { ComponentPropsWithoutRef, ForwardedRef, ReactNode } from "react";
import { forwardRef } from "react";

export const Button = forwardRef(ButtonWithRef);

interface ButtonProps extends ComponentPropsWithoutRef<typeof BaseButton> {
    children?: ReactNode
    variant?: "solid" | "primary" | "warning" | "silent"
    isCircle?: boolean
    disabled?: boolean
}

function ButtonWithRef({
    variant = "solid",
    isCircle = false,
    disabled = false,
    title,
    ...props
}: ButtonProps, ref: ForwardedRef<HTMLButtonElement>) {
    let Component;
    if (variant === "solid") {
        Component = SolidButton;
    } else if (variant === "primary") {
        Component = PrimaryButton;
    } else if (variant === "warning") {
        Component = WarningButton;
    } else if (variant === "silent") {
        Component = SilentButton;
    } else {
        throw new Error(`Unknown button variant "${variant}"!`);
    }

    return (
        <Component
            $isCircle={isCircle}
            disabled={disabled}
            title={title}
            aria-label={title}
            ref={ref}
            {...props}
        />
    );
}

const BaseButton = styled.button<{ $isCircle: boolean }>`
    --gap: 0;
    --focus-ring-color: ${theme.colors["text-primary"]};
    
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: ${(props) => props.disabled ? "not-allowed" : "pointer"};
    pointer-events: ${(props) => props.disabled && "none"};

    font-size: 0.9rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1rem;
    
    padding: ${(props) => props.$isCircle ? "8px" : "8px 16px"};
    border-radius: 999px;
    gap: var(--gap, 0);
    aspect-ratio: ${(props) => props.$isCircle && "1 / 1"};
    
    opacity: ${(props) => props.disabled && "0.5"};
    box-shadow: ${theme.shadows.low};
    transition: background-color 250ms;
    
    // Buttons within other buttons should have a special margin and no shadow.
    & & {
        box-shadow: none;
        margin: -8px 8px -8px -16px;
    }
    
    &:focus:focus-visible {
        box-shadow: 0 0 0 2px var(--focus-ring-color);
    }
`;

const PrimaryButton = styled(BaseButton)`
    background-color: ${theme.colors["solid-primary"]};
    color: ${theme.colors["text-on-primary"]};

    ${withHover`
        background-color: ${theme.colors["text-on-primary"]};
        color: ${theme.colors["text-primary"]};
    `}
    
    &:focus:focus-visible {
        background-color: ${theme.colors["text-on-primary"]};
        color: ${theme.colors["text-primary"]};
    }
`;

const WarningButton = styled(BaseButton)`
    --focus-ring-color: ${theme.colors["text-warning"]};
    
    background-color: ${theme.colors["solid-warning"]};
    color: ${theme.colors["text-on-warning"]};

    ${withHover`
        background-color: ${theme.colors["text-on-warning"]};
        color: ${theme.colors["text-warning"]};
    `}
    
    &:focus:focus-visible {
        background-color: ${theme.colors["text-on-warning"]};
        color: ${theme.colors["text-warning"]};
    }
`;

const SolidButton = styled(BaseButton)`
    background-color: ${theme.colors["solid"]};
    color: ${theme.colors["text-muted"]};

    ${withHover`
        color: ${theme.colors["text"]};
    `}
    
    ${Solid} & {
        background-color: ${theme.colors["solid-on-card"]};
    }
`;

const SilentButton = styled(BaseButton)`
    background-color: transparent;
    color: ${theme.colors["text-muted"]};

    ${withHover`
        background-color: ${theme.colors["solid"]};
        color: ${theme.colors["text"]};
    `}

    &:not(:hover)&:not(:focus:focus-visible) {
        box-shadow: none;
    }

    ${Solid} & {
        ${withHover`
            background-color: ${theme.colors["solid-on-card"]};
        `}
    }

    ${Solid} ${Solid} & {
        ${withHover`
            background-color: transparent;
            box-shadow: none;
        `}
    }
`;

