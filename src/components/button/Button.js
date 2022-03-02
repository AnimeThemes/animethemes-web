import styled, { css } from "styled-components";
import theme from "theme";
import { withHover } from "styles/mixins";
import { Solid } from "components/box";
import { forwardRef } from "react";

export const Button = forwardRef(ButtonWithRef);

function ButtonWithRef({
    children,
    variant = "solid",
    isCircle = false,
    disabled = false,
    title,
    ...props
}, ref) {
    let Component;
    if (variant === "solid") {
        Component = SolidButton;
    } else if (variant === "primary") {
        Component = PrimaryButton;
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
        >{children}</Component>
    );
}

const BaseButton = styled.button`
    --gap: 0;
    
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: ${(props) => props.disabled ? "not-allowed" : "pointer"};

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
`;

const PrimaryButton = styled(BaseButton)`
    background-color: ${theme.colors["solid-primary"]};
    color: ${theme.colors["text-on-primary"]};
`;

const SolidButton = styled(BaseButton)`
    background-color: ${theme.colors["solid"]};
    color: ${theme.colors["text-muted"]};

    ${withHover(css`
        color: ${theme.colors["text"]};
    `)}
    
    ${Solid} & {
        background-color: ${theme.colors["solid-on-card"]};
    }
`;

const SilentButton = styled(BaseButton)`
    background-color: transparent;
    color: ${theme.colors["text-muted"]};

    ${withHover(css`
        background-color: ${theme.colors["solid"]};
        color: ${theme.colors["text"]};
    `)}

    &:not(:hover) {
        box-shadow: none;
    }

    ${Solid} & {
        ${withHover(css`
            background-color: ${theme.colors["solid-on-card"]};
        `)}
    }
`;

