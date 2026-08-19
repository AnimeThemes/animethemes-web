import { useState } from "react";

import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";

import { SummaryCard } from "@/components/card/SummaryCard";
import { SearchEntity } from "@/components/search/SearchEntity";
import { SearchFilterFirstLetter } from "@/components/search-filter/SearchFilterFirstLetter";
import { SearchFilterGroup } from "@/components/search-filter/SearchFilterGroup";
import { SearchFilterSortBy } from "@/components/search-filter/SearchFilterSortBy";
import { client } from "@/graphql/client";
import { graphql } from "@/graphql/generated";
import type { SeriesSort } from "@/graphql/generated/graphql";
import useFilterStorage from "@/hooks/useFilterStorage";

interface Filter {
    firstLetter: string | null;
    sortBy: string | null;
}

const initialFilter: Filter = {
    firstLetter: null,
    sortBy: "TITLE_ROMAJI",
};

const query = graphql(`
    query SearchSeries($query: String, $filter: SeriesFilterInput, $pagination: PaginationInput, $sort: [SeriesSort!]) {
        seriesConnection(search: $query, filter: $filter, pagination: $pagination, sort: $sort) {
            nodes {
                slug
                title {
                    romaji
                }
            }
            pageInfo {
                hasNextPage
                endCursor
            }
        }
    }
`);

interface SearchSeriesProps {
    searchQuery?: string;
}

export function SearchSeries({ searchQuery }: SearchSeriesProps) {
    const { filter, updateFilter, bindUpdateFilter } = useFilterStorage("filter-series-v2", {
        ...initialFilter,
        sortBy: searchQuery ? null : initialFilter.sortBy,
    });
    const [prevSearchQuery, setPrevSearchQuery] = useState(searchQuery);

    const variables = {
        ...(searchQuery ? { query: searchQuery } : {}),
        filter: {
            ...(filter.firstLetter ? { titleRomajiLike: `${filter.firstLetter}%` } : {}),
        },
        ...(filter.sortBy ? { sort: filter.sortBy.split(",") as Array<SeriesSort> } : {}),
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
        queryKey: ["searchEntity", "series", variables],
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

            return data.seriesConnection;
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
                    <SearchFilterSortBy.Option value="TITLE_ROMAJI">A ➜ Z</SearchFilterSortBy.Option>
                    <SearchFilterSortBy.Option value="TITLE_ROMAJI_DESC">Z ➜ A</SearchFilterSortBy.Option>
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
                    .map((series) => (
                        <SummaryCard
                            key={series.slug}
                            title={series.title.romaji}
                            description="Series"
                            to={`/series/${series.slug}`}
                        />
                    ))}
            </SearchEntity>
        </>
    );
}
