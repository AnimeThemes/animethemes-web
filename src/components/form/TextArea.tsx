import styled from "styled-components";

import { withColorTheme } from "@/styles/mixins";
import theme from "@/theme";

export const TextArea = styled.textarea`
    display: block;

    padding: 8px 16px;
    border-radius: 8px;

    resize: vertical;
    background-color: ${theme.colors["solid-on-card"]};
    color: ${theme.colors["text-muted"]};
    scrollbar-color: ${theme.colors["gray-800"]} transparent;

    &:focus-within {
        box-shadow: ${theme.shadows.low};

        ${withColorTheme("dark")`
            box-shadow: 0 0 0 2px ${theme.colors["text-primary"]};
        `}
    }
`;
