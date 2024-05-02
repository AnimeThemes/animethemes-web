export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Anime = ResourceWithImages & {
  id: Scalars['Int'];
  images: Array<Image>;
  media_format: Maybe<Scalars['String']>;
  name: Scalars['String'];
  resources: Array<Resource>;
  season: Maybe<Scalars['String']>;
  series: Array<Series>;
  slug: Scalars['String'];
  studios: Array<Studio>;
  synonyms: Array<Synonym>;
  synopsis: Maybe<Scalars['String']>;
  themes: Array<Theme>;
  year: Maybe<Scalars['Int']>;
};

export type AnimeSearchResult = EntitySearchResult & {
  data: Array<Anime>;
  nextPage: Maybe<Scalars['Int']>;
};

export type Announcement = {
  content: Scalars['String'];
  id: Maybe<Scalars['Int']>;
};

export type Artist = ResourceWithImages & {
  groups: Array<ArtistMembership>;
  id: Scalars['Int'];
  images: Array<Image>;
  members: Array<ArtistMembership>;
  name: Scalars['String'];
  performances: Array<Performance>;
  resources: Array<Resource>;
  slug: Scalars['String'];
};

export type ArtistMembership = {
  as: Maybe<Scalars['String']>;
  group: Artist;
  member: Artist;
};

export type ArtistSearchResult = EntitySearchResult & {
  data: Array<Artist>;
  nextPage: Maybe<Scalars['Int']>;
};

export type Audio = {
  basename: Scalars['String'];
  filename: Scalars['String'];
  id: Scalars['Int'];
  link: Scalars['String'];
  mimetype: Scalars['String'];
  path: Scalars['String'];
  size: Scalars['Int'];
  videos: Array<Video>;
};

export type Bracket = {
  currentGroup: Maybe<Scalars['Int']>;
  currentRound: Maybe<BracketRound>;
  name: Scalars['String'];
  rounds: Array<BracketRound>;
  slug: Scalars['String'];
};

export type BracketCharacter = {
  id: Scalars['Int'];
  image: Scalars['String'];
  name: Scalars['String'];
  pairing: Maybe<BracketPairing>;
  seed: Scalars['Int'];
  source: Scalars['String'];
  theme: Maybe<Theme>;
};

export type BracketPairing = {
  characterA: BracketCharacter;
  characterB: BracketCharacter;
  group: Scalars['Int'];
  order: Scalars['Int'];
  round: Maybe<BracketRound>;
  votesA: Maybe<Scalars['Int']>;
  votesB: Maybe<Scalars['Int']>;
};

export type BracketRound = {
  bracket: Maybe<Bracket>;
  name: Maybe<Scalars['String']>;
  pairings: Array<BracketPairing>;
  tier: Scalars['Int'];
};

export type Dump = {
  created_at: Scalars['String'];
  id: Scalars['Int'];
  link: Scalars['String'];
  path: Scalars['String'];
};

export type EntitySearchResult = {
  nextPage: Maybe<Scalars['Int']>;
};

export type Entry = {
  episodes: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  nsfw: Scalars['Boolean'];
  spoiler: Scalars['Boolean'];
  theme: Theme;
  version: Maybe<Scalars['Int']>;
  videos: Array<Video>;
};

export type FeaturedTheme = {
  end_at: Scalars['String'];
  entry: Maybe<Entry>;
  id: Scalars['Int'];
  start_at: Scalars['String'];
  video: Maybe<Video>;
};

export type Filter = {
  key: Scalars['String'];
  value?: InputMaybe<Scalars['String']>;
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
  facet: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  link: Scalars['String'];
  mimetype: Scalars['String'];
  path: Scalars['String'];
  size: Scalars['Int'];
};

export type Page = {
  body: Scalars['String'];
  created_at: Scalars['String'];
  id: Maybe<Scalars['Int']>;
  name: Scalars['String'];
  slug: Scalars['String'];
};

export type Performance = {
  artist: Artist;
  as: Maybe<Scalars['String']>;
  song: Song;
};

export type Permission = {
  id: Scalars['Int'];
  name: Scalars['String'];
};

export type Playlist = {
  forward: Array<PlaylistTrack>;
  id: Scalars['String'];
  name: Scalars['String'];
  tracks: Array<PlaylistTrack>;
  tracks_count: Scalars['Int'];
  user: UserPublic;
  visibility: PlaylistVisibility;
};

export type PlaylistSearchResult = EntitySearchResult & {
  data: Array<Playlist>;
  nextPage: Maybe<Scalars['Int']>;
};

export type PlaylistTrack = {
  id: Scalars['String'];
  playlist: Playlist;
  video: Video;
};

export type PlaylistVisibility =
  | 'Private'
  | 'Public'
  | 'Unlisted';

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
  seasonAll: Array<Season>;
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
  id: InputMaybe<Scalars['Int']>;
  slug: InputMaybe<Scalars['String']>;
};


export type QueryAnimeAllArgs = {
  limit: InputMaybe<Scalars['Int']>;
  season: InputMaybe<Scalars['String']>;
  year: InputMaybe<Scalars['Int']>;
};


export type QueryArtistArgs = {
  id: InputMaybe<Scalars['Int']>;
  slug: InputMaybe<Scalars['String']>;
};


export type QueryArtistAllArgs = {
  limit: InputMaybe<Scalars['Int']>;
};


export type QueryBracketArgs = {
  slug: InputMaybe<Scalars['String']>;
};


export type QueryImageAllArgs = {
  facet: InputMaybe<Scalars['String']>;
};


export type QueryPageArgs = {
  id: InputMaybe<Scalars['Int']>;
  slug: InputMaybe<Scalars['String']>;
};


export type QueryPlaylistArgs = {
  id: Scalars['String'];
};


export type QueryPlaylistAllArgs = {
  limit: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Scalars['String']>;
  orderDesc: InputMaybe<Scalars['Boolean']>;
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
  value: Scalars['String'];
  year: Scalars['Int'];
};


export type QuerySeasonAllArgs = {
  year: InputMaybe<Scalars['Int']>;
};


export type QuerySeriesArgs = {
  id: InputMaybe<Scalars['Int']>;
  slug: InputMaybe<Scalars['String']>;
};


export type QuerySeriesAllArgs = {
  limit: InputMaybe<Scalars['Int']>;
};


export type QueryStudioArgs = {
  id: InputMaybe<Scalars['Int']>;
  slug: InputMaybe<Scalars['String']>;
};


export type QueryStudioAllArgs = {
  limit: InputMaybe<Scalars['Int']>;
};


export type QueryThemeArgs = {
  id: InputMaybe<Scalars['Int']>;
};


export type QueryThemeAllArgs = {
  has: InputMaybe<Scalars['String']>;
  limit: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Scalars['String']>;
  orderDesc: InputMaybe<Scalars['Boolean']>;
};


export type QueryVideoAllArgs = {
  limit: InputMaybe<Scalars['Int']>;
  orderBy: InputMaybe<Scalars['String']>;
  orderDesc: InputMaybe<Scalars['Boolean']>;
};


export type QueryYearArgs = {
  value: Scalars['Int'];
};

export type Resource = {
  as: Maybe<Scalars['String']>;
  external_id: Maybe<Scalars['Int']>;
  id: Scalars['Int'];
  link: Maybe<Scalars['String']>;
  site: Maybe<Scalars['String']>;
};

export type ResourceWithImages = {
  images: Array<Image>;
};

export type SearchArgs = {
  filters?: InputMaybe<Array<Filter>>;
  page?: InputMaybe<Scalars['Int']>;
  query?: InputMaybe<Scalars['String']>;
  sortBy?: InputMaybe<Scalars['String']>;
};

export type Season = {
  anime: Array<Anime>;
  value: Scalars['String'];
  year: Maybe<Year>;
};

export type Series = {
  anime: Array<Anime>;
  id: Scalars['Int'];
  name: Scalars['String'];
  slug: Scalars['String'];
};

