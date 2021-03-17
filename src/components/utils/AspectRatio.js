import styled from "styled-components";

export const AspectRatio = styled.div`
    position: relative;
    padding-top: ${(props) => 100 + props.ratio * 100}%;
    
    & > * {
        position: absolute;
        top: 0;
        left: 0;
    }
`;
