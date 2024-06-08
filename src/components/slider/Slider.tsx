import { forwardRef } from "react";
import styled from "styled-components";

import * as RadixSlider from "@radix-ui/react-slider";

import theme from "@/theme";

const StyledSlider = styled(RadixSlider.Root)`
    position: relative;
    display: flex;
    align-items: center;
    user-select: none;
    touch-action: none;
    width: 100px;
    height: 20px;
`;
const StyledTrack = styled(RadixSlider.Track)`
    background-color: ${theme.colors["solid-on-card"]};
    position: relative;
    flex-grow: 1;
    border-radius: 9999px;
    height: 4px;
`;
const StyledRange = styled(RadixSlider.Range)`
    position: absolute;
    background-color: ${theme.colors["text-disabled"]};
    border-radius: 9999px;
    height: 100%;
`;
const StyledThumb = styled(RadixSlider.Thumb)`
    display: block;
    width: 20px;
    height: 20px;
    background-color: ${theme.colors["text-disabled"]};
    box-shadow: ${theme.shadows.low};
    border-radius: 10px;
    cursor: pointer;

    &:hover {
        background-color: ${theme.colors["text-muted"]};
    }

    &:focus:focus-within {
        outline: none;
        box-shadow: 0 0 0 2px ${theme.colors["text-primary"]};
    }
`;

export const Slider = forwardRef<HTMLSpanElement, RadixSlider.SliderProps>(function Slider(props, ref) {
    const value = (props.value || props.defaultValue) ?? [];

    return (
        <StyledSlider {...props} ref={ref}>
            <StyledTrack>
                <StyledRange />
            </StyledTrack>
            {value.map((_, i) => (
                <StyledThumb key={i} />
            ))}
        </StyledSlider>
    );
});
