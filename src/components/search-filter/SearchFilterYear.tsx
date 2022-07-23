import { Text } from "components/text";
import { Listbox } from "components/listbox";
import useYearList from "hooks/useYearList";
import { SearchFilter } from "components/search-filter";

interface SearchFilterYearProps {
    value: string | null
    setValue: (newValue: string | null) => void
}

export function SearchFilterYear({ value, setValue }: SearchFilterYearProps) {
    const yearList = useYearList();

    return (
        <SearchFilter>
            <Text variant="h2">Year</Text>
            <Listbox value={value ? String(value) : null} onChange={setValue} resettable highlightNonDefault>
                <Listbox.Option value={null}>Any</Listbox.Option>
                {yearList.map((year) => (
                    <Listbox.Option key={year} value={year ? String(year) : null}>{String(year)}</Listbox.Option>
                ))}
            </Listbox>
        </SearchFilter>
    );
}
