export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
    ID: { input: string; output: string };
    String: { input: string; output: string };
    Boolean: { input: boolean; output: boolean };
    Int: { input: number; output: number };
    Float: { input: number; output: number };
};

export type Anime = ResourceWithImages & {
    id: Scalars["Int"]["output"];
    images: Array<Image>;
    media_format: Maybe<Scalars["String"]["output"]>;
    name: Scalars["String"]["output"];
    resources: Array<Resource>;
    season: Maybe<Scalars["String"]["output"]>;
    series: Array<Series>;
    slug: Scalars["String"]["output"];
    studios: Array<Studio>;
    synonyms: Array<Synonym>;
    synopsis: Maybe<Scalars["String"]["output"]>;
    themes: Array<Theme>;
    year: Maybe<Scalars["Int"]["output"]>;
};

export type AnimeSearchResult = EntitySearchResult & {
    data: Array<Anime>;
    nextPage: Maybe<Scalars["Int"]["output"]>;
};

export type Announcement = {
    content: Scalars["String"]["output"];
    id: Maybe<Scalars["Int"]["output"]>;
};

export type Artist = ResourceWithImages & {
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
    alias: Maybe<Scalars["String"]["output"]>;
    as: Maybe<Scalars["String"]["output"]>;
    group: Artist;
    member: Artist;
};

export type ArtistSearchResult = EntitySearchResult & {
    data: Array<Artist>;
    nextPage: Maybe<Scalars["Int"]["output"]>;
};

export type Audio = {
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
    currentGroup: Maybe<Scalars["Int"]["output"]>;
    currentRound: Maybe<BracketRound>;
    name: Scalars["String"]["output"];
    rounds: Array<BracketRound>;
    slug: Scalars["String"]["output"];
};

export type BracketCharacter = {
    id: Scalars["Int"]["output"];
    image: Scalars["String"]["output"];
    name: Scalars["String"]["output"];
    pairing: Maybe<BracketPairing>;
    seed: Scalars["Int"]["output"];
    source: Scalars["String"]["output"];
    theme: Maybe<Theme>;
};

export type BracketPairing = {
    characterA: BracketCharacter;
    characterB: BracketCharacter;
    group: Scalars["Int"]["output"];
    order: Scalars["Int"]["output"];
    round: Maybe<BracketRound>;
    votesA: Maybe<Scalars["Int"]["output"]>;
    votesB: Maybe<Scalars["Int"]["output"]>;
};

export type BracketRound = {
    bracket: Maybe<Bracket>;
    name: Maybe<Scalars["String"]["output"]>;
    pairings: Array<BracketPairing>;
    tier: Scalars["Int"]["output"];
};

export type Dump = {
    created_at: Scalars["String"]["output"];
    id: Scalars["Int"]["output"];
    link: Scalars["String"]["output"];
    path: Scalars["String"]["output"];
};

export type EntitySearchResult = {
    nextPage: Maybe<Scalars["Int"]["output"]>;
};

export type Entry = {
    episodes: Maybe<Scalars["String"]["output"]>;
    id: Scalars["Int"]["output"];
    nsfw: Scalars["Boolean"]["output"];
    spoiler: Scalars["Boolean"]["output"];
    theme: Theme;
    version: Maybe<Scalars["Int"]["output"]>;
    videos: Array<Video>;
};

export type FeaturedTheme = {
    end_at: Scalars["String"]["output"];
    entry: Maybe<Entry>;
    id: Scalars["Int"]["output"];
    start_at: Scalars["String"]["output"];
    video: Maybe<Video>;
};

export type Filter = {
    key: Scalars["String"]["input"];
    value?: InputMaybe<Scalars["String"]["input"]>;
};

export type GlobalSearchResult = {
    anime: Array<Anime>;
    artists: Array<Artist>;
    playlists: Array<Playlist>;
    series: Array<Series>;
    studios: Array<Studio>;
    themes: Array<Theme>;
};

export type Image = {
    facet: Maybe<Scalars["String"]["output"]>;
    id: Scalars["Int"]["output"];
    link: Scalars["String"]["output"];
    mimetype: Scalars["String"]["output"];
    path: Scalars["String"]["output"];
    size: Scalars["Int"]["output"];
};

export type Page = {
    body: Scalars["String"]["output"];
    created_at: Scalars["String"]["output"];
    id: Maybe<Scalars["Int"]["output"]>;
    name: Scalars["String"]["output"];
    slug: Scalars["String"]["output"];
};

export type Performance = {
    alias: Maybe<Scalars["String"]["output"]>;
    artist: Artist;
    as: Maybe<Scalars["String"]["output"]>;
    song: Song;
};

export type Permission = {
    id: Scalars["Int"]["output"];
    name: Scalars["String"]["output"];
};

export type Playlist = {
    description: Maybe<Scalars["String"]["output"]>;
    forward: Array<PlaylistTrack>;
    id: Scalars["String"]["output"];
    name: Scalars["String"]["output"];
    tracks: Array<PlaylistTrack>;
    tracks_count: Scalars["Int"]["output"];
    user: UserPublic;
    visibility: PlaylistVisibility;
};

export type PlaylistSearchResult = EntitySearchResult & {
    data: Array<Playlist>;
    nextPage: Maybe<Scalars["Int"]["output"]>;
};

export type PlaylistTrack = {
    entry: Entry;
    id: Scalars["String"]["output"];
    next: Maybe<PlaylistTrack>;
    playlist: Playlist;
    previous: Maybe<PlaylistTrack>;
    video: Video;
};

export type PlaylistVisibility = "Private" | "Public" | "Unlisted";

export type Query = {
    anime: Maybe<Anime>;
    animeAll: Array<Anime>;
    announcementAll: Array<Announcement>;
    artist: Maybe<Artist>;
    artistAll: Array<Artist>;
    bracket: Maybe<Bracket>;
    bracketAll: Array<Bracket>;
    dumpAll: Array<Dump>;
    featuredTheme: Maybe<FeaturedTheme>;
    imageAll: Array<Image>;
    me: UserScopedQuery;
    page: Maybe<Page>;
    pageAll: Array<Page>;
    playlist: Maybe<Playlist>;
    playlistAll: Array<Playlist>;
    search: GlobalSearchResult;
    searchAnime: AnimeSearchResult;
    searchArtist: ArtistSearchResult;
    searchPlaylist: PlaylistSearchResult;
    searchSeries: SeriesSearchResult;
    searchStudio: StudioSearchResult;
    searchTheme: ThemeSearchResult;
    season: Maybe<Season>;
    series: Maybe<Series>;
    seriesAll: Array<Series>;
    studio: Maybe<Studio>;
    studioAll: Array<Studio>;
    theme: Maybe<Theme>;
    themeAll: Array<Theme>;
    videoAll: Array<Video>;
    year: Maybe<Year>;
    yearAll: Array<Year>;
};

export type QueryAnimeArgs = {
    id: InputMaybe<Scalars["Int"]["input"]>;
    slug: InputMaybe<Scalars["String"]["input"]>;
};

export type QueryAnimeAllArgs = {
    limit: InputMaybe<Scalars["Int"]["input"]>;
    season: InputMaybe<Scalars["String"]["input"]>;
    year: InputMaybe<Scalars["Int"]["input"]>;
};

export type QueryArtistArgs = {
    id: InputMaybe<Scalars["Int"]["input"]>;
    slug: InputMaybe<Scalars["String"]["input"]>;
};

export type QueryArtistAllArgs = {
    limit: InputMaybe<Scalars["Int"]["input"]>;
};

export type QueryBracketArgs = {
    slug: Scalars["String"]["input"];
};

export type QueryImageAllArgs = {
    facet: InputMaybe<Scalars["String"]["input"]>;
    limit: InputMaybe<Scalars["Int"]["input"]>;
};

export type QueryPageArgs = {
    id: InputMaybe<Scalars["Int"]["input"]>;
    slug: InputMaybe<Scalars["String"]["input"]>;
};

export type QueryPlaylistArgs = {
    id: Scalars["String"]["input"];
};

export type QueryPlaylistAllArgs = {
    limit: InputMaybe<Scalars["Int"]["input"]>;
    onlyNonEmpty: InputMaybe<Scalars["Boolean"]["input"]>;
    orderBy: InputMaybe<Scalars["String"]["input"]>;
    orderDesc: InputMaybe<Scalars["Boolean"]["input"]>;
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
    id: InputMaybe<Scalars["Int"]["input"]>;
    slug: InputMaybe<Scalars["String"]["input"]>;
};

export type QuerySeriesAllArgs = {
    limit: InputMaybe<Scalars["Int"]["input"]>;
};

export type QueryStudioArgs = {
    id: InputMaybe<Scalars["Int"]["input"]>;
    slug: InputMaybe<Scalars["String"]["input"]>;
};

export type QueryStudioAllArgs = {
    limit: InputMaybe<Scalars["Int"]["input"]>;
};

export type QueryThemeArgs = {
    id: InputMaybe<Scalars["Int"]["input"]>;
};

export type QueryThemeAllArgs = {
    has: InputMaybe<Scalars["String"]["input"]>;
    limit: InputMaybe<Scalars["Int"]["input"]>;
    orderBy: InputMaybe<Scalars["String"]["input"]>;
    orderDesc: InputMaybe<Scalars["Boolean"]["input"]>;
};

export type QueryVideoAllArgs = {
    limit: InputMaybe<Scalars["Int"]["input"]>;
    orderBy: InputMaybe<Scalars["String"]["input"]>;
    orderDesc: InputMaybe<Scalars["Boolean"]["input"]>;
};

export type QueryYearArgs = {
    value: Scalars["Int"]["input"];
};

export type Resource = {
    as: Maybe<Scalars["String"]["output"]>;
    external_id: Maybe<Scalars["Int"]["output"]>;
    id: Scalars["Int"]["output"];
    link: Maybe<Scalars["String"]["output"]>;
    site: Maybe<Scalars["String"]["output"]>;
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
    anime: Array<Anime>;
    value: Scalars["String"]["output"];
    year: Maybe<Year>;
};

