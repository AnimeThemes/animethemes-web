import { useMedia } from "use-media";
import { ListboxNative, ListboxReach } from "components/listbox";

export function Listbox({
    // An array of options. An option should be a string and is also used as the label.
    options,

    // Data binding.
    selectedValue,
    onSelect,

    // Adds a reset button to the list box once a non-default value has been selected.
    resettable = false,

    // Only used when resettable is true. The value to return to after a reset.
    defaultValue = null,

    // If your options include null you can change how it's displayed.
    nullValue = "Any",

    disabled = false,
    ...props
}) {
    const isMobile = useMedia({ maxWidth: "720px" });

    if (isMobile) {
        return (
            <ListboxNative
                options={options}
                selectedValue={selectedValue}
                onSelect={onSelect}
                defaultValue={defaultValue}
                nullValue={nullValue}
                disabled={disabled}
                {...props}
            />
        );
    }

    return (
        <ListboxReach
            options={options}
            selectedValue={selectedValue}
            onSelect={onSelect}
            resettable={resettable}
            defaultValue={defaultValue}
            nullValue={nullValue}
            disabled={disabled}
            {...props}
        />
    );
}
