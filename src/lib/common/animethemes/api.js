import pLimit from "p-limit";
import { parseResolveInfo } from "graphql-parse-resolve-info";
import devLog from "utils/devLog";

const limit = pLimit(5);

const API_BASE_URL = `${process.env.ANIMETHEMES_API_URL || process.env.NEXT_PUBLIC_API_URL}/api`;

export const INCLUDES = {
    Anime: {
        synonyms: "animesynonyms",
        themes: "animethemes",
        series: "series",
        studios: "studios",
        resources: "resources",
        images: "images"
    },
    Theme: {
        song: "song",
        anime: "anime",
        entries: "animethemeentries"
    },
    Artist: {
        performances: "songs",
        resources: "resources",
        images: "images",
        groups: "groups",
        members: "members"
    },
    Song: {
        themes: "animethemes",
        performances: "artists"
    },
    Entry: {
        videos: "videos",
        theme: "animetheme"
    },
    Video: {
        entries: "animethemeentries"
    },
    Series: {
        anime: "anime"
    },
    Studio: {
        anime: "anime",
        resources: "resources"
    },
    ResourceWithImages: {
        images: "images"
    },
    Performance: {
        song: "_",
        artist: "_"
    }
};

const ALLOWED_INCLUDES = {
    Anime: [
        "animesynonyms",
        "series",
        "animethemes.song.artists",
        "animethemes.song.artists.images",
        "images",
        "resources",
        "studios",
        "animethemes.animethemeentries.videos.animethemeentries.animetheme.anime",
        "animethemes.animethemeentries.videos.animethemeentries.animetheme.anime.images",
        "animethemes.animethemeentries.videos.animethemeentries.animetheme.animethemeentries.videos",
        "animethemes.animethemeentries.videos.animethemeentries.animetheme.song.artists"
    ],
    Theme: [
        "anime.images",
        "animethemeentries.videos",
        "song.artists"
    ],
    Artist: [
        "songs.animethemes.anime",
        "members",
        "groups",
        "resources",
        "images",
        "songs.artists",
        "songs.animethemes.song",
        "songs.animethemes.song.artists",
        "songs.animethemes.anime.images",
        "songs.animethemes.animethemeentries",
        "songs.animethemes.animethemeentries.videos"
    ],
    Series: [
        "anime",
        "anime.images",
        "anime.animethemes.animethemeentries.videos",
        "anime.animethemes.song"
    ],
    Studio: [
        "anime",
        "anime.images",
        "anime.animethemes.animethemeentries.videos",
        "anime.animethemes.song",
        "resources"
    ],
    Song: [
        "animethemes.anime",
        "artists"
    ],
    Video: [
        "animethemeentries.animetheme.anime"
    ]
};

export function apiResolver(config) {
    const {
        endpoint,
        field,
        extractor = (a) => a,
        transformer = (a) => a,
        pagination = false,
        type: defaultType = null,
        baseInclude = null
    } = config;

    return async (parent, args, context, info) => {
        if (field && parent[field] !== undefined) {
            return transformer(parent[field], parent, args);
        }

        const type = defaultType || info.returnType.name || info.returnType.ofType.name;
        const path = pathToString(info.path);

        if (info.path.prev) {
            devLog.warn(`Deep fetch at: ${path}`);
        }

        let url = `${API_BASE_URL}${endpoint(parent, args)}`;

        const includes = getIncludes(info, baseInclude);
        if (baseInclude) {
            includes.push(baseInclude);
        }
        const allowedIncludes = includes
            // Remove includes that are not allowed by the API
            .filter((include) => ALLOWED_INCLUDES[type]?.find((allowedInclude) => allowedInclude === include || allowedInclude.startsWith(include + ".")))
            // Remove includes which are already included with another include
            .filter((include, _, includes) => !includes.find((otherInclude) => otherInclude.startsWith(include + ".")))
            // Remove duplicates
            .filter((include, index, includes) => includes.lastIndexOf(include) === index);
        const disallowedIncludes = includes.filter((include) => !ALLOWED_INCLUDES[type]?.find((allowedInclude) => allowedInclude === include || allowedInclude.startsWith(include + ".")));

        if (disallowedIncludes.length) {
            devLog.warn(`Disallowed includes for ${url}:`);
            devLog.warn(disallowedIncludes);
            devLog.warn(`Or at least:`);
            devLog.warn(disallowedIncludes.filter((include, _, includes) => !includes.find((otherInclude) => otherInclude.startsWith(include + "."))));
        }

        if (allowedIncludes.length) {
            url += `${url.includes("?") ? "&" : "?"}include=${allowedIncludes.join()}`;
        }

        devLog.info(path + ": " + url);

        if (!context.apiRequests) {
            context.apiRequests = 0;
        }

        return await limit(() => (async () => {
            if (!pagination) {
                const json = await fetchJson(url);
                context.apiRequests++;

                return transformer(extractor(json, parent, args), parent, args);
            } else {
                devLog.info(`Collecting: ${url}`);
                const results = [];
                let nextUrl = `${url}${url.includes("?") ? "&" : "?"}page[size]=100`;
                while (nextUrl) {
                    const json = await fetchJson(nextUrl);
                    context.apiRequests++;
                    results.push(...transformer(extractor(json, parent, args), parent, args));
                    devLog.info(`Collecting: ${url}, Got ${results.length}`);
                    nextUrl = json.links.next;
                }

                return results;
            }
        })());
    };
}

async function fetchJson(url) {
    const config = {};

    if (process.env.ANIMETHEMES_API_KEY) {
        config.headers = {
            Authorization: `Bearer ${process.env.ANIMETHEMES_API_KEY}`
        };
    }

    const response = await fetch(url, config);

    if (!response.ok) {
        throw new Error(`API returned with non-ok status code: ${response.status} (${response.statusText})`);
    }

    return await response.json();
}

function pathToString(path) {
    let parts = [];
    for (let part = path; part; part = part.prev) {
        parts.push(part.key);
    }
    return parts.reverse().join(".");
}

function getIncludes(info, baseInclude = null) {
    const infoFragment = parseResolveInfo(info);
    return getIncludesRecursive(infoFragment, baseInclude ? (baseInclude + ".") : "");
}

function getIncludesRecursive(infoFragment, parent = "") {
    const includes = [];

    for (const [type, fields] of Object.entries(infoFragment.fieldsByTypeName)) {
        for (const [fieldName, field] of Object.entries(fields)) {
            if (INCLUDES[type]?.[fieldName]) {
                if (INCLUDES[type][fieldName] === "_") {
                    includes.push(...getIncludesRecursive(field, parent));
                } else {
                    const include = parent + INCLUDES[type][fieldName];
                    includes.push(include);
                    includes.push(...getIncludesRecursive(field, include + "."));
                }
            }
        }
    }

    return includes;
}
