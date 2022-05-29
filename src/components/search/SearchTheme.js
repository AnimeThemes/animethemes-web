import { SearchFilterFirstLetter, SearchFilterSortBy, SearchFilterThemeType } from "components/search-filter";
import { SearchEntity } from "components/search";
import { ThemeSummaryCard } from "components/card";
import useSessionStorage from "hooks/useSessionStorage";
import { useState } from "react";

const initialFilter = {
    firstLetter: null,
    type: null,
    sortBy: "song.title",
};

export function SearchTheme({ searchQuery }) {
    const { updateDataField: updateFilter, data: filter } = useSessionStorage("filter-theme", {
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
            entity="theme"
            searchQuery={searchQuery}
            searchParams={{
                filters: {
                    has: "song",
                    "song][title-like": filter.firstLetter ? `${filter.firstLetter}%` : null,
                    type: filter.type
                },
                sortBy: filter.sortBy,
            }}
            filters={
                <>
                    <SearchFilterFirstLetter value={filter.firstLetter} setValue={updateFilter("firstLetter")}/>
                    <SearchFilterThemeType value={filter.type} setValue={updateFilter("type")}/>
                    <SearchFilterSortBy value={filter.sortBy} setValue={updateFilter("sortBy")}>
                        {searchQuery ? (
                            <SearchFilterSortBy.Option>Relevance</SearchFilterSortBy.Option>
                        ) : null}
                        <SearchFilterSortBy.Option value="song.title">A ➜ Z</SearchFilterSortBy.Option>
                        <SearchFilterSortBy.Option value="-song.title">Z ➜ A</SearchFilterSortBy.Option>
                        <SearchFilterSortBy.Option value="anime.year,anime.season,song.title">Old ➜ New</SearchFilterSortBy.Option>
                        <SearchFilterSortBy.Option value="-anime.year,-anime.season,song.title">New ➜ Old</SearchFilterSortBy.Option>
                        <SearchFilterSortBy.Option value="-created_at">Last Added</SearchFilterSortBy.Option>
                    </SearchFilterSortBy>
                </>
            }
            renderResult={(theme) => <ThemeSummaryCard key={theme.anime.slug + theme.slug} theme={theme} expandable/>}
        />
    );
}
