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
    letter-spacing: 0.05rem;
    
    ${(props) => props.hideTextOnMobile && css`
        @media (max-width: ${theme.breakpoints.mobileMax}) {
            display: none;
        }
    `}
`;

export function Tag({ icon, children, hideTextOnMobile = false, textColor, ...props }) {
    return (
        <StyledTag {...props}>
            {!!icon && (isIcon(icon) ? icon : <Icon icon={icon} color="text-disabled"/>)}
            {!!children && (
                <StyledText variant="small" hideTextOnMobile={hideTextOnMobile} color={textColor}>
                    {children}
                </StyledText>
            )}
        </StyledTag>
    );
}

function isIcon(value) {
    return typeof value === "object" && "type" in value && value.type === Icon;
}
