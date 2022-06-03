import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faSort, faTimes } from "@fortawesome/pro-solid-svg-icons";
import { Button } from "components/button";
import { Text } from "components/text";
import theme from "theme";
import {
    ListboxButton,
    ListboxInput,
    ListboxList,
    ListboxOption,
    ListboxPopover,
    useListboxContext,
} from "@reach/listbox";
import { flipDown } from "styles/animations";
import { Icon } from "components/icon";

// ReachUI's listbox can't handle null values, so we are giving it a fake null value.
// The caveat is, that we can't use this value normally, thus it's obscure name.
const NULL_VALUE = "__NULL__";

const StyledListbox = styled(ListboxInput)`
    display: inline-block;
`;
const StyledListboxButton = styled(Button)`    
    display: flex;
    align-items: center;
    justify-content: space-between;

    width: 100%;
    white-space: nowrap;
    gap: 8px;

    &[aria-expanded="true"] {
        box-shadow: 0 0 0 2px ${theme.colors["text-primary"]};
    }
`;
const StyledListboxReset = styled.span`
    display: inline-block;
    isolation: isolate;
    margin: -8px;
    padding: 8px;
`;
const StyledListboxPopover = styled(ListboxPopover)`
    z-index: ${theme.zIndices.menuPopover};

    min-width: max-content;
    margin-top: 0.5rem;
    padding: 0;
    border-radius: 0.5rem;
    overflow: hidden;

    background-color: ${theme.colors["solid"]};
    box-shadow: 0 0 0 2px ${theme.colors["text-primary"]}, ${theme.shadows.high};

    transform-origin: top;
    animation: ${flipDown} 200ms ease-out;
`;
const StyledListboxList = styled(ListboxList)`
    max-height: 33vh;
    margin: 0;
    padding: 0.5rem 0;
    list-style: none;
    overflow: auto;
`;
const StyledListboxOption = styled(ListboxOption)`
    display: ${(props) => props.hidden ? "none" : "flex"};
    align-items: center;
    justify-content: space-between;

    padding: 0.5rem 1rem;
    gap: 8px;

    color: ${theme.colors["text-muted"]};
    cursor: pointer;

    &[data-current-nav] {
        background-color: ${theme.colors["solid-on-card"]};
        color: ${theme.colors["text"]};
    }
    
    &[data-current-selected] {
        color: ${theme.colors["text-primary"]};
    }
`;

export function ListboxCustom({ children, value, onChange, resettable, defaultValue, highlightNonDefault, disabled, ...props }) {
    function handleChange(newValue) {
        if (newValue === NULL_VALUE) {
            onChange(null);
        } else{
            onChange(newValue);
        }
    }

    function handleResetClick() {
        if (!disabled) {
            onChange(defaultValue);
        }
    }

    function stopPropagation(event) {
        event.stopPropagation();
    }

    return (
        <StyledListbox
            value={value ?? NULL_VALUE}
            onChange={handleChange}
            {...props}
        >
            {({ valueLabel }) => (
                <>
                    <StyledListboxButton
                        forwardedAs={ListboxButton}
                        variant={highlightNonDefault && value !== defaultValue ? "primary" : undefined}
                        disabled={disabled}
                    >
                        <Text>{valueLabel}</Text>
                        {(resettable && value !== defaultValue) ? (
                            <StyledListboxReset
                                onClick={handleResetClick}
                                onMouseDown={stopPropagation}
                            >
                                <Icon icon={faTimes}/>
                            </StyledListboxReset>
                        ) : (
                            <Icon icon={faSort}/>
                        )}
                    </StyledListboxButton>
                    <StyledListboxPopover>
                        <StyledListboxList>
                            {children}
                        </StyledListboxList>
                    </StyledListboxPopover>
                </>
            )}
        </StyledListbox>
    );
}

ListboxCustom.Option = function ListboxCustomOption({ value, children, hidden = false }) {
    const context = useListboxContext();

    if (!context) {
        return null;
    }

    return (
        <StyledListboxOption value={value ?? NULL_VALUE} hidden={hidden}>
            <Text>{children}</Text>
            {value === context.value && (
                <FontAwesomeIcon icon={faCheck} fixedWidth/>
            )}
        </StyledListboxOption>
    );
};