export type Series = {
    anime: Array<Anime>;
    id: Scalars["Int"]["output"];
    name: Scalars["String"]["output"];
    slug: Scalars["String"]["output"];
};

export type SeriesSearchResult = EntitySearchResult & {
    data: Array<Series>;
    nextPage: Maybe<Scalars["Int"]["output"]>;
};

export type Song = {
    id: Maybe<Scalars["Int"]["output"]>;
    performances: Array<Performance>;
    themes: Array<Theme>;
    title: Maybe<Scalars["String"]["output"]>;
};

export type Studio = ResourceWithImages & {
    anime: Array<Anime>;
    id: Scalars["Int"]["output"];
    images: Array<Image>;
    name: Scalars["String"]["output"];
    resources: Array<Resource>;
    slug: Scalars["String"]["output"];
};

export type StudioSearchResult = EntitySearchResult & {
    data: Array<Studio>;
    nextPage: Maybe<Scalars["Int"]["output"]>;
};

export type Synonym = {
    anime: Maybe<Anime>;
    id: Scalars["Int"]["output"];
    text: Maybe<Scalars["String"]["output"]>;
};

export type Theme = {
    anime: Anime;
    entries: Array<Entry>;
    group: Maybe<ThemeGroup>;
    id: Scalars["Int"]["output"];
    sequence: Maybe<Scalars["Int"]["output"]>;
    song: Maybe<Song>;
    type: Scalars["String"]["output"];
};

export type ThemeGroup = {
    id: Scalars["Int"]["output"];
    name: Scalars["String"]["output"];
    slug: Scalars["String"]["output"];
};

export type ThemeSearchResult = EntitySearchResult & {
    data: Array<Theme>;
    nextPage: Maybe<Scalars["Int"]["output"]>;
};

export type User = {
    id: Scalars["Int"]["output"];
    name: Scalars["String"]["output"];
};

export type UserAuth = User & {
    created_at: Scalars["String"]["output"];
    email: Scalars["String"]["output"];
    email_verified_at: Maybe<Scalars["String"]["output"]>;
    id: Scalars["Int"]["output"];
    name: Scalars["String"]["output"];
    permissions: Array<Permission>;
    roles: Array<UserRole>;
};

export type UserPublic = User & {
    id: Scalars["Int"]["output"];
    name: Scalars["String"]["output"];
};

export type UserRole = {
    color: Maybe<Scalars["String"]["output"]>;
    default: Scalars["Boolean"]["output"];
    name: Scalars["String"]["output"];
    permissions: Array<Permission>;
    priority: Maybe<Scalars["Int"]["output"]>;
};

export type UserScopedQuery = {
    playlistAll: Maybe<Array<Playlist>>;
    user: Maybe<UserAuth>;
};

export type UserScopedQueryPlaylistAllArgs = {
    filterVideoId: InputMaybe<Scalars["Int"]["input"]>;
    limit: InputMaybe<Scalars["Int"]["input"]>;
};

export type Video = {
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
    resolution: Maybe<Scalars["Int"]["output"]>;
    script: Maybe<VideoScript>;
    size: Scalars["Int"]["output"];
    source: Maybe<VideoSource>;
    subbed: Scalars["Boolean"]["output"];
    tags: Scalars["String"]["output"];
    tracks: Array<PlaylistTrack>;
    uncen: Scalars["Boolean"]["output"];
};

export type VideoOverlap = "NONE" | "OVER" | "TRANSITION";

export type VideoScript = {
    id: Scalars["Int"]["output"];
    link: Scalars["String"]["output"];
    path: Scalars["String"]["output"];
};

export type VideoSource = "BD" | "DVD" | "LD" | "RAW" | "VHS" | "WEB";

export type Year = {
    seasons: Array<Season>;
    value: Scalars["Int"]["output"];
};

export type BracketThemeSummaryCardConstestantFragment = {
    name: string;
    source: string;
    image: string;
    theme: {
        type: string;
        sequence: number | null;
        id: number;
        group: { name: string; slug: string } | null;
        anime: { slug: string; name: string; images: Array<{ link: string; facet: string | null }> };
        song: {
            title: string | null;
            performances: Array<{ alias: string | null; as: string | null; artist: { slug: string; name: string } }>;
        } | null;
        entries: Array<{
            id: number;
            version: number | null;
            videos: Array<{ id: number; basename: string; tags: string; audio: { basename: string } }>;
        }>;
    } | null;
};

export type VideoButtonAnimeFragment = { slug: string };

export type VideoButtonThemeFragment = { type: string; sequence: number | null; group: { slug: string } | null };

export type VideoButtonEntryFragment = { version: number | null };

export type VideoButtonVideoFragment = {
    id: number;
    tags: string;
    resolution: number | null;
    nc: boolean;
    subbed: boolean;
    lyrics: boolean;
    uncen: boolean;
    source: VideoSource | null;
    overlap: VideoOverlap;
};

export type AnimeSummaryCardAnimeFragment = {
    slug: string;
    name: string;
    year: number | null;
    season: string | null;
    media_format: string | null;
    themes: Array<{ group: { name: string; slug: string } | null }>;
    images: Array<{ link: string; facet: string | null }>;
};

export type AnimeSummaryCardAnimeExpandableFragment = {
    themes: Array<{
        id: number;
        type: string;
        sequence: number | null;
        group: { name: string; slug: string } | null;
        anime: { slug: string };
        entries: Array<{
            version: number | null;
            episodes: string | null;
            spoiler: boolean;
            nsfw: boolean;
            videos: Array<{
                tags: string;
                resolution: number | null;
                nc: boolean;
                subbed: boolean;
                lyrics: boolean;
                uncen: boolean;
                source: VideoSource | null;
                overlap: VideoOverlap;
            }>;
        }>;
        song: { title: string | null } | null;
    }>;
};

export type ArtistSummaryCardArtistFragment = {
    slug: string;
    name: string;
    images: Array<{ link: string; facet: string | null }>;
};

export type PlaylistSummaryCardPlaylistFragment = {
    id: string;
    name: string;
    visibility: PlaylistVisibility;
    tracks_count: number;
};

export type PlaylistSummaryCardShowOwnerFragment = { user: { name: string } };

export type StudioSummaryCardStudioFragment = {
    slug: string;
    name: string;
    images: Array<{ link: string; facet: string | null }>;
};

export type ThemeDetailCardThemeFragment = {
    type: string;
    sequence: number | null;
    id: number;
    group: { name: string; slug: string } | null;
    anime: { slug: string; name: string; images: Array<{ link: string; facet: string | null }> };
    song: {
        title: string | null;
        performances: Array<{ alias: string | null; as: string | null; artist: { slug: string; name: string } }>;
    } | null;
    entries: Array<{
        version: number | null;
        episodes: string | null;
        spoiler: boolean;
        nsfw: boolean;
        id: number;
        videos: Array<{
            filename: string;
            tags: string;
            id: number;
            basename: string;
            resolution: number | null;
            nc: boolean;
            subbed: boolean;
            lyrics: boolean;
            uncen: boolean;
            source: VideoSource | null;
            overlap: VideoOverlap;
            audio: { basename: string };
        }>;
    }>;
};

export type ThemeSummaryCardThemeFragment = {
    type: string;
    sequence: number | null;
    id: number;
    group: { name: string; slug: string } | null;
    anime: { slug: string; name: string; images: Array<{ link: string; facet: string | null }> };
    song: {
        title: string | null;
        performances: Array<{ alias: string | null; as: string | null; artist: { slug: string; name: string } }>;
    } | null;
    entries: Array<{
        id: number;
        version: number | null;
        videos: Array<{ id: number; basename: string; tags: string; audio: { basename: string } }>;
    }>;
};

export type ThemeSummaryCardArtistFragment = { slug: string };

export type ThemeSummaryCardThemeExpandableFragment = {
    id: number;
    type: string;
    sequence: number | null;
    anime: { slug: string };
    entries: Array<{
        version: number | null;
        episodes: string | null;
        spoiler: boolean;
        nsfw: boolean;
        videos: Array<{
            tags: string;
            resolution: number | null;
            nc: boolean;
            subbed: boolean;
            lyrics: boolean;
            uncen: boolean;
            source: VideoSource | null;
            overlap: VideoOverlap;
        }>;
    }>;
    song: { title: string | null } | null;
    group: { slug: string } | null;
};

export type ThemeSummaryCardQueryVariables = Exact<{
    themeId: Scalars["Int"]["input"];
}>;

export type ThemeSummaryCardQuery = {
    theme: {
        type: string;
        sequence: number | null;
        id: number;
        anime: {
            year: number | null;
            season: string | null;
            slug: string;
            name: string;
            images: Array<{ link: string; facet: string | null }>;
        };
        group: { name: string; slug: string } | null;
        song: {
            title: string | null;
            performances: Array<{ alias: string | null; as: string | null; artist: { slug: string; name: string } }>;
        } | null;
        entries: Array<{
            id: number;
            version: number | null;
            videos: Array<{ id: number; basename: string; tags: string; audio: { basename: string } }>;
        }>;
    } | null;
};

export type VideoSummaryCardVideoFragment = { id: number; basename: string; tags: string; audio: { basename: string } };

export type VideoSummaryCardEntryFragment = {
    id: number;
    version: number | null;
    theme: {
        id: number;
        type: string;
        sequence: number | null;
        group: { name: string; slug: string } | null;
        anime: { slug: string; name: string; images: Array<{ link: string; facet: string | null }> };
        song: {
            title: string | null;
            performances: Array<{ alias: string | null; as: string | null; artist: { slug: string; name: string } }>;
        } | null;
    };
};

export type PlaylistEditDialogPlaylistFragment = { id: string; name: string; visibility: PlaylistVisibility };

export type PlaylistRemoveDialogPlaylistFragment = {
    id: string;
    name: string;
    visibility: PlaylistVisibility;
    tracks_count: number;
};

export type PlaylistTrackAddDialogVideoFragment = {
    id: number;
    basename: string;
    tags: string;
    audio: { basename: string };
};

