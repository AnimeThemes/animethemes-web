import { useState } from "react";

import { useQuery } from "@apollo/client/react";

import { ArtistSummaryCard } from "@/components/card/ArtistSummaryCard";
import { SearchEntity } from "@/components/search/SearchEntity";
import { SearchFilterFirstLetter } from "@/components/search-filter/SearchFilterFirstLetter";
import { SearchFilterGroup } from "@/components/search-filter/SearchFilterGroup";
import { SearchFilterSortBy } from "@/components/search-filter/SearchFilterSortBy";
import { graphql } from "@/graphql/generated";
import type { SearchArtistSort } from "@/graphql/generated/graphql";
import useFilterStorage from "@/hooks/useFilterStorage";
import { getNextPage, getSearchStatus } from "@/utils/searchPagination";

interface Filter {
    firstLetter: string | null;
    sortBy: string | null;
}

const initialFilter: Filter = {
    firstLetter: null,
    sortBy: "NAME_MAIN",
};

export const SEARCH_ARTIST_QUERY = graphql(`
    query SearchArtist($query: String!, $filter: SearchArtistFilterInput, $page: Int!, $sort: [SearchArtistSort!]) {
        search(search: $query, first: 15, page: $page) {
            artists(filter: $filter, sort: $sort) {
                data {
                    ...ArtistSummaryCardArtist
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

interface SearchArtistProps {
    searchQuery: string;
}

export function SearchArtist({ searchQuery }: SearchArtistProps) {
    const { filter, updateFilter, bindUpdateFilter } = useFilterStorage("filter-artist-v2", {
        ...initialFilter,
        sortBy: searchQuery ? null : initialFilter.sortBy,
    });
    const [prevSearchQuery, setPrevSearchQuery] = useState(searchQuery);

    const variables = {
        query: searchQuery,
        filter: {
            ...(filter.firstLetter ? { nameMainPrefix: filter.firstLetter } : {}),
        },
        ...(filter.sortBy ? { sort: filter.sortBy.split(",") as Array<SearchArtistSort> } : {}),
    };

    const result = useQuery(SEARCH_ARTIST_QUERY, { variables: { ...variables, page: 1 } });
    const results = (result.data ?? result.previousData)?.search.artists;

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
                    <SearchFilterSortBy.Option value="NAME_MAIN">A ➜ Z</SearchFilterSortBy.Option>
                    <SearchFilterSortBy.Option value="NAME_MAIN_DESC">Z ➜ A</SearchFilterSortBy.Option>
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
                {results?.data.map((artist) => <ArtistSummaryCard key={artist.slug} artist={artist} />)}
            </SearchEntity>
        </>
    );
}
