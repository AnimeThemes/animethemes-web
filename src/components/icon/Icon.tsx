import styled from "styled-components";

import type { Property } from "csstype";

import { FontAwesomeIcon } from "@/components/icon/FontAwesomeIcon";
import theme from "@/theme";
import type { Colors } from "@/theme/colors";

export const Icon = styled(FontAwesomeIcon)<{ color?: keyof Colors, transition?: Property.Transition }>`
    color: ${(props) => props.color && theme.colors[props.color]};

    transition: ${(props) => props.transition}
`;
