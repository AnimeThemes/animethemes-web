import { createContext } from "react";

const ColorThemeContext = createContext({
    colorTheme: null,
    setColorTheme: () => {}
});

export default ColorThemeContext;
