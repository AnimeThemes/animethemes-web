import styled, { css, keyframes } from "styled-components";
import { Menu as HeadlessMenu } from "@headlessui/react";
import { Button } from "components/button";
import theme from "theme";
import { withHover } from "styles/mixins";
import { Icon } from "components/icon";
import { faEllipsisV, faPlus } from "@fortawesome/free-solid-svg-icons";
import { Text } from "components/text";
import { Flex } from "components/box";

const animationFlipDown = keyframes`
    from {
        opacity: 0;
        transform: perspective(1000px) rotateX(-45deg);
    }
    to {
        opacity: 1;
        transform: perspective(1000px) rotateX(0deg);
    }
`;
const animationFadeIn = keyframes`
    from {
        opacity: 0;
    }
`;
const animationSlideIn = keyframes`
    from {
        transform: translateY(100%);
    }
`;

const StyledMenu = styled(HeadlessMenu).attrs({ forwardedAs: "div" })`
    position: relative;
`;
const StyledMenuItems = styled(HeadlessMenu.Items)`
    position: absolute;
    right: 0;
    z-index: ${theme.zIndices.menuPopover};

    width: max-content;
    margin-top: 0.5rem;
    padding: 0.5rem 0;
    border-radius: 1rem;
    overflow: hidden;

    background-color: ${theme.colors["solid-on-card"]};
    box-shadow: ${theme.shadows.high};

    transform-origin: top;
    animation: ${animationFlipDown} 200ms ease-out;

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
        animation: ${animationSlideIn} 200ms both;
    }
`;
const StyledMenuItem = styled(HeadlessMenu.Item).attrs({ forwardedAs: "div" })`
    color: ${theme.colors["text-muted"]};
    
    ${withHover(css`
        background-color: ${theme.colors["solid-on-card"]};
        color: ${theme.colors["text"]};
    `)}
    
    & > * {
        width: 100%;
        padding: 0.5rem 1rem;
        cursor: pointer;
    }
`;
const StyledMenuOverlay = styled.div`
    display: none;
    
    @media (max-width: 720px) {
        display: block;
        position: fixed;
        inset: 0;
        z-index: ${theme.zIndices.menuOverlay};
        background-color: rgba(0, 0, 0, 0.5);
        animation: ${animationFadeIn} 200ms both;
    }
`;

export function Menu({ children }) {
    children = [ children ].flat();
    return (
        <StyledMenu>
            {({ open }) => (
                <>
                    <Button as={HeadlessMenu.Button} variant="on-card" circle silent>
                        <Icon icon={faEllipsisV}/>
                    </Button>
                    {open && (
                        <StyledMenuOverlay/>
                    )}
                    <StyledMenuItems>
                        {children.map((item, index) => (
                            <StyledMenuItem key={index}>
                                {item}
                            </StyledMenuItem>
                        ))}
                    </StyledMenuItems>
                </>
            )}
        </StyledMenu>
    );
}
