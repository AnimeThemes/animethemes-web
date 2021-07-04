import { useLocation } from "@reach/router";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { Button } from "components/button";
import { Text } from "components/text";
import { Box, Flex } from "components/box";
import { Link } from "gatsby";
import { Icon } from "components/icon";
import { SearchResultList } from "components/search";
import { useQuery } from "react-query";
import { fetchGlobalSearchResults } from "lib/search";

export function GlobalSearch({ searchQuery }) {
    const fetchSearchResults = () => fetchGlobalSearchResults(
        searchQuery,
        4,
        [ "anime", "theme", "artist" ]
    );

    const {
        data,
        isLoading
    } = useQuery(
        [ "searchGlobal", searchQuery ],
        fetchSearchResults,
        {
            keepPreviousData: true
        }
    );

    if (isLoading) {
        return (
            <Text block>Searching...</Text>
        );
    }

    const {
        anime: animeResults = [],
        theme: themeResults = [],
        artist: artistResults = []
    } = data;
    const totalResults = animeResults.length + themeResults.length + artistResults.length;

    if (!totalResults) {
        return (
            <Text block>No results found for query &quot;{searchQuery}&quot;. Did you spell it correctly?</Text>
        );
    }

    return (
        <Box gapsColumn="1.5rem">
            <GlobalSearchSection entity="anime" title="Anime" results={animeResults}/>
            <GlobalSearchSection entity="theme" title="Themes" results={themeResults}/>
            <GlobalSearchSection entity="artist" title="Artist" results={artistResults}/>
        </Box>
    );
}

function GlobalSearchSection({ entity, title, results }) {
    const { search, hash } = useLocation();
    const urlSuffix = search + hash;

    if (!results.length) {
        return null;
    }

    const resultsPreview = results.slice(0, 3);
    const hasMoreResults = results.length > 3;

    return (
        <>
            <Text variant="h2">{title}</Text>
            <Box gapsColumn="1rem">
                <SearchResultList results={resultsPreview} entity={entity}/>
            </Box>
            {hasMoreResults && (
                <Flex justifyContent="center">
                    <Link to={`/search/${entity}${urlSuffix}`}>
                        <Button silent title="See all results">
                            <Icon icon={faChevronDown}/>
                        </Button>
                    </Link>
                </Flex>
            )}
        </>
    );
}
