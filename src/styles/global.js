import { createGlobalStyle } from "styled-components";
import { colors, createCssDefinition } from "theme/colors";
import { darkColors } from "theme/colors/dark";
import theme from "theme";

export default createGlobalStyle`
    * {
        box-sizing: border-box;
        transition: opacity 250ms, box-shadow 250ms, background-color 250ms;
    }

    [theme="light"] {
        ${createCssDefinition(colors)}
    }

    [theme="dark"] {
        ${createCssDefinition(darkColors)}
    }

    html {
        overflow-y: scroll;
    }

    body {
        margin: 0;
        overflow-x: hidden;

        background-color: ${theme.colors["background"]};
        color: ${theme.colors["text"]};

        font-family: "Nunito", sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    a {
        color: inherit;
        text-decoration: inherit;
    }
    
    p {
        line-height: 1.5;
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

    input[type="text"] {
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
    
    img {
        display: block;
    }
    
    pre {
        margin: 0;
    }
`;
