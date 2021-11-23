import {
    SearchFilterFirstLetter,
    SearchFilterSeason,
    SearchFilterSortBy,
    SearchFilterYear
} from "components/search-filter";
import useEntitySearch from "hooks/useEntitySearch";
import { SearchEntity } from "components/search";
import { AnimeSummaryCard } from "components/card";
import useSessionStorage from "hooks/useSessionStorage";

const sortByFields = new Map([
    [ "A ➜ Z", "name" ],
    [ "Z ➜ A", "-name" ],
    [ "Old ➜ New", "year,season,name" ],
    [ "New ➜ Old", "-year,-season,name" ],
    [ "Last Added", "-created_at" ]
]);
const sortByOptions = [ ...sortByFields.keys() ];

const initialFilter = {
    firstLetter: null,
    season: null,
    year: null,
    sortBy: sortByOptions[0]
};

export function SearchAnime({ searchQuery }) {
    const { updateDataField: updateFilter, data: filter } = useSessionStorage("filter", initialFilter);

    const entitySearch = useEntitySearch("anime", searchQuery, {
        filters: {
            "name][like": filter.firstLetter ? `${filter.firstLetter}%` : null,
            season: filter.season,
            year: filter.year
        },
        sortBy: searchQuery ? null : sortByFields.get(filter.sortBy)
    });

    return (
        <SearchEntity
            searchQuery={searchQuery}
            filters={
                <>
                    <SearchFilterFirstLetter value={filter.firstLetter} setValue={updateFilter("firstLetter")}/>
                    <SearchFilterSeason value={filter.season} setValue={updateFilter("season")}/>
                    <SearchFilterYear value={filter.year} setValue={updateFilter("year")}/>
                    <SearchFilterSortBy
                        options={searchQuery ? [ "Relevance" ] : sortByOptions}
                        value={searchQuery ? "Relevance" : filter.sortBy}
                        setValue={updateFilter("sortBy")}
                    />
                </>
            }
            renderSummaryCard={(anime) => <AnimeSummaryCard key={anime.slug} anime={anime}/>}
            {...entitySearch}
        />
    );
}
