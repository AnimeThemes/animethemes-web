import { Text } from "components/text";
import { Listbox } from "components/listbox";
import { SearchFilter } from "components/search-filter";

interface SearchFilterSeasonProps {
    value: string | null
    setValue: (newValue: string | null) => void
}

export function SearchFilterSeason({ value, setValue }: SearchFilterSeasonProps) {
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
