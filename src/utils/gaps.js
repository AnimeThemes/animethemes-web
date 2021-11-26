import { get, system } from "styled-system";
import { css } from "styled-components";

const gapsAxesSystem = system({
    gapsRow: {
        property: "marginLeft",
        scale: "space"
    },
    gapsColumn: {
        property: "marginTop",
        scale: "space"
    }
});

const gapsBothSystem = system({
    gapsBoth: {
        property: "margin",
        scale: "space",
        transform: (value, scale) => `calc(${get(scale, value, value)} / -2)`
    }
});

const gapsBothItemSystem = system({
    gapsBoth: {
        property: "margin",
        scale: "space",
        transform: (value, scale) => `calc(${get(scale, value, value)} / 2)`
    }
});

export const gaps = css`
    & > :not(:first-child) {
        ${gapsAxesSystem}
    }

    // Hack to have gutters between items without an outer margin
    ${gapsBothSystem}

    & > * {
        ${gapsBothItemSystem}
    }
`;

export const gapsModern = system({
    gap: {
        property: "gap",
        scale: "space"
    }
});
