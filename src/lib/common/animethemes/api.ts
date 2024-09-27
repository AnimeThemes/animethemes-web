import type { GraphQLOutputType, GraphQLResolveInfo } from "graphql";
import type { Path } from "graphql/jsutils/Path";
import type { ResolveTree } from "graphql-parse-resolve-info";
import { parseResolveInfo } from "graphql-parse-resolve-info";
import type { IncomingMessage } from "node:http";
import pLimit from "p-limit";

import type { InputMaybe, ResolverFn } from "@/generated/graphql-resolvers";
import type { ApiIndex } from "@/lib/common/animethemes/types";
import { AUTH_REFERER, CLIENT_API_URL, PAGINATION_PAGE_SIZE, SERVER_API_KEY, SERVER_API_URL } from "@/utils/config";
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
        images: "images",
    },
    Theme: {
        song: "song",
        group: "group",
        anime: "anime",
        entries: "animethemeentries",
    },
    Artist: {
        performances: "songs",
        resources: "resources",
        images: "images",
        groups: "groups",
        members: "members",
    },
    Song: {
        themes: "animethemes",
        performances: "artists",
    },
    Entry: {
        videos: "videos",
        theme: "animetheme",
    },
    Video: {
        audio: "audio",
        script: "videoscript",
        entries: "animethemeentries",
        tracks: "tracks",
    },
    Audio: {
        videos: "videos",
    },
    Series: {
        anime: "anime",
    },
    Studio: {
        anime: "anime",
        resources: "resources",
        images: "images",
    },
    ResourceWithImages: {
        images: "images",
    },
    Performance: {
        song: "_",
        artist: "_",
    },
    ArtistMembership: {
        group: "_",
        member: "_",
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
        entry: "animethemeentry",
        video: "video",
        playlist: "playlist",
        previous: "previous",
        next: "next",
    },
    ExternalProfile: {
        entries: "externalentries",
    },
    ExternalProfileEntry: {
        profile: "externalprofile",
        anime: "anime",
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
        "animethemes.animethemeentries.videos.tracks.playlist.user",
        "animethemes.animethemeentries.videos.animethemeentries.animetheme.anime",
        "animethemes.animethemeentries.videos.animethemeentries.animetheme.anime.images",
        "animethemes.animethemeentries.videos.animethemeentries.animetheme.animethemeentries.videos",
        "animethemes.animethemeentries.videos.animethemeentries.animetheme.animethemeentries.videos.audio",
        "animethemes.animethemeentries.videos.animethemeentries.animetheme.song.artists",
        "animethemes.animethemeentries.videos.animethemeentries.animetheme.group",
    ],
    Theme: ["anime.images", "animethemeentries.videos", "animethemeentries.videos.audio", "song.artists", "group"],
    Artist: [
        "songs.animethemes.anime",
        "members",
        "groups",
        "groups.songs.artists",
        "groups.songs.animethemes.song",
        "groups.songs.animethemes.group",
        "groups.songs.animethemes.song.artists",
        "groups.songs.animethemes.anime.images",
        "groups.songs.animethemes.animethemeentries",
        "groups.songs.animethemes.animethemeentries.videos",
        "groups.songs.animethemes.animethemeentries.videos.audio",
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
        "images",
    ],
    Song: ["animethemes.anime", "artists"],
    Video: [
        "animethemeentries.animetheme.anime.images",
        "animethemeentries.animetheme.song.artists",
        "animethemeentries.animetheme.group",
        "videoscript",
        "audio",
    ],
    Audio: ["videos"],
    Playlist: [
        "user",
        "tracks",
        "tracks.animethemeentry.animetheme.song.artists",
        "tracks.video.audio",
        "tracks.animethemeentry.animetheme.anime.images",
        "tracks.video",
        "tracks.animethemeentry.animetheme.group",
        "tracks.previous",
        "tracks.next",
    ],
    PlaylistTrack: [
        "animethemeentry.animetheme.anime.images",
        "animethemeentry.animetheme.song.artists",
        "animethemeentry.animetheme.group",
        "video.audio",
        "animethemeentry",
    ],
    ExternalProfile: [
        "externalentries.anime.animethemes.group",
        "externalentries.anime.animethemes.animethemeentries.videos",
        "externalentries.anime.animethemes.song",
        "externalentries.anime.images",
    ],
    UserAuth: ["permissions", "roles.permissions"],
    FeaturedTheme: [
        "animethemeentry.animetheme.anime.images",
        "animethemeentry.animetheme.song.artists",
        "animethemeentry.animetheme.group",
        "user",
        "video",
    ],
};

