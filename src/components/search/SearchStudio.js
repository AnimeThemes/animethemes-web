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

export function SearchStudio({ searchQuery, locationState }) {
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

    const entitySearch = useEntitySearch("studio", searchQuery, {
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
            renderSummaryCard={(studio) => <SummaryCard key={studio.slug} title={studio.name} description="Studio" to={`/studio/${studio.slug}`} />}
            {...entitySearch}
        />
    );
}
