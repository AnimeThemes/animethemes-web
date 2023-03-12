import { Text } from "components/text";
import { SearchFilter } from "components/search-filter";
import type { ReactNode } from "react";
import type { ListboxOptionProps } from "components/listbox/Listbox2";
import { Listbox2, Listbox2Option } from "components/listbox/Listbox2";

interface SearchFilterSortByProps<T extends string | null> {
    children: ReactNode
    value: T
    setValue: (newValue: T) => void
}

export function SearchFilterSortBy<T extends string | null>({ children, value, setValue }: SearchFilterSortByProps<T>) {
    return (
        <SearchFilter>
            <Text variant="h2">Sort by</Text>
            <Listbox2 value={value} onValueChange={setValue} defaultValue={null} nullable>
                {children}
            </Listbox2>
        </SearchFilter>
    );
}

SearchFilterSortBy.Option = function SearchFilterSortByOption(props: ListboxOptionProps) {
    return <Listbox2Option {...props}/>;
};
