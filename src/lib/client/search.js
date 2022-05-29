import { baseUrl } from "lib/client/api";
import { uniq } from "lodash-es";

const entityConfigs = {
    anime: {
        includes: [
            "animethemes.animethemeentries.videos",
            "animethemes.song",
            "images"
        ],
        fields: {
            anime: [
                "name",
                "slug",
                "year",
                "season"
            ],
            animetheme: [
                "type",
                "sequence",
                "slug",
                "group"
            ],
            animethemeentry: [
                "version",
                "episodes",
                "spoiler",
                "nsfw"
            ],
            video: [
                "tags",
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
            ]
        }
    },
    theme: {
        singular: "animetheme",
        plural: "animethemes",
        includes: [
            "animethemeentries.videos",
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
            animetheme: [
                "id",
                "type",
                "sequence",
                "slug",
                "group"
            ],
            animethemeentry: [
                "version",
                "episodes",
                "spoiler",
                "nsfw"
            ],
            video: [
                "tags",
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
    },
    series: {
        fields: {
            series: [
                "name",
                "slug"
            ]
        }
    },
    studio: {
        plural: "studios",
        fields: {
            studio: [
                "name",
                "slug"
            ]
        }
    }
};

export async function fetchGlobalSearchResults(query, limit, entities) {
    const parameters = generateGlobalSearchParameters(entities);

    const res = await fetch(`${baseUrl}/api/search?${parameters.join("&")}&limit=${limit}&q=${encodeURIComponent(query)}`);
    const json = await res.json();

    if (!res.ok) {
        throw json;
    }

    if (json.search.anime) {
        applyAnimeSchema(json.search.anime);
    }
    if (json.search.animethemes) {
        applyThemeSchema(json.search.animethemes);
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

    let url = `${baseUrl}/api/${entityConfigs[entity].singular || entity}?${parameters.join("&")}&page[size]=${limit}&page[number]=${page}`;
    if (query) {
        url += `&q=${encodeURIComponent(query)}`;
    }

    const res = await fetch(url);
    const json = await res.json();

    if (!res.ok) {
        throw json;
    }

    const results = json[entityConfigs[entity].plural || entity];
    const hasNext = !!json.links.next;

    if (entity === "anime") {
        applyAnimeSchema(results);
    } else if (entity === "theme") {
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

    parameters.push(...generateSparseFieldsetParameters({
        search: entities.map((entity) => entityConfigs[entity].plural || entity)
    }));

    parameters.push(
        ...entities
            .filter((entity) => entityConfigs[entity].includes)
            .map((entity) => generateIncludeParameter(entityConfigs[entity].includes, entityConfigs[entity].singular || entity))
    );

    // Merge sparse fieldsets of nested fields
    const fields = entities.reduce((fields, entity) => {
        const config = entityConfigs[entity];
        for (const [fieldName, configFields] of Object.entries(config.fields)) {
            if (!(fieldName in fields)) {
                fields[fieldName] = [];
            }
            fields[fieldName] = uniq([...fields[fieldName], ...configFields]);
        }
        return fields;
    }, {});

    parameters.push(...generateSparseFieldsetParameters(fields));

    return parameters;
}

function generateEntitySearchParameters(entity) {
    const parameters = [];
    const config = entityConfigs[entity];

    if (config.includes) {
        parameters.push(generateIncludeParameter(config.includes));
    }

    if (config.fields) {
        parameters.push(...generateSparseFieldsetParameters(config.fields));
    }

    return parameters;
}

function generateIncludeParameter(includes, scope = null) {
    const includesJoined = includes.join(",");
    if (scope) {
        return `include[${scope}]=${includesJoined}`;
    }
    return `include=${includesJoined}`;
}

function generateSparseFieldsetParameters(fields) {
    return Object.entries(fields).map(([key, fields]) => `fields[${key}]=${fields.join(",")}`);
}

function generateFilterAndSortParameters(filters, sortBy) {
    const parameters = [];

    for (const [ key, value ] of Object.entries(filters)) {
        if (value) {
            parameters.push(`filter[${key}]=${encodeURIComponent(value)}`);
        }
    }

    if (sortBy) {
        parameters.push(`sort=${sortBy}`);
    }

    return parameters;
}

function applyAnimeSchema(allAnime) {
    for (const anime of allAnime) {
        anime.themes = anime.animethemes;
        delete anime.animethemes;

        for (const theme of anime.themes) {
            theme.anime = anime;
            theme.entries = theme.animethemeentries;
            delete theme.animethemeentries;
        }
    }
}

// Map artists and songs to performances to comply with the application schema
function applyThemeSchema(themes) {
    for (const theme of themes) {
        if (theme.song) {
            theme.song.performances = theme.song.artists.map((artist) => ({
                artist,
                as: artist.as
            }));
        }

        theme.entries = theme.animethemeentries;
        delete theme.animethemeentries;
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
