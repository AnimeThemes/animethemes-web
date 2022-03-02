import { Text } from "components/text";
import { Listbox } from "components/listbox";
import useYearList from "hooks/useYearList";
import { SearchFilter } from "components/search-filter";

export function SearchFilterYear({ value, setValue }) {
    const yearList = useYearList();

    return (
        <SearchFilter>
            <Text variant="h2">Year</Text>
            <Listbox value={value} onChange={setValue} resettable highlightNonDefault>
                <Listbox.Option value={null}>Any</Listbox.Option>
                {yearList.map((year) => (
                    <Listbox.Option key={year} value={year}>{year}</Listbox.Option>
                ))}
            </Listbox>
        </SearchFilter>
    );
}
