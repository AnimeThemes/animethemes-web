import {
    SearchFilterFirstLetter,
    SearchFilterSeason,
    SearchFilterSortBy,
    SearchFilterYear
} from "components/search-filter";
import useEntitySearch from "hooks/useEntitySearch";
import { SearchEntity } from "components/search";
import { navigate } from "gatsby";
import { AnimeSummaryCard } from "components/card";

const sortByFields = new Map([
    [ "Relevance", null ],
    [ "A ➜ Z", "name" ],
    [ "Z ➜ A", "-name" ],
    [ "Old ➜ New", "year,season,name" ],
    [ "New ➜ Old", "-year,-season,name" ],
    [ "Last Added", "-created_at" ]
]);
const sortByOptions = [ ...sortByFields.keys() ];

export function SearchAnime({ searchQuery, locationState }) {
    const filterFirstLetter = locationState?.filterFirstLetter || null;
    const filterSeason = locationState?.filterSeason || null;
    const filterYear = locationState?.filterYear || null;
    const sortBy = locationState?.sortBy || sortByOptions[0];

    const updateState = (field) => (newValue) => {
        navigate("", {
            state: {
                ...locationState,
                [field]: newValue
            },
            replace: true
        });
    };

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
            filters={
                <>
                    <SearchFilterFirstLetter value={filterFirstLetter} setValue={updateState("filterFirstLetter")}/>
                    <SearchFilterSeason value={filterSeason} setValue={updateState("filterSeason")}/>
                    <SearchFilterYear value={filterYear} setValue={updateState("filterYear")}/>
                    <SearchFilterSortBy options={sortByOptions} value={sortBy} setValue={updateState("sortBy")}/>
                </>
            }
            data={data}
            fetchNextPage={fetchNextPage}
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
            isLoading={isLoading}
            isPlaceholderData={isPlaceholderData}
            renderSummaryCard={(anime) => <AnimeSummaryCard key={anime.slug} anime={anime}/>}
        />
    );
}
