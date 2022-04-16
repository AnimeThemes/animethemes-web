import { SearchFilterFirstLetter, SearchFilterSortBy } from "components/search-filter";
import useEntitySearch from "hooks/useEntitySearch";
import { SearchEntity } from "components/search";
import { ArtistSummaryCard } from "components/card";
import useSessionStorage from "hooks/useSessionStorage";

const initialFilter = {
    firstLetter: null,
    sortBy: "name"
};

export function SearchArtist({ searchQuery }) {
    const { updateDataField: updateFilter, data: filter } = useSessionStorage("filter", initialFilter);

    const entitySearch = useEntitySearch("artist", searchQuery, {
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
            renderSummaryCard={(artist) => <ArtistSummaryCard key={artist.slug} artist={artist}/>}
            {...entitySearch}
        />
    );
}
