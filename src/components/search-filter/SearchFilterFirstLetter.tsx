import { Listbox, ListboxOption } from "@/components/listbox/Listbox";
import { SearchFilter } from "@/components/search-filter/SearchFilter";
import { Text } from "@/components/text/Text";

const letters = createLetters();

interface SearchFilterFirstLetterProps {
    value: string | null
    setValue: (newValue: string | null) => void
}

export function SearchFilterFirstLetter({ value, setValue }: SearchFilterFirstLetterProps) {
    return (
        <SearchFilter>
            <Text variant="h2">First Letter</Text>
            <Listbox value={value} onValueChange={setValue} defaultValue={null} resettable nullable highlightNonDefault>
                <ListboxOption value={null} hidden>Any</ListboxOption>
                {letters.map((letter) => (
                    <ListboxOption key={letter} value={letter}>{letter}</ListboxOption>
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
