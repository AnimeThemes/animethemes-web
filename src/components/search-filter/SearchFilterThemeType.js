import { Text } from "components/text";
import { Listbox } from "components/listbox";
import { Flex } from "components/box";

export function SearchFilterThemeType({ value, setValue }) {
    return (
        <Flex flexDirection="column" alignItems="stretch" gapsColumn="0.5rem">
            <Text variant="h2">Type</Text>
            <Listbox
                options={[
                    "OP",
                    "ED"
                ]}
                selectedValue={value}
                onSelect={setValue}
                nullLabel="Any"
            />
        </Flex>
    );
}
