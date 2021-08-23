import { SearchFilterFirstLetter, SearchFilterSortBy } from "components/search-filter";
import useEntitySearch from "hooks/useEntitySearch";
import { SearchEntity } from "components/search";
import { navigate } from "gatsby";
import { SummaryCard } from "components/card";

const sortByFields = new Map([
    [ "Relevance", null ],
    [ "A ➜ Z", "name" ],
    [ "Z ➜ A", "-name" ],
    [ "Last Added", "-created_at" ]
]);
const sortByOptions = [ ...sortByFields.keys() ];

export function SearchSeries({ searchQuery, locationState }) {
    const filterFirstLetter = locationState?.filterFirstLetter || null;
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
    } = useEntitySearch("series", searchQuery, {
        filters: {
            "name][like": filterFirstLetter ? `${filterFirstLetter}%` : null,
        },
        sortBy: sortByFields.get(sortBy)
    });

    return (
        <SearchEntity
            searchQuery={searchQuery}
            filters={
                <>
                    <SearchFilterFirstLetter value={filterFirstLetter} setValue={updateState("filterFirstLetter")}/>
                    <SearchFilterSortBy options={sortByOptions} value={sortBy} setValue={updateState("sortBy")}/>
                </>
            }
            data={data}
            fetchNextPage={fetchNextPage}
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
            isLoading={isLoading}
            isPlaceholderData={isPlaceholderData}
            renderSummaryCard={(series) => <SummaryCard key={series.slug} title={series.name} description="Series" to={`/series/${series.slug}`} />}
        />
    );
}