interface ApiResolverConfig<ApiResponse, ApiResource, Parent, Args> {
    endpoint: (parent: Parent, args: Args) => string;
    extractFromResponse: (response: ApiResponse, parent: Parent, args: Args) => ApiResource;
    extractFromParent?: (parent: Parent, args: Args) => ApiResource | undefined;
    type?: string | null;
    baseInclude?: string;
}

export interface ApiResolverContext {
    cache?: Map<string, unknown | null>;
    apiRequests: number;
    req?: IncomingMessage;
}

export function transformedResolver<Result, Parent, Args, ResultTransformed>(
    resolver: ResolverFn<Result, Parent, ApiResolverContext, Args>,
    transform: (result: Result, parent: Parent, args: Args) => ResultTransformed,
): ResolverFn<ResultTransformed, Parent, ApiResolverContext, Args> {
    return async (parent, args, context, info) => transform(await resolver(parent, args, context, info), parent, args);
}

export function createApiResolver<ApiResponse>() {
    return function createApiResolverCurried<ApiResource, Parent, Args>(
        config: ApiResolverConfig<ApiResponse, ApiResource, Parent, Args>,
    ) {
        const { extractFromParent } = config;

        return async (parent: Parent, args: Args, context: ApiResolverContext, info: GraphQLResolveInfo) => {
            if (extractFromParent) {
                const extracted = extractFromParent(parent, args);
                if (extracted !== undefined) {
                    return extracted;
                }
            }

            const { url, headers } = buildRequest(config, parent, args, context, info);

            // Limiting the concurrent requests is necessary to prevent timeouts.
            return limit(() => fetchResults(url, headers, config, parent, args, context));
        };
    };
}

export function createApiResolverNotNull<ApiResponse>() {
    return function createApiResolverNotNullCurried<ApiResource, Parent, Args>(
        config: ApiResolverConfig<ApiResponse, ApiResource, Parent, Args>,
    ) {
        const { extractFromParent } = config;

        return async (parent: Parent, args: Args, context: ApiResolverContext, info: GraphQLResolveInfo) => {
            if (extractFromParent) {
                const extracted = extractFromParent(parent, args);
                if (extracted !== undefined) {
                    return extracted;
                }
            }

            const { url, headers } = buildRequest(config, parent, args, context, info);

            // Limiting the concurrent requests is necessary to prevent timeouts.
            return limit(async () => {
                const results = await fetchResults(url, headers, config, parent, args, context);

                if (results === null) {
                    throw new Error("Fetch returned null which isn't allowed in this resolver!");
                }

                return results;
            });
        };
    };
}

export function createApiResolverPaginated<ApiResponse extends ApiIndex>() {
    return function createApiResolverPaginatedCurried<ApiResource, Parent, Args extends { limit?: InputMaybe<number> }>(
        config: ApiResolverConfig<ApiResponse, Array<ApiResource>, Parent, Args>,
    ) {
        const { extractFromParent } = config;

        return async (parent: Parent, args: Args, context: ApiResolverContext, info: GraphQLResolveInfo) => {
            if (extractFromParent) {
                const extracted = extractFromParent(parent, args);
                if (extracted !== undefined) {
                    return extracted;
                }
            }

            const { url, headers } = buildRequest(config, parent, args, context, info);

            // Limiting the concurrent requests is necessary to prevent timeouts.
            return limit(() => fetchResultsPaginated(url, headers, config, parent, args, context));
        };
    };
}

