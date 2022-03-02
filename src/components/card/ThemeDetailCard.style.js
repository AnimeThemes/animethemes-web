import styled from "styled-components";
import { Row } from "components/box";
import { Text } from "components/text";
import { Card } from "components/card";
import theme from "theme";

export const StyledThemeCard = styled(Card)`
    display: flex;
    flex-direction: column;
    
    gap: 1rem;
`;

export const StyledRow = styled.div`
    display: grid;
    grid-template-columns: 2rem 1fr auto;
    align-items: center;
    
    grid-gap: 1rem;
`;

export const StyledSequence = styled(Text).attrs((props) => ({
    variant: "small",
    color: props.secondary ? "text-muted" : "text"
}))``;

export const StyledVideoListContainer = styled.div`
    @media (max-width: ${theme.breakpoints.mobileMax}) {
        grid-column: 1 / -1;
    }
`;

export const StyledVideoList = styled(Row)`
    flex-wrap: wrap;
    gap: 0.75rem;
    
    @media (min-width: 721px) {
        justify-content: flex-end;
    }
`;
