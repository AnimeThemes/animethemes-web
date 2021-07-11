import styled, { css } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faSort, faTimes } from "@fortawesome/free-solid-svg-icons";
import { Button } from "components/button";
import { Text } from "components/text";
import { useEffect, useRef, useState } from "react";
import theme from "theme";
import { Box } from "components/box";
import { AnimatePresence, motion } from "framer-motion";
import useResizeObserver from "@react-hook/resize-observer";

const StyledListbox = styled(Box)`
    display: inline-block;
`;
const StyledListboxButton = styled(Button)`
    display: flex;
    align-items: center;
    justify-content: space-between;

    width: 100%;
`;
const StyledListboxPopover = styled(motion.div)`
    position: absolute;
    
    margin-top: 0.5rem;
    padding: 0;
    border: 0;
    border-radius: 1rem;
    overflow: hidden;
    
    will-change: transform, opacity;
    
    background-color: ${theme.colors["solid"]};
    box-shadow: ${theme.shadows.high};
    
    transition: none;
`;
const StyledListboxList = styled.ul`
    max-height: 33vh;
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

export function Listbox({ options, nullLabel, selectedValue, onSelect, noReset, disabled, defaultValue, ...props }) {
    const [showPopover, setShowPopover] = useState(false);
    const [buttonWidth, setButtonWidth] = useState(0);

    const buttonRef = useRef(null);
    const listRef = useRef(null);

    useResizeObserver(buttonRef, (entry) => setButtonWidth(entry.target.getBoundingClientRect().width));

    useEffect(() => {
        if (showPopover) {
            listRef.current.focus();
        }
    }, [ showPopover ]);

    function handleButtonClick() {
        if (!disabled) {
            setShowPopover(true);
        }
    }

    function handleOptionClick(value) {
        if (!disabled) {
            onSelect(value);
            setShowPopover(false);
        }
    }

    function handleResetClick(event) {
        event.stopPropagation();
        if (!disabled) {
            onSelect(null);
            setShowPopover(false);
        }
    }

    return (
        <StyledListbox {...props}>
            <StyledListboxButton
                ref={buttonRef}
                variant={selectedValue !== null && selectedValue !== defaultValue && "primary"}
                onClick={handleButtonClick}
                onMouseDown={(event) => event.preventDefault()}
                disabled={disabled}
            >
                <Text>{selectedValue !== null ? selectedValue : nullLabel}</Text>
                {(selectedValue !== null && !noReset) ? (
                    <FontAwesomeIcon icon={faTimes} fixedWidth onClick={handleResetClick}/>
                ) : (
                    <FontAwesomeIcon icon={faSort} fixedWidth/>
                )}
            </StyledListboxButton>
            <AnimatePresence>
                {showPopover && (
                    <StyledListboxPopover
                        style={{ width: buttonWidth }}
                        initial={{ rotateX: -45, originY: 0, transformPerspective: 1000 }}
                        animate={{ rotateX: 0 }}
                        exit={{ rotateX: -45, opacity: 0 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                    >
                        <StyledListboxList ref={listRef} tabIndex={-1} onBlur={() => setShowPopover(false)}>
                            {options.map((value) => (
                                <StyledListboxOption key={value} selected={value === selectedValue} onClick={() => handleOptionClick(value)}>
                                    <Text>{value}</Text>
                                    {value === selectedValue && (
                                        <FontAwesomeIcon icon={faCheck} fixedWidth/>
                                    )}
                                </StyledListboxOption>
                            ))}
                        </StyledListboxList>
                    </StyledListboxPopover>
                )}
            </AnimatePresence>
        </StyledListbox>
    );
}
