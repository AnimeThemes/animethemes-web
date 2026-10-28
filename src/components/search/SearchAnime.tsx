import { useState } from "react";

import { useQuery } from "@apollo/client/react";

import { AnimeSummaryCard } from "@/components/card/AnimeSummaryCard";
import { SearchEntity } from "@/components/search/SearchEntity";
import { SearchFilterFirstLetter } from "@/components/search-filter/SearchFilterFirstLetter";
import { SearchFilterFormat } from "@/components/search-filter/SearchFilterFormat";
import { SearchFilterGroup } from "@/components/search-filter/SearchFilterGroup";
import { SearchFilterSeason } from "@/components/search-filter/SearchFilterSeason";
import { SearchFilterSortBy } from "@/components/search-filter/SearchFilterSortBy";
import { SearchFilterYear } from "@/components/search-filter/SearchFilterYear";
import { graphql } from "@/graphql/generated";
import type { AnimeFormat, AnimeSeason, SearchAnimeSort } from "@/graphql/generated/graphql";
import useFilterStorage from "@/hooks/useFilterStorage";
import { getNextPage, getSearchStatus } from "@/utils/searchPagination";

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

export const SEARCH_ANIME_QUERY = graphql(`
    query SearchAnime($query: String!, $filter: SearchAnimeFilterInput, $page: Int!, $sort: [SearchAnimeSort!]) {
        search(search: $query, first: 15, page: $page) {
            anime(filter: $filter, sort: $sort) {
                data {
                    ...AnimeSummaryCardAnime
                    ...AnimeSummaryCardAnimeExpandable
                    slug
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

interface SearchAnimeProps {
    searchQuery: string;
}

export function SearchAnime({ searchQuery }: SearchAnimeProps) {
    const { filter, updateFilter, bindUpdateFilter } = useFilterStorage("filter-anime-v2", {
        ...initialFilter,
        sortBy: searchQuery ? null : initialFilter.sortBy,
    });
    const [prevSearchQuery, setPrevSearchQuery] = useState(searchQuery);

    const variables = {
        query: searchQuery,
        filter: {
            ...(filter.firstLetter ? { titleRomajiPrefix: filter.firstLetter } : {}),
            ...(filter.season ? { season: filter.season } : {}),
            ...(filter.year ? { year: parseInt(filter.year) } : {}),
            ...(filter.format ? { format: filter.format } : {}),
        },
        ...(filter.sortBy ? { sort: filter.sortBy.split(",") as Array<SearchAnimeSort> } : {}),
    };

    const result = useQuery(SEARCH_ANIME_QUERY, { variables: { ...variables, page: 1 } });
    const results = (result.data ?? result.previousData)?.search.anime;

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
                <SearchFilterFirstLetter value={filter.firstLetter} setValue={bindUpdateFilter("firstLetter")} />
                <SearchFilterSeason value={filter.season} setValue={bindUpdateFilter("season")} />
                <SearchFilterYear value={filter.year} setValue={bindUpdateFilter("year")} />
                <SearchFilterFormat value={filter.format} setValue={bindUpdateFilter("format")} />
                <SearchFilterSortBy value={filter.sortBy} setValue={bindUpdateFilter("sortBy")}>
                    {searchQuery ? <SearchFilterSortBy.Option value={null}>Relevance</SearchFilterSortBy.Option> : null}
                    <SearchFilterSortBy.Option value="TITLE_ROMAJI">A ➜ Z</SearchFilterSortBy.Option>
                    <SearchFilterSortBy.Option value="TITLE_ROMAJI_DESC">Z ➜ A</SearchFilterSortBy.Option>
                    <SearchFilterSortBy.Option value="YEAR,SEASON,TITLE_ROMAJI">Old ➜ New</SearchFilterSortBy.Option>
                    <SearchFilterSortBy.Option value="YEAR_DESC,SEASON_DESC,TITLE_ROMAJI">
                        New ➜ Old
                    </SearchFilterSortBy.Option>
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
                {results?.data.map((anime) => <AnimeSummaryCard key={anime.slug} anime={anime} expandable={anime} />)}
            </SearchEntity>
        </>
    );
}
