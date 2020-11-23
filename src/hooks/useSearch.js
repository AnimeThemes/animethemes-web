import {useRef} from "react";
import useSWR from "swr";
import {baseUrl} from "../../plugins/gatsby-source-animethemes/src/index";

const fields = [ "anime", "themes", "artists" ];
const emptyResults = {
    animeResults: [],
    themeResults: [],
    artistResults: []
};

export default function useSearch(query) {
    const { data: results, isValidating } = useSWR(
        `${baseUrl}/api/search?fields=${fields.join()}&q=${encodeURIComponent(query)}`,
        fetchSearchResults
    );

    const stickyResults = useRef(emptyResults);
    if (!query) {
        stickyResults.current = emptyResults;
    } else if (results !== undefined) {
        stickyResults.current = results;
    }

    return [ stickyResults.current, isValidating ];
}

async function fetchSearchResults(url) {
    const res = await fetch(url);
    const { anime, themes, artists } = await res.json();

    // Map artist to performances to comply with the application schema
    for (const theme of themes) {
        theme.song.performances = theme.song.artists.map((artist) => ({
            artist,
            as: artist.as
        }));
    }

    return {
        animeResults: anime,
        themeResults: themes,
        artistResults: artists
    };
}
