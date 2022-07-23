import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import theme from "theme";
import { Property } from "csstype";
import { Colors } from "theme/colors";

export const Icon = styled(FontAwesomeIcon).attrs({
    fixedWidth: true
})<{ color?: keyof Colors, transition?: Property.Transition }>`
    color: ${(props) => props.color && theme.colors[props.color]};

    transition: ${(props) => props.transition}
`;
