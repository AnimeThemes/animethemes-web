import type { GraphQLFieldResolver, GraphQLOutputType, GraphQLResolveInfo } from "graphql";
import type { Path } from "graphql/jsutils/Path";
import type { ResolveTree } from "graphql-parse-resolve-info";
import { parseResolveInfo } from "graphql-parse-resolve-info";
import type { IncomingMessage } from "node:http";
import pLimit from "p-limit";

import { AUTH_REFERER, CLIENT_API_URL, PAGINATION_PAGE_SIZE,SERVER_API_KEY, SERVER_API_URL } from "@/utils/config";
import devLog from "@/utils/devLog";

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
        group: "group",
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
        entries: "animethemeentries",
        tracks: "tracks",
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
    FeaturedTheme: {
        entry: "animethemeentry",
        video: "video",
    },
    Playlist: {
        tracks: "tracks",
        user: "user",
    },
    PlaylistTrack: {
        video: "video",
        playlist: "playlist",
        previous: "previous",
        next: "next",
    },
    UserAuth: {
        permissions: "permissions",
        roles: "roles",
    },
    UserRole: {
        permissions: "permissions",
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
    PlaylistSearchResult: {
        data: "_",
    },
} as const;

const ALLOWED_INCLUDES: Record<string, Array<string>> = {
    Anime: [
        "animesynonyms",
        "series",
        "animethemes.song.artists",
        "animethemes.song.artists.images",
        "animethemes.group",
        "images",
        "resources",
        "studios.images",
        "animethemes.animethemeentries.videos.audio",
        "animethemes.animethemeentries.videos.videoscript",
        "animethemes.animethemeentries.videos.tracks.playlist",
        "animethemes.animethemeentries.videos.animethemeentries.animetheme.anime",
        "animethemes.animethemeentries.videos.animethemeentries.animetheme.anime.images",
        "animethemes.animethemeentries.videos.animethemeentries.animetheme.animethemeentries.videos",
        "animethemes.animethemeentries.videos.animethemeentries.animetheme.animethemeentries.videos.audio",
        "animethemes.animethemeentries.videos.animethemeentries.animetheme.song.artists",
        "animethemes.animethemeentries.videos.animethemeentries.animetheme.group",
    ],
    Theme: [
        "anime.images",
        "animethemeentries.videos",
        "animethemeentries.videos.audio",
        "song.artists",
        "group",
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
        "songs.animethemes.group",
        "songs.animethemes.anime.images",
        "songs.animethemes.animethemeentries",
        "songs.animethemes.animethemeentries.videos",
        "songs.animethemes.animethemeentries.videos.audio",
    ],
    Series: [
        "anime",
        "anime.images",
        "anime.animethemes.animethemeentries.videos",
        "anime.animethemes.song",
        "anime.animethemes.group",
    ],
    Studio: [
        "anime",
        "anime.images",
        "anime.animethemes.animethemeentries.videos",
        "anime.animethemes.song",
        "anime.animethemes.group",
        "resources",
        "images"
    ],
    Song: [
        "animethemes.anime",
        "artists"
    ],
    Video: [
        "animethemeentries.animetheme.anime.images",
        "animethemeentries.animetheme.song.artists",
        "animethemeentries.animetheme.group",
        "videoscript",
        "audio"
    ],
    Audio: [
        "videos"
    ],
    Playlist: [
        "user",
        "tracks",
        "tracks.video.animethemeentries.animetheme.song.artists",
        "tracks.video.audio",
        "tracks.video.animethemeentries.animetheme.anime.images",
        "tracks.video",
        "tracks.video.animethemeentries.animetheme.group",
        "tracks.previous",
        "tracks.next",
    ],
    PlaylistTrack: [
        "video.animethemeentries.animetheme.anime.images",
        "video.animethemeentries.animetheme.song.artists",
        "video.animethemeentries.animetheme.group",
        "video.audio",
    ],
    UserAuth: [
        "permissions",
        "roles.permissions",
    ],
    FeaturedTheme: [
        "animethemeentry.animetheme.anime.images",
        "animethemeentry.animetheme.song.artists",
        "animethemeentry.animetheme.group",
        "user",
        "video",
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
    req?: IncomingMessage
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

        const headers = context.req ? {
            // Send auth headers from client forward, if provided.
            referer: context.req.headers.referer ?? AUTH_REFERER,
            cookie: context.req.headers.cookie ?? "",
        } : undefined;

        devLog.info(path + ": " + url);

        // Limiting the concurrect requests is necessary to prevent timeouts.
        return limit(() => (async () => {
            if (!pagination) {
                devLog.info(`Fetching: ${url}`);
                let json: Record<string, unknown> | null;

                const jsonCached = context?.cache?.get(url);
                if (jsonCached) {
                    devLog.info("CACHED: " + url);
                    json = jsonCached;
                } else {
                    json = await fetchJson(url, { headers });
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
                const pageSize = args.limit ?? PAGINATION_PAGE_SIZE ?? 25;
                let nextUrl: string | null = `${url}${url.includes("?") ? "&" : "?"}page[size]=${pageSize}`;
                while (nextUrl) {
                    const json = await fetchJson(nextUrl, { headers }) as Record<string, unknown> & { links: { next: string } };
                    context.apiRequests++;

                    if (!json) {
                        return null;
                    }

                    results.push(...transformer(extractor(json, parent, args), parent, args) as Array<unknown>);
                    devLog.info(`Collecting: ${url}, Got ${results.length}`);
                    nextUrl = !args.limit ? json.links.next : null;
                }

                return results;
            }
        })());
    };
}

export async function fetchJson<T = Record<string, unknown>>(path: string, config: RequestInit = {}): Promise<T | null> {
    const url = path.startsWith(API_URL) ? path : `${API_URL}${path}`;

    config.credentials = "include";

    if (SERVER_API_KEY && !("cookie" in (config.headers ?? {}))) {
        config.headers = {
            Authorization: `Bearer ${SERVER_API_KEY}`,
            ...config.headers,
        };
    }

    const response = await fetch(url, config);

    if (!response.ok) {
        if (response.status === 404 || response.status === 401 || response.status === 403) {
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
