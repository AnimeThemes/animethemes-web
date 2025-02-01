import { createContext, useContext, useMemo } from "react";
import type { ComponentPropsWithoutRef, ComponentPropsWithRef, ReactNode } from "react";
import styled from "styled-components";

import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { Slot, Slottable } from "@radix-ui/react-slot";
import { uniqueId as createUniqueId } from "lodash-es";
import { LayoutGroup, m } from "motion/react";

import { Solid } from "@/components/box/Solid";
import { Icon } from "@/components/icon/Icon";
import { NestableSlot, NestableSlottable } from "@/components/utils/NestableSlot";
import { withHover } from "@/styles/mixins";
import theme from "@/theme";

interface SwitcherContextValue {
    selectedItem: string | null;
    select?: (value: string | null) => void;
}

const SwitcherContext = createContext<SwitcherContextValue>({
    selectedItem: null,
    select: () => {
        /* Do nothing. */
    },
});

const StyledSwitcher = styled.div`
    display: flex;
    align-items: stretch;

    width: fit-content;
    border-radius: 2rem;
    white-space: nowrap;

    background-color: ${theme.colors["solid"]};
    box-shadow: ${theme.shadows.low};
    isolation: isolate;

    ${Solid} & {
        background-color: ${theme.colors["solid-on-card"]};
    }
`;

interface StyledButtonProps {
    $isCircle?: boolean;
    $isSelected?: boolean;
}

const StyledButton = styled.button<StyledButtonProps>`
    position: relative;

    display: inline-flex;
    align-items: center;
    justify-content: center;

    padding: ${(props) => (props.$isCircle ? "8px" : "8px 16px")};
    aspect-ratio: ${(props) => props.$isCircle && "1 / 1"};

    font-size: 0.9rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1rem;
    cursor: pointer;
    color: ${(props) => (props.$isSelected ? theme.colors["text-on-primary"] : theme.colors["text-muted"])};

    transition: color 500ms;

    ${withHover<StyledButtonProps>`
        color: ${(props) => (props.$isSelected ? theme.colors["text-on-primary"] : theme.colors["text"])};;
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

type SwitcherProps<T extends string | null> = Omit<ComponentPropsWithoutRef<typeof StyledSwitcher>, "onChange"> & {
    selectedItem: T;
    onChange?: (value: T) => void;
    children: ReactNode;
};

export function Switcher<T extends string | null>({ selectedItem, onChange, children, ...props }: SwitcherProps<T>) {
    const uniqueId = useMemo(createUniqueId, []);

    const context = useMemo(
        () => ({
            selectedItem,
            select: onChange as (value: string | null) => void,
        }),
        [onChange, selectedItem],
    );

    return (
        <StyledSwitcher {...props}>
            <SwitcherContext.Provider value={context}>
                <LayoutGroup id={uniqueId}>{children}</LayoutGroup>
            </SwitcherContext.Provider>
        </StyledSwitcher>
    );
}

interface SwitcherOptionProps extends ComponentPropsWithRef<typeof StyledButton> {
    value: string;
    asChild?: boolean;
}

export function SwitcherOption({ value, asChild, children, ...props }: SwitcherOptionProps) {
    const context = useContext(SwitcherContext);
    const isSelected = context.selectedItem === value;

    return (
        <StyledButton
            as={asChild ? NestableSlot : "button"}
            type={asChild ? undefined : "button"}
            $isSelected={isSelected}
            onClick={() => context.select?.(value)}
            {...props}
        >
            <NestableSlottable child={children}>
                {(child) => (
                    <>
                        {isSelected && (
                            <StyledButtonBackground
                                layout
                                layoutId="button-bg"
                                layoutDependency={value}
                                transition={{ duration: 0.25 }}
                            />
                        )}
                        <StyledTop>{child}</StyledTop>
                    </>
                )}
            </NestableSlottable>
        </StyledButton>
    );
}

interface SwitcherResetProps extends ComponentPropsWithRef<typeof StyledButton> {
    asChild?: boolean;
}

export function SwitcherReset({ asChild, children, ...props }: SwitcherResetProps) {
    const context = useContext(SwitcherContext);

    if (context.selectedItem === null) {
        // Don't show a clear button if nothing is selected
        return null;
    }

    return (
        <StyledButton
            as={asChild ? Slot : "button"}
            style={{ "--color": theme.colors["text-disabled"] }}
            $isCircle
            onClick={() => context.select?.(null)}
            {...props}
        >
            <Icon icon={faXmark} />
            <Slottable>{children}</Slottable>
        </StyledButton>
    );
}
