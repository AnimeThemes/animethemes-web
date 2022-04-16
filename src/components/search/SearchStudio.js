import { SearchFilterFirstLetter, SearchFilterSortBy } from "components/search-filter";
import useEntitySearch from "hooks/useEntitySearch";
import { SearchEntity } from "components/search";
import { SummaryCard } from "components/card";
import useSessionStorage from "hooks/useSessionStorage";

const initialFilter = {
    firstLetter: null,
    sortBy: "name"
};

export function SearchStudio({ searchQuery }) {
    const { updateDataField: updateFilter, data: filter } = useSessionStorage("filter", initialFilter);

    const entitySearch = useEntitySearch("studio", searchQuery, {
        filters: {
            "name-like": filter.firstLetter ? `${filter.firstLetter}%` : null,
        },
        sortBy: searchQuery ? null : filter.sortBy
    });

    return (
        <SearchEntity
            searchQuery={searchQuery}
            filters={
                <>
                    <SearchFilterFirstLetter value={filter.firstLetter} setValue={updateFilter("firstLetter")}/>
                    <SearchFilterSortBy value={searchQuery ? null : filter.sortBy} setValue={updateFilter("sortBy")}>
                        {searchQuery ? (
                            <SearchFilterSortBy.Option>Relevance</SearchFilterSortBy.Option>
                        ) : (
                            <>
                                <SearchFilterSortBy.Option value="name">A ➜ Z</SearchFilterSortBy.Option>
                                <SearchFilterSortBy.Option value="-name">Z ➜ A</SearchFilterSortBy.Option>
                                <SearchFilterSortBy.Option value="-created_at">Last Added</SearchFilterSortBy.Option>
                            </>
                        )}
                    </SearchFilterSortBy>
                </>
            }
            renderSummaryCard={(studio) => <SummaryCard key={studio.slug} title={studio.name} description="Studio" to={`/studio/${studio.slug}`} />}
            {...entitySearch}
        />
    );
}
