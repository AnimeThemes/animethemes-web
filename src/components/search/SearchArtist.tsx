import { useState } from "react";

import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";

import { ArtistSummaryCard } from "@/components/card/ArtistSummaryCard";
import { SearchEntity } from "@/components/search/SearchEntity";
import { SearchFilterFirstLetter } from "@/components/search-filter/SearchFilterFirstLetter";
import { SearchFilterGroup } from "@/components/search-filter/SearchFilterGroup";
import { SearchFilterSortBy } from "@/components/search-filter/SearchFilterSortBy";
import { client } from "@/graphql/client";
import { graphql } from "@/graphql/generated";
import type { ArtistSort } from "@/graphql/generated/graphql";
import useFilterStorage from "@/hooks/useFilterStorage";

interface Filter {
    firstLetter: string | null;
    sortBy: string | null;
}

const initialFilter: Filter = {
    firstLetter: null,
    sortBy: "NAME_MAIN",
};

const query = graphql(`
    query SearchArtist($query: String, $filter: ArtistFilterInput, $pagination: PaginationInput, $sort: [ArtistSort!]) {
        artistConnection(search: $query, filter: $filter, pagination: $pagination, sort: $sort) {
            nodes {
                ...ArtistSummaryCardArtist
                slug
            }
            pageInfo {
                hasNextPage
                endCursor
            }
        }
    }
`);

interface SearchArtistProps {
    searchQuery?: string;
}

export function SearchArtist({ searchQuery }: SearchArtistProps) {
    const { filter, updateFilter, bindUpdateFilter } = useFilterStorage("filter-artist-v2", {
        ...initialFilter,
        sortBy: searchQuery ? null : initialFilter.sortBy,
    });
    const [prevSearchQuery, setPrevSearchQuery] = useState(searchQuery);

    const variables = {
        ...(searchQuery ? { query: searchQuery } : {}),
        filter: {
            ...(filter.firstLetter ? { nameMainLike: `${filter.firstLetter}%` } : {}),
        },
        ...(filter.sortBy ? { sort: filter.sortBy.split(",") as Array<ArtistSort> } : {}),
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
        queryKey: ["searchEntity", "artist", variables],
        queryFn: async ({ pageParam }) => {
            const { data } = await client.query({
                query,
                variables: {
                    ...variables,
                    pagination: {
                        first: 15,
                        after: pageParam,
                    },
                },
            });

            return data.artistConnection;
        },
        initialPageParam: null as string | null,
        getNextPageParam: (lastPage) => lastPage.pageInfo.endCursor,
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
                <SearchFilterFirstLetter value={filter.firstLetter} setValue={bindUpdateFilter("firstLetter")} />
                <SearchFilterSortBy value={filter.sortBy} setValue={bindUpdateFilter("sortBy")}>
                    {searchQuery ? <SearchFilterSortBy.Option value={null}>Relevance</SearchFilterSortBy.Option> : null}
                    <SearchFilterSortBy.Option value="NAME_MAIN">A ➜ Z</SearchFilterSortBy.Option>
                    <SearchFilterSortBy.Option value="NAME_MAIN_DESC">Z ➜ A</SearchFilterSortBy.Option>
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
                    .flatMap((page) => page.nodes)
                    .map((artist) => <ArtistSummaryCard key={artist.slug} artist={artist} />)}
            </SearchEntity>
        </>
    );
}
