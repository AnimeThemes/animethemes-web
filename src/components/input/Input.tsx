import styled from "styled-components";
import theme from "theme";
import { Icon } from "components/icon";
import { faTimes } from "@fortawesome/pro-solid-svg-icons";
import { Button } from "components/button";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { ComponentPropsWithoutRef, FormEvent } from "react";

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

        [data-theme="dark"] & {
            box-shadow: 0 0 0 2px ${theme.colors["text-primary"]};
        }
    }
`;
const StyledForm = styled.form`
    flex: 1;
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

interface InputProps extends ComponentPropsWithoutRef<typeof StyledSearchInput> {
    value: string
    onChange: (value: string) => void
    onSubmit?: (event: FormEvent<HTMLFormElement>) => void
    resettable?: boolean
    icon?: IconProp
    inputProps?: ComponentPropsWithoutRef<typeof StyledInput>
}

export function Input({
    value,
    onChange,
    onSubmit,
    resettable = false,
    icon,
    inputProps = {},
    ...props
}: InputProps) {
    return (
        <StyledSearchInput {...props}>
            {icon && (
                <Icon icon={icon} color="text-disabled"/>
            )}
            <StyledForm onSubmit={(event) => {
                event.preventDefault();
                if (onSubmit) {
                    onSubmit(event);
                }
            }}>
                <StyledInput
                    type="text"
                    value={value}
                    onChange={(event) => onChange && onChange(event.target.value)}
                    {...inputProps}
                />
            </StyledForm>
            {resettable && !!value && (
                <StyledResetButton>
                    <Icon icon={faTimes} onClick={() => onChange && onChange("")}/>
                </StyledResetButton>
            )}
        </StyledSearchInput>
    );
}
