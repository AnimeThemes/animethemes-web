import { SearchFilterFirstLetter, SearchFilterSortBy } from "components/search-filter";
import { SearchEntity } from "components/search";
import { SummaryCard } from "components/card";
import type { SyntheticEvent } from "react";
import { useState } from "react";
import { fetchDataClient } from "lib/client";
import type { SearchStudioQuery, SearchStudioQueryVariables } from "generated/graphql";
import gql from "graphql-tag";
import { StudioCoverImage } from "components/image/StudioCoverImage";
import extractImages from "utils/extractImages";
import extractBackgroundColor from "utils/extractBackgroundColor";
import type { Property } from "csstype";
import useFilterStorage from "hooks/useFilterStorage";

const initialFilter = {
    firstLetter: null,
    sortBy: "name",
};

interface SearchStudioProps {
    searchQuery?: string
}

export function SearchStudio({ searchQuery }: SearchStudioProps) {
    const { filter, updateFilter, bindUpdateFilter } = useFilterStorage("filter-studio", {
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
            <SearchStudioQuery["searchStudio"]["data"][number]>
            entity="studio"
            searchArgs={{
                query: searchQuery,
                filters: {
                    "name-like": filter.firstLetter ? `${filter.firstLetter}%` : null,
                },
                sortBy: filter.sortBy,
            }}
            fetchResults={async (searchArgs) => {
                const { data } = await fetchDataClient<SearchStudioQuery, SearchStudioQueryVariables>(gql`
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
                `, { args: searchArgs });

                return data.searchStudio;
            }}
            renderResult={(studio) => (
                <StudioSummaryCard key={studio.slug} studio={studio}/>
            )}
            filters={
                <>
                    <SearchFilterFirstLetter value={filter.firstLetter} setValue={bindUpdateFilter("firstLetter")}/>
                    <SearchFilterSortBy value={filter.sortBy} setValue={bindUpdateFilter("sortBy")}>
                        {searchQuery ? (
                            <SearchFilterSortBy.Option>Relevance</SearchFilterSortBy.Option>
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

interface StudioSummaryCardProps {
    studio: SearchStudioQuery["searchStudio"]["data"][number]
}

function StudioSummaryCard({ studio }: StudioSummaryCardProps) {
    const [backgroundColor, setBackgroundColor] = useState<Property.Background>();

    function handleLoad(event: SyntheticEvent<HTMLImageElement>) {
        const image = event.currentTarget;
        const color = extractBackgroundColor(image);
        if (color) {
            setBackgroundColor(color);
        }
    }

    return (
        <SummaryCard
            key={studio.slug}
            title={studio.name}
            description="Studio"
            to={`/studio/${studio.slug}`}
            image={extractImages(studio).largeCover}
            imageProps={{
                objectFit: "contain",
                backgroundColor,
                onLoad: handleLoad
            }}
        />
    );
}
