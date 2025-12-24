import type { ComponentPropsWithoutRef } from "react";
import styled from "styled-components";

import { faVolumeHigh, faVolumeLow, faVolumeXmark } from "@fortawesome/free-solid-svg-icons";

import { Row } from "@/components/box/Flex";
import { IconTextButton } from "@/components/button/IconTextButton";
import { Slider } from "@/components/slider/Slider";
import useSetting from "@/hooks/useSetting";
import { GlobalVolume, Muted } from "@/utils/settings";

const StyledRow = styled(Row)`
    align-self: stretch;
    align-items: center;
`;

const StyledSlider = styled(Slider)`
    opacity: 0;
    pointer-events: none;

    transition: opacity 250ms;

    ${StyledRow}:hover & {
        opacity: 1;
        pointer-events: revert;
    }
`;

export function VolumeControl(props: ComponentPropsWithoutRef<typeof StyledRow>) {
    const [volume, setVolume] = useSetting(GlobalVolume);
    const [muted, setMuted] = useSetting(Muted);

    let icon;
    if (muted || volume === 0) {
        icon = faVolumeXmark;
    } else if (volume > 0.5) {
        icon = faVolumeHigh;
    } else {
        icon = faVolumeLow;
    }

    return (
        <StyledRow style={{ "--gap": "8px" }} {...props}>
            <IconTextButton icon={icon} isCircle onClick={() => setMuted(!muted)} />
            <StyledSlider
                value={[volume]}
                onValueChange={([volume]) => setVolume(volume)}
                min={0}
                max={1}
                step={0.01}
            />
        </StyledRow>
    );
}
