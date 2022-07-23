import { createContext } from "react";

export type ColorTheme = "system" | "light" | "dark";

interface IColorThemeContext {
    colorTheme: ColorTheme
    setColorTheme: (colorTheme: ColorTheme) => void
}

const ColorThemeContext = createContext<IColorThemeContext>({
    colorTheme: "system",
    setColorTheme: () => { /* Do nothing. */ }
});

export default ColorThemeContext;

export function isColorTheme(value?: string | null): value is ColorTheme {
    if (!value) {
        return false;
    }
    return ["system", "light", "dark"].includes(value);
}
