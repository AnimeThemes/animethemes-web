import styled from "styled-components";
import { faSort, faTimes } from "@fortawesome/free-solid-svg-icons";
import { Button } from "components/button";
import { Text } from "components/text";
import theme from "theme";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { Icon } from "components/icon";

const NULL_VALUE = "__NULL__";

const ListboxContext = createContext();

const StyledListbox = styled.div`
    display: inline-block;
    position: relative;
`;
const StyledListboxButton = styled(Button)`    
    display: flex;
    align-items: center;
    justify-content: space-between;

    width: 100%;
    white-space: nowrap;
    gap: 8px;
`;
const StyledListboxReset = styled.span`
    display: inline-block;
    isolation: isolate;
    margin: -8px;
    padding: 8px;
`;
const StyledSelect = styled.select`
    position: absolute;
    opacity: 0;
    
    width: 100%;
    height: 100%;
    
    background-color: ${theme.colors["solid"]};
    color: ${theme.colors["text-muted"]};
`;

export function ListboxNative({ children, value, onChange, resettable, defaultValue, highlightNonDefault, disabled, ...props }) {
    const [valueLabels, setValueLabels] = useState(() => new Map());

    const contextValue = {
        setLabel: useCallback((value, label) => {
            setValueLabels((oldMap) => {
                const newMap = new Map(oldMap);
                newMap.set(value, label);
                return newMap;
            });
        }, []),
        removeLabel: useCallback((value) => {
            setValueLabels((oldMap) => {
                const newMap = new Map(oldMap);
                newMap.delete(value);
                return newMap;
            });
        }, [])
    };

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
        <StyledListbox {...props}>
            <StyledSelect
                value={value ?? NULL_VALUE}
                onChange={(event) => handleChange(event.target.value)}
            >
                <ListboxContext.Provider value={contextValue}>
                    {children}
                </ListboxContext.Provider>
            </StyledSelect>
            <StyledListboxButton
                variant={highlightNonDefault && value !== defaultValue ? "primary" : undefined}
                disabled={disabled}
            >
                <Text>{valueLabels.get(value)}</Text>
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
        </StyledListbox>
    );
}

ListboxNative.Option = function ListboxNativeOption({ value, children }) {
    const { setLabel, removeLabel } = useContext(ListboxContext);

    useEffect(() => {
        setLabel(value, children);

        return () => removeLabel(value);
    }, [children, removeLabel, setLabel, value]);

    return (
        <option value={value ?? NULL_VALUE}>
            {children}
        </option>
    );
};
