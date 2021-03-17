import styled from "styled-components";
import { Flex } from "components/box";
import { Button } from "components/button";
import theme from "theme";
import { AnimateSharedLayout, motion } from "framer-motion";

const StyledSwitcher = styled(Flex).attrs({
    flexInline: true,
    alignSelf: "center"
})`
    background-color: ${theme.colors["solid"]};
    box-shadow: ${theme.shadows.low};

    border-radius: 1rem;
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
    z-index: 1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: ${theme.colors["solid-primary"]};
    border-radius: 2rem;
`;
const Top = styled.span`
    z-index: 2;
`;

export function Switcher({ items, selectedItem, onChange, children, ...props }) {
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
            <AnimateSharedLayout>
                {itemsArray.map((item) => getButtonWrapper(
                    item,
                    !!selectedItem && item.value === selectedItem,
                    (
                        <>
                            {selectedItem && item.value === selectedItem && (
                                <StyledButtonBackground transition={{ duration: 0.250 }} layoutId="button-bg"/>
                            )}
                            <Top>{item.name}</Top>
                        </>
                    )
                ))}
            </AnimateSharedLayout>
        </StyledSwitcher>
    );
}
