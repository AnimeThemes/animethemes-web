import styled from "styled-components";

import { Card } from "@/components/card/Card";
import theme from "@/theme";

export const Toast = styled(Card)`
    box-shadow: ${theme.shadows.high};
`;
