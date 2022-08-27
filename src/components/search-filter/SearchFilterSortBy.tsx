import { Text } from "components/text";
import { Listbox } from "components/listbox";
import { SearchFilter } from "components/search-filter";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

interface SearchFilterSortByProps<T extends string | null> {
    children: ReactNode
    value: T
    setValue: (newValue: T) => void
}

export function SearchFilterSortBy<T extends string | null>({ children, value, setValue }: SearchFilterSortByProps<T>) {
    return (
        <SearchFilter>
            <Text variant="h2">Sort by</Text>
            <Listbox value={value} onChange={setValue}>
                {children}
            </Listbox>
        </SearchFilter>
    );
}

SearchFilterSortBy.Option = function SearchFilterSortByOption(props: ComponentPropsWithoutRef<typeof Listbox.Option>) {
    return <Listbox.Option {...props}/>;
};
