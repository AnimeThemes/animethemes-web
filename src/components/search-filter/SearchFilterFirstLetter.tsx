import { Text } from "components/text";
import { Listbox } from "components/listbox";
import { SearchFilter } from "components/search-filter";

const letters = createLetters();

interface SearchFilterFirstLetterProps {
    value: string | null
    setValue: (newValue: string | null) => void
}

export function SearchFilterFirstLetter({ value, setValue }: SearchFilterFirstLetterProps) {
    return (
        <SearchFilter>
            <Text variant="h2">First Letter</Text>
            <Listbox value={value} onChange={setValue} resettable highlightNonDefault>
                <Listbox.Option value={null} hidden>Any</Listbox.Option>
                {letters.map((letter) => (
                    <Listbox.Option key={letter} value={letter}>{letter}</Listbox.Option>
                ))}
            </Listbox>
        </SearchFilter>
    );
}

function createLetters() {
    const letters = [];

    for (let letter = "A".charCodeAt(0); letter <= "Z".charCodeAt(0); letter++) {
        letters.push(String.fromCharCode(letter));
    }

    return letters;
}
