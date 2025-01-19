import styled from "styled-components";

import { m } from "motion/react";

import { Switcher } from "@/components/switcher/Switcher";
import theme from "@/theme";

export const StyledPlayer = styled.div`
    position: sticky;
    bottom: 0;

    display: flex;
    flex-direction: column;

    &:not([data-background]) {
        flex: 1;
    }

    [data-fullscreen] &[data-relaxed] {
        cursor: none;
    }
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

    [data-background] & {
        position: fixed;
        inset: 70px 16px 92px 16px;
        pointer-events: none;
    }

    [data-fullscreen] & {
        grid-template-columns: 1fr;
        grid-template-rows: auto;
        padding: 0;
    }
`;

export const StyledPlaybackArea = styled(m.div)`
    align-self: stretch;
    justify-self: stretch;

    position: relative;

    margin: 32px 0;

    @media (max-width: ${theme.breakpoints.tabletMax}) {
        aspect-ratio: 16 / 9;
        margin: 0 -16px;

        [data-background] & {
            display: none;
        }

        [data-fullscreen] & {
            aspect-ratio: auto;
        }
    }

    [data-background] & {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 300px;
        aspect-ratio: 16 / 9;
        margin: 0;
        padding: 0;
        background-color: rgba(0, 0, 0, 0.5);
        border-radius: 8px;
        overflow: hidden;
        pointer-events: all;
    }

    [data-fullscreen] & {
        height: 100%;
        margin: 0;
        background: rgba(0, 0, 0);
    }
`;

export const StyledVideoBackground = styled.div`
    position: absolute;
    inset: 0;
    margin: auto;

    max-width: 100%;
    max-height: 100%;
    aspect-ratio: 16 / 9;
`;

export const StyledVideo = styled.video`
    width: 100%;
    height: 100%;

    outline: none;
`;

export const StyledAudioBackground = styled.div`
    position: absolute;
    inset: 0;
    margin: auto;

    max-width: 100%;
    max-height: 100%;
`;

export const StyledAudio = styled.audio`
    display: none;
`;

export const StyledAudioCover = styled.img`
    width: 100%;
    height: 100%;

    outline: none;
    object-fit: contain;

    [data-background] & {
        pointer-events: none;
    }
`;

export const StyledAside = styled.aside`
    display: flex;
    flex-direction: column;
    gap: 32px;

    min-width: 0;
    padding-top: 64px;

    @media (max-width: ${theme.breakpoints.tabletMax}) {
        padding-top: 0;
        gap: 16px;
    }

    [data-background] &,
    [data-fullscreen] & {
        display: none;
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
