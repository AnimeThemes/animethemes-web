import { useState } from "react";

import gql from "graphql-tag";

import { StudioSummaryCard } from "@/components/card/StudioSummaryCard";
import { StudioCoverImage } from "@/components/image/StudioCoverImage";
import { SearchEntity } from "@/components/search/SearchEntity";
import { SearchFilterFirstLetter } from "@/components/search-filter/SearchFilterFirstLetter";
import { SearchFilterSortBy } from "@/components/search-filter/SearchFilterSortBy";
import type { SearchStudioQuery, SearchStudioQueryVariables } from "@/generated/graphql";
import useFilterStorage from "@/hooks/useFilterStorage";
import { fetchDataClient } from "@/lib/client";

const initialFilter = {
    firstLetter: null,
    sortBy: "name",
};

interface SearchStudioProps {
    searchQuery?: string;
}

export function SearchStudio({ searchQuery }: SearchStudioProps) {
    const { filter, updateFilter, bindUpdateFilter } = useFilterStorage("filter-studio", {
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
        <SearchEntity<SearchStudioQuery["searchStudio"]["data"][number]>
            entity="studio"
            searchArgs={{
                query: searchQuery,
                filters: {
                    "name-like": filter.firstLetter ? `${filter.firstLetter}%` : null,
                },
                sortBy: filter.sortBy,
            }}
            fetchResults={async (searchArgs) => {
                const { data } = await fetchDataClient<SearchStudioQuery, SearchStudioQueryVariables>(
                    gql`
                        ${StudioCoverImage.fragments.studio}

                        query SearchStudio($args: SearchArgs!) {
                            searchStudio(args: $args) {
                                data {
                                    ...StudioCoverImageStudio
                                    slug
                                    name
                                }
                                nextPage
                            }
                        }
                    `,
                    { args: searchArgs },
                );

                return data.searchStudio;
            }}
            renderResult={(studio) => <StudioSummaryCard key={studio.slug} studio={studio} />}
            filters={
                <>
                    <SearchFilterFirstLetter value={filter.firstLetter} setValue={bindUpdateFilter("firstLetter")} />
                    <SearchFilterSortBy value={filter.sortBy} setValue={bindUpdateFilter("sortBy")}>
                        {searchQuery ? (
                            <SearchFilterSortBy.Option value={null}>Relevance</SearchFilterSortBy.Option>
                        ) : null}
                        <SearchFilterSortBy.Option value="name">A ➜ Z</SearchFilterSortBy.Option>
                        <SearchFilterSortBy.Option value="-name">Z ➜ A</SearchFilterSortBy.Option>
                        <SearchFilterSortBy.Option value="-created_at">Last Added</SearchFilterSortBy.Option>
                    </SearchFilterSortBy>
                </>
            }
        />
    );
}
