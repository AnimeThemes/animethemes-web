import { Text } from "components/text";
import { SearchFilter } from "components/search-filter";
import { Listbox2, Listbox2Option } from "components/listbox/Listbox2";

interface SearchFilterSeasonProps {
    value: string | null
    setValue: (newValue: string | null) => void
}

export function SearchFilterSeason({ value, setValue }: SearchFilterSeasonProps) {
    return (
        <SearchFilter>
            <Text variant="h2">Season</Text>
            <Listbox2 value={value} onValueChange={setValue} defaultValue={null} resettable nullable highlightNonDefault>
                <Listbox2Option value={null} hidden>Any</Listbox2Option>
                <Listbox2Option value="Winter">Winter</Listbox2Option>
                <Listbox2Option value="Spring">Spring</Listbox2Option>
                <Listbox2Option value="Summer">Summer</Listbox2Option>
                <Listbox2Option value="Fall">Fall</Listbox2Option>
            </Listbox2>
        </SearchFilter>
    );
}
