import { Listbox, ListboxOption } from "@/components/listbox/Listbox";
import { SearchFilter } from "@/components/search-filter/SearchFilter";
import { Text } from "@/components/text/Text";

interface SearchFilterSeasonProps {
    value: string | null
    setValue: (newValue: string | null) => void
}

export function SearchFilterSeason({ value, setValue }: SearchFilterSeasonProps) {
    return (
        <SearchFilter>
            <Text variant="h2">Season</Text>
            <Listbox value={value} onValueChange={setValue} defaultValue={null} resettable nullable highlightNonDefault>
                <ListboxOption value={null} hidden>Any</ListboxOption>
                <ListboxOption value="Winter">Winter</ListboxOption>
                <ListboxOption value="Spring">Spring</ListboxOption>
                <ListboxOption value="Summer">Summer</ListboxOption>
                <ListboxOption value="Fall">Fall</ListboxOption>
            </Listbox>
        </SearchFilter>
    );
}
