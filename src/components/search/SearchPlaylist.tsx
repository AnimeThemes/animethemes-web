import { useState } from "react";

import gql from "graphql-tag";

import PlaylistSummaryCard from "@/components/card/PlaylistSummaryCard";
import { SearchEntity } from "@/components/search/SearchEntity";
import { SearchFilterSortBy } from "@/components/search-filter/SearchFilterSortBy";
import type { SearchPlaylistQuery, SearchPlaylistQueryVariables } from "@/generated/graphql";
import useFilterStorage from "@/hooks/useFilterStorage";
import { fetchDataClient } from "@/lib/client";

const initialFilter = {
    sortBy: "name",
};

interface SearchPlaylistProps {
    searchQuery?: string;
}

export function SearchPlaylist({ searchQuery }: SearchPlaylistProps) {
    const { filter, updateFilter, bindUpdateFilter } = useFilterStorage("filter-playlist", {
        ...initialFilter,
        sortBy: searchQuery ? null : initialFilter.sortBy,
    });
    const [prevSearchQuery, setPrevSearchQuery] = useState(searchQuery);

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
        <SearchEntity<SearchPlaylistQuery["searchPlaylist"]["data"][number]>
            entity="playlist"
            searchArgs={{
                query: searchQuery,
                sortBy: filter.sortBy,
            }}
            fetchResults={async (searchArgs) => {
                const { data } = await fetchDataClient<SearchPlaylistQuery, SearchPlaylistQueryVariables>(
                    gql`
                        ${PlaylistSummaryCard.fragments.playlist}
                        ${PlaylistSummaryCard.fragments.showOwner}

                        query SearchPlaylist($args: SearchArgs!) {
                            searchPlaylist(args: $args) {
                                data {
                                    ...PlaylistSummaryCardPlaylist
                                    ...PlaylistSummaryCardShowOwner
                                }
                                nextPage
                            }
                        }
                    `,
                    { args: searchArgs },
                );

                return data.searchPlaylist;
            }}
            renderResult={(playlist) => <PlaylistSummaryCard key={playlist.id} playlist={playlist} showOwner />}
            filters={
                <>
                    <SearchFilterSortBy value={filter.sortBy} setValue={bindUpdateFilter("sortBy")}>
                        {searchQuery ? (
                            <SearchFilterSortBy.Option value={null}>Relevance</SearchFilterSortBy.Option>
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
