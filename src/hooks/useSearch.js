import {useRef} from "react";
import useSWR from "swr";
import {fetchSearch} from "api/animeThemes/search";

const emptyResults = {
    animeResults: [],
    themeResults: [],
    artistResults: []
};

export default function useSearch(query) {
    const { data: results, isValidating } = useSWR(query, fetchSearchResults);

    const stickyResults = useRef(emptyResults);
    if (!query) {
        stickyResults.current = emptyResults;
    } else if (results !== undefined) {
        stickyResults.current = results;
    }

    return [ stickyResults.current, isValidating ];
}

async function fetchSearchResults(query) {
    const {anime, themes, artists} = await fetchSearch(encodeURIComponent(query));

    return {
        animeResults: anime,
        themeResults: themes,
        artistResults: artists
    };
}
