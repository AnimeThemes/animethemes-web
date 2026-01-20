import { Listbox, ListboxOption } from "@/components/listbox/Listbox";
import { SearchFilter } from "@/components/search-filter/SearchFilter";
import { Text } from "@/components/text/Text";
import type { AnimeMediaFormat } from "@/graphql/generated/graphql";

interface SearchFilterMediaFormatProps {
    value: AnimeMediaFormat | null;
    setValue: (newValue: AnimeMediaFormat | null) => void;
}

export function SearchFilterMediaFormat({ value, setValue }: SearchFilterMediaFormatProps) {
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
