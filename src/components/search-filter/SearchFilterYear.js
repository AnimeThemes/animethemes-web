import { Text } from "components/text";
import { Listbox } from "components/listbox";
import { Flex } from "components/box";

export function SearchFilterYear({ value, setValue }) {
    const yearList = [ 2021, 2020, 2019 ];

    return (
        <Flex flexDirection="column" alignItems="stretch" gapsColumn="0.5rem">
            <Text variant="h2">Year</Text>
            <Listbox
                options={[
                    null,
                    ...yearList
                ]}
                selectedValue={value}
                onSelect={setValue}
                resettable
            />
        </Flex>
    );
}
