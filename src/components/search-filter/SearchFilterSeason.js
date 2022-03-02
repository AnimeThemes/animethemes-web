import { Text } from "components/text";
import { Listbox } from "components/listbox";
import { SearchFilter } from "components/search-filter";

export function SearchFilterSeason({ value, setValue }) {
    return (
        <SearchFilter>
            <Text variant="h2">Season</Text>
            <Listbox value={value} onChange={setValue} resettable highlightNonDefault>
                <Listbox.Option value={null} hidden>Any</Listbox.Option>
                <Listbox.Option value="Winter">Winter</Listbox.Option>
                <Listbox.Option value="Spring">Spring</Listbox.Option>
                <Listbox.Option value="Summer">Summer</Listbox.Option>
                <Listbox.Option value="Fall">Fall</Listbox.Option>
            </Listbox>
        </SearchFilter>
    );
}
