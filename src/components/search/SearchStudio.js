import { SearchFilterFirstLetter, SearchFilterSortBy } from "components/search-filter";
import useEntitySearch from "hooks/useEntitySearch";
import { SearchEntity } from "components/search";
import { SummaryCard } from "components/card";
import useSessionStorage from "hooks/useSessionStorage";

const sortByFields = new Map([
    [ "A ➜ Z", "name" ],
    [ "Z ➜ A", "-name" ],
    [ "Last Added", "-created_at" ]
]);
const sortByOptions = [ ...sortByFields.keys() ];

const initialFilter = {
    firstLetter: null,
    sortBy: sortByOptions[0]
};

export function SearchStudio({ searchQuery }) {
    const { updateDataField: updateFilter, data: filter } = useSessionStorage("filter", initialFilter);

    const entitySearch = useEntitySearch("studio", searchQuery, {
        filters: {
            "name][like": filter.firstLetter ? `${filter.firstLetter}%` : null,
        },
        sortBy: searchQuery ? null : sortByFields.get(filter.sortBy)
    });

    return (
        <SearchEntity
            searchQuery={searchQuery}
            filters={
                <>
                    <SearchFilterFirstLetter value={filter.firstLetter} setValue={updateFilter("firstLetter")}/>
                    <SearchFilterSortBy
                        options={searchQuery ? [ "Relevance" ] : sortByOptions}
                        value={searchQuery ? "Relevance" : filter.sortBy}
                        setValue={updateFilter("sortBy")}
                    />
                </>
            }
            renderSummaryCard={(studio) => <SummaryCard key={studio.slug} title={studio.name} description="Studio" to={`/studio/${studio.slug}`} />}
            {...entitySearch}
        />
    );
}
