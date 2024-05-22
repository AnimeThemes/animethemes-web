import type { ReactNode } from "react";

import type { ListboxOptionProps } from "@/components/listbox/Listbox";
import { Listbox, ListboxOption } from "@/components/listbox/Listbox";
import { SearchFilter } from "@/components/search-filter/SearchFilter";
import { Text } from "@/components/text/Text";

interface SearchFilterSortByProps<T extends string | null> {
    children: ReactNode
    value: T
    setValue: (newValue: T) => void
}

export function SearchFilterSortBy<T extends string | null>({ children, value, setValue }: SearchFilterSortByProps<T>) {
    return (
        <SearchFilter>
            <Text variant="h2">Sort by</Text>
            <Listbox value={value} onValueChange={setValue} defaultValue={null} nullable>
                {children}
            </Listbox>
        </SearchFilter>
    );
}

SearchFilterSortBy.Option = function SearchFilterSortByOption(props: ListboxOptionProps) {
    return <ListboxOption {...props}/>;
};
