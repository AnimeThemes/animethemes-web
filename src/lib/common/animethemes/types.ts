// --------------------------------
// General Types
// --------------------------------

export interface ApiIndex {
    links: ApiIndexLinks;
    meta: ApiIndexMeta;
}

export interface ApiIndexLinks {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
}

export interface ApiIndexMeta {
    current_page: number;
    from: number;
    last_page: number;
    path: string;
    per_page: number;
    to: number;
    total: number;
}

// --------------------------------
// Resource Types
// --------------------------------

export interface ApiAnime {
    id: number;
    name: string;
    slug: string;
    year: number | null;
    season: string | null;
    media_format: string;
    synopsis: string | null;
    animesynonyms?: Array<ApiSynonym>;
    animethemes?: Array<ApiTheme>;
    series?: Array<ApiSeries>;
    studios?: Array<ApiStudio>;
    resources?: Array<
        ApiResource & {
            animeresource: ApiAnimeResource;
        }
    >;
    images?: Array<ApiImage>;
}

export interface ApiAnnouncement {
    id: number;
}

export interface ApiArtist {
    id: number;
    name: string;
    slug: string;
    songs?: Array<
        ApiSong & {
            artistsong: ApiArtistSong;
        }
    >;
    resources?: Array<
        ApiResource & {
            artistresource: ApiArtistResource;
        }
    >;
    images?: Array<ApiImage>;
    groups?: Array<
        ApiArtist & {
            artistmember: ApiArtistMember;
        }
    >;
    members?: Array<
        ApiArtist & {
            artistmember: ApiArtistMember;
        }
    >;
}

export interface ApiAudio {
    id: number;
    basename: string;
    videos?: Array<ApiVideo>;
}

export interface ApiDump {
    id: number;
}

export interface ApiEntry {
    id: number;
    version: number | null;
    episodes: string | null;
    nsfw: boolean;
    spoiler: boolean;
    notes: string | null;
    animetheme?: ApiTheme;
    videos?: Array<ApiVideo>;
}

export interface ApiFeaturedTheme {
    id: number;
    animethemeentry?: ApiEntry | null;
    video?: ApiVideo | null;
}

export interface ApiGroup {
    id: number;
    name: string;
    slug: string;
}

export interface ApiImage {
    id: number;
    path: string;
    size: number;
    mimetype: string;
    facet: string | null;
    link: string;
}

export interface ApiPage {
    id: number;
}

export interface ApiPlaylist {
    id: string;
    tracks?: Array<ApiPlaylistTrack>;
    user?: ApiUser;
}

export interface ApiPlaylistTrack {
    id: string;
    playlist: ApiPlaylist;
    animethemeentry?: ApiEntry;
    video?: ApiVideo;
}

export interface ApiResource {
    id: number;
    link: string | null;
    external_id: number | null;
    site: string | null;
}

export interface ApiSeries {
    id: number;
    name: string;
    slug: string;
    anime?: Array<ApiAnime>;
}

export interface ApiSong {
    id: number;
    title: string | null;
    animethemes?: Array<ApiTheme>;
    artists?: Array<
        ApiArtist & {
            artistsong: ApiArtistSong;
        }
    >;
}

export interface ApiStudio {
    id: number;
    name: string;
    slug: string;
    anime?: Array<ApiAnime>;
    resources?: Array<
        ApiResource & {
            studioresource: ApiStudioResource;
        }
    >;
    images?: Array<ApiImage>;
}

export interface ApiSynonym {
    id: number;
    text: string;
}

export interface ApiTheme {
    id: number;
    type: string | null;
    sequence: number | null;
    slug: string;
    song?: ApiSong | null;
    group?: ApiGroup | null;
    anime?: ApiAnime;
    animethemeentries?: Array<ApiEntry>;
}

export interface ApiUser {
    id: number;
    roles?: Array<ApiUserRole>;
}

export interface ApiUserRole {
    id: string;
}

export interface ApiVideo {
    id: number;
    basename: string;
    audio?: ApiAudio;
    videoscript?: ApiVideoScript | null;
    animethemeentries?: Array<ApiEntry>;
}

export interface ApiVideoScript {
    id: number;
}

// --------------------------------
// Pivot Types
// --------------------------------

export interface ApiAnimeResource {
    as: string | null;
}

export interface ApiArtistMember {
    as: string | null;
}

export interface ApiArtistResource {
    as: string | null;
}

export interface ApiArtistSong {
    as: string | null;
}

