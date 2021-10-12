import { Text } from "components/text";
import { Listbox } from "components/listbox";
import { Flex } from "components/box";

export function SearchFilterThemeType({ value, setValue }) {
    return (
        <Flex flexDirection="column" alignItems="stretch" gapsColumn="0.5rem">
            <Text variant="h2">Type</Text>
            <Listbox
                options={[
                    null,
                    "OP",
                    "ED"
                ]}
                selectedValue={value}
                onSelect={setValue}
                resettable
            />
        </Flex>
    );
}
