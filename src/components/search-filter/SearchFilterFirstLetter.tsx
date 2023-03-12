import { Text } from "components/text";
import { SearchFilter } from "components/search-filter";
import { Listbox2, Listbox2Option } from "components/listbox/Listbox2";

const letters = createLetters();

interface SearchFilterFirstLetterProps {
    value: string | null
    setValue: (newValue: string | null) => void
}

export function SearchFilterFirstLetter({ value, setValue }: SearchFilterFirstLetterProps) {
    return (
        <SearchFilter>
            <Text variant="h2">First Letter</Text>
            <Listbox2 value={value} onValueChange={setValue} defaultValue={null} resettable nullable highlightNonDefault>
                <Listbox2Option value={null} hidden>Any</Listbox2Option>
                {letters.map((letter) => (
                    <Listbox2Option key={letter} value={letter}>{letter}</Listbox2Option>
                ))}
            </Listbox2>
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
