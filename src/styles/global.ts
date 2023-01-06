import { createGlobalStyle } from "styled-components";
import { colors, shadows } from "theme/colors";
import { darkColors, darkShadows } from "theme/colors/dark";
import theme, { createCssDefinition } from "theme";
import { defineColorTheme } from "styles/mixins";

export default createGlobalStyle`
    * {
        box-sizing: border-box;
    }

    html {
        // Always show a vertical scroll bar, even if the page 
        // is not scrollable to prevent layout shift.
        overflow-y: scroll;
    }

    body {
        margin: 0;

        background-color: ${theme.colors["background"]};
        color: ${theme.colors["text"]};

        font-family: "Nunito", sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;

        line-height: 1.5;

        ${defineColorTheme("light")`
            ${createCssDefinition(colors)}
            ${createCssDefinition(shadows)}
        `}

        ${defineColorTheme("dark")`
            ${createCssDefinition(darkColors)}
            ${createCssDefinition(darkShadows)}
        `}
    }

    html, body, #__next {
        // Every container in the page hierarchy needs to have the 
        // maximum height of the viewport. Using 100vh on innermost container 
        // would break certain layouts on mobile devices.
        height: 100%;
    }

    a {
        color: inherit;
        text-decoration: inherit;
    }

    p {
        line-height: inherit;
    }

    button {
        border: none;
        margin: 0;
        padding: 0;
        width: auto;
        overflow: visible;
        background: transparent;
        color: inherit;
        font: inherit;
        text-align: inherit;
        outline: none;
        line-height: inherit;
        -webkit-appearance: none;
    }

    input {
        width: 100%;
        border: none;
        outline: none;
        background-color: transparent;
        color: inherit;
        font-family: inherit;
        font-size: inherit;
        font-weight: inherit;

        ::placeholder {
            color: ${theme.colors["text-muted"]};
        }
    }

    img, video {
        display: block;
        max-width: 100%;
    }

    pre, ul {
        margin: 0;
    }

    hr {
        margin: 16px 0;
        border-color: ${theme.colors["text-disabled"]};
    }

    html {
        scrollbar-color: ${theme.colors["gray-700"]} transparent;
        scrollbar-width: thin;
    }

    ::-webkit-scrollbar {
        width: 6px;
        height: 12px;
        background-color: transparent;
    }

    ::-webkit-scrollbar-thumb {
        background-color: ${theme.colors["gray-700"]};

        &:hover {
            background-color: ${theme.colors["gray-500"]};
        }
    }
`;
