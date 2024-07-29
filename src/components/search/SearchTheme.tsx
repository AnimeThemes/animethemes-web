import { useState } from "react";

import gql from "graphql-tag";

import { ThemeSummaryCard } from "@/components/card/ThemeSummaryCard";
import { SearchEntity } from "@/components/search/SearchEntity";
import { SearchFilterFirstLetter } from "@/components/search-filter/SearchFilterFirstLetter";
import { SearchFilterSortBy } from "@/components/search-filter/SearchFilterSortBy";
import { SearchFilterThemeType } from "@/components/search-filter/SearchFilterThemeType";
import type { SearchThemeQuery, SearchThemeQueryVariables } from "@/generated/graphql";
import useFilterStorage from "@/hooks/useFilterStorage";
import { fetchDataClient } from "@/lib/client";

const initialFilter = {
    firstLetter: null,
    type: null,
    sortBy: "song.title",
};

interface SearchThemeProps {
    searchQuery?: string;
}

export function SearchTheme({ searchQuery }: SearchThemeProps) {
    const { filter, updateFilter, bindUpdateFilter } = useFilterStorage("filter-theme", {
        ...initialFilter,
        sortBy: searchQuery ? null : initialFilter.sortBy,
    });
    const [prevSearchQuery, setPrevSearchQuery] = useState(searchQuery);

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
        <SearchEntity<SearchThemeQuery["searchTheme"]["data"][number]>
            entity="theme"
            searchArgs={{
                query: searchQuery,
                filters: {
                    has: "song",
                    "song][title-like": filter.firstLetter ? `${filter.firstLetter}%` : null,
                    type: filter.type,
                },
                sortBy: filter.sortBy,
            }}
            fetchResults={async (searchArgs) => {
                const { data } = await fetchDataClient<SearchThemeQuery, SearchThemeQueryVariables>(
                    gql`
                        ${ThemeSummaryCard.fragments.theme}
                        ${ThemeSummaryCard.fragments.expandable}

                        query SearchTheme($args: SearchArgs!) {
                            searchTheme(args: $args) {
                                data {
                                    ...ThemeSummaryCardTheme
                                    ...ThemeSummaryCardThemeExpandable
                                }
                                nextPage
                            }
                        }
                    `,
                    { args: searchArgs },
                );

                return data.searchTheme;
            }}
            renderResult={(theme) => (
                <ThemeSummaryCard key={`${theme.anime?.slug}-${theme.id}`} theme={theme} expandable />
            )}
            filters={
                <>
                    <SearchFilterFirstLetter value={filter.firstLetter} setValue={bindUpdateFilter("firstLetter")} />
                    <SearchFilterThemeType value={filter.type} setValue={bindUpdateFilter("type")} />
                    <SearchFilterSortBy value={filter.sortBy} setValue={bindUpdateFilter("sortBy")}>
                        {searchQuery ? (
                            <SearchFilterSortBy.Option value={null}>Relevance</SearchFilterSortBy.Option>
                        ) : null}
                        <SearchFilterSortBy.Option value="song.title">A ➜ Z</SearchFilterSortBy.Option>
                        <SearchFilterSortBy.Option value="-song.title">Z ➜ A</SearchFilterSortBy.Option>
                        <SearchFilterSortBy.Option value="anime.year,anime.season,song.title">
                            Old ➜ New
                        </SearchFilterSortBy.Option>
                        <SearchFilterSortBy.Option value="-anime.year,-anime.season,song.title">
                            New ➜ Old
                        </SearchFilterSortBy.Option>
                        <SearchFilterSortBy.Option value="-created_at">Last Added</SearchFilterSortBy.Option>
                    </SearchFilterSortBy>
                </>
            }
        />
    );
}