export type PlaylistTrackAddDialogEntryFragment = {
    id: number;
    version: number | null;
    theme: {
        id: number;
        type: string;
        sequence: number | null;
        group: { name: string; slug: string } | null;
        anime: { slug: string; name: string; images: Array<{ link: string; facet: string | null }> };
        song: {
            title: string | null;
            performances: Array<{ alias: string | null; as: string | null; artist: { slug: string; name: string } }>;
        } | null;
    };
};

export type PlaylistTrackAddFormPlaylistQueryVariables = Exact<{
    filterVideoId: Scalars["Int"]["input"];
}>;

export type PlaylistTrackAddFormPlaylistQuery = {
    me: {
        playlistAll: Array<{ id: string; tracks_count: number; name: string; visibility: PlaylistVisibility }> | null;
        playlistAllFiltered: Array<{ id: string; tracks: Array<{ id: string }> }> | null;
    };
};

export type PlaylistTrackRemoveDialogPlaylistFragment = { id: string; name: string };

export type PlaylistTrackRemoveDialogVideoFragment = {
    id: number;
    basename: string;
    tags: string;
    audio: { basename: string };
};

export type PlaylistTrackRemoveDialogEntryFragment = {
    id: number;
    version: number | null;
    theme: {
        id: number;
        type: string;
        sequence: number | null;
        group: { name: string; slug: string } | null;
        anime: { slug: string; name: string; images: Array<{ link: string; facet: string | null }> };
        song: {
            title: string | null;
            performances: Array<{ alias: string | null; as: string | null; artist: { slug: string; name: string } }>;
        } | null;
    };
};

export type FeaturedThemeThemeFragment = {
    type: string;
    sequence: number | null;
    id: number;
    anime: { slug: string; name: string; images: Array<{ link: string; facet: string | null }> };
    entries: Array<{
        id: number;
        version: number | null;
        videos: Array<{ id: number; basename: string; tags: string; audio: { basename: string } }>;
    }>;
    group: { name: string; slug: string } | null;
    song: {
        title: string | null;
        performances: Array<{ alias: string | null; as: string | null; artist: { slug: string; name: string } }>;
    } | null;
};

export type AnimeThemeFilterThemeFragment = {
    type: string;
    sequence: number | null;
    id: number;
    group: { name: string; slug: string } | null;
    anime: { slug: string; name: string; images: Array<{ link: string; facet: string | null }> };
    song: {
        title: string | null;
        performances: Array<{ alias: string | null; as: string | null; artist: { slug: string; name: string } }>;
    } | null;
    entries: Array<{
        version: number | null;
        episodes: string | null;
        spoiler: boolean;
        nsfw: boolean;
        id: number;
        videos: Array<{
            filename: string;
            tags: string;
            id: number;
            basename: string;
            resolution: number | null;
            nc: boolean;
            subbed: boolean;
            lyrics: boolean;
            uncen: boolean;
            source: VideoSource | null;
            overlap: VideoOverlap;
            audio: { basename: string };
        }>;
    }>;
};

type CoverImageResourceWithImages_Anime_Fragment = { images: Array<{ link: string; facet: string | null }> };

type CoverImageResourceWithImages_Artist_Fragment = { images: Array<{ link: string; facet: string | null }> };

type CoverImageResourceWithImages_Studio_Fragment = { images: Array<{ link: string; facet: string | null }> };

export type CoverImageResourceWithImagesFragment =
    | CoverImageResourceWithImages_Anime_Fragment
    | CoverImageResourceWithImages_Artist_Fragment
    | CoverImageResourceWithImages_Studio_Fragment;

type MultiCoverImageResourceWithImages_Anime_Fragment = {
    name: string;
    images: Array<{ link: string; facet: string | null }>;
};

type MultiCoverImageResourceWithImages_Artist_Fragment = {
    name: string;
    images: Array<{ link: string; facet: string | null }>;
};

type MultiCoverImageResourceWithImages_Studio_Fragment = {
    name: string;
    images: Array<{ link: string; facet: string | null }>;
};

export type MultiCoverImageResourceWithImagesFragment =
    | MultiCoverImageResourceWithImages_Anime_Fragment
    | MultiCoverImageResourceWithImages_Artist_Fragment
    | MultiCoverImageResourceWithImages_Studio_Fragment;

export type ProfileImageUserFragment = { name: string; email: string };

export type StudioCoverImageStudioFragment = {
    images: Array<{ link: string; facet: string | null }>;
    anime: Array<{ name: string; images: Array<{ link: string; facet: string | null }> }>;
};

export type ThemeMenuThemeFragment = {
    id: number;
    type: string;
    sequence: number | null;
    group: { name: string; slug: string } | null;
    anime: { slug: string; name: string; images: Array<{ link: string; facet: string | null }> };
    song: {
        title: string | null;
        performances: Array<{ alias: string | null; as: string | null; artist: { slug: string; name: string } }>;
    } | null;
    entries: Array<{
        id: number;
        version: number | null;
        videos: Array<{ id: number; basename: string; tags: string; audio: { basename: string } }>;
    }>;
};

export type SearchAnimeQueryVariables = Exact<{
    args: SearchArgs;
}>;

export type SearchAnimeQuery = {
    searchAnime: {
        nextPage: number | null;
        data: Array<{
            slug: string;
            name: string;
            year: number | null;
            season: string | null;
            media_format: string | null;
            themes: Array<{
                id: number;
                type: string;
                sequence: number | null;
                group: { name: string; slug: string } | null;
                anime: { slug: string };
                entries: Array<{
                    version: number | null;
                    episodes: string | null;
                    spoiler: boolean;
                    nsfw: boolean;
                    videos: Array<{
                        tags: string;
                        resolution: number | null;
                        nc: boolean;
                        subbed: boolean;
                        lyrics: boolean;
                        uncen: boolean;
                        source: VideoSource | null;
                        overlap: VideoOverlap;
                    }>;
                }>;
                song: { title: string | null } | null;
            }>;
            images: Array<{ link: string; facet: string | null }>;
        }>;
    };
};

export type SearchArtistQueryVariables = Exact<{
    args: SearchArgs;
}>;

export type SearchArtistQuery = {
    searchArtist: {
        nextPage: number | null;
        data: Array<{ slug: string; name: string; images: Array<{ link: string; facet: string | null }> }>;
    };
};

export type SearchGlobalQueryVariables = Exact<{
    args: SearchArgs;
}>;

export type SearchGlobalQuery = {
    search: {
        anime: Array<{
            slug: string;
            name: string;
            year: number | null;
            season: string | null;
            media_format: string | null;
            themes: Array<{
                id: number;
                type: string;
                sequence: number | null;
                group: { name: string; slug: string } | null;
                anime: { slug: string };
                entries: Array<{
                    version: number | null;
                    episodes: string | null;
                    spoiler: boolean;
                    nsfw: boolean;
                    videos: Array<{
                        tags: string;
                        resolution: number | null;
                        nc: boolean;
                        subbed: boolean;
                        lyrics: boolean;
                        uncen: boolean;
                        source: VideoSource | null;
                        overlap: VideoOverlap;
                    }>;
                }>;
                song: { title: string | null } | null;
            }>;
            images: Array<{ link: string; facet: string | null }>;
        }>;
        themes: Array<{
            type: string;
            sequence: number | null;
            id: number;
            group: { name: string; slug: string } | null;
            anime: { slug: string; name: string; images: Array<{ link: string; facet: string | null }> };
            song: {
                title: string | null;
                performances: Array<{
                    alias: string | null;
                    as: string | null;
                    artist: { slug: string; name: string };
                }>;
            } | null;
            entries: Array<{
                id: number;
                version: number | null;
                episodes: string | null;
                spoiler: boolean;
                nsfw: boolean;
                videos: Array<{
                    id: number;
                    basename: string;
                    tags: string;
                    resolution: number | null;
                    nc: boolean;
                    subbed: boolean;
                    lyrics: boolean;
                    uncen: boolean;
                    source: VideoSource | null;
                    overlap: VideoOverlap;
                    audio: { basename: string };
                }>;
            }>;
        }>;
        artists: Array<{ slug: string; name: string; images: Array<{ link: string; facet: string | null }> }>;
        series: Array<{ slug: string; name: string }>;
        studios: Array<{ slug: string; name: string }>;
        playlists: Array<{
            id: string;
            name: string;
            visibility: PlaylistVisibility;
            tracks_count: number;
            user: { name: string };
        }>;
    };
};

export type SearchPlaylistQueryVariables = Exact<{
    args: SearchArgs;
}>;

export type SearchPlaylistQuery = {
    searchPlaylist: {
        nextPage: number | null;
        data: Array<{
            id: string;
            name: string;
            visibility: PlaylistVisibility;
            tracks_count: number;
            user: { name: string };
        }>;
    };
};

export type SearchSeriesQueryVariables = Exact<{
    args: SearchArgs;
}>;

export type SearchSeriesQuery = {
    searchSeries: { nextPage: number | null; data: Array<{ slug: string; name: string }> };
};

export type SearchStudioQueryVariables = Exact<{
    args: SearchArgs;
}>;

export type SearchStudioQuery = {
    searchStudio: {
        nextPage: number | null;
        data: Array<{
            slug: string;
            name: string;
            images: Array<{ link: string; facet: string | null }>;
            anime: Array<{ name: string; images: Array<{ link: string; facet: string | null }> }>;
        }>;
    };
};

export type SearchThemeQueryVariables = Exact<{
    args: SearchArgs;
}>;

export type SearchThemeQuery = {
    searchTheme: {
        nextPage: number | null;
        data: Array<{
            type: string;
            sequence: number | null;
            id: number;
            group: { name: string; slug: string } | null;
            anime: { slug: string; name: string; images: Array<{ link: string; facet: string | null }> };
            song: {
                title: string | null;
                performances: Array<{
                    alias: string | null;
                    as: string | null;
                    artist: { slug: string; name: string };
                }>;
            } | null;
            entries: Array<{
                id: number;
                version: number | null;
                episodes: string | null;
                spoiler: boolean;
                nsfw: boolean;
                videos: Array<{
                    id: number;
                    basename: string;
                    tags: string;
                    resolution: number | null;
                    nc: boolean;
                    subbed: boolean;
                    lyrics: boolean;
                    uncen: boolean;
                    source: VideoSource | null;
                    overlap: VideoOverlap;
                    audio: { basename: string };
                }>;
            }>;
        }>;
    };
};

