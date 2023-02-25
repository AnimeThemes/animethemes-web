import styled from "styled-components";
import { LayoutGroup, m } from "framer-motion";
import theme from "theme";
import { uniqueId as createUniqueId } from "lodash-es";
import type { ComponentPropsWithoutRef, ComponentPropsWithRef, ReactNode } from "react";
import { createContext, useContext, useMemo } from "react";
import { faTimes } from "@fortawesome/pro-solid-svg-icons";
import { Icon } from "components/icon";
import { withHover } from "styles/mixins";

interface SwitcherContextValue {
    selectedItem: string | null
    select?: (value: string | null) => void
}

const SwitcherContext = createContext<SwitcherContextValue>({
    selectedItem: null,
    select: () => { /* Do nothing. */ }
});

const StyledSwitcher = styled.div`
    display: flex;
    align-items: stretch;
    
    width: fit-content;
    border-radius: 2rem;
    white-space: nowrap;
    
    background-color: ${theme.colors["solid"]};
    box-shadow: ${theme.shadows.low};
`;

interface StyledButtonProps {
    $isCircle?: boolean
    $isSelected?: boolean
}

const StyledButton = styled.button<StyledButtonProps>`    
    position: relative;
    
    display: inline-flex;
    align-items: center;
    justify-content: center;

    padding: ${(props) => props.$isCircle ? "8px" : "8px 16px"};
    aspect-ratio: ${(props) => props.$isCircle && "1 / 1"};
    
    font-size: 0.9rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1rem;
    cursor: pointer;
    color: ${(props) => props.$isSelected ? theme.colors["text-on-primary"] : theme.colors["text-muted"]};
    
    transition: color 500ms;

    ${withHover`
        color: ${(props) => props.$isSelected ? theme.colors["text-on-primary"] : theme.colors["text"]};;
        transition-duration: 250ms;
    `}
`;

const StyledButtonBackground = styled(m.div)`
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

type SwitcherProps<T extends string | null> = ComponentPropsWithoutRef<typeof StyledSwitcher> & {
    selectedItem: T
    onChange?: (value: T) => void
    children: ReactNode
};

export function Switcher<T extends string | null>({ selectedItem, onChange, children, ...props }: SwitcherProps<T>) {
    const uniqueId = useMemo(createUniqueId, []);

    const context = useMemo(() => ({
        selectedItem,
        select: onChange as (value: string | null) => void
    }), [onChange, selectedItem]);

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

interface SwitcherOptionProps extends ComponentPropsWithRef<typeof StyledButton> {
    children: ReactNode
    value: string
}

export function SwitcherOption({ children, value, ...props }: SwitcherOptionProps) {
    const context = useContext(SwitcherContext);
    const isSelected = context.selectedItem === value;

    return (
        <StyledButton
            $isSelected={isSelected}
            onClick={() => context.select?.(value)}
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
}

interface SwitcherResetProps extends ComponentPropsWithRef<typeof StyledButton> {}

export function SwitcherReset(props: SwitcherResetProps) {
    const context = useContext(SwitcherContext);

    if (context.selectedItem === null) {
        // Don't show a clear button if nothing is selected
        return null;
    }

    return (
        <StyledButton
            style={{ "--color": theme.colors["text-disabled"] }}
            $isCircle
            onClick={() => context.select?.(null)}
            {...props}
        >
            <Icon icon={faTimes}/>
        </StyledButton>
    );
}
