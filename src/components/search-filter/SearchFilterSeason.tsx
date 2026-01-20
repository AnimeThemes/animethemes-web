import { Listbox, ListboxOption } from "@/components/listbox/Listbox";
import { SearchFilter } from "@/components/search-filter/SearchFilter";
import { Text } from "@/components/text/Text";
import type { AnimeSeason } from "@/graphql/generated/graphql";

interface SearchFilterSeasonProps {
    value: AnimeSeason | null;
    setValue: (newValue: AnimeSeason | null) => void;
}

export function SearchFilterSeason({ value, setValue }: SearchFilterSeasonProps) {
    return (
        <SearchFilter>
            <Text variant="h2">Season</Text>
            <Listbox value={value} onValueChange={setValue} defaultValue={null} resettable nullable highlightNonDefault>
                <ListboxOption value={null} hidden>
                    Any
                </ListboxOption>
                <ListboxOption value="WINTER">Winter</ListboxOption>
                <ListboxOption value="SPRING">Spring</ListboxOption>
                <ListboxOption value="SUMMER">Summer</ListboxOption>
                <ListboxOption value="FALL">Fall</ListboxOption>
            </Listbox>
        </SearchFilter>
    );
}
