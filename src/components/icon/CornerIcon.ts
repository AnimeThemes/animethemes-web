import styled from "styled-components";
import { Icon } from "components/icon/Icon";
import theme from "theme";

export const CornerIcon = styled(Icon)`
    position: absolute;
    right: 0;
    top: 0;
    font-size: 32px;
    color: ${theme.colors["text-primary"]};
    transform: translate(50%, -33%) rotate(10deg);
`;