export type SeriesSearchResult = EntitySearchResult & {
  data: Array<Series>;
  nextPage: Maybe<Scalars['Int']>;
};

export type Song = {
  id: Maybe<Scalars['Int']>;
  performances: Array<Performance>;
  themes: Array<Theme>;
  title: Maybe<Scalars['String']>;
};

export type Studio = ResourceWithImages & {
  anime: Array<Anime>;
  id: Scalars['Int'];
  images: Array<Image>;
  name: Scalars['String'];
  resources: Array<Resource>;
  slug: Scalars['String'];
};

export type StudioSearchResult = EntitySearchResult & {
  data: Array<Studio>;
  nextPage: Maybe<Scalars['Int']>;
};

export type Synonym = {
  anime: Maybe<Anime>;
  id: Scalars['Int'];
  text: Maybe<Scalars['String']>;
};

export type Theme = {
  anime: Anime;
  entries: Array<Entry>;
  group: Maybe<ThemeGroup>;
  id: Scalars['Int'];
  sequence: Maybe<Scalars['Int']>;
  song: Maybe<Song>;
  type: Scalars['String'];
};

export type ThemeGroup = {
  id: Scalars['Int'];
  name: Scalars['String'];
  slug: Scalars['String'];
};

export type ThemeSearchResult = EntitySearchResult & {
  data: Array<Theme>;
  nextPage: Maybe<Scalars['Int']>;
};

export type User = {
  id: Scalars['Int'];
  name: Scalars['String'];
};

export type UserAuth = User & {
  created_at: Scalars['String'];
  email: Scalars['String'];
  email_verified_at: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  name: Scalars['String'];
  permissions: Array<Permission>;
  roles: Array<UserRole>;
};

export type UserPublic = User & {
  id: Scalars['Int'];
  name: Scalars['String'];
};

export type UserRole = {
  color: Maybe<Scalars['String']>;
  default: Scalars['Boolean'];
  name: Scalars['String'];
  permissions: Array<Permission>;
  priority: Maybe<Scalars['Int']>;
};

export type UserScopedQuery = {
  playlistAll: Maybe<Array<Playlist>>;
  user: Maybe<UserAuth>;
};


export type UserScopedQueryPlaylistAllArgs = {
  filterVideoId: InputMaybe<Scalars['Int']>;
};

export type Video = {
  audio: Audio;
  basename: Scalars['String'];
  entries: Array<Entry>;
  filename: Scalars['String'];
  id: Scalars['Int'];
  link: Scalars['String'];
  lyrics: Scalars['Boolean'];
  mimetype: Scalars['String'];
  nc: Scalars['Boolean'];
  overlap: VideoOverlap;
  path: Scalars['String'];
  resolution: Maybe<Scalars['Int']>;
  script: Maybe<VideoScript>;
  size: Scalars['Int'];
  source: Maybe<VideoSource>;
  subbed: Scalars['Boolean'];
  tags: Scalars['String'];
  tracks: Array<PlaylistTrack>;
  uncen: Scalars['Boolean'];
};

export type VideoOverlap =
  | 'NONE'
  | 'OVER'
  | 'TRANSITION';

export type VideoScript = {
  id: Scalars['Int'];
  link: Scalars['String'];
  path: Scalars['String'];
};

export type VideoSource =
  | 'BD'
  | 'DVD'
  | 'LD'
  | 'RAW'
  | 'VHS'
  | 'WEB';

export type Year = {
  seasons: Array<Season>;
  value: Scalars['Int'];
};

export type BracketThemeSummaryCardConstestantFragment = { name: string, source: string, image: string, theme: { type: string, sequence: number | null, id: number, group: { name: string, slug: string } | null, anime: { slug: string, name: string, images: Array<{ link: string, facet: string | null }> }, song: { title: string | null, performances: Array<{ as: string | null, artist: { slug: string, name: string } }> } | null, entries: Array<{ version: number | null, videos: Array<{ id: number, basename: string, tags: string, audio: { basename: string } }> }> } | null };

export type VideoButtonAnimeFragment = { slug: string };

export type VideoButtonThemeFragment = { type: string, sequence: number | null, group: { slug: string } | null };

export type VideoButtonEntryFragment = { version: number | null };

export type VideoButtonVideoFragment = { id: number, tags: string, resolution: number | null, nc: boolean, subbed: boolean, lyrics: boolean, uncen: boolean, source: VideoSource | null, overlap: VideoOverlap };

export type AnimeSummaryCardAnimeFragment = { slug: string, name: string, year: number | null, season: string | null, media_format: string | null, themes: Array<{ group: { name: string, slug: string } | null }>, images: Array<{ link: string, facet: string | null }> };

export type AnimeSummaryCardAnimeExpandableFragment = { themes: Array<{ id: number, type: string, sequence: number | null, group: { name: string, slug: string } | null, anime: { slug: string }, entries: Array<{ version: number | null, episodes: string | null, spoiler: boolean, nsfw: boolean, videos: Array<{ tags: string, resolution: number | null, nc: boolean, subbed: boolean, lyrics: boolean, uncen: boolean, source: VideoSource | null, overlap: VideoOverlap }> }>, song: { title: string | null } | null }> };

export type ArtistSummaryCardArtistFragment = { slug: string, name: string, images: Array<{ link: string, facet: string | null }> };

export type PlaylistSummaryCardPlaylistFragment = { id: string, name: string, visibility: PlaylistVisibility, tracks_count: number };

export type PlaylistSummaryCardShowOwnerFragment = { user: { name: string } };

export type StudioSummaryCardStudioFragment = { slug: string, name: string, images: Array<{ link: string, facet: string | null }> };

export type ThemeDetailCardThemeFragment = { type: string, sequence: number | null, id: number, group: { name: string, slug: string } | null, anime: { slug: string, name: string, images: Array<{ link: string, facet: string | null }> }, song: { title: string | null, performances: Array<{ as: string | null, artist: { slug: string, name: string } }> } | null, entries: Array<{ version: number | null, episodes: string | null, spoiler: boolean, nsfw: boolean, videos: Array<{ filename: string, tags: string, id: number, basename: string, resolution: number | null, nc: boolean, subbed: boolean, lyrics: boolean, uncen: boolean, source: VideoSource | null, overlap: VideoOverlap, audio: { basename: string } }> }> };

export type ThemeSummaryCardThemeFragment = { type: string, sequence: number | null, id: number, group: { name: string, slug: string } | null, anime: { slug: string, name: string, images: Array<{ link: string, facet: string | null }> }, song: { title: string | null, performances: Array<{ as: string | null, artist: { slug: string, name: string } }> } | null, entries: Array<{ version: number | null, videos: Array<{ id: number, basename: string, tags: string, audio: { basename: string } }> }> };

export type ThemeSummaryCardArtistFragment = { slug: string };

export type ThemeSummaryCardThemeExpandableFragment = { id: number, type: string, sequence: number | null, anime: { slug: string }, entries: Array<{ version: number | null, episodes: string | null, spoiler: boolean, nsfw: boolean, videos: Array<{ tags: string, resolution: number | null, nc: boolean, subbed: boolean, lyrics: boolean, uncen: boolean, source: VideoSource | null, overlap: VideoOverlap }> }>, song: { title: string | null } | null, group: { slug: string } | null };

export type ThemeSummaryCardQueryVariables = Exact<{
  themeId: Scalars['Int'];
}>;


export type ThemeSummaryCardQuery = { theme: { type: string, sequence: number | null, id: number, anime: { year: number | null, season: string | null, slug: string, name: string, images: Array<{ link: string, facet: string | null }> }, group: { name: string, slug: string } | null, song: { title: string | null, performances: Array<{ as: string | null, artist: { slug: string, name: string } }> } | null, entries: Array<{ version: number | null, videos: Array<{ id: number, basename: string, tags: string, audio: { basename: string } }> }> } | null };