export type ThemeTableThemeFragment = {
    id: number;
    type: string;
    sequence: number | null;
    anime: { slug: string };
    entries: Array<{
        version: number | null;
        episodes: string | null;
        spoiler: boolean;
        nsfw: boolean;
        videos: Array<{
            tags: string;
            resolution: number | null;
            nc: boolean;
            subbed: boolean;
            lyrics: boolean;
            uncen: boolean;
            source: VideoSource | null;
            overlap: VideoOverlap;
        }>;
    }>;
    song: { title: string | null } | null;
    group: { slug: string } | null;
};

export type ContentWarningTagsEntryFragment = { spoiler: boolean; nsfw: boolean };

export type EpisodeTagEntryFragment = { episodes: string | null };

export type ThemeEntryTagsEntryFragment = { episodes: string | null; spoiler: boolean; nsfw: boolean };

export type VideoTagsVideoFragment = {
    resolution: number | null;
    nc: boolean;
    subbed: boolean;
    lyrics: boolean;
    uncen: boolean;
    source: VideoSource | null;
    overlap: VideoOverlap;
};

export type PlaylistRemoveToastPlaylistFragment = { id: string; name: string };

export type PlaylistTrackAddToastPlaylistFragment = { id: string; name: string };

export type PlaylistTrackAddToastEntryFragment = { theme: { song: { title: string | null } | null } };

export type PlaylistTrackRemoveToastPlaylistFragment = { id: string; name: string };

export type PlaylistTrackRemoveToastEntryFragment = { theme: { song: { title: string | null } | null } };

export type PerformancesSongFragment = {
    performances: Array<{ alias: string | null; as: string | null; artist: { slug: string; name: string } }>;
};

export type PerformancesArtistFragment = { slug: string };

export type SongTitleSongFragment = { title: string | null };

export type SongTitleWithArtistsSongFragment = {
    title: string | null;
    performances: Array<{ alias: string | null; as: string | null; artist: { slug: string; name: string } }>;
};

export type SongTitleWithArtistsArtistFragment = { slug: string };

export type VideoScriptVideoFragment = { script: { link: string } | null };

export type CheckAuthQueryVariables = Exact<{ [key: string]: never }>;

export type CheckAuthQuery = {
    me: {
        user: {
            id: number;
            name: string;
            email: string;
            permissions: Array<{ name: string }>;
            roles: Array<{ permissions: Array<{ name: string }> }>;
        } | null;
    };
};

export type RandomThemeQueryVariables = Exact<{
    args: SearchArgs;
}>;

export type RandomThemeQuery = {
    searchTheme: {
        data: Array<{
            type: string;
            sequence: number | null;
            id: number;
            entries: Array<{
                id: number;
                version: number | null;
                episodes: string | null;
                spoiler: boolean;
                nsfw: boolean;
                videos: Array<{
                    id: number;
                    basename: string;
                    tags: string;
                    resolution: number | null;
                    nc: boolean;
                    subbed: boolean;
                    lyrics: boolean;
                    uncen: boolean;
                    source: VideoSource | null;
                    overlap: VideoOverlap;
                    audio: { basename: string };
                }>;
            }>;
            group: { name: string; slug: string } | null;
            anime: { slug: string; name: string; images: Array<{ link: string; facet: string | null }> };
            song: {
                title: string | null;
                performances: Array<{
                    alias: string | null;
                    as: string | null;
                    artist: { slug: string; name: string };
                }>;
            } | null;
        }>;
    };
};

export type DocumentPageQueryVariables = Exact<{
    pageSlug: Scalars["String"]["input"];
}>;

export type DocumentPageQuery = { page: { name: string; body: string; created_at: string } | null };

export type DocumentPageAllQueryVariables = Exact<{ [key: string]: never }>;

export type DocumentPageAllQuery = { pageAll: Array<{ slug: string }> };

export type DumpIndexPageQueryVariables = Exact<{ [key: string]: never }>;

export type DumpIndexPageQuery = { dumpAll: Array<{ path: string; link: string; created_at: string }> };

export type VideoPageAnimeFragment = {
    name: string;
    slug: string;
    year: number | null;
    season: string | null;
    media_format: string | null;
    themes: Array<{
        id: number;
        type: string;
        sequence: number | null;
        song: {
            title: string | null;
            performances: Array<{
                as: string | null;
                alias: string | null;
                artist: { slug: string; name: string; images: Array<{ link: string; facet: string | null }> };
            }>;
        } | null;
        entries: Array<{
            id: number;
            episodes: string | null;
            nsfw: boolean;
            spoiler: boolean;
            version: number | null;
            videos: Array<{
                id: number;
                basename: string;
                filename: string;
                lyrics: boolean;
                nc: boolean;
                overlap: VideoOverlap;
                resolution: number | null;
                source: VideoSource | null;
                subbed: boolean;
                uncen: boolean;
                tags: string;
                entries: Array<{
                    theme: {
                        type: string;
                        sequence: number | null;
                        id: number;
                        group: { name: string; slug: string } | null;
                        anime: { slug: string; name: string; images: Array<{ link: string; facet: string | null }> };
                        song: {
                            title: string | null;
                            performances: Array<{
                                alias: string | null;
                                as: string | null;
                                artist: { slug: string; name: string };
                            }>;
                        } | null;
                        entries: Array<{
                            id: number;
                            version: number | null;
                            videos: Array<{ id: number; basename: string; tags: string; audio: { basename: string } }>;
                        }>;
                    };
                }>;
                tracks: Array<{
                    playlist: {
                        id: string;
                        name: string;
                        visibility: PlaylistVisibility;
                        tracks_count: number;
                        user: { name: string };
                    };
                }>;
                audio: { basename: string };
                script: { link: string } | null;
            }>;
        }>;
        group: { name: string; slug: string } | null;
        anime: { slug: string; name: string; images: Array<{ link: string; facet: string | null }> };
    }>;
    images: Array<{ link: string; facet: string | null }>;
    series: Array<{ slug: string; name: string }>;
    studios: Array<{ slug: string; name: string; images: Array<{ link: string; facet: string | null }> }>;
};

export type VideoPageQueryVariables = Exact<{
    animeSlug: Scalars["String"]["input"];
}>;

export type VideoPageQuery = {
    anime: {
        name: string;
        slug: string;
        year: number | null;
        season: string | null;
        media_format: string | null;
        themes: Array<{
            id: number;
            type: string;
            sequence: number | null;
            song: {
                title: string | null;
                performances: Array<{
                    as: string | null;
                    alias: string | null;
                    artist: { slug: string; name: string; images: Array<{ link: string; facet: string | null }> };
                }>;
            } | null;
            entries: Array<{
                id: number;
                episodes: string | null;
                nsfw: boolean;
                spoiler: boolean;
                version: number | null;
                videos: Array<{
                    id: number;
                    basename: string;
                    filename: string;
                    lyrics: boolean;
                    nc: boolean;
                    overlap: VideoOverlap;
                    resolution: number | null;
                    source: VideoSource | null;
                    subbed: boolean;
                    uncen: boolean;
                    tags: string;
                    entries: Array<{
                        theme: {
                            type: string;
                            sequence: number | null;
                            id: number;
                            group: { name: string; slug: string } | null;
                            anime: {
                                slug: string;
                                name: string;
                                images: Array<{ link: string; facet: string | null }>;
                            };
                            song: {
                                title: string | null;
                                performances: Array<{
                                    alias: string | null;
                                    as: string | null;
                                    artist: { slug: string; name: string };
                                }>;
                            } | null;
                            entries: Array<{
                                id: number;
                                version: number | null;
                                videos: Array<{
                                    id: number;
                                    basename: string;
                                    tags: string;
                                    audio: { basename: string };
                                }>;
                            }>;
                        };
                    }>;
                    tracks: Array<{
                        playlist: {
                            id: string;
                            name: string;
                            visibility: PlaylistVisibility;
                            tracks_count: number;
                            user: { name: string };
                        };
                    }>;
                    audio: { basename: string };
                    script: { link: string } | null;
                }>;
            }>;
            group: { name: string; slug: string } | null;
            anime: { slug: string; name: string; images: Array<{ link: string; facet: string | null }> };
        }>;
        images: Array<{ link: string; facet: string | null }>;
        series: Array<{ slug: string; name: string }>;
        studios: Array<{ slug: string; name: string; images: Array<{ link: string; facet: string | null }> }>;
    } | null;
};

export type VideoPageAllQueryVariables = Exact<{ [key: string]: never }>;

