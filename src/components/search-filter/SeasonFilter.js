import { Text } from "components/text";
import { Listbox } from "components/listbox";
import { Flex } from "components/box";

export function SeasonFilter({ value, setValue }) {
    return (
        <Flex flexDirection="column" alignItems="stretch" gapsColumn="0.5rem">
            <Text variant="h2">Season</Text>
            <Listbox
                options={[
                    "Winter",
                    "Spring",
                    "Summer",
                    "Fall"
                ]}
                selectedValue={value}
                onSelect={setValue}
                nullLabel="Any"
            />
        </Flex>
    );
}
