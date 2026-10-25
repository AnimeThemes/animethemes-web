import { type ReactNode, useState } from "react";
import styled from "styled-components";

import { Dialog } from "@radix-ui/react-dialog";

import { Row } from "@/components/box/Flex";
import { Button } from "@/components/button/Button";
import { DialogContent, DialogTrigger } from "@/components/dialog/Dialog";
import theme from "@/theme";

const StyledKeyList = styled.dl`
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 8px 16px;
    align-items: baseline;
    margin: 0 0 16px 0;
`;
const StyledKey = styled.dt`
    text-align: right;
    color: ${theme.colors["text-muted"]};
`;
const StyledKeyDescription = styled.dd`
    margin: 0;
    color: ${theme.colors["text-disabled"]};
`;
const StyledKeyHint = styled.kbd`
    display: inline-flex;
    justify-content: center;
    align-items: center;

    width: 32px;
    height: 32px;
    border: 1px solid ${theme.colors["text-disabled"]};
    border-radius: 4px;

    font-size: 1.25rem;
    background-color: ${theme.colors["background"]};
`;
const StyledKeyHintSpace = styled(StyledKeyHint)`
    width: 96px;
`;

interface KeyboardShortcutDialogProps {
    trigger: ReactNode;
}

export function KeyboardShortcutDialog({ trigger }: KeyboardShortcutDialogProps) {
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{trigger}</DialogTrigger>
            <DialogContent title="Keyboard Shortcuts">
                <StyledKeyList>
                    <StyledKey>
                        <StyledKeyHintSpace title="Space">_</StyledKeyHintSpace> or <StyledKeyHint>K</StyledKeyHint>
                    </StyledKey>
                    <StyledKeyDescription>Play / Pause</StyledKeyDescription>
                    <StyledKey>
                        <StyledKeyHint>→</StyledKeyHint>
                    </StyledKey>
                    <StyledKeyDescription>Seek forward 5 seconds</StyledKeyDescription>
                    <StyledKey>
                        <StyledKeyHint>←</StyledKeyHint>
                    </StyledKey>
                    <StyledKeyDescription>Seek backward 5 seconds</StyledKeyDescription>
                    <StyledKey>
                        <StyledKeyHint>L</StyledKeyHint>
                    </StyledKey>
                    <StyledKeyDescription>Seek forward 10 seconds</StyledKeyDescription>
                    <StyledKey>
                        <StyledKeyHint>J</StyledKeyHint>
                    </StyledKey>
                    <StyledKeyDescription>Seek backward 10 seconds</StyledKeyDescription>
                    <StyledKey>
                        <StyledKeyHint>.</StyledKeyHint>
                    </StyledKey>
                    <StyledKeyDescription>Seek forward 1 frame</StyledKeyDescription>
                    <StyledKey>
                        <StyledKeyHint>,</StyledKeyHint>
                    </StyledKey>
                    <StyledKeyDescription>Seek backward 1 frame</StyledKeyDescription>
                    <StyledKey>
                        <StyledKeyHint>N</StyledKeyHint>
                    </StyledKey>
                    <StyledKeyDescription>Next track</StyledKeyDescription>
                    <StyledKey>
                        <StyledKeyHint>B</StyledKeyHint>
                    </StyledKey>
                    <StyledKeyDescription>Previous track</StyledKeyDescription>
                    <StyledKey>
                        <StyledKeyHint>M</StyledKeyHint>
                    </StyledKey>
                    <StyledKeyDescription>Mute / Unmute</StyledKeyDescription>
                    <StyledKey>
                        <StyledKeyHint>↑</StyledKeyHint>
                    </StyledKey>
                    <StyledKeyDescription>Volume up</StyledKeyDescription>
                    <StyledKey>
                        <StyledKeyHint>↓</StyledKeyHint>
                    </StyledKey>
                    <StyledKeyDescription>Volume down</StyledKeyDescription>
                    <StyledKey>
                        <StyledKeyHint>D</StyledKeyHint>
                    </StyledKey>
                    <StyledKeyDescription>Download track</StyledKeyDescription>
                    <StyledKey>
                        <StyledKeyHint>F</StyledKeyHint>
                    </StyledKey>
                    <StyledKeyDescription>Toggle fullscreen</StyledKeyDescription>
                    <StyledKey>
                        <StyledKeyHint>A</StyledKeyHint>
                    </StyledKey>
                    <StyledKeyDescription>Toggle audio mode</StyledKeyDescription>
                    <StyledKey>
                        <StyledKeyHint>P</StyledKeyHint>
                    </StyledKey>
                    <StyledKeyDescription>Toggle picture-in-picture</StyledKeyDescription>
                </StyledKeyList>
                <Row style={{ "--justify-content": "flex-end" }}>
                    <Button type="button" variant="silent" onClick={() => setOpen(false)}>
                        Close
                    </Button>
                </Row>
            </DialogContent>
        </Dialog>
    );
}