export type VideoPageAllQuery = {
    animeAll: Array<{
        name: string;
        slug: string;
        year: number | null;
        season: string | null;
        media_format: string | null;
        themes: Array<{
            id: number;
            type: string;
            sequence: number | null;
            song: {
                title: string | null;
                performances: Array<{
                    as: string | null;
                    alias: string | null;
                    artist: { slug: string; name: string; images: Array<{ link: string; facet: string | null }> };
                }>;
            } | null;
            entries: Array<{
                id: number;
                episodes: string | null;
                nsfw: boolean;
                spoiler: boolean;
                version: number | null;
                videos: Array<{
                    id: number;
                    basename: string;
                    filename: string;
                    lyrics: boolean;
                    nc: boolean;
                    overlap: VideoOverlap;
                    resolution: number | null;
                    source: VideoSource | null;
                    subbed: boolean;
                    uncen: boolean;
                    tags: string;
                    entries: Array<{
                        theme: {
                            type: string;
                            sequence: number | null;
                            id: number;
                            group: { name: string; slug: string } | null;
                            anime: {
                                slug: string;
                                name: string;
                                images: Array<{ link: string; facet: string | null }>;
                            };
                            song: {
                                title: string | null;
                                performances: Array<{
                                    alias: string | null;
                                    as: string | null;
                                    artist: { slug: string; name: string };
                                }>;
                            } | null;
                            entries: Array<{
                                id: number;
                                version: number | null;
                                videos: Array<{
                                    id: number;
                                    basename: string;
                                    tags: string;
                                    audio: { basename: string };
                                }>;
                            }>;
                        };
                    }>;
                    tracks: Array<{
                        playlist: {
                            id: string;
                            name: string;
                            visibility: PlaylistVisibility;
                            tracks_count: number;
                            user: { name: string };
                        };
                    }>;
                    audio: { basename: string };
                    script: { link: string } | null;
                }>;
            }>;
            group: { name: string; slug: string } | null;
            anime: { slug: string; name: string; images: Array<{ link: string; facet: string | null }> };
        }>;
        images: Array<{ link: string; facet: string | null }>;
        series: Array<{ slug: string; name: string }>;
        studios: Array<{ slug: string; name: string; images: Array<{ link: string; facet: string | null }> }>;
    }>;
};

export type AnimeDetailPageAnimeFragment = {
    slug: string;
    name: string;
    season: string | null;
    year: number | null;
    synopsis: string | null;
    media_format: string | null;
    synonyms: Array<{ text: string | null }>;
    series: Array<{ slug: string; name: string }>;
    studios: Array<{ slug: string; name: string }>;
    resources: Array<{ site: string | null; link: string | null; as: string | null }>;
    themes: Array<{
        type: string;
        sequence: number | null;
        id: number;
        group: { name: string; slug: string } | null;
        anime: { slug: string; name: string; images: Array<{ link: string; facet: string | null }> };
        song: {
            title: string | null;
            performances: Array<{ alias: string | null; as: string | null; artist: { slug: string; name: string } }>;
        } | null;
        entries: Array<{
            version: number | null;
            episodes: string | null;
            spoiler: boolean;
            nsfw: boolean;
            id: number;
            videos: Array<{
                filename: string;
                tags: string;
                id: number;
                basename: string;
                resolution: number | null;
                nc: boolean;
                subbed: boolean;
                lyrics: boolean;
                uncen: boolean;
                source: VideoSource | null;
                overlap: VideoOverlap;
                audio: { basename: string };
            }>;
        }>;
    }>;
    images: Array<{ link: string; facet: string | null }>;
};

export type AnimeDetailPageQueryVariables = Exact<{
    animeSlug: Scalars["String"]["input"];
}>;

export type AnimeDetailPageQuery = {
    anime: {
        slug: string;
        name: string;
        season: string | null;
        year: number | null;
        synopsis: string | null;
        media_format: string | null;
        synonyms: Array<{ text: string | null }>;
        series: Array<{ slug: string; name: string }>;
        studios: Array<{ slug: string; name: string }>;
        resources: Array<{ site: string | null; link: string | null; as: string | null }>;
        themes: Array<{
            type: string;
            sequence: number | null;
            id: number;
            group: { name: string; slug: string } | null;
            anime: { slug: string; name: string; images: Array<{ link: string; facet: string | null }> };
            song: {
                title: string | null;
                performances: Array<{
                    alias: string | null;
                    as: string | null;
                    artist: { slug: string; name: string };
                }>;
            } | null;
            entries: Array<{
                version: number | null;
                episodes: string | null;
                spoiler: boolean;
                nsfw: boolean;
                id: number;
                videos: Array<{
                    filename: string;
                    tags: string;
                    id: number;
                    basename: string;
                    resolution: number | null;
                    nc: boolean;
                    subbed: boolean;
                    lyrics: boolean;
                    uncen: boolean;
                    source: VideoSource | null;
                    overlap: VideoOverlap;
                    audio: { basename: string };
                }>;
            }>;
        }>;
        images: Array<{ link: string; facet: string | null }>;
    } | null;
};

export type AnimeDetailPageAllQueryVariables = Exact<{ [key: string]: never }>;

export type AnimeDetailPageAllQuery = {
    animeAll: Array<{
        slug: string;
        name: string;
        season: string | null;
        year: number | null;
        synopsis: string | null;
        media_format: string | null;
        synonyms: Array<{ text: string | null }>;
        series: Array<{ slug: string; name: string }>;
        studios: Array<{ slug: string; name: string }>;
        resources: Array<{ site: string | null; link: string | null; as: string | null }>;
        themes: Array<{
            type: string;
            sequence: number | null;
            id: number;
            group: { name: string; slug: string } | null;
            anime: { slug: string; name: string; images: Array<{ link: string; facet: string | null }> };
            song: {
                title: string | null;
                performances: Array<{
                    alias: string | null;
                    as: string | null;
                    artist: { slug: string; name: string };
                }>;
            } | null;
            entries: Array<{
                version: number | null;
                episodes: string | null;
                spoiler: boolean;
                nsfw: boolean;
                id: number;
                videos: Array<{
                    filename: string;
                    tags: string;
                    id: number;
                    basename: string;
                    resolution: number | null;
                    nc: boolean;
                    subbed: boolean;
                    lyrics: boolean;
                    uncen: boolean;
                    source: VideoSource | null;
                    overlap: VideoOverlap;
                    audio: { basename: string };
                }>;
            }>;
        }>;
        images: Array<{ link: string; facet: string | null }>;
    }>;
};

export type AnimeIndexPageQueryVariables = Exact<{ [key: string]: never }>;

export type AnimeIndexPageQuery = { animeAll: Array<{ slug: string; name: string }> };

export type RevalidateApiQueryVariables = Exact<{ [key: string]: never }>;

export type RevalidateApiQuery = {
    me: {
        user: { permissions: Array<{ name: string }>; roles: Array<{ permissions: Array<{ name: string }> }> } | null;
    };
};

export type RevalidateAnimeQueryVariables = Exact<{
    animeSlug: Scalars["String"]["input"];
}>;

export type RevalidateAnimeQuery = {
    anime: {
        year: number | null;
        season: string | null;
        series: Array<{ slug: string }>;
        studios: Array<{ slug: string }>;
        themes: Array<{
            type: string;
            sequence: number | null;
            song: { performances: Array<{ artist: { slug: string } }> } | null;
            entries: Array<{ version: number | null; videos: Array<{ tags: string }> }>;
            group: { slug: string } | null;
        }>;
    } | null;
};

export type ArtistDetailPageArtistFragment = {
    slug: string;
    name: string;
    performances: Array<{
        alias: string | null;
        as: string | null;
        song: {
            id: number | null;
            title: string | null;
            performances: Array<{ alias: string | null; as: string | null; artist: { slug: string; name: string } }>;
            themes: Array<{
                id: number;
                type: string;
                sequence: number | null;
                group: { name: string; slug: string } | null;
                anime: {
                    year: number | null;
                    season: string | null;
                    slug: string;
                    name: string;
                    images: Array<{ link: string; facet: string | null }>;
                };
                song: {
                    title: string | null;
                    performances: Array<{
                        alias: string | null;
                        as: string | null;
                        artist: { slug: string; name: string };
                    }>;
                } | null;
                entries: Array<{
                    id: number;
                    version: number | null;
                    episodes: string | null;
                    spoiler: boolean;
                    nsfw: boolean;
                    videos: Array<{
                        id: number;
                        basename: string;
                        tags: string;
                        resolution: number | null;
                        nc: boolean;
                        subbed: boolean;
                        lyrics: boolean;
                        uncen: boolean;
                        source: VideoSource | null;
                        overlap: VideoOverlap;
                        audio: { basename: string };
                    }>;
                }>;
            }>;
        };
    }>;
    members: Array<{ alias: string | null; as: string | null; member: { slug: string; name: string } }>;
    groups: Array<{
        alias: string | null;
        as: string | null;
        group: {
            slug: string;
            name: string;
            performances: Array<{
                alias: string | null;
                as: string | null;
                song: {
                    id: number | null;
                    title: string | null;
                    performances: Array<{
                        alias: string | null;
                        as: string | null;
                        artist: { slug: string; name: string };
                    }>;
                    themes: Array<{
                        id: number;
                        type: string;
                        sequence: number | null;
                        group: { name: string; slug: string } | null;
                        anime: {
                            year: number | null;
                            season: string | null;
                            slug: string;
                            name: string;
                            images: Array<{ link: string; facet: string | null }>;
                        };
                        song: {
                            title: string | null;
                            performances: Array<{
                                alias: string | null;
                                as: string | null;
                                artist: { slug: string; name: string };
                            }>;
                        } | null;
                        entries: Array<{
                            id: number;
                            version: number | null;
                            episodes: string | null;
                            spoiler: boolean;
                            nsfw: boolean;
                            videos: Array<{
                                id: number;
                                basename: string;
                                tags: string;
                                resolution: number | null;
                                nc: boolean;
                                subbed: boolean;
                                lyrics: boolean;
                                uncen: boolean;
                                source: VideoSource | null;
                                overlap: VideoOverlap;
                                audio: { basename: string };
                            }>;
                        }>;
                    }>;
                };
            }>;
        };
    }>;
    resources: Array<{ link: string | null; site: string | null; as: string | null }>;
    images: Array<{ facet: string | null; link: string }>;
};

export type ArtistDetailPageQueryVariables = Exact<{
    artistSlug: Scalars["String"]["input"];
}>;

