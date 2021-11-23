import { SearchFilterFirstLetter, SearchFilterSortBy, SearchFilterThemeType } from "components/search-filter";
import useEntitySearch from "hooks/useEntitySearch";
import { SearchEntity } from "components/search";
import { ThemeSummaryCard } from "components/card";
import useSessionStorage from "hooks/useSessionStorage";

const sortByFields = new Map([
    [ "A ➜ Z", "song.title" ],
    [ "Z ➜ A", "-song.title" ],
    [ "Old ➜ New", "anime.year,anime.season,song.title" ],
    [ "New ➜ Old", "-anime.year,-anime.season,song.title" ],
    [ "Last Added", "-created_at" ]
]);
const sortByOptions = [ ...sortByFields.keys() ];

const initialFilter = {
    firstLetter: null,
    type: null,
    sortBy: sortByOptions[0]
};

export function SearchTheme({ searchQuery }) {
    const { updateDataField: updateFilter, data: filter } = useSessionStorage("filter", initialFilter);

    const entitySearch = useEntitySearch("theme", searchQuery, {
        filters: {
            has: "song",
            "song][title][like": filter.firstLetter ? `${filter.firstLetter}%` : null,
            type: filter.type
        },
        sortBy: searchQuery ? null : sortByFields.get(filter.sortBy)
    });

    return (
        <SearchEntity
            searchQuery={searchQuery}
            filters={
                <>
                    <SearchFilterFirstLetter value={filter.firstLetter} setValue={updateFilter("firstLetter")}/>
                    <SearchFilterThemeType value={filter.type} setValue={updateFilter("type")}/>
                    <SearchFilterSortBy
                        options={searchQuery ? [ "Relevance" ] : sortByOptions}
                        value={searchQuery ? "Relevance" : filter.sortBy}
                        setValue={updateFilter("sortBy")}
                    />
                </>
            }
            renderSummaryCard={(theme) => <ThemeSummaryCard key={theme.anime.slug + theme.slug} theme={theme}/>}
            {...entitySearch}
        />
    );
}
