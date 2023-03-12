import styled from "styled-components";
import { faCheck, faSort, faTimes } from "@fortawesome/pro-solid-svg-icons";
import { Button } from "components/button";
import theme from "theme";
import * as RadixSelect from "@radix-ui/react-select";
import { flipDown } from "styles/animations";
import { Icon } from "components/icon";
import { forwardRef } from "react";

// Radix' listbox can't handle null values, so we are giving it a fake null value.
const NULL_VALUE = "__NULL__";

const StyledListboxButton = styled(Button)`
    display: inline-flex;
    align-items: center;
    justify-content: space-between;

    white-space: nowrap;
    gap: 8px;

    &:focus {
        box-shadow: 0 0 0 2px ${theme.colors["text-primary"]};
    }
`;
const StyledListboxReset = styled.span`
    display: inline-block;
    isolation: isolate;
    margin: -8px;
    padding: 8px;
`;
const StyledListboxPopover = styled(RadixSelect.Portal)`
    z-index: ${theme.zIndices.menuPopover};

    min-width: max-content;
    padding: 0;
    border-radius: 8px;
    overflow: auto;

    background-color: ${theme.colors["solid"]};
    box-shadow: 0 0 0 2px ${theme.colors["text-primary"]}, ${theme.shadows.high};

    transform-origin: top;
    animation: ${flipDown} 200ms ease-out;

    // Revert CSS rules set by Radix UI which hide the native scrollbar.
    [data-radix-select-viewport] {
        scrollbar-width: revert;
        -ms-overflow-style: revert;
    }
    [data-radix-select-viewport]::-webkit-scrollbar {
        display: revert;
    }
`;
const StyledListboxList = styled(RadixSelect.Content)`
    width: var(--radix-select-trigger-width);
    max-height: calc(var(--radix-select-content-available-height) - 32px);
    padding: 8px 0;
`;
const StyledListboxOption = styled(RadixSelect.Item)`
    display: ${(props) => props.hidden ? "none" : "flex"};
    align-items: center;
    justify-content: space-between;

    padding: 8px 16px;
    gap: 8px;

    color: ${theme.colors["text-muted"]};
    cursor: pointer;

    &[data-highlighted] {
        background-color: ${theme.colors["solid-on-card"]};
        color: ${theme.colors["text"]};
        outline: none;
    }
    
    &[data-state="checked"] {
        color: ${theme.colors["text-primary"]};
    }
`;

type ListboxProps =
    Omit<RadixSelect.SelectProps, "value" | "defaultValue" | "onValueChange">
    & (PropsNullable | PropsNotNullable)
    & {
        resettable?: boolean;
        highlightNonDefault?: boolean;
    };

interface PropsNullable {
    nullable: true;
    value: string | null;
    onValueChange(newValue: string | null): void;
    defaultValue?: string | null;
}

interface PropsNotNullable {
    nullable?: false;
    value: string;
    onValueChange(newValue: string): void;
    defaultValue?: string;
}

export const Listbox2 = forwardRef<HTMLButtonElement, ListboxProps>(
    function Listbox({
        value,
        onValueChange,
        defaultValue,
        nullable,
        resettable,
        highlightNonDefault,
        children,
        ...props
    }, ref) {
        const radixValue = value === null ? NULL_VALUE : value;
        const radixOnValueChange = (newValue: string) => {
            if (nullable) {
                onValueChange(newValue === NULL_VALUE ? null : newValue);
            } else {
                onValueChange(newValue);
            }
        };
        const radixDefaultValue = defaultValue === null ? NULL_VALUE : defaultValue;

        return (
            <RadixSelect.Root value={radixValue} onValueChange={radixOnValueChange} defaultValue={radixDefaultValue} {...props}>
                <RadixSelect.Trigger asChild ref={ref}>
                    <StyledListboxButton variant={highlightNonDefault && value !== defaultValue ? "primary" : undefined}>
                        <RadixSelect.Value />
                        <RadixSelect.Icon>
                            {(resettable && radixDefaultValue && value !== defaultValue) ? (
                                <StyledListboxReset
                                    onClick={() => radixOnValueChange(radixDefaultValue)}
                                    onPointerDown={(event) => event.stopPropagation()}
                                >
                                    <Icon icon={faTimes}/>
                                </StyledListboxReset>
                            ) : (
                                <Icon icon={faSort} />
                            )}
                        </RadixSelect.Icon>
                    </StyledListboxButton>
                </RadixSelect.Trigger>
                <StyledListboxPopover>
                    <StyledListboxList position="popper" sideOffset={8}>
                        <RadixSelect.Viewport>{children}</RadixSelect.Viewport>
                    </StyledListboxList>
                </StyledListboxPopover>
            </RadixSelect.Root>
        );
    }
);

export interface ListboxOptionProps extends Omit<RadixSelect.SelectItemProps, "value"> {
    value: string | null;
}

export const Listbox2Option = forwardRef<HTMLDivElement, ListboxOptionProps>(
    function ListboxOption({ value, children, ...props }, ref) {
        const radixValue = value === null ? NULL_VALUE : value;

        return (
            <StyledListboxOption value={radixValue} {...props} ref={ref}>
                <RadixSelect.ItemText>{children}</RadixSelect.ItemText>
                <RadixSelect.ItemIndicator>
                    <Icon icon={faCheck} />
                </RadixSelect.ItemIndicator>
            </StyledListboxOption>
        );
    }
);
