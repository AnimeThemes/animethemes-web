import gql from "graphql-tag";

import type { Resolvers, SearchArgs } from "@/generated/graphql-resolvers";
import { createApiResolverNotNull, fetchJson } from "@/lib/common/animethemes/api";
import type {
    ApiAnime,
    ApiAnimeIndex,
    ApiArtist,
    ApiArtistIndex,
    ApiIndex,
    ApiPlaylist,
    ApiPlaylistIndex,
    ApiSeries,
    ApiSeriesIndex,
    ApiStudio,
    ApiStudioIndex,
    ApiTheme,
    ApiThemeIndex,
} from "@/lib/common/animethemes/types";

export interface SimpleSearchArgs {
    query?: string | null;
    filters?: Record<string, string | null>;
    sortBy?: string | null;
    page?: number;
}

export const searchTypeDefs = gql`
    type Query {
        search(args: SearchArgs!): GlobalSearchResult!
        searchAnime(args: SearchArgs!): AnimeSearchResult!
        searchTheme(args: SearchArgs!): ThemeSearchResult!
        searchArtist(args: SearchArgs!): ArtistSearchResult!
        searchSeries(args: SearchArgs!): SeriesSearchResult!
        searchStudio(args: SearchArgs!): StudioSearchResult!
        searchPlaylist(args: SearchArgs!): PlaylistSearchResult!
    }

    type GlobalSearchResult {
        anime: [Anime!]!
        themes: [Theme!]!
        artists: [Artist!]!
        series: [Series!]!
        studios: [Studio!]!
        playlists: [Playlist!]!
    }

    interface EntitySearchResult {
        nextPage: Int
    }

    type AnimeSearchResult implements EntitySearchResult {
        data: [Anime!]!
        nextPage: Int
    }

    type ThemeSearchResult implements EntitySearchResult {
        data: [Theme!]!
        nextPage: Int
    }

    type ArtistSearchResult implements EntitySearchResult {
        data: [Artist!]!
        nextPage: Int
    }

    type SeriesSearchResult implements EntitySearchResult {
        data: [Series!]!
        nextPage: Int
    }

    type StudioSearchResult implements EntitySearchResult {
        data: [Studio!]!
        nextPage: Int
    }

    type PlaylistSearchResult implements EntitySearchResult {
        data: [Playlist!]!
        nextPage: Int
    }

    input SearchArgs {
        query: String
        filters: [Filter!]
        sortBy: String
        page: Int
    }

    input Filter {
        key: String!
        value: String
    }
`;

interface GlobalSearchResult {
    search: {
        anime: Array<ApiAnime>;
        animethemes: Array<ApiTheme>;
        artists: Array<ApiArtist>;
        series: Array<ApiSeries>;
        studios: Array<ApiStudio>;
        playlists: Array<ApiPlaylist>;
    };
}

