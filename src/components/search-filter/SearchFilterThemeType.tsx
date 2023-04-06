import { Text } from "components/text";
import { SearchFilter } from "components/search-filter";
import { Listbox, ListboxOption } from "components/listbox/Listbox";

interface SearchFilterThemeTypeProps {
    value: string | null
    setValue: (newValue: string | null) => void
}

export function SearchFilterThemeType({ value, setValue }: SearchFilterThemeTypeProps) {
    return (
        <SearchFilter>
            <Text variant="h2">Type</Text>
            <Listbox value={value} onValueChange={setValue} defaultValue={null} resettable nullable highlightNonDefault>
                <ListboxOption value={null} hidden>Any</ListboxOption>
                <ListboxOption value="OP">OP</ListboxOption>
                <ListboxOption value="ED">ED</ListboxOption>
            </Listbox>
        </SearchFilter>
    );
}
