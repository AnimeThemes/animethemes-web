import { css, keyframes } from "styled-components";

import { Solid } from "@/components/box/Solid";

const loadingAnimationKeyframes = keyframes`
    50% {
        background-color: rgba(var(--rgb), 0.5);
    }
`;

export const loadingAnimation = css`
    --rgb: 46, 41, 58;

    background-color: rgba(var(--rgb), 1);

    @media (prefers-reduced-motion: no-preference) {
        animation: ${loadingAnimationKeyframes} 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    }

    ${Solid} & {
        --rgb: 69, 61, 83;
    }
`;

export const withHover = <T extends object>(...args: Parameters<typeof css<T>>) => css`
    @media (hover: hover) and (pointer: fine) {
        &:hover {
            ${css(...args)}
        }
    }
`;

export const withColorTheme =
    (colorTheme: "light" | "dark") =>
    <T extends object>(...args: Parameters<typeof css<T>>) => css`
        [data-theme="system"] & {
            @media (prefers-color-scheme: ${colorTheme}) {
                ${css(...args)}
            }
        }

        [data-theme="${colorTheme}"] & {
            ${css(...args)}
        }
    `;

export const defineColorTheme =
    (colorTheme: "light" | "dark") =>
    <T extends object>(...args: Parameters<typeof css<T>>) => css`
        &[data-theme="system"] {
            @media (prefers-color-scheme: ${colorTheme}) {
                ${css(...args)}
            }
        }

        &[data-theme="${colorTheme}"] {
            ${css(...args)}
        }
    `;
