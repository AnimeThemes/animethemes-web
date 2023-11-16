import { forwardRef } from "react";
import * as RadixSlider from "@radix-ui/react-slider";
import styled from "styled-components";
import theme from "theme";

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
    width: 16px;
    height: 16px;
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

const StyledThumbHover = styled.div`
    position: absolute;
    top: -26px;
    left: 50%;
    padding: 2px 4px;
    border: 1px solid ${theme.colors["text-disabled"]};
    border-radius: 4px;
    font-size: 0.7rem;
    color: ${theme.colors["text-disabled"]};

    background-color: ${theme.colors["solid"]};
    transform: translateX(-50%);
    
    display: none;
    
    ${StyledThumb}:hover & {
        display: block;
    }
`;

export const Slider = forwardRef<HTMLSpanElement, RadixSlider.SliderProps>(
    function Slider(props, ref) {
        const value = (props.value || props.defaultValue) ?? [];

        return (
            <StyledSlider {...props} ref={ref}>
                <StyledTrack>
                    <StyledRange />
                </StyledTrack>
                
                {value.map((_, i) => (
                    <StyledThumb key={i} >
                        <StyledThumbHover>{Math.round(_*100)}%</StyledThumbHover>
                    </StyledThumb>
                ))}
            </StyledSlider>
        );
    }
);