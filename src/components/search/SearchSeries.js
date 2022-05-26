import { SearchFilterFirstLetter, SearchFilterSortBy } from "components/search-filter";
import useEntitySearch from "hooks/useEntitySearch";
import { SearchEntity } from "components/search";
import { SummaryCard } from "components/card";
import useSessionStorage from "hooks/useSessionStorage";

const initialFilter = {
    firstLetter: null,
    sortBy: null
};

export function SearchSeries({ searchQuery }) {
    const { updateDataField: updateFilter, data: filter } = useSessionStorage("filter-series", initialFilter);

    // Use name sort by default if not searching.
    // If searching and no other sort was selected, use null (= by relevance).
    const sortBy = searchQuery ? filter.sortBy : (filter.sortBy ?? "name");

    const entitySearch = useEntitySearch("series", searchQuery, {
        filters: {
            "name-like": filter.firstLetter ? `${filter.firstLetter}%` : null,
        },
        sortBy
    });

    return (
        <SearchEntity
            searchQuery={searchQuery}
            filters={
                <>
                    <SearchFilterFirstLetter value={filter.firstLetter} setValue={updateFilter("firstLetter")}/>
                    <SearchFilterSortBy value={sortBy} setValue={updateFilter("sortBy")}>
                        {searchQuery ? (
                            <SearchFilterSortBy.Option>Relevance</SearchFilterSortBy.Option>
                        ) : null}
                        <SearchFilterSortBy.Option value="name">A ➜ Z</SearchFilterSortBy.Option>
                        <SearchFilterSortBy.Option value="-name">Z ➜ A</SearchFilterSortBy.Option>
                        <SearchFilterSortBy.Option value="-created_at">Last Added</SearchFilterSortBy.Option>
                    </SearchFilterSortBy>
                </>
            }
            renderSummaryCard={(series) => <SummaryCard key={series.slug} title={series.name} description="Series" to={`/series/${series.slug}`} />}
            {...entitySearch}
        />
    );
}
