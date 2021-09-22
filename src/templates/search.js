import { useMemo } from "react";
import { useDebounce } from "use-debounce";
import { SearchAnime, SearchArtist, SearchGlobal, SearchSeries, SearchStudio, SearchTheme } from "components/search";
import { Box } from "components/box";
import { SEO } from "components/seo";
import { faCompass, faSearch } from "@fortawesome/free-solid-svg-icons";
import { Text } from "components/text";
import { Icon } from "components/icon";

export default function SearchPage({ pageContext: { entity }, location: { search, state } }) {
    const urlParams = useMemo(() => new URLSearchParams(search), [ search ]);
    const searchQuery = urlParams.get("q") || "";

    const [ debouncedSearchQuery ] = useDebounce(searchQuery, 500);

    // Generates page title based on search query
    const pageTitle = searchQuery && searchQuery.trim()
        ? `${searchQuery} - Search`
        : "Search";

    return (
        <Box gapsColumn="1.5rem">
            <SEO title={pageTitle} />
            <Search searchEntity={entity} searchQuery={debouncedSearchQuery} locationState={state}/>
        </Box>
    );
}

function Search({ searchQuery, searchEntity, locationState }) {
    if (searchEntity) {
        switch (searchEntity) {
            case "anime":
                return <SearchAnime searchQuery={searchQuery} locationState={locationState}/>;
            case "theme":
                return <SearchTheme searchQuery={searchQuery} locationState={locationState}/>;
            case "artist":
                return <SearchArtist searchQuery={searchQuery} locationState={locationState}/>;
            case "series":
                return <SearchSeries searchQuery={searchQuery} locationState={locationState}/>;
            case "studio":
                return <SearchStudio searchQuery={searchQuery} locationState={locationState}/>;
            default:
                // Should never happen
                return null;
        }
    } else if (searchQuery) {
        return <SearchGlobal searchQuery={searchQuery}/>;
    } else {
        return (
            <Box gapsColumn="1rem">
                <Box gapsRow="1rem">
                    <Icon icon={faSearch} color="text-primary"/>
                    <Text color="text-muted">Looking for something specific? Use the search bar on the left!</Text>
                </Box>
                <Box gapsRow="1rem">
                    <Icon icon={faCompass} color="text-primary"/>
                    <Text color="text-muted">Feeling adventurous? Explore the database by choosing a category on the right!</Text>
                </Box>
            </Box>
        );
    }
}
