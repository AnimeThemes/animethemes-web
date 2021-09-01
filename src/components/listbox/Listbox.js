import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faSort, faTimes } from "@fortawesome/free-solid-svg-icons";
import { Button } from "components/button";
import { Text } from "components/text";
import theme from "theme";
import { gapsRow } from "styles/mixins";
import { ListboxButton, ListboxInput, ListboxList, ListboxOption, ListboxPopover } from "@reach/listbox";
import "@reach/listbox/styles.css";

const StyledListbox = styled(ListboxInput)`
    display: inline-block;
`;
const StyledListboxButton = styled(Button).attrs({
    gapsRow: "0.5rem"
})`    
    display: flex;
    align-items: center;
    justify-content: space-between;

    width: 100%;
    border: none;
`;
const StyledListboxPopover = styled(ListboxPopover)`
    @keyframes flip-down {
        0% {
            opacity: 0;
            transform: perspective(1000px) rotateX(-45deg);
        }
        100% {
            opacity: 1;
            transform: perspective(1000px) rotateX(0deg);
        }
    }
    
    margin-top: 0.5rem;
    padding: 0;
    border: 0;
    border-radius: 1rem;
    overflow: hidden;
    
    background-color: ${theme.colors["solid"]};
    box-shadow: ${theme.shadows.high};
    
    transform-origin: top;
    will-change: transform, opacity;
    animation: flip-down 200ms ease-out;
    
    &:focus-within {
        outline: none;
        box-shadow: ${theme.shadows.high};
    }
`;
const StyledListboxList = styled(ListboxList)`
    max-height: 33vh;
    margin: 0;
    padding: 0;
    list-style: none;
    overflow: auto;
`;
const StyledListboxOption = styled(ListboxOption)`
    display: flex;
    align-items: center;
    justify-content: space-between;

    padding: 0.5rem 1rem;
    ${gapsRow("0.5rem")}

    color: ${(props) => theme.colors[props.selected ? "text-primary" : "text-muted"]};

    &:hover, &[data-current-nav] {
        background-color: ${theme.colors["solid-on-card"]};
        color: ${(props) => theme.colors[props.selected ? "text-primary" : "text"]};
        cursor: pointer;
    }
`;

export function Listbox({ options, nullLabel, selectedValue, onSelect, noReset, disabled, defaultValue, ...props }) {
    function handleResetClick(event) {
        event.stopPropagation();
        if (!disabled) {
            onSelect(null);
        }
    }

    return (
        <StyledListbox
            // Reach UI listbox can't handle null values so we use an empty string instead
            value={selectedValue || ""}
            onChange={onSelect}
            {...props}
        >
            <StyledListboxButton
                as={ListboxButton}
                variant={selectedValue !== null && selectedValue !== defaultValue && "primary"}
                disabled={disabled}
            >
                <Text>{selectedValue !== null ? selectedValue : nullLabel}</Text>
                {(selectedValue !== null && !noReset) ? (
                    <FontAwesomeIcon
                        icon={faTimes}
                        fixedWidth
                        onMouseDown={handleResetClick}
                    />
                ) : (
                    <FontAwesomeIcon icon={faSort} fixedWidth/>
                )}
            </StyledListboxButton>
            <StyledListboxPopover>
                <StyledListboxList>
                    {options.map((value) => (
                        <StyledListboxOption
                            key={value}
                            selected={value === selectedValue}
                            value={value}
                        >
                            <Text>{value}</Text>
                            {value === selectedValue && (
                                <FontAwesomeIcon icon={faCheck} fixedWidth/>
                            )}
                        </StyledListboxOption>
                    ))}
                </StyledListboxList>
            </StyledListboxPopover>
        </StyledListbox>
    );
}
