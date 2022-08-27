import styled from "styled-components";
import { fadeIn, slideIn } from "styles/animations";
import type { ReactNode } from "react";

const StyledWrapper = styled.div`
    animation-name: ${slideIn("-16px")}, ${fadeIn};
    animation-duration: 350ms;
    animation-timing-function: ease-out;
`;

interface CollapseProps {
    collapse: boolean
    children: ReactNode
}

export function Collapse({ collapse, children }: CollapseProps) {
    if (collapse) {
        return null;
    }

    return (
        <StyledWrapper>
            {children}
        </StyledWrapper>
    );
}
