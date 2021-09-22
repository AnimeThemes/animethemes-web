import styled, { css } from "styled-components";
import { Text } from "components/text";
import { Icon } from "components/icon";

const StyledTag = styled.span`
    display: flex;
    flex-direction: row;
    align-items: center;
`;
const StyledText = styled(Text)`
    &:not(:first-child) {
        margin-left: 0.25rem;
    }
    
    ${(props) => props.hideTextOnMobile && css`
        @media (max-width: 720px) {
            display: none;
            
            &:not(:first-child) {
                margin-left: 0;
            }
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
