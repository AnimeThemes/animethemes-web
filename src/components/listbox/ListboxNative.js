import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort } from "@fortawesome/free-solid-svg-icons";
import { Button } from "components/button";
import { Text } from "components/text";
import theme from "theme";

const StyledListbox = styled.div`
    display: inline-block;
    position: relative;
`;
const StyledListboxButton = styled(Button).attrs({
    gapsRow: "0.5rem"
})`    
    display: flex;
    align-items: center;
    justify-content: space-between;

    width: 100%;
    white-space: nowrap;
`;
const StyledSelect = styled.select`
    position: absolute;
    opacity: 0;
    
    width: 100%;
    height: 100%;
    
    background-color: ${theme.colors["solid"]};
    color: ${theme.colors["text-muted"]};
`;

export function ListboxNative({ options, selectedValue, onSelect, defaultValue, disabled, ...props }) {
    const selectedLabel = options.get(selectedValue);

    return (
        <StyledListbox
            {...props}
        >
            <StyledSelect
                value={selectedValue || ""}
                onChange={(event) => onSelect(event.target.value || null)}
            >
                {[ ...options.entries() ].map(([ value, label ]) => (
                    <option
                        key={value}
                        value={value || ""}
                    >
                        {label}
                    </option>
                ))}
            </StyledSelect>
            <StyledListboxButton
                variant={selectedValue !== null && selectedValue !== defaultValue ? "primary" : undefined}
                disabled={disabled}
            >
                <Text>{selectedLabel}</Text>
                <FontAwesomeIcon icon={faSort} fixedWidth/>
            </StyledListboxButton>
        </StyledListbox>
    );
}
