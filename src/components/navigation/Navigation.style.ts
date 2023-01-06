import styled, { css } from "styled-components";
import { Container } from "components/container";
import { Button } from "components/button";
import theme from "theme";
import { blurOut, zoomIn } from "styles/animations";
import { Solid } from "components/box";
import { Logo } from "components/image";
import { withColorTheme } from "styles/mixins";

export const StyledNavigation = styled(Solid).attrs({ as: "nav" })<{ show: boolean }>`
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
        height: 100vh;
            
        background-color: transparent;

        ${(props) => props.show && css`
            display: flex;

            animation: ${blurOut} 250ms ease forwards;
        `}
    }
`;

export const StyledNavigationContainer = styled(Container)`
    display: flex;
    justify-content: space-between;
    gap: 16px;

    @media (min-width: 721px) {
        flex-direction: row;
        align-items: stretch;

        padding: 0.5rem 1rem;
    }

    @media (max-width: 720px) {
        flex-direction: column;
        align-items: center;

        padding: 1rem;
        border-radius: 1rem;
        width: auto;

        background-color: ${theme.colors["solid"]};
        animation: ${zoomIn} 250ms ease;
        will-change: transform;

        ${withColorTheme("dark")`
            border: 2px solid ${theme.colors["text-disabled"]};
        `}
    }
`;

export const StyledNavigationLinks = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 8px;

    @media (max-width: ${theme.breakpoints.mobileMax}) {
        flex-direction: column;
        align-items: flex-start;
    }
`;

export const StyledCollapsibleLink = styled(Button).attrs({ variant: "silent" })`
    gap: 8px;

    @media (min-width: ${theme.breakpoints.tabletMin}) and (max-width: ${theme.breakpoints.tabletMax}) {
        & > :last-child {
            display: none;
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

export const StyledLogo = styled(Logo)`
    width: auto;
    height: 2rem;
    color: ${theme.colors["text"]};
`;

export const StyledMobileToggle = styled(Button)<{ offsetToggleButton: boolean }>`
    position: fixed;
    bottom: ${(props) => props.offsetToggleButton ? "5rem" : "1rem"};
    right: 1rem;

    padding: 1rem;
    z-index: ${theme.zIndices.navigation};

    @media (min-width: 721px) {
        display: none;
    }
`;
