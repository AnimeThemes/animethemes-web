import styled, { keyframes } from "styled-components";
import theme from "theme";
import { Switcher } from "components/switcher";
import { Solid } from "components/box";

const slowPan = keyframes`
    from, to {
        object-position: top;
    }
    50% {
        object-position: bottom;
    }
`;

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
    grid-template-columns: 2fr 1fr;
    grid-gap: 128px;
    
    padding: 0 128px;
    
    @media (max-width: ${theme.breakpoints.tabletMax}) {
        grid-template-columns: 1fr;
        grid-template-rows: auto 1fr;
        grid-gap: 16px;
        
        padding: 0 16px;
    }
`;

export const StyledPlaybackArea = styled.div`
    align-self: center;
    aspect-ratio: 16 / 9;
    overflow: hidden;

    @media (max-width: ${theme.breakpoints.tabletMax}) {
        margin: 0 -16px;
    }
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

export const StyledVideo = styled.video`
    width: 100%;
    height: 100%;
    outline: none;
    background-color: rgb(0, 0, 0);
`;

export const StyledAudio = styled.audio`
    position: absolute;
    outline: none;
`;

export const StyledAudioBackground = styled.div`
    position: relative;

    display: flex;
    justify-content: center;
    align-items: center;
    
    width: 100%;
    height: 100%;
`;

export const StyledAudioCover = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: blur(5px);
    transform: scale(1.1);
    
    @media (prefers-reduced-motion: no-preference) {
        animation: ${slowPan} 120s ease-in-out infinite;
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
    
    font-size: 2.5rem;
    color: ${theme.colors["text-disabled"]};

    @media (max-width: ${theme.breakpoints.tabletMax}) {
        & > :first-child, & > :last-child {
            display: none;
        }
    }
`;

export const StyledPlayerBarActions = styled.div`
    display: flex;
    gap: 16px;
    
    margin-left: auto;

    @media (max-width: ${theme.breakpoints.tabletMax}) {
        display: none;
    }
`;
