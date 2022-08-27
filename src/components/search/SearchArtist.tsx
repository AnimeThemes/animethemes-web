import { SearchFilterFirstLetter, SearchFilterSortBy } from "components/search-filter";
import { SearchEntity } from "components/search";
import { ArtistSummaryCard } from "components/card";
import { useState } from "react";
import { fetchDataClient } from "lib/client";
import type { SearchArtistQuery, SearchArtistQueryVariables } from "generated/graphql";
import gql from "graphql-tag";
import useFilterStorage from "hooks/useFilterStorage";

const initialFilter = {
    firstLetter: null,
    sortBy: "name",
};

interface SearchArtistProps {
    searchQuery?: string
}

export function SearchArtist({ searchQuery }: SearchArtistProps) {
    const { filter, updateFilter, bindUpdateFilter } = useFilterStorage("filter-artist", {
        ...initialFilter,
        sortBy: searchQuery ? null : initialFilter.sortBy,
    });
    const [ prevSearchQuery, setPrevSearchQuery ] = useState(searchQuery);

    if (!searchQuery && filter.sortBy === null) {
        updateFilter("sortBy", initialFilter.sortBy);
        return null;
    }

    if (searchQuery !== prevSearchQuery) {
        // Check if user is switching from non-searching to searching
        if (searchQuery && !prevSearchQuery) {
            updateFilter("sortBy", null);
        }
        setPrevSearchQuery(searchQuery);
        return null;
    }

    return (
        <SearchEntity
            <SearchArtistQuery["searchArtist"]["data"][number]>
            entity="artist"
            searchArgs={{
                query: searchQuery,
                filters: {
                    "name-like": filter.firstLetter ? `${filter.firstLetter}%` : null,
                },
                sortBy: filter.sortBy
            }}
            fetchResults={async (searchArgs) => {
                const { data } = await fetchDataClient<SearchArtistQuery, SearchArtistQueryVariables>(gql`
                    ${ArtistSummaryCard.fragments.artist}
                    
                    query SearchArtist($args: SearchArgs!) {
                        searchArtist(args: $args) {
                            data {
                                ...ArtistSummaryCardArtist
                            }
                            nextPage
                        }
                    }
                `, { args: searchArgs });

                return data.searchArtist;
            }}
            renderResult={(artist) => (
                <ArtistSummaryCard key={artist.slug} artist={artist}/>
            )}
            filters={
                <>
                    <SearchFilterFirstLetter value={filter.firstLetter} setValue={bindUpdateFilter("firstLetter")}/>
                    <SearchFilterSortBy value={filter.sortBy} setValue={bindUpdateFilter("sortBy")}>
                        {searchQuery ? (
                            <SearchFilterSortBy.Option>Relevance</SearchFilterSortBy.Option>
                        ) : null}
                        <SearchFilterSortBy.Option value="name">A ➜ Z</SearchFilterSortBy.Option>
                        <SearchFilterSortBy.Option value="-name">Z ➜ A</SearchFilterSortBy.Option>
                        <SearchFilterSortBy.Option value="-created_at">Last Added</SearchFilterSortBy.Option>
                    </SearchFilterSortBy>
                </>
            }
        />
    );
}
