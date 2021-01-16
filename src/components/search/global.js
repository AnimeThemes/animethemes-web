import React from "react";
import {useLocation} from "@reach/router";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronDown} from "@fortawesome/free-solid-svg-icons";
import useSearch from "hooks/useSearch";
import AnimeSearchResultCard from "components/card/searchResult/anime";
import ThemeSearchResultCard from "components/card/searchResult/theme";
import Button from "components/button";
import Text from "components/text";
import Title from "components/text/title";
import ArtistSearchResultCard from "components/card/searchResult/artist";
import { Box, Flex } from "components/flex";

export default function GlobalSearch({ searchQuery, searchEntity }) {
    const [ results, isSearching ] = useSearch(searchQuery);

    if (!searchQuery) {
        return (
            <Text block>Type in a query to begin searching.</Text>
        );
    }

    const {animeResults, themeResults, artistResults} = results;
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
                return <AnimeSearchResultCard key={result.id} anime={result}/>;
            case "theme":
                return <ThemeSearchResultCard key={result.id} theme={result}/>;
            case "artist":
                return <ArtistSearchResultCard key={result.id} artist={result}/>;
            default:
                return null;
        }
    });

    return (
        <Box gapsColumn="1rem">
            {!searchEntity && (
                <Title variant="section">{title}</Title>
            )}
            {resultCards}
            {!searchEntity && totalResults > 3 && (
                <Flex justifyContent="center">
                    <Button to={`/search/${entity}${urlSuffix}`} icon>
                        <FontAwesomeIcon icon={faChevronDown} fixedWidth/>
                    </Button>
                </Flex>
            )}
        </Box>
    );
}
