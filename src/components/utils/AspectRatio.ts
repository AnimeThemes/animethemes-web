import styled from "styled-components";

export const AspectRatio = styled.div<{ ratio: number }>`
    aspect-ratio: ${(props) => props.ratio};
`;
