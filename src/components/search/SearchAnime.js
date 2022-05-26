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

const initialFilter = {
    firstLetter: null,
    season: null,
    year: null,
    sortBy: null
};

export function SearchAnime({ searchQuery }) {
    const { updateDataField: updateFilter, data: filter } = useSessionStorage("filter-anime", initialFilter);

    // Use name sort by default if not searching.
    // If searching and no other sort was selected, use null (= by relevance).
    const sortBy = searchQuery ? filter.sortBy : (filter.sortBy ?? "name");

    const entitySearch = useEntitySearch("anime", searchQuery, {
        filters: {
            "name-like": filter.firstLetter ? `${filter.firstLetter}%` : null,
            season: filter.season,
            year: filter.year
        },
        sortBy
    });

    return (
        <SearchEntity
            searchQuery={searchQuery}
            filters={
                <>
                    <SearchFilterFirstLetter value={filter.firstLetter} setValue={updateFilter("firstLetter")}/>
                    <SearchFilterSeason value={filter.season} setValue={updateFilter("season")}/>
                    <SearchFilterYear value={filter.year} setValue={updateFilter("year")}/>
                    <SearchFilterSortBy value={sortBy} setValue={updateFilter("sortBy")}>
                        {searchQuery ? (
                            <SearchFilterSortBy.Option>Relevance</SearchFilterSortBy.Option>
                        ) : null}
                        <SearchFilterSortBy.Option value="name">A ➜ Z</SearchFilterSortBy.Option>
                        <SearchFilterSortBy.Option value="-name">Z ➜ A</SearchFilterSortBy.Option>
                        <SearchFilterSortBy.Option value="year,season,name">Old ➜ New</SearchFilterSortBy.Option>
                        <SearchFilterSortBy.Option value="-year,-season,name">New ➜ Old</SearchFilterSortBy.Option>
                        <SearchFilterSortBy.Option value="-created_at">Last Added</SearchFilterSortBy.Option>
                    </SearchFilterSortBy>
                </>
            }
            renderSummaryCard={(anime) => <AnimeSummaryCard key={anime.slug} anime={anime} expandable/>}
            {...entitySearch}
        />
    );
}
