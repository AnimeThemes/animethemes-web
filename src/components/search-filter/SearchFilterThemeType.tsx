import { Text } from "components/text";
import { SearchFilter } from "components/search-filter";
import { Listbox2, Listbox2Option } from "components/listbox/Listbox2";

interface SearchFilterThemeTypeProps {
    value: string | null
    setValue: (newValue: string | null) => void
}

export function SearchFilterThemeType({ value, setValue }: SearchFilterThemeTypeProps) {
    return (
        <SearchFilter>
            <Text variant="h2">Type</Text>
            <Listbox2 value={value} onValueChange={setValue} defaultValue={null} resettable nullable highlightNonDefault>
                <Listbox2Option value={null} hidden>Any</Listbox2Option>
                <Listbox2Option value="OP">OP</Listbox2Option>
                <Listbox2Option value="ED">ED</Listbox2Option>
            </Listbox2>
        </SearchFilter>
    );
}