export type VideoSummaryCardVideoFragment = { id: number, basename: string, tags: string, entries: Array<{ id: number, version: number | null, theme: { id: number, type: string, sequence: number | null, group: { name: string, slug: string } | null, anime: { slug: string, name: string, images: Array<{ link: string, facet: string | null }> }, song: { title: string | null, performances: Array<{ as: string | null, artist: { slug: string, name: string } }> } | null } }>, audio: { basename: string } };

export type PlaylistEditDialogPlaylistFragment = { id: string, name: string, visibility: PlaylistVisibility };

export type PlaylistRemoveDialogPlaylistFragment = { id: string, name: string, visibility: PlaylistVisibility, tracks_count: number };

export type PlaylistTrackAddDialogVideoFragment = { id: number, basename: string, tags: string, entries: Array<{ id: number, version: number | null, theme: { id: number, type: string, sequence: number | null, group: { name: string, slug: string } | null, anime: { slug: string, name: string, images: Array<{ link: string, facet: string | null }> }, song: { title: string | null, performances: Array<{ as: string | null, artist: { slug: string, name: string } }> } | null } }>, audio: { basename: string } };

export type PlaylistTrackAddFormPlaylistQueryVariables = Exact<{
  filterVideoId: Scalars['Int'];
}>;


export type PlaylistTrackAddFormPlaylistQuery = { me: { playlistAll: Array<{ id: string, tracks_count: number, name: string, visibility: PlaylistVisibility }> | null, playlistAllFiltered: Array<{ id: string, tracks: Array<{ id: string }> }> | null } };

export type PlaylistTrackRemoveDialogPlaylistFragment = { id: string, name: string };

export type PlaylistTrackRemoveDialogVideoFragment = { id: number, basename: string, tags: string, entries: Array<{ id: number, version: number | null, theme: { id: number, type: string, sequence: number | null, group: { name: string, slug: string } | null, anime: { slug: string, name: string, images: Array<{ link: string, facet: string | null }> }, song: { title: string | null, performances: Array<{ as: string | null, artist: { slug: string, name: string } }> } | null } }>, audio: { basename: string } };

export type FeaturedThemeThemeFragment = { type: string, sequence: number | null, id: number, anime: { slug: string, name: string, images: Array<{ link: string, facet: string | null }> }, entries: Array<{ version: number | null, videos: Array<{ basename: string, id: number, tags: string, audio: { basename: string } }> }>, group: { name: string, slug: string } | null, song: { title: string | null, performances: Array<{ as: string | null, artist: { slug: string, name: string } }> } | null };

export type AnimeThemeFilterThemeFragment = { type: string, sequence: number | null, id: number, group: { name: string, slug: string } | null, anime: { slug: string, name: string, images: Array<{ link: string, facet: string | null }> }, song: { title: string | null, performances: Array<{ as: string | null, artist: { slug: string, name: string } }> } | null, entries: Array<{ version: number | null, episodes: string | null, spoiler: boolean, nsfw: boolean, videos: Array<{ filename: string, tags: string, id: number, basename: string, resolution: number | null, nc: boolean, subbed: boolean, lyrics: boolean, uncen: boolean, source: VideoSource | null, overlap: VideoOverlap, audio: { basename: string } }> }> };

type CoverImageResourceWithImages_Anime_Fragment = { images: Array<{ link: string, facet: string | null }> };

type CoverImageResourceWithImages_Artist_Fragment = { images: Array<{ link: string, facet: string | null }> };

type CoverImageResourceWithImages_Studio_Fragment = { images: Array<{ link: string, facet: string | null }> };

export type CoverImageResourceWithImagesFragment = CoverImageResourceWithImages_Anime_Fragment | CoverImageResourceWithImages_Artist_Fragment | CoverImageResourceWithImages_Studio_Fragment;

type MultiCoverImageResourceWithImages_Anime_Fragment = { name: string, images: Array<{ link: string, facet: string | null }> };

type MultiCoverImageResourceWithImages_Artist_Fragment = { name: string, images: Array<{ link: string, facet: string | null }> };

type MultiCoverImageResourceWithImages_Studio_Fragment = { name: string, images: Array<{ link: string, facet: string | null }> };

export type MultiCoverImageResourceWithImagesFragment = MultiCoverImageResourceWithImages_Anime_Fragment | MultiCoverImageResourceWithImages_Artist_Fragment | MultiCoverImageResourceWithImages_Studio_Fragment;

export type ProfileImageUserFragment = { name: string, email: string };

export type StudioCoverImageStudioFragment = { images: Array<{ link: string, facet: string | null }>, anime: Array<{ name: string, images: Array<{ link: string, facet: string | null }> }> };

export type ThemeMenuThemeFragment = { id: number, type: string, sequence: number | null, group: { name: string, slug: string } | null, anime: { slug: string, name: string, images: Array<{ link: string, facet: string | null }> }, song: { title: string | null, performances: Array<{ as: string | null, artist: { slug: string, name: string } }> } | null, entries: Array<{ version: number | null, videos: Array<{ id: number, basename: string, tags: string, audio: { basename: string } }> }> };

export type SearchAnimeQueryVariables = Exact<{
  args: SearchArgs;
}>;


export type SearchAnimeQuery = { searchAnime: { nextPage: number | null, data: Array<{ slug: string, name: string, year: number | null, season: string | null, media_format: string | null, themes: Array<{ id: number, type: string, sequence: number | null, group: { name: string, slug: string } | null, anime: { slug: string }, entries: Array<{ version: number | null, episodes: string | null, spoiler: boolean, nsfw: boolean, videos: Array<{ tags: string, resolution: number | null, nc: boolean, subbed: boolean, lyrics: boolean, uncen: boolean, source: VideoSource | null, overlap: VideoOverlap }> }>, song: { title: string | null } | null }>, images: Array<{ link: string, facet: string | null }> }> } };

export type SearchArtistQueryVariables = Exact<{
  args: SearchArgs;
}>;


export type SearchArtistQuery = { searchArtist: { nextPage: number | null, data: Array<{ slug: string, name: string, images: Array<{ link: string, facet: string | null }> }> } };

export type SearchGlobalQueryVariables = Exact<{
  args: SearchArgs;
}>;


export type SearchGlobalQuery = { search: { anime: Array<{ slug: string, name: string, year: number | null, season: string | null, media_format: string | null, themes: Array<{ id: number, type: string, sequence: number | null, group: { name: string, slug: string } | null, anime: { slug: string }, entries: Array<{ version: number | null, episodes: string | null, spoiler: boolean, nsfw: boolean, videos: Array<{ tags: string, resolution: number | null, nc: boolean, subbed: boolean, lyrics: boolean, uncen: boolean, source: VideoSource | null, overlap: VideoOverlap }> }>, song: { title: string | null } | null }>, images: Array<{ link: string, facet: string | null }> }>, themes: Array<{ type: string, sequence: number | null, id: number, group: { name: string, slug: string } | null, anime: { slug: string, name: string, images: Array<{ link: string, facet: string | null }> }, song: { title: string | null, performances: Array<{ as: string | null, artist: { slug: string, name: string } }> } | null, entries: Array<{ version: number | null, episodes: string | null, spoiler: boolean, nsfw: boolean, videos: Array<{ id: number, basename: string, tags: string, resolution: number | null, nc: boolean, subbed: boolean, lyrics: boolean, uncen: boolean, source: VideoSource | null, overlap: VideoOverlap, audio: { basename: string } }> }> }>, artists: Array<{ slug: string, name: string, images: Array<{ link: string, facet: string | null }> }>, series: Array<{ slug: string, name: string }>, studios: Array<{ slug: string, name: string }>, playlists: Array<{ id: string, name: string, visibility: PlaylistVisibility, tracks_count: number, user: { name: string } }> } };

export type SearchPlaylistQueryVariables = Exact<{
  args: SearchArgs;
}>;


export type SearchPlaylistQuery = { searchPlaylist: { nextPage: number | null, data: Array<{ id: string, name: string, visibility: PlaylistVisibility, tracks_count: number, user: { name: string } }> } };

export type SearchSeriesQueryVariables = Exact<{
  args: SearchArgs;
}>;