export const searchResolvers: Resolvers = {
    Query: {
        // TODO: This resolver has to be custom, because the search endpoint uses scoped includes
        // TODO: which isn't supported by the default API resolver.
        search: async (_, { args }) => {
            const searchParams = getSearchParams(args, true);

            // TODO: Hardcoded includes and fields should be generate dynamically by API resolver instead
            searchParams.append(
                "include[anime]",
                "animethemes.animethemeentries.videos,animethemes.group,animethemes.song,images",
            );
            searchParams.append(
                "include[animetheme]",
                "animethemeentries.videos.audio,anime.images,song.artists,group",
            );
            searchParams.append("include[artist]", "images,songs");
            searchParams.append("include[playlist]", "user");
            searchParams.append("fields[anime]", "name,slug,year,season");
            searchParams.append("fields[animetheme]", "type,sequence,id");
            searchParams.append("fields[group]", "name,slug");
            searchParams.append("fields[animethemeentry]", "id,version,episodes,spoiler,nsfw");
            searchParams.append("fields[video]", "id,tags,resolution,nc,subbed,lyrics,uncen,source,overlap,basename");
            searchParams.append("fields[image]", "facet,link");
            searchParams.append("fields[song]", "id,title");
            searchParams.append("fields[artist]", "name,slug");
            searchParams.append("fields[series]", "name,slug");
            searchParams.append("fields[studio]", "name,slug");
            searchParams.append("fields[playlist]", "id,name,visibility,tracks_count");
            searchParams.append("fields[user]", "name");

            const result = await fetchJson<GlobalSearchResult>(`/search?${searchParams}`);

            if (!result) {
                throw new Error("Search returned null.");
            }

            return {
                anime: result.search.anime,
                themes: result.search.animethemes,
                artists: result.search.artists,
                series: result.search.series,
                studios: result.search.studios,
                playlists: result.search.playlists,
            };
        },
        searchAnime: createApiResolverNotNull<ApiAnimeIndex>()({
            endpoint: (_, { args }) => `/anime?${getSearchParams(args)}`,
            extractFromResponse: (response, _, args) => ({
                data: response.anime,
                nextPage: getNextPage(response, args),
            }),
            type: "Anime",
        }),
        searchTheme: createApiResolverNotNull<ApiThemeIndex>()({
            endpoint: (_, { args }) => `/animetheme?${getSearchParams(args)}`,
            extractFromResponse: (response, _, args) => ({
                data: response.animethemes,
                nextPage: getNextPage(response, args),
            }),
            type: "Theme",
        }),
        searchArtist: createApiResolverNotNull<ApiArtistIndex>()({
            endpoint: (_, { args }) => `/artist?${getSearchParams(args)}`,
            extractFromResponse: (response, _, args) => ({
                data: response.artists,
                nextPage: getNextPage(response, args),
            }),
            type: "Artist",
        }),
        searchSeries: createApiResolverNotNull<ApiSeriesIndex>()({
            endpoint: (_, { args }) => `/series?${getSearchParams(args)}`,
            extractFromResponse: (response, _, args) => ({
                data: response.series,
                nextPage: getNextPage(response, args),
            }),
            type: "Series",
        }),
        searchStudio: createApiResolverNotNull<ApiStudioIndex>()({
            endpoint: (_, { args }) => `/studio?${getSearchParams(args)}`,
            extractFromResponse: (response, _, args) => ({
                data: response.studios,
                nextPage: getNextPage(response, args),
            }),
            type: "Studio",
        }),
        searchPlaylist: createApiResolverNotNull<ApiPlaylistIndex>()({
            endpoint: (_, { args }) =>
                `/playlist?fields[playlist]=id,name,visibility,tracks_count&${getSearchParams(args)}`,
            extractFromResponse: (response, _, args) => ({
                data: response.playlists,
                nextPage: getNextPage(response, args),
            }),
            type: "Playlist",
        }),
    },
};

function getSearchParams({ query, filters, sortBy, page = 1 }: SearchArgs, isGlobalSearch = false): URLSearchParams {
    const searchParams = new URLSearchParams();

    if (!isGlobalSearch) {
        searchParams.append("page[size]", "15");
        searchParams.append("page[number]", String(page));
    } else {
        searchParams.append("page[limit]", "4");
        searchParams.append("fields[search]", "anime,animethemes,artists,series,studios,playlists");
    }

    if (query) {
        searchParams.append("q", query);
    }

    if (filters) {
        for (const { key, value } of filters) {
            if (value) {
                searchParams.append(`filter[${key}]`, value);
            }
        }
    }

    if (sortBy) {
        searchParams.append("sort", sortBy);
    }

    return searchParams;
}

function getNextPage(response: ApiIndex, args: Record<string, unknown>) {
    return response.links.next !== null ? ((args.args as SearchArgs)?.page as number) + 1 : undefined;
}

export function toSearchArgs(simpleSearchArgs: SimpleSearchArgs): SearchArgs {
    return {
        ...simpleSearchArgs,
        filters: simpleSearchArgs.filters
            ? Object.entries(simpleSearchArgs.filters).map(([key, value]) => ({ key, value }))
            : null,
    };
}
