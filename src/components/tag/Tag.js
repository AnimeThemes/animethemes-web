import styled, { css } from "styled-components";
import { Text } from "components/text";
import { Icon } from "components/icon";
import theme from "theme";

const StyledTag = styled.span`
    display: flex;
    flex-direction: row;
    align-items: baseline;
    gap: 4px;
    
    & ${Icon} {
        transform: translateY(0.2rem);
    }
`;

const StyledText = styled(Text)`    
    ${(props) => props.hideTextOnMobile && css`
        @media (max-width: ${theme.breakpoints.mobileMax}) {
            display: none;
        }
    `}
`;

export function Tag({ icon, variant, children, hideTextOnMobile = false, ...props }) {
    return (
        <StyledTag {...props}>
            {!!icon && (isIcon(icon) ? icon : <Icon icon={icon} color="text-disabled"/>)}
            {!!children && (
                <StyledText variant="small" hideTextOnMobile={hideTextOnMobile}>
                    {children}
                </StyledText>
            )}
        </StyledTag>
    );
}

function isIcon(value) {
    return typeof value === "object" && "type" in value && value.type === Icon;
}
