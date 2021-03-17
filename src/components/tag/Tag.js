import styled from "styled-components";
import { gapsRow } from "styles/mixins";
import { Text } from "components/text";
import { Icon } from "components/icon";

const StyledTag = styled.span`
    display: inline-flex;
    flex-direction: row;
    align-items: center;
    
    ${gapsRow("0.25rem")}
`;

export function Tag({ icon, variant, children, ...props }) {
    return (
        <StyledTag {...props}>
            {!!icon && (isIcon(icon) ? icon : <Icon icon={icon} color="text-disabled"/>)}
            {!!children && (
                <Text variant="small">
                    {children}
                </Text>
            )}
        </StyledTag>
    );
}

function isIcon(value) {
    return typeof value === "object" && "type" in value && value.type === Icon;
}
