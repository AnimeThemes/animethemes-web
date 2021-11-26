import styled, { keyframes } from "styled-components";
import { Container } from "components/container";
import { Card } from "components/card";
import theme from "theme";

const slideIn = keyframes`
    from {
        opacity: 0;
        transform: translateY(1rem);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
`;

const StyledToast = styled(Container)`
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: ${theme.zIndices.toast};
    animation: ${slideIn} 500ms ease;
`;

export function Toast({ hoverable, onClick, children, ...props }) {
    return (
        <StyledToast {...props}>
            <Card borderColor="text-warning" boxShadow="high" hoverable={hoverable} onClick={onClick}>
                {children}
            </Card>
        </StyledToast>
    );
}
