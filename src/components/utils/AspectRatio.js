import styled from "styled-components";

export const AspectRatio = styled.div`
    position: relative;
    height: 0;
    padding-top: ${(props) => 1 / props.ratio * 100}%;
    
    & > * {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
`;
