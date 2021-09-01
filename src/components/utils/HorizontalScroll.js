import styled from "styled-components";

export const HorizontalScroll = styled.div`
    overflow-x: auto;
    max-width: 100vw;
    margin: 0 -1rem;
    
    & > * {
        width: max-content;
        padding: 0 1rem;
    }
`;
