import type { GraphQLResolveInfo } from "graphql";
import type {
    ApiAnime,
    ApiAnnouncement,
    ApiArtist,
    ApiAudio,
    ApiDump,
    ApiEntry,
    ApiFeaturedTheme,
    ApiGroup,
    ApiPage,
    ApiPerformance,
    ApiPlaylist,
    ApiPlaylistTrack,
    ApiSeason,
    ApiSeries,
    ApiSong,
    ApiStudio,
    ApiSynonym,
    ApiTheme,
    ApiUser,
    ApiUserRole,
    ApiVideo,
    ApiVideoScript,
    ApiYear,
} from "@/lib/common/animethemes/types";
import type {
    ModelBracket,
    ModelBracketRound,
    ModelBracketPairing,
    ModelBracketCharacter,
} from "@/lib/server/animebracket/resolvers";
export type Maybe<T> = T extends PromiseLike<infer U> ? Promise<U | null> : T | null;
export type InputMaybe<T> = T extends PromiseLike<infer U> ? Promise<U | null> : T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
export type EnumResolverSignature<T, AllowedValues = any> = { [key in keyof T]?: AllowedValues };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
    ID: { input: string; output: string };
    String: { input: string; output: string };
    Boolean: { input: boolean; output: boolean };
    Int: { input: number; output: number };
    Float: { input: number; output: number };
};

export type Anime = ResourceWithImages & {
    __typename?: "Anime";
    id: Scalars["Int"]["output"];
    images: Array<Image>;
    media_format?: Maybe<Scalars["String"]["output"]>;
    name: Scalars["String"]["output"];
    resources: Array<Resource>;
    season?: Maybe<Scalars["String"]["output"]>;
    series: Array<Series>;
    slug: Scalars["String"]["output"];
    studios: Array<Studio>;
    synonyms: Array<Synonym>;
    synopsis?: Maybe<Scalars["String"]["output"]>;
    themes: Array<Theme>;
    year?: Maybe<Scalars["Int"]["output"]>;
};

export type AnimeSearchResult = EntitySearchResult & {
    __typename?: "AnimeSearchResult";
    data: Array<Anime>;
    nextPage?: Maybe<Scalars["Int"]["output"]>;
};

export type Announcement = {
    __typename?: "Announcement";
    content: Scalars["String"]["output"];
    id?: Maybe<Scalars["Int"]["output"]>;
};

export type Artist = ResourceWithImages & {
    __typename?: "Artist";
    groups: Array<ArtistMembership>;
    id: Scalars["Int"]["output"];
    images: Array<Image>;
    members: Array<ArtistMembership>;
    name: Scalars["String"]["output"];
    performances: Array<Performance>;
    resources: Array<Resource>;
    slug: Scalars["String"]["output"];
};

export type ArtistMembership = {
    __typename?: "ArtistMembership";
    as?: Maybe<Scalars["String"]["output"]>;
    group: Artist;
    member: Artist;
};

export type ArtistSearchResult = EntitySearchResult & {
    __typename?: "ArtistSearchResult";
    data: Array<Artist>;
    nextPage?: Maybe<Scalars["Int"]["output"]>;
};

export type Audio = {
    __typename?: "Audio";
    basename: Scalars["String"]["output"];
    filename: Scalars["String"]["output"];
    id: Scalars["Int"]["output"];
    link: Scalars["String"]["output"];
    mimetype: Scalars["String"]["output"];
    path: Scalars["String"]["output"];
    size: Scalars["Int"]["output"];
    videos: Array<Video>;
};

export type Bracket = {
    __typename?: "Bracket";
    currentGroup?: Maybe<Scalars["Int"]["output"]>;
    currentRound?: Maybe<BracketRound>;
    name: Scalars["String"]["output"];
    rounds: Array<BracketRound>;
    slug: Scalars["String"]["output"];
};

export type BracketCharacter = {
    __typename?: "BracketCharacter";
    id: Scalars["Int"]["output"];
    image: Scalars["String"]["output"];
    name: Scalars["String"]["output"];
    pairing?: Maybe<BracketPairing>;
    seed: Scalars["Int"]["output"];
    source: Scalars["String"]["output"];
    theme?: Maybe<Theme>;
};

export type BracketPairing = {
    __typename?: "BracketPairing";
    characterA: BracketCharacter;
    characterB: BracketCharacter;
    group: Scalars["Int"]["output"];
    order: Scalars["Int"]["output"];
    round?: Maybe<BracketRound>;
    votesA?: Maybe<Scalars["Int"]["output"]>;
    votesB?: Maybe<Scalars["Int"]["output"]>;
};

export type BracketRound = {
    __typename?: "BracketRound";
    bracket?: Maybe<Bracket>;
    name?: Maybe<Scalars["String"]["output"]>;
    pairings: Array<BracketPairing>;
    tier: Scalars["Int"]["output"];
};

export type Dump = {
    __typename?: "Dump";
    created_at: Scalars["String"]["output"];
    id: Scalars["Int"]["output"];
    link: Scalars["String"]["output"];
    path: Scalars["String"]["output"];
};

export type EntitySearchResult = {
    nextPage?: Maybe<Scalars["Int"]["output"]>;
};

export type Entry = {
    __typename?: "Entry";
    episodes?: Maybe<Scalars["String"]["output"]>;
    id: Scalars["Int"]["output"];
    nsfw: Scalars["Boolean"]["output"];
    spoiler: Scalars["Boolean"]["output"];
    theme: Theme;
    version?: Maybe<Scalars["Int"]["output"]>;
    videos: Array<Video>;
};

export type FeaturedTheme = {
    __typename?: "FeaturedTheme";
    end_at: Scalars["String"]["output"];
    entry?: Maybe<Entry>;
    id: Scalars["Int"]["output"];
    start_at: Scalars["String"]["output"];
    video?: Maybe<Video>;
};

export type Filter = {
    key: Scalars["String"]["input"];
    value?: InputMaybe<Scalars["String"]["input"]>;
};

export type GlobalSearchResult = {
    __typename?: "GlobalSearchResult";
    anime: Array<Anime>;
    artists: Array<Artist>;
    playlists: Array<Playlist>;
    series: Array<Series>;
    studios: Array<Studio>;
    themes: Array<Theme>;
};

export type Image = {
    __typename?: "Image";
    facet?: Maybe<Scalars["String"]["output"]>;
    id: Scalars["Int"]["output"];
    link: Scalars["String"]["output"];
    mimetype: Scalars["String"]["output"];
    path: Scalars["String"]["output"];
    size: Scalars["Int"]["output"];
};

