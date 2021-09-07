import { useLocation } from "@reach/router";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { Button } from "components/button";
import { Text } from "components/text";
import { Box, Flex } from "components/box";
import { Link } from "gatsby";
import { Icon } from "components/icon";
import { useQuery } from "react-query";
import { fetchGlobalSearchResults } from "lib/search";
import { AnimeSummaryCard, ArtistSummaryCard, ErrorCard, ThemeSummaryCard } from "components/card";

export function SearchGlobal({ searchQuery }) {
    const fetchSearchResults = () => fetchGlobalSearchResults(
        searchQuery,
        4,
        [ "anime", "theme", "artist" ]
    );

    const {
        data,
        error,
        isLoading,
        isError
    } = useQuery(
        [ "searchGlobal", searchQuery ],
        fetchSearchResults,
        {
            keepPreviousData: true
        }
    );

    if (isError) {
        return (
            <ErrorCard error={error}/>
        );
    }

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
            <GlobalSearchSection
                entity="anime"
                title="Anime"
                results={animeResults}
                renderSummaryCard={(anime) => <AnimeSummaryCard key={anime.slug} anime={anime}/>}
            />
            <GlobalSearchSection
                entity="theme"
                title="Themes"
                results={themeResults}
                renderSummaryCard={(theme) => <ThemeSummaryCard key={theme.anime.slug + theme.slug} theme={theme}/>}
            />
            <GlobalSearchSection
                entity="artist"
                title="Artist"
                results={artistResults}
                renderSummaryCard={(artist) => <ArtistSummaryCard key={artist.slug} artist={artist}/>}
            />
        </Box>
    );
}

function GlobalSearchSection({ entity, title, results, renderSummaryCard }) {
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
                {resultsPreview.map(renderSummaryCard)}
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
