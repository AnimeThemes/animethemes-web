import { Listbox, ListboxOption } from "@/components/listbox/Listbox";
import { SearchFilter } from "@/components/search-filter/SearchFilter";
import { Text } from "@/components/text/Text";
import type { AnimeFormat } from "@/graphql/generated/graphql";

interface SearchFilterFormatProps {
    value: AnimeFormat | null;
    setValue: (newValue: AnimeFormat | null) => void;
}

export function SearchFilterFormat({ value, setValue }: SearchFilterFormatProps) {
    return (
        <SearchFilter>
            <Text variant="h2">Format</Text>
            <Listbox value={value} onValueChange={setValue} defaultValue={null} resettable nullable highlightNonDefault>
                <ListboxOption value={null} hidden>
                    Any
                </ListboxOption>
                <ListboxOption value="TV">TV</ListboxOption>
                <ListboxOption value="TV_SHORT">TV Short</ListboxOption>
                <ListboxOption value="MOVIE">Movie</ListboxOption>
                <ListboxOption value="OVA">OVA</ListboxOption>
                <ListboxOption value="ONA">ONA</ListboxOption>
                <ListboxOption value="SPECIAL">Special</ListboxOption>
            </Listbox>
        </SearchFilter>
    );
}
