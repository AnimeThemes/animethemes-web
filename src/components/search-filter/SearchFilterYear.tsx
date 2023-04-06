import { Text } from "components/text";
import useYearList from "hooks/useYearList";
import { SearchFilter } from "components/search-filter";
import { Listbox, ListboxOption } from "components/listbox/Listbox";

interface SearchFilterYearProps {
    value: string | null
    setValue: (newValue: string | null) => void
}

export function SearchFilterYear({ value, setValue }: SearchFilterYearProps) {
    const yearList = useYearList();

    return (
        <SearchFilter>
            <Text variant="h2">Year</Text>
            <Listbox value={value ? String(value) : null} onValueChange={setValue} defaultValue={null} resettable nullable highlightNonDefault>
                <ListboxOption value={null} hidden>Any</ListboxOption>
                {yearList.map((year) => (
                    <ListboxOption key={year} value={year ? String(year) : null}>{String(year)}</ListboxOption>
                ))}
            </Listbox>
        </SearchFilter>
    );
}