export type Page = {
    __typename?: "Page";
    body: Scalars["String"]["output"];
    created_at: Scalars["String"]["output"];
    id?: Maybe<Scalars["Int"]["output"]>;
    name: Scalars["String"]["output"];
    slug: Scalars["String"]["output"];
};

export type Performance = {
    __typename?: "Performance";
    artist: Artist;
    as?: Maybe<Scalars["String"]["output"]>;
    song: Song;
};

export type Permission = {
    __typename?: "Permission";
    id: Scalars["Int"]["output"];
    name: Scalars["String"]["output"];
};

export type Playlist = {
    __typename?: "Playlist";
    description?: Maybe<Scalars["String"]["output"]>;
    forward: Array<PlaylistTrack>;
    id: Scalars["String"]["output"];
    name: Scalars["String"]["output"];
    tracks: Array<PlaylistTrack>;
    tracks_count: Scalars["Int"]["output"];
    user: UserPublic;
    visibility: PlaylistVisibility;
};

export type PlaylistSearchResult = EntitySearchResult & {
    __typename?: "PlaylistSearchResult";
    data: Array<Playlist>;
    nextPage?: Maybe<Scalars["Int"]["output"]>;
};

export type PlaylistTrack = {
    __typename?: "PlaylistTrack";
    id: Scalars["String"]["output"];
    next?: Maybe<PlaylistTrack>;
    playlist: Playlist;
    previous?: Maybe<PlaylistTrack>;
    video: Video;
};

export enum PlaylistVisibility {
    Private = "Private",
    Public = "Public",
    Unlisted = "Unlisted",
}

export type Query = {
    __typename?: "Query";
    anime?: Maybe<Anime>;
    animeAll: Array<Anime>;
    announcementAll: Array<Announcement>;
    artist?: Maybe<Artist>;
    artistAll: Array<Artist>;
    bracket?: Maybe<Bracket>;
    bracketAll: Array<Bracket>;
    dumpAll: Array<Dump>;
    featuredTheme?: Maybe<FeaturedTheme>;
    imageAll: Array<Image>;
    me: UserScopedQuery;
    page?: Maybe<Page>;
    pageAll: Array<Page>;
    playlist?: Maybe<Playlist>;
    playlistAll: Array<Playlist>;
    search: GlobalSearchResult;
    searchAnime: AnimeSearchResult;
    searchArtist: ArtistSearchResult;
    searchPlaylist: PlaylistSearchResult;
    searchSeries: SeriesSearchResult;
    searchStudio: StudioSearchResult;
    searchTheme: ThemeSearchResult;
    season?: Maybe<Season>;
    series?: Maybe<Series>;
    seriesAll: Array<Series>;
    studio?: Maybe<Studio>;
    studioAll: Array<Studio>;
    theme?: Maybe<Theme>;
    themeAll: Array<Theme>;
    videoAll: Array<Video>;
    year?: Maybe<Year>;
    yearAll: Array<Year>;
};

export type QueryAnimeArgs = {
    id?: InputMaybe<Scalars["Int"]["input"]>;
    slug?: InputMaybe<Scalars["String"]["input"]>;
};

export type QueryAnimeAllArgs = {
    limit?: InputMaybe<Scalars["Int"]["input"]>;
    season?: InputMaybe<Scalars["String"]["input"]>;
    year?: InputMaybe<Scalars["Int"]["input"]>;
};

export type QueryArtistArgs = {
    id?: InputMaybe<Scalars["Int"]["input"]>;
    slug?: InputMaybe<Scalars["String"]["input"]>;
};

export type QueryArtistAllArgs = {
    limit?: InputMaybe<Scalars["Int"]["input"]>;
};

export type QueryBracketArgs = {
    slug: Scalars["String"]["input"];
};

export type QueryImageAllArgs = {
    facet?: InputMaybe<Scalars["String"]["input"]>;
    limit?: InputMaybe<Scalars["Int"]["input"]>;
};

export type QueryPageArgs = {
    id?: InputMaybe<Scalars["Int"]["input"]>;
    slug?: InputMaybe<Scalars["String"]["input"]>;
};

export type QueryPlaylistArgs = {
    id: Scalars["String"]["input"];
};