export type ArtistDetailPageQuery = {
    artist: {
        slug: string;
        name: string;
        performances: Array<{
            alias: string | null;
            as: string | null;
            song: {
                id: number | null;
                title: string | null;
                performances: Array<{
                    alias: string | null;
                    as: string | null;
                    artist: { slug: string; name: string };
                }>;
                themes: Array<{
                    id: number;
                    type: string;
                    sequence: number | null;
                    group: { name: string; slug: string } | null;
                    anime: {
                        year: number | null;
                        season: string | null;
                        slug: string;
                        name: string;
                        images: Array<{ link: string; facet: string | null }>;
                    };
                    song: {
                        title: string | null;
                        performances: Array<{
                            alias: string | null;
                            as: string | null;
                            artist: { slug: string; name: string };
                        }>;
                    } | null;
                    entries: Array<{
                        id: number;
                        version: number | null;
                        episodes: string | null;
                        spoiler: boolean;
                        nsfw: boolean;
                        videos: Array<{
                            id: number;
                            basename: string;
                            tags: string;
                            resolution: number | null;
                            nc: boolean;
                            subbed: boolean;
                            lyrics: boolean;
                            uncen: boolean;
                            source: VideoSource | null;
                            overlap: VideoOverlap;
                            audio: { basename: string };
                        }>;
                    }>;
                }>;
            };
        }>;
        members: Array<{ alias: string | null; as: string | null; member: { slug: string; name: string } }>;
        groups: Array<{
            alias: string | null;
            as: string | null;
            group: {
                slug: string;
                name: string;
                performances: Array<{
                    alias: string | null;
                    as: string | null;
                    song: {
                        id: number | null;
                        title: string | null;
                        performances: Array<{
                            alias: string | null;
                            as: string | null;
                            artist: { slug: string; name: string };
                        }>;
                        themes: Array<{
                            id: number;
                            type: string;
                            sequence: number | null;
                            group: { name: string; slug: string } | null;
                            anime: {
                                year: number | null;
                                season: string | null;
                                slug: string;
                                name: string;
                                images: Array<{ link: string; facet: string | null }>;
                            };
                            song: {
                                title: string | null;
                                performances: Array<{
                                    alias: string | null;
                                    as: string | null;
                                    artist: { slug: string; name: string };
                                }>;
                            } | null;
                            entries: Array<{
                                id: number;
                                version: number | null;
                                episodes: string | null;
                                spoiler: boolean;
                                nsfw: boolean;
                                videos: Array<{
                                    id: number;
                                    basename: string;
                                    tags: string;
                                    resolution: number | null;
                                    nc: boolean;
                                    subbed: boolean;
                                    lyrics: boolean;
                                    uncen: boolean;
                                    source: VideoSource | null;
                                    overlap: VideoOverlap;
                                    audio: { basename: string };
                                }>;
                            }>;
                        }>;
                    };
                }>;
            };
        }>;
        resources: Array<{ link: string | null; site: string | null; as: string | null }>;
        images: Array<{ facet: string | null; link: string }>;
    } | null;
};

export type ArtistDetailPageAllQueryVariables = Exact<{ [key: string]: never }>;

export type ArtistDetailPageAllQuery = {
    artistAll: Array<{
        slug: string;
        name: string;
        performances: Array<{
            alias: string | null;
            as: string | null;
            song: {
                id: number | null;
                title: string | null;
                performances: Array<{
                    alias: string | null;
                    as: string | null;
                    artist: { slug: string; name: string };
                }>;
                themes: Array<{
                    id: number;
                    type: string;
                    sequence: number | null;
                    group: { name: string; slug: string } | null;
                    anime: {
                        year: number | null;
                        season: string | null;
                        slug: string;
                        name: string;
                        images: Array<{ link: string; facet: string | null }>;
                    };
                    song: {
                        title: string | null;
                        performances: Array<{
                            alias: string | null;
                            as: string | null;
                            artist: { slug: string; name: string };
                        }>;
                    } | null;
                    entries: Array<{
                        id: number;
                        version: number | null;
                        episodes: string | null;
                        spoiler: boolean;
                        nsfw: boolean;
                        videos: Array<{
                            id: number;
                            basename: string;
                            tags: string;
                            resolution: number | null;
                            nc: boolean;
                            subbed: boolean;
                            lyrics: boolean;
                            uncen: boolean;
                            source: VideoSource | null;
                            overlap: VideoOverlap;
                            audio: { basename: string };
                        }>;
                    }>;
                }>;
            };
        }>;
        members: Array<{ alias: string | null; as: string | null; member: { slug: string; name: string } }>;
        groups: Array<{
            alias: string | null;
            as: string | null;
            group: {
                slug: string;
                name: string;
                performances: Array<{
                    alias: string | null;
                    as: string | null;
                    song: {
                        id: number | null;
                        title: string | null;
                        performances: Array<{
                            alias: string | null;
                            as: string | null;
                            artist: { slug: string; name: string };
                        }>;
                        themes: Array<{
                            id: number;
                            type: string;
                            sequence: number | null;
                            group: { name: string; slug: string } | null;
                            anime: {
                                year: number | null;
                                season: string | null;
                                slug: string;
                                name: string;
                                images: Array<{ link: string; facet: string | null }>;
                            };
                            song: {
                                title: string | null;
                                performances: Array<{
                                    alias: string | null;
                                    as: string | null;
                                    artist: { slug: string; name: string };
                                }>;
                            } | null;
                            entries: Array<{
                                id: number;
                                version: number | null;
                                episodes: string | null;
                                spoiler: boolean;
                                nsfw: boolean;
                                videos: Array<{
                                    id: number;
                                    basename: string;
                                    tags: string;
                                    resolution: number | null;
                                    nc: boolean;
                                    subbed: boolean;
                                    lyrics: boolean;
                                    uncen: boolean;
                                    source: VideoSource | null;
                                    overlap: VideoOverlap;
                                    audio: { basename: string };
                                }>;
                            }>;
                        }>;
                    };
                }>;
            };
        }>;
        resources: Array<{ link: string | null; site: string | null; as: string | null }>;
        images: Array<{ facet: string | null; link: string }>;
    }>;
};

export type ArtistIndexPageQueryVariables = Exact<{ [key: string]: never }>;

export type ArtistIndexPageQuery = { artistAll: Array<{ slug: string; name: string }> };

export type DocumentIndexPageQueryVariables = Exact<{ [key: string]: never }>;

export type DocumentIndexPageQuery = { pageAll: Array<{ slug: string; name: string; created_at: string }> };

export type CharacterFragmentFragment = {
    id: number;
    seed: number;
    name: string;
    source: string;
    image: string;
    theme: {
        type: string;
        sequence: number | null;
        id: number;
        group: { name: string; slug: string } | null;
        anime: { slug: string; name: string; images: Array<{ link: string; facet: string | null }> };
        song: {
            title: string | null;
            performances: Array<{ alias: string | null; as: string | null; artist: { slug: string; name: string } }>;
        } | null;
        entries: Array<{
            id: number;
            version: number | null;
            videos: Array<{ id: number; basename: string; tags: string; audio: { basename: string } }>;
        }>;
    } | null;
};

export type RoundFragmentFragment = {
    tier: number;
    name: string | null;
    pairings: Array<{
        order: number;
        group: number;
        votesA: number | null;
        votesB: number | null;
        characterA: {
            id: number;
            seed: number;
            name: string;
            source: string;
            image: string;
            theme: {
                type: string;
                sequence: number | null;
                id: number;
                group: { name: string; slug: string } | null;
                anime: { slug: string; name: string; images: Array<{ link: string; facet: string | null }> };
                song: {
                    title: string | null;
                    performances: Array<{
                        alias: string | null;
                        as: string | null;
                        artist: { slug: string; name: string };
                    }>;
                } | null;
                entries: Array<{
                    id: number;
                    version: number | null;
                    videos: Array<{ id: number; basename: string; tags: string; audio: { basename: string } }>;
                }>;
            } | null;
        };
        characterB: {
            id: number;
            seed: number;
            name: string;
            source: string;
            image: string;
            theme: {
                type: string;
                sequence: number | null;
                id: number;
                group: { name: string; slug: string } | null;
                anime: { slug: string; name: string; images: Array<{ link: string; facet: string | null }> };
                song: {
                    title: string | null;
                    performances: Array<{
                        alias: string | null;
                        as: string | null;
                        artist: { slug: string; name: string };
                    }>;
                } | null;
                entries: Array<{
                    id: number;
                    version: number | null;
                    videos: Array<{ id: number; basename: string; tags: string; audio: { basename: string } }>;
                }>;
            } | null;
        };
    }>;
};

export type BracketPageQueryVariables = Exact<{
    bracketSlug: Scalars["String"]["input"];
}>;

export type BracketPageQuery = {
    bracket: {
        name: string;
        currentGroup: number | null;
        currentRound: {
            tier: number;
            name: string | null;
            pairings: Array<{
                order: number;
                group: number;
                votesA: number | null;
                votesB: number | null;
                characterA: {
                    id: number;
                    seed: number;
                    name: string;
                    source: string;
                    image: string;
                    theme: {
                        type: string;
                        sequence: number | null;
                        id: number;
                        group: { name: string; slug: string } | null;
                        anime: { slug: string; name: string; images: Array<{ link: string; facet: string | null }> };
                        song: {
                            title: string | null;
                            performances: Array<{
                                alias: string | null;
                                as: string | null;
                                artist: { slug: string; name: string };
                            }>;
                        } | null;
                        entries: Array<{
                            id: number;
                            version: number | null;
                            videos: Array<{ id: number; basename: string; tags: string; audio: { basename: string } }>;
                        }>;
                    } | null;
                };
                characterB: {
                    id: number;
                    seed: number;
                    name: string;
                    source: string;
                    image: string;
                    theme: {
                        type: string;
                        sequence: number | null;
                        id: number;
                        group: { name: string; slug: string } | null;
                        anime: { slug: string; name: string; images: Array<{ link: string; facet: string | null }> };
                        song: {
                            title: string | null;
                            performances: Array<{
                                alias: string | null;
                                as: string | null;
                                artist: { slug: string; name: string };
                            }>;
                        } | null;
                        entries: Array<{
                            id: number;
                            version: number | null;
                            videos: Array<{ id: number; basename: string; tags: string; audio: { basename: string } }>;
                        }>;
                    } | null;
                };
            }>;
        } | null;
        rounds: Array<{
            tier: number;
            name: string | null;
            pairings: Array<{
                order: number;
                group: number;
                votesA: number | null;
                votesB: number | null;
                characterA: {
                    id: number;
                    seed: number;
                    name: string;
                    source: string;
                    image: string;
                    theme: {
                        type: string;
                        sequence: number | null;
                        id: number;
                        group: { name: string; slug: string } | null;
                        anime: { slug: string; name: string; images: Array<{ link: string; facet: string | null }> };
                        song: {
                            title: string | null;
                            performances: Array<{
                                alias: string | null;
                                as: string | null;
                                artist: { slug: string; name: string };
                            }>;
                        } | null;
                        entries: Array<{
                            id: number;
                            version: number | null;
                            videos: Array<{ id: number; basename: string; tags: string; audio: { basename: string } }>;
                        }>;
                    } | null;
                };
                characterB: {
                    id: number;
                    seed: number;
                    name: string;
                    source: string;
                    image: string;
                    theme: {
                        type: string;
                        sequence: number | null;
                        id: number;
                        group: { name: string; slug: string } | null;
                        anime: { slug: string; name: string; images: Array<{ link: string; facet: string | null }> };
                        song: {
                            title: string | null;
                            performances: Array<{
                                alias: string | null;
                                as: string | null;
                                artist: { slug: string; name: string };
                            }>;
                        } | null;
                        entries: Array<{
                            id: number;
                            version: number | null;
                            videos: Array<{ id: number; basename: string; tags: string; audio: { basename: string } }>;
                        }>;
                    } | null;
                };
            }>;
        }>;
    } | null;
};

