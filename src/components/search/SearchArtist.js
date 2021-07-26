import { SearchFilterFirstLetter, SearchFilterSortBy } from "components/search-filter";
import { useEffect, useState } from "react";
import useEntitySearch from "hooks/useEntitySearch";
import { SearchEntity } from "components/search";
import { useLocation } from "@reach/router";
import { navigate } from "gatsby";

const sortByFields = new Map([
    [ "Relevance", null ],
    [ "A ➜ Z", "name" ],
    [ "Z ➜ A", "-name" ],
    [ "Last Added", "-created_at" ]
]);
const sortByOptions = [ ...sortByFields.keys() ];

export function SearchArtist({ searchQuery }) {
    const location = useLocation();

    const [ filterFirstLetter, setFilterFirstLetter ] = useState(location.state?.filterFirstLetter || null);
    const [ sortBy, setSortBy ] = useState(location.state?.sortBy || sortByOptions[0]);

    useEffect(() => {
        navigate("", {
            state: { filterFirstLetter, sortBy },
            replace: true
        });
    }, [ filterFirstLetter, sortBy ]);

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        isPlaceholderData
    } = useEntitySearch("artist", searchQuery, {
        filters: {
            "name][like": filterFirstLetter ? `${filterFirstLetter}%` : null,
        },
        sortBy: sortByFields.get(sortBy)
    });

    return (
        <SearchEntity
            searchQuery={searchQuery}
            searchEntity="artist"
            filters={
                <>
                    <SearchFilterFirstLetter value={filterFirstLetter} setValue={setFilterFirstLetter}/>
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