export type QueryPlaylistAllArgs = {
    limit?: InputMaybe<Scalars["Int"]["input"]>;
    onlyNonEmpty?: InputMaybe<Scalars["Boolean"]["input"]>;
    orderBy?: InputMaybe<Scalars["String"]["input"]>;
    orderDesc?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export type QuerySearchArgs = {
    args: SearchArgs;
};

export type QuerySearchAnimeArgs = {
    args: SearchArgs;
};

export type QuerySearchArtistArgs = {
    args: SearchArgs;
};

export type QuerySearchPlaylistArgs = {
    args: SearchArgs;
};

export type QuerySearchSeriesArgs = {
    args: SearchArgs;
};

export type QuerySearchStudioArgs = {
    args: SearchArgs;
};

export type QuerySearchThemeArgs = {
    args: SearchArgs;
};

export type QuerySeasonArgs = {
    value: Scalars["String"]["input"];
    year: Scalars["Int"]["input"];
};

export type QuerySeriesArgs = {
    id?: InputMaybe<Scalars["Int"]["input"]>;
    slug?: InputMaybe<Scalars["String"]["input"]>;
};

export type QuerySeriesAllArgs = {
    limit?: InputMaybe<Scalars["Int"]["input"]>;
};

export type QueryStudioArgs = {
    id?: InputMaybe<Scalars["Int"]["input"]>;
    slug?: InputMaybe<Scalars["String"]["input"]>;
};

export type QueryStudioAllArgs = {
    limit?: InputMaybe<Scalars["Int"]["input"]>;
};

export type QueryThemeArgs = {
    id?: InputMaybe<Scalars["Int"]["input"]>;
};

export type QueryThemeAllArgs = {
    has?: InputMaybe<Scalars["String"]["input"]>;
    limit?: InputMaybe<Scalars["Int"]["input"]>;
    orderBy?: InputMaybe<Scalars["String"]["input"]>;
    orderDesc?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export type QueryVideoAllArgs = {
    limit?: InputMaybe<Scalars["Int"]["input"]>;
    orderBy?: InputMaybe<Scalars["String"]["input"]>;
    orderDesc?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export type QueryYearArgs = {
    value: Scalars["Int"]["input"];
};

export type Resource = {
    __typename?: "Resource";
    as?: Maybe<Scalars["String"]["output"]>;
    external_id?: Maybe<Scalars["Int"]["output"]>;
    id: Scalars["Int"]["output"];
    link?: Maybe<Scalars["String"]["output"]>;
    site?: Maybe<Scalars["String"]["output"]>;
};

export type ResourceWithImages = {
    images: Array<Image>;
};

export type SearchArgs = {
    filters?: InputMaybe<Array<Filter>>;
    page?: InputMaybe<Scalars["Int"]["input"]>;
    query?: InputMaybe<Scalars["String"]["input"]>;
    sortBy?: InputMaybe<Scalars["String"]["input"]>;
};

export type Season = {
    __typename?: "Season";
    anime: Array<Anime>;
    value: Scalars["String"]["output"];
    year?: Maybe<Year>;
};

export type Series = {
    __typename?: "Series";
    anime: Array<Anime>;
    id: Scalars["Int"]["output"];
    name: Scalars["String"]["output"];
    slug: Scalars["String"]["output"];
};

export type SeriesSearchResult = EntitySearchResult & {
    __typename?: "SeriesSearchResult";
    data: Array<Series>;
    nextPage?: Maybe<Scalars["Int"]["output"]>;
};

export type Song = {
    __typename?: "Song";
    id?: Maybe<Scalars["Int"]["output"]>;
    performances: Array<Performance>;
    themes: Array<Theme>;
    title?: Maybe<Scalars["String"]["output"]>;
};

export type Studio = ResourceWithImages & {
    __typename?: "Studio";
    anime: Array<Anime>;
    id: Scalars["Int"]["output"];
    images: Array<Image>;
    name: Scalars["String"]["output"];
    resources: Array<Resource>;
    slug: Scalars["String"]["output"];
};

export type StudioSearchResult = EntitySearchResult & {
    __typename?: "StudioSearchResult";
    data: Array<Studio>;
    nextPage?: Maybe<Scalars["Int"]["output"]>;
};

export type Synonym = {
    __typename?: "Synonym";
    anime?: Maybe<Anime>;
    id: Scalars["Int"]["output"];
    text?: Maybe<Scalars["String"]["output"]>;
};

export type Theme = {
    __typename?: "Theme";
    anime: Anime;
    entries: Array<Entry>;
    group?: Maybe<ThemeGroup>;
    id: Scalars["Int"]["output"];
    sequence?: Maybe<Scalars["Int"]["output"]>;
    song?: Maybe<Song>;
    type: Scalars["String"]["output"];
};

export type ThemeGroup = {
    __typename?: "ThemeGroup";
    id: Scalars["Int"]["output"];
    name: Scalars["String"]["output"];
    slug: Scalars["String"]["output"];
};

export type ThemeSearchResult = EntitySearchResult & {
    __typename?: "ThemeSearchResult";
    data: Array<Theme>;
    nextPage?: Maybe<Scalars["Int"]["output"]>;
};

export type User = {
    id: Scalars["Int"]["output"];
    name: Scalars["String"]["output"];
};

export type UserAuth = User & {
    __typename?: "UserAuth";
    created_at: Scalars["String"]["output"];
    email: Scalars["String"]["output"];
    email_verified_at?: Maybe<Scalars["String"]["output"]>;
    id: Scalars["Int"]["output"];
    name: Scalars["String"]["output"];
    permissions: Array<Permission>;
    roles: Array<UserRole>;
};

export type UserPublic = User & {
    __typename?: "UserPublic";
    id: Scalars["Int"]["output"];
    name: Scalars["String"]["output"];
};

export type UserRole = {
    __typename?: "UserRole";
    color?: Maybe<Scalars["String"]["output"]>;
    default: Scalars["Boolean"]["output"];
    name: Scalars["String"]["output"];
    permissions: Array<Permission>;
    priority?: Maybe<Scalars["Int"]["output"]>;
};

export type UserScopedQuery = {
    __typename?: "UserScopedQuery";
    playlistAll?: Maybe<Array<Playlist>>;
    user?: Maybe<UserAuth>;
};

export type UserScopedQueryPlaylistAllArgs = {
    filterVideoId?: InputMaybe<Scalars["Int"]["input"]>;
    limit?: InputMaybe<Scalars["Int"]["input"]>;
};

export type Video = {
    __typename?: "Video";
    audio: Audio;
    basename: Scalars["String"]["output"];
    entries: Array<Entry>;
    filename: Scalars["String"]["output"];
    id: Scalars["Int"]["output"];
    link: Scalars["String"]["output"];
    lyrics: Scalars["Boolean"]["output"];
    mimetype: Scalars["String"]["output"];
    nc: Scalars["Boolean"]["output"];
    overlap: VideoOverlap;
    path: Scalars["String"]["output"];
    resolution?: Maybe<Scalars["Int"]["output"]>;
    script?: Maybe<VideoScript>;
    size: Scalars["Int"]["output"];
    source?: Maybe<VideoSource>;
    subbed: Scalars["Boolean"]["output"];
    tags: Scalars["String"]["output"];
    tracks: Array<PlaylistTrack>;
    uncen: Scalars["Boolean"]["output"];
};

export enum VideoOverlap {
    None = "NONE",
    Over = "OVER",
    Transition = "TRANSITION",
}

export type VideoScript = {
    __typename?: "VideoScript";
    id: Scalars["Int"]["output"];
    link: Scalars["String"]["output"];
    path: Scalars["String"]["output"];
};

export enum VideoSource {
    Bd = "BD",
    Dvd = "DVD",
    Ld = "LD",
    Raw = "RAW",
    Vhs = "VHS",
    Web = "WEB",
}

export type Year = {
    __typename?: "Year";
    seasons: Array<Season>;
    value: Scalars["Int"]["output"];
};

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
    resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
    | ResolverFn<TResult, TParent, TContext, TArgs>
    | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
    parent: TParent,
    args: TArgs,
    context: TContext,
    info: GraphQLResolveInfo,
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
    parent: TParent,
    args: TArgs,
    context: TContext,
    info: GraphQLResolveInfo,
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
    parent: TParent,
    args: TArgs,
    context: TContext,
    info: GraphQLResolveInfo,
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
    subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
    resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
    subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
    resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
    | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
    | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
    | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
    | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
    parent: TParent,
    context: TContext,
    info: GraphQLResolveInfo,
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
    obj: T,
    context: TContext,
    info: GraphQLResolveInfo,
) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
    next: NextResolverFn<TResult>,
    parent: TParent,
    args: TArgs,
    context: TContext,
    info: GraphQLResolveInfo,
) => TResult | Promise<TResult>;

/** Mapping of interface types */
export type ResolversInterfaceTypes<_RefType extends Record<string, unknown>> = {
    EntitySearchResult:
        | (Omit<AnimeSearchResult, "data"> & { data: Array<_RefType["Anime"]> })
        | (Omit<ArtistSearchResult, "data"> & { data: Array<_RefType["Artist"]> })
        | (Omit<PlaylistSearchResult, "data"> & { data: Array<_RefType["Playlist"]> })
        | (Omit<SeriesSearchResult, "data"> & { data: Array<_RefType["Series"]> })
        | (Omit<StudioSearchResult, "data"> & { data: Array<_RefType["Studio"]> })
        | (Omit<ThemeSearchResult, "data"> & { data: Array<_RefType["Theme"]> });
    ResourceWithImages: ApiAnime | ApiArtist | ApiStudio;
    User: ApiUser | ApiUser;
};

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
    Anime: ResolverTypeWrapper<ApiAnime>;
    AnimeSearchResult: ResolverTypeWrapper<Omit<AnimeSearchResult, "data"> & { data: Array<ResolversTypes["Anime"]> }>;
    Announcement: ResolverTypeWrapper<ApiAnnouncement>;
    Artist: ResolverTypeWrapper<ApiArtist>;
    ArtistMembership: ResolverTypeWrapper<
        Omit<ArtistMembership, "group" | "member"> & {
            group: ResolversTypes["Artist"];
            member: ResolversTypes["Artist"];
        }
    >;
    ArtistSearchResult: ResolverTypeWrapper<
        Omit<ArtistSearchResult, "data"> & { data: Array<ResolversTypes["Artist"]> }
    >;
    Audio: ResolverTypeWrapper<ApiAudio>;
    Boolean: ResolverTypeWrapper<Scalars["Boolean"]["output"]>;
    Bracket: ResolverTypeWrapper<ModelBracket>;
    BracketCharacter: ResolverTypeWrapper<ModelBracketCharacter>;
    BracketPairing: ResolverTypeWrapper<ModelBracketPairing>;
    BracketRound: ResolverTypeWrapper<ModelBracketRound>;
    Dump: ResolverTypeWrapper<ApiDump>;
    EntitySearchResult: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>["EntitySearchResult"]>;
    Entry: ResolverTypeWrapper<ApiEntry>;
    FeaturedTheme: ResolverTypeWrapper<ApiFeaturedTheme>;
    Filter: Filter;
    GlobalSearchResult: ResolverTypeWrapper<
        Omit<GlobalSearchResult, "anime" | "artists" | "playlists" | "series" | "studios" | "themes"> & {
            anime: Array<ResolversTypes["Anime"]>;
            artists: Array<ResolversTypes["Artist"]>;
            playlists: Array<ResolversTypes["Playlist"]>;
            series: Array<ResolversTypes["Series"]>;
            studios: Array<ResolversTypes["Studio"]>;
            themes: Array<ResolversTypes["Theme"]>;
        }
    >;
    Image: ResolverTypeWrapper<Image>;
    Int: ResolverTypeWrapper<Scalars["Int"]["output"]>;
    Page: ResolverTypeWrapper<ApiPage>;
    Performance: ResolverTypeWrapper<ApiPerformance>;
    Permission: ResolverTypeWrapper<Permission>;
    Playlist: ResolverTypeWrapper<ApiPlaylist>;
    PlaylistSearchResult: ResolverTypeWrapper<
        Omit<PlaylistSearchResult, "data"> & { data: Array<ResolversTypes["Playlist"]> }
    >;
    PlaylistTrack: ResolverTypeWrapper<ApiPlaylistTrack>;
    PlaylistVisibility: PlaylistVisibility;
    Query: ResolverTypeWrapper<{}>;
    Resource: ResolverTypeWrapper<Resource>;
    ResourceWithImages: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>["ResourceWithImages"]>;
    SearchArgs: SearchArgs;
    Season: ResolverTypeWrapper<ApiSeason>;
    Series: ResolverTypeWrapper<ApiSeries>;
    SeriesSearchResult: ResolverTypeWrapper<
        Omit<SeriesSearchResult, "data"> & { data: Array<ResolversTypes["Series"]> }
    >;
    Song: ResolverTypeWrapper<ApiSong>;
    String: ResolverTypeWrapper<Scalars["String"]["output"]>;
    Studio: ResolverTypeWrapper<ApiStudio>;
    StudioSearchResult: ResolverTypeWrapper<
        Omit<StudioSearchResult, "data"> & { data: Array<ResolversTypes["Studio"]> }
    >;
    Synonym: ResolverTypeWrapper<ApiSynonym>;
    Theme: ResolverTypeWrapper<ApiTheme>;
    ThemeGroup: ResolverTypeWrapper<ThemeGroup>;
    ThemeSearchResult: ResolverTypeWrapper<Omit<ThemeSearchResult, "data"> & { data: Array<ResolversTypes["Theme"]> }>;
    User: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>["User"]>;
    UserAuth: ResolverTypeWrapper<ApiUser>;
    UserPublic: ResolverTypeWrapper<ApiUser>;
    UserRole: ResolverTypeWrapper<ApiUserRole>;
    UserScopedQuery: ResolverTypeWrapper<{}>;
    Video: ResolverTypeWrapper<ApiVideo>;
    VideoOverlap: ResolverTypeWrapper<string>;
    VideoScript: ResolverTypeWrapper<ApiVideoScript>;
    VideoSource: VideoSource;
    Year: ResolverTypeWrapper<ApiYear>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
    Anime: ApiAnime;
    AnimeSearchResult: Omit<AnimeSearchResult, "data"> & { data: Array<ResolversParentTypes["Anime"]> };
    Announcement: ApiAnnouncement;
    Artist: ApiArtist;
    ArtistMembership: Omit<ArtistMembership, "group" | "member"> & {
        group: ResolversParentTypes["Artist"];
        member: ResolversParentTypes["Artist"];
    };
    ArtistSearchResult: Omit<ArtistSearchResult, "data"> & { data: Array<ResolversParentTypes["Artist"]> };
    Audio: ApiAudio;
    Boolean: Scalars["Boolean"]["output"];
    Bracket: ModelBracket;
    BracketCharacter: ModelBracketCharacter;
    BracketPairing: ModelBracketPairing;
    BracketRound: ModelBracketRound;
    Dump: ApiDump;
    EntitySearchResult: ResolversInterfaceTypes<ResolversParentTypes>["EntitySearchResult"];
    Entry: ApiEntry;
    FeaturedTheme: ApiFeaturedTheme;
    Filter: Filter;
    GlobalSearchResult: Omit<
        GlobalSearchResult,
        "anime" | "artists" | "playlists" | "series" | "studios" | "themes"
    > & {
        anime: Array<ResolversParentTypes["Anime"]>;
        artists: Array<ResolversParentTypes["Artist"]>;
        playlists: Array<ResolversParentTypes["Playlist"]>;
        series: Array<ResolversParentTypes["Series"]>;
        studios: Array<ResolversParentTypes["Studio"]>;
        themes: Array<ResolversParentTypes["Theme"]>;
    };
    Image: Image;
    Int: Scalars["Int"]["output"];
    Page: ApiPage;
    Performance: ApiPerformance;
    Permission: Permission;
    Playlist: ApiPlaylist;
    PlaylistSearchResult: Omit<PlaylistSearchResult, "data"> & { data: Array<ResolversParentTypes["Playlist"]> };
    PlaylistTrack: ApiPlaylistTrack;
    Query: {};
    Resource: Resource;
    ResourceWithImages: ResolversInterfaceTypes<ResolversParentTypes>["ResourceWithImages"];
    SearchArgs: SearchArgs;
    Season: ApiSeason;
    Series: ApiSeries;
    SeriesSearchResult: Omit<SeriesSearchResult, "data"> & { data: Array<ResolversParentTypes["Series"]> };
    Song: ApiSong;
    String: Scalars["String"]["output"];
    Studio: ApiStudio;
    StudioSearchResult: Omit<StudioSearchResult, "data"> & { data: Array<ResolversParentTypes["Studio"]> };
    Synonym: ApiSynonym;
    Theme: ApiTheme;
    ThemeGroup: ThemeGroup;
    ThemeSearchResult: Omit<ThemeSearchResult, "data"> & { data: Array<ResolversParentTypes["Theme"]> };
    User: ResolversInterfaceTypes<ResolversParentTypes>["User"];
    UserAuth: ApiUser;
    UserPublic: ApiUser;
    UserRole: ApiUserRole;
    UserScopedQuery: {};
    Video: ApiVideo;
    VideoScript: ApiVideoScript;
    Year: ApiYear;
};

