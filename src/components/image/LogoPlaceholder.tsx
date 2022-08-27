import styled from "styled-components";
import theme from "theme";
import { Logo } from "components/image/Logo";
import type { ComponentPropsWithoutRef } from "react";

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
            <Logo/>
        </StyledPlaceholder>
    );
}
