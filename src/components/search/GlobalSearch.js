import { useLocation } from "@reach/router";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import useSearch from "hooks/useSearch";
import { Button } from "components/button";
import { Text } from "components/text";
import { Box, Flex } from "components/box";
import { AnimeSummaryCard, ArtistSummaryCard, ThemeSummaryCard } from "components/card";
import { Link } from "gatsby";
import { Icon } from "components/icon";

export function GlobalSearch({ searchQuery, searchEntity }) {
    const [ results, isSearching ] = useSearch(searchQuery, searchEntity ? 15 : 4, searchEntity ? [ searchEntity ] : [ "anime", "theme", "artist" ]);

    if (!searchQuery) {
        return (
            <Text block>Type in a query to begin searching.</Text>
        );
    }

    const { animeResults, themeResults, artistResults } = results;
    const totalResults = animeResults.length + themeResults.length + artistResults.length;

    if (!totalResults) {
        if (isSearching) {
            return (
                <Text block>Searching...</Text>
            );
        }

        return (
            <Text block>No results found for query &quot;{searchQuery}&quot;. Did you spell it correctly?</Text>
        );
    }

    return (
        <Box gapsColumn="2rem">
            <EntitySearch searchEntity={searchEntity} entity="anime" title="Anime" results={animeResults}/>
            <EntitySearch searchEntity={searchEntity} entity="theme" title="Themes" results={themeResults}/>
            <EntitySearch searchEntity={searchEntity} entity="artist" title="Artist" results={artistResults}/>
        </Box>
    );
}

function EntitySearch({ searchEntity, entity, title, results }) {
    const { search, hash } = useLocation();
    const urlSuffix = search + hash;
    const totalResults = results.length;

    if ((searchEntity && searchEntity !== entity) || !results.length) {
        return null;
    }

    // If no entity is selected, just show a preview with 3 results
    if (!searchEntity) {
        results = results.slice(0, 3);
    }

    let resultCards = results.map((result) => {
        switch (entity) {
            case "anime":
                return <AnimeSummaryCard key={result.id} anime={result}/>;
            case "theme":
                return <ThemeSummaryCard key={result.id} theme={result}/>;
            case "artist":
                return <ArtistSummaryCard key={result.id} artist={result}/>;
            default:
                return null;
        }
    });

    return (
        <Box gapsColumn="1rem">
            {!searchEntity && (
                <Text variant="h2">{title}</Text>
            )}
            {resultCards}
            {!searchEntity && totalResults > 3 && (
                <Flex justifyContent="center">
                    <Link to={`/search/${entity}${urlSuffix}`}>
                        <Button silent>
                            <Icon icon={faChevronDown}/>
                        </Button>
                    </Link>
                </Flex>
            )}
        </Box>
    );
}
