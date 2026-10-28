import { useState } from "react";

import { useQuery } from "@apollo/client/react";

import { ThemeSummaryCard } from "@/components/card/ThemeSummaryCard";
import { SearchEntity } from "@/components/search/SearchEntity";
import { SearchFilterFirstLetter } from "@/components/search-filter/SearchFilterFirstLetter";
import { SearchFilterGroup } from "@/components/search-filter/SearchFilterGroup";
import { SearchFilterSortBy } from "@/components/search-filter/SearchFilterSortBy";
import { SearchFilterThemeType } from "@/components/search-filter/SearchFilterThemeType";
import { graphql } from "@/graphql/generated";
import type { SearchThemeSort, ThemeType } from "@/graphql/generated/graphql";
import useFilterStorage from "@/hooks/useFilterStorage";
import { getNextPage, getSearchStatus } from "@/utils/searchPagination";

interface Filter {
    firstLetter: string | null;
    type: ThemeType | null;
    sortBy: string | null;
}

const initialFilter: Filter = {
    firstLetter: null,
    type: null,
    sortBy: "SONG_TITLE_ROMAJI",
};

export const SEARCH_THEME_QUERY = graphql(`
    query SearchTheme($query: String!, $page: Int!, $filter: SearchThemeFilterInput, $sort: [SearchThemeSort!]) {
        search(search: $query, first: 15, page: $page) {
            themes(filter: $filter, sort: $sort) {
                data {
                    ...ThemeSummaryCardTheme
                    ...ThemeSummaryCardThemeExpandable
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

interface SearchThemeProps {
    searchQuery: string;
}

export function SearchTheme({ searchQuery }: SearchThemeProps) {
    const { filter, updateFilter, bindUpdateFilter } = useFilterStorage("filter-theme-v2", {
        ...initialFilter,
        sortBy: initialFilter.sortBy,
    });
    const [prevSearchQuery, setPrevSearchQuery] = useState(searchQuery);

    const variables = {
        query: searchQuery,
        filter: {
            ...(filter.firstLetter ? { songTitleRomajiPrefix: filter.firstLetter } : {}),
            ...(filter.type ? { type: filter.type } : {}),
        },
        ...(filter.sortBy ? { sort: filter.sortBy.split(",") as Array<SearchThemeSort> } : {}),
    };

    const result = useQuery(SEARCH_THEME_QUERY, { variables: { ...variables, page: 1 } });
    const results = (result.data ?? result.previousData)?.search.themes;

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
                <SearchFilterThemeType value={filter.type} setValue={bindUpdateFilter("type")} />
                <SearchFilterSortBy value={filter.sortBy} setValue={bindUpdateFilter("sortBy")}>
                    {searchQuery ? <SearchFilterSortBy.Option value={null}>Relevance</SearchFilterSortBy.Option> : null}
                    <SearchFilterSortBy.Option value="SONG_TITLE_ROMAJI">A ➜ Z</SearchFilterSortBy.Option>
                    <SearchFilterSortBy.Option value="SONG_TITLE_ROMAJI_DESC">Z ➜ A</SearchFilterSortBy.Option>
                    <SearchFilterSortBy.Option value="ANIME_YEAR,ANIME_SEASON,SONG_TITLE_ROMAJI">
                        Old ➜ New
                    </SearchFilterSortBy.Option>
                    <SearchFilterSortBy.Option value="ANIME_YEAR_DESC,ANIME_SEASON_DESC,SONG_TITLE_ROMAJI">
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
                {results?.data.map((theme) => <ThemeSummaryCard key={theme.id} theme={theme} expandable={theme} />)}
            </SearchEntity>
        </>
    );
}
