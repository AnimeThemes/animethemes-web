import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled, { css } from "styled-components";
import theme from "theme";

export const Icon = styled(FontAwesomeIcon).attrs({
    fixedWidth: true
})`    
    color: ${(props) => theme.colors[props.color] || props.color};
    
    ${(props) => props.transition && css`
        transition: ${(props) => props.transition};
    `}
`;
