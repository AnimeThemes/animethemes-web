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

export const withHover = <T extends object>(...args: Parameters<typeof css<T>>) => css`
    @media (hover: hover) and (pointer: fine) {
        &:hover {
            ${css(...args)}
        }
    }
`;

export const withColorTheme = (
    colorTheme: "light" | "dark",
) => <T extends object>(
    ...args: Parameters<typeof css<T>>
) => css`
    [data-theme="system"] & {
        @media (prefers-color-scheme: ${colorTheme}) {
            ${css(...args)}
        }
    }

    [data-theme="${colorTheme}"] & {
        ${css(...args)}
    }
`;

export const defineColorTheme = (
    colorTheme: "light" | "dark",
) => <T extends object>(
    ...args: Parameters<typeof css<T>>
) => css`
    &[data-theme="system"] {
        @media (prefers-color-scheme: ${colorTheme}) {
            ${css(...args)}
        }
    }

    &[data-theme="${colorTheme}"] {
        ${css(...args)}
    }
`;
