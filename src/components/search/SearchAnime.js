import {
    SearchFilterFirstLetter,
    SearchFilterSeason,
    SearchFilterSortBy,
    SearchFilterYear
} from "components/search-filter";
import { SearchEntity } from "components/search";
import { AnimeSummaryCard } from "components/card";
import useSessionStorage from "hooks/useSessionStorage";
import { useState } from "react";

const initialFilter = {
    firstLetter: null,
    season: null,
    year: null,
    sortBy: "name",
};

export function SearchAnime({ searchQuery }) {
    const { updateDataField: updateFilter, data: filter } = useSessionStorage("filter-anime", {
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
            entity="anime"
            searchQuery={searchQuery}
            searchParams={{
                filters: {
                    "name-like": filter.firstLetter ? `${filter.firstLetter}%` : null,
                    season: filter.season,
                    year: filter.year
                },
                sortBy: filter.sortBy
            }}
            filters={
                <>
                    <SearchFilterFirstLetter value={filter.firstLetter} setValue={updateFilter("firstLetter")}/>
                    <SearchFilterSeason value={filter.season} setValue={updateFilter("season")}/>
                    <SearchFilterYear value={filter.year} setValue={updateFilter("year")}/>
                    <SearchFilterSortBy value={filter.sortBy} setValue={updateFilter("sortBy")}>
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
            renderResult={(anime) => <AnimeSummaryCard key={anime.slug} anime={anime} expandable/>}
        />
    );
}
