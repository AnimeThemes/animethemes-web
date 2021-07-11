import { createThemeDefinition } from "theme/colors";

const theme = {
    breakpoints: [
        "721px"
    ],
    shadows: {
        low: "0 3px 6px rgb(0 0 0 / .15), 0 2px 4px rgb(0 0 0 / .12)",
        high: "0 3px 3px 5px rgb(0 0 0 / .15), 0 2px 9px 5px rgb(0 0 0 / .12)"
    },
    colors: createThemeDefinition()
};

export default theme;
