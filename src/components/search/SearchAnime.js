import {
    SearchFilterFirstLetter,
    SearchFilterSeason,
    SearchFilterSortBy,
    SearchFilterYear
} from "components/search-filter";
import { useEffect, useState } from "react";
import useEntitySearch from "hooks/useEntitySearch";
import { SearchEntity } from "components/search";
import { navigate } from "gatsby";
import { useLocation } from "@reach/router";

const sortByFields = new Map([
    [ "Relevance", null ],
    [ "A ➜ Z", "name" ],
    [ "Z ➜ A", "-name" ],
    [ "Old ➜ New", "year,season,name" ],
    [ "New ➜ Old", "-year,-season,name" ],
    [ "Last Added", "-created_at" ]
]);
const sortByOptions = [ ...sortByFields.keys() ];

export function SearchAnime({ searchQuery }) {
    const location = useLocation();

    console.log(location);

    const [ filterFirstLetter, setFilterFirstLetter ] = useState(location.state?.filterFirstLetter || null);
    const [ filterSeason, setFilterSeason ] = useState(location.state?.filterSeason || null);
    const [ filterYear, setFilterYear ] = useState(location.state?.filterYear || null);
    const [ sortBy, setSortBy ] = useState(location.state?.sortBy || sortByOptions[0]);

    useEffect(() => {
        navigate("/search/anime", {
            state: { filterFirstLetter, filterSeason, filterYear, sortBy },
            replace: true
        });
    }, [ filterFirstLetter, filterSeason, filterYear, sortBy ]);

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        isPlaceholderData
    } = useEntitySearch("anime", searchQuery, {
        filters: {
            "name][like": filterFirstLetter ? `${filterFirstLetter}%` : null,
            season: filterSeason,
            year: filterYear
        },
        sortBy: sortByFields.get(sortBy)
    });

    return (
        <SearchEntity
            searchQuery={searchQuery}
            searchEntity="anime"
            filters={
                <>
                    <SearchFilterFirstLetter value={filterFirstLetter} setValue={setFilterFirstLetter}/>
                    <SearchFilterSeason value={filterSeason} setValue={setFilterSeason}/>
                    <SearchFilterYear value={filterYear} setValue={setFilterYear}/>
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
