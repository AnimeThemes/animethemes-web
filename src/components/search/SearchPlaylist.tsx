import { useState } from "react";

import { useQuery } from "@apollo/client/react";

import PlaylistSummaryCard from "@/components/card/PlaylistSummaryCard";
import { SearchEntity } from "@/components/search/SearchEntity";
import { SearchFilterGroup } from "@/components/search-filter/SearchFilterGroup";
import { SearchFilterSortBy } from "@/components/search-filter/SearchFilterSortBy";
import { graphql } from "@/graphql/generated";
import type { SearchPlaylistSort } from "@/graphql/generated/graphql";
import useFilterStorage from "@/hooks/useFilterStorage";
import { getNextPage, getSearchStatus } from "@/utils/searchPagination";

interface Filter {
    sortBy: string | null;
}

const initialFilter: Filter = {
    sortBy: "NAME",
};

export const SEARCH_PLAYLIST_QUERY = graphql(`
    query SearchPlaylist($query: String!, $page: Int!, $sort: [SearchPlaylistSort!]) {
        search(search: $query, first: 15, page: $page) {
            playlists(sort: $sort) {
                data {
                    ...PlaylistSummaryCardPlaylist
                    ...PlaylistSummaryCardPlaylistWithOwner
                    id
                }
                pageInfo {
                    offset
                    first
                    hasNextPage
                }
            }
        }
    }
`);

interface SearchPlaylistProps {
    searchQuery: string;
}

export function SearchPlaylist({ searchQuery }: SearchPlaylistProps) {
    const { filter, updateFilter, bindUpdateFilter } = useFilterStorage("filter-playlist-v2", {
        ...initialFilter,
        sortBy: initialFilter.sortBy,
    });
    const [prevSearchQuery, setPrevSearchQuery] = useState(searchQuery);

    const variables = {
        query: searchQuery,
        ...(filter.sortBy ? { sort: filter.sortBy.split(",") as Array<SearchPlaylistSort> } : {}),
    };

    const result = useQuery(SEARCH_PLAYLIST_QUERY, { variables: { ...variables, page: 1 } });
    const results = (result.data ?? result.previousData)?.search.playlists;

    function loadMore() {
        if (!results) {
            return;
        }

        void result.fetchMore({ variables: { page: getNextPage(results.pageInfo) } });
    }

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
        <>
            <SearchFilterGroup>
                <SearchFilterSortBy value={filter.sortBy} setValue={bindUpdateFilter("sortBy")}>
                    {searchQuery ? <SearchFilterSortBy.Option value={null}>Relevance</SearchFilterSortBy.Option> : null}
                    <SearchFilterSortBy.Option value="NAME">A ➜ Z</SearchFilterSortBy.Option>
                    <SearchFilterSortBy.Option value="NAME_DESC">Z ➜ A</SearchFilterSortBy.Option>
                    <SearchFilterSortBy.Option value="CREATED_AT_DESC">Last Added</SearchFilterSortBy.Option>
                </SearchFilterSortBy>
            </SearchFilterGroup>
            <SearchEntity
                {...getSearchStatus(result)}
                searchQuery={searchQuery}
                hasResults={!!results?.data.length}
                hasNextPage={!!results?.pageInfo.hasNextPage}
                onLoadMore={loadMore}
            >
                {results?.data.map((playlist) => (
                    <PlaylistSummaryCard key={playlist.id} playlist={playlist} playlistWithOwner={playlist} />
                ))}
            </SearchEntity>
        </>
    );
}
