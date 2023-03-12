import { Text } from "components/text";
import useYearList from "hooks/useYearList";
import { SearchFilter } from "components/search-filter";
import { Listbox2, Listbox2Option } from "components/listbox/Listbox2";

interface SearchFilterYearProps {
    value: string | null
    setValue: (newValue: string | null) => void
}

export function SearchFilterYear({ value, setValue }: SearchFilterYearProps) {
    const yearList = useYearList();

    return (
        <SearchFilter>
            <Text variant="h2">Year</Text>
            <Listbox2 value={value ? String(value) : null} onValueChange={setValue} defaultValue={null} resettable nullable highlightNonDefault>
                <Listbox2Option value={null} hidden>Any</Listbox2Option>
                {yearList.map((year) => (
                    <Listbox2Option key={year} value={year ? String(year) : null}>{String(year)}</Listbox2Option>
                ))}
            </Listbox2>
        </SearchFilter>
    );
}
