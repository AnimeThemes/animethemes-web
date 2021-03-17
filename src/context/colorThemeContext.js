import { createContext } from "react";

const ColorThemeContext = createContext({
    colorTheme: null,
    toggleColorTheme: () => {}
});

export default ColorThemeContext;
