import * as RadixSwitch from "@radix-ui/react-switch";
import styled from "styled-components";
import theme from "theme";
import { withColorTheme } from "styles/mixins";

const StyledSwitch = styled(RadixSwitch.Root)`
    width: 50px;
    height: 25px;
    background-color: ${theme.colors["solid-on-card"]};
    border-radius: 9999px;
    position: relative;
    box-shadow: 0 2px 10px var(--blackA7);
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);

    &:focus {
        box-shadow: ${theme.shadows.low};

        ${withColorTheme("dark")`
            box-shadow: 0 0 0 2px ${theme.colors["text-primary"]};
        `}
    }
`;

const StyledSwitchThumb = styled(RadixSwitch.Thumb)`
    display: block;
    width: 25px;
    height: 25px;
    background-color: ${theme.colors["text-disabled"]};
    border-radius: 9999px;
    transition: transform 250ms, background-color 250ms;
    will-change: transform;
    
    &[data-state='checked'] {
        transform: translateX(25px);
        background-color: ${theme.colors["text-primary"]};
    }
`;

interface Props extends RadixSwitch.SwitchProps {
    isChecked: boolean;
    onCheckedChange(isChecked: boolean): void;
}

export default function Switch({ isChecked, onCheckedChange, ...props }: Props) {
    return (
        <StyledSwitch checked={isChecked} onCheckedChange={onCheckedChange} {...props}>
            <StyledSwitchThumb />
        </StyledSwitch>
    );
}
