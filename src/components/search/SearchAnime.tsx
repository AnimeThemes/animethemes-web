import { useState } from "react";

import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";

import { AnimeSummaryCard } from "@/components/card/AnimeSummaryCard";
import { SearchEntity } from "@/components/search/SearchEntity";
import { SearchFilterFirstLetter } from "@/components/search-filter/SearchFilterFirstLetter";
import { SearchFilterFormat } from "@/components/search-filter/SearchFilterFormat";
import { SearchFilterGroup } from "@/components/search-filter/SearchFilterGroup";
import { SearchFilterSeason } from "@/components/search-filter/SearchFilterSeason";
import { SearchFilterSortBy } from "@/components/search-filter/SearchFilterSortBy";
import { SearchFilterYear } from "@/components/search-filter/SearchFilterYear";
import { client } from "@/graphql/client";
import { graphql } from "@/graphql/generated";
import type { AnimeFormat, AnimeSeason, AnimeSort } from "@/graphql/generated/graphql";
import useFilterStorage from "@/hooks/useFilterStorage";

interface Filter {
    firstLetter: string | null;
    season: AnimeSeason | null;
    year: string | null;
    format: AnimeFormat | null;
    sortBy: string | null;
}

const initialFilter: Filter = {
    firstLetter: null,
    season: null,
    year: null,
    format: null,
    sortBy: "TITLE_ROMAJI",
};

const query = graphql(`
    query SearchAnime(
        $query: String
        $filter: AnimeFilterInput
        $pagination: PaginationInput,
        $sort: [AnimeSort!]
    ) {
        animeConnection(
            search: $query
            filter: $filter,
            pagination: $pagination,
            sort: $sort
        ) {
            nodes {
                ...AnimeSummaryCardAnime
                ...AnimeSummaryCardAnimeExpandable
                slug
            }
            pageInfo {
                hasNextPage
            }
        }
    }
`);

interface SearchAnimeProps {
    searchQuery?: string;
}

export function SearchAnime({ searchQuery }: SearchAnimeProps) {
    const { filter, updateFilter, bindUpdateFilter } = useFilterStorage("filter-anime-v2", {
        ...initialFilter,
        sortBy: searchQuery ? null : initialFilter.sortBy,
    });
    const [prevSearchQuery, setPrevSearchQuery] = useState(searchQuery);

    const variables = {
        ...(searchQuery ? { query: searchQuery } : {}),
        filter: {
            ...(filter.firstLetter ? { titleRomaji_like: `${filter.firstLetter}%` } : {}),
            ...(filter.season ? { season: filter.season } : {}),
            ...(filter.year ? { year: parseInt(filter.year) } : {}),
            ...(filter.format ? { format: filter.format } : {}),
        },
        ...(filter.sortBy ? { sort: filter.sortBy.split(",") as Array<AnimeSort> } : {}),
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
        queryKey: ["searchEntity", "anime", variables],
        queryFn: async ({ pageParam }) => {
            const { data } = await client.query({
                query,
                variables: {
                    ...variables,
                    pagination: {
                        first: 15,
                        page: pageParam,
                    },
                },
            });

            return data.animeConnection;
        },
        initialPageParam: 1,
        getNextPageParam: (lastPage, _, lastPageParam) =>
            lastPage.pageInfo.hasNextPage ? lastPageParam + 1 : null,
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
                <SearchFilterSeason value={filter.season} setValue={bindUpdateFilter("season")} />
                <SearchFilterYear value={filter.year} setValue={bindUpdateFilter("year")} />
                <SearchFilterFormat value={filter.format} setValue={bindUpdateFilter("format")} />
                <SearchFilterSortBy value={filter.sortBy} setValue={bindUpdateFilter("sortBy")}>
                    {searchQuery ? <SearchFilterSortBy.Option value={null}>Relevance</SearchFilterSortBy.Option> : null}
                    <SearchFilterSortBy.Option value="TITLE_ROMAJI">A ➜ Z</SearchFilterSortBy.Option>
                    <SearchFilterSortBy.Option value="TITLE_ROMAJI_DESC">Z ➜ A</SearchFilterSortBy.Option>
                    <SearchFilterSortBy.Option value="YEAR,SEASON,TITLE_ROMAJI">Old ➜ New</SearchFilterSortBy.Option>
                    <SearchFilterSortBy.Option value="YEAR_DESC,SEASON_DESC,TITLE_ROMAJI">New ➜ Old</SearchFilterSortBy.Option>
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
                    .map((anime) => <AnimeSummaryCard key={anime.slug} anime={anime} expandable={anime} />)}
            </SearchEntity>
        </>
    );
}
