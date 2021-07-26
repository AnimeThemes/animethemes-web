import { SearchFilterSortBy, SearchFilterThemeType } from "components/search-filter";
import { useEffect, useState } from "react";
import useEntitySearch from "hooks/useEntitySearch";
import { SearchEntity } from "components/search";
import { useLocation } from "@reach/router";
import { navigate } from "gatsby";

const sortByFields = new Map([
    [ "Relevance", null ],
    [ "Last Added", "-created_at" ]
]);
const sortByOptions = [ ...sortByFields.keys() ];

export function SearchTheme({ searchQuery }) {
    const location = useLocation();

    const [ filterType, setFilterType ] = useState(location.state?.filterType || null);
    const [ sortBy, setSortBy ] = useState(location.state?.sortBy || sortByOptions[0]);

    useEffect(() => {
        navigate("", {
            state: { filterType, sortBy },
            replace: true
        });
    }, [ filterType, sortBy ]);

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        isPlaceholderData
    } = useEntitySearch("theme", searchQuery, {
        filters: {
            type: filterType
        },
        sortBy: sortByFields.get(sortBy)
    });

    return (
        <SearchEntity
            searchQuery={searchQuery}
            searchEntity="theme"
            filters={
                <>
                    <SearchFilterThemeType value={filterType} setValue={setFilterType}/>
                    <SearchFilterSortBy options={sortByOptions} value={sortBy} setValue={setSortBy}/>
                </>
            }
            data={data}
            fetchNextPage={fetchNextPage}
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
            isLoading={isLoading}
            isPlaceholderData={isPlaceholderData}
        />
    );
}
