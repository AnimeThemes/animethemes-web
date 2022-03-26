import { ListboxCustom, ListboxNative } from "components/listbox";
import theme from "theme";
import { createContext, useContext } from "react";
import useMediaQuery from "hooks/useMediaQuery";

const ListboxContext = createContext();

export function Listbox({
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
}) {
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

Listbox.Option = function ListboxOption(props) {
    const { isMobile } = useContext(ListboxContext);

    if (isMobile) {
        return <ListboxNative.Option {...props}/>;
    }

    return <ListboxCustom.Option {...props}/>;
};
