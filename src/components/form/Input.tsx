import type { ComponentPropsWithoutRef, ComponentPropsWithRef } from "react";
import styled from "styled-components";

import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

import { Button } from "@/components/button/Button";
import { Icon } from "@/components/icon/Icon";
import { withColorTheme } from "@/styles/mixins";
import theme from "@/theme";

const StyledSearchInput = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;

    padding: 0.5rem 1rem;
    border-radius: 2rem;
    gap: 8px;

    background-color: ${theme.colors["solid-on-card"]};
    color: ${theme.colors["text-muted"]};

    &:focus-within {
        box-shadow: ${theme.shadows.low};

        ${withColorTheme("dark")`
            box-shadow: 0 0 0 2px ${theme.colors["text-primary"]};
        `}
    }
`;
const StyledInput = styled.input`
    width: 100%;
`;
const StyledResetButton = styled(Button).attrs({ variant: "silent", isCircle: true })`
    margin: -8px;

    &:hover {
        background-color: transparent;
        box-shadow: none;
    }
`;

interface InputProps extends Omit<ComponentPropsWithoutRef<typeof StyledSearchInput>, "onChange"> {
    value: string;
    onChange: (value: string) => void;
    resettable?: boolean;
    icon?: IconDefinition;
    inputProps?: ComponentPropsWithRef<typeof StyledInput>;
}

export function Input({ value, onChange, resettable = false, icon, inputProps = {}, ...props }: InputProps) {
    return (
        <StyledSearchInput {...props}>
            {icon && <Icon icon={icon} color="text-disabled" />}
            <StyledInput
                type="text"
                value={value}
                onChange={(event) => onChange && onChange(event.target.value)}
                {...inputProps}
            />
            {resettable && !!value && (
                <StyledResetButton>
                    <Icon icon={faXmark} onClick={() => onChange && onChange("")} />
                </StyledResetButton>
            )}
        </StyledSearchInput>
    );
}
