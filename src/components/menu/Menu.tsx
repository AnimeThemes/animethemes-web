import styled from "styled-components";
import { Menu as ReachMenu, MenuButton, MenuItem, MenuItems, MenuPopover, } from "@reach/menu-button";
import { Button } from "components/button";
import theme from "theme";
import { withHover } from "styles/mixins";
import { Icon } from "components/icon";
import { faEllipsisV } from "@fortawesome/pro-solid-svg-icons";
import { fadeIn, flipDown, slideIn } from "styles/animations";
import type { ComponentPropsWithoutRef, PropsWithChildren, ReactNode } from "react";

const StyledMenuItems = styled(MenuItems)`
    z-index: ${theme.zIndices.menuPopover};

    width: max-content;
    margin-top: 0.5rem;
    padding: 0.5rem 0;
    border-radius: 0.5rem;
    overflow: hidden;

    background-color: ${theme.colors["solid"]};
    box-shadow: 0 0 0 2px ${theme.colors["text-primary"]}, ${theme.shadows.high};

    transform-origin: top;
    animation: ${flipDown} 200ms ease-out;
    
    @media (max-width: 720px) {
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        width: 100%;
        border-radius: 1rem 1rem 0 0;
        z-index: ${theme.zIndices.toast};
        background-color: ${theme.colors["solid"]};
        box-shadow: ${theme.shadows.high};
        animation: ${slideIn()} 200ms both;
    }
`;
const StyledMenuItem = styled(MenuItem)`
    display: flex;
    align-items: center;
    gap: 8px;

    width: 100%;
    padding: 0.5rem 1rem;
    cursor: pointer;
    color: ${theme.colors["text-muted"]};
    
    ${withHover`
        background-color: ${theme.colors["solid-on-card"]};
        color: ${theme.colors["text"]};
    `}
`;
const StyledMenuOverlay = styled(MenuPopover)`
    @media (max-width: 720px) {
        position: fixed !important;
        inset: 0 !important;
        z-index: ${theme.zIndices.menuOverlay};
        background-color: rgba(0, 0, 0, 0.5);
        animation: ${fadeIn} 200ms both;
    }
`;

interface MenuProps extends PropsWithChildren {
    button?: (button: typeof MenuButton) => ReactNode
}

export function Menu({ button, children }: MenuProps) {
    return (
        <ReachMenu>
            {button ? button(MenuButton) : (
                <Button as={MenuButton} variant="silent" isCircle>
                    <Icon icon={faEllipsisV}/>
                </Button>
            )}
            <StyledMenuOverlay>
                <StyledMenuItems>
                    {children}
                </StyledMenuItems>
            </StyledMenuOverlay>
        </ReachMenu>
    );
}

interface MenuOptionProps extends PropsWithChildren, ComponentPropsWithoutRef<typeof StyledMenuItem> {}

Menu.Option = function MenuOption({ children, ...props }: MenuOptionProps) {
    return (
        <StyledMenuItem onSelect={() => { /* do nothing */ }} {...props}>
            {children}
        </StyledMenuItem>
    );
};