export type SearchSeriesQuery = { searchSeries: { nextPage: number | null, data: Array<{ slug: string, name: string }> } };

export type SearchStudioQueryVariables = Exact<{
  args: SearchArgs;
}>;


export type SearchStudioQuery = { searchStudio: { nextPage: number | null, data: Array<{ slug: string, name: string, images: Array<{ link: string, facet: string | null }>, anime: Array<{ name: string, images: Array<{ link: string, facet: string | null }> }> }> } };

export type SearchThemeQueryVariables = Exact<{
  args: SearchArgs;
}>;


export type SearchThemeQuery = { searchTheme: { nextPage: number | null, data: Array<{ type: string, sequence: number | null, id: number, group: { name: string, slug: string } | null, anime: { slug: string, name: string, images: Array<{ link: string, facet: string | null }> }, song: { title: string | null, performances: Array<{ as: string | null, artist: { slug: string, name: string } }> } | null, entries: Array<{ version: number | null, episodes: string | null, spoiler: boolean, nsfw: boolean, videos: Array<{ id: number, basename: string, tags: string, resolution: number | null, nc: boolean, subbed: boolean, lyrics: boolean, uncen: boolean, source: VideoSource | null, overlap: VideoOverlap, audio: { basename: string } }> }> }> } };

export type ThemeTableThemeFragment = { id: number, type: string, sequence: number | null, anime: { slug: string }, entries: Array<{ version: number | null, episodes: string | null, spoiler: boolean, nsfw: boolean, videos: Array<{ tags: string, resolution: number | null, nc: boolean, subbed: boolean, lyrics: boolean, uncen: boolean, source: VideoSource | null, overlap: VideoOverlap }> }>, song: { title: string | null } | null, group: { slug: string } | null };

export type ContentWarningTagsEntryFragment = { spoiler: boolean, nsfw: boolean };

export type EpisodeTagEntryFragment = { episodes: string | null };

export type ThemeEntryTagsEntryFragment = { episodes: string | null, spoiler: boolean, nsfw: boolean };

export type VideoTagsVideoFragment = { resolution: number | null, nc: boolean, subbed: boolean, lyrics: boolean, uncen: boolean, source: VideoSource | null, overlap: VideoOverlap };

export type PlaylistRemoveToastPlaylistFragment = { id: string, name: string };

export type PlaylistTrackAddToastPlaylistFragment = { id: string, name: string };

export type PlaylistTrackAddToastVideoFragment = { entries: Array<{ theme: { song: { title: string | null } | null } }> };

export type PlaylistTrackRemoveToastPlaylistFragment = { id: string, name: string };

export type PlaylistTrackRemoveToastVideoFragment = { entries: Array<{ theme: { song: { title: string | null } | null } }> };

export type PerformancesSongFragment = { performances: Array<{ as: string | null, artist: { slug: string, name: string } }> };

export type PerformancesArtistFragment = { slug: string };

export type SongTitleSongFragment = { title: string | null };

export type SongTitleWithArtistsSongFragment = { title: string | null, performances: Array<{ as: string | null, artist: { slug: string, name: string } }> };

export type SongTitleWithArtistsArtistFragment = { slug: string };

export type VideoScriptVideoFragment = { script: { link: string } | null };

export type CheckAuthQueryVariables = Exact<{ [key: string]: never; }>;


export type CheckAuthQuery = { me: { user: { id: number, name: string, email: string, permissions: Array<{ name: string }>, roles: Array<{ permissions: Array<{ name: string }> }> } | null } };

export type RandomThemeQueryVariables = Exact<{
  args: SearchArgs;
}>;


export type RandomThemeQuery = { searchTheme: { data: Array<{ type: string, sequence: number | null, id: number, entries: Array<{ version: number | null, episodes: string | null, spoiler: boolean, nsfw: boolean, videos: Array<{ basename: string, id: number, tags: string, resolution: number | null, nc: boolean, subbed: boolean, lyrics: boolean, uncen: boolean, source: VideoSource | null, overlap: VideoOverlap, audio: { basename: string } }> }>, group: { name: string, slug: string } | null, anime: { slug: string, name: string, images: Array<{ link: string, facet: string | null }> }, song: { title: string | null, performances: Array<{ as: string | null, artist: { slug: string, name: string } }> } | null }> } };

export type DocumentPageQueryVariables = Exact<{
  pageSlug: Scalars['String'];
}>;


export type DocumentPageQuery = { page: { name: string, body: string, created_at: string } | null };

export type DocumentPageAllQueryVariables = Exact<{ [key: string]: never; }>;


export type DocumentPageAllQuery = { pageAll: Array<{ slug: string }> };

export type DumpIndexPageQueryVariables = Exact<{ [key: string]: never; }>;


export type DumpIndexPageQuery = { dumpAll: Array<{ path: string, link: string, created_at: string }> };

export type VideoPageAnimeFragment = { name: string, slug: string, year: number | null, season: string | null, media_format: string | null, themes: Array<{ id: number, type: string, sequence: number | null, song: { title: string | null, performances: Array<{ as: string | null, artist: { slug: string, name: string, images: Array<{ link: string, facet: string | null }> } }> } | null, entries: Array<{ id: number, episodes: string | null, nsfw: boolean, spoiler: boolean, version: number | null, videos: Array<{ id: number, basename: string, filename: string, lyrics: boolean, nc: boolean, overlap: VideoOverlap, resolution: number | null, source: VideoSource | null, subbed: boolean, uncen: boolean, tags: string, entries: Array<{ theme: { type: string, sequence: number | null, id: number, group: { name: string, slug: string } | null, anime: { slug: string, name: string, images: Array<{ link: string, facet: string | null }> }, song: { title: string | null, performances: Array<{ as: string | null, artist: { slug: string, name: string } }> } | null, entries: Array<{ version: number | null, videos: Array<{ id: number, basename: string, tags: string, audio: { basename: string } }> }> } }>, tracks: Array<{ playlist: { id: string, name: string, visibility: PlaylistVisibility, tracks_count: number, user: { name: string } } }>, audio: { basename: string }, script: { link: string } | null }> }>, group: { name: string, slug: string } | null, anime: { slug: string, name: string, images: Array<{ link: string, facet: string | null }> } }>, images: Array<{ facet: string | null, link: string }>, series: Array<{ slug: string, name: string }>, studios: Array<{ slug: string, name: string, images: Array<{ link: string, facet: string | null }> }> };

export type VideoPageQueryVariables = Exact<{
  animeSlug: Scalars['String'];
}>;


export type VideoPageQuery = { anime: { name: string, slug: string, year: number | null, season: string | null, media_format: string | null, themes: Array<{ id: number, type: string, sequence: number | null, song: { title: string | null, performances: Array<{ as: string | null, artist: { slug: string, name: string, images: Array<{ link: string, facet: string | null }> } }> } | null, entries: Array<{ id: number, episodes: string | null, nsfw: boolean, spoiler: boolean, version: number | null, videos: Array<{ id: number, basename: string, filename: string, lyrics: boolean, nc: boolean, overlap: VideoOverlap, resolution: number | null, source: VideoSource | null, subbed: boolean, uncen: boolean, tags: string, entries: Array<{ theme: { type: string, sequence: number | null, id: number, group: { name: string, slug: string } | null, anime: { slug: string, name: string, images: Array<{ link: string, facet: string | null }> }, song: { title: string | null, performances: Array<{ as: string | null, artist: { slug: string, name: string } }> } | null, entries: Array<{ version: number | null, videos: Array<{ id: number, basename: string, tags: string, audio: { basename: string } }> }> } }>, tracks: Array<{ playlist: { id: string, name: string, visibility: PlaylistVisibility, tracks_count: number, user: { name: string } } }>, audio: { basename: string }, script: { link: string } | null }> }>, group: { name: string, slug: string } | null, anime: { slug: string, name: string, images: Array<{ link: string, facet: string | null }> } }>, images: Array<{ facet: string | null, link: string }>, series: Array<{ slug: string, name: string }>, studios: Array<{ slug: string, name: string, images: Array<{ link: string, facet: string | null }> }> } | null };

