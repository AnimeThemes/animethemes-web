import styled from "styled-components";

import { AnimatePresence, m } from "framer-motion";

import { Container } from "@/components/container/Container";
import { useToasts } from "@/context/toastContext";
import theme from "@/theme";

const StyledToastHub = styled(Container)`
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: ${theme.zIndices.toast};

    display: flex;
    flex-direction: column;
    gap: 16px;

    pointer-events: none;
`;

const StyledToastContainer = styled(m.div)`
    pointer-events: initial;
`;

export function ToastHub() {
    const { activeToasts } = useToasts();

    return (
        <StyledToastHub>
            <AnimatePresence>
                {activeToasts.map((toast) => (
                    <StyledToastContainer
                        key={toast.id}
                        layout="position"
                        initial={{ opacity: 0, y: "16px" }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: "16px" }}
                        transition={{ duration: 0.25 }}
                    >
                        {toast.content}
                    </StyledToastContainer>
                ))}
            </AnimatePresence>
        </StyledToastHub>
    );
}
