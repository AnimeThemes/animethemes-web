import styled from "styled-components";
import Link from "next/link";
import theme from "theme";

export const TextLink = styled(Link)`
    cursor: pointer;
    color: ${theme.colors["text-primary"]};
    font-weight: 600;

    &:hover {
        text-decoration: underline;
    }
`;
