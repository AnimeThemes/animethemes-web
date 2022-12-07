import { apiResolver, fetchJson } from "lib/common/animethemes/api";
import gql from "graphql-tag";
import type { SearchArgs } from "generated/graphql";

export interface SimpleSearchArgs {
    query?: string | null
    filters?: Record<string, string | null>
    sortBy?: string | null
    page?: number
}

export const searchTypeDefs = gql`
    type Query {
        search(args: SearchArgs!): GlobalSearchResult!
        searchAnime(args: SearchArgs!): AnimeSearchResult!
        searchTheme(args: SearchArgs!): ThemeSearchResult!
        searchArtist(args: SearchArgs!): ArtistSearchResult!
        searchSeries(args: SearchArgs!): SeriesSearchResult!
        searchStudio(args: SearchArgs!): StudioSearchResult!
    }

    type GlobalSearchResult {
        anime: [Anime!]!
        themes: [Theme!]!
        artists: [Artist!]!
        series: [Series!]!
        studios: [Studio!]!
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

interface Args {
    args: SearchArgs
}

interface GlobalSearchResult {
    search: {
        anime: unknown
        animethemes: unknown
        artists: unknown
        series: unknown
        studios: unknown
    }
}

export const searchResolvers = {
    Query: {
        // TODO: This resolver has to be custom, because the search endpoint uses scoped includes
        // TODO: which isn't supported by the default API resolver.
        search: async (_: never, { args }: Args) => {
            const searchParams = getSearchParams(args, true);

            // TODO: Hardcoded includes and fields should be generate dynamically by API resolver instead
            searchParams.append("include[anime]", "animethemes.animethemeentries.videos,animethemes.song,images");
            searchParams.append("include[animetheme]", "animethemeentries.videos,anime.images,song.artists");
            searchParams.append("include[artist]", "images,songs");
            searchParams.append("fields[anime]", "name,slug,year,season");
            searchParams.append("fields[animetheme]", "type,sequence,slug,group,id");
            searchParams.append("fields[animethemeentry]", "version,episodes,spoiler,nsfw");
            searchParams.append("fields[video]", "tags,resolution,nc,subbed,lyrics,uncen,source,overlap");
            searchParams.append("fields[image]", "facet,link");
            searchParams.append("fields[song]", "title");
            searchParams.append("fields[artist]", "name,slug,as");
            searchParams.append("fields[series]", "name,slug");
            searchParams.append("fields[studio]", "name,slug");

            const result = await fetchJson<GlobalSearchResult>(`/search?${searchParams}`);

            return {
                anime: result?.search.anime,
                themes: result?.search.animethemes,
                artists: result?.search.artists,
                series: result?.search.series,
                studios: result?.search.studios,
            };
        },
        searchAnime: apiResolver({
            endpoint: (_, { args }) => `/anime?${getSearchParams(args as SearchArgs)}`,
            extractor: (result, _, args) => ({
                data: result.anime,
                nextPage: getNextPage(result, args)
            }),
            type: "Anime"
        }),
        searchTheme: apiResolver({
            endpoint: (_, { args }) => `/animetheme?${getSearchParams(args as SearchArgs)}`,
            extractor: (result, _, args) => ({
                data: result.animethemes,
                nextPage: getNextPage(result, args)
            }),
            type: "Theme"
        }),
        searchArtist: apiResolver({
            endpoint: (_, { args }) => `/artist?${getSearchParams(args as SearchArgs)}`,
            extractor: (result, _, args) => ({
                data: result.artists,
                nextPage: getNextPage(result, args)
            }),
            type: "Artist"
        }),
        searchSeries: apiResolver({
            endpoint: (_, { args }) => `/series?${getSearchParams(args as SearchArgs)}`,
            extractor: (result, _, args) => ({
                data: result.series,
                nextPage: getNextPage(result, args)
            }),
            type: "Series"
        }),
        searchStudio: apiResolver({
            endpoint: (_, { args }) => `/studio?${getSearchParams(args as SearchArgs)}`,
            extractor: (result, _, args) => ({
                data: result.studios,
                nextPage: getNextPage(result, args)
            }),
            type: "Studio"
        }),
    }
};

function getSearchParams({ query, filters, sortBy, page = 1 }: SearchArgs, isGlobalSearch = false): URLSearchParams {
    const searchParams = new URLSearchParams();

    if (!isGlobalSearch) {
        searchParams.append("page[size]", "15");
        searchParams.append("page[number]", String(page));
    } else {
        searchParams.append("page[limit]", "4");
        searchParams.append("fields[search]", "anime,animethemes,artists,series,studios");
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

function getNextPage(result: Record<string, any>, args: Record<string, unknown>) {
    return result.links.next !== null ? ((args.args as SearchArgs)?.page as number) + 1 : undefined;
}

export function toSearchArgs(simpleSearchArgs: SimpleSearchArgs): SearchArgs {
    return {
        ...simpleSearchArgs,
        filters: simpleSearchArgs.filters
            ? Object.entries(simpleSearchArgs.filters).map(([key, value]) => ({ key, value }))
            : null,
    };
}
