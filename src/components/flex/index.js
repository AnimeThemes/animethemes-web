import styled from "styled-components";
import { space, layout, typography, color, flexbox, grid, system, get } from "styled-system";

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

export const Box = styled.div`
    ${space}
    ${layout}
    ${typography}
    ${color}
    ${flexbox}

    & > :not(:first-child) {        
        ${gapsAxesSystem}
    }

    // Hack to have gutters between items without an outer margin
    ${gapsBothSystem}

    & > * {
        ${gapsBothItemSystem}
    }
`;

export const Flex = styled(Box)`
    display: ${(props) => props.flexInline ? "inline-flex" : "flex"};
`;

export const Grid = styled(Box)`
    display: ${(props) => props.gridInline ? "inline-grid" : "grid"};
    
    ${grid}
`;
