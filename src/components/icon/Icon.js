import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { color } from "styled-system";
import styled, { css } from "styled-components";

export const Icon = styled(FontAwesomeIcon).attrs({
    fixedWidth: true
})`
    ${(props) => props.transition && css`
        transition: ${(props) => props.transition};
    `}
    
    ${color}
`;
