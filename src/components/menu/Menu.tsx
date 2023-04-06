import styled from "styled-components";
import theme from "theme";
import { flipDown } from "styles/animations";
import { forwardRef } from "react";
import type { DropdownMenuContentProps } from "@radix-ui/react-dropdown-menu";
import * as RadixMenu from "@radix-ui/react-dropdown-menu";

const StyledMenuContent = styled(RadixMenu.Content)`
    z-index: ${theme.zIndices.menuPopover};

    width: max-content;
    padding: 8px 0;
    border-radius: 8px;
    overflow: hidden;

    background-color: ${theme.colors["solid"]};
    box-shadow: 0 0 0 2px ${theme.colors["text-primary"]}, ${theme.shadows.high};

    transform-origin: top;
    animation: ${flipDown} 200ms ease-out;
`;

export const Menu = RadixMenu.Root;
export const MenuTrigger = RadixMenu.Trigger;

export const MenuContent = forwardRef<HTMLDivElement, DropdownMenuContentProps>(
    function MenuContent({ children, ...props }, forwardedRef) {
        return (
            <RadixMenu.Portal>
                <StyledMenuContent align="start" sideOffset={8} collisionPadding={8} {...props} ref={forwardedRef}>
                    {children}
                </StyledMenuContent>
            </RadixMenu.Portal>
        );
    }
);

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
`;