export type VideoPageAllQueryVariables = Exact<{ [key: string]: never; }>;


export type VideoPageAllQuery = { animeAll: Array<{ name: string, slug: string, year: number | null, season: string | null, media_format: string | null, themes: Array<{ id: number, type: string, sequence: number | null, song: { title: string | null, performances: Array<{ as: string | null, artist: { slug: string, name: string, images: Array<{ link: string, facet: string | null }> } }> } | null, entries: Array<{ id: number, episodes: string | null, nsfw: boolean, spoiler: boolean, version: number | null, videos: Array<{ id: number, basename: string, filename: string, lyrics: boolean, nc: boolean, overlap: VideoOverlap, resolution: number | null, source: VideoSource | null, subbed: boolean, uncen: boolean, tags: string, entries: Array<{ theme: { type: string, sequence: number | null, id: number, group: { name: string, slug: string } | null, anime: { slug: string, name: string, images: Array<{ link: string, facet: string | null }> }, song: { title: string | null, performances: Array<{ as: string | null, artist: { slug: string, name: string } }> } | null, entries: Array<{ version: number | null, videos: Array<{ id: number, basename: string, tags: string, audio: { basename: string } }> }> } }>, tracks: Array<{ playlist: { id: string, name: string, visibility: PlaylistVisibility, tracks_count: number, user: { name: string } } }>, audio: { basename: string }, script: { link: string } | null }> }>, group: { name: string, slug: string } | null, anime: { slug: string, name: string, images: Array<{ link: string, facet: string | null }> } }>, images: Array<{ facet: string | null, link: string }>, series: Array<{ slug: string, name: string }>, studios: Array<{ slug: string, name: string, images: Array<{ link: string, facet: string | null }> }> }> };

export type AnimeDetailPageAnimeFragment = { slug: string, name: string, season: string | null, year: number | null, synopsis: string | null, media_format: string | null, synonyms: Array<{ text: string | null }>, series: Array<{ slug: string, name: string }>, studios: Array<{ slug: string, name: string }>, resources: Array<{ site: string | null, link: string | null, as: string | null }>, themes: Array<{ type: string, sequence: number | null, id: number, group: { name: string, slug: string } | null, anime: { slug: string, name: string, images: Array<{ link: string, facet: string | null }> }, song: { title: string | null, performances: Array<{ as: string | null, artist: { slug: string, name: string } }> } | null, entries: Array<{ version: number | null, episodes: string | null, spoiler: boolean, nsfw: boolean, videos: Array<{ filename: string, tags: string, id: number, basename: string, resolution: number | null, nc: boolean, subbed: boolean, lyrics: boolean, uncen: boolean, source: VideoSource | null, overlap: VideoOverlap, audio: { basename: string } }> }> }>, images: Array<{ link: string, facet: string | null }> };

export type AnimeDetailPageQueryVariables = Exact<{
  animeSlug: Scalars['String'];
}>;


export type AnimeDetailPageQuery = { anime: { slug: string, name: string, season: string | null, year: number | null, synopsis: string | null, media_format: string | null, synonyms: Array<{ text: string | null }>, series: Array<{ slug: string, name: string }>, studios: Array<{ slug: string, name: string }>, resources: Array<{ site: string | null, link: string | null, as: string | null }>, themes: Array<{ type: string, sequence: number | null, id: number, group: { name: string, slug: string } | null, anime: { slug: string, name: string, images: Array<{ link: string, facet: string | null }> }, song: { title: string | null, performances: Array<{ as: string | null, artist: { slug: string, name: string } }> } | null, entries: Array<{ version: number | null, episodes: string | null, spoiler: boolean, nsfw: boolean, videos: Array<{ filename: string, tags: string, id: number, basename: string, resolution: number | null, nc: boolean, subbed: boolean, lyrics: boolean, uncen: boolean, source: VideoSource | null, overlap: VideoOverlap, audio: { basename: string } }> }> }>, images: Array<{ link: string, facet: string | null }> } | null };

export type AnimeDetailPageAllQueryVariables = Exact<{ [key: string]: never; }>;


export type AnimeDetailPageAllQuery = { animeAll: Array<{ slug: string, name: string, season: string | null, year: number | null, synopsis: string | null, media_format: string | null, synonyms: Array<{ text: string | null }>, series: Array<{ slug: string, name: string }>, studios: Array<{ slug: string, name: string }>, resources: Array<{ site: string | null, link: string | null, as: string | null }>, themes: Array<{ type: string, sequence: number | null, id: number, group: { name: string, slug: string } | null, anime: { slug: string, name: string, images: Array<{ link: string, facet: string | null }> }, song: { title: string | null, performances: Array<{ as: string | null, artist: { slug: string, name: string } }> } | null, entries: Array<{ version: number | null, episodes: string | null, spoiler: boolean, nsfw: boolean, videos: Array<{ filename: string, tags: string, id: number, basename: string, resolution: number | null, nc: boolean, subbed: boolean, lyrics: boolean, uncen: boolean, source: VideoSource | null, overlap: VideoOverlap, audio: { basename: string } }> }> }>, images: Array<{ link: string, facet: string | null }> }> };

export type AnimeIndexPageQueryVariables = Exact<{ [key: string]: never; }>;


export type AnimeIndexPageQuery = { animeAll: Array<{ slug: string, name: string }> };

export type RevalidateApiQueryVariables = Exact<{ [key: string]: never; }>;


export type RevalidateApiQuery = { me: { user: { permissions: Array<{ name: string }>, roles: Array<{ permissions: Array<{ name: string }> }> } | null } };

export type RevalidateAnimeQueryVariables = Exact<{
  animeSlug: Scalars['String'];
}>;


export type RevalidateAnimeQuery = { anime: { year: number | null, season: string | null, series: Array<{ slug: string }>, studios: Array<{ slug: string }>, themes: Array<{ type: string, sequence: number | null, song: { performances: Array<{ artist: { slug: string } }> } | null, entries: Array<{ version: number | null, videos: Array<{ tags: string }> }>, group: { slug: string } | null }> } | null };

export type ArtistDetailPageArtistFragment = { slug: string, name: string, performances: Array<{ as: string | null, song: { id: number | null, title: string | null, performances: Array<{ as: string | null, artist: { slug: string, name: string } }>, themes: Array<{ id: number, type: string, sequence: number | null, group: { name: string, slug: string } | null, anime: { slug: string, year: number | null, season: string | null, name: string, images: Array<{ link: string, facet: string | null }> }, song: { title: string | null, performances: Array<{ as: string | null, artist: { slug: string, name: string } }> } | null, entries: Array<{ version: number | null, episodes: string | null, spoiler: boolean, nsfw: boolean, videos: Array<{ id: number, basename: string, tags: string, resolution: number | null, nc: boolean, subbed: boolean, lyrics: boolean, uncen: boolean, source: VideoSource | null, overlap: VideoOverlap, audio: { basename: string } }> }> }> } }>, members: Array<{ as: string | null, member: { slug: string, name: string } }>, groups: Array<{ as: string | null, group: { slug: string, name: string, performances: Array<{ as: string | null, song: { id: number | null, title: string | null, performances: Array<{ as: string | null, artist: { slug: string, name: string } }>, themes: Array<{ id: number, type: string, sequence: number | null, group: { name: string, slug: string } | null, anime: { slug: string, year: number | null, season: string | null, name: string, images: Array<{ link: string, facet: string | null }> }, song: { title: string | null, performances: Array<{ as: string | null, artist: { slug: string, name: string } }> } | null, entries: Array<{ version: number | null, episodes: string | null, spoiler: boolean, nsfw: boolean, videos: Array<{ id: number, basename: string, tags: string, resolution: number | null, nc: boolean, subbed: boolean, lyrics: boolean, uncen: boolean, source: VideoSource | null, overlap: VideoOverlap, audio: { basename: string } }> }> }> } }> } }>, resources: Array<{ link: string | null, site: string | null, as: string | null }>, images: Array<{ facet: string | null, link: string }> };

