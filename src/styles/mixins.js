import { css, keyframes } from "styled-components";

const loadingAnimationKeyframes = keyframes`
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 100% 100%;
  }
`;

export const loadingAnimation = css`
    background: radial-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.25)) no-repeat;
    background-size: 500% 500%;

    @media (prefers-reduced-motion: no-preference) {
        animation: ${loadingAnimationKeyframes} 2s infinite alternate linear;
    }
`;

export const withHover = (content) => css`
    @media (hover: hover) and (pointer: fine) {
        &:hover {
            ${content}
        }
    }
`;
