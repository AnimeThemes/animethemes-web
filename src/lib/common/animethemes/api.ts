import pLimit from "p-limit";
import type { ResolveTree } from "graphql-parse-resolve-info";
import { parseResolveInfo } from "graphql-parse-resolve-info";
import devLog from "utils/devLog";
import { CLIENT_API_URL, SERVER_API_KEY, SERVER_API_URL } from "utils/config";
import type { GraphQLFieldResolver, GraphQLOutputType, GraphQLResolveInfo } from "graphql";
import type { Path } from "graphql/jsutils/Path";

const limit = pLimit(5);

export const API_URL = `${SERVER_API_URL || CLIENT_API_URL}`;

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
        audio: "audio",
        script: "videoscript",
        entries: "animethemeentries"
    },
    Audio: {
        videos: "videos"
    },
    Series: {
        anime: "anime"
    },
    Studio: {
        anime: "anime",
        resources: "resources",
        images: "images"
    },
    ResourceWithImages: {
        images: "images"
    },
    Performance: {
        song: "_",
        artist: "_"
    },
    AnimeSearchResult: {
        data: "_",
    },
    ThemeSearchResult: {
        data: "_",
    },
    ArtistSearchResult: {
        data: "_",
    },
    SeriesSearchResult: {
        data: "_",
    },
    StudioSearchResult: {
        data: "_",
    },
} as const;

const ALLOWED_INCLUDES: Record<string, Array<string>> = {
    Anime: [
        "animesynonyms",
        "series",
        "animethemes.song.artists",
        "animethemes.song.artists.images",
        "images",
        "resources",
        "studios",
        "animethemes.animethemeentries.videos.audio",
        "animethemes.animethemeentries.videos.videoscript",
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
        "resources",
        "images"
    ],
    Song: [
        "animethemes.anime",
        "artists"
    ],
    Video: [
        "animethemeentries.animetheme.anime",
        "videoscript",
        "audio"
    ],
    Audio: [
        "videos"
    ]
};

interface ApiResolverConfig {
    endpoint?: (parent: Record<string, any>, args: Record<string, unknown>) => string
    field?: string
    extractor?: (result: Record<string, any>, parent: Record<string, unknown>, args: Record<string, unknown>) => any
    transformer?: (data: any, parent: Record<string, unknown>, args: Record<string, unknown>) => unknown
    pagination?: boolean
    type?: string | null
    baseInclude?: string
}

export interface ApiResolverContext {
    cache?: Map<string, Record<string, unknown> | null>
    apiRequests: number
}

export function apiResolver(config: ApiResolverConfig): GraphQLFieldResolver<Record<string, unknown>, ApiResolverContext> {
    const {
        endpoint,
        field,
        extractor = (a) => a,
        transformer = (a) => a,
        pagination = false,
        type: defaultType = null,
        baseInclude
    } = config;

    return async (parent, args, context, info) => {
        if (field && parent[field] !== undefined) {
            return transformer(parent[field], parent, args);
        }

        if (!endpoint) {
            throw new Error("Endpoint is required if field cannot be retrieved from parent safely.");
        }

        const type = defaultType || getTypeName(info.returnType);
        const path = pathToString(info.path);

        if (info.path.prev) {
            devLog.warn(`Deep fetch at: ${path}`);
        }

        let url = endpoint(parent, args);

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
            devLog.warn(disallowedIncludes.toString());
            devLog.warn(`Or at least:`);
            devLog.warn(disallowedIncludes.filter((include, _, includes) => !includes.find((otherInclude) => otherInclude.startsWith(include + "."))).toString());
        }

        if (allowedIncludes.length) {
            url += `${url.includes("?") ? "&" : "?"}include=${allowedIncludes.join()}`;
        }

        devLog.info(path + ": " + url);

        // Limiting the concurrect requests is necessary to prevent timeouts.
        return await limit(() => (async () => {
            if (!pagination) {
                devLog.info(`Fetching: ${url}`);
                let json: Record<string, unknown> | null;

                const jsonCached = context?.cache?.get(url);
                if (jsonCached) {
                    devLog.info("CACHED: " + url);
                    json = jsonCached;
                } else {
                    json = await fetchJson(url);
                    context.apiRequests++;
                    if (!context.cache) {
                        context.cache = new Map();
                    }
                    context.cache.set(url, json);
                }

                if (!json) {
                    return null;
                }

                return transformer(extractor(json, parent, args), parent, args);
            } else {
                devLog.info(`Collecting: ${url}`);
                const results = [];
                let nextUrl = `${url}${url.includes("?") ? "&" : "?"}page[size]=25`;
                while (nextUrl) {
                    const json = await fetchJson(nextUrl) as Record<string, unknown> & { links: { next: string } };
                    context.apiRequests++;
                    results.push(...transformer(extractor(json, parent, args), parent, args) as Array<unknown>);
                    devLog.info(`Collecting: ${url}, Got ${results.length}`);
                    nextUrl = json.links.next;
                }

                return results;
            }
        })());
    };
}

export async function fetchJson<T = Record<string, unknown>>(path: string): Promise<T | null> {
    const url = path.startsWith(API_URL) ? path : `${API_URL}${path}`;
    const config: RequestInit = {};

    if (SERVER_API_KEY) {
        config.headers = {
            Authorization: `Bearer ${SERVER_API_KEY}`
        };
    }

    const response = await fetch(url, config);

    if (!response.ok) {
        if (response.status === 404) {
            return null;
        }

        throw new Error(`API returned with non-ok status code: ${response.status} (${response.statusText}) for ${url}.`);
    }

    try {
        return await response.json();
    } catch {
        throw new Error(`API returned invalid JSON for ${url}.`);
    }
}

function getTypeName(type: GraphQLOutputType): string {
    if (!("name" in type)) {
        return getTypeName(type.ofType);
    }
    return type.name;
}

function pathToString(path: Path) {
    const parts: Array<string | number> = [];
    for (let part: Path | undefined = path; part; part = part.prev) {
        parts.push(part.key);
    }
    return parts.reverse().join(".");
}

function getIncludes(info: GraphQLResolveInfo, baseInclude?: string) {
    const infoFragment = parseResolveInfo(info) as ResolveTree;
    return getIncludesRecursive(infoFragment, baseInclude ? (baseInclude + ".") : "");
}

function getIncludesRecursive(infoFragment: ResolveTree, parent = "") {
    const includes: Array<string> = [];

    for (const [type, fields] of Object.entries(infoFragment.fieldsByTypeName)) {
        for (const [fieldName, field] of Object.entries(fields)) {
            const typeCasted = type as keyof typeof INCLUDES;
            const includeConfig = INCLUDES[typeCasted];
            const fieldNameCasted = fieldName as keyof typeof includeConfig;
            if (includeConfig?.[fieldNameCasted]) {
                if (includeConfig[fieldNameCasted] === "_") {
                    includes.push(...getIncludesRecursive(field, parent));
                } else {
                    const include = parent + includeConfig[fieldNameCasted];
                    includes.push(include);
                    includes.push(...getIncludesRecursive(field, include + "."));
                }
            }
        }
    }

    return includes;
}
