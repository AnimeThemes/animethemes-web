import { Icon } from "components/icon";
import { Button } from "components/button";
import styled, { css } from "styled-components";
import theme from "theme";
import useMediaQuery from "hooks/useMediaQuery";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

const StyledButton = styled(Button)`
    gap: 8px;
`;

const StyledText = styled.span<{ collapsible: boolean }>`
    ${(props) => props.collapsible && css`
        @media (max-width: ${theme.breakpoints.mobileMax}) {
            display: none;
        }
    `}
`;

interface IconTextButtonProps extends ComponentPropsWithoutRef<typeof StyledButton> {
    icon: IconDefinition | ReactNode
    children?: ReactNode
    collapsible?: boolean
}

export function IconTextButton({ icon, children, collapsible = false, ...props }: IconTextButtonProps) {
    const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.mobileMax})`);
    const isCollapsed = collapsible && isMobile;

    return (
        <StyledButton variant="silent" isCircle={isCollapsed} {...props}>
            {isIconDefinition(icon) ? (
                <Icon icon={icon} color="text-disabled"/>
            ) : icon}
            {children ? (
                <StyledText collapsible={collapsible}>{children}</StyledText>
            ) : null}
        </StyledButton>
    );
}

function isIconDefinition(icon: IconDefinition | ReactNode): icon is IconDefinition {
    return !!icon && typeof icon === "object" && "icon" in icon;
}
