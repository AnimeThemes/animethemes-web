import styled from "styled-components";
import { Icon } from "components/icon/Icon";
import theme from "theme";

export const CornerIcon = styled(Icon).attrs({
    size: "2x"
})`
    position: absolute;
    right: 0;
    top: 0;
    color: ${theme.colors["text-primary"]};
    transform: translate(50%, -33%) rotate(10deg);
`;
