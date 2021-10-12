import { Text } from "components/text";
import { Listbox } from "components/listbox";
import { Flex } from "components/box";

export function SearchFilterSortBy({ options, value, setValue }) {
    return (
        <Flex flexDirection="column" alignItems="stretch" gapsColumn="0.5rem">
            <Text variant="h2">Sort by</Text>
            <Listbox
                options={options}
                selectedValue={value}
                onSelect={setValue}
                defaultValue={value}
            />
        </Flex>
    );
}
