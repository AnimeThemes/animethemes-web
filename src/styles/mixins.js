import { css } from "styled-components";

export const fullWidth = css`
    width: 100%;
`;

export const withHover = (content) => css`
    @media (hover: hover) and (pointer: fine) {
        &:hover {
            ${content}
        }
    }
`;

export function gapsRow(gapSize = "1rem") {
    return css`
        & > :not(:first-child) {
            margin-left: ${gapSize};
        }
    `;
}

export function gapsColumn(gapSize = "1rem") {
    return css`
        & > :not(:first-child) {
            margin-top: ${gapSize};
        }
    `;
}
