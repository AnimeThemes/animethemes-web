import { useState } from "react";

import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";

import PlaylistSummaryCard from "@/components/card/PlaylistSummaryCard";
import { SearchEntity } from "@/components/search/SearchEntity";
import { SearchFilterGroup } from "@/components/search-filter/SearchFilterGroup";
import { SearchFilterSortBy } from "@/components/search-filter/SearchFilterSortBy";
import { client } from "@/graphql/client";
import { graphql } from "@/graphql/generated";
import type { PlaylistSortableColumns } from "@/graphql/generated/graphql";
import useFilterStorage from "@/hooks/useFilterStorage";

interface Filter {
    sortBy: string | null;
}

const initialFilter: Filter = {
    sortBy: "NAME",
};

const query = graphql(`
    query SearchPlaylist($query: String, $sort: [PlaylistSortableColumns!], $page: Int!) {
        playlistPagination(search: $query, sort: $sort, first: 15, page: $page) {
            data {
                ...PlaylistSummaryCardPlaylist
                ...PlaylistSummaryCardPlaylistWithOwner
                id
            }
            paginationInfo {
                hasMorePages
            }
        }
    }
`);

interface SearchPlaylistProps {
    searchQuery?: string;
}

export function SearchPlaylist({ searchQuery }: SearchPlaylistProps) {
    const { filter, updateFilter, bindUpdateFilter } = useFilterStorage("filter-playlist-v2", {
        ...initialFilter,
        sortBy: searchQuery ? null : initialFilter.sortBy,
    });
    const [prevSearchQuery, setPrevSearchQuery] = useState(searchQuery);

    const variables = {
        ...(searchQuery ? { query: searchQuery } : {}),
        ...(filter.sortBy ? { sort: filter.sortBy.split(",") as Array<PlaylistSortableColumns> } : {}),
    };

    const {
        data,
        error,
        isError,
        isLoading,
        isFetching,
        isFetchingNextPage,
        isPlaceholderData,
        hasNextPage,
        fetchNextPage,
    } = useInfiniteQuery({
        queryKey: ["searchEntity", "playlist", variables],
        queryFn: async ({ pageParam }) => {
            const { data } = await client.query({
                query,
                variables: {
                    ...variables,
                    page: pageParam,
                },
            });

            return data.playlistPagination;
        },
        initialPageParam: 1,
        getNextPageParam: (lastPage, _, lastPageParam) =>
            lastPage.paginationInfo.hasMorePages ? lastPageParam + 1 : null,
        placeholderData: keepPreviousData,
    });

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
                error={error}
                searchQuery={searchQuery}
                isError={isError}
                isLoading={isLoading}
                isFetching={isFetching}
                isFetchingNextPage={isFetchingNextPage}
                isPlaceholderData={isPlaceholderData}
                hasResults={!!data?.pages.length}
                hasNextPage={hasNextPage}
                onLoadMore={fetchNextPage}
            >
                {data?.pages
                    .flatMap((page) => page.data)
                    .map((playlist) => (
                        <PlaylistSummaryCard key={playlist.id} playlist={playlist} playlistWithOwner={playlist} />
                    ))}
            </SearchEntity>
        </>
    );
}
