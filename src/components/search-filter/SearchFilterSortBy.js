import { Text } from "components/text";
import { Listbox } from "components/listbox";
import { SearchFilter } from "components/search-filter";

export function SearchFilterSortBy({ options, value, setValue }) {
    return (
        <SearchFilter>
            <Text variant="h2">Sort by</Text>
            <Listbox value={value} onChange={setValue}>
                {options.map((option) => (
                    <Listbox.Option key={option} value={option}>{option}</Listbox.Option>
                ))}
            </Listbox>
        </SearchFilter>
    );
}
