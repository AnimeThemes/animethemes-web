import { Listbox, ListboxOption } from "@/components/listbox/Listbox";
import { SearchFilter } from "@/components/search-filter/SearchFilter";
import { Text } from "@/components/text/Text";

interface SearchFilterMediaFormatProps {
    value: string | null
    setValue: (newValue: string | null) => void
}

export function SearchFilterMediaFormat({ value, setValue }: SearchFilterMediaFormatProps) {
    return (
        <SearchFilter>
            <Text variant="h2">Format</Text>
            <Listbox value={value} onValueChange={setValue} defaultValue={null} resettable nullable highlightNonDefault>
                <ListboxOption value={null} hidden>Any</ListboxOption>
                <ListboxOption value="TV">TV</ListboxOption>
                <ListboxOption value="TV Short">TV Short</ListboxOption>
                <ListboxOption value="Movie">Movie</ListboxOption>
            </Listbox>
        </SearchFilter>
    );
}