function buildRequest<ApiResponse, ApiResource, Parent, Args>(
    config: ApiResolverConfig<ApiResponse, ApiResource, Parent, Args>,
    parent: Parent,
    args: Args,
    context: ApiResolverContext,
    info: GraphQLResolveInfo,
) {
    const { endpoint, type: defaultType = null, baseInclude } = config;

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
        .filter((include) =>
            ALLOWED_INCLUDES[type]?.find(
                (allowedInclude) => allowedInclude === include || allowedInclude.startsWith(include + "."),
            ),
        )
        // Remove includes which are already included with another include
        .filter((include, _, includes) => !includes.find((otherInclude) => otherInclude.startsWith(include + ".")))
        // Remove duplicates
        .filter((include, index, includes) => includes.lastIndexOf(include) === index);
    const disallowedIncludes = includes.filter(
        (include) =>
            !ALLOWED_INCLUDES[type]?.find(
                (allowedInclude) => allowedInclude === include || allowedInclude.startsWith(include + "."),
            ),
    );

    if (disallowedIncludes.length) {
        devLog.warn(`Disallowed includes for ${url}:`);
        devLog.warn(disallowedIncludes.toString());
        devLog.warn(`Or at least:`);
        devLog.warn(
            disallowedIncludes
                .filter(
                    (include, _, includes) => !includes.find((otherInclude) => otherInclude.startsWith(include + ".")),
                )
                .toString(),
        );
    }

    if (allowedIncludes.length) {
        url += `${url.includes("?") ? "&" : "?"}include=${allowedIncludes.join()}`;
    }

    const headers: HeadersInit | undefined = context.req
        ? {
              // Send auth headers from client forward, if provided.
              referer: context.req.headers.referer ?? AUTH_REFERER,
              cookie: context.req.headers.cookie ?? "",
          }
        : undefined;

    if (context.req && headers) {
        // Forward IP address of the requester so we can have proper rate limiting.
        // X-Real-IP is populated by the Nginx reverse proxy and includes the actual IP address of the requester.
        // X-Forwarded-IP is read by the API and is used for rate limiting.
        const realIp = context.req.headers["x-real-ip"];
        if (realIp) {
            headers["x-forwarded-ip"] = Array.isArray(realIp) ? realIp[0] : realIp;
        }
    }

    devLog.info(path + ": " + url);

    return { url, headers };
}

async function fetchResults<ApiResponse, ApiResource, Parent, Args>(
    url: string,
    headers: HeadersInit | undefined,
    config: ApiResolverConfig<ApiResponse, ApiResource, Parent, Args>,
    parent: Parent,
    args: Args,
    context: ApiResolverContext,
) {
    const { extractFromResponse } = config;

    devLog.info(`Fetching: ${url}`);
    let json: ApiResponse | null;

    const jsonCached = context?.cache?.get(url);
    if (jsonCached) {
        devLog.info("CACHED: " + url);
        json = jsonCached as ApiResponse;
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

    return extractFromResponse(json, parent, args);
}

async function fetchResultsPaginated<
    ApiResponse extends ApiIndex,
    ApiResource,
    Parent,
    Args extends { limit?: InputMaybe<number> },
>(
    url: string,
    headers: HeadersInit | undefined,
    config: ApiResolverConfig<ApiResponse, Array<ApiResource>, Parent, Args>,
    parent: Parent,
    args: Args,
    context: ApiResolverContext,
) {
    const { extractFromResponse } = config;

    devLog.info(`Collecting: ${url}`);
    const results = [];
    const pageSize = args.limit ?? PAGINATION_PAGE_SIZE ?? 25;
    let nextUrl: string | null = `${url}${url.includes("?") ? "&" : "?"}page[size]=${pageSize}`;
    while (nextUrl) {
        const json: ApiResponse | null = await fetchJson(nextUrl, { headers });
        context.apiRequests++;

        if (!json) {
            break;
        }

        results.push(...extractFromResponse(json, parent, args));

        devLog.info(`Collecting: ${url}, Got ${results.length}`);
        nextUrl = !args.limit ? json.links.next : null;
    }

    return results;
}

export async function fetchJson<T = Record<string, unknown>>(
    path: string,
    config: RequestInit = {},
): Promise<T | null> {
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

        throw new Error(
            `API returned with non-ok status code: ${response.status} (${response.statusText}) for ${url}.`,
        );
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
    return getIncludesRecursive(infoFragment, baseInclude ? baseInclude + "." : "");
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