export type ArtistDetailPageQueryVariables = Exact<{
  artistSlug: Scalars['String'];
}>;


export type ArtistDetailPageQuery = { artist: { slug: string, name: string, performances: Array<{ as: string | null, song: { id: number | null, title: string | null, performances: Array<{ as: string | null, artist: { slug: string, name: string } }>, themes: Array<{ id: number, type: string, sequence: number | null, group: { name: string, slug: string } | null, anime: { slug: string, year: number | null, season: string | null, name: string, images: Array<{ link: string, facet: string | null }> }, song: { title: string | null, performances: Array<{ as: string | null, artist: { slug: string, name: string } }> } | null, entries: Array<{ version: number | null, episodes: string | null, spoiler: boolean, nsfw: boolean, videos: Array<{ id: number, basename: string, tags: string, resolution: number | null, nc: boolean, subbed: boolean, lyrics: boolean, uncen: boolean, source: VideoSource | null, overlap: VideoOverlap, audio: { basename: string } }> }> }> } }>, members: Array<{ as: string | null, member: { slug: string, name: string } }>, groups: Array<{ as: string | null, group: { slug: string, name: string, performances: Array<{ as: string | null, song: { id: number | null, title: string | null, performances: Array<{ as: string | null, artist: { slug: string, name: string } }>, themes: Array<{ id: number, type: string, sequence: number | null, group: { name: string, slug: string } | null, anime: { slug: string, year: number | null, season: string | null, name: string, images: Array<{ link: string, facet: string | null }> }, song: { title: string | null, performances: Array<{ as: string | null, artist: { slug: string, name: string } }> } | null, entries: Array<{ version: number | null, episodes: string | null, spoiler: boolean, nsfw: boolean, videos: Array<{ id: number, basename: string, tags: string, resolution: number | null, nc: boolean, subbed: boolean, lyrics: boolean, uncen: boolean, source: VideoSource | null, overlap: VideoOverlap, audio: { basename: string } }> }> }> } }> } }>, resources: Array<{ link: string | null, site: string | null, as: string | null }>, images: Array<{ facet: string | null, link: string }> } | null };

export type ArtistDetailPageAllQueryVariables = Exact<{ [key: string]: never; }>;


export type ArtistDetailPageAllQuery = { artistAll: Array<{ slug: string, name: string, performances: Array<{ as: string | null, song: { id: number | null, title: string | null, performances: Array<{ as: string | null, artist: { slug: string, name: string } }>, themes: Array<{ id: number, type: string, sequence: number | null, group: { name: string, slug: string } | null, anime: { slug: string, year: number | null, season: string | null, name: string, images: Array<{ link: string, facet: string | null }> }, song: { title: string | null, performances: Array<{ as: string | null, artist: { slug: string, name: string } }> } | null, entries: Array<{ version: number | null, episodes: string | null, spoiler: boolean, nsfw: boolean, videos: Array<{ id: number, basename: string, tags: string, resolution: number | null, nc: boolean, subbed: boolean, lyrics: boolean, uncen: boolean, source: VideoSource | null, overlap: VideoOverlap, audio: { basename: string } }> }> }> } }>, members: Array<{ as: string | null, member: { slug: string, name: string } }>, groups: Array<{ as: string | null, group: { slug: string, name: string, performances: Array<{ as: string | null, song: { id: number | null, title: string | null, performances: Array<{ as: string | null, artist: { slug: string, name: string } }>, themes: Array<{ id: number, type: string, sequence: number | null, group: { name: string, slug: string } | null, anime: { slug: string, year: number | null, season: string | null, name: string, images: Array<{ link: string, facet: string | null }> }, song: { title: string | null, performances: Array<{ as: string | null, artist: { slug: string, name: string } }> } | null, entries: Array<{ version: number | null, episodes: string | null, spoiler: boolean, nsfw: boolean, videos: Array<{ id: number, basename: string, tags: string, resolution: number | null, nc: boolean, subbed: boolean, lyrics: boolean, uncen: boolean, source: VideoSource | null, overlap: VideoOverlap, audio: { basename: string } }> }> }> } }> } }>, resources: Array<{ link: string | null, site: string | null, as: string | null }>, images: Array<{ facet: string | null, link: string }> }> };

export type ArtistIndexPageQueryVariables = Exact<{ [key: string]: never; }>;


export type ArtistIndexPageQuery = { artistAll: Array<{ slug: string, name: string }> };

export type DocumentIndexPageQueryVariables = Exact<{ [key: string]: never; }>;


export type DocumentIndexPageQuery = { pageAll: Array<{ slug: string, name: string, created_at: string }> };

export type CharacterFragmentFragment = { id: number, seed: number, name: string, source: string, image: string, theme: { type: string, sequence: number | null, id: number, group: { name: string, slug: string } | null, anime: { slug: string, name: string, images: Array<{ link: string, facet: string | null }> }, song: { title: string | null, performances: Array<{ as: string | null, artist: { slug: string, name: string } }> } | null, entries: Array<{ version: number | null, videos: Array<{ id: number, basename: string, tags: string, audio: { basename: string } }> }> } | null };

export type RoundFragmentFragment = { tier: number, name: string | null, pairings: Array<{ order: number, group: number, votesA: number | null, votesB: number | null, characterA: { id: number, seed: number, name: string, source: string, image: string, theme: { type: string, sequence: number | null, id: number, group: { name: string, slug: string } | null, anime: { slug: string, name: string, images: Array<{ link: string, facet: string | null }> }, song: { title: string | null, performances: Array<{ as: string | null, artist: { slug: string, name: string } }> } | null, entries: Array<{ version: number | null, videos: Array<{ id: number, basename: string, tags: string, audio: { basename: string } }> }> } | null }, characterB: { id: number, seed: number, name: string, source: string, image: string, theme: { type: string, sequence: number | null, id: number, group: { name: string, slug: string } | null, anime: { slug: string, name: string, images: Array<{ link: string, facet: string | null }> }, song: { title: string | null, performances: Array<{ as: string | null, artist: { slug: string, name: string } }> } | null, entries: Array<{ version: number | null, videos: Array<{ id: number, basename: string, tags: string, audio: { basename: string } }> }> } | null } }> };

export type BracketPageQueryVariables = Exact<{
  bracketSlug: Scalars['String'];
}>;


export type BracketPageQuery = { bracket: { name: string, currentGroup: number | null, currentRound: { tier: number, name: string | null, pairings: Array<{ order: number, group: number, votesA: number | null, votesB: number | null, characterA: { id: number, seed: number, name: string, source: string, image: string, theme: { type: string, sequence: number | null, id: number, group: { name: string, slug: string } | null, anime: { slug: string, name: string, images: Array<{ link: string, facet: string | null }> }, song: { title: string | null, performances: Array<{ as: string | null, artist: { slug: string, name: string } }> } | null, entries: Array<{ version: number | null, videos: Array<{ id: number, basename: string, tags: string, audio: { basename: string } }> }> } | null }, characterB: { id: number, seed: number, name: string, source: string, image: string, theme: { type: string, sequence: number | null, id: number, group: { name: string, slug: string } | null, anime: { slug: string, name: string, images: Array<{ link: string, facet: string | null }> }, song: { title: string | null, performances: Array<{ as: string | null, artist: { slug: string, name: string } }> } | null, entries: Array<{ version: number | null, videos: Array<{ id: number, basename: string, tags: string, audio: { basename: string } }> }> } | null } }> } | null, rounds: Array<{ tier: number, name: string | null, pairings: Array<{ order: number, group: number, votesA: number | null, votesB: number | null, characterA: { id: number, seed: number, name: string, source: string, image: string, theme: { type: string, sequence: number | null, id: number, group: { name: string, slug: string } | null, anime: { slug: string, name: string, images: Array<{ link: string, facet: string | null }> }, song: { title: string | null, performances: Array<{ as: string | null, artist: { slug: string, name: string } }> } | null, entries: Array<{ version: number | null, videos: Array<{ id: number, basename: string, tags: string, audio: { basename: string } }> }> } | null }, characterB: { id: number, seed: number, name: string, source: string, image: string, theme: { type: string, sequence: number | null, id: number, group: { name: string, slug: string } | null, anime: { slug: string, name: string, images: Array<{ link: string, facet: string | null }> }, song: { title: string | null, performances: Array<{ as: string | null, artist: { slug: string, name: string } }> } | null, entries: Array<{ version: number | null, videos: Array<{ id: number, basename: string, tags: string, audio: { basename: string } }> }> } | null } }> }> } | null };

