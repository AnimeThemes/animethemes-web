import type { RefObject } from "react";
import styled from "styled-components";

import type { DropdownMenuContentProps } from "@radix-ui/react-dropdown-menu";
import * as RadixMenu from "@radix-ui/react-dropdown-menu";

import { flipDown } from "@/styles/animations";
import theme from "@/theme";

const StyledMenuContent = styled(RadixMenu.Content)`
    width: max-content;
    max-height: var(--radix-dropdown-menu-content-available-height);
    padding: 8px 0;
    border-radius: 8px;
    overflow: auto;

    background-color: ${theme.colors["solid"]};
    box-shadow:
        0 0 0 2px ${theme.colors["text-primary"]},
        ${theme.shadows.high};

    transform-origin: top;
    animation: ${flipDown} 200ms ease-out;
`;

export const Menu = RadixMenu.Root;
export const MenuTrigger = RadixMenu.Trigger;

interface MenuContentProps extends DropdownMenuContentProps {
    ref?: RefObject<HTMLDivElement>;
}

export function MenuContent({ ref, children, ...props }: MenuContentProps) {
    return (
        <RadixMenu.Portal>
            <StyledMenuContent
                align="start"
                sideOffset={8}
                collisionPadding={8}
                collisionBoundary={typeof document !== "undefined" ? document.body : []}
                {...props}
                ref={ref}
            >
                {children}
            </StyledMenuContent>
        </RadixMenu.Portal>
    );
}

export const MenuItem = styled(RadixMenu.Item)`
    display: flex;
    align-items: center;
    gap: 8px;

    width: 100%;
    padding: 8px 16px;
    cursor: pointer;
    color: ${theme.colors["text-muted"]};

    &[data-highlighted] {
        background-color: ${theme.colors["solid-on-card"]};
        color: ${theme.colors["text"]};
        outline: none;
    }

    &[data-disabled] {
        opacity: 0.5;
        cursor: revert;
    }
`;

export const MenuLabel = styled(RadixMenu.Label)`
    display: flex;
    align-items: center;
    gap: 8px;

    width: 100%;
    padding: 8px 16px;
    color: ${theme.colors["text-muted"]};
    font-size: 0.8rem;
`;

export const MenuSeparator = styled(RadixMenu.Separator)`
    height: 2px;
    background-color: ${theme.colors["text-primary"]};
    margin: 8px 0;
`;