export type BracketPageAllQueryVariables = Exact<{ [key: string]: never }>;

export type BracketPageAllQuery = { bracketAll: Array<{ slug: string }> };

export type AwardPageThemeQueryVariables = Exact<{
    themeId: InputMaybe<Scalars["Int"]["input"]>;
}>;

export type AwardPageThemeQuery = {
    theme: {
        id: number;
        type: string;
        sequence: number | null;
        anime: { slug: string; name: string; images: Array<{ facet: string | null; link: string }> };
        song: {
            title: string | null;
            performances: Array<{ as: string | null; alias: string | null; artist: { slug: string; name: string } }>;
        } | null;
        entries: Array<{ version: number | null; videos: Array<{ basename: string; tags: string }> }>;
        group: { slug: string } | null;
    } | null;
};

export type EventPageQueryVariables = Exact<{ [key: string]: never }>;

export type EventPageQuery = { bracketAll: Array<{ slug: string; name: string }> };

export type HomePageRecentlyAddedQueryVariables = Exact<{ [key: string]: never }>;

export type HomePageRecentlyAddedQuery = {
    videoAll: Array<{
        id: number;
        basename: string;
        tags: string;
        entries: Array<{
            id: number;
            version: number | null;
            theme: {
                id: number;
                type: string;
                sequence: number | null;
                group: { name: string; slug: string } | null;
                anime: { slug: string; name: string; images: Array<{ link: string; facet: string | null }> };
                song: {
                    title: string | null;
                    performances: Array<{
                        alias: string | null;
                        as: string | null;
                        artist: { slug: string; name: string };
                    }>;
                } | null;
            };
        }>;
        audio: { basename: string };
    }>;
};

export type HomePageMostViewedQueryVariables = Exact<{ [key: string]: never }>;

export type HomePageMostViewedQuery = {
    videoAll: Array<{
        id: number;
        basename: string;
        tags: string;
        entries: Array<{
            id: number;
            version: number | null;
            theme: {
                id: number;
                type: string;
                sequence: number | null;
                group: { name: string; slug: string } | null;
                anime: { slug: string; name: string; images: Array<{ link: string; facet: string | null }> };
                song: {
                    title: string | null;
                    performances: Array<{
                        alias: string | null;
                        as: string | null;
                        artist: { slug: string; name: string };
                    }>;
                } | null;
            };
        }>;
        audio: { basename: string };
    }>;
};

export type HomePageRecentlyAddedPlaylistsQueryVariables = Exact<{ [key: string]: never }>;

export type HomePageRecentlyAddedPlaylistsQuery = {
    playlistAll: Array<{
        id: string;
        name: string;
        visibility: PlaylistVisibility;
        tracks_count: number;
        user: { name: string };
    }>;
};

export type HomePageQueryVariables = Exact<{ [key: string]: never }>;

export type HomePageQuery = {
    featuredTheme: {
        entry: {
            theme: {
                type: string;
                sequence: number | null;
                id: number;
                anime: { slug: string; name: string; images: Array<{ link: string; facet: string | null }> };
                entries: Array<{
                    id: number;
                    version: number | null;
                    videos: Array<{ id: number; basename: string; tags: string; audio: { basename: string } }>;
                }>;
                group: { name: string; slug: string } | null;
                song: {
                    title: string | null;
                    performances: Array<{
                        alias: string | null;
                        as: string | null;
                        artist: { slug: string; name: string };
                    }>;
                } | null;
            };
        } | null;
    } | null;
    announcementAll: Array<{ content: string }>;
};

export type PlaylistDetailPagePlaylistQueryVariables = Exact<{
    playlistId: Scalars["String"]["input"];
}>;

export type PlaylistDetailPagePlaylistQuery = {
    playlist: {
        id: string;
        name: string;
        description: string | null;
        visibility: PlaylistVisibility;
        tracks_count: number;
        tracks: Array<{
            id: string;
            video: { id: number; basename: string; tags: string; audio: { basename: string } };
            entry: {
                id: number;
                version: number | null;
                theme: {
                    id: number;
                    type: string;
                    sequence: number | null;
                    anime: {
                        year: number | null;
                        season: string | null;
                        slug: string;
                        name: string;
                        images: Array<{ link: string; facet: string | null }>;
                    };
                    group: { name: string; slug: string } | null;
                    song: {
                        title: string | null;
                        performances: Array<{
                            alias: string | null;
                            as: string | null;
                            artist: { slug: string; name: string };
                        }>;
                    } | null;
                };
            };
            previous: { id: string } | null;
            next: { id: string } | null;
        }>;
        user: { name: string };
    } | null;
};

export type PlaylistDetailPageMeQueryVariables = Exact<{ [key: string]: never }>;

export type PlaylistDetailPageMeQuery = { me: { user: { name: string } | null } };

export type PlaylistDetailPagePlaylistFragment = {
    id: string;
    name: string;
    description: string | null;
    visibility: PlaylistVisibility;
    tracks_count: number;
    tracks: Array<{
        id: string;
        video: { id: number; basename: string; tags: string; audio: { basename: string } };
        entry: {
            id: number;
            version: number | null;
            theme: {
                id: number;
                type: string;
                sequence: number | null;
                anime: {
                    year: number | null;
                    season: string | null;
                    slug: string;
                    name: string;
                    images: Array<{ link: string; facet: string | null }>;
                };
                group: { name: string; slug: string } | null;
                song: {
                    title: string | null;
                    performances: Array<{
                        alias: string | null;
                        as: string | null;
                        artist: { slug: string; name: string };
                    }>;
                } | null;
            };
        };
        previous: { id: string } | null;
        next: { id: string } | null;
    }>;
    user: { name: string };
};

type PlaylistDetailPageUser_UserAuth_Fragment = { name: string };

type PlaylistDetailPageUser_UserPublic_Fragment = { name: string };

export type PlaylistDetailPageUserFragment =
    | PlaylistDetailPageUser_UserAuth_Fragment
    | PlaylistDetailPageUser_UserPublic_Fragment;

export type PlaylistDetailPageQueryVariables = Exact<{
    playlistId: Scalars["String"]["input"];
}>;

export type PlaylistDetailPageQuery = {
    playlist: {
        id: string;
        name: string;
        description: string | null;
        visibility: PlaylistVisibility;
        tracks_count: number;
        tracks: Array<{
            id: string;
            video: { id: number; basename: string; tags: string; audio: { basename: string } };
            entry: {
                id: number;
                version: number | null;
                theme: {
                    id: number;
                    type: string;
                    sequence: number | null;
                    anime: {
                        year: number | null;
                        season: string | null;
                        slug: string;
                        name: string;
                        images: Array<{ link: string; facet: string | null }>;
                    };
                    group: { name: string; slug: string } | null;
                    song: {
                        title: string | null;
                        performances: Array<{
                            alias: string | null;
                            as: string | null;
                            artist: { slug: string; name: string };
                        }>;
                    } | null;
                };
            };
            previous: { id: string } | null;
            next: { id: string } | null;
        }>;
        user: { name: string };
    } | null;
    me: { user: { name: string } | null };
};

export type GalleryPageQueryVariables = Exact<{ [key: string]: never }>;

export type GalleryPageQuery = { grills: Array<{ id: number; link: string }> };

export type ProfilePageMeQueryVariables = Exact<{ [key: string]: never }>;

export type ProfilePageMeQuery = {
    me: {
        user: {
            name: string;
            email: string;
            email_verified_at: string | null;
            created_at: string;
            roles: Array<{ name: string; color: string | null; priority: number | null; default: boolean }>;
        } | null;
        playlistAll: Array<{ id: string; name: string; visibility: PlaylistVisibility; tracks_count: number }> | null;
    };
};

export type ProfilePagePlaylistFragment = {
    id: string;
    name: string;
    visibility: PlaylistVisibility;
    tracks_count: number;
};

export type ProfilePageUserFragment = {
    name: string;
    email: string;
    email_verified_at: string | null;
    created_at: string;
    roles: Array<{ name: string; color: string | null; priority: number | null; default: boolean }>;
};

export type ProfilePageQueryVariables = Exact<{ [key: string]: never }>;

export type ProfilePageQuery = {
    me: {
        user: {
            name: string;
            email: string;
            email_verified_at: string | null;
            created_at: string;
            roles: Array<{ name: string; color: string | null; priority: number | null; default: boolean }>;
        } | null;
        playlistAll: Array<{ id: string; name: string; visibility: PlaylistVisibility; tracks_count: number }> | null;
    };
};

