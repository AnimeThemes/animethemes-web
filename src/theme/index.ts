import type { Colors, Shadows } from "theme/colors";
import { colors, shadows } from "theme/colors";

interface Theme {
    breakpoints: {
        [key: string]: string
    }
    shadows: ThemeDefinition<Shadows>
    colors: ThemeDefinition<Colors>
    zIndices: {
        [key: string]: number
    }
    scalars: {
        [key: string]: string | number
    }
}

type VariableDefinition = Colors | Shadows;

type ThemeDefinition<T extends VariableDefinition> = {
    [Key in keyof T & string]?: `var(--${Key})`;
};

type CssDefinition<T extends VariableDefinition> = {
    [Key in `--${keyof T & string}`]?: T[keyof T];
};

const theme: Theme = {
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
    },
    scalars: {
        borderRadiusCard: "4px"
    }
};

export default theme;

export function createCssDefinition<T extends VariableDefinition>(definition: T): CssDefinition<T> {
    const css: CssDefinition<T> = {};
    for (const name in definition) {
        css[`--${name}`] = definition[name];
    }
    return css;
}

export function createThemeDefinition<T extends VariableDefinition>(keyDefinition: T): ThemeDefinition<T> {
    const theme: ThemeDefinition<T> = {};
    for (const name in keyDefinition) {
        theme[name] = `var(--${name})`;
    }
    return theme;
}
