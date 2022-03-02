import styled from "styled-components";
import { Card } from "components/card";
import theme from "theme";
import { forwardRef } from "react";

const StyledCard = styled(Card)`
    box-shadow: ${theme.shadows.high};
`;

export const Toast = forwardRef(ToastWithRef);

function ToastWithRef({ children, ...props }, ref) {
    return (
        <StyledCard ref={ref} {...props}>
            {children}
        </StyledCard>
    );
}
