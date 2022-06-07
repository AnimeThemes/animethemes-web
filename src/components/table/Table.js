import styled, { css } from "styled-components";
import theme from "theme";
import { withHover } from "styles/mixins";

export const Table = styled.div``;

Table.Body = styled.div`
    border: 2px solid ${theme.colors["solid-on-card"]};
    border-radius: ${theme.scalars.borderRadiusCard};
    overflow: hidden;
`;

Table.Row = styled.div`
    display: grid;
    grid-template-columns: var(--columns);
    grid-gap: 16px;
    align-items: baseline;
    padding: 8px;
    
    &:not(:last-of-type) {
        border-bottom: 2px solid ${theme.colors["solid-on-card"]};
    }
    
    ${withHover(css`
        background-color: ${theme.colors["solid"]};
    `)}
`;

Table.Cell = styled.div`
    grid-column: span var(--span, 1);
    overflow: hidden;
`;

Table.Head = styled.div`
    display: grid;
    grid-template-columns: var(--columns);
    grid-gap: 16px;
    align-items: self-end;
    padding: 8px 10px;
`;

Table.HeadCell = styled.span`
    font-size: 0.7rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: ${theme.colors["text-muted"]};
`;
