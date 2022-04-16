import { SearchFilterFirstLetter, SearchFilterSortBy, SearchFilterThemeType } from "components/search-filter";
import useEntitySearch from "hooks/useEntitySearch";
import { SearchEntity } from "components/search";
import { ThemeSummaryCard } from "components/card";
import useSessionStorage from "hooks/useSessionStorage";

const initialFilter = {
    firstLetter: null,
    type: null,
    sortBy: "song.title"
};

export function SearchTheme({ searchQuery }) {
    const { updateDataField: updateFilter, data: filter } = useSessionStorage("filter", initialFilter);

    const entitySearch = useEntitySearch("theme", searchQuery, {
        filters: {
            has: "song",
            "song][title-like": filter.firstLetter ? `${filter.firstLetter}%` : null,
            type: filter.type
        },
        sortBy: searchQuery ? null : filter.sortBy
    });

    return (
        <SearchEntity
            searchQuery={searchQuery}
            filters={
                <>
                    <SearchFilterFirstLetter value={filter.firstLetter} setValue={updateFilter("firstLetter")}/>
                    <SearchFilterThemeType value={filter.type} setValue={updateFilter("type")}/>
                    <SearchFilterSortBy value={searchQuery ? null : filter.sortBy} setValue={updateFilter("sortBy")}>
                        {searchQuery ? (
                            <SearchFilterSortBy.Option>Relevance</SearchFilterSortBy.Option>
                        ) : (
                            <>
                                <SearchFilterSortBy.Option value="song.title">A ➜ Z</SearchFilterSortBy.Option>
                                <SearchFilterSortBy.Option value="-song.title">Z ➜ A</SearchFilterSortBy.Option>
                                <SearchFilterSortBy.Option value="anime.year,anime.season,song.title">Old ➜ New</SearchFilterSortBy.Option>
                                <SearchFilterSortBy.Option value="-anime.year,-anime.season,song.title">New ➜ Old</SearchFilterSortBy.Option>
                                <SearchFilterSortBy.Option value="-created_at">Last Added</SearchFilterSortBy.Option>
                            </>
                        )}
                    </SearchFilterSortBy>
                </>
            }
            renderSummaryCard={(theme) => <ThemeSummaryCard key={theme.anime.slug + theme.slug} theme={theme}/>}
            {...entitySearch}
        />
    );
}
