import { useState } from "react";

import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";

import { ThemeSummaryCard } from "@/components/card/ThemeSummaryCard";
import { SearchEntity } from "@/components/search/SearchEntity";
import { SearchFilterGroup } from "@/components/search-filter/SearchFilterGroup";
import { SearchFilterSortBy } from "@/components/search-filter/SearchFilterSortBy";
import { SearchFilterThemeType } from "@/components/search-filter/SearchFilterThemeType";
import { client } from "@/graphql/client";
import { graphql } from "@/graphql/generated";
import type { AnimeThemeSortableColumns, ThemeType } from "@/graphql/generated/graphql";
import useFilterStorage from "@/hooks/useFilterStorage";

interface Filter {
    type: ThemeType | null;
    sortBy: string | null;
}

const initialFilter: Filter = {
    type: null,
    sortBy: "SONG_TITLE",
};

const query = graphql(`
    query SearchTheme($query: String, $type: ThemeType, $sort: [AnimeThemeSortableColumns!], $page: Int!) {
        animethemePagination(search: $query, type: $type, sort: $sort, first: 15, page: $page) {
            data {
                ...ThemeSummaryCardTheme
                ...ThemeSummaryCardThemeExpandable
                slug
            }
            paginationInfo {
                hasMorePages
            }
        }
    }
`);

interface SearchThemeProps {
    searchQuery?: string;
}

export function SearchTheme({ searchQuery }: SearchThemeProps) {
    const { filter, updateFilter, bindUpdateFilter } = useFilterStorage("filter-theme-v2", {
        ...initialFilter,
        sortBy: searchQuery ? null : initialFilter.sortBy,
    });
    const [prevSearchQuery, setPrevSearchQuery] = useState(searchQuery);

    const variables = {
        ...(searchQuery ? { query: searchQuery } : {}),
        ...(filter.type ? { type: filter.type } : {}),
        ...(filter.sortBy ? { sort: filter.sortBy.split(",") as Array<AnimeThemeSortableColumns> } : {}),
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
        queryKey: ["searchEntity", "theme", variables],
        queryFn: async ({ pageParam }) => {
            const { data } = await client.query({
                query,
                variables: {
                    ...variables,
                    page: pageParam,
                },
            });

            return data.animethemePagination;
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
                <SearchFilterThemeType value={filter.type} setValue={bindUpdateFilter("type")} />
                <SearchFilterSortBy value={filter.sortBy} setValue={bindUpdateFilter("sortBy")}>
                    {searchQuery ? <SearchFilterSortBy.Option value={null}>Relevance</SearchFilterSortBy.Option> : null}
                    <SearchFilterSortBy.Option value="SONG_TITLE">A ➜ Z</SearchFilterSortBy.Option>
                    <SearchFilterSortBy.Option value="SONG_TITLE_DESC">Z ➜ A</SearchFilterSortBy.Option>
                    <SearchFilterSortBy.Option value="ANIME_YEAR,ANIME_SEASON,SONG_TITLE">
                        Old ➜ New
                    </SearchFilterSortBy.Option>
                    <SearchFilterSortBy.Option value="ANIME_YEAR_DESC,ANIME_SEASON_DESC,SONG_TITLE">
                        New ➜ Old
                    </SearchFilterSortBy.Option>
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
                    .map((theme) => <ThemeSummaryCard key={theme.slug} theme={theme} expandable={theme} />)}
            </SearchEntity>
        </>
    );
}
