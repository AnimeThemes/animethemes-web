import { SearchFilterFirstLetter, SearchFilterSortBy } from "components/search-filter";
import { SearchEntity } from "components/search";
import { ArtistSummaryCard } from "components/card";
import useSessionStorage from "hooks/useSessionStorage";
import { useState } from "react";

const initialFilter = {
    firstLetter: null,
    sortBy: "name",
};

export function SearchArtist({ searchQuery }) {
    const { updateDataField: updateFilter, data: filter } = useSessionStorage("filter-artist", {
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
            entity="artist"
            searchQuery={searchQuery}
            searchParams={{
                filters: {
                    "name-like": filter.firstLetter ? `${filter.firstLetter}%` : null,
                },
                sortBy: filter.sortBy
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
            renderResult={(artist) => <ArtistSummaryCard key={artist.slug} artist={artist}/>}
        />
    );
}