export type BracketPageAllQueryVariables = Exact<{ [key: string]: never; }>;


export type BracketPageAllQuery = { bracketAll: Array<{ slug: string }> };

export type AwardPageThemeQueryVariables = Exact<{
  themeId: InputMaybe<Scalars['Int']>;
}>;


export type AwardPageThemeQuery = { theme: { id: number, type: string, sequence: number | null, anime: { slug: string, name: string, images: Array<{ facet: string | null, link: string }> }, song: { title: string | null, performances: Array<{ as: string | null, artist: { slug: string, name: string } }> } | null, entries: Array<{ version: number | null, videos: Array<{ basename: string, tags: string }> }>, group: { slug: string } | null } | null };

export type EventPageQueryVariables = Exact<{ [key: string]: never; }>;


export type EventPageQuery = { bracketAll: Array<{ slug: string, name: string }> };

export type HomePageRecentlyAddedQueryVariables = Exact<{ [key: string]: never; }>;


export type HomePageRecentlyAddedQuery = { videoAll: Array<{ id: number, basename: string, tags: string, entries: Array<{ id: number, version: number | null, theme: { id: number, type: string, sequence: number | null, group: { name: string, slug: string } | null, anime: { slug: string, name: string, images: Array<{ link: string, facet: string | null }> }, song: { title: string | null, performances: Array<{ as: string | null, artist: { slug: string, name: string } }> } | null } }>, audio: { basename: string } }> };

export type HomePageMostViewedQueryVariables = Exact<{ [key: string]: never; }>;


export type HomePageMostViewedQuery = { videoAll: Array<{ id: number, basename: string, tags: string, entries: Array<{ id: number, version: number | null, theme: { id: number, type: string, sequence: number | null, group: { name: string, slug: string } | null, anime: { slug: string, name: string, images: Array<{ link: string, facet: string | null }> }, song: { title: string | null, performances: Array<{ as: string | null, artist: { slug: string, name: string } }> } | null } }>, audio: { basename: string } }> };

export type HomePageRecentlyAddedPlaylistsQueryVariables = Exact<{ [key: string]: never; }>;


export type HomePageRecentlyAddedPlaylistsQuery = { playlistAll: Array<{ id: string, name: string, visibility: PlaylistVisibility, tracks_count: number, user: { name: string } }> };

export type HomePageQueryVariables = Exact<{ [key: string]: never; }>;


export type HomePageQuery = { featuredTheme: { entry: { theme: { type: string, sequence: number | null, id: number, anime: { slug: string, name: string, images: Array<{ link: string, facet: string | null }> }, entries: Array<{ version: number | null, videos: Array<{ basename: string, id: number, tags: string, audio: { basename: string } }> }>, group: { name: string, slug: string } | null, song: { title: string | null, performances: Array<{ as: string | null, artist: { slug: string, name: string } }> } | null } } | null } | null, announcementAll: Array<{ content: string }> };

export type PlaylistDetailPagePlaylistQueryVariables = Exact<{
  playlistId: Scalars['String'];
}>;


export type PlaylistDetailPagePlaylistQuery = { playlist: { id: string, name: string, visibility: PlaylistVisibility, tracks_count: number, forward: Array<{ id: string, video: { id: number, basename: string, tags: string, entries: Array<{ id: number, version: number | null, theme: { id: number, type: string, sequence: number | null, anime: { year: number | null, season: string | null, slug: string, name: string, images: Array<{ link: string, facet: string | null }> }, group: { name: string, slug: string } | null, song: { title: string | null, performances: Array<{ as: string | null, artist: { slug: string, name: string } }> } | null } }>, audio: { basename: string } } }>, user: { name: string } } | null };

export type PlaylistDetailPageMeQueryVariables = Exact<{ [key: string]: never; }>;


export type PlaylistDetailPageMeQuery = { me: { user: { name: string } | null } };

export type PlaylistDetailPagePlaylistFragment = { id: string, name: string, visibility: PlaylistVisibility, tracks_count: number, forward: Array<{ id: string, video: { id: number, basename: string, tags: string, entries: Array<{ id: number, version: number | null, theme: { id: number, type: string, sequence: number | null, anime: { year: number | null, season: string | null, slug: string, name: string, images: Array<{ link: string, facet: string | null }> }, group: { name: string, slug: string } | null, song: { title: string | null, performances: Array<{ as: string | null, artist: { slug: string, name: string } }> } | null } }>, audio: { basename: string } } }>, user: { name: string } };

type PlaylistDetailPageUser_UserAuth_Fragment = { name: string };

type PlaylistDetailPageUser_UserPublic_Fragment = { name: string };

export type PlaylistDetailPageUserFragment = PlaylistDetailPageUser_UserAuth_Fragment | PlaylistDetailPageUser_UserPublic_Fragment;

export type PlaylistDetailPageQueryVariables = Exact<{
  playlistId: Scalars['String'];
}>;


export type PlaylistDetailPageQuery = { playlist: { id: string, name: string, visibility: PlaylistVisibility, tracks_count: number, forward: Array<{ id: string, video: { id: number, basename: string, tags: string, entries: Array<{ id: number, version: number | null, theme: { id: number, type: string, sequence: number | null, anime: { year: number | null, season: string | null, slug: string, name: string, images: Array<{ link: string, facet: string | null }> }, group: { name: string, slug: string } | null, song: { title: string | null, performances: Array<{ as: string | null, artist: { slug: string, name: string } }> } | null } }>, audio: { basename: string } } }>, user: { name: string } } | null, me: { user: { name: string } | null } };

export type GalleryPageQueryVariables = Exact<{ [key: string]: never; }>;


export type GalleryPageQuery = { grills: Array<{ id: number, link: string }> };

export type ProfilePageMeQueryVariables = Exact<{ [key: string]: never; }>;


export type ProfilePageMeQuery = { me: { user: { name: string, email: string, email_verified_at: string | null, created_at: string, roles: Array<{ name: string, color: string | null, priority: number | null, default: boolean }> } | null, playlistAll: Array<{ id: string, name: string, visibility: PlaylistVisibility, tracks_count: number }> | null } };

export type ProfilePagePlaylistFragment = { id: string, name: string, visibility: PlaylistVisibility, tracks_count: number };

export type ProfilePageUserFragment = { name: string, email: string, email_verified_at: string | null, created_at: string, roles: Array<{ name: string, color: string | null, priority: number | null, default: boolean }> };

export type ProfilePageQueryVariables = Exact<{ [key: string]: never; }>;


export type ProfilePageQuery = { me: { user: { name: string, email: string, email_verified_at: string | null, created_at: string, roles: Array<{ name: string, color: string | null, priority: number | null, default: boolean }> } | null, playlistAll: Array<{ id: string, name: string, visibility: PlaylistVisibility, tracks_count: number }> | null } };

export type SeriesDetailPageSeriesFragment = { slug: string, name: string, anime: Array<{ name: string, slug: string, year: number | null, season: string | null, media_format: string | null, themes: Array<{ type: string, sequence: number | null, id: number, entries: Array<{ version: number | null, episodes: string | null, spoiler: boolean, nsfw: boolean, videos: Array<{ tags: string, resolution: number | null, nc: boolean, subbed: boolean, lyrics: boolean, uncen: boolean, source: VideoSource | null, overlap: VideoOverlap }> }>, group: { name: string, slug: string } | null, anime: { slug: string }, song: { title: string | null } | null }>, images: Array<{ facet: string | null, link: string }> }> };

