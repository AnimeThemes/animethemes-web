import {useRef} from "react";
import useSWR from "swr";
import {baseUrl} from "../../plugins/gatsby-source-animethemes/src/index";

const entityConfigs = {
    anime: {
        includes: [
            "themes.entries.videos",
            "images"
        ],
        fields: {
            anime: [
                "name",
                "slug",
                "year",
                "season"
            ],
            theme: [
                "type",
                "sequence",
                "slug"
            ],
            entry: [
                "version"
            ],
            video: [
                "resolution",
                "nc",
                "subbed",
                "lyrics",
                "uncen",
                "source",
                "overlap"
            ],
            image: [
                "facet",
                "link"
            ]
        }
    },
    theme: {
        plural: "themes",
        includes: [
            "entries.videos",
            "anime.images",
            "song.artists"
        ],
        fields: {
            anime: [
                "name",
                "slug",
                "year",
                "season"
            ],
            theme: [
                "type",
                "sequence",
                "slug"
            ],
            entry: [
                "version"
            ],
            video: [
                "resolution",
                "nc",
                "subbed",
                "lyrics",
                "uncen",
                "source",
                "overlap"
            ],
            image: [
                "facet",
                "link"
            ],
            song: [
                "title"
            ],
            artist: [
                "name",
                "slug",
                "as"
            ]
        }
    },
    artist: {
        plural: "artists",
        includes: [
            "images"
        ],
        fields: {
            artist: [
                "name",
                "slug"
            ],
            image: [
                "facet",
                "link"
            ]
        }
    }
};

const emptyResults = {
    animeResults: [],
    themeResults: [],
    artistResults: []
};

export default function useSearch(query, limit = 3, entities = [ "anime", "theme", "artist" ]) {
    const parameters = generateParameters(entities);
    const { data: results, isValidating } = useSWR(
        `${baseUrl}/api/search?${parameters.join("&")}&limit=${limit}&q=${encodeURIComponent(query)}`,
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
    const { anime = [], themes = [], artists = [] } = (await res.json()).search;

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

function generateParameters(entities) {
    const parameters = [];

    parameters.push(`fields[search]=${entities.map((entity) => entityConfigs[entity].plural || entity)}`);

    parameters.push(
        ...entities
            .flatMap((entity) => {
                const parameters = [];
                const config = entityConfigs[entity];

                if (config.includes) {
                    parameters.push(`include[${entity}]=${config.includes.join(",")}`);
                }

                if (config.fields) {
                    parameters.push(...Object.entries(config.fields).map(([key, fields]) => `fields[${key}]=${fields.join(",")}`));
                }

                return parameters;
            })
            .filter((parameter, index, parameters) => parameters.indexOf(parameter) === index)
    );

    return parameters;
}