export interface ApiStudioResource {
    as: string | null;
}

// --------------------------------
// Response Types
// --------------------------------

export interface ApiAnimeShow<Includes extends keyof ApiAnime = never> {
    anime: ApiAnime & Required<Pick<ApiAnime, Includes>>;
}

export interface ApiAnimeIndex extends ApiIndex {
    anime: Array<ApiAnime>;
}

export interface ApiArtistShow<Includes extends keyof ApiArtist = never> {
    artist: ApiArtist & Required<Pick<ApiArtist, Includes>>;
}

export interface ApiArtistIndex extends ApiIndex {
    artists: Array<ApiArtist>;
}

export interface ApiAnnouncementIndex extends ApiIndex {
    announcements: Array<ApiAnnouncement>;
}

export interface ApiAudioShow<Includes extends keyof ApiAudio = never> {
    audio: ApiAudio & Required<Pick<ApiAudio, Includes>>;
}

export interface ApiAudioIndex extends ApiIndex {
    audios: Array<ApiAudio>;
}

export interface ApiDumpIndex extends ApiIndex {
    dumps: Array<ApiDump>;
}

export interface ApiEntryShow<Includes extends keyof ApiEntry = never> {
    animethemeentry: ApiEntry & Required<Pick<ApiEntry, Includes>>;
}

export interface ApiEntryIndex extends ApiIndex {
    animethemeentries: Array<ApiEntry>;
}

export interface ApiFeaturedThemeShow<Includes extends keyof ApiFeaturedTheme = never> {
    featuredtheme: ApiFeaturedTheme & Required<Pick<ApiFeaturedTheme, Includes>>;
}

export interface ApiImageIndex extends ApiIndex {
    images: Array<ApiImage>;
}

export interface ApiPageShow<Includes extends keyof ApiPage = never> {
    page: ApiPage & Required<Pick<ApiPage, Includes>>;
}

export interface ApiPageIndex extends ApiIndex {
    pages: Array<ApiPage>;
}

export interface ApiPlaylistShow<Includes extends keyof ApiPlaylist = never> {
    playlist: ApiPlaylist & Required<Pick<ApiPlaylist, Includes>>;
}

export interface ApiPlaylistIndex extends ApiIndex {
    playlists: Array<ApiPlaylist>;
}

export interface ApiPlaylistTrackShow<Includes extends keyof ApiPlaylistTrack = never> {
    track: ApiPlaylistTrack & Required<Pick<ApiPlaylistTrack, Includes>>;
}

export interface ApiPlaylistTrackIndex extends ApiIndex {
    tracks: Array<ApiPlaylistTrack>;
}

export interface ApiThemeShow<Includes extends keyof ApiTheme = never> {
    animetheme: ApiTheme & Required<Pick<ApiTheme, Includes>>;
}

export interface ApiThemeIndex extends ApiIndex {
    animethemes: Array<ApiTheme>;
}

export interface ApiSeriesShow<Includes extends keyof ApiSeries = never> {
    series: ApiSeries & Required<Pick<ApiSeries, Includes>>;
}

export interface ApiSeriesIndex extends ApiIndex {
    series: Array<ApiSeries>;
}

export interface ApiSongShow<Includes extends keyof ApiSong = never> {
    song: ApiSong & Required<Pick<ApiSong, Includes>>;
}

export interface ApiSongIndex {
    songs: Array<ApiSong>;
}

export interface ApiStudioShow<Includes extends keyof ApiStudio = never> {
    studio: ApiStudio & Required<Pick<ApiStudio, Includes>>;
}

export interface ApiStudioIndex extends ApiIndex {
    studios: Array<ApiStudio>;
}

export interface ApiUserShow<Includes extends keyof ApiUser = never> {
    user: ApiUser & Required<Pick<ApiUser, Includes>>;
}

export interface ApiVideoShow<Includes extends keyof ApiVideo = never> {
    video: ApiVideo & Required<Pick<ApiVideo, Includes>>;
}

export interface ApiVideoIndex extends ApiIndex {
    videos: Array<ApiVideo>;
}

export type ApiYearIndex = Array<number>;

export type ApiYearShow = Record<string, Array<ApiAnime>>;

// --------------------------------
// Internal Types
// --------------------------------

export interface ApiPerformance {
    artist: ApiArtist;
    song: ApiSong;
    as: string | null;
}

export interface ApiSeason {
    value: string;
    year: ApiYear;
}

export interface ApiYear {
    value: number;
}
