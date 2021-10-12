import { SearchFilterFirstLetter, SearchFilterSortBy, SearchFilterThemeType } from "components/search-filter";
import useEntitySearch from "hooks/useEntitySearch";
import { SearchEntity } from "components/search";
import { navigate } from "gatsby";
import { ThemeSummaryCard } from "components/card";

const sortByFields = new Map([
    [ "A ➜ Z", "song.title" ],
    [ "Z ➜ A", "-song.title" ],
    [ "Old ➜ New", "anime.year,anime.season,song.title" ],
    [ "New ➜ Old", "-anime.year,-anime.season,song.title" ],
    [ "Last Added", "-created_at" ]
]);
const sortByOptions = [ ...sortByFields.keys() ];

export function SearchTheme({ searchQuery, locationState }) {
    const filterFirstLetter = locationState?.filterFirstLetter || null;
    const filterType = locationState?.filterType || null;
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

    const entitySearch = useEntitySearch("theme", searchQuery, {
        filters: {
            has: "song",
            "song][title][like": filterFirstLetter ? `${filterFirstLetter}%` : null,
            type: filterType
        },
        sortBy: searchQuery ? null : sortByFields.get(sortBy)
    });

    return (
        <SearchEntity
            searchQuery={searchQuery}
            filters={
                <>
                    <SearchFilterFirstLetter value={filterFirstLetter} setValue={updateState("filterFirstLetter")}/>
                    <SearchFilterThemeType value={filterType} setValue={updateState("filterType")}/>
                    <SearchFilterSortBy
                        options={searchQuery ? [ "Relevance" ] : sortByOptions}
                        value={searchQuery ? "Relevance" : sortBy}
                        setValue={updateState("sortBy")}
                    />
                </>
            }
            renderSummaryCard={(theme) => <ThemeSummaryCard key={theme.anime.slug + theme.slug} theme={theme}/>}
            {...entitySearch}
        />
    );
}
