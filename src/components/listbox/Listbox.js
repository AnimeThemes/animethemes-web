import { useMedia } from "use-media";
import { ListboxNative, ListboxReach } from "components/listbox";

export function Listbox({
    // Either array, object or map. An array can also contain tuples.
    options,

    // Data binding.
    selectedValue,
    onSelect,

    // Adds a reset button to the list box once a non-default value has been selected.
    resettable = false,

    // Only used when resettable is true. The value to return to after a reset.
    defaultValue = null,

    disabled = false,
    ...props
}) {
    let optionsMap;

    if (options instanceof Map) {
        optionsMap = new Map(options);
    } else if (Array.isArray(options)) {
        optionsMap = new Map(
            options.map((option) =>
                Array.isArray(option)
                    ? [ option[0], option[1] ]
                    : [ option, option ]
            )
        );
    } else if (typeof options === "object" && !!options) {
        optionsMap = new Map(Object.entries(options));
    } else {
        optionsMap = new Map();
    }

    const isMobile = useMedia({ maxWidth: "720px" });

    if (isMobile) {
        return (
            <ListboxNative
                options={optionsMap}
                selectedValue={selectedValue}
                onSelect={onSelect}
                defaultValue={defaultValue}
                disabled={disabled}
                {...props}
            />
        );
    }

    return (
        <ListboxReach
            options={optionsMap}
            selectedValue={selectedValue}
            onSelect={onSelect}
            resettable={resettable}
            defaultValue={defaultValue}
            disabled={disabled}
            {...props}
        />
    );
}
