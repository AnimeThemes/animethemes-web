import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { color } from "styled-system";
import styled from "styled-components";

export const Icon = styled(FontAwesomeIcon).attrs({
    fixedWidth: true
})`
    ${color}
`;
