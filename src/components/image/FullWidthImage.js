import styled from "styled-components";
import theme from "theme";

export const FullWidthImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 0.5rem;
    box-shadow: ${theme.shadows.medium};
    
    background-size: cover;
    background-position: center;
`;
