import { css, Interpolation, keyframes, ThemedStyledProps } from "styled-components";

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

export const withHover = <T extends ThemedStyledProps<object, any>>(content: Interpolation<T>) => css`
    @media (hover: hover) and (pointer: fine) {
        &:hover {
            ${content}
        }
    }
`;

export const withColorTheme = <T extends ThemedStyledProps<object, any>>(
    colorTheme: "light" | "dark",
    content: Interpolation<T>
) => css`
    [data-theme="system"] & {
        @media (prefers-color-scheme: ${colorTheme}) {
            ${content}
        }
    }

    [data-theme="${colorTheme}"] & {
        ${content}
    }
`;

export const defineColorTheme = <T extends ThemedStyledProps<object, any>>(
    colorTheme: "light" | "dark",
    content: Interpolation<T>
) => css`
    &[data-theme="system"] {
        @media (prefers-color-scheme: ${colorTheme}) {
            ${content}
        }
    }

    &[data-theme="${colorTheme}"] {
        ${content}
    }
`;
