import { forwardRef } from "react";
import styled, { keyframes } from "styled-components";

import * as RadixDialog from "@radix-ui/react-dialog";

import { Card } from "@/components/card/Card";
import { Text } from "@/components/text/Text";
import theme from "@/theme";

const overlayAnimation = keyframes`
    from {
        opacity: 0;
    }
`;

const contentAnimation = keyframes`
    from {
        transform: scale(0.9);
        opacity: 0;
    }
`;

const StyledOverlay = styled(RadixDialog.Overlay)`
    position: fixed;
    inset: 0;

    display: flex;
    justify-content: center;
    align-items: flex-start;
    padding: 32px 16px;
    overflow: auto;

    background-color: rgba(0, 0, 0, 0.5);
    animation: ${overlayAnimation} 250ms;
`;

const StyledDialogCard = styled(Card)`
    width: 100%;
    max-width: 450px;
    animation: ${contentAnimation} 250ms;
    
    margin: auto;
    padding: 24px;
    box-shadow: 0 0 0 2px ${theme.colors["text-disabled"]};
    
    &:before {
        display: none;
    }
`;
const StyledHeader = styled.div`
    margin: -24px -24px 24px -24px;
    padding: 16px 24px;
    background-color: ${theme.colors["background"]};
`;

interface DialogContentProps extends RadixDialog.DialogContentProps {
    title?: string;
}

export const DialogContent = forwardRef<HTMLDivElement, DialogContentProps>(
    function DialogContent({ title, children, ...props }, ref) {
        return (
            <RadixDialog.Portal>
                <StyledOverlay>
                    <RadixDialog.Content asChild {...props} ref={ref}>
                        <StyledDialogCard>
                            {title ? (
                                <StyledHeader>
                                    <Text variant="h2">{title}</Text>
                                </StyledHeader>
                            ) : null}
                            {children}
                        </StyledDialogCard>
                    </RadixDialog.Content>
                </StyledOverlay>
            </RadixDialog.Portal>
        );
    }
);

export const Dialog = RadixDialog.Root;

export const DialogTrigger = RadixDialog.Trigger;
