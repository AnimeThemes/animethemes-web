import { forwardRef } from "react";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import styled from "styled-components";

import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";

import { Button } from "@/components/button/Button";
import { Icon } from "@/components/icon/Icon";
import theme from "@/theme";

const StyledButton = styled(Button)<{ $collapseBreakpoint: string }>`
    gap: 8px;
    
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    
    @media (max-width: ${(props) => props.$collapseBreakpoint}) {
        aspect-ratio: 1 / 1;
        padding: 8px;
    }
`;

const StyledText = styled.span<{ $collapseBreakpoint: string }>`
    @media (max-width: ${(props) => props.$collapseBreakpoint}) {
        display: none;
    }
`;

interface IconTextButtonProps extends ComponentPropsWithoutRef<typeof StyledButton> {
    icon: IconDefinition | ReactNode
    children?: ReactNode
    collapsible?: true | keyof typeof theme.breakpoints
}

export const IconTextButton = forwardRef(
    function IconTextButton({ icon, children, collapsible, ...props }: IconTextButtonProps, ref) {
        let collapseBreakpoint = "0px";

        if (collapsible === true) {
            collapseBreakpoint = theme.breakpoints.mobileMax;
        } else if (collapsible) {
            collapseBreakpoint = theme.breakpoints[collapsible];
        }

        return (
            <StyledButton ref={ref} variant="silent" $collapseBreakpoint={collapseBreakpoint} {...props}>
                {isIconDefinition(icon) ? (
                    <Icon icon={icon} color="text-disabled"/>
                ) : icon}
                {(children !== null && children !== undefined) ? (
                    <StyledText $collapseBreakpoint={collapseBreakpoint}>{children}</StyledText>
                ) : null}
            </StyledButton>
        );
    }
);

function isIconDefinition(icon: IconDefinition | ReactNode): icon is IconDefinition {
    return !!icon && typeof icon === "object" && "icon" in icon;
}
