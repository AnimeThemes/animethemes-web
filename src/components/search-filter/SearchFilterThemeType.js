import { Text } from "components/text";
import { Listbox } from "components/listbox";
import { SearchFilter } from "components/search-filter";

export function SearchFilterThemeType({ value, setValue }) {
    return (
        <SearchFilter>
            <Text variant="h2">Type</Text>
            <Listbox value={value} onChange={setValue} resettable highlightNonDefault>
                <Listbox.Option value={null} hidden>Any</Listbox.Option>
                <Listbox.Option value="OP">OP</Listbox.Option>
                <Listbox.Option value="ED">ED</Listbox.Option>
            </Listbox>
        </SearchFilter>
    );
}
