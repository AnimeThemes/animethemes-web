import { Icon } from "components/icon";
import { Button } from "components/button";
import styled, { css } from "styled-components";
import theme from "theme";
import useMediaQuery from "hooks/useMediaQuery";

const StyledButton = styled(Button)`
    gap: 8px;
`;

const StyledText = styled.span`
    ${(props) => props.collapsible && css`
        @media (max-width: ${theme.breakpoints.mobileMax}) {
            display: none;
        }
    `}
`;

export function IconTextButton({ icon, children, collapsible, ...props }) {
    const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.mobileMax})`);
    const isCollapsed = collapsible && isMobile;

    return (
        <StyledButton variant="silent" isCircle={isCollapsed} {...props}>
            <Icon icon={icon} color="text-disabled"/>
            <StyledText collapsible={collapsible}>{children}</StyledText>
        </StyledButton>
    );
}
