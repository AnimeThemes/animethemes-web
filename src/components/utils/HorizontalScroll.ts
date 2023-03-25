import styled, { css } from "styled-components";

export const HorizontalScroll = styled.div<{
    fixShadows?: boolean
}>`
    display: flex;
    overflow: auto;
    max-width: 100vw;
    margin-left: -16px;
    margin-right: -16px;
    padding-left: 16px;
    padding-right: 16px;
    
    & > * {
        min-width: max-content;
    }
    
    ${(props) => !!props.fixShadows && css`
        margin-top: -16px;
        margin-bottom: -16px;
        
        & > * {
            margin-top: 16px;
            margin-bottom: 16px;
        }
    `}
`;