export type SeriesDetailPageSeriesFragment = {
    slug: string;
    name: string;
    anime: Array<{
        name: string;
        slug: string;
        year: number | null;
        season: string | null;
        media_format: string | null;
        themes: Array<{
            id: number;
            type: string;
            sequence: number | null;
            group: { name: string; slug: string } | null;
            anime: { slug: string };
            entries: Array<{
                version: number | null;
                episodes: string | null;
                spoiler: boolean;
                nsfw: boolean;
                videos: Array<{
                    tags: string;
                    resolution: number | null;
                    nc: boolean;
                    subbed: boolean;
                    lyrics: boolean;
                    uncen: boolean;
                    source: VideoSource | null;
                    overlap: VideoOverlap;
                }>;
            }>;
            song: { title: string | null } | null;
        }>;
        images: Array<{ link: string; facet: string | null }>;
    }>;
};

export type SeriesDetailPageQueryVariables = Exact<{
    seriesSlug: Scalars["String"]["input"];
}>;

export type SeriesDetailPageQuery = {
    series: {
        slug: string;
        name: string;
        anime: Array<{
            name: string;
            slug: string;
            year: number | null;
            season: string | null;
            media_format: string | null;
            themes: Array<{
                id: number;
                type: string;
                sequence: number | null;
                group: { name: string; slug: string } | null;
                anime: { slug: string };
                entries: Array<{
                    version: number | null;
                    episodes: string | null;
                    spoiler: boolean;
                    nsfw: boolean;
                    videos: Array<{
                        tags: string;
                        resolution: number | null;
                        nc: boolean;
                        subbed: boolean;
                        lyrics: boolean;
                        uncen: boolean;
                        source: VideoSource | null;
                        overlap: VideoOverlap;
                    }>;
                }>;
                song: { title: string | null } | null;
            }>;
            images: Array<{ link: string; facet: string | null }>;
        }>;
    } | null;
};

export type SeriesDetailPageAllQueryVariables = Exact<{ [key: string]: never }>;

export type SeriesDetailPageAllQuery = {
    seriesAll: Array<{
        slug: string;
        name: string;
        anime: Array<{
            name: string;
            slug: string;
            year: number | null;
            season: string | null;
            media_format: string | null;
            themes: Array<{
                id: number;
                type: string;
                sequence: number | null;
                group: { name: string; slug: string } | null;
                anime: { slug: string };
                entries: Array<{
                    version: number | null;
                    episodes: string | null;
                    spoiler: boolean;
                    nsfw: boolean;
                    videos: Array<{
                        tags: string;
                        resolution: number | null;
                        nc: boolean;
                        subbed: boolean;
                        lyrics: boolean;
                        uncen: boolean;
                        source: VideoSource | null;
                        overlap: VideoOverlap;
                    }>;
                }>;
                song: { title: string | null } | null;
            }>;
            images: Array<{ link: string; facet: string | null }>;
        }>;
    }>;
};

export type SeriesIndexPageQueryVariables = Exact<{ [key: string]: never }>;

export type SeriesIndexPageQuery = { seriesAll: Array<{ slug: string; name: string }> };

export type StudioDetailPageStudioFragment = {
    slug: string;
    name: string;
    anime: Array<{
        name: string;
        slug: string;
        year: number | null;
        season: string | null;
        media_format: string | null;
        themes: Array<{
            id: number;
            type: string;
            sequence: number | null;
            group: { name: string; slug: string } | null;
            anime: { slug: string };
            entries: Array<{
                version: number | null;
                episodes: string | null;
                spoiler: boolean;
                nsfw: boolean;
                videos: Array<{
                    tags: string;
                    resolution: number | null;
                    nc: boolean;
                    subbed: boolean;
                    lyrics: boolean;
                    uncen: boolean;
                    source: VideoSource | null;
                    overlap: VideoOverlap;
                }>;
            }>;
            song: { title: string | null } | null;
        }>;
        images: Array<{ link: string; facet: string | null }>;
    }>;
    resources: Array<{ link: string | null; site: string | null; as: string | null }>;
    images: Array<{ link: string; facet: string | null }>;
};

export type StudioDetailPageQueryVariables = Exact<{
    studioSlug: Scalars["String"]["input"];
}>;

export type StudioDetailPageQuery = {
    studio: {
        slug: string;
        name: string;
        anime: Array<{
            name: string;
            slug: string;
            year: number | null;
            season: string | null;
            media_format: string | null;
            themes: Array<{
                id: number;
                type: string;
                sequence: number | null;
                group: { name: string; slug: string } | null;
                anime: { slug: string };
                entries: Array<{
                    version: number | null;
                    episodes: string | null;
                    spoiler: boolean;
                    nsfw: boolean;
                    videos: Array<{
                        tags: string;
                        resolution: number | null;
                        nc: boolean;
                        subbed: boolean;
                        lyrics: boolean;
                        uncen: boolean;
                        source: VideoSource | null;
                        overlap: VideoOverlap;
                    }>;
                }>;
                song: { title: string | null } | null;
            }>;
            images: Array<{ link: string; facet: string | null }>;
        }>;
        resources: Array<{ link: string | null; site: string | null; as: string | null }>;
        images: Array<{ link: string; facet: string | null }>;
    } | null;
};

export type StudioDetailPageAllQueryVariables = Exact<{ [key: string]: never }>;

export type StudioDetailPageAllQuery = {
    studioAll: Array<{
        slug: string;
        name: string;
        anime: Array<{
            name: string;
            slug: string;
            year: number | null;
            season: string | null;
            media_format: string | null;
            themes: Array<{
                id: number;
                type: string;
                sequence: number | null;
                group: { name: string; slug: string } | null;
                anime: { slug: string };
                entries: Array<{
                    version: number | null;
                    episodes: string | null;
                    spoiler: boolean;
                    nsfw: boolean;
                    videos: Array<{
                        tags: string;
                        resolution: number | null;
                        nc: boolean;
                        subbed: boolean;
                        lyrics: boolean;
                        uncen: boolean;
                        source: VideoSource | null;
                        overlap: VideoOverlap;
                    }>;
                }>;
                song: { title: string | null } | null;
            }>;
            images: Array<{ link: string; facet: string | null }>;
        }>;
        resources: Array<{ link: string | null; site: string | null; as: string | null }>;
        images: Array<{ link: string; facet: string | null }>;
    }>;
};

export type StudioIndexPageQueryVariables = Exact<{ [key: string]: never }>;

export type StudioIndexPageQuery = { studioAll: Array<{ slug: string; name: string }> };

export type SeasonDetailPageQueryVariables = Exact<{
    year?: InputMaybe<Scalars["Int"]["input"]>;
    season: Scalars["String"]["input"];
}>;

export type SeasonDetailPageQuery = {
    year: { value: number; seasons: Array<{ value: string }> } | null;
    season: {
        value: string;
        anime: Array<{
            slug: string;
            name: string;
            year: number | null;
            season: string | null;
            media_format: string | null;
            themes: Array<{
                id: number;
                type: string;
                sequence: number | null;
                group: { name: string; slug: string } | null;
                anime: { slug: string };
                entries: Array<{
                    version: number | null;
                    episodes: string | null;
                    spoiler: boolean;
                    nsfw: boolean;
                    videos: Array<{
                        tags: string;
                        resolution: number | null;
                        nc: boolean;
                        subbed: boolean;
                        lyrics: boolean;
                        uncen: boolean;
                        source: VideoSource | null;
                        overlap: VideoOverlap;
                    }>;
                }>;
                song: { title: string | null } | null;
            }>;
            images: Array<{ link: string; facet: string | null }>;
        }>;
    } | null;
    yearAll: Array<{ value: number }>;
};

export type SeasonDetailPageAllQueryVariables = Exact<{ [key: string]: never }>;

export type SeasonDetailPageAllQuery = { yearAll: Array<{ value: number; seasons: Array<{ value: string }> }> };

export type YearDetailPageQueryVariables = Exact<{
    year: Scalars["Int"]["input"];
}>;

export type YearDetailPageQuery = {
    year: {
        value: number;
        seasons: Array<{
            value: string;
            anime: Array<{
                slug: string;
                name: string;
                year: number | null;
                season: string | null;
                media_format: string | null;
                themes: Array<{
                    id: number;
                    type: string;
                    sequence: number | null;
                    group: { name: string; slug: string } | null;
                    anime: { slug: string };
                    entries: Array<{
                        version: number | null;
                        episodes: string | null;
                        spoiler: boolean;
                        nsfw: boolean;
                        videos: Array<{
                            tags: string;
                            resolution: number | null;
                            nc: boolean;
                            subbed: boolean;
                            lyrics: boolean;
                            uncen: boolean;
                            source: VideoSource | null;
                            overlap: VideoOverlap;
                        }>;
                    }>;
                    song: { title: string | null } | null;
                }>;
                images: Array<{ link: string; facet: string | null }>;
            }>;
        }>;
    } | null;
    yearAll: Array<{ value: number }>;
};

export type YearDetailPageAllQueryVariables = Exact<{ [key: string]: never }>;

export type YearDetailPageAllQuery = { yearAll: Array<{ value: number }> };

export type YearIndexPageQueryVariables = Exact<{ [key: string]: never }>;

export type YearIndexPageQuery = { yearAll: Array<{ value: number; seasons: Array<{ value: string }> }> };

export type CreateVideoSlugThemeFragment = { type: string; sequence: number | null; group: { slug: string } | null };

export type CreateVideoSlugEntryFragment = { version: number | null };

export type CreateVideoSlugVideoFragment = { tags: string };

type ExtractImagesResourceWithImages_Anime_Fragment = { images: Array<{ link: string; facet: string | null }> };

type ExtractImagesResourceWithImages_Artist_Fragment = { images: Array<{ link: string; facet: string | null }> };

type ExtractImagesResourceWithImages_Studio_Fragment = { images: Array<{ link: string; facet: string | null }> };

export type ExtractImagesResourceWithImagesFragment =
    | ExtractImagesResourceWithImages_Anime_Fragment
    | ExtractImagesResourceWithImages_Artist_Fragment
    | ExtractImagesResourceWithImages_Studio_Fragment;
