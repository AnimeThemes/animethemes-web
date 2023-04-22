import styled, { css } from "styled-components";
import { Container } from "components/container";
import { Button } from "components/button";
import theme from "theme";
import { Solid } from "components/box";
import { Logo } from "components/image";
import { ProfileImage } from "components/image/ProfileImage";

export const StyledNavigation = styled(Solid).attrs({ as: "nav" })<{ $floating: boolean }>`
    position: sticky;
    top: 0;
    z-index: ${theme.zIndices.navigation};
    background-color: ${theme.colors["background"]};
    box-shadow: ${theme.shadows.medium};

    transition: 100ms ease;
    transition-property: background-color, box-shadow;
    
    ${(props) => props.$floating && css`
        transition: 500ms ease;
        background-color: transparent;
        box-shadow: none;
    `}
    
    [data-fullscreen] & {
        display: none;
    }
`;

export const StyledNavigationContainer = styled(Container)`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: stretch;
    gap: 16px;
    
    padding: 8px 16px;
`;

export const StyledNavigationLinks = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 16px;
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
    height: 1.5rem;
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

export const StyledProfileImageIcon = styled.div`
    position: relative;
    width: 1.25em;
    height: 1em;
`;

export const StyledProfileImage = styled(ProfileImage)`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 2em;
    height: 2em;
    max-width: none;
    border-radius: 9999px;

    @media (min-width: 721px) {
        transform: translate(calc(-50% - 4px), -50%);
    }
`;
