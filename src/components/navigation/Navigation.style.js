import styled, { css, keyframes } from "styled-components";
import { Container } from "components/container";
import { gapsColumn, gapsRow } from "styles/mixins";
import { Button } from "components/button";
import theme from "theme";

const fadeIn = keyframes`
    0% {
        background-color: rgba(0, 0, 0, 0);
        backdrop-filter: blur(0px);
    }
    
    100% {
        background-color: rgba(0, 0, 0, 0.5);
        backdrop-filter: blur(5px);
    }
`;

const zoomIn = keyframes`
    0% {
        opacity: 0;
        transform: scale(0.9);
    }
    
    100% {
        opacity: 1;
        transform: scale(1);
    }
`;

export const StyledNavigation = styled.nav`
    background-color: ${theme.colors["solid"]};

    position: sticky;
    top: 0;
    z-index: ${theme.zIndices.navigation};
    box-shadow: ${theme.shadows.medium};

    @media (max-width: 720px) {
        display: none;
        align-items: center;

        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        
        ${(props) => props.show && css`
            display: flex;

            animation: ${fadeIn} 250ms ease forwards;
        `}
    }
`;

export const StyledNavigationContainer = styled(Container)`
    display: flex;
    justify-content: space-between;

    @media (min-width: 721px) {
        flex-direction: row;
        align-items: stretch;
        
        ${gapsRow("1rem")}

        padding: 0.5rem 1rem;
    }
    
    @media (max-width: 720px) {
        flex-direction: column;
        align-items: center;

        ${gapsColumn("1rem")}

        padding: 1rem;
        border-radius: 1rem;
        width: auto;

        background-color: ${theme.colors["solid"]};
        animation: ${zoomIn} 250ms ease;

        [theme="dark"] & {
            border: 2px solid ${theme.colors["text-disabled"]};
        }
    }
`;

export const StyledLogoContainer = styled.a`
    display: flex;
    align-items: center;

    @media (max-width: 720px) {
        margin-right: 0;
    }
`;

export const StyledLogo = styled.img`
    width: auto;
    height: 2rem;

    [theme="dark"] & {
        filter: invert();
    }
`;

export const StyledMobileToggle = styled(Button)`
    position: fixed;
    bottom: ${(props) => props.offsetToggleButton ? "5rem" : "1rem"};
    right: 1rem;
    
    padding: 1rem;
    z-index: ${theme.zIndices.navigation};

    @media (min-width: 721px) {
        display: none;
    }
`;
