import {
    SearchFilterFirstLetter,
    SearchFilterSeason,
    SearchFilterSortBy,
    SearchFilterYear
} from "components/search-filter";
import { SearchEntity } from "components/search";
import { AnimeSummaryCard } from "components/card";
import { useState } from "react";
import gql from "graphql-tag";
import type { SearchAnimeQuery, SearchAnimeQueryVariables } from "generated/graphql";
import { fetchDataClient } from "lib/client";
import useFilterStorage from "hooks/useFilterStorage";

const initialFilter = {
    firstLetter: null,
    season: null,
    year: null,
    sortBy: "name",
};

interface SearchAnimeProps {
    searchQuery?: string
}

export function SearchAnime({ searchQuery }: SearchAnimeProps) {
    const { filter, updateFilter, bindUpdateFilter } = useFilterStorage("filter-anime", {
        ...initialFilter,
        sortBy: searchQuery ? null : initialFilter.sortBy,
    });
    const [ prevSearchQuery, setPrevSearchQuery ] = useState(searchQuery);

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
        <SearchEntity
            <SearchAnimeQuery["searchAnime"]["data"][number]>
            entity="anime"
            searchArgs={{
                query: searchQuery,
                filters: {
                    "name-like": filter.firstLetter ? `${filter.firstLetter}%` : null,
                    season: filter.season,
                    year: filter.year
                },
                sortBy: filter.sortBy,
            }}
            fetchResults={async (searchArgs) => {
                const { data } = await fetchDataClient<SearchAnimeQuery, SearchAnimeQueryVariables>(gql`
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
                `, { args: searchArgs });

                return data.searchAnime;
            }}
            renderResult={(anime) => (
                <AnimeSummaryCard key={anime.slug} anime={anime} expandable/>
            )}
            filters={
                <>
                    <SearchFilterFirstLetter value={filter.firstLetter} setValue={bindUpdateFilter("firstLetter")}/>
                    <SearchFilterSeason value={filter.season} setValue={bindUpdateFilter("season")}/>
                    <SearchFilterYear value={filter.year} setValue={bindUpdateFilter("year")}/>
                    <SearchFilterSortBy value={filter.sortBy} setValue={bindUpdateFilter("sortBy")}>
                        {searchQuery ? (
                            <SearchFilterSortBy.Option>Relevance</SearchFilterSortBy.Option>
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
