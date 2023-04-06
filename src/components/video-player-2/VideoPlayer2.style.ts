import styled from "styled-components";
import theme from "theme";
import { Switcher } from "components/switcher";
import { Solid } from "components/box";
import { IconTextButton } from "components/button";

export const StyledPlayer = styled.div`    
    position: sticky;
    bottom: 0;
    z-index: ${theme.zIndices.videoPlayer};
    
    display: flex;
    flex-direction: column;
`;

export const StyledPlayerContent = styled.div`
    flex: 1;
    
    display: grid;
    grid-template-columns: 3fr 1fr;
    grid-gap: 5%;
    
    padding: 0 5%;
    
    @media (max-width: ${theme.breakpoints.tabletMax}) {
        grid-template-columns: 1fr;
        grid-template-rows: auto 1fr;
        grid-gap: 16px;
        
        padding: 0 16px;
    }
`;

export const StyledPlaybackArea = styled.div`
    align-self: stretch;
    justify-self: stretch;
    
    padding: 16px 0;
    
    @media (max-width: ${theme.breakpoints.tabletMax}) {
        margin: 0 -16px;
    }
`;

export const StyledVideoBackground = styled.div`
    position: relative;

    display: flex;

    width: 100%;
    height: 100%;
`;

export const StyledVideo = styled.video`
    position: absolute;
    inset: 0;
    margin: auto;
    
    max-height: 100%;
    
    outline: none;

    @media (max-width: ${theme.breakpoints.tabletMax}) {
        position: static;
    }
`;

export const StyledAudioBackground = styled.div`
    position: relative;
    
    display: flex;
    
    width: 100%;
    height: 100%;
`;

export const StyledAudio = styled.audio`
    display: none;
`;

export const StyledAudioCover = styled.img`
    position: absolute;
    inset: 0;
    margin: auto;

    max-height: 100%;
`;

export const StyledAside = styled.aside`
    display: flex;
    flex-direction: column;
    gap: 32px;
    
    padding-top: 64px;

    @media (max-width: ${theme.breakpoints.tabletMax}) {
        padding-top: 0;
    }
`;

export const StyledSwitcher = styled(Switcher)`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    width: 100%;
`;

export const StyledScrollArea = styled.div`
    flex: 1 0 0;
    
    padding-bottom: 16px;
    overflow: auto;
`;

export const StyledPlayerBar = styled(Solid)`
    position: relative;
    
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    grid-gap: 32px;
    align-items: center;
    
    padding: 16px 32px;

    @media (max-width: ${theme.breakpoints.tabletMax}) {
        grid-template-columns: 1fr auto;
        grid-gap: 16px;
        
        padding: 16px;
    }
`;

export const StyledPlayerBarControls = styled.div`
    display: flex;
    gap: 16px;
    
    @media (max-width: ${theme.breakpoints.tabletMax}) {
        & > :first-child, & > :last-child {
            display: none;
        }
    }
`;

export const StyledPlayerBarControl = styled(IconTextButton)`
    font-size: 2rem;
`;

export const StyledPlayerBarActions = styled.div`
    display: flex;
    gap: 16px;
    
    margin-left: auto;

    @media (max-width: ${theme.breakpoints.tabletMax}) {
        display: none;
    }
`;
