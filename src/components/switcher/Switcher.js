import styled from "styled-components";
import { LayoutGroup, motion } from "framer-motion";
import { Box } from "components/box";
import { Button } from "components/button";
import theme from "theme";
import { uniqueId as createUniqueId } from "lodash-es";
import { useMemo } from "react";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { Icon } from "components/icon";

const StyledSwitcher = styled(Box).attrs((props) => ({
    bg: props.bg || props.backgroundColor || theme.colors["solid"]
}))`
    display: flex;
    align-items: stretch;
    
    width: fit-content;
    border-radius: 1rem;
    white-space: nowrap;
    
    box-shadow: ${theme.shadows.low};
`;
const StyledButton = styled(Button)`
    position: relative;
    background-color: transparent;
    box-shadow: none;
    transition: 500ms;
    
    &:hover {
        background-color: transparent;
    }
`;
const StyledButtonBackground = styled(motion.div)`
    position: absolute;
    z-index: ${theme.zIndices.switcherButton};
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: ${theme.colors["solid-primary"]};
    border-radius: 2rem;
`;
const Top = styled.span`
    z-index: ${theme.zIndices.switcherText};
`;

export function Switcher({ items, selectedItem, onChange, children, ...props }) {
    const uniqueId = useMemo(createUniqueId, []);
    const itemsArray = Array.isArray(items)
        ? items.map((item) => ({ value: item, name: item }))
        : Object.entries(items).map(([value, name]) => ({ value, name }));

    function getButtonWrapper(item, selected, content) {
        if (children && typeof children === "function") {
            return children({ item, selected, content, Button: StyledButton });
        }

        return (
            <StyledButton
                key={item.value}
                variant={selected && "primary"}
                onClick={() => onChange(item.value)}
            >
                {content}
            </StyledButton>
        );
    }

    return (
        <StyledSwitcher {...props}>
            <LayoutGroup id={uniqueId}>
                {itemsArray.map((item) => {
                    if (item.value === null && selectedItem === null) {
                        // Don't show a clear button if nothing is selected
                        return null;
                    }

                    return getButtonWrapper(
                        item,
                        !!selectedItem && item.value === selectedItem,
                        item.value !== null ? (
                            <>
                                {selectedItem && item.value === selectedItem && (
                                    <StyledButtonBackground transition={{ duration: 0.250 }} layoutId="button-bg"/>
                                )}
                                <Top>{item.name}</Top>
                            </>
                        ) : (
                            <Icon icon={faTimes}/>
                        )
                    );
                })}
            </LayoutGroup>
        </StyledSwitcher>
    );
}
