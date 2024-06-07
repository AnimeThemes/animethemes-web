import type { ComponentPropsWithoutRef } from "react";
import styled from "styled-components";

import { Logo } from "@/components/image/Logo";
import theme from "@/theme";

const StyledPlaceholder = styled.div`
    width: 100%;
    height: 100%;
    padding: 32px;

    background: ${theme.colors["solid"]};
    color: ${theme.colors["text-disabled"]};

    & svg {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
`;

export function LogoPlaceholder(props: ComponentPropsWithoutRef<typeof StyledPlaceholder>) {
    return (
        <StyledPlaceholder {...props}>
            <Logo />
        </StyledPlaceholder>
    );
}
