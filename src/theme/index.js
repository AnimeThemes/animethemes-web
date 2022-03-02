import { colors, shadows } from "theme/colors";

const theme = {
    breakpoints: {
        mobileMax: "720px",
        tabletMin: "721px",
        tabletMax: "870px",
        desktopMin: "871px",
    },
    shadows: createThemeDefinition(shadows),
    colors: createThemeDefinition(colors),
    zIndices: {
        navigation: 10,
        switcherButton: 1,
        switcherText: 2,
        videoPlayer: 5,
        videoPlayerOverlay: 6,
        toast: 20,
        menuOverlay: 2,
        menuPopover: 1
    }
};

export default theme;

export function createCssDefinition(definition) {
    const css = {};
    for (const [name, value] of Object.entries(definition)) {
        css[`--${name}`] = value;
    }
    return css;
}

export function createThemeDefinition(keyDefinition) {
    const theme = {};
    for (const name of Object.keys(keyDefinition)) {
        theme[name] = `var(--${name})`;
    }
    return theme;
}
