import { Icon } from "components/icon";
import { Button } from "components/button";
import { useMedia } from "use-media";
import styled, { css } from "styled-components";
import theme from "theme";

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
    const isMobile = useMedia({ maxWidth: "720px" });
    const isCollapsed = collapsible && isMobile;

    return (
        <StyledButton variant="silent" isCircle={isCollapsed} {...props}>
            <Icon icon={icon} color="text-disabled"/>
            <StyledText collapsible={collapsible}>{children}</StyledText>
        </StyledButton>
    );
}
