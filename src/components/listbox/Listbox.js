import styled, { css } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faSort, faTimes } from "@fortawesome/free-solid-svg-icons";
import { Button } from "components/button";
import { Text } from "components/text";
import { useCallback, useRef, useState } from "react";
import { Collapse } from "components/utils";
import theme from "theme";

const StyledListbox = styled.div`
    display: inline-block;
`;
const StyledListboxButton = styled(Button)`
    display: flex;
    align-items: center;
    justify-content: space-between;

    width: 100%;
`;
const StyledListboxPopover = styled.div`
    position: absolute;
    
    margin-top: 0.5rem;
    padding: 0;
    border: 0;
    border-radius: 1rem;
    overflow: hidden;
    
    background-color: ${theme.colors["solid"]};
`;
const StyledListboxList = styled.ul`
    max-height: 10rem;
    margin: 0;
    padding: 0;
    list-style: none;
    overflow: auto;
    
    &:focus {
        outline: none;
    }
`;
const StyledListboxOption = styled.li`
    display: flex;
    align-items: center;
    justify-content: space-between;
    
    padding: 0.5rem 1rem;
    
    color: ${theme.colors["text-muted"]};
    
    &:hover, &:focus {
        background-color: ${theme.colors["solid-on-card"]};
        color: ${theme.colors["text"]};
        cursor: pointer;
    }
    
    ${(props) => props.selected && css`
        color: ${theme.colors["text-primary"]};
    `}
`;

export function Listbox({ options, defaultValue, nullLabel }) {
    const [selectedValue, setSelectedValue] = useState(defaultValue);
    const [showPopover, setShowPopover] = useState(false);
    const [buttonWidth, setButtonWidth] = useState(0);

    const buttonRef = useCallback((buttonNode) => {
        if (buttonNode !== null) {
            setButtonWidth(buttonNode.getBoundingClientRect().width);
        }
    }, []);
    const listRef = useRef(null);

    function handleButtonClick() {
        setShowPopover(true);
        listRef.current.focus();
    }

    function handleOptionClick(value) {
        setSelectedValue(value);
        setShowPopover(false);
    }

    function handleResetClick(event) {
        event.stopPropagation();
        setSelectedValue(null);
        setShowPopover(false);
    }

    return (
        <StyledListbox>
            <StyledListboxButton ref={buttonRef} active={selectedValue !== null} onClick={handleButtonClick} onMouseDown={(event) => event.preventDefault()}>
                <Text>{selectedValue !== null ? options[selectedValue] : nullLabel}</Text>
                {selectedValue !== null ? (
                    <FontAwesomeIcon icon={faTimes} fixedWidth onClick={handleResetClick}/>
                ) : (
                    <FontAwesomeIcon icon={faSort} fixedWidth/>
                )}
            </StyledListboxButton>
            <StyledListboxPopover style={{ width: buttonWidth }}>
                <Collapse collapse={!showPopover}>
                    <StyledListboxList ref={listRef} tabIndex={-1} onBlur={() => setShowPopover(false)}>
                        {Object.entries(options).map(([value, label]) => (
                            <StyledListboxOption key={value} selected={value === selectedValue} onClick={() => handleOptionClick(value)}>
                                <Text>{label}</Text>
                                {value === selectedValue && (
                                    <FontAwesomeIcon icon={faCheck} fixedWidth/>
                                )}
                            </StyledListboxOption>
                        ))}
                    </StyledListboxList>
                </Collapse>
            </StyledListboxPopover>
        </StyledListbox>
    );
}
