import styled from "styled-components";
import { LayoutGroup, motion } from "framer-motion";
import theme from "theme";
import { uniqueId as createUniqueId } from "lodash-es";
import { createContext, forwardRef, useContext, useMemo } from "react";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { Icon } from "components/icon";

const SwitcherContext = createContext();

const StyledSwitcher = styled.div`
    display: flex;
    align-items: stretch;
    
    width: fit-content;
    border-radius: 2rem;
    white-space: nowrap;
    
    background-color: ${theme.colors["solid"]};
    box-shadow: ${theme.shadows.low};
`;
const StyledButton = styled.button`
    --color: ${theme.colors["text-muted"]};
    
    position: relative;
    
    display: inline-flex;
    align-items: center;
    justify-content: center;

    padding: ${(props) => props.isCircle ? "8px" : "8px 16px"};
    aspect-ratio: ${(props) => props.isCircle && "1 / 1"};
    
    font-size: 0.9rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1rem;
    cursor: pointer;
    color: var(--color);
    
    transition: color 500ms;
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
const StyledTop = styled.span`
    z-index: ${theme.zIndices.switcherText};
`;

export function Switcher({ selectedItem, onChange, children, ...props }) {
    const uniqueId = useMemo(createUniqueId, []);

    const context = useMemo(() => ({ selectedItem, select: onChange }), [onChange, selectedItem]);

    return (
        <StyledSwitcher {...props}>
            <SwitcherContext.Provider value={context}>
                <LayoutGroup id={uniqueId}>
                    {children}
                </LayoutGroup>
            </SwitcherContext.Provider>
        </StyledSwitcher>
    );
}

Switcher.Option = forwardRef(function SwitcherItem({ children, value, ...props }, ref) {
    const context = useContext(SwitcherContext);
    const isSelected = context.selectedItem === value;

    return (
        <StyledButton
            style={{ "--color": isSelected && theme.colors["text-on-primary"] }}
            onClick={() => context.select(value)}
            ref={ref}
            {...props}
        >
            {isSelected && (
                <StyledButtonBackground
                    layout
                    layoutId="button-bg"
                    layoutDependency={value}
                    transition={{ duration: 0.250 }}
                />
            )}
            <StyledTop>{children}</StyledTop>
        </StyledButton>
    );
});

Switcher.Reset = forwardRef(function SwitcherReset(props, ref) {
    const context = useContext(SwitcherContext);

    if (context.selectedItem === null) {
        // Don't show a clear button if nothing is selected
        return null;
    }

    return (
        <StyledButton
            style={{ "--color": theme.colors["text-disabled"] }}
            isCircle
            onClick={() => context.select(null)}
            ref={ref}
            {...props}
        >
            <Icon icon={faTimes}/>
        </StyledButton>
    );
});
