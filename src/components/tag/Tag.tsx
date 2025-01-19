import type { ComponentPropsWithoutRef, HTMLAttributes, ReactElement, ReactNode } from "react";
import styled, { css } from "styled-components";

import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";

import { Icon } from "@/components/icon/Icon";
import { Text } from "@/components/text/Text";
import theme from "@/theme";
import type { Colors } from "@/theme/colors";

const StyledTag = styled.span`
    display: flex;
    flex-direction: row;
    align-items: baseline;
    gap: 4px;

    & ${Icon} {
        transform: translateY(0.2em);
    }
`;

const StyledText = styled(Text)<{
    $hideTextOnMobile: boolean;
}>`
    letter-spacing: 0.05rem;

    ${(props) =>
        props.$hideTextOnMobile &&
        css`
            @media (max-width: ${theme.breakpoints.mobileMax}) {
                display: none;
            }
        `}
`;

type IconElement = ReactElement<ComponentPropsWithoutRef<typeof Icon>, typeof Icon>;

interface TagProps extends HTMLAttributes<HTMLSpanElement> {
    icon?: IconElement | IconDefinition;
    children?: ReactNode;
    hideTextOnMobile?: boolean;
    textColor?: keyof Colors;
}

export function Tag({ icon, children, hideTextOnMobile = false, textColor, ...props }: TagProps) {
    return (
        <StyledTag {...props}>
            {!!icon && (isIcon(icon) ? icon : <Icon icon={icon} color="text-disabled" />)}
            {!!children && (
                <StyledText variant="small" $hideTextOnMobile={hideTextOnMobile} color={textColor}>
                    {children}
                </StyledText>
            )}
        </StyledTag>
    );
}

function isIcon(value: IconElement | IconDefinition): value is IconElement {
    return typeof value === "object" && "type" in value && (value as ReactElement).type === Icon;
}