export type AnimeResolvers<
    ContextType = any,
    ParentType extends ResolversParentTypes["Anime"] = ResolversParentTypes["Anime"],
> = {
    id?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
    images?: Resolver<Array<ResolversTypes["Image"]>, ParentType, ContextType>;
    media_format?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
    name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
    resources?: Resolver<Array<ResolversTypes["Resource"]>, ParentType, ContextType>;
    season?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
    series?: Resolver<Array<ResolversTypes["Series"]>, ParentType, ContextType>;
    slug?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
    studios?: Resolver<Array<ResolversTypes["Studio"]>, ParentType, ContextType>;
    synonyms?: Resolver<Array<ResolversTypes["Synonym"]>, ParentType, ContextType>;
    synopsis?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
    themes?: Resolver<Array<ResolversTypes["Theme"]>, ParentType, ContextType>;
    year?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AnimeSearchResultResolvers<
    ContextType = any,
    ParentType extends ResolversParentTypes["AnimeSearchResult"] = ResolversParentTypes["AnimeSearchResult"],
> = {
    data?: Resolver<Array<ResolversTypes["Anime"]>, ParentType, ContextType>;
    nextPage?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AnnouncementResolvers<
    ContextType = any,
    ParentType extends ResolversParentTypes["Announcement"] = ResolversParentTypes["Announcement"],
> = {
    content?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
    id?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ArtistResolvers<
    ContextType = any,
    ParentType extends ResolversParentTypes["Artist"] = ResolversParentTypes["Artist"],
> = {
    groups?: Resolver<Array<ResolversTypes["ArtistMembership"]>, ParentType, ContextType>;
    id?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
    images?: Resolver<Array<ResolversTypes["Image"]>, ParentType, ContextType>;
    members?: Resolver<Array<ResolversTypes["ArtistMembership"]>, ParentType, ContextType>;
    name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
    performances?: Resolver<Array<ResolversTypes["Performance"]>, ParentType, ContextType>;
    resources?: Resolver<Array<ResolversTypes["Resource"]>, ParentType, ContextType>;
    slug?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ArtistMembershipResolvers<
    ContextType = any,
    ParentType extends ResolversParentTypes["ArtistMembership"] = ResolversParentTypes["ArtistMembership"],
> = {
    as?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
    group?: Resolver<ResolversTypes["Artist"], ParentType, ContextType>;
    member?: Resolver<ResolversTypes["Artist"], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ArtistSearchResultResolvers<
    ContextType = any,
    ParentType extends ResolversParentTypes["ArtistSearchResult"] = ResolversParentTypes["ArtistSearchResult"],
> = {
    data?: Resolver<Array<ResolversTypes["Artist"]>, ParentType, ContextType>;
    nextPage?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AudioResolvers<
    ContextType = any,
    ParentType extends ResolversParentTypes["Audio"] = ResolversParentTypes["Audio"],
> = {
    basename?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
    filename?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
    id?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
    link?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
    mimetype?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
    path?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
    size?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
    videos?: Resolver<Array<ResolversTypes["Video"]>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BracketResolvers<
    ContextType = any,
    ParentType extends ResolversParentTypes["Bracket"] = ResolversParentTypes["Bracket"],
> = {
    currentGroup?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
    currentRound?: Resolver<Maybe<ResolversTypes["BracketRound"]>, ParentType, ContextType>;
    name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
    rounds?: Resolver<Array<ResolversTypes["BracketRound"]>, ParentType, ContextType>;
    slug?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BracketCharacterResolvers<
    ContextType = any,
    ParentType extends ResolversParentTypes["BracketCharacter"] = ResolversParentTypes["BracketCharacter"],
> = {
    id?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
    image?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
    name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
    pairing?: Resolver<Maybe<ResolversTypes["BracketPairing"]>, ParentType, ContextType>;
    seed?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
    source?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
    theme?: Resolver<Maybe<ResolversTypes["Theme"]>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BracketPairingResolvers<
    ContextType = any,
    ParentType extends ResolversParentTypes["BracketPairing"] = ResolversParentTypes["BracketPairing"],
> = {
    characterA?: Resolver<ResolversTypes["BracketCharacter"], ParentType, ContextType>;
    characterB?: Resolver<ResolversTypes["BracketCharacter"], ParentType, ContextType>;
    group?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
    order?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
    round?: Resolver<Maybe<ResolversTypes["BracketRound"]>, ParentType, ContextType>;
    votesA?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
    votesB?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BracketRoundResolvers<
    ContextType = any,
    ParentType extends ResolversParentTypes["BracketRound"] = ResolversParentTypes["BracketRound"],
> = {
    bracket?: Resolver<Maybe<ResolversTypes["Bracket"]>, ParentType, ContextType>;
    name?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
    pairings?: Resolver<Array<ResolversTypes["BracketPairing"]>, ParentType, ContextType>;
    tier?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DumpResolvers<
    ContextType = any,
    ParentType extends ResolversParentTypes["Dump"] = ResolversParentTypes["Dump"],
> = {
    created_at?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
    id?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
    link?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
    path?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type EntitySearchResultResolvers<
    ContextType = any,
    ParentType extends ResolversParentTypes["EntitySearchResult"] = ResolversParentTypes["EntitySearchResult"],
> = {
    __resolveType: TypeResolveFn<
        | "AnimeSearchResult"
        | "ArtistSearchResult"
        | "PlaylistSearchResult"
        | "SeriesSearchResult"
        | "StudioSearchResult"
        | "ThemeSearchResult",
        ParentType,
        ContextType
    >;
    nextPage?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
};

export type EntryResolvers<
    ContextType = any,
    ParentType extends ResolversParentTypes["Entry"] = ResolversParentTypes["Entry"],
> = {
    episodes?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
    id?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
    nsfw?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
    spoiler?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
    theme?: Resolver<ResolversTypes["Theme"], ParentType, ContextType>;
    version?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
    videos?: Resolver<Array<ResolversTypes["Video"]>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FeaturedThemeResolvers<
    ContextType = any,
    ParentType extends ResolversParentTypes["FeaturedTheme"] = ResolversParentTypes["FeaturedTheme"],
> = {
    end_at?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
    entry?: Resolver<Maybe<ResolversTypes["Entry"]>, ParentType, ContextType>;
    id?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
    start_at?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
    video?: Resolver<Maybe<ResolversTypes["Video"]>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GlobalSearchResultResolvers<
    ContextType = any,
    ParentType extends ResolversParentTypes["GlobalSearchResult"] = ResolversParentTypes["GlobalSearchResult"],
> = {
    anime?: Resolver<Array<ResolversTypes["Anime"]>, ParentType, ContextType>;
    artists?: Resolver<Array<ResolversTypes["Artist"]>, ParentType, ContextType>;
    playlists?: Resolver<Array<ResolversTypes["Playlist"]>, ParentType, ContextType>;
    series?: Resolver<Array<ResolversTypes["Series"]>, ParentType, ContextType>;
    studios?: Resolver<Array<ResolversTypes["Studio"]>, ParentType, ContextType>;
    themes?: Resolver<Array<ResolversTypes["Theme"]>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ImageResolvers<
    ContextType = any,
    ParentType extends ResolversParentTypes["Image"] = ResolversParentTypes["Image"],
> = {
    facet?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
    id?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
    link?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
    mimetype?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
    path?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
    size?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PageResolvers<
    ContextType = any,
    ParentType extends ResolversParentTypes["Page"] = ResolversParentTypes["Page"],
> = {
    body?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
    created_at?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
    id?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
    name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
    slug?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PerformanceResolvers<
    ContextType = any,
    ParentType extends ResolversParentTypes["Performance"] = ResolversParentTypes["Performance"],
> = {
    artist?: Resolver<ResolversTypes["Artist"], ParentType, ContextType>;
    as?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
    song?: Resolver<ResolversTypes["Song"], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PermissionResolvers<
    ContextType = any,
    ParentType extends ResolversParentTypes["Permission"] = ResolversParentTypes["Permission"],
> = {
    id?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
    name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PlaylistResolvers<
    ContextType = any,
    ParentType extends ResolversParentTypes["Playlist"] = ResolversParentTypes["Playlist"],
> = {
    description?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
    forward?: Resolver<Array<ResolversTypes["PlaylistTrack"]>, ParentType, ContextType>;
    id?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
    name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
    tracks?: Resolver<Array<ResolversTypes["PlaylistTrack"]>, ParentType, ContextType>;
    tracks_count?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
    user?: Resolver<ResolversTypes["UserPublic"], ParentType, ContextType>;
    visibility?: Resolver<ResolversTypes["PlaylistVisibility"], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PlaylistSearchResultResolvers<
    ContextType = any,
    ParentType extends ResolversParentTypes["PlaylistSearchResult"] = ResolversParentTypes["PlaylistSearchResult"],
> = {
    data?: Resolver<Array<ResolversTypes["Playlist"]>, ParentType, ContextType>;
    nextPage?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PlaylistTrackResolvers<
    ContextType = any,
    ParentType extends ResolversParentTypes["PlaylistTrack"] = ResolversParentTypes["PlaylistTrack"],
> = {
    id?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
    next?: Resolver<Maybe<ResolversTypes["PlaylistTrack"]>, ParentType, ContextType>;
    playlist?: Resolver<ResolversTypes["Playlist"], ParentType, ContextType>;
    previous?: Resolver<Maybe<ResolversTypes["PlaylistTrack"]>, ParentType, ContextType>;
    video?: Resolver<ResolversTypes["Video"], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<
    ContextType = any,
    ParentType extends ResolversParentTypes["Query"] = ResolversParentTypes["Query"],
> = {
    anime?: Resolver<Maybe<ResolversTypes["Anime"]>, ParentType, ContextType, Partial<QueryAnimeArgs>>;
    animeAll?: Resolver<Array<ResolversTypes["Anime"]>, ParentType, ContextType, Partial<QueryAnimeAllArgs>>;
    announcementAll?: Resolver<Array<ResolversTypes["Announcement"]>, ParentType, ContextType>;
    artist?: Resolver<Maybe<ResolversTypes["Artist"]>, ParentType, ContextType, Partial<QueryArtistArgs>>;
    artistAll?: Resolver<Array<ResolversTypes["Artist"]>, ParentType, ContextType, Partial<QueryArtistAllArgs>>;
    bracket?: Resolver<
        Maybe<ResolversTypes["Bracket"]>,
        ParentType,
        ContextType,
        RequireFields<QueryBracketArgs, "slug">
    >;
    bracketAll?: Resolver<Array<ResolversTypes["Bracket"]>, ParentType, ContextType>;
    dumpAll?: Resolver<Array<ResolversTypes["Dump"]>, ParentType, ContextType>;
    featuredTheme?: Resolver<Maybe<ResolversTypes["FeaturedTheme"]>, ParentType, ContextType>;
    imageAll?: Resolver<Array<ResolversTypes["Image"]>, ParentType, ContextType, Partial<QueryImageAllArgs>>;
    me?: Resolver<ResolversTypes["UserScopedQuery"], ParentType, ContextType>;
    page?: Resolver<Maybe<ResolversTypes["Page"]>, ParentType, ContextType, Partial<QueryPageArgs>>;
    pageAll?: Resolver<Array<ResolversTypes["Page"]>, ParentType, ContextType>;
    playlist?: Resolver<
        Maybe<ResolversTypes["Playlist"]>,
        ParentType,
        ContextType,
        RequireFields<QueryPlaylistArgs, "id">
    >;
    playlistAll?: Resolver<Array<ResolversTypes["Playlist"]>, ParentType, ContextType, Partial<QueryPlaylistAllArgs>>;
    search?: Resolver<
        ResolversTypes["GlobalSearchResult"],
        ParentType,
        ContextType,
        RequireFields<QuerySearchArgs, "args">
    >;
    searchAnime?: Resolver<
        ResolversTypes["AnimeSearchResult"],
        ParentType,
        ContextType,
        RequireFields<QuerySearchAnimeArgs, "args">
    >;
    searchArtist?: Resolver<
        ResolversTypes["ArtistSearchResult"],
        ParentType,
        ContextType,
        RequireFields<QuerySearchArtistArgs, "args">
    >;
    searchPlaylist?: Resolver<
        ResolversTypes["PlaylistSearchResult"],
        ParentType,
        ContextType,
        RequireFields<QuerySearchPlaylistArgs, "args">
    >;
    searchSeries?: Resolver<
        ResolversTypes["SeriesSearchResult"],
        ParentType,
        ContextType,
        RequireFields<QuerySearchSeriesArgs, "args">
    >;
    searchStudio?: Resolver<
        ResolversTypes["StudioSearchResult"],
        ParentType,
        ContextType,
        RequireFields<QuerySearchStudioArgs, "args">
    >;
    searchTheme?: Resolver<
        ResolversTypes["ThemeSearchResult"],
        ParentType,
        ContextType,
        RequireFields<QuerySearchThemeArgs, "args">
    >;
    season?: Resolver<
        Maybe<ResolversTypes["Season"]>,
        ParentType,
        ContextType,
        RequireFields<QuerySeasonArgs, "value" | "year">
    >;
    series?: Resolver<Maybe<ResolversTypes["Series"]>, ParentType, ContextType, Partial<QuerySeriesArgs>>;
    seriesAll?: Resolver<Array<ResolversTypes["Series"]>, ParentType, ContextType, Partial<QuerySeriesAllArgs>>;
    studio?: Resolver<Maybe<ResolversTypes["Studio"]>, ParentType, ContextType, Partial<QueryStudioArgs>>;
    studioAll?: Resolver<Array<ResolversTypes["Studio"]>, ParentType, ContextType, Partial<QueryStudioAllArgs>>;
    theme?: Resolver<Maybe<ResolversTypes["Theme"]>, ParentType, ContextType, Partial<QueryThemeArgs>>;
    themeAll?: Resolver<Array<ResolversTypes["Theme"]>, ParentType, ContextType, Partial<QueryThemeAllArgs>>;
    videoAll?: Resolver<Array<ResolversTypes["Video"]>, ParentType, ContextType, Partial<QueryVideoAllArgs>>;
    year?: Resolver<Maybe<ResolversTypes["Year"]>, ParentType, ContextType, RequireFields<QueryYearArgs, "value">>;
    yearAll?: Resolver<Array<ResolversTypes["Year"]>, ParentType, ContextType>;
};

export type ResourceResolvers<
    ContextType = any,
    ParentType extends ResolversParentTypes["Resource"] = ResolversParentTypes["Resource"],
> = {
    as?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
    external_id?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
    id?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
    link?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
    site?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ResourceWithImagesResolvers<
    ContextType = any,
    ParentType extends ResolversParentTypes["ResourceWithImages"] = ResolversParentTypes["ResourceWithImages"],
> = {
    __resolveType: TypeResolveFn<"Anime" | "Artist" | "Studio", ParentType, ContextType>;
    images?: Resolver<Array<ResolversTypes["Image"]>, ParentType, ContextType>;
};

export type SeasonResolvers<
    ContextType = any,
    ParentType extends ResolversParentTypes["Season"] = ResolversParentTypes["Season"],
> = {
    anime?: Resolver<Array<ResolversTypes["Anime"]>, ParentType, ContextType>;
    value?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
    year?: Resolver<Maybe<ResolversTypes["Year"]>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SeriesResolvers<
    ContextType = any,
    ParentType extends ResolversParentTypes["Series"] = ResolversParentTypes["Series"],
> = {
    anime?: Resolver<Array<ResolversTypes["Anime"]>, ParentType, ContextType>;
    id?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
    name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
    slug?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SeriesSearchResultResolvers<
    ContextType = any,
    ParentType extends ResolversParentTypes["SeriesSearchResult"] = ResolversParentTypes["SeriesSearchResult"],
> = {
    data?: Resolver<Array<ResolversTypes["Series"]>, ParentType, ContextType>;
    nextPage?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SongResolvers<
    ContextType = any,
    ParentType extends ResolversParentTypes["Song"] = ResolversParentTypes["Song"],
> = {
    id?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
    performances?: Resolver<Array<ResolversTypes["Performance"]>, ParentType, ContextType>;
    themes?: Resolver<Array<ResolversTypes["Theme"]>, ParentType, ContextType>;
    title?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type StudioResolvers<
    ContextType = any,
    ParentType extends ResolversParentTypes["Studio"] = ResolversParentTypes["Studio"],
> = {
    anime?: Resolver<Array<ResolversTypes["Anime"]>, ParentType, ContextType>;
    id?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
    images?: Resolver<Array<ResolversTypes["Image"]>, ParentType, ContextType>;
    name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
    resources?: Resolver<Array<ResolversTypes["Resource"]>, ParentType, ContextType>;
    slug?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type StudioSearchResultResolvers<
    ContextType = any,
    ParentType extends ResolversParentTypes["StudioSearchResult"] = ResolversParentTypes["StudioSearchResult"],
> = {
    data?: Resolver<Array<ResolversTypes["Studio"]>, ParentType, ContextType>;
    nextPage?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SynonymResolvers<
    ContextType = any,
    ParentType extends ResolversParentTypes["Synonym"] = ResolversParentTypes["Synonym"],
> = {
    anime?: Resolver<Maybe<ResolversTypes["Anime"]>, ParentType, ContextType>;
    id?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
    text?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ThemeResolvers<
    ContextType = any,
    ParentType extends ResolversParentTypes["Theme"] = ResolversParentTypes["Theme"],
> = {
    anime?: Resolver<ResolversTypes["Anime"], ParentType, ContextType>;
    entries?: Resolver<Array<ResolversTypes["Entry"]>, ParentType, ContextType>;
    group?: Resolver<Maybe<ResolversTypes["ThemeGroup"]>, ParentType, ContextType>;
    id?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
    sequence?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
    song?: Resolver<Maybe<ResolversTypes["Song"]>, ParentType, ContextType>;
    type?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ThemeGroupResolvers<
    ContextType = any,
    ParentType extends ResolversParentTypes["ThemeGroup"] = ResolversParentTypes["ThemeGroup"],
> = {
    id?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
    name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
    slug?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ThemeSearchResultResolvers<
    ContextType = any,
    ParentType extends ResolversParentTypes["ThemeSearchResult"] = ResolversParentTypes["ThemeSearchResult"],
> = {
    data?: Resolver<Array<ResolversTypes["Theme"]>, ParentType, ContextType>;
    nextPage?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<
    ContextType = any,
    ParentType extends ResolversParentTypes["User"] = ResolversParentTypes["User"],
> = {
    __resolveType: TypeResolveFn<"UserAuth" | "UserPublic", ParentType, ContextType>;
    id?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
    name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
};

export type UserAuthResolvers<
    ContextType = any,
    ParentType extends ResolversParentTypes["UserAuth"] = ResolversParentTypes["UserAuth"],
> = {
    created_at?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
    email?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
    email_verified_at?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
    id?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
    name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
    permissions?: Resolver<Array<ResolversTypes["Permission"]>, ParentType, ContextType>;
    roles?: Resolver<Array<ResolversTypes["UserRole"]>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserPublicResolvers<
    ContextType = any,
    ParentType extends ResolversParentTypes["UserPublic"] = ResolversParentTypes["UserPublic"],
> = {
    id?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
    name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserRoleResolvers<
    ContextType = any,
    ParentType extends ResolversParentTypes["UserRole"] = ResolversParentTypes["UserRole"],
> = {
    color?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
    default?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
    name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
    permissions?: Resolver<Array<ResolversTypes["Permission"]>, ParentType, ContextType>;
    priority?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserScopedQueryResolvers<
    ContextType = any,
    ParentType extends ResolversParentTypes["UserScopedQuery"] = ResolversParentTypes["UserScopedQuery"],
> = {
    playlistAll?: Resolver<
        Maybe<Array<ResolversTypes["Playlist"]>>,
        ParentType,
        ContextType,
        Partial<UserScopedQueryPlaylistAllArgs>
    >;
    user?: Resolver<Maybe<ResolversTypes["UserAuth"]>, ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type VideoResolvers<
    ContextType = any,
    ParentType extends ResolversParentTypes["Video"] = ResolversParentTypes["Video"],
> = {
    audio?: Resolver<ResolversTypes["Audio"], ParentType, ContextType>;
    basename?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
    entries?: Resolver<Array<ResolversTypes["Entry"]>, ParentType, ContextType>;
    filename?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
    id?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
    link?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
    lyrics?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
    mimetype?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
    nc?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
    overlap?: Resolver<ResolversTypes["VideoOverlap"], ParentType, ContextType>;
    path?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
    resolution?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
    script?: Resolver<Maybe<ResolversTypes["VideoScript"]>, ParentType, ContextType>;
    size?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
    source?: Resolver<Maybe<ResolversTypes["VideoSource"]>, ParentType, ContextType>;
    subbed?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
    tags?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
    tracks?: Resolver<Array<ResolversTypes["PlaylistTrack"]>, ParentType, ContextType>;
    uncen?: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type VideoOverlapResolvers = EnumResolverSignature<
    { NONE?: any; OVER?: any; TRANSITION?: any },
    ResolversTypes["VideoOverlap"]
>;

export type VideoScriptResolvers<
    ContextType = any,
    ParentType extends ResolversParentTypes["VideoScript"] = ResolversParentTypes["VideoScript"],
> = {
    id?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
    link?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
    path?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type YearResolvers<
    ContextType = any,
    ParentType extends ResolversParentTypes["Year"] = ResolversParentTypes["Year"],
> = {
    seasons?: Resolver<Array<ResolversTypes["Season"]>, ParentType, ContextType>;
    value?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
    Anime?: AnimeResolvers<ContextType>;
    AnimeSearchResult?: AnimeSearchResultResolvers<ContextType>;
    Announcement?: AnnouncementResolvers<ContextType>;
    Artist?: ArtistResolvers<ContextType>;
    ArtistMembership?: ArtistMembershipResolvers<ContextType>;
    ArtistSearchResult?: ArtistSearchResultResolvers<ContextType>;
    Audio?: AudioResolvers<ContextType>;
    Bracket?: BracketResolvers<ContextType>;
    BracketCharacter?: BracketCharacterResolvers<ContextType>;
    BracketPairing?: BracketPairingResolvers<ContextType>;
    BracketRound?: BracketRoundResolvers<ContextType>;
    Dump?: DumpResolvers<ContextType>;
    EntitySearchResult?: EntitySearchResultResolvers<ContextType>;
    Entry?: EntryResolvers<ContextType>;
    FeaturedTheme?: FeaturedThemeResolvers<ContextType>;
    GlobalSearchResult?: GlobalSearchResultResolvers<ContextType>;
    Image?: ImageResolvers<ContextType>;
    Page?: PageResolvers<ContextType>;
    Performance?: PerformanceResolvers<ContextType>;
    Permission?: PermissionResolvers<ContextType>;
    Playlist?: PlaylistResolvers<ContextType>;
    PlaylistSearchResult?: PlaylistSearchResultResolvers<ContextType>;
    PlaylistTrack?: PlaylistTrackResolvers<ContextType>;
    Query?: QueryResolvers<ContextType>;
    Resource?: ResourceResolvers<ContextType>;
    ResourceWithImages?: ResourceWithImagesResolvers<ContextType>;
    Season?: SeasonResolvers<ContextType>;
    Series?: SeriesResolvers<ContextType>;
    SeriesSearchResult?: SeriesSearchResultResolvers<ContextType>;
    Song?: SongResolvers<ContextType>;
    Studio?: StudioResolvers<ContextType>;
    StudioSearchResult?: StudioSearchResultResolvers<ContextType>;
    Synonym?: SynonymResolvers<ContextType>;
    Theme?: ThemeResolvers<ContextType>;
    ThemeGroup?: ThemeGroupResolvers<ContextType>;
    ThemeSearchResult?: ThemeSearchResultResolvers<ContextType>;
    User?: UserResolvers<ContextType>;
    UserAuth?: UserAuthResolvers<ContextType>;
    UserPublic?: UserPublicResolvers<ContextType>;
    UserRole?: UserRoleResolvers<ContextType>;
    UserScopedQuery?: UserScopedQueryResolvers<ContextType>;
    Video?: VideoResolvers<ContextType>;
    VideoOverlap?: VideoOverlapResolvers;
    VideoScript?: VideoScriptResolvers<ContextType>;
    Year?: YearResolvers<ContextType>;
};
