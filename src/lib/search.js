import { baseUrl } from "gatsby-source-animethemes/src";

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
                "tags"
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
                "tags"
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
            "images",
            "songs"
        ],
        fields: {
            artist: [
                "name",
                "slug"
            ],
            image: [
                "facet",
                "link"
            ],
            // TODO: Wait till we can specify deep field property lists
            // song: []
        }
    }
};

export async function fetchGlobalSearchResults(query, limit, entities) {
    const parameters = generateGlobalSearchParameters(entities);

    const res = await fetch(`${baseUrl}/api/search?${parameters.join("&")}&limit=${limit}&q=${encodeURIComponent(query)}`);
    const json = await res.json();

    if (json.search.themes) {
        applyThemeSchema(json.search.themes);
    }
    if (json.search.artists) {
        applyArtistSchema(json.search.artists);
    }

    return Object.fromEntries(entities.map((entity) => [ entity, json.search[entityConfigs[entity].plural || entity] ]));
}

export async function fetchEntitySearchResults({
    query,
    entity,
    page = 1,
    limit = 15,
    filters = {},
    sortBy = null
}) {
    const parameters = [
        ...generateEntitySearchParameters(entity),
        ...generateFilterAndSortParameters(filters, sortBy)
    ];

    let url = `${baseUrl}/api/${entity}?${parameters.join("&")}&page[size]=${limit}&page[number]=${page}`;
    if (query) {
        url += `&q=${encodeURIComponent(query)}`;
    }

    const res = await fetch(url);
    const json = await res.json();

    const results = json[entityConfigs[entity].plural || entity];
    const hasNext = !!json.links.next;

    if (entity === "theme") {
        applyThemeSchema(results);
    } else if (entity === "artist") {
        applyArtistSchema(results);
    }

    return {
        data: results,
        hasNextPage: hasNext ? page + 1 : undefined
    };
}

function generateGlobalSearchParameters(entities) {
    const parameters = [];

    parameters.push(`fields[search]=${entities.map((entity) => entityConfigs[entity].plural || entity)}`);

    parameters.push(
        ...entities
            .flatMap(generateEntitySearchParameters)
            .filter((parameter, index, parameters) => parameters.indexOf(parameter) === index)
    );

    return parameters;
}

function generateEntitySearchParameters(entity) {
    const parameters = [];
    const config = entityConfigs[entity];

    if (config.includes) {
        parameters.push(`include[${entity}]=${config.includes.join(",")}`);
    }

    if (config.fields) {
        parameters.push(...Object.entries(config.fields).map(([key, fields]) => `fields[${key}]=${fields.join(",")}`));
    }

    return parameters;
}

function generateFilterAndSortParameters(filters, sortBy) {
    const parameters = [];

    for (const [ key, value ] of Object.entries(filters)) {
        if (value) {
            parameters.push(`filter[${key}]=${value}`);
        }
    }

    if (sortBy) {
        parameters.push(`sort=${sortBy}`);
    }

    return parameters;
}

// Map artists and songs to performances to comply with the application schema
function applyThemeSchema(themes) {
    for (const theme of themes) {
        theme.song.performances = theme.song.artists.map((artist) => ({
            artist,
            as: artist.as
        }));
    }

}

function applyArtistSchema(artists) {
    for (const artist of artists) {
        artist.performances = artist.songs.map((song) => ({
            song,
            as: song.as
        }));
    }
}