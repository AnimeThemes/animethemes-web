import { SearchFilterFirstLetter, SearchFilterSortBy } from "components/search-filter";
import { SearchEntity } from "components/search";
import { SummaryCard } from "components/card";
import useSessionStorage from "hooks/useSessionStorage";
import { useState } from "react";

const initialFilter = {
    firstLetter: null,
    sortBy: "name",
};

export function SearchSeries({ searchQuery }) {
    const { updateDataField: updateFilter, data: filter } = useSessionStorage("filter-series", {
        ...initialFilter,
        sortBy: searchQuery ? null : initialFilter.sortBy,
    });
    const [ prevSearchQuery, setPrevSearchQuery ] = useState(searchQuery);

    if (!searchQuery && filter.sortBy === null) {
        updateFilter("sortBy")(initialFilter.sortBy);
        return null;
    }

    if (searchQuery !== prevSearchQuery) {
        // Check if user is switching from non-searching to searching
        if (searchQuery && !prevSearchQuery) {
            updateFilter("sortBy")(null);
        }
        setPrevSearchQuery(searchQuery);
        return null;
    }

    return (
        <SearchEntity
            entity="series"
            searchQuery={searchQuery}
            searchParams={{
                filters: {
                    "name-like": filter.firstLetter ? `${filter.firstLetter}%` : null,
                },
                sortBy: filter.sortBy,
            }}
            filters={
                <>
                    <SearchFilterFirstLetter value={filter.firstLetter} setValue={updateFilter("firstLetter")}/>
                    <SearchFilterSortBy value={filter.sortBy} setValue={updateFilter("sortBy")}>
                        {searchQuery ? (
                            <SearchFilterSortBy.Option>Relevance</SearchFilterSortBy.Option>
                        ) : null}
                        <SearchFilterSortBy.Option value="name">A ➜ Z</SearchFilterSortBy.Option>
                        <SearchFilterSortBy.Option value="-name">Z ➜ A</SearchFilterSortBy.Option>
                        <SearchFilterSortBy.Option value="-created_at">Last Added</SearchFilterSortBy.Option>
                    </SearchFilterSortBy>
                </>
            }
            renderResult={(series) => <SummaryCard key={series.slug} title={series.name} description="Series" to={`/series/${series.slug}`} />}
        />
    );
}
