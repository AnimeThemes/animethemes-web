import { css, keyframes } from "styled-components";

const loadingAnimationKeyframes = keyframes`
    50% {
        background-color: rgba(46, 41, 58, 0.5);
    }
`;

export const loadingAnimation = css`
    background-color: rgba(46, 41, 58, 1);

    @media (prefers-reduced-motion: no-preference) {
        animation: ${loadingAnimationKeyframes} 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    }
`;

export const withHover = (content) => css`
    @media (hover: hover) and (pointer: fine) {
        &:hover {
            ${content}
        }
    }
`;
