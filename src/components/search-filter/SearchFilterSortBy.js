import { Text } from "components/text";
import { Listbox } from "components/listbox";
import { SearchFilter } from "components/search-filter";

export function SearchFilterSortBy({ children, value, setValue }) {
    return (
        <SearchFilter>
            <Text variant="h2">Sort by</Text>
            <Listbox value={value} onChange={setValue}>
                {children}
            </Listbox>
        </SearchFilter>
    );
}

SearchFilterSortBy.Option = function SearchFilterSortByOption(props) {
    return <Listbox.Option {...props}/>;
};
