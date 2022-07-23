import styled, { css } from "styled-components";

export const HorizontalScroll = styled.div<{
    fixShadows?: boolean
}>`
    display: flex;
    overflow: auto;
    max-width: 100vw;
    margin-left: -1rem;
    margin-right: -1rem;
    padding-left: 1rem;
    padding-right: 1rem;
    
    & > * {
        min-width: max-content;
    }
    
    ${(props) => !!props.fixShadows && css`
        margin-top: -1rem;
        margin-bottom: -1rem;
        
        & > * {
            margin-top: 1rem;
            margin-bottom: 1rem;
        }
    `}
`;
