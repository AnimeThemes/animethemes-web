import {useRef} from "react";
import useSWR from "swr";
import {fetchSearch} from "api/animeThemes/search";

const createEmptyResults = () => ({
    animeResults: [],
    themeResults: [],
    artistResults: []
});

export default function useSearch(query) {
    const { data: results, isValidating } = useSWR(query, fetchSearchResults);

    const stickyResults = useRef();
    if (results !== undefined) {
        stickyResults.current = results;
    }

    return [ stickyResults.current || createEmptyResults(), isValidating ];
}

async function fetchSearchResults(query) {
    if (query) {
        const {anime, themes, artists} = await fetchSearch(query);
        return {
            animeResults: anime,
            themeResults: themes,
            artistResults: artists
        };
    }

    return createEmptyResults();
}
