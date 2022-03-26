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
    sortBy: "name"
};

export function SearchAnime({ searchQuery }) {
    const { updateDataField: updateFilter, data: filter } = useSessionStorage("filter", initialFilter);

    const entitySearch = useEntitySearch("anime", searchQuery, {
        filters: {
            "name][like": filter.firstLetter ? `${filter.firstLetter}%` : null,
            season: filter.season,
            year: filter.year
        },
        sortBy: searchQuery ? null : filter.sortBy
    });

    return (
        <SearchEntity
            searchQuery={searchQuery}
            filters={
                <>
                    <SearchFilterFirstLetter value={filter.firstLetter} setValue={updateFilter("firstLetter")}/>
                    <SearchFilterSeason value={filter.season} setValue={updateFilter("season")}/>
                    <SearchFilterYear value={filter.year} setValue={updateFilter("year")}/>
                    <SearchFilterSortBy value={searchQuery ? null : filter.sortBy} setValue={updateFilter("sortBy")}>
                        {searchQuery ? (
                            <SearchFilterSortBy.Option>Relevance</SearchFilterSortBy.Option>
                        ) : (
                            <>
                                <SearchFilterSortBy.Option value="name">A ➜ Z</SearchFilterSortBy.Option>
                                <SearchFilterSortBy.Option value="-name">Z ➜ A</SearchFilterSortBy.Option>
                                <SearchFilterSortBy.Option value="year,season,name">Old ➜ New</SearchFilterSortBy.Option>
                                <SearchFilterSortBy.Option value="-year,-season,name">New ➜ Old</SearchFilterSortBy.Option>
                                <SearchFilterSortBy.Option value="-created_at">Last Added</SearchFilterSortBy.Option>
                            </>
                        )}
                    </SearchFilterSortBy>
                </>
            }
            renderSummaryCard={(anime) => <AnimeSummaryCard key={anime.slug} anime={anime}/>}
            {...entitySearch}
        />
    );
}
