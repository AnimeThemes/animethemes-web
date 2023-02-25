import styled from "styled-components";
import theme from "theme";
import { withHover } from "styles/mixins";
import type { Property } from "csstype";

export const Table = styled.div<{ style: { "--columns": Property.GridTemplateColumns } }>`
    width: 100%;
`;

export const TableBody = styled.div`
    border: 2px solid ${theme.colors["solid-on-card"]};
    border-radius: ${theme.scalars.borderRadiusCard};
    overflow: hidden;
`;

export const TableRow = styled.div`
    display: grid;
    grid-template-columns: var(--columns);
    grid-gap: 16px;
    align-items: baseline;
    padding: 8px;
    
    &:not(:last-of-type) {
        border-bottom: 2px solid ${theme.colors["solid-on-card"]};
    }
    
    ${withHover`
        background-color: ${theme.colors["solid"]};
    `}
`;

export const TableCell = styled.div<{ style?: { "--span"?: number } }>`
    grid-column: span var(--span, 1);
    overflow: hidden;
`;

export const TableHead = styled.div`
    display: grid;
    grid-template-columns: var(--columns);
    grid-gap: 16px;
    align-items: self-end;
    padding: 8px 10px;
`;

export const TableHeadCell = styled.span`
    font-size: 0.7rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: ${theme.colors["text-muted"]};
`;
