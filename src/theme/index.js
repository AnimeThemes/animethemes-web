import { colors, shadows } from "theme/colors";

const theme = {
    breakpoints: [
        "721px"
    ],
    shadows: createThemeDefinition(shadows),
    colors: createThemeDefinition(colors),
    zIndices: {
        navigation: 10,
        switcherButton: 1,
        switcherText: 2,
        videoPlayer: 5,
        videoPlayerOverlay: 6
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
