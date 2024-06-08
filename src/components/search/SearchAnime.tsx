import { useState } from "react";

import gql from "graphql-tag";

import { AnimeSummaryCard } from "@/components/card/AnimeSummaryCard";
import { SearchEntity } from "@/components/search/SearchEntity";
import { SearchFilterFirstLetter } from "@/components/search-filter/SearchFilterFirstLetter";
import { SearchFilterMediaFormat } from "@/components/search-filter/SearchFilterMediaFormat";
import { SearchFilterSeason } from "@/components/search-filter/SearchFilterSeason";
import { SearchFilterSortBy } from "@/components/search-filter/SearchFilterSortBy";
import { SearchFilterYear } from "@/components/search-filter/SearchFilterYear";
import type { SearchAnimeQuery, SearchAnimeQueryVariables } from "@/generated/graphql";
import useFilterStorage from "@/hooks/useFilterStorage";
import { fetchDataClient } from "@/lib/client";

const initialFilter = {
    firstLetter: null,
    season: null,
    year: null,
    mediaFormat: null,
    sortBy: "name",
};

interface SearchAnimeProps {
    searchQuery?: string;
}

export function SearchAnime({ searchQuery }: SearchAnimeProps) {
    const { filter, updateFilter, bindUpdateFilter } = useFilterStorage("filter-anime", {
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
        <SearchEntity<SearchAnimeQuery["searchAnime"]["data"][number]>
            entity="anime"
            searchArgs={{
                query: searchQuery,
                filters: {
                    "name-like": filter.firstLetter ? `${filter.firstLetter}%` : null,
                    season: filter.season,
                    year: filter.year,
                    media_format: filter.mediaFormat,
                },
                sortBy: filter.sortBy,
            }}
            fetchResults={async (searchArgs) => {
                const { data } = await fetchDataClient<SearchAnimeQuery, SearchAnimeQueryVariables>(
                    gql`
                        ${AnimeSummaryCard.fragments.anime}
                        ${AnimeSummaryCard.fragments.expandable}

                        query SearchAnime($args: SearchArgs!) {
                            searchAnime(args: $args) {
                                data {
                                    ...AnimeSummaryCardAnime
                                    ...AnimeSummaryCardAnimeExpandable
                                }
                                nextPage
                            }
                        }
                    `,
                    { args: searchArgs },
                );

                return data.searchAnime;
            }}
            renderResult={(anime) => <AnimeSummaryCard key={anime.slug} anime={anime} expandable />}
            filters={
                <>
                    <SearchFilterFirstLetter value={filter.firstLetter} setValue={bindUpdateFilter("firstLetter")} />
                    <SearchFilterSeason value={filter.season} setValue={bindUpdateFilter("season")} />
                    <SearchFilterYear value={filter.year} setValue={bindUpdateFilter("year")} />
                    <SearchFilterMediaFormat value={filter.mediaFormat} setValue={bindUpdateFilter("mediaFormat")} />
                    <SearchFilterSortBy value={filter.sortBy} setValue={bindUpdateFilter("sortBy")}>
                        {searchQuery ? (
                            <SearchFilterSortBy.Option value={null}>Relevance</SearchFilterSortBy.Option>
                        ) : null}
                        <SearchFilterSortBy.Option value="name">A ➜ Z</SearchFilterSortBy.Option>
                        <SearchFilterSortBy.Option value="-name">Z ➜ A</SearchFilterSortBy.Option>
                        <SearchFilterSortBy.Option value="year,season,name">Old ➜ New</SearchFilterSortBy.Option>
                        <SearchFilterSortBy.Option value="-year,-season,name">New ➜ Old</SearchFilterSortBy.Option>
                        <SearchFilterSortBy.Option value="-created_at">Last Added</SearchFilterSortBy.Option>
                    </SearchFilterSortBy>
                </>
            }
        />
    );
}
