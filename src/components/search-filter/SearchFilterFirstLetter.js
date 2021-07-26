import { Text } from "components/text";
import { Listbox } from "components/listbox";
import { Flex } from "components/box";

const letters = createLetters();

export function SearchFilterFirstLetter({ value, setValue }) {
    return (
        <Flex flexDirection="column" alignItems="stretch" gapsColumn="0.5rem">
            <Text variant="h2">First Letter</Text>
            <Listbox
                options={letters}
                selectedValue={value}
                onSelect={setValue}
                nullLabel="Any"
            />
        </Flex>
    );
}

function createLetters() {
    const letters = [];

    for (let letter = "A".charCodeAt(0); letter <= "Z".charCodeAt(0); letter++) {
        letters.push(String.fromCharCode(letter));
    }

    return letters;
}
