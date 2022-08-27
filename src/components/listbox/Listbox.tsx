import { ListboxCustom, ListboxNative } from "components/listbox";
import theme from "theme";
import type { ReactNode } from "react";
import { createContext, useContext } from "react";
import useMediaQuery from "hooks/useMediaQuery";

const ListboxContext = createContext({
    isMobile: false
});

export interface ListboxProps<T extends string | null> {
    children: ReactNode
    value: T
    onChange: (newValue: T) => void
    resettable?: boolean
    defaultValue?: T | null
    highlightNonDefault?: boolean
    disabled?: boolean
}

export function Listbox<T extends string | null>({
    value,
    onChange,

    // Adds a reset button to the list box once a non-default value has been selected.
    resettable = false,

    // The value to return to after a reset.
    defaultValue = null,

    // Highlights the listbox if an option other than defaultValue is selected.
    highlightNonDefault = false,

    disabled = false,
    ...props
}: ListboxProps<T>) {
    const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.mobileMax})`);

    if (isMobile) {
        return (
            <ListboxContext.Provider value={{ isMobile }}>
                <ListboxNative
                    value={value}
                    onChange={onChange}
                    resettable={resettable}
                    defaultValue={defaultValue}
                    highlightNonDefault={highlightNonDefault}
                    disabled={disabled}
                    {...props}
                />
            </ListboxContext.Provider>
        );
    }

    return (
        <ListboxContext.Provider value={{ isMobile }}>
            <ListboxCustom
                value={value}
                onChange={onChange}
                resettable={resettable}
                defaultValue={defaultValue}
                highlightNonDefault={highlightNonDefault}
                disabled={disabled}
                {...props}
            />
        </ListboxContext.Provider>
    );
}

export interface ListboxOptionProps {
    value?: string | null
    children: string
    hidden?: boolean
}

Listbox.Option = function ListboxOption(props: ListboxOptionProps) {
    const { isMobile } = useContext(ListboxContext);

    if (isMobile) {
        return <ListboxNative.Option {...props}/>;
    }

    return <ListboxCustom.Option {...props}/>;
};