export type SeriesDetailPageQueryVariables = Exact<{
  seriesSlug: Scalars['String'];
}>;


export type SeriesDetailPageQuery = { series: { slug: string, name: string, anime: Array<{ name: string, slug: string, year: number | null, season: string | null, media_format: string | null, themes: Array<{ type: string, sequence: number | null, id: number, entries: Array<{ version: number | null, episodes: string | null, spoiler: boolean, nsfw: boolean, videos: Array<{ tags: string, resolution: number | null, nc: boolean, subbed: boolean, lyrics: boolean, uncen: boolean, source: VideoSource | null, overlap: VideoOverlap }> }>, group: { name: string, slug: string } | null, anime: { slug: string }, song: { title: string | null } | null }>, images: Array<{ facet: string | null, link: string }> }> } | null };

export type SeriesDetailPageAllQueryVariables = Exact<{ [key: string]: never; }>;


export type SeriesDetailPageAllQuery = { seriesAll: Array<{ slug: string, name: string, anime: Array<{ name: string, slug: string, year: number | null, season: string | null, media_format: string | null, themes: Array<{ type: string, sequence: number | null, id: number, entries: Array<{ version: number | null, episodes: string | null, spoiler: boolean, nsfw: boolean, videos: Array<{ tags: string, resolution: number | null, nc: boolean, subbed: boolean, lyrics: boolean, uncen: boolean, source: VideoSource | null, overlap: VideoOverlap }> }>, group: { name: string, slug: string } | null, anime: { slug: string }, song: { title: string | null } | null }>, images: Array<{ facet: string | null, link: string }> }> }> };

export type SeriesIndexPageQueryVariables = Exact<{ [key: string]: never; }>;


export type SeriesIndexPageQuery = { seriesAll: Array<{ slug: string, name: string }> };

export type StudioDetailPageStudioFragment = { slug: string, name: string, anime: Array<{ name: string, slug: string, year: number | null, season: string | null, media_format: string | null, themes: Array<{ type: string, sequence: number | null, id: number, entries: Array<{ version: number | null, episodes: string | null, spoiler: boolean, nsfw: boolean, videos: Array<{ tags: string, resolution: number | null, nc: boolean, subbed: boolean, lyrics: boolean, uncen: boolean, source: VideoSource | null, overlap: VideoOverlap }> }>, group: { name: string, slug: string } | null, anime: { slug: string }, song: { title: string | null } | null }>, images: Array<{ facet: string | null, link: string }> }>, resources: Array<{ link: string | null, site: string | null, as: string | null }>, images: Array<{ link: string, facet: string | null }> };

export type StudioDetailPageQueryVariables = Exact<{
  studioSlug: Scalars['String'];
}>;


export type StudioDetailPageQuery = { studio: { slug: string, name: string, anime: Array<{ name: string, slug: string, year: number | null, season: string | null, media_format: string | null, themes: Array<{ type: string, sequence: number | null, id: number, entries: Array<{ version: number | null, episodes: string | null, spoiler: boolean, nsfw: boolean, videos: Array<{ tags: string, resolution: number | null, nc: boolean, subbed: boolean, lyrics: boolean, uncen: boolean, source: VideoSource | null, overlap: VideoOverlap }> }>, group: { name: string, slug: string } | null, anime: { slug: string }, song: { title: string | null } | null }>, images: Array<{ facet: string | null, link: string }> }>, resources: Array<{ link: string | null, site: string | null, as: string | null }>, images: Array<{ link: string, facet: string | null }> } | null };

export type StudioDetailPageAllQueryVariables = Exact<{ [key: string]: never; }>;


export type StudioDetailPageAllQuery = { studioAll: Array<{ slug: string, name: string, anime: Array<{ name: string, slug: string, year: number | null, season: string | null, media_format: string | null, themes: Array<{ type: string, sequence: number | null, id: number, entries: Array<{ version: number | null, episodes: string | null, spoiler: boolean, nsfw: boolean, videos: Array<{ tags: string, resolution: number | null, nc: boolean, subbed: boolean, lyrics: boolean, uncen: boolean, source: VideoSource | null, overlap: VideoOverlap }> }>, group: { name: string, slug: string } | null, anime: { slug: string }, song: { title: string | null } | null }>, images: Array<{ facet: string | null, link: string }> }>, resources: Array<{ link: string | null, site: string | null, as: string | null }>, images: Array<{ link: string, facet: string | null }> }> };

export type StudioIndexPageQueryVariables = Exact<{ [key: string]: never; }>;


export type StudioIndexPageQuery = { studioAll: Array<{ slug: string, name: string }> };

export type SeasonDetailPageQueryVariables = Exact<{
  year?: InputMaybe<Scalars['Int']>;
  season: Scalars['String'];
}>;


export type SeasonDetailPageQuery = { year: { value: number, seasons: Array<{ value: string }> } | null, season: { value: string, anime: Array<{ slug: string, name: string, year: number | null, season: string | null, media_format: string | null, themes: Array<{ id: number, type: string, sequence: number | null, group: { name: string, slug: string } | null, anime: { slug: string }, entries: Array<{ version: number | null, episodes: string | null, spoiler: boolean, nsfw: boolean, videos: Array<{ tags: string, resolution: number | null, nc: boolean, subbed: boolean, lyrics: boolean, uncen: boolean, source: VideoSource | null, overlap: VideoOverlap }> }>, song: { title: string | null } | null }>, images: Array<{ link: string, facet: string | null }> }> } | null, yearAll: Array<{ value: number }> };

export type SeasonDetailPageAllQueryVariables = Exact<{ [key: string]: never; }>;


export type SeasonDetailPageAllQuery = { yearAll: Array<{ value: number, seasons: Array<{ value: string }> }> };

export type YearDetailPageQueryVariables = Exact<{
  year: Scalars['Int'];
}>;


export type YearDetailPageQuery = { year: { value: number, seasons: Array<{ value: string, anime: Array<{ slug: string, name: string, year: number | null, season: string | null, media_format: string | null, themes: Array<{ id: number, type: string, sequence: number | null, group: { name: string, slug: string } | null, anime: { slug: string }, entries: Array<{ version: number | null, episodes: string | null, spoiler: boolean, nsfw: boolean, videos: Array<{ tags: string, resolution: number | null, nc: boolean, subbed: boolean, lyrics: boolean, uncen: boolean, source: VideoSource | null, overlap: VideoOverlap }> }>, song: { title: string | null } | null }>, images: Array<{ link: string, facet: string | null }> }> }> } | null, yearAll: Array<{ value: number }> };

export type YearDetailPageAllQueryVariables = Exact<{ [key: string]: never; }>;


export type YearDetailPageAllQuery = { yearAll: Array<{ value: number }> };

export type YearIndexPageQueryVariables = Exact<{ [key: string]: never; }>;


export type YearIndexPageQuery = { yearAll: Array<{ value: number, seasons: Array<{ value: string }> }> };

export type CreateVideoSlugThemeFragment = { type: string, sequence: number | null, group: { slug: string } | null };

export type CreateVideoSlugEntryFragment = { version: number | null };

export type CreateVideoSlugVideoFragment = { tags: string };

type ExtractImagesResourceWithImages_Anime_Fragment = { images: Array<{ link: string, facet: string | null }> };

type ExtractImagesResourceWithImages_Artist_Fragment = { images: Array<{ link: string, facet: string | null }> };

type ExtractImagesResourceWithImages_Studio_Fragment = { images: Array<{ link: string, facet: string | null }> };

export type ExtractImagesResourceWithImagesFragment = ExtractImagesResourceWithImages_Anime_Fragment | ExtractImagesResourceWithImages_Artist_Fragment | ExtractImagesResourceWithImages_Studio_Fragment;
