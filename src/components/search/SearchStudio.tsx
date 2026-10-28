import { useState } from "react";

import { useQuery } from "@apollo/client/react";

import { StudioSummaryCard } from "@/components/card/StudioSummaryCard";
import { SearchEntity } from "@/components/search/SearchEntity";
import { SearchFilterFirstLetter } from "@/components/search-filter/SearchFilterFirstLetter";
import { SearchFilterGroup } from "@/components/search-filter/SearchFilterGroup";
import { SearchFilterSortBy } from "@/components/search-filter/SearchFilterSortBy";
import { graphql } from "@/graphql/generated";
import type { SearchStudioSort } from "@/graphql/generated/graphql";
import useFilterStorage from "@/hooks/useFilterStorage";
import { getNextPage, getSearchStatus } from "@/utils/searchPagination";

interface Filter {
    firstLetter: string | null;
    sortBy: string | null;
}

const initialFilter: Filter = {
    firstLetter: null,
    sortBy: "NAME",
};

export const SEARCH_STUDIO_QUERY = graphql(`
    query SearchStudio($query: String!, $filter: SearchStudioFilterInput, $page: Int!, $sort: [SearchStudioSort!]) {
        search(search: $query, first: 15, page: $page) {
            studios(filter: $filter, sort: $sort) {
                data {
                    ...StudioSummaryCardStudio
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

interface SearchStudioProps {
    searchQuery: string;
}

export function SearchStudio({ searchQuery }: SearchStudioProps) {
    const { filter, updateFilter, bindUpdateFilter } = useFilterStorage("filter-studio-v2", {
        ...initialFilter,
        sortBy: initialFilter.sortBy,
    });
    const [prevSearchQuery, setPrevSearchQuery] = useState(searchQuery);

    const variables = {
        query: searchQuery,
        filter: {
            ...(filter.firstLetter ? { namePrefix: filter.firstLetter } : {}),
        },
        ...(filter.sortBy ? { sort: filter.sortBy.split(",") as Array<SearchStudioSort> } : {}),
    };

    const result = useQuery(SEARCH_STUDIO_QUERY, { variables: { ...variables, page: 1 } });
    const results = (result.data ?? result.previousData)?.search.studios;

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
                {results?.data.map((studio) => <StudioSummaryCard key={studio.slug} studio={studio} />)}
            </SearchEntity>
        </>
    );
}
