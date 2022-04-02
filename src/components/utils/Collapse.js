import styled from "styled-components";
import { fadeIn, slideIn } from "styles/animations";

const StyledWrapper = styled.div`
    animation-name: ${slideIn("-16px")}, ${fadeIn};
    animation-duration: 350ms;
    animation-timing-function: ease-out;
`;

export function Collapse({ collapse, children }) {
    if (collapse) {
        return null;
    }

    return (
        <StyledWrapper>
            {children}
        </StyledWrapper>
    );
}
