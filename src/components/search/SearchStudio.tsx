import { useState } from "react";

import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";

import { StudioSummaryCard } from "@/components/card/StudioSummaryCard";
import { SearchEntity } from "@/components/search/SearchEntity";
import { SearchFilterFirstLetter } from "@/components/search-filter/SearchFilterFirstLetter";
import { SearchFilterGroup } from "@/components/search-filter/SearchFilterGroup";
import { SearchFilterSortBy } from "@/components/search-filter/SearchFilterSortBy";
import { client } from "@/graphql/client";
import { graphql } from "@/graphql/generated";
import type { StudioSortableColumns } from "@/graphql/generated/graphql";
import useFilterStorage from "@/hooks/useFilterStorage";

interface Filter {
    firstLetter: string | null;
    sortBy: string | null;
}

const initialFilter: Filter = {
    firstLetter: null,
    sortBy: "NAME",
};

const query = graphql(`
    query SearchStudio($query: String, $name_like: String, $sort: [StudioSortableColumns!], $page: Int!) {
        studioPagination(search: $query, name_like: $name_like, sort: $sort, first: 15, page: $page) {
            data {
                ...StudioSummaryCardStudio
                slug
            }
            paginationInfo {
                hasMorePages
            }
        }
    }
`);

interface SearchStudioProps {
    searchQuery?: string;
}

export function SearchStudio({ searchQuery }: SearchStudioProps) {
    const { filter, updateFilter, bindUpdateFilter } = useFilterStorage("filter-studio-v2", {
        ...initialFilter,
        sortBy: searchQuery ? null : initialFilter.sortBy,
    });
    const [prevSearchQuery, setPrevSearchQuery] = useState(searchQuery);

    const variables = {
        ...(searchQuery ? { query: searchQuery } : {}),
        ...(filter.firstLetter ? { name_like: `${filter.firstLetter}%` } : {}),
        ...(filter.sortBy ? { sort: filter.sortBy.split(",") as Array<StudioSortableColumns> } : {}),
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
        queryKey: ["searchEntity", "studio", variables],
        queryFn: async ({ pageParam }) => {
            const { data } = await client.query({
                query,
                variables: {
                    ...variables,
                    page: pageParam,
                },
            });

            return data.studioPagination;
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
                <SearchFilterFirstLetter value={filter.firstLetter} setValue={bindUpdateFilter("firstLetter")} />
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
                    .map((studio) => <StudioSummaryCard key={studio.slug} studio={studio} />)}
            </SearchEntity>
        </>
    );
}
