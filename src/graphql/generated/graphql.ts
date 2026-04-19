/* eslint-disable */
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /**
   * Loose type that allows any value. Be careful when passing in large `Int` or `Float` literals,
   * as they may not be parsed correctly on the server side. Use `String` literals if you are
   * dealing with really large numbers to be on the safe side.
   */
  Mixed: { input: any; output: any; }
};

/**
 * Represents a production with at least one opening or ending sequence.
 *
 * For example, Bakemonogatari is an anime production with five opening sequences and one ending sequence.
 */
export type Anime = {
  /** @deprecated Use synonyms instead. */
  animesynonyms: Array<AnimeSynonym>;
  animethemes: Array<AnimeTheme>;
  /** The date that the resource was created */
  createdAt: Maybe<Scalars['String']['output']>;
  /** The format of the anime */
  format: Maybe<AnimeFormat>;
  /** The formatted string value of the format field */
  formatLocalized: Maybe<Scalars['String']['output']>;
  /** The primary key of the resource */
  id: Scalars['Int']['output'];
  images: AnimeImageConnection;
  /**
   * The media format of the anime
   * @deprecated Use the 'format' field and its filters instead
   */
  mediaFormat: Maybe<AnimeMediaFormat>;
  /**
   * The formatted string value of the mediaFormat field
   * @deprecated Use the 'formatLocalized' field instead
   */
  mediaFormatLocalized: Maybe<Scalars['String']['output']>;
  /** The primary title of the anime */
  name: Scalars['String']['output'];
  resources: AnimeExternalResourceConnection;
  /** The premiere season of the anime */
  season: Maybe<AnimeSeason>;
  /** The formatted string value of the season field */
  seasonLocalized: Maybe<Scalars['String']['output']>;
  series: AnimeSeriesConnection;
  /** The URL slug & route key of the resource */
  slug: Scalars['String']['output'];
  studios: AnimeStudioConnection;
  synonyms: Array<Synonym>;
  /** The brief summary of the anime */
  synopsis: Maybe<Scalars['String']['output']>;
  /** The date that the resource was updated */
  updatedAt: Maybe<Scalars['String']['output']>;
  /** The premiere year of the anime */
  year: Maybe<Scalars['Int']['output']>;
};


/**
 * Represents a production with at least one opening or ending sequence.
 *
 * For example, Bakemonogatari is an anime production with five opening sequences and one ending sequence.
 */
export type AnimeAnimesynonymsArgs = {
  createdAt_greater?: InputMaybe<Scalars['String']['input']>;
  createdAt_lesser?: InputMaybe<Scalars['String']['input']>;
  first?: Scalars['Int']['input'];
  id?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  text?: InputMaybe<Scalars['String']['input']>;
  text_like?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<AnimeSynonymType>;
  type_in?: InputMaybe<Array<AnimeSynonymType>>;
  type_not_in?: InputMaybe<Array<AnimeSynonymType>>;
  updatedAt_greater?: InputMaybe<Scalars['String']['input']>;
  updatedAt_lesser?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<Array<AnimeSynonymWhereConditionsInput>>;
};


/**
 * Represents a production with at least one opening or ending sequence.
 *
 * For example, Bakemonogatari is an anime production with five opening sequences and one ending sequence.
 */
export type AnimeAnimethemesArgs = {
  createdAt_greater?: InputMaybe<Scalars['String']['input']>;
  createdAt_lesser?: InputMaybe<Scalars['String']['input']>;
  first?: Scalars['Int']['input'];
  id?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  sequence?: InputMaybe<Scalars['Int']['input']>;
  sequence_greater?: InputMaybe<Scalars['Int']['input']>;
  sequence_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  sequence_lesser?: InputMaybe<Scalars['Int']['input']>;
  sequence_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  slug?: InputMaybe<Scalars['String']['input']>;
  slug_like?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<AnimeThemeSort>>;
  type?: InputMaybe<ThemeType>;
  type_in?: InputMaybe<Array<ThemeType>>;
  type_not_in?: InputMaybe<Array<ThemeType>>;
  updatedAt_greater?: InputMaybe<Scalars['String']['input']>;
  updatedAt_lesser?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<Array<AnimeThemeWhereConditionsInput>>;
};


/**
 * Represents a production with at least one opening or ending sequence.
 *
 * For example, Bakemonogatari is an anime production with five opening sequences and one ending sequence.
 */
export type AnimeCreatedAtArgs = {
  format?: Scalars['String']['input'];
};


/**
 * Represents a production with at least one opening or ending sequence.
 *
 * For example, Bakemonogatari is an anime production with five opening sequences and one ending sequence.
 */
export type AnimeImagesArgs = {
  createdAt_greater?: InputMaybe<Scalars['String']['input']>;
  createdAt_lesser?: InputMaybe<Scalars['String']['input']>;
  facet?: InputMaybe<ImageFacet>;
  first?: Scalars['Int']['input'];
  id?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  path?: InputMaybe<Scalars['String']['input']>;
  path_like?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<ImageableSort>>;
  updatedAt_greater?: InputMaybe<Scalars['String']['input']>;
  updatedAt_lesser?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<Array<ImageWhereConditionsInput>>;
};


/**
 * Represents a production with at least one opening or ending sequence.
 *
 * For example, Bakemonogatari is an anime production with five opening sequences and one ending sequence.
 */
export type AnimeResourcesArgs = {
  createdAt_greater?: InputMaybe<Scalars['String']['input']>;
  createdAt_lesser?: InputMaybe<Scalars['String']['input']>;
  externalId?: InputMaybe<Scalars['Int']['input']>;
  first?: Scalars['Int']['input'];
  id?: InputMaybe<Scalars['Int']['input']>;
  link?: InputMaybe<Scalars['String']['input']>;
  link_like?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  site?: InputMaybe<ResourceSite>;
  site_in?: InputMaybe<Array<ResourceSite>>;
  site_not_in?: InputMaybe<Array<ResourceSite>>;
  updatedAt_greater?: InputMaybe<Scalars['String']['input']>;
  updatedAt_lesser?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<Array<ExternalResourceWhereConditionsInput>>;
};


/**
 * Represents a production with at least one opening or ending sequence.
 *
 * For example, Bakemonogatari is an anime production with five opening sequences and one ending sequence.
 */
export type AnimeSeriesArgs = {
  createdAt_greater?: InputMaybe<Scalars['String']['input']>;
  createdAt_lesser?: InputMaybe<Scalars['String']['input']>;
  first?: Scalars['Int']['input'];
  id?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  name_like?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<SeriesSort>>;
  updatedAt_greater?: InputMaybe<Scalars['String']['input']>;
  updatedAt_lesser?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<Array<SeriesWhereConditionsInput>>;
};


/**
 * Represents a production with at least one opening or ending sequence.
 *
 * For example, Bakemonogatari is an anime production with five opening sequences and one ending sequence.
 */
export type AnimeStudiosArgs = {
  createdAt_greater?: InputMaybe<Scalars['String']['input']>;
  createdAt_lesser?: InputMaybe<Scalars['String']['input']>;
  first?: Scalars['Int']['input'];
  id?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  name_like?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<StudioSort>>;
  updatedAt_greater?: InputMaybe<Scalars['String']['input']>;
  updatedAt_lesser?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<Array<StudioWhereConditionsInput>>;
};


/**
 * Represents a production with at least one opening or ending sequence.
 *
 * For example, Bakemonogatari is an anime production with five opening sequences and one ending sequence.
 */
export type AnimeSynonymsArgs = {
  createdAt_greater?: InputMaybe<Scalars['String']['input']>;
  createdAt_lesser?: InputMaybe<Scalars['String']['input']>;
  first?: Scalars['Int']['input'];
  id?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<SynonymSort>>;
  text?: InputMaybe<Scalars['String']['input']>;
  text_like?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<SynonymType>;
  type_in?: InputMaybe<Array<SynonymType>>;
  type_not_in?: InputMaybe<Array<SynonymType>>;
  updatedAt_greater?: InputMaybe<Scalars['String']['input']>;
  updatedAt_lesser?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<Array<SynonymWhereConditionsInput>>;
};


/**
 * Represents a production with at least one opening or ending sequence.
 *
 * For example, Bakemonogatari is an anime production with five opening sequences and one ending sequence.
 */
export type AnimeUpdatedAtArgs = {
  format?: Scalars['String']['input'];
};

export type AnimeExternalResourceConnection = {
  /** A list of ExternalResource edges. */
  edges: Array<AnimeExternalResourceEdge>;
  /** A list of ExternalResource resources. Use this if you don\'t care about pivot fields. */
  nodes: Array<ExternalResource>;
  /** Pagination information about the list of edges. */
  pageInfo: PaginationInfo;
};

export type AnimeExternalResourceEdge = {
  /** Used to distinguish resources that map to the same resourceable */
  as: Maybe<Scalars['String']['output']>;
  /** The date that the resource was created */
  createdAt: Maybe<Scalars['String']['output']>;
  node: ExternalResource;
  /** The date that the resource was updated */
  updatedAt: Maybe<Scalars['String']['output']>;
};


export type AnimeExternalResourceEdgeCreatedAtArgs = {
  format?: Scalars['String']['input'];
};


export type AnimeExternalResourceEdgeUpdatedAtArgs = {
  format?: Scalars['String']['input'];
};

export type AnimeFilterableColumns =
  | 'CREATED_AT'
  | 'FORMAT'
  | 'ID'
  | 'MEDIA_FORMAT'
  | 'NAME'
  | 'SEASON'
  | 'SLUG'
  | 'SYNOPSIS'
  | 'UPDATED_AT'
  | 'YEAR';

export type AnimeFormat =
  | 'MOVIE'
  | 'ONA'
  | 'OVA'
  | 'SPECIAL'
  | 'TV'
  | 'TV_SHORT';

export type AnimeImageConnection = {
  /** A list of Image edges. */
  edges: Array<AnimeImageEdge>;
  /** A list of Image resources. Use this if you don\'t care about pivot fields. */
  nodes: Array<Image>;
  /** Pagination information about the list of edges. */
  pageInfo: PaginationInfo;
};

export type AnimeImageEdge = {
  /** The date that the resource was created */
  createdAt: Maybe<Scalars['String']['output']>;
  /** Used to sort the images */
  depth: Scalars['Int']['output'];
  node: Image;
  /** The date that the resource was updated */
  updatedAt: Maybe<Scalars['String']['output']>;
};


export type AnimeImageEdgeCreatedAtArgs = {
  format?: Scalars['String']['input'];
};


export type AnimeImageEdgeUpdatedAtArgs = {
  format?: Scalars['String']['input'];
};

export type AnimeMediaFormat =
  | 'MOVIE'
  | 'ONA'
  | 'OVA'
  | 'SPECIAL'
  | 'TV'
  | 'TV_SHORT';

export type AnimePagination = {
  /** List of items on the current page */
  data: Array<Anime>;
  /** Pagination information about the list of items. */
  paginationInfo: PaginationInfo;
};

export type AnimeSeason =
  | 'FALL'
  | 'SPRING'
  | 'SUMMER'
  | 'WINTER';

export type AnimeSeriesConnection = {
  /** A list of Series edges. */
  edges: Array<AnimeSeriesEdge>;
  /** A list of Series resources. Use this if you don\'t care about pivot fields. */
  nodes: Array<Series>;
  /** Pagination information about the list of edges. */
  pageInfo: PaginationInfo;
};

export type AnimeSeriesEdge = {
  /** The date that the resource was created */
  createdAt: Maybe<Scalars['String']['output']>;
  node: Series;
  /** The date that the resource was updated */
  updatedAt: Maybe<Scalars['String']['output']>;
};


export type AnimeSeriesEdgeCreatedAtArgs = {
  format?: Scalars['String']['input'];
};


export type AnimeSeriesEdgeUpdatedAtArgs = {
  format?: Scalars['String']['input'];
};

export type AnimeSort =
  | 'CREATED_AT'
  | 'CREATED_AT_DESC'
  | 'ID'
  | 'ID_DESC'
  | 'NAME'
  | 'NAME_DESC'
  | 'RANDOM'
  | 'UPDATED_AT'
  | 'UPDATED_AT_DESC'
  | 'YEAR'
  | 'YEAR_DESC';

export type AnimeStudioConnection = {
  /** A list of Studio edges. */
  edges: Array<AnimeStudioEdge>;
  /** A list of Studio resources. Use this if you don\'t care about pivot fields. */
  nodes: Array<Studio>;
  /** Pagination information about the list of edges. */
  pageInfo: PaginationInfo;
};

export type AnimeStudioEdge = {
  /** The date that the resource was created */
  createdAt: Maybe<Scalars['String']['output']>;
  node: Studio;
  /** The date that the resource was updated */
  updatedAt: Maybe<Scalars['String']['output']>;
};


export type AnimeStudioEdgeCreatedAtArgs = {
  format?: Scalars['String']['input'];
};


export type AnimeStudioEdgeUpdatedAtArgs = {
  format?: Scalars['String']['input'];
};

/**
 * Represents an alternate title or common abbreviation for an anime.
 *
 * For example, the anime Bakemonogatari has the anime synonym "Monstory".
 */
export type AnimeSynonym = {
  anime: Anime;
  /** The date that the resource was created */
  createdAt: Maybe<Scalars['String']['output']>;
  /** The primary key of the resource */
  id: Scalars['Int']['output'];
  /** The alternate title or common abbreviations */
  text: Scalars['String']['output'];
  /** The type of the synonym */
  type: AnimeSynonymType;
  /** The formatted string value of the type field */
  typeLocalized: Scalars['String']['output'];
  /** The date that the resource was updated */
  updatedAt: Maybe<Scalars['String']['output']>;
};


/**
 * Represents an alternate title or common abbreviation for an anime.
 *
 * For example, the anime Bakemonogatari has the anime synonym "Monstory".
 */
export type AnimeSynonymCreatedAtArgs = {
  format?: Scalars['String']['input'];
};


/**
 * Represents an alternate title or common abbreviation for an anime.
 *
 * For example, the anime Bakemonogatari has the anime synonym "Monstory".
 */
export type AnimeSynonymUpdatedAtArgs = {
  format?: Scalars['String']['input'];
};

export type AnimeSynonymFilterableColumns =
  | 'CREATED_AT'
  | 'ID'
  | 'TEXT'
  | 'TYPE'
  | 'UPDATED_AT';

export type AnimeSynonymPagination = {
  /** List of items on the current page */
  data: Array<AnimeSynonym>;
  /** Pagination information about the list of items. */
  paginationInfo: PaginationInfo;
};

/** @deprecated Use SynonymType instead. */
export type AnimeSynonymType =
  | 'ENGLISH'
  | 'NATIVE'
  | 'OTHER'
  | 'SHORT';

export type AnimeSynonymWhereConditionsInput = {
  AND?: InputMaybe<Array<AnimeSynonymWhereConditionsInput>>;
  OR?: InputMaybe<Array<AnimeSynonymWhereConditionsInput>>;
  field?: InputMaybe<AnimeSynonymFilterableColumns>;
  operator?: ComparisonOperator;
  value?: InputMaybe<Scalars['Mixed']['input']>;
};

/**
 * Represents an OP or ED sequence for an anime.
 *
 * For example, the anime Bakemonogatari has five OP anime themes and one ED anime theme.
 */
export type AnimeTheme = {
  anime: Anime;
  animethemeentries: Array<AnimeThemeEntry>;
  /** The date that the resource was created */
  createdAt: Maybe<Scalars['String']['output']>;
  group: Maybe<ThemeGroup>;
  /** The primary key of the resource */
  id: Scalars['Int']['output'];
  /** The numeric ordering of the theme */
  sequence: Maybe<Scalars['Int']['output']>;
  /** The slug that represents the anime theme. */
  slug: Maybe<Scalars['String']['output']>;
  song: Maybe<Song>;
  /** The type of the sequence */
  type: ThemeType;
  /** The formatted string value of the type field */
  typeLocalized: Scalars['String']['output'];
  /** The date that the resource was updated */
  updatedAt: Maybe<Scalars['String']['output']>;
};


/**
 * Represents an OP or ED sequence for an anime.
 *
 * For example, the anime Bakemonogatari has five OP anime themes and one ED anime theme.
 */
export type AnimeThemeAnimethemeentriesArgs = {
  createdAt_greater?: InputMaybe<Scalars['String']['input']>;
  createdAt_lesser?: InputMaybe<Scalars['String']['input']>;
  episodes?: InputMaybe<Scalars['String']['input']>;
  episodes_like?: InputMaybe<Scalars['String']['input']>;
  first?: Scalars['Int']['input'];
  id?: InputMaybe<Scalars['Int']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  notes_like?: InputMaybe<Scalars['String']['input']>;
  nsfw?: InputMaybe<Scalars['Boolean']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<AnimeThemeEntrySort>>;
  spoiler?: InputMaybe<Scalars['Boolean']['input']>;
  updatedAt_greater?: InputMaybe<Scalars['String']['input']>;
  updatedAt_lesser?: InputMaybe<Scalars['String']['input']>;
  version?: InputMaybe<Scalars['Int']['input']>;
  version_greater?: InputMaybe<Scalars['Int']['input']>;
  version_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  version_lesser?: InputMaybe<Scalars['Int']['input']>;
  version_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  where?: InputMaybe<Array<AnimeThemeEntryWhereConditionsInput>>;
};


/**
 * Represents an OP or ED sequence for an anime.
 *
 * For example, the anime Bakemonogatari has five OP anime themes and one ED anime theme.
 */
export type AnimeThemeCreatedAtArgs = {
  format?: Scalars['String']['input'];
};


/**
 * Represents an OP or ED sequence for an anime.
 *
 * For example, the anime Bakemonogatari has five OP anime themes and one ED anime theme.
 */
export type AnimeThemeUpdatedAtArgs = {
  format?: Scalars['String']['input'];
};

/**
 * Represents a version of an anime theme.
 *
 * For example, the ED theme of the Bakemonogatari anime has three anime theme entries to represent three versions.
 */
export type AnimeThemeEntry = {
  animetheme: AnimeTheme;
  /** The date that the resource was created */
  createdAt: Maybe<Scalars['String']['output']>;
  /** The episodes that the theme is used for */
  episodes: Maybe<Scalars['String']['output']>;
  /** The primary key of the resource */
  id: Scalars['Int']['output'];
  /** The number of likes recorded for the resource */
  likesCount: Scalars['Int']['output'];
  /** Any additional information for this sequence */
  notes: Maybe<Scalars['String']['output']>;
  /** Is not safe for work content included? */
  nsfw: Scalars['Boolean']['output'];
  resources: AnimeThemeEntryExternalResourceConnection;
  /** Is content included that may spoil the viewer? */
  spoiler: Scalars['Boolean']['output'];
  /** The number of tracks belonging to the resource */
  tracksCount: Scalars['Int']['output'];
  /** The date that the resource was updated */
  updatedAt: Maybe<Scalars['String']['output']>;
  /** The version number of the theme */
  version: Scalars['Int']['output'];
  videos: AnimeThemeEntryVideoConnection;
};


/**
 * Represents a version of an anime theme.
 *
 * For example, the ED theme of the Bakemonogatari anime has three anime theme entries to represent three versions.
 */
export type AnimeThemeEntryCreatedAtArgs = {
  format?: Scalars['String']['input'];
};


/**
 * Represents a version of an anime theme.
 *
 * For example, the ED theme of the Bakemonogatari anime has three anime theme entries to represent three versions.
 */
export type AnimeThemeEntryResourcesArgs = {
  createdAt_greater?: InputMaybe<Scalars['String']['input']>;
  createdAt_lesser?: InputMaybe<Scalars['String']['input']>;
  externalId?: InputMaybe<Scalars['Int']['input']>;
  first?: Scalars['Int']['input'];
  id?: InputMaybe<Scalars['Int']['input']>;
  link?: InputMaybe<Scalars['String']['input']>;
  link_like?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  site?: InputMaybe<ResourceSite>;
  site_in?: InputMaybe<Array<ResourceSite>>;
  site_not_in?: InputMaybe<Array<ResourceSite>>;
  updatedAt_greater?: InputMaybe<Scalars['String']['input']>;
  updatedAt_lesser?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<Array<ExternalResourceWhereConditionsInput>>;
};


/**
 * Represents a version of an anime theme.
 *
 * For example, the ED theme of the Bakemonogatari anime has three anime theme entries to represent three versions.
 */
export type AnimeThemeEntryUpdatedAtArgs = {
  format?: Scalars['String']['input'];
};


/**
 * Represents a version of an anime theme.
 *
 * For example, the ED theme of the Bakemonogatari anime has three anime theme entries to represent three versions.
 */
export type AnimeThemeEntryVideosArgs = {
  basename?: InputMaybe<Scalars['String']['input']>;
  createdAt_greater?: InputMaybe<Scalars['String']['input']>;
  createdAt_lesser?: InputMaybe<Scalars['String']['input']>;
  filename?: InputMaybe<Scalars['String']['input']>;
  first?: Scalars['Int']['input'];
  id?: InputMaybe<Scalars['Int']['input']>;
  lyrics?: InputMaybe<Scalars['Boolean']['input']>;
  mimetype?: InputMaybe<Scalars['String']['input']>;
  nc?: InputMaybe<Scalars['Boolean']['input']>;
  overlap?: InputMaybe<VideoOverlap>;
  page?: InputMaybe<Scalars['Int']['input']>;
  path?: InputMaybe<Scalars['String']['input']>;
  path_like?: InputMaybe<Scalars['String']['input']>;
  resolution?: InputMaybe<Scalars['Int']['input']>;
  resolution_greater?: InputMaybe<Scalars['Int']['input']>;
  resolution_lesser?: InputMaybe<Scalars['Int']['input']>;
  size_greater?: InputMaybe<Scalars['Int']['input']>;
  size_lesser?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<VideoSort>>;
  source?: InputMaybe<VideoSource>;
  subbed?: InputMaybe<Scalars['Boolean']['input']>;
  tags?: InputMaybe<Scalars['String']['input']>;
  tags_like?: InputMaybe<Scalars['String']['input']>;
  uncen?: InputMaybe<Scalars['Boolean']['input']>;
  updatedAt_greater?: InputMaybe<Scalars['String']['input']>;
  updatedAt_lesser?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<Array<VideoWhereConditionsInput>>;
};

export type AnimeThemeEntryExternalResourceConnection = {
  /** A list of ExternalResource edges. */
  edges: Array<AnimeThemeEntryExternalResourceEdge>;
  /** A list of ExternalResource resources. Use this if you don\'t care about pivot fields. */
  nodes: Array<ExternalResource>;
  /** Pagination information about the list of edges. */
  pageInfo: PaginationInfo;
};

export type AnimeThemeEntryExternalResourceEdge = {
  /** Used to distinguish resources that map to the same resourceable */
  as: Maybe<Scalars['String']['output']>;
  /** The date that the resource was created */
  createdAt: Maybe<Scalars['String']['output']>;
  node: ExternalResource;
  /** The date that the resource was updated */
  updatedAt: Maybe<Scalars['String']['output']>;
};


export type AnimeThemeEntryExternalResourceEdgeCreatedAtArgs = {
  format?: Scalars['String']['input'];
};


export type AnimeThemeEntryExternalResourceEdgeUpdatedAtArgs = {
  format?: Scalars['String']['input'];
};

export type AnimeThemeEntryFilterableColumns =
  | 'CREATED_AT'
  | 'EPISODES'
  | 'ID'
  | 'LIKES_COUNT'
  | 'NOTES'
  | 'NSFW'
  | 'SPOILER'
  | 'TRACKS_COUNT'
  | 'UPDATED_AT'
  | 'VERSION';

export type AnimeThemeEntryPagination = {
  /** List of items on the current page */
  data: Array<AnimeThemeEntry>;
  /** Pagination information about the list of items. */
  paginationInfo: PaginationInfo;
};

export type AnimeThemeEntrySort =
  | 'CREATED_AT'
  | 'CREATED_AT_DESC'
  | 'EPISODES'
  | 'EPISODES_DESC'
  | 'ID'
  | 'ID_DESC'
  | 'LIKES_COUNT'
  | 'LIKES_COUNT_DESC'
  | 'RANDOM'
  | 'TRACKS_COUNT'
  | 'TRACKS_COUNT_DESC'
  | 'UPDATED_AT'
  | 'UPDATED_AT_DESC'
  | 'VERSION'
  | 'VERSION_DESC';

export type AnimeThemeEntryVideoConnection = {
  /** A list of Video edges. */
  edges: Array<AnimeThemeEntryVideoEdge>;
  /** A list of Video resources. Use this if you don\'t care about pivot fields. */
  nodes: Array<Video>;
  /** Pagination information about the list of edges. */
  pageInfo: PaginationInfo;
};

export type AnimeThemeEntryVideoEdge = {
  /** The date that the resource was created */
  createdAt: Maybe<Scalars['String']['output']>;
  node: Video;
  /** The date that the resource was updated */
  updatedAt: Maybe<Scalars['String']['output']>;
};


export type AnimeThemeEntryVideoEdgeCreatedAtArgs = {
  format?: Scalars['String']['input'];
};


export type AnimeThemeEntryVideoEdgeUpdatedAtArgs = {
  format?: Scalars['String']['input'];
};

export type AnimeThemeEntryWhereConditionsInput = {
  AND?: InputMaybe<Array<AnimeThemeEntryWhereConditionsInput>>;
  OR?: InputMaybe<Array<AnimeThemeEntryWhereConditionsInput>>;
  field?: InputMaybe<AnimeThemeEntryFilterableColumns>;
  operator?: ComparisonOperator;
  value?: InputMaybe<Scalars['Mixed']['input']>;
};

export type AnimeThemeFilterableColumns =
  | 'CREATED_AT'
  | 'ID'
  | 'SEQUENCE'
  | 'SLUG'
  | 'TYPE'
  | 'UPDATED_AT';

export type AnimeThemePagination = {
  /** List of items on the current page */
  data: Array<AnimeTheme>;
  /** Pagination information about the list of items. */
  paginationInfo: PaginationInfo;
};

export type AnimeThemeSort =
  | 'CREATED_AT'
  | 'CREATED_AT_DESC'
  | 'ID'
  | 'ID_DESC'
  | 'RANDOM'
  | 'SEQUENCE'
  | 'SEQUENCE_DESC'
  | 'SONG_TITLE'
  | 'SONG_TITLE_DESC'
  | 'SONG_TITLE_NATIVE'
  | 'SONG_TITLE_NATIVE_DESC'
  | 'UPDATED_AT'
  | 'UPDATED_AT_DESC';

export type AnimeThemeWhereConditionsInput = {
  AND?: InputMaybe<Array<AnimeThemeWhereConditionsInput>>;
  OR?: InputMaybe<Array<AnimeThemeWhereConditionsInput>>;
  field?: InputMaybe<AnimeThemeFilterableColumns>;
  operator?: ComparisonOperator;
  value?: InputMaybe<Scalars['Mixed']['input']>;
};

export type AnimeWhereConditionsInput = {
  AND?: InputMaybe<Array<AnimeWhereConditionsInput>>;
  OR?: InputMaybe<Array<AnimeWhereConditionsInput>>;
  field?: InputMaybe<AnimeFilterableColumns>;
  operator?: ComparisonOperator;
  value?: InputMaybe<Scalars['Mixed']['input']>;
};

/** The anime year response type, grouped by season. */
export type AnimeYear = {
  /** Object that references the season year queried */
  season: Maybe<AnimeYearSeason>;
  /** The available seasons of the year */
  seasons: Maybe<Array<AnimeYearSeasons>>;
  /** The year of the AnimeYear type */
  year: Scalars['Int']['output'];
};


/** The anime year response type, grouped by season. */
export type AnimeYearSeasonArgs = {
  season: AnimeSeason;
};

/** The anime year season type. */
export type AnimeYearSeason = {
  /** The animes of the season year filtered */
  anime: AnimePagination;
  /** The season of the anime year */
  season: AnimeSeason;
  /** The formatted string value of the season field */
  seasonLocalized: Scalars['String']['output'];
};


/** The anime year season type. */
export type AnimeYearSeasonAnimeArgs = {
  createdAt_greater?: InputMaybe<Scalars['String']['input']>;
  createdAt_lesser?: InputMaybe<Scalars['String']['input']>;
  first?: Scalars['Int']['input'];
  format?: InputMaybe<AnimeFormat>;
  format_in?: InputMaybe<Array<AnimeFormat>>;
  format_not_in?: InputMaybe<Array<AnimeFormat>>;
  id?: InputMaybe<Scalars['Int']['input']>;
  mediaFormat?: InputMaybe<AnimeMediaFormat>;
  mediaFormat_in?: InputMaybe<Array<AnimeMediaFormat>>;
  mediaFormat_not_in?: InputMaybe<Array<AnimeMediaFormat>>;
  name?: InputMaybe<Scalars['String']['input']>;
  name_like?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  season?: InputMaybe<AnimeSeason>;
  season_in?: InputMaybe<Array<AnimeSeason>>;
  season_not_in?: InputMaybe<Array<AnimeSeason>>;
  slug?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<AnimeSort>>;
  updatedAt_greater?: InputMaybe<Scalars['String']['input']>;
  updatedAt_lesser?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<Array<AnimeWhereConditionsInput>>;
  year?: InputMaybe<Scalars['Int']['input']>;
  year_greater?: InputMaybe<Scalars['Int']['input']>;
  year_lesser?: InputMaybe<Scalars['Int']['input']>;
};

/** The anime year season type. */
export type AnimeYearSeasons = {
  /** The animes of the season year filtered */
  anime: AnimePagination;
  /** The season of the anime year */
  season: AnimeSeason;
  /** The formatted string value of the season field */
  seasonLocalized: Scalars['String']['output'];
};


/** The anime year season type. */
export type AnimeYearSeasonsAnimeArgs = {
  createdAt_greater?: InputMaybe<Scalars['String']['input']>;
  createdAt_lesser?: InputMaybe<Scalars['String']['input']>;
  first?: Scalars['Int']['input'];
  format?: InputMaybe<AnimeFormat>;
  format_in?: InputMaybe<Array<AnimeFormat>>;
  format_not_in?: InputMaybe<Array<AnimeFormat>>;
  id?: InputMaybe<Scalars['Int']['input']>;
  mediaFormat?: InputMaybe<AnimeMediaFormat>;
  mediaFormat_in?: InputMaybe<Array<AnimeMediaFormat>>;
  mediaFormat_not_in?: InputMaybe<Array<AnimeMediaFormat>>;
  name?: InputMaybe<Scalars['String']['input']>;
  name_like?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  season?: InputMaybe<AnimeSeason>;
  season_in?: InputMaybe<Array<AnimeSeason>>;
  season_not_in?: InputMaybe<Array<AnimeSeason>>;
  slug?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<AnimeSort>>;
  updatedAt_greater?: InputMaybe<Scalars['String']['input']>;
  updatedAt_lesser?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<Array<AnimeWhereConditionsInput>>;
  year?: InputMaybe<Scalars['Int']['input']>;
  year_greater?: InputMaybe<Scalars['Int']['input']>;
  year_lesser?: InputMaybe<Scalars['Int']['input']>;
};

/** Represents a site-wide message to be broadcasted on the homepage. */
export type Announcement = {
  /** The announcement text */
  content: Scalars['String']['output'];
  /** The date that the resource was created */
  createdAt: Maybe<Scalars['String']['output']>;
  /** The primary key of the resource */
  id: Scalars['Int']['output'];
  /** The date that the resource was updated */
  updatedAt: Maybe<Scalars['String']['output']>;
};


/** Represents a site-wide message to be broadcasted on the homepage. */
export type AnnouncementCreatedAtArgs = {
  format?: Scalars['String']['input'];
};


/** Represents a site-wide message to be broadcasted on the homepage. */
export type AnnouncementUpdatedAtArgs = {
  format?: Scalars['String']['input'];
};

export type AnnouncementFilterableColumns =
  | 'CONTENT'
  | 'CREATED_AT'
  | 'ID'
  | 'UPDATED_AT';

export type AnnouncementPagination = {
  /** List of items on the current page */
  data: Array<Announcement>;
  /** Pagination information about the list of items. */
  paginationInfo: PaginationInfo;
};

export type AnnouncementSort =
  | 'CREATED_AT'
  | 'CREATED_AT_DESC'
  | 'ID'
  | 'ID_DESC'
  | 'RANDOM'
  | 'UPDATED_AT'
  | 'UPDATED_AT_DESC';

export type AnnouncementWhereConditionsInput = {
  AND?: InputMaybe<Array<AnnouncementWhereConditionsInput>>;
  OR?: InputMaybe<Array<AnnouncementWhereConditionsInput>>;
  field?: InputMaybe<AnnouncementFilterableColumns>;
  operator?: ComparisonOperator;
  value?: InputMaybe<Scalars['Mixed']['input']>;
};

/**
 * Represents a musical performer of anime sequences.
 *
 * For example, Chiwa Saitou is the musical performer of the Bakemonogatari OP1 theme, among many others.
 */
export type Artist = {
  /** The date that the resource was created */
  createdAt: Maybe<Scalars['String']['output']>;
  groups: ArtistArtistConnection;
  /** The primary key of the resource */
  id: Scalars['Int']['output'];
  images: ArtistImageConnection;
  /** The brief information of the resource */
  information: Maybe<Scalars['String']['output']>;
  memberPerformances: Array<Performance>;
  members: ArtistArtistConnection;
  /** The primary title of the artist */
  name: Scalars['String']['output'];
  performances: Array<Performance>;
  resources: ArtistExternalResourceConnection;
  /** The URL slug & route key of the resource */
  slug: Scalars['String']['output'];
  synonyms: Array<Synonym>;
  /** The date that the resource was updated */
  updatedAt: Maybe<Scalars['String']['output']>;
};


/**
 * Represents a musical performer of anime sequences.
 *
 * For example, Chiwa Saitou is the musical performer of the Bakemonogatari OP1 theme, among many others.
 */
export type ArtistCreatedAtArgs = {
  format?: Scalars['String']['input'];
};


/**
 * Represents a musical performer of anime sequences.
 *
 * For example, Chiwa Saitou is the musical performer of the Bakemonogatari OP1 theme, among many others.
 */
export type ArtistGroupsArgs = {
  createdAt_greater?: InputMaybe<Scalars['String']['input']>;
  createdAt_lesser?: InputMaybe<Scalars['String']['input']>;
  first?: Scalars['Int']['input'];
  id?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  name_like?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<ArtistSort>>;
  updatedAt_greater?: InputMaybe<Scalars['String']['input']>;
  updatedAt_lesser?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<Array<ArtistWhereConditionsInput>>;
};


/**
 * Represents a musical performer of anime sequences.
 *
 * For example, Chiwa Saitou is the musical performer of the Bakemonogatari OP1 theme, among many others.
 */
export type ArtistImagesArgs = {
  createdAt_greater?: InputMaybe<Scalars['String']['input']>;
  createdAt_lesser?: InputMaybe<Scalars['String']['input']>;
  facet?: InputMaybe<ImageFacet>;
  first?: Scalars['Int']['input'];
  id?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  path?: InputMaybe<Scalars['String']['input']>;
  path_like?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<ImageableSort>>;
  updatedAt_greater?: InputMaybe<Scalars['String']['input']>;
  updatedAt_lesser?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<Array<ImageWhereConditionsInput>>;
};


/**
 * Represents a musical performer of anime sequences.
 *
 * For example, Chiwa Saitou is the musical performer of the Bakemonogatari OP1 theme, among many others.
 */
export type ArtistMemberPerformancesArgs = {
  alias?: InputMaybe<Scalars['String']['input']>;
  alias_like?: InputMaybe<Scalars['String']['input']>;
  as?: InputMaybe<Scalars['String']['input']>;
  as_like?: InputMaybe<Scalars['String']['input']>;
  createdAt_greater?: InputMaybe<Scalars['String']['input']>;
  createdAt_lesser?: InputMaybe<Scalars['String']['input']>;
  first?: Scalars['Int']['input'];
  id?: InputMaybe<Scalars['Int']['input']>;
  memberAlias?: InputMaybe<Scalars['String']['input']>;
  memberAlias_like?: InputMaybe<Scalars['String']['input']>;
  memberAs?: InputMaybe<Scalars['String']['input']>;
  memberAs_like?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  relevance?: InputMaybe<Scalars['Int']['input']>;
  relevance_greater?: InputMaybe<Scalars['Int']['input']>;
  relevance_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  relevance_lesser?: InputMaybe<Scalars['Int']['input']>;
  relevance_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  sort?: InputMaybe<Array<PerformanceSort>>;
  updatedAt_greater?: InputMaybe<Scalars['String']['input']>;
  updatedAt_lesser?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<Array<PerformanceWhereConditionsInput>>;
};


/**
 * Represents a musical performer of anime sequences.
 *
 * For example, Chiwa Saitou is the musical performer of the Bakemonogatari OP1 theme, among many others.
 */
export type ArtistMembersArgs = {
  createdAt_greater?: InputMaybe<Scalars['String']['input']>;
  createdAt_lesser?: InputMaybe<Scalars['String']['input']>;
  first?: Scalars['Int']['input'];
  id?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  name_like?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<ArtistMemberSort>>;
  updatedAt_greater?: InputMaybe<Scalars['String']['input']>;
  updatedAt_lesser?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<Array<ArtistWhereConditionsInput>>;
};


/**
 * Represents a musical performer of anime sequences.
 *
 * For example, Chiwa Saitou is the musical performer of the Bakemonogatari OP1 theme, among many others.
 */
export type ArtistPerformancesArgs = {
  alias?: InputMaybe<Scalars['String']['input']>;
  alias_like?: InputMaybe<Scalars['String']['input']>;
  as?: InputMaybe<Scalars['String']['input']>;
  as_like?: InputMaybe<Scalars['String']['input']>;
  createdAt_greater?: InputMaybe<Scalars['String']['input']>;
  createdAt_lesser?: InputMaybe<Scalars['String']['input']>;
  first?: Scalars['Int']['input'];
  id?: InputMaybe<Scalars['Int']['input']>;
  memberAlias?: InputMaybe<Scalars['String']['input']>;
  memberAlias_like?: InputMaybe<Scalars['String']['input']>;
  memberAs?: InputMaybe<Scalars['String']['input']>;
  memberAs_like?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  relevance?: InputMaybe<Scalars['Int']['input']>;
  relevance_greater?: InputMaybe<Scalars['Int']['input']>;
  relevance_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  relevance_lesser?: InputMaybe<Scalars['Int']['input']>;
  relevance_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  sort?: InputMaybe<Array<PerformanceSort>>;
  updatedAt_greater?: InputMaybe<Scalars['String']['input']>;
  updatedAt_lesser?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<Array<PerformanceWhereConditionsInput>>;
};


/**
 * Represents a musical performer of anime sequences.
 *
 * For example, Chiwa Saitou is the musical performer of the Bakemonogatari OP1 theme, among many others.
 */
export type ArtistResourcesArgs = {
  createdAt_greater?: InputMaybe<Scalars['String']['input']>;
  createdAt_lesser?: InputMaybe<Scalars['String']['input']>;
  externalId?: InputMaybe<Scalars['Int']['input']>;
  first?: Scalars['Int']['input'];
  id?: InputMaybe<Scalars['Int']['input']>;
  link?: InputMaybe<Scalars['String']['input']>;
  link_like?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  site?: InputMaybe<ResourceSite>;
  site_in?: InputMaybe<Array<ResourceSite>>;
  site_not_in?: InputMaybe<Array<ResourceSite>>;
  updatedAt_greater?: InputMaybe<Scalars['String']['input']>;
  updatedAt_lesser?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<Array<ExternalResourceWhereConditionsInput>>;
};


/**
 * Represents a musical performer of anime sequences.
 *
 * For example, Chiwa Saitou is the musical performer of the Bakemonogatari OP1 theme, among many others.
 */
export type ArtistSynonymsArgs = {
  createdAt_greater?: InputMaybe<Scalars['String']['input']>;
  createdAt_lesser?: InputMaybe<Scalars['String']['input']>;
  first?: Scalars['Int']['input'];
  id?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<SynonymSort>>;
  text?: InputMaybe<Scalars['String']['input']>;
  text_like?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<SynonymType>;
  type_in?: InputMaybe<Array<SynonymType>>;
  type_not_in?: InputMaybe<Array<SynonymType>>;
  updatedAt_greater?: InputMaybe<Scalars['String']['input']>;
  updatedAt_lesser?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<Array<SynonymWhereConditionsInput>>;
};


/**
 * Represents a musical performer of anime sequences.
 *
 * For example, Chiwa Saitou is the musical performer of the Bakemonogatari OP1 theme, among many others.
 */
export type ArtistUpdatedAtArgs = {
  format?: Scalars['String']['input'];
};

export type ArtistArtistConnection = {
  /** A list of Artist edges. */
  edges: Array<ArtistArtistEdge>;
  /** A list of Artist resources. Use this if you don\'t care about pivot fields. */
  nodes: Array<Artist>;
  /** Pagination information about the list of edges. */
  pageInfo: PaginationInfo;
};

export type ArtistArtistEdge = {
  /** Used to distinguish member by alias */
  alias: Maybe<Scalars['String']['output']>;
  /** Used to distinguish member by character */
  as: Maybe<Scalars['String']['output']>;
  /** The date that the resource was created */
  createdAt: Maybe<Scalars['String']['output']>;
  node: Artist;
  /** Used to extra annotation, like member role */
  notes: Maybe<Scalars['String']['output']>;
  /** Used to determine the relevance order of members in group */
  relevance: Scalars['Int']['output'];
  /** The date that the resource was updated */
  updatedAt: Maybe<Scalars['String']['output']>;
};


export type ArtistArtistEdgeCreatedAtArgs = {
  format?: Scalars['String']['input'];
};


export type ArtistArtistEdgeUpdatedAtArgs = {
  format?: Scalars['String']['input'];
};

export type ArtistExternalResourceConnection = {
  /** A list of ExternalResource edges. */
  edges: Array<ArtistExternalResourceEdge>;
  /** A list of ExternalResource resources. Use this if you don\'t care about pivot fields. */
  nodes: Array<ExternalResource>;
  /** Pagination information about the list of edges. */
  pageInfo: PaginationInfo;
};

export type ArtistExternalResourceEdge = {
  /** Used to distinguish resources that map to the same resourceable */
  as: Maybe<Scalars['String']['output']>;
  /** The date that the resource was created */
  createdAt: Maybe<Scalars['String']['output']>;
  node: ExternalResource;
  /** The date that the resource was updated */
  updatedAt: Maybe<Scalars['String']['output']>;
};


export type ArtistExternalResourceEdgeCreatedAtArgs = {
  format?: Scalars['String']['input'];
};


export type ArtistExternalResourceEdgeUpdatedAtArgs = {
  format?: Scalars['String']['input'];
};

export type ArtistFilterableColumns =
  | 'CREATED_AT'
  | 'ID'
  | 'INFORMATION'
  | 'NAME'
  | 'SLUG'
  | 'UPDATED_AT';

export type ArtistImageConnection = {
  /** A list of Image edges. */
  edges: Array<ArtistImageEdge>;
  /** A list of Image resources. Use this if you don\'t care about pivot fields. */
  nodes: Array<Image>;
  /** Pagination information about the list of edges. */
  pageInfo: PaginationInfo;
};

export type ArtistImageEdge = {
  /** The date that the resource was created */
  createdAt: Maybe<Scalars['String']['output']>;
  /** Used to sort the images */
  depth: Scalars['Int']['output'];
  node: Image;
  /** The date that the resource was updated */
  updatedAt: Maybe<Scalars['String']['output']>;
};


export type ArtistImageEdgeCreatedAtArgs = {
  format?: Scalars['String']['input'];
};


export type ArtistImageEdgeUpdatedAtArgs = {
  format?: Scalars['String']['input'];
};

export type ArtistMemberSort =
  | 'CREATED_AT'
  | 'CREATED_AT_DESC'
  | 'ID'
  | 'ID_DESC'
  | 'MEMBER_ALIAS'
  | 'MEMBER_ALIAS_DESC'
  | 'MEMBER_AS'
  | 'MEMBER_AS_DESC'
  | 'MEMBER_RELEVANCE'
  | 'MEMBER_RELEVANCE_DESC'
  | 'NAME'
  | 'NAME_DESC'
  | 'RANDOM'
  | 'UPDATED_AT'
  | 'UPDATED_AT_DESC';

export type ArtistPagination = {
  /** List of items on the current page */
  data: Array<Artist>;
  /** Pagination information about the list of items. */
  paginationInfo: PaginationInfo;
};

export type ArtistSort =
  | 'CREATED_AT'
  | 'CREATED_AT_DESC'
  | 'ID'
  | 'ID_DESC'
  | 'NAME'
  | 'NAME_DESC'
  | 'RANDOM'
  | 'UPDATED_AT'
  | 'UPDATED_AT_DESC';

export type ArtistWhereConditionsInput = {
  AND?: InputMaybe<Array<ArtistWhereConditionsInput>>;
  OR?: InputMaybe<Array<ArtistWhereConditionsInput>>;
  field?: InputMaybe<ArtistFilterableColumns>;
  operator?: ComparisonOperator;
  value?: InputMaybe<Scalars['Mixed']['input']>;
};

/**
 * Represents the audio track of a video.
 *
 * For example, the audio Bakemonogatari-OP1.ogg represents the audio track of the Bakemonogatari-OP1.webm video.
 */
export type Audio = {
  /** The basename of the file in storage */
  basename: Scalars['String']['output'];
  /** The date that the resource was created */
  createdAt: Maybe<Scalars['String']['output']>;
  /** The filename of the file in storage */
  filename: Scalars['String']['output'];
  /** The primary key of the resource */
  id: Scalars['Int']['output'];
  /** The URL to stream the file from storage */
  link: Scalars['String']['output'];
  /** The media type of the file in storage */
  mimetype: Scalars['String']['output'];
  /** The path of the file in storage */
  path: Scalars['String']['output'];
  /** The size of the file in storage in Bytes */
  size: Scalars['Int']['output'];
  /** The date that the resource was updated */
  updatedAt: Maybe<Scalars['String']['output']>;
  videos: Array<Video>;
};


/**
 * Represents the audio track of a video.
 *
 * For example, the audio Bakemonogatari-OP1.ogg represents the audio track of the Bakemonogatari-OP1.webm video.
 */
export type AudioCreatedAtArgs = {
  format?: Scalars['String']['input'];
};


/**
 * Represents the audio track of a video.
 *
 * For example, the audio Bakemonogatari-OP1.ogg represents the audio track of the Bakemonogatari-OP1.webm video.
 */
export type AudioUpdatedAtArgs = {
  format?: Scalars['String']['input'];
};


/**
 * Represents the audio track of a video.
 *
 * For example, the audio Bakemonogatari-OP1.ogg represents the audio track of the Bakemonogatari-OP1.webm video.
 */
export type AudioVideosArgs = {
  basename?: InputMaybe<Scalars['String']['input']>;
  createdAt_greater?: InputMaybe<Scalars['String']['input']>;
  createdAt_lesser?: InputMaybe<Scalars['String']['input']>;
  filename?: InputMaybe<Scalars['String']['input']>;
  first?: Scalars['Int']['input'];
  id?: InputMaybe<Scalars['Int']['input']>;
  lyrics?: InputMaybe<Scalars['Boolean']['input']>;
  mimetype?: InputMaybe<Scalars['String']['input']>;
  nc?: InputMaybe<Scalars['Boolean']['input']>;
  overlap?: InputMaybe<VideoOverlap>;
  page?: InputMaybe<Scalars['Int']['input']>;
  path?: InputMaybe<Scalars['String']['input']>;
  path_like?: InputMaybe<Scalars['String']['input']>;
  resolution?: InputMaybe<Scalars['Int']['input']>;
  resolution_greater?: InputMaybe<Scalars['Int']['input']>;
  resolution_lesser?: InputMaybe<Scalars['Int']['input']>;
  size_greater?: InputMaybe<Scalars['Int']['input']>;
  size_lesser?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<VideoSort>>;
  source?: InputMaybe<VideoSource>;
  subbed?: InputMaybe<Scalars['Boolean']['input']>;
  tags?: InputMaybe<Scalars['String']['input']>;
  tags_like?: InputMaybe<Scalars['String']['input']>;
  uncen?: InputMaybe<Scalars['Boolean']['input']>;
  updatedAt_greater?: InputMaybe<Scalars['String']['input']>;
  updatedAt_lesser?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<Array<VideoWhereConditionsInput>>;
};

export type AudioFilterableColumns =
  | 'BASENAME'
  | 'CREATED_AT'
  | 'FILENAME'
  | 'ID'
  | 'MIMETYPE'
  | 'PATH'
  | 'SIZE'
  | 'UPDATED_AT';

export type AudioPagination = {
  /** List of items on the current page */
  data: Array<Audio>;
  /** Pagination information about the list of items. */
  paginationInfo: PaginationInfo;
};

export type AudioSort =
  | 'BASENAME'
  | 'BASENAME_DESC'
  | 'CREATED_AT'
  | 'CREATED_AT_DESC'
  | 'FILENAME'
  | 'FILENAME_DESC'
  | 'ID'
  | 'ID_DESC'
  | 'RANDOM'
  | 'SIZE'
  | 'SIZE_DESC'
  | 'UPDATED_AT'
  | 'UPDATED_AT_DESC';

export type AudioWhereConditionsInput = {
  AND?: InputMaybe<Array<AudioWhereConditionsInput>>;
  OR?: InputMaybe<Array<AudioWhereConditionsInput>>;
  field?: InputMaybe<AudioFilterableColumns>;
  operator?: ComparisonOperator;
  value?: InputMaybe<Scalars['Mixed']['input']>;
};

export type ComparisonOperator =
  | 'EQ'
  | 'GT'
  | 'GTE'
  | 'IN'
  | 'LIKE'
  | 'LT'
  | 'LTE'
  | 'NE'
  | 'NOTIN'
  | 'NOTLIKE';

/**
 * Represents a database dump of selected tables at a given point in time.
 *
 * For example, the animethemes-db-dump-wiki-1663559663946.sql dump represents the database dump of wiki tables performed at 2022-09-19.
 */
export type Dump = {
  /** The date that the resource was created */
  createdAt: Scalars['String']['output'];
  /** The primary key of the resource */
  id: Scalars['Int']['output'];
  /** The URL to download the file from storage */
  link: Scalars['String']['output'];
  /** The path of the file in storage */
  path: Scalars['String']['output'];
  /** The date that the resource was updated */
  updatedAt: Scalars['String']['output'];
};


/**
 * Represents a database dump of selected tables at a given point in time.
 *
 * For example, the animethemes-db-dump-wiki-1663559663946.sql dump represents the database dump of wiki tables performed at 2022-09-19.
 */
export type DumpCreatedAtArgs = {
  format?: Scalars['String']['input'];
};


/**
 * Represents a database dump of selected tables at a given point in time.
 *
 * For example, the animethemes-db-dump-wiki-1663559663946.sql dump represents the database dump of wiki tables performed at 2022-09-19.
 */
export type DumpUpdatedAtArgs = {
  format?: Scalars['String']['input'];
};

export type DumpFilterableColumns =
  | 'CREATED_AT'
  | 'ID'
  | 'PATH'
  | 'UPDATED_AT';

export type DumpPagination = {
  /** List of items on the current page */
  data: Array<Dump>;
  /** Pagination information about the list of items. */
  paginationInfo: PaginationInfo;
};

export type DumpSort =
  | 'CREATED_AT'
  | 'CREATED_AT_DESC'
  | 'ID'
  | 'ID_DESC'
  | 'RANDOM'
  | 'UPDATED_AT'
  | 'UPDATED_AT_DESC';

export type DumpWhereConditionsInput = {
  AND?: InputMaybe<Array<DumpWhereConditionsInput>>;
  OR?: InputMaybe<Array<DumpWhereConditionsInput>>;
  field?: InputMaybe<DumpFilterableColumns>;
  operator?: ComparisonOperator;
  value?: InputMaybe<Scalars['Mixed']['input']>;
};

/**
 * Represents an anime entry on the external profile.
 *
 * For example, Hibike Euphonium! is marked as completed on the profile AnimeThemes.
 */
export type ExternalEntry = {
  anime: Anime;
  /** The date that the resource was created */
  createdAt: Maybe<Scalars['String']['output']>;
  externalprofile: ExternalProfile;
  /** The primary key of the resource */
  id: Scalars['Int']['output'];
  /** The favorite state of the entry on the external site */
  isFavorite: Maybe<Scalars['Boolean']['output']>;
  /** The score of the entry on the external site */
  score: Maybe<Scalars['Float']['output']>;
  /** The status of the entry on the external site */
  status: ExternalEntryStatus;
  /** The formatted string value of the status field */
  statusLocalized: Scalars['String']['output'];
  /** The date that the resource was updated */
  updatedAt: Maybe<Scalars['String']['output']>;
};


/**
 * Represents an anime entry on the external profile.
 *
 * For example, Hibike Euphonium! is marked as completed on the profile AnimeThemes.
 */
export type ExternalEntryCreatedAtArgs = {
  format?: Scalars['String']['input'];
};


/**
 * Represents an anime entry on the external profile.
 *
 * For example, Hibike Euphonium! is marked as completed on the profile AnimeThemes.
 */
export type ExternalEntryUpdatedAtArgs = {
  format?: Scalars['String']['input'];
};

export type ExternalEntryFilterableColumns =
  | 'CREATED_AT'
  | 'ID'
  | 'IS_FAVORITE'
  | 'SCORE'
  | 'STATUS'
  | 'UPDATED_AT';

export type ExternalEntryStatus =
  | 'COMPLETED'
  | 'DROPPED'
  | 'PAUSED'
  | 'PLAN_TO_WATCH'
  | 'REWATCHING'
  | 'WATCHING';

export type ExternalEntryWhereConditionsInput = {
  AND?: InputMaybe<Array<ExternalEntryWhereConditionsInput>>;
  OR?: InputMaybe<Array<ExternalEntryWhereConditionsInput>>;
  field?: InputMaybe<ExternalEntryFilterableColumns>;
  operator?: ComparisonOperator;
  value?: InputMaybe<Scalars['Mixed']['input']>;
};

/** Represents a user profile on the external site like MAL. */
export type ExternalProfile = {
  /** The date that the resource was created */
  createdAt: Maybe<Scalars['String']['output']>;
  externalentries: Array<ExternalEntry>;
  /** The primary key of the resource */
  id: Scalars['Int']['output'];
  /** The title of the profile */
  name: Scalars['String']['output'];
  /** The site the profile belongs to */
  site: ExternalProfileSite;
  /** The formatted string value of the site field */
  siteLocalized: Scalars['String']['output'];
  /** The date that the resource was updated */
  updatedAt: Maybe<Scalars['String']['output']>;
  user: Maybe<User>;
  /** The state of who can see the profile */
  visibility: ExternalProfileVisibility;
  /** The formatted string value of the visibility field */
  visibilityLocalized: Scalars['String']['output'];
};


/** Represents a user profile on the external site like MAL. */
export type ExternalProfileCreatedAtArgs = {
  format?: Scalars['String']['input'];
};


/** Represents a user profile on the external site like MAL. */
export type ExternalProfileExternalentriesArgs = {
  createdAt_greater?: InputMaybe<Scalars['String']['input']>;
  createdAt_lesser?: InputMaybe<Scalars['String']['input']>;
  first?: Scalars['Int']['input'];
  id?: InputMaybe<Scalars['Int']['input']>;
  isFavorite?: InputMaybe<Scalars['Boolean']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  score?: InputMaybe<Scalars['Float']['input']>;
  score_greater?: InputMaybe<Scalars['Float']['input']>;
  score_lesser?: InputMaybe<Scalars['Float']['input']>;
  status?: InputMaybe<ExternalEntryStatus>;
  status_in?: InputMaybe<Array<ExternalEntryStatus>>;
  status_not_in?: InputMaybe<Array<ExternalEntryStatus>>;
  updatedAt_greater?: InputMaybe<Scalars['String']['input']>;
  updatedAt_lesser?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<Array<ExternalEntryWhereConditionsInput>>;
};


/** Represents a user profile on the external site like MAL. */
export type ExternalProfileUpdatedAtArgs = {
  format?: Scalars['String']['input'];
};

export type ExternalProfileFilterableColumns =
  | 'CREATED_AT'
  | 'ID'
  | 'NAME'
  | 'SITE'
  | 'UPDATED_AT'
  | 'VISIBILITY';

export type ExternalProfilePagination = {
  /** List of items on the current page */
  data: Array<ExternalProfile>;
  /** Pagination information about the list of items. */
  paginationInfo: PaginationInfo;
};

export type ExternalProfileSite =
  | 'ANILIST'
  | 'KITSU'
  | 'MAL';

/** Represents a notification that is sent to the user when a profile is synced. */
export type ExternalProfileSyncedNotification = {
  /** The date that the resource was created */
  createdAt: Maybe<Scalars['String']['output']>;
  profile: ExternalProfile;
  /** The id of the profile */
  profileId: Scalars['Int']['output'];
  /** The name of the profile */
  profileName: Scalars['String']['output'];
  /** The date that the user read the notification */
  readAt: Maybe<Scalars['String']['output']>;
  /** The type of the notification */
  type: NotificationType;
};


/** Represents a notification that is sent to the user when a profile is synced. */
export type ExternalProfileSyncedNotificationCreatedAtArgs = {
  format?: Scalars['String']['input'];
};


/** Represents a notification that is sent to the user when a profile is synced. */
export type ExternalProfileSyncedNotificationProfileNameArgs = {
  format?: Scalars['String']['input'];
};


/** Represents a notification that is sent to the user when a profile is synced. */
export type ExternalProfileSyncedNotificationReadAtArgs = {
  format?: Scalars['String']['input'];
};

export type ExternalProfileVisibility =
  | 'PRIVATE'
  | 'PUBLIC';

export type ExternalProfileWhereConditionsInput = {
  AND?: InputMaybe<Array<ExternalProfileWhereConditionsInput>>;
  OR?: InputMaybe<Array<ExternalProfileWhereConditionsInput>>;
  field?: InputMaybe<ExternalProfileFilterableColumns>;
  operator?: ComparisonOperator;
  value?: InputMaybe<Scalars['Mixed']['input']>;
};

/**
 * Represents a site with supplementary information for another resource such as an anime or artist.
 *
 * For example, the Bakemonogatari anime has MyAnimeList, AniList and AniDB resources.
 */
export type ExternalResource = {
  anime: ExternalResourceAnimeConnection;
  artists: ExternalResourceArtistConnection;
  /** The date that the resource was created */
  createdAt: Maybe<Scalars['String']['output']>;
  /** The primary key of the resource in the external site */
  externalId: Maybe<Scalars['Int']['output']>;
  /** The primary key of the resource */
  id: Scalars['Int']['output'];
  /** The URL of the external site */
  link: Scalars['String']['output'];
  /** The external site that the resource belongs to */
  site: ResourceSite;
  /** The formatted string value of the site field */
  siteLocalized: Scalars['String']['output'];
  songs: ExternalResourceSongConnection;
  studios: ExternalResourceStudioConnection;
  /** The date that the resource was updated */
  updatedAt: Maybe<Scalars['String']['output']>;
};


/**
 * Represents a site with supplementary information for another resource such as an anime or artist.
 *
 * For example, the Bakemonogatari anime has MyAnimeList, AniList and AniDB resources.
 */
export type ExternalResourceAnimeArgs = {
  createdAt_greater?: InputMaybe<Scalars['String']['input']>;
  createdAt_lesser?: InputMaybe<Scalars['String']['input']>;
  first?: Scalars['Int']['input'];
  format?: InputMaybe<AnimeFormat>;
  format_in?: InputMaybe<Array<AnimeFormat>>;
  format_not_in?: InputMaybe<Array<AnimeFormat>>;
  id?: InputMaybe<Scalars['Int']['input']>;
  mediaFormat?: InputMaybe<AnimeMediaFormat>;
  mediaFormat_in?: InputMaybe<Array<AnimeMediaFormat>>;
  mediaFormat_not_in?: InputMaybe<Array<AnimeMediaFormat>>;
  name?: InputMaybe<Scalars['String']['input']>;
  name_like?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  season?: InputMaybe<AnimeSeason>;
  season_in?: InputMaybe<Array<AnimeSeason>>;
  season_not_in?: InputMaybe<Array<AnimeSeason>>;
  slug?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<AnimeSort>>;
  updatedAt_greater?: InputMaybe<Scalars['String']['input']>;
  updatedAt_lesser?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<Array<AnimeWhereConditionsInput>>;
  year?: InputMaybe<Scalars['Int']['input']>;
  year_greater?: InputMaybe<Scalars['Int']['input']>;
  year_lesser?: InputMaybe<Scalars['Int']['input']>;
};


/**
 * Represents a site with supplementary information for another resource such as an anime or artist.
 *
 * For example, the Bakemonogatari anime has MyAnimeList, AniList and AniDB resources.
 */
export type ExternalResourceArtistsArgs = {
  createdAt_greater?: InputMaybe<Scalars['String']['input']>;
  createdAt_lesser?: InputMaybe<Scalars['String']['input']>;
  first?: Scalars['Int']['input'];
  id?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  name_like?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<ArtistSort>>;
  updatedAt_greater?: InputMaybe<Scalars['String']['input']>;
  updatedAt_lesser?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<Array<ArtistWhereConditionsInput>>;
};


/**
 * Represents a site with supplementary information for another resource such as an anime or artist.
 *
 * For example, the Bakemonogatari anime has MyAnimeList, AniList and AniDB resources.
 */
export type ExternalResourceCreatedAtArgs = {
  format?: Scalars['String']['input'];
};


/**
 * Represents a site with supplementary information for another resource such as an anime or artist.
 *
 * For example, the Bakemonogatari anime has MyAnimeList, AniList and AniDB resources.
 */
export type ExternalResourceSongsArgs = {
  createdAt_greater?: InputMaybe<Scalars['String']['input']>;
  createdAt_lesser?: InputMaybe<Scalars['String']['input']>;
  first?: Scalars['Int']['input'];
  id?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<SongSort>>;
  title?: InputMaybe<Scalars['String']['input']>;
  titleNative?: InputMaybe<Scalars['String']['input']>;
  titleNative_like?: InputMaybe<Scalars['String']['input']>;
  title_like?: InputMaybe<Scalars['String']['input']>;
  updatedAt_greater?: InputMaybe<Scalars['String']['input']>;
  updatedAt_lesser?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<Array<SongWhereConditionsInput>>;
};


/**
 * Represents a site with supplementary information for another resource such as an anime or artist.
 *
 * For example, the Bakemonogatari anime has MyAnimeList, AniList and AniDB resources.
 */
export type ExternalResourceStudiosArgs = {
  createdAt_greater?: InputMaybe<Scalars['String']['input']>;
  createdAt_lesser?: InputMaybe<Scalars['String']['input']>;
  first?: Scalars['Int']['input'];
  id?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  name_like?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<StudioSort>>;
  updatedAt_greater?: InputMaybe<Scalars['String']['input']>;
  updatedAt_lesser?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<Array<StudioWhereConditionsInput>>;
};


/**
 * Represents a site with supplementary information for another resource such as an anime or artist.
 *
 * For example, the Bakemonogatari anime has MyAnimeList, AniList and AniDB resources.
 */
export type ExternalResourceUpdatedAtArgs = {
  format?: Scalars['String']['input'];
};

export type ExternalResourceAnimeConnection = {
  /** A list of Anime edges. */
  edges: Array<ExternalResourceAnimeEdge>;
  /** A list of Anime resources. Use this if you don\'t care about pivot fields. */
  nodes: Array<Anime>;
  /** Pagination information about the list of edges. */
  pageInfo: PaginationInfo;
};

export type ExternalResourceAnimeEdge = {
  /** Used to distinguish resources that map to the same resourceable */
  as: Maybe<Scalars['String']['output']>;
  /** The date that the resource was created */
  createdAt: Maybe<Scalars['String']['output']>;
  node: Anime;
  /** The date that the resource was updated */
  updatedAt: Maybe<Scalars['String']['output']>;
};


export type ExternalResourceAnimeEdgeCreatedAtArgs = {
  format?: Scalars['String']['input'];
};


export type ExternalResourceAnimeEdgeUpdatedAtArgs = {
  format?: Scalars['String']['input'];
};

export type ExternalResourceArtistConnection = {
  /** A list of Artist edges. */
  edges: Array<ExternalResourceArtistEdge>;
  /** A list of Artist resources. Use this if you don\'t care about pivot fields. */
  nodes: Array<Artist>;
  /** Pagination information about the list of edges. */
  pageInfo: PaginationInfo;
};

export type ExternalResourceArtistEdge = {
  /** Used to distinguish resources that map to the same resourceable */
  as: Maybe<Scalars['String']['output']>;
  /** The date that the resource was created */
  createdAt: Maybe<Scalars['String']['output']>;
  node: Artist;
  /** The date that the resource was updated */
  updatedAt: Maybe<Scalars['String']['output']>;
};


export type ExternalResourceArtistEdgeCreatedAtArgs = {
  format?: Scalars['String']['input'];
};


export type ExternalResourceArtistEdgeUpdatedAtArgs = {
  format?: Scalars['String']['input'];
};

export type ExternalResourceFilterableColumns =
  | 'CREATED_AT'
  | 'EXTERNAL_ID'
  | 'ID'
  | 'LINK'
  | 'SITE'
  | 'UPDATED_AT';

export type ExternalResourcePagination = {
  /** List of items on the current page */
  data: Array<ExternalResource>;
  /** Pagination information about the list of items. */
  paginationInfo: PaginationInfo;
};

export type ExternalResourceSongConnection = {
  /** A list of Song edges. */
  edges: Array<ExternalResourceSongEdge>;
  /** A list of Song resources. Use this if you don\'t care about pivot fields. */
  nodes: Array<Song>;
  /** Pagination information about the list of edges. */
  pageInfo: PaginationInfo;
};

export type ExternalResourceSongEdge = {
  /** Used to distinguish resources that map to the same resourceable */
  as: Maybe<Scalars['String']['output']>;
  /** The date that the resource was created */
  createdAt: Maybe<Scalars['String']['output']>;
  node: Song;
  /** The date that the resource was updated */
  updatedAt: Maybe<Scalars['String']['output']>;
};


export type ExternalResourceSongEdgeCreatedAtArgs = {
  format?: Scalars['String']['input'];
};


export type ExternalResourceSongEdgeUpdatedAtArgs = {
  format?: Scalars['String']['input'];
};

export type ExternalResourceStudioConnection = {
  /** A list of Studio edges. */
  edges: Array<ExternalResourceStudioEdge>;
  /** A list of Studio resources. Use this if you don\'t care about pivot fields. */
  nodes: Array<Studio>;
  /** Pagination information about the list of edges. */
  pageInfo: PaginationInfo;
};

export type ExternalResourceStudioEdge = {
  /** Used to distinguish resources that map to the same resourceable */
  as: Maybe<Scalars['String']['output']>;
  /** The date that the resource was created */
  createdAt: Maybe<Scalars['String']['output']>;
  node: Studio;
  /** The date that the resource was updated */
  updatedAt: Maybe<Scalars['String']['output']>;
};


export type ExternalResourceStudioEdgeCreatedAtArgs = {
  format?: Scalars['String']['input'];
};


export type ExternalResourceStudioEdgeUpdatedAtArgs = {
  format?: Scalars['String']['input'];
};

export type ExternalResourceWhereConditionsInput = {
  AND?: InputMaybe<Array<ExternalResourceWhereConditionsInput>>;
  OR?: InputMaybe<Array<ExternalResourceWhereConditionsInput>>;
  field?: InputMaybe<ExternalResourceFilterableColumns>;
  operator?: ComparisonOperator;
  value?: InputMaybe<Scalars['Mixed']['input']>;
};

/**
 * Represents a feature flag that enable/disable site functionalities.
 *
 * For example, the 'allow_discord_notifications' feature enables/disables discord notifications for the configured bot.
 */
export type Feature = {
  /** The date that the resource was created */
  createdAt: Maybe<Scalars['String']['output']>;
  /** The primary key of the resource */
  id: Scalars['Int']['output'];
  /**
   * The title of the resource
   * @deprecated Internal use only
   */
  name: Scalars['String']['output'];
  /** The date that the resource was updated */
  updatedAt: Maybe<Scalars['String']['output']>;
  /**
   * The value of the resource
   * @deprecated Internal use only
   */
  value: Scalars['String']['output'];
};


/**
 * Represents a feature flag that enable/disable site functionalities.
 *
 * For example, the 'allow_discord_notifications' feature enables/disables discord notifications for the configured bot.
 */
export type FeatureCreatedAtArgs = {
  format?: Scalars['String']['input'];
};


/**
 * Represents a feature flag that enable/disable site functionalities.
 *
 * For example, the 'allow_discord_notifications' feature enables/disables discord notifications for the configured bot.
 */
export type FeatureUpdatedAtArgs = {
  format?: Scalars['String']['input'];
};

export type FeatureFilterableColumns =
  | 'CREATED_AT'
  | 'ID'
  | 'NAME'
  | 'UPDATED_AT'
  | 'VALUE';

export type FeaturePagination = {
  /** List of items on the current page */
  data: Array<Feature>;
  /** Pagination information about the list of items. */
  paginationInfo: PaginationInfo;
};

export type FeatureWhereConditionsInput = {
  AND?: InputMaybe<Array<FeatureWhereConditionsInput>>;
  OR?: InputMaybe<Array<FeatureWhereConditionsInput>>;
  field?: InputMaybe<FeatureFilterableColumns>;
  operator?: ComparisonOperator;
  value?: InputMaybe<Scalars['Mixed']['input']>;
};

/** Represents a video to be featured on the homepage of the site for a specified amount of time. */
export type FeaturedTheme = {
  animethemeentry: Maybe<AnimeThemeEntry>;
  /** The date that the resource was created */
  createdAt: Maybe<Scalars['String']['output']>;
  /** The end date of the resource */
  endAt: Scalars['String']['output'];
  /** The primary key of the resource */
  id: Scalars['Int']['output'];
  /** The start date of the resource */
  startAt: Scalars['String']['output'];
  /** The date that the resource was updated */
  updatedAt: Maybe<Scalars['String']['output']>;
  user: Maybe<User>;
  video: Maybe<Video>;
};


/** Represents a video to be featured on the homepage of the site for a specified amount of time. */
export type FeaturedThemeCreatedAtArgs = {
  format?: Scalars['String']['input'];
};


/** Represents a video to be featured on the homepage of the site for a specified amount of time. */
export type FeaturedThemeEndAtArgs = {
  format?: Scalars['String']['input'];
};


/** Represents a video to be featured on the homepage of the site for a specified amount of time. */
export type FeaturedThemeStartAtArgs = {
  format?: Scalars['String']['input'];
};


/** Represents a video to be featured on the homepage of the site for a specified amount of time. */
export type FeaturedThemeUpdatedAtArgs = {
  format?: Scalars['String']['input'];
};

export type FeaturedThemeFilterableColumns =
  | 'CREATED_AT'
  | 'END_AT'
  | 'ID'
  | 'START_AT'
  | 'UPDATED_AT';

export type FeaturedThemePagination = {
  /** List of items on the current page */
  data: Array<FeaturedTheme>;
  /** Pagination information about the list of items. */
  paginationInfo: PaginationInfo;
};

export type FeaturedThemeWhereConditionsInput = {
  AND?: InputMaybe<Array<FeaturedThemeWhereConditionsInput>>;
  OR?: InputMaybe<Array<FeaturedThemeWhereConditionsInput>>;
  field?: InputMaybe<FeaturedThemeFilterableColumns>;
  operator?: ComparisonOperator;
  value?: InputMaybe<Scalars['Mixed']['input']>;
};

/**
 * Represents a visual component for another resource such as an anime or artist.
 *
 * For example, the Bakemonogatari anime has two images to represent small and large cover images.
 */
export type Image = {
  anime: ImageAnimeConnection;
  artists: ImageArtistConnection;
  /** The date that the resource was created */
  createdAt: Maybe<Scalars['String']['output']>;
  /** The component that the resource is intended for */
  facet: ImageFacet;
  /** The formatted string value of the facet field */
  facetLocalized: Scalars['String']['output'];
  /** The primary key of the resource */
  id: Scalars['Int']['output'];
  /** The URL to stream the file from storage */
  link: Scalars['String']['output'];
  /** The path of the file in storage */
  path: Scalars['String']['output'];
  studios: ImageStudioConnection;
  /** The date that the resource was updated */
  updatedAt: Maybe<Scalars['String']['output']>;
};


/**
 * Represents a visual component for another resource such as an anime or artist.
 *
 * For example, the Bakemonogatari anime has two images to represent small and large cover images.
 */
export type ImageAnimeArgs = {
  createdAt_greater?: InputMaybe<Scalars['String']['input']>;
  createdAt_lesser?: InputMaybe<Scalars['String']['input']>;
  first?: Scalars['Int']['input'];
  format?: InputMaybe<AnimeFormat>;
  format_in?: InputMaybe<Array<AnimeFormat>>;
  format_not_in?: InputMaybe<Array<AnimeFormat>>;
  id?: InputMaybe<Scalars['Int']['input']>;
  mediaFormat?: InputMaybe<AnimeMediaFormat>;
  mediaFormat_in?: InputMaybe<Array<AnimeMediaFormat>>;
  mediaFormat_not_in?: InputMaybe<Array<AnimeMediaFormat>>;
  name?: InputMaybe<Scalars['String']['input']>;
  name_like?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  season?: InputMaybe<AnimeSeason>;
  season_in?: InputMaybe<Array<AnimeSeason>>;
  season_not_in?: InputMaybe<Array<AnimeSeason>>;
  slug?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<AnimeSort>>;
  updatedAt_greater?: InputMaybe<Scalars['String']['input']>;
  updatedAt_lesser?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<Array<AnimeWhereConditionsInput>>;
  year?: InputMaybe<Scalars['Int']['input']>;
  year_greater?: InputMaybe<Scalars['Int']['input']>;
  year_lesser?: InputMaybe<Scalars['Int']['input']>;
};


/**
 * Represents a visual component for another resource such as an anime or artist.
 *
 * For example, the Bakemonogatari anime has two images to represent small and large cover images.
 */
export type ImageArtistsArgs = {
  createdAt_greater?: InputMaybe<Scalars['String']['input']>;
  createdAt_lesser?: InputMaybe<Scalars['String']['input']>;
  first?: Scalars['Int']['input'];
  id?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  name_like?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<ArtistSort>>;
  updatedAt_greater?: InputMaybe<Scalars['String']['input']>;
  updatedAt_lesser?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<Array<ArtistWhereConditionsInput>>;
};


/**
 * Represents a visual component for another resource such as an anime or artist.
 *
 * For example, the Bakemonogatari anime has two images to represent small and large cover images.
 */
export type ImageCreatedAtArgs = {
  format?: Scalars['String']['input'];
};


/**
 * Represents a visual component for another resource such as an anime or artist.
 *
 * For example, the Bakemonogatari anime has two images to represent small and large cover images.
 */
export type ImageStudiosArgs = {
  createdAt_greater?: InputMaybe<Scalars['String']['input']>;
  createdAt_lesser?: InputMaybe<Scalars['String']['input']>;
  first?: Scalars['Int']['input'];
  id?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  name_like?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<StudioSort>>;
  updatedAt_greater?: InputMaybe<Scalars['String']['input']>;
  updatedAt_lesser?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<Array<StudioWhereConditionsInput>>;
};


/**
 * Represents a visual component for another resource such as an anime or artist.
 *
 * For example, the Bakemonogatari anime has two images to represent small and large cover images.
 */
export type ImageUpdatedAtArgs = {
  format?: Scalars['String']['input'];
};

export type ImageAnimeConnection = {
  /** A list of Anime edges. */
  edges: Array<ImageAnimeEdge>;
  /** A list of Anime resources. Use this if you don\'t care about pivot fields. */
  nodes: Array<Anime>;
  /** Pagination information about the list of edges. */
  pageInfo: PaginationInfo;
};

export type ImageAnimeEdge = {
  /** The date that the resource was created */
  createdAt: Maybe<Scalars['String']['output']>;
  /** Used to sort the images */
  depth: Scalars['Int']['output'];
  node: Anime;
  /** The date that the resource was updated */
  updatedAt: Maybe<Scalars['String']['output']>;
};


export type ImageAnimeEdgeCreatedAtArgs = {
  format?: Scalars['String']['input'];
};


export type ImageAnimeEdgeUpdatedAtArgs = {
  format?: Scalars['String']['input'];
};

export type ImageArtistConnection = {
  /** A list of Artist edges. */
  edges: Array<ImageArtistEdge>;
  /** A list of Artist resources. Use this if you don\'t care about pivot fields. */
  nodes: Array<Artist>;
  /** Pagination information about the list of edges. */
  pageInfo: PaginationInfo;
};

export type ImageArtistEdge = {
  /** The date that the resource was created */
  createdAt: Maybe<Scalars['String']['output']>;
  /** Used to sort the images */
  depth: Scalars['Int']['output'];
  node: Artist;
  /** The date that the resource was updated */
  updatedAt: Maybe<Scalars['String']['output']>;
};


export type ImageArtistEdgeCreatedAtArgs = {
  format?: Scalars['String']['input'];
};


export type ImageArtistEdgeUpdatedAtArgs = {
  format?: Scalars['String']['input'];
};

export type ImageFacet =
  | 'AVATAR'
  | 'BANNER'
  | 'DOCUMENT'
  | 'GRILL'
  | 'LARGE_COVER'
  | 'SMALL_COVER';

export type ImageFilterableColumns =
  | 'CREATED_AT'
  | 'FACET'
  | 'ID'
  | 'PATH'
  | 'UPDATED_AT';

export type ImagePagination = {
  /** List of items on the current page */
  data: Array<Image>;
  /** Pagination information about the list of items. */
  paginationInfo: PaginationInfo;
};

export type ImageSort =
  | 'CREATED_AT'
  | 'CREATED_AT_DESC'
  | 'ID'
  | 'ID_DESC'
  | 'RANDOM'
  | 'UPDATED_AT'
  | 'UPDATED_AT_DESC';

export type ImageStudioConnection = {
  /** A list of Studio edges. */
  edges: Array<ImageStudioEdge>;
  /** A list of Studio resources. Use this if you don\'t care about pivot fields. */
  nodes: Array<Studio>;
  /** Pagination information about the list of edges. */
  pageInfo: PaginationInfo;
};

export type ImageStudioEdge = {
  /** The date that the resource was created */
  createdAt: Maybe<Scalars['String']['output']>;
  /** Used to sort the images */
  depth: Scalars['Int']['output'];
  node: Studio;
  /** The date that the resource was updated */
  updatedAt: Maybe<Scalars['String']['output']>;
};


export type ImageStudioEdgeCreatedAtArgs = {
  format?: Scalars['String']['input'];
};


export type ImageStudioEdgeUpdatedAtArgs = {
  format?: Scalars['String']['input'];
};

export type ImageWhereConditionsInput = {
  AND?: InputMaybe<Array<ImageWhereConditionsInput>>;
  OR?: InputMaybe<Array<ImageWhereConditionsInput>>;
  field?: InputMaybe<ImageFilterableColumns>;
  operator?: ComparisonOperator;
  value?: InputMaybe<Scalars['Mixed']['input']>;
};

export type ImageableSort =
  | 'CREATED_AT'
  | 'CREATED_AT_DESC'
  | 'DEPTH'
  | 'DEPTH_DESC'
  | 'ID'
  | 'ID_DESC'
  | 'RANDOM'
  | 'UPDATED_AT'
  | 'UPDATED_AT_DESC';

/** Represents a like of a user. */
export type Like = {
  likeable: LikeableUnion;
  user: User;
};

/** Represents the resources that can be liked */
export type LikeableUnion = AnimeThemeEntry | Playlist;

/** Represents the currently authenticated user. */
export type Me = {
  /** The date that the resource was created */
  createdAt: Scalars['String']['output'];
  /** The email of the user */
  email: Scalars['String']['output'];
  /** The date the user verified their email */
  emailVerifiedAt: Scalars['String']['output'];
  /** The primary key of the resource */
  id: Scalars['Int']['output'];
  likes: Array<Like>;
  /** The username of authenticated user */
  name: Scalars['String']['output'];
  notifications: Array<NotificationUnion>;
  permissions: PermissionConnection;
  playlists: Array<Playlist>;
  roles: RoleConnection;
  /** The date the user confirmed their two-factor authentication */
  twoFactorConfirmedAt: Scalars['String']['output'];
  /** The date that the resource was updated */
  updatedAt: Scalars['String']['output'];
  watchHistory: Array<WatchHistory>;
};


/** Represents the currently authenticated user. */
export type MeCreatedAtArgs = {
  format?: Scalars['String']['input'];
};


/** Represents the currently authenticated user. */
export type MeEmailVerifiedAtArgs = {
  format?: Scalars['String']['input'];
};


/** Represents the currently authenticated user. */
export type MeLikesArgs = {
  first?: Scalars['Int']['input'];
  page?: InputMaybe<Scalars['Int']['input']>;
};


/** Represents the currently authenticated user. */
export type MeNotificationsArgs = {
  first?: Scalars['Int']['input'];
  page?: InputMaybe<Scalars['Int']['input']>;
};


/** Represents the currently authenticated user. */
export type MePermissionsArgs = {
  createdAt_greater?: InputMaybe<Scalars['String']['input']>;
  createdAt_lesser?: InputMaybe<Scalars['String']['input']>;
  first?: Scalars['Int']['input'];
  id?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  name_like?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  updatedAt_greater?: InputMaybe<Scalars['String']['input']>;
  updatedAt_lesser?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<Array<PermissionWhereConditionsInput>>;
};


/** Represents the currently authenticated user. */
export type MePlaylistsArgs = {
  createdAt_greater?: InputMaybe<Scalars['String']['input']>;
  createdAt_lesser?: InputMaybe<Scalars['String']['input']>;
  first?: Scalars['Int']['input'];
  id?: InputMaybe<Scalars['String']['input']>;
  id_like?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  name_like?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<PlaylistSort>>;
  updatedAt_greater?: InputMaybe<Scalars['String']['input']>;
  updatedAt_lesser?: InputMaybe<Scalars['String']['input']>;
  visibility?: InputMaybe<PlaylistVisibility>;
  where?: InputMaybe<Array<PlaylistWhereConditionsInput>>;
};


/** Represents the currently authenticated user. */
export type MeRolesArgs = {
  color?: InputMaybe<Scalars['String']['input']>;
  color_like?: InputMaybe<Scalars['String']['input']>;
  createdAt_greater?: InputMaybe<Scalars['String']['input']>;
  createdAt_lesser?: InputMaybe<Scalars['String']['input']>;
  default?: InputMaybe<Scalars['String']['input']>;
  default_like?: InputMaybe<Scalars['String']['input']>;
  first?: Scalars['Int']['input'];
  id?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  name_like?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  priority?: InputMaybe<Scalars['Int']['input']>;
  priority_greater?: InputMaybe<Scalars['Int']['input']>;
  priority_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  priority_lesser?: InputMaybe<Scalars['Int']['input']>;
  priority_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  updatedAt_greater?: InputMaybe<Scalars['String']['input']>;
  updatedAt_lesser?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<Array<RoleWhereConditionsInput>>;
};


/** Represents the currently authenticated user. */
export type MeTwoFactorConfirmedAtArgs = {
  format?: Scalars['String']['input'];
};


/** Represents the currently authenticated user. */
export type MeUpdatedAtArgs = {
  format?: Scalars['String']['input'];
};


/** Represents the currently authenticated user. */
export type MeWatchHistoryArgs = {
  first?: Scalars['Int']['input'];
  page?: InputMaybe<Scalars['Int']['input']>;
};

/** Represents a response containing a message. */
export type MessageResponse = {
  message: Scalars['String']['output'];
};

export type Mutation = {
  CreatePlaylist: Playlist;
  CreatePlaylistTrack: PlaylistTrack;
  DeletePlaylist: MessageResponse;
  DeletePlaylistTrack: MessageResponse;
  ToggleLike: Maybe<Like>;
  UpdatePlaylist: Playlist;
  UpdatePlaylistTrack: PlaylistTrack;
  /** Mark a video as watched. */
  Watch: WatchHistory;
};


export type MutationCreatePlaylistArgs = {
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  visibility: PlaylistVisibility;
};


export type MutationCreatePlaylistTrackArgs = {
  entryId: Scalars['Int']['input'];
  next?: InputMaybe<Scalars['String']['input']>;
  playlist: Scalars['String']['input'];
  previous?: InputMaybe<Scalars['String']['input']>;
  videoId: Scalars['Int']['input'];
};


export type MutationDeletePlaylistArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeletePlaylistTrackArgs = {
  id: Scalars['String']['input'];
  playlist: Scalars['String']['input'];
};


export type MutationToggleLikeArgs = {
  entry?: InputMaybe<Scalars['Int']['input']>;
  playlist?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUpdatePlaylistArgs = {
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  visibility?: InputMaybe<PlaylistVisibility>;
};


export type MutationUpdatePlaylistTrackArgs = {
  entryId?: InputMaybe<Scalars['Int']['input']>;
  id: Scalars['String']['input'];
  next?: InputMaybe<Scalars['String']['input']>;
  playlist: Scalars['String']['input'];
  previous?: InputMaybe<Scalars['String']['input']>;
  videoId?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationWatchArgs = {
  entryId: Scalars['Int']['input'];
  videoId: Scalars['Int']['input'];
};

export type NotificationType =
  | 'PROFILE_SYNCED';

/** Represents the notification types. */
export type NotificationUnion = ExternalProfileSyncedNotification;

/**
 * Represents a static markdown page used for guides and other documentation.
 *
 * For example, the 'encoding/audio_normalization' page represents the documentation for audio normalization.
 */
export type Page = {
  /** The body content of the resource */
  body: Scalars['String']['output'];
  /** The date that the resource was created */
  createdAt: Scalars['String']['output'];
  /** The primary key of the resource */
  id: Scalars['Int']['output'];
  /** The primary title of the page */
  name: Scalars['String']['output'];
  next: Maybe<Page>;
  previous: Maybe<Page>;
  /** The URL slug & route key of the resource */
  slug: Scalars['String']['output'];
  /** The date that the resource was updated */
  updatedAt: Scalars['String']['output'];
};


/**
 * Represents a static markdown page used for guides and other documentation.
 *
 * For example, the 'encoding/audio_normalization' page represents the documentation for audio normalization.
 */
export type PageCreatedAtArgs = {
  format?: Scalars['String']['input'];
};


/**
 * Represents a static markdown page used for guides and other documentation.
 *
 * For example, the 'encoding/audio_normalization' page represents the documentation for audio normalization.
 */
export type PageUpdatedAtArgs = {
  format?: Scalars['String']['input'];
};

export type PageFilterableColumns =
  | 'BODY'
  | 'CREATED_AT'
  | 'ID'
  | 'NAME'
  | 'SLUG'
  | 'UPDATED_AT';

export type PagePagination = {
  /** List of items on the current page */
  data: Array<Page>;
  /** Pagination information about the list of items. */
  paginationInfo: PaginationInfo;
};

export type PageSort =
  | 'CREATED_AT'
  | 'CREATED_AT_DESC'
  | 'ID'
  | 'ID_DESC'
  | 'NAME'
  | 'NAME_DESC'
  | 'RANDOM'
  | 'SLUG'
  | 'SLUG_DESC'
  | 'UPDATED_AT'
  | 'UPDATED_AT_DESC';

export type PageWhereConditionsInput = {
  AND?: InputMaybe<Array<PageWhereConditionsInput>>;
  OR?: InputMaybe<Array<PageWhereConditionsInput>>;
  field?: InputMaybe<PageFilterableColumns>;
  operator?: ComparisonOperator;
  value?: InputMaybe<Scalars['Mixed']['input']>;
};

export type PaginationInfo = {
  /** Number of items in the current page. */
  count: Scalars['Int']['output'];
  /** Current page of the cursor */
  currentPage: Scalars['Int']['output'];
  /** Number of the first item returned */
  from: Maybe<Scalars['Int']['output']>;
  /** Determines if cursor has more pages after the current page */
  hasMorePages: Scalars['Boolean']['output'];
  /** The last page (number of pages) */
  lastPage: Scalars['Int']['output'];
  /** Number of items returned per page */
  perPage: Scalars['Int']['output'];
  /** Number of the last item returned */
  to: Maybe<Scalars['Int']['output']>;
  /** Number of total items selected by the query */
  total: Scalars['Int']['output'];
};

/** Represents the link between a song and an artist or group. */
export type Performance = {
  /** The alias the artist is using for this performance */
  alias: Maybe<Scalars['String']['output']>;
  artist: Artist;
  /** The character the artist is performing as */
  as: Maybe<Scalars['String']['output']>;
  /** The date that the resource was created */
  createdAt: Maybe<Scalars['String']['output']>;
  /** The primary key of the resource */
  id: Scalars['Int']['output'];
  member: Maybe<Artist>;
  /** The alias the member is using for this performance */
  memberAlias: Maybe<Scalars['String']['output']>;
  /** The character the member is performing as */
  memberAs: Maybe<Scalars['String']['output']>;
  /** Used to determine the relevance order of artists in performances */
  relevance: Scalars['Int']['output'];
  song: Song;
  /** The date that the resource was updated */
  updatedAt: Maybe<Scalars['String']['output']>;
};


/** Represents the link between a song and an artist or group. */
export type PerformanceCreatedAtArgs = {
  format?: Scalars['String']['input'];
};


/** Represents the link between a song and an artist or group. */
export type PerformanceUpdatedAtArgs = {
  format?: Scalars['String']['input'];
};

export type PerformanceFilterableColumns =
  | 'ALIAS'
  | 'AS'
  | 'CREATED_AT'
  | 'ID'
  | 'MEMBER_ALIAS'
  | 'MEMBER_AS'
  | 'RELEVANCE'
  | 'UPDATED_AT';

export type PerformancePagination = {
  /** List of items on the current page */
  data: Array<Performance>;
  /** Pagination information about the list of items. */
  paginationInfo: PaginationInfo;
};

export type PerformanceSort =
  | 'ALIAS'
  | 'ALIAS_DESC'
  | 'AS'
  | 'AS_DESC'
  | 'CREATED_AT'
  | 'CREATED_AT_DESC'
  | 'ID'
  | 'ID_DESC'
  | 'MEMBER_ALIAS'
  | 'MEMBER_ALIAS_DESC'
  | 'MEMBER_AS'
  | 'MEMBER_AS_DESC'
  | 'RANDOM'
  | 'RELEVANCE'
  | 'RELEVANCE_DESC'
  | 'UPDATED_AT'
  | 'UPDATED_AT_DESC';

export type PerformanceWhereConditionsInput = {
  AND?: InputMaybe<Array<PerformanceWhereConditionsInput>>;
  OR?: InputMaybe<Array<PerformanceWhereConditionsInput>>;
  field?: InputMaybe<PerformanceFilterableColumns>;
  operator?: ComparisonOperator;
  value?: InputMaybe<Scalars['Mixed']['input']>;
};

/** Represents an assignable label for users and roles that authorizes a particular action in AnimeThemes. */
export type Permission = {
  /** The date that the resource was created */
  createdAt: Maybe<Scalars['String']['output']>;
  /** The primary key of the resource */
  id: Scalars['Int']['output'];
  /** The label of the resource */
  name: Scalars['String']['output'];
  /** The date that the resource was updated */
  updatedAt: Maybe<Scalars['String']['output']>;
};


/** Represents an assignable label for users and roles that authorizes a particular action in AnimeThemes. */
export type PermissionCreatedAtArgs = {
  format?: Scalars['String']['input'];
};


/** Represents an assignable label for users and roles that authorizes a particular action in AnimeThemes. */
export type PermissionUpdatedAtArgs = {
  format?: Scalars['String']['input'];
};

export type PermissionConnection = {
  /** A list of Permission edges. */
  edges: Array<PermissionEdge>;
  /** A list of Permission resources. Use this if you don\'t care about pivot fields. */
  nodes: Array<Permission>;
  /** Pagination information about the list of edges. */
  pageInfo: PaginationInfo;
};

export type PermissionEdge = {
  node: Permission;
};

export type PermissionFilterableColumns =
  | 'CREATED_AT'
  | 'ID'
  | 'NAME'
  | 'UPDATED_AT';

export type PermissionWhereConditionsInput = {
  AND?: InputMaybe<Array<PermissionWhereConditionsInput>>;
  OR?: InputMaybe<Array<PermissionWhereConditionsInput>>;
  field?: InputMaybe<PermissionFilterableColumns>;
  operator?: ComparisonOperator;
  value?: InputMaybe<Scalars['Mixed']['input']>;
};

/**
 * Represents a list of ordered tracks intended for continuous playback.
 *
 * For example, a "/r/anime's Best OPs and EDs of 2022" playlist may contain a collection of tracks allowing the continuous playback of Best OP and ED nominations for the /r/anime Awards.
 */
export type Playlist = {
  /** The date that the resource was created */
  createdAt: Maybe<Scalars['String']['output']>;
  /** The description of the playlist */
  description: Maybe<Scalars['String']['output']>;
  first: Maybe<PlaylistTrack>;
  /** The primary key of the resource */
  id: Scalars['String']['output'];
  images: PlaylistImageConnection;
  last: Maybe<PlaylistTrack>;
  /** The number of likes recorded for the resource */
  likesCount: Scalars['Int']['output'];
  /** The title of the playlist */
  name: Scalars['String']['output'];
  tracks: Array<PlaylistTrack>;
  /** The number of tracks belonging to the resource */
  tracksCount: Scalars['Int']['output'];
  /** The existence of tracks belonging to the resource */
  tracksExists: Scalars['Boolean']['output'];
  /** The date that the resource was updated */
  updatedAt: Maybe<Scalars['String']['output']>;
  user: User;
  /** The state of who can see the playlist */
  visibility: PlaylistVisibility;
  /** The formatted string value of the visibility field */
  visibilityLocalized: Scalars['String']['output'];
};


/**
 * Represents a list of ordered tracks intended for continuous playback.
 *
 * For example, a "/r/anime's Best OPs and EDs of 2022" playlist may contain a collection of tracks allowing the continuous playback of Best OP and ED nominations for the /r/anime Awards.
 */
export type PlaylistCreatedAtArgs = {
  format?: Scalars['String']['input'];
};


/**
 * Represents a list of ordered tracks intended for continuous playback.
 *
 * For example, a "/r/anime's Best OPs and EDs of 2022" playlist may contain a collection of tracks allowing the continuous playback of Best OP and ED nominations for the /r/anime Awards.
 */
export type PlaylistImagesArgs = {
  createdAt_greater?: InputMaybe<Scalars['String']['input']>;
  createdAt_lesser?: InputMaybe<Scalars['String']['input']>;
  facet?: InputMaybe<ImageFacet>;
  first?: Scalars['Int']['input'];
  id?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  path?: InputMaybe<Scalars['String']['input']>;
  path_like?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<ImageableSort>>;
  updatedAt_greater?: InputMaybe<Scalars['String']['input']>;
  updatedAt_lesser?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<Array<ImageWhereConditionsInput>>;
};


/**
 * Represents a list of ordered tracks intended for continuous playback.
 *
 * For example, a "/r/anime's Best OPs and EDs of 2022" playlist may contain a collection of tracks allowing the continuous playback of Best OP and ED nominations for the /r/anime Awards.
 */
export type PlaylistTracksArgs = {
  createdAt_greater?: InputMaybe<Scalars['String']['input']>;
  createdAt_lesser?: InputMaybe<Scalars['String']['input']>;
  first?: Scalars['Int']['input'];
  id?: InputMaybe<Scalars['String']['input']>;
  id_like?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  position?: InputMaybe<Scalars['Int']['input']>;
  position_greater?: InputMaybe<Scalars['Int']['input']>;
  position_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  position_lesser?: InputMaybe<Scalars['Int']['input']>;
  position_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  sort?: InputMaybe<Array<PlaylistTrackSort>>;
  updatedAt_greater?: InputMaybe<Scalars['String']['input']>;
  updatedAt_lesser?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<Array<PlaylistTrackWhereConditionsInput>>;
};


/**
 * Represents a list of ordered tracks intended for continuous playback.
 *
 * For example, a "/r/anime's Best OPs and EDs of 2022" playlist may contain a collection of tracks allowing the continuous playback of Best OP and ED nominations for the /r/anime Awards.
 */
export type PlaylistUpdatedAtArgs = {
  format?: Scalars['String']['input'];
};

export type PlaylistFilterableColumns =
  | 'CREATED_AT'
  | 'DESCRIPTION'
  | 'ID'
  | 'LIKES_COUNT'
  | 'NAME'
  | 'TRACKS_COUNT'
  | 'TRACKS_EXISTS'
  | 'UPDATED_AT'
  | 'VISIBILITY';

export type PlaylistImageConnection = {
  /** A list of Image edges. */
  edges: Array<PlaylistImageEdge>;
  /** A list of Image resources. Use this if you don\'t care about pivot fields. */
  nodes: Array<Image>;
  /** Pagination information about the list of edges. */
  pageInfo: PaginationInfo;
};

export type PlaylistImageEdge = {
  /** The date that the resource was created */
  createdAt: Maybe<Scalars['String']['output']>;
  /** Used to sort the images */
  depth: Scalars['Int']['output'];
  node: Image;
  /** The date that the resource was updated */
  updatedAt: Maybe<Scalars['String']['output']>;
};


export type PlaylistImageEdgeCreatedAtArgs = {
  format?: Scalars['String']['input'];
};


export type PlaylistImageEdgeUpdatedAtArgs = {
  format?: Scalars['String']['input'];
};

export type PlaylistPagination = {
  /** List of items on the current page */
  data: Array<Playlist>;
  /** Pagination information about the list of items. */
  paginationInfo: PaginationInfo;
};

export type PlaylistSort =
  | 'CREATED_AT'
  | 'CREATED_AT_DESC'
  | 'ID'
  | 'ID_DESC'
  | 'LIKES_COUNT'
  | 'LIKES_COUNT_DESC'
  | 'NAME'
  | 'NAME_DESC'
  | 'RANDOM'
  | 'TRACKS_COUNT'
  | 'TRACKS_COUNT_DESC'
  | 'UPDATED_AT'
  | 'UPDATED_AT_DESC';

/**
 * Represents an entry in a playlist.
 *
 * For example, a "/r/anime's Best OPs and EDs of 2022" playlist may contain a track for the ParipiKoumei-OP1.webm video.
 */
export type PlaylistTrack = {
  animethemeentry: AnimeThemeEntry;
  /** The date that the resource was created */
  createdAt: Maybe<Scalars['String']['output']>;
  /** The primary key of the resource */
  id: Scalars['String']['output'];
  /** @deprecated No longer used */
  next: Maybe<PlaylistTrack>;
  playlist: Playlist;
  /** The position of the playlist track within the playlist */
  position: Scalars['Int']['output'];
  /** @deprecated No longer used */
  previous: Maybe<PlaylistTrack>;
  /** The date that the resource was updated */
  updatedAt: Maybe<Scalars['String']['output']>;
  video: Video;
};


/**
 * Represents an entry in a playlist.
 *
 * For example, a "/r/anime's Best OPs and EDs of 2022" playlist may contain a track for the ParipiKoumei-OP1.webm video.
 */
export type PlaylistTrackCreatedAtArgs = {
  format?: Scalars['String']['input'];
};


/**
 * Represents an entry in a playlist.
 *
 * For example, a "/r/anime's Best OPs and EDs of 2022" playlist may contain a track for the ParipiKoumei-OP1.webm video.
 */
export type PlaylistTrackUpdatedAtArgs = {
  format?: Scalars['String']['input'];
};

export type PlaylistTrackFilterableColumns =
  | 'CREATED_AT'
  | 'ENTRY_ID'
  | 'ID'
  | 'POSITION'
  | 'UPDATED_AT'
  | 'VIDEO_ID';

export type PlaylistTrackPagination = {
  /** List of items on the current page */
  data: Array<PlaylistTrack>;
  /** Pagination information about the list of items. */
  paginationInfo: PaginationInfo;
};

export type PlaylistTrackSort =
  | 'CREATED_AT'
  | 'CREATED_AT_DESC'
  | 'ID'
  | 'ID_DESC'
  | 'POSITION'
  | 'POSITION_DESC'
  | 'RANDOM'
  | 'UPDATED_AT'
  | 'UPDATED_AT_DESC';

export type PlaylistTrackWhereConditionsInput = {
  AND?: InputMaybe<Array<PlaylistTrackWhereConditionsInput>>;
  OR?: InputMaybe<Array<PlaylistTrackWhereConditionsInput>>;
  field?: InputMaybe<PlaylistTrackFilterableColumns>;
  operator?: ComparisonOperator;
  value?: InputMaybe<Scalars['Mixed']['input']>;
};

export type PlaylistVisibility =
  | 'PRIVATE'
  | 'PUBLIC'
  | 'UNLISTED';

export type PlaylistWhereConditionsInput = {
  AND?: InputMaybe<Array<PlaylistWhereConditionsInput>>;
  OR?: InputMaybe<Array<PlaylistWhereConditionsInput>>;
  field?: InputMaybe<PlaylistFilterableColumns>;
  operator?: ComparisonOperator;
  value?: InputMaybe<Scalars['Mixed']['input']>;
};

export type Query = {
  /** Returns an anime resource. */
  anime: Anime;
  /** Returns a listing of anime resources given fields. */
  animePagination: AnimePagination;
  /**
   * Returns a listing of anime synonyms resources given fields.
   * @deprecated Internal use only.
   */
  animesynonymPagination: AnimeSynonymPagination;
  /** Returns a listing of anime themes resources given fields. */
  animethemePagination: AnimeThemePagination;
  /** Shuffle themes. */
  animethemeShuffle: Array<AnimeTheme>;
  /**
   * Returns a listing of anime theme entries resources given fields.
   * @deprecated Internal use only
   */
  animethemeentryPagination: AnimeThemeEntryPagination;
  /** Returns a list of years grouped by its seasons. */
  animeyears: Array<AnimeYear>;
  /** Returns a listing of announcement resources given fields. */
  announcementPagination: AnnouncementPagination;
  /** Returns an artist resource. */
  artist: Artist;
  /** Returns a listing of artist resources given fields. */
  artistPagination: ArtistPagination;
  /** Returns a listing of audio resources given fields. */
  audioPagination: AudioPagination;
  /** Returns the first featured theme where the current date is between start_at and end_at dates. */
  currentfeaturedtheme: Maybe<FeaturedTheme>;
  /** Returns a listing of dump resources given fields. */
  dumpPagination: DumpPagination;
  /** Returns a listing of external profile resources given fields. */
  externalprofilePagination: ExternalProfilePagination;
  /**
   * Returns a listing of resources given fields.
   * @deprecated Internal use only
   */
  externalresourcePagination: ExternalResourcePagination;
  /**
   * Returns a listing of feature resources given fields.
   * @deprecated Internal use only
   */
  featurePagination: FeaturePagination;
  /**
   * Returns a listing of featured theme resources given fields.
   * @deprecated Internal use only
   */
  featuredthemePagination: FeaturedThemePagination;
  /** Filter anime by its external id on given site. */
  findAnimeByExternalSite: Array<Anime>;
  /** Returns a listing of images resources given fields. */
  imagePagination: ImagePagination;
  /** Returns the data of the currently authenticated user. */
  me: Maybe<Me>;
  /** Returns a page resource. */
  page: Page;
  /** Returns a listing of page resources given fields. */
  pagePagination: PagePagination;
  /**
   * Returns a listing of performances resources given fields.
   * @deprecated Internal use only
   */
  performancePagination: PerformancePagination;
  /** Returns a playlist resource. */
  playlist: Playlist;
  /** Returns a listing of playlist resources given fields. */
  playlistPagination: PlaylistPagination;
  /** Returns a playlist track resource. */
  playlisttrack: PlaylistTrack;
  /**
   * Returns a listing of tracks for the playlist.
   * @deprecated Internal use only. Use the playlistPagination.tracks relationship instead.
   */
  playlisttrackPagination: PlaylistTrackPagination;
  /** Returns a listing of resources that match a given search term. */
  search: Search;
  /** Returns a series resource. */
  series: Series;
  /** Returns a listing of series resources given fields. */
  seriesPagination: SeriesPagination;
  /** Returns a listing of song resources given fields. */
  songPagination: SongPagination;
  /** Returns a studio resource. */
  studio: Studio;
  /** Returns a listing of studio resources given fields. */
  studioPagination: StudioPagination;
  /**
   * Returns a listing of synonyms resources given fields.
   * @deprecated Internal use only
   */
  synonymPagination: SynonymPagination;
  /** Returns a listing of theme groups resources given fields. */
  themegroupPagination: ThemeGroupPagination;
  /** Returns a video resource. */
  video: Video;
  /** Returns a listing of video resources given fields. */
  videoPagination: VideoPagination;
  /**
   * Returns a listing of scripts resources given fields.
   * @deprecated Internal use only
   */
  videoscriptPagination: VideoScriptPagination;
};


export type QueryAnimeArgs = {
  slug: Scalars['String']['input'];
};


export type QueryAnimePaginationArgs = {
  createdAt_greater?: InputMaybe<Scalars['String']['input']>;
  createdAt_lesser?: InputMaybe<Scalars['String']['input']>;
  first?: Scalars['Int']['input'];
  format?: InputMaybe<AnimeFormat>;
  format_in?: InputMaybe<Array<AnimeFormat>>;
  format_not_in?: InputMaybe<Array<AnimeFormat>>;
  id?: InputMaybe<Scalars['Int']['input']>;
  mediaFormat?: InputMaybe<AnimeMediaFormat>;
  mediaFormat_in?: InputMaybe<Array<AnimeMediaFormat>>;
  mediaFormat_not_in?: InputMaybe<Array<AnimeMediaFormat>>;
  name?: InputMaybe<Scalars['String']['input']>;
  name_like?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  season?: InputMaybe<AnimeSeason>;
  season_in?: InputMaybe<Array<AnimeSeason>>;
  season_not_in?: InputMaybe<Array<AnimeSeason>>;
  slug?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<AnimeSort>>;
  updatedAt_greater?: InputMaybe<Scalars['String']['input']>;
  updatedAt_lesser?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<Array<AnimeWhereConditionsInput>>;
  year?: InputMaybe<Scalars['Int']['input']>;
  year_greater?: InputMaybe<Scalars['Int']['input']>;
  year_lesser?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryAnimesynonymPaginationArgs = {
  createdAt_greater?: InputMaybe<Scalars['String']['input']>;
  createdAt_lesser?: InputMaybe<Scalars['String']['input']>;
  first?: Scalars['Int']['input'];
  id?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  text?: InputMaybe<Scalars['String']['input']>;
  text_like?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<AnimeSynonymType>;
  type_in?: InputMaybe<Array<AnimeSynonymType>>;
  type_not_in?: InputMaybe<Array<AnimeSynonymType>>;
  updatedAt_greater?: InputMaybe<Scalars['String']['input']>;
  updatedAt_lesser?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<Array<AnimeSynonymWhereConditionsInput>>;
};


export type QueryAnimethemePaginationArgs = {
  createdAt_greater?: InputMaybe<Scalars['String']['input']>;
  createdAt_lesser?: InputMaybe<Scalars['String']['input']>;
  first?: Scalars['Int']['input'];
  id?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sequence?: InputMaybe<Scalars['Int']['input']>;
  sequence_greater?: InputMaybe<Scalars['Int']['input']>;
  sequence_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  sequence_lesser?: InputMaybe<Scalars['Int']['input']>;
  sequence_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  slug?: InputMaybe<Scalars['String']['input']>;
  slug_like?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<AnimeThemeSort>>;
  type?: InputMaybe<ThemeType>;
  type_in?: InputMaybe<Array<ThemeType>>;
  type_not_in?: InputMaybe<Array<ThemeType>>;
  updatedAt_greater?: InputMaybe<Scalars['String']['input']>;
  updatedAt_lesser?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<Array<AnimeThemeWhereConditionsInput>>;
};


export type QueryAnimethemeShuffleArgs = {
  first?: Scalars['Int']['input'];
  format?: InputMaybe<Array<AnimeFormat>>;
  spoiler?: InputMaybe<Scalars['Boolean']['input']>;
  type?: InputMaybe<Array<ThemeType>>;
  year_gte?: InputMaybe<Scalars['Int']['input']>;
  year_lte?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryAnimethemeentryPaginationArgs = {
  createdAt_greater?: InputMaybe<Scalars['String']['input']>;
  createdAt_lesser?: InputMaybe<Scalars['String']['input']>;
  episodes?: InputMaybe<Scalars['String']['input']>;
  episodes_like?: InputMaybe<Scalars['String']['input']>;
  first?: Scalars['Int']['input'];
  id?: InputMaybe<Scalars['Int']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  notes_like?: InputMaybe<Scalars['String']['input']>;
  nsfw?: InputMaybe<Scalars['Boolean']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<AnimeThemeEntrySort>>;
  spoiler?: InputMaybe<Scalars['Boolean']['input']>;
  updatedAt_greater?: InputMaybe<Scalars['String']['input']>;
  updatedAt_lesser?: InputMaybe<Scalars['String']['input']>;
  version?: InputMaybe<Scalars['Int']['input']>;
  version_greater?: InputMaybe<Scalars['Int']['input']>;
  version_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  version_lesser?: InputMaybe<Scalars['Int']['input']>;
  version_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  where?: InputMaybe<Array<AnimeThemeEntryWhereConditionsInput>>;
};


export type QueryAnimeyearsArgs = {
  year?: InputMaybe<Array<Scalars['Int']['input']>>;
};


export type QueryAnnouncementPaginationArgs = {
  createdAt_greater?: InputMaybe<Scalars['String']['input']>;
  createdAt_lesser?: InputMaybe<Scalars['String']['input']>;
  first?: Scalars['Int']['input'];
  id?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<AnnouncementSort>>;
  updatedAt_greater?: InputMaybe<Scalars['String']['input']>;
  updatedAt_lesser?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<Array<AnnouncementWhereConditionsInput>>;
};


export type QueryArtistArgs = {
  slug: Scalars['String']['input'];
};


export type QueryArtistPaginationArgs = {
  createdAt_greater?: InputMaybe<Scalars['String']['input']>;
  createdAt_lesser?: InputMaybe<Scalars['String']['input']>;
  first?: Scalars['Int']['input'];
  id?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  name_like?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<ArtistSort>>;
  updatedAt_greater?: InputMaybe<Scalars['String']['input']>;
  updatedAt_lesser?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<Array<ArtistWhereConditionsInput>>;
};


export type QueryAudioPaginationArgs = {
  basename?: InputMaybe<Scalars['String']['input']>;
  createdAt_greater?: InputMaybe<Scalars['String']['input']>;
  createdAt_lesser?: InputMaybe<Scalars['String']['input']>;
  filename?: InputMaybe<Scalars['String']['input']>;
  first?: Scalars['Int']['input'];
  id?: InputMaybe<Scalars['Int']['input']>;
  mimetype?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  path?: InputMaybe<Scalars['String']['input']>;
  path_like?: InputMaybe<Scalars['String']['input']>;
  size_greater?: InputMaybe<Scalars['Int']['input']>;
  size_lesser?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<AudioSort>>;
  updatedAt_greater?: InputMaybe<Scalars['String']['input']>;
  updatedAt_lesser?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<Array<AudioWhereConditionsInput>>;
};


export type QueryDumpPaginationArgs = {
  createdAt_greater?: InputMaybe<Scalars['String']['input']>;
  createdAt_lesser?: InputMaybe<Scalars['String']['input']>;
  first?: Scalars['Int']['input'];
  id?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<DumpSort>>;
  updatedAt_greater?: InputMaybe<Scalars['String']['input']>;
  updatedAt_lesser?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<Array<DumpWhereConditionsInput>>;
};


export type QueryExternalprofilePaginationArgs = {
  createdAt_greater?: InputMaybe<Scalars['String']['input']>;
  createdAt_lesser?: InputMaybe<Scalars['String']['input']>;
  first?: Scalars['Int']['input'];
  id?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  name_like?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  site?: InputMaybe<ExternalProfileSite>;
  updatedAt_greater?: InputMaybe<Scalars['String']['input']>;
  updatedAt_lesser?: InputMaybe<Scalars['String']['input']>;
  visibility?: InputMaybe<ExternalProfileVisibility>;
  where?: InputMaybe<Array<ExternalProfileWhereConditionsInput>>;
};


export type QueryExternalresourcePaginationArgs = {
  createdAt_greater?: InputMaybe<Scalars['String']['input']>;
  createdAt_lesser?: InputMaybe<Scalars['String']['input']>;
  externalId?: InputMaybe<Scalars['Int']['input']>;
  first?: Scalars['Int']['input'];
  id?: InputMaybe<Scalars['Int']['input']>;
  link?: InputMaybe<Scalars['String']['input']>;
  link_like?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  site?: InputMaybe<ResourceSite>;
  site_in?: InputMaybe<Array<ResourceSite>>;
  site_not_in?: InputMaybe<Array<ResourceSite>>;
  updatedAt_greater?: InputMaybe<Scalars['String']['input']>;
  updatedAt_lesser?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<Array<ExternalResourceWhereConditionsInput>>;
};


export type QueryFeaturePaginationArgs = {
  createdAt_greater?: InputMaybe<Scalars['String']['input']>;
  createdAt_lesser?: InputMaybe<Scalars['String']['input']>;
  first?: Scalars['Int']['input'];
  id?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  name_like?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  updatedAt_greater?: InputMaybe<Scalars['String']['input']>;
  updatedAt_lesser?: InputMaybe<Scalars['String']['input']>;
  value?: InputMaybe<Scalars['String']['input']>;
  value_like?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<Array<FeatureWhereConditionsInput>>;
};


export type QueryFeaturedthemePaginationArgs = {
  createdAt_greater?: InputMaybe<Scalars['String']['input']>;
  createdAt_lesser?: InputMaybe<Scalars['String']['input']>;
  endAt_greater?: InputMaybe<Scalars['String']['input']>;
  endAt_lesser?: InputMaybe<Scalars['String']['input']>;
  first?: Scalars['Int']['input'];
  id?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  startAt_greater?: InputMaybe<Scalars['String']['input']>;
  startAt_lesser?: InputMaybe<Scalars['String']['input']>;
  updatedAt_greater?: InputMaybe<Scalars['String']['input']>;
  updatedAt_lesser?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<Array<FeaturedThemeWhereConditionsInput>>;
};


export type QueryFindAnimeByExternalSiteArgs = {
  id?: InputMaybe<Array<Scalars['Int']['input']>>;
  link?: InputMaybe<Scalars['String']['input']>;
  site: ResourceSite;
};


export type QueryImagePaginationArgs = {
  createdAt_greater?: InputMaybe<Scalars['String']['input']>;
  createdAt_lesser?: InputMaybe<Scalars['String']['input']>;
  facet?: InputMaybe<ImageFacet>;
  first?: Scalars['Int']['input'];
  id?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  path?: InputMaybe<Scalars['String']['input']>;
  path_like?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<ImageSort>>;
  updatedAt_greater?: InputMaybe<Scalars['String']['input']>;
  updatedAt_lesser?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<Array<ImageWhereConditionsInput>>;
};


export type QueryPageArgs = {
  slug: Scalars['String']['input'];
};


export type QueryPagePaginationArgs = {
  createdAt_greater?: InputMaybe<Scalars['String']['input']>;
  createdAt_lesser?: InputMaybe<Scalars['String']['input']>;
  first?: Scalars['Int']['input'];
  id?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  name_like?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<PageSort>>;
  updatedAt_greater?: InputMaybe<Scalars['String']['input']>;
  updatedAt_lesser?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<Array<PageWhereConditionsInput>>;
};


export type QueryPerformancePaginationArgs = {
  alias?: InputMaybe<Scalars['String']['input']>;
  alias_like?: InputMaybe<Scalars['String']['input']>;
  as?: InputMaybe<Scalars['String']['input']>;
  as_like?: InputMaybe<Scalars['String']['input']>;
  createdAt_greater?: InputMaybe<Scalars['String']['input']>;
  createdAt_lesser?: InputMaybe<Scalars['String']['input']>;
  first?: Scalars['Int']['input'];
  id?: InputMaybe<Scalars['Int']['input']>;
  memberAlias?: InputMaybe<Scalars['String']['input']>;
  memberAlias_like?: InputMaybe<Scalars['String']['input']>;
  memberAs?: InputMaybe<Scalars['String']['input']>;
  memberAs_like?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  relevance?: InputMaybe<Scalars['Int']['input']>;
  relevance_greater?: InputMaybe<Scalars['Int']['input']>;
  relevance_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  relevance_lesser?: InputMaybe<Scalars['Int']['input']>;
  relevance_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  sort?: InputMaybe<Array<PerformanceSort>>;
  updatedAt_greater?: InputMaybe<Scalars['String']['input']>;
  updatedAt_lesser?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<Array<PerformanceWhereConditionsInput>>;
};


export type QueryPlaylistArgs = {
  id: Scalars['String']['input'];
};


export type QueryPlaylistPaginationArgs = {
  createdAt_greater?: InputMaybe<Scalars['String']['input']>;
  createdAt_lesser?: InputMaybe<Scalars['String']['input']>;
  first?: Scalars['Int']['input'];
  id?: InputMaybe<Scalars['String']['input']>;
  id_like?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  name_like?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<PlaylistSort>>;
  updatedAt_greater?: InputMaybe<Scalars['String']['input']>;
  updatedAt_lesser?: InputMaybe<Scalars['String']['input']>;
  visibility?: InputMaybe<PlaylistVisibility>;
  where?: InputMaybe<Array<PlaylistWhereConditionsInput>>;
};


export type QueryPlaylisttrackArgs = {
  id: Scalars['String']['input'];
  playlist: Scalars['String']['input'];
};


export type QueryPlaylisttrackPaginationArgs = {
  createdAt_greater?: InputMaybe<Scalars['String']['input']>;
  createdAt_lesser?: InputMaybe<Scalars['String']['input']>;
  first?: Scalars['Int']['input'];
  id?: InputMaybe<Scalars['String']['input']>;
  id_like?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  playlist: Scalars['String']['input'];
  position?: InputMaybe<Scalars['Int']['input']>;
  position_greater?: InputMaybe<Scalars['Int']['input']>;
  position_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  position_lesser?: InputMaybe<Scalars['Int']['input']>;
  position_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  sort?: InputMaybe<Array<PlaylistTrackSort>>;
  updatedAt_greater?: InputMaybe<Scalars['String']['input']>;
  updatedAt_lesser?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<Array<PlaylistTrackWhereConditionsInput>>;
};


export type QuerySearchArgs = {
  first?: Scalars['Int']['input'];
  page?: InputMaybe<Scalars['Int']['input']>;
  search: Scalars['String']['input'];
};


export type QuerySeriesArgs = {
  slug: Scalars['String']['input'];
};


export type QuerySeriesPaginationArgs = {
  createdAt_greater?: InputMaybe<Scalars['String']['input']>;
  createdAt_lesser?: InputMaybe<Scalars['String']['input']>;
  first?: Scalars['Int']['input'];
  id?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  name_like?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<SeriesSort>>;
  updatedAt_greater?: InputMaybe<Scalars['String']['input']>;
  updatedAt_lesser?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<Array<SeriesWhereConditionsInput>>;
};


export type QuerySongPaginationArgs = {
  createdAt_greater?: InputMaybe<Scalars['String']['input']>;
  createdAt_lesser?: InputMaybe<Scalars['String']['input']>;
  first?: Scalars['Int']['input'];
  id?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<SongSort>>;
  title?: InputMaybe<Scalars['String']['input']>;
  titleNative?: InputMaybe<Scalars['String']['input']>;
  titleNative_like?: InputMaybe<Scalars['String']['input']>;
  title_like?: InputMaybe<Scalars['String']['input']>;
  updatedAt_greater?: InputMaybe<Scalars['String']['input']>;
  updatedAt_lesser?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<Array<SongWhereConditionsInput>>;
};


export type QueryStudioArgs = {
  slug: Scalars['String']['input'];
};


export type QueryStudioPaginationArgs = {
  createdAt_greater?: InputMaybe<Scalars['String']['input']>;
  createdAt_lesser?: InputMaybe<Scalars['String']['input']>;
  first?: Scalars['Int']['input'];
  id?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  name_like?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<StudioSort>>;
  updatedAt_greater?: InputMaybe<Scalars['String']['input']>;
  updatedAt_lesser?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<Array<StudioWhereConditionsInput>>;
};


export type QuerySynonymPaginationArgs = {
  createdAt_greater?: InputMaybe<Scalars['String']['input']>;
  createdAt_lesser?: InputMaybe<Scalars['String']['input']>;
  first?: Scalars['Int']['input'];
  id?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<SynonymSort>>;
  text?: InputMaybe<Scalars['String']['input']>;
  text_like?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<SynonymType>;
  type_in?: InputMaybe<Array<SynonymType>>;
  type_not_in?: InputMaybe<Array<SynonymType>>;
  updatedAt_greater?: InputMaybe<Scalars['String']['input']>;
  updatedAt_lesser?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<Array<SynonymWhereConditionsInput>>;
};


export type QueryThemegroupPaginationArgs = {
  createdAt_greater?: InputMaybe<Scalars['String']['input']>;
  createdAt_lesser?: InputMaybe<Scalars['String']['input']>;
  first?: Scalars['Int']['input'];
  id?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  name_like?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  updatedAt_greater?: InputMaybe<Scalars['String']['input']>;
  updatedAt_lesser?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<Array<ThemeGroupWhereConditionsInput>>;
};


export type QueryVideoArgs = {
  id: Scalars['Int']['input'];
};


export type QueryVideoPaginationArgs = {
  basename?: InputMaybe<Scalars['String']['input']>;
  createdAt_greater?: InputMaybe<Scalars['String']['input']>;
  createdAt_lesser?: InputMaybe<Scalars['String']['input']>;
  filename?: InputMaybe<Scalars['String']['input']>;
  first?: Scalars['Int']['input'];
  id?: InputMaybe<Scalars['Int']['input']>;
  lyrics?: InputMaybe<Scalars['Boolean']['input']>;
  mimetype?: InputMaybe<Scalars['String']['input']>;
  nc?: InputMaybe<Scalars['Boolean']['input']>;
  overlap?: InputMaybe<VideoOverlap>;
  page?: InputMaybe<Scalars['Int']['input']>;
  path?: InputMaybe<Scalars['String']['input']>;
  path_like?: InputMaybe<Scalars['String']['input']>;
  resolution?: InputMaybe<Scalars['Int']['input']>;
  resolution_greater?: InputMaybe<Scalars['Int']['input']>;
  resolution_lesser?: InputMaybe<Scalars['Int']['input']>;
  size_greater?: InputMaybe<Scalars['Int']['input']>;
  size_lesser?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<VideoSort>>;
  source?: InputMaybe<VideoSource>;
  subbed?: InputMaybe<Scalars['Boolean']['input']>;
  tags?: InputMaybe<Scalars['String']['input']>;
  tags_like?: InputMaybe<Scalars['String']['input']>;
  uncen?: InputMaybe<Scalars['Boolean']['input']>;
  updatedAt_greater?: InputMaybe<Scalars['String']['input']>;
  updatedAt_lesser?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<Array<VideoWhereConditionsInput>>;
};


export type QueryVideoscriptPaginationArgs = {
  createdAt_greater?: InputMaybe<Scalars['String']['input']>;
  createdAt_lesser?: InputMaybe<Scalars['String']['input']>;
  first?: Scalars['Int']['input'];
  id?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  path?: InputMaybe<Scalars['String']['input']>;
  path_like?: InputMaybe<Scalars['String']['input']>;
  updatedAt_greater?: InputMaybe<Scalars['String']['input']>;
  updatedAt_lesser?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<Array<VideoScriptWhereConditionsInput>>;
};

export type ResourceSite =
  | 'AMAZON_MUSIC'
  | 'AMAZON_PRIME_VIDEO'
  | 'ANIDB'
  | 'ANILIST'
  | 'ANIME_PLANET'
  | 'ANN'
  | 'APPLE_MUSIC'
  | 'CRUNCHYROLL'
  | 'DISNEY_PLUS'
  | 'HIDIVE'
  | 'HULU'
  | 'KITSU'
  | 'LIVECHART'
  | 'MAL'
  | 'NETFLIX'
  | 'OFFICIAL_SITE'
  | 'SPOTIFY'
  | 'WIKI'
  | 'X'
  | 'YOUTUBE'
  | 'YOUTUBE_MUSIC';

/** Represents an assignable label for users that provides a configured group of permissions. */
export type Role = {
  /** The hex representation of the color used to distinguish the resource */
  color: Maybe<Scalars['String']['output']>;
  /** The date that the resource was created */
  createdAt: Maybe<Scalars['String']['output']>;
  /** Is the role assigned on account verification? */
  default: Scalars['String']['output'];
  /** The primary key of the resource */
  id: Scalars['Int']['output'];
  /** The label of the resource */
  name: Scalars['String']['output'];
  permissions: PermissionConnection;
  /** The weight assigned to the resource, where higher values correspond to higher priority */
  priority: Scalars['Int']['output'];
  /** The date that the resource was updated */
  updatedAt: Maybe<Scalars['String']['output']>;
};


/** Represents an assignable label for users that provides a configured group of permissions. */
export type RoleCreatedAtArgs = {
  format?: Scalars['String']['input'];
};


/** Represents an assignable label for users that provides a configured group of permissions. */
export type RolePermissionsArgs = {
  createdAt_greater?: InputMaybe<Scalars['String']['input']>;
  createdAt_lesser?: InputMaybe<Scalars['String']['input']>;
  first?: Scalars['Int']['input'];
  id?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  name_like?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  updatedAt_greater?: InputMaybe<Scalars['String']['input']>;
  updatedAt_lesser?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<Array<PermissionWhereConditionsInput>>;
};


/** Represents an assignable label for users that provides a configured group of permissions. */
export type RoleUpdatedAtArgs = {
  format?: Scalars['String']['input'];
};

export type RoleConnection = {
  /** A list of Role edges. */
  edges: Array<RoleEdge>;
  /** A list of Role resources. Use this if you don\'t care about pivot fields. */
  nodes: Array<Role>;
  /** Pagination information about the list of edges. */
  pageInfo: PaginationInfo;
};

export type RoleEdge = {
  node: Role;
};

export type RoleFilterableColumns =
  | 'COLOR'
  | 'CREATED_AT'
  | 'DEFAULT'
  | 'ID'
  | 'NAME'
  | 'PRIORITY'
  | 'UPDATED_AT';

export type RoleWhereConditionsInput = {
  AND?: InputMaybe<Array<RoleWhereConditionsInput>>;
  OR?: InputMaybe<Array<RoleWhereConditionsInput>>;
  field?: InputMaybe<RoleFilterableColumns>;
  operator?: ComparisonOperator;
  value?: InputMaybe<Scalars['Mixed']['input']>;
};

/** Returns a listing of resources that match a given search term. */
export type Search = {
  /** The anime results of the search */
  anime: Array<Anime>;
  /** The theme results of the search */
  animethemes: Array<AnimeTheme>;
  /** The artist results of the search */
  artists: Array<Artist>;
  /** The playlist results of the search */
  playlists: Array<Playlist>;
  /** The series results of the search */
  series: Array<Series>;
  /** The song results of the search */
  songs: Array<Song>;
  /** The studio results of the search */
  studios: Array<Studio>;
  /** The video results of the search */
  videos: Array<Video>;
};

/**
 * Represents a collection of related anime.
 *
 * For example, the Monogatari series is the collection of the Bakemonogatari anime and its related productions.
 */
export type Series = {
  anime: SeriesAnimeConnection;
  /** The date that the resource was created */
  createdAt: Maybe<Scalars['String']['output']>;
  /** The primary key of the resource */
  id: Scalars['Int']['output'];
  /** The primary title of the series */
  name: Scalars['String']['output'];
  /** The URL slug & route key of the resource */
  slug: Scalars['String']['output'];
  /** The date that the resource was updated */
  updatedAt: Maybe<Scalars['String']['output']>;
};


/**
 * Represents a collection of related anime.
 *
 * For example, the Monogatari series is the collection of the Bakemonogatari anime and its related productions.
 */
export type SeriesAnimeArgs = {
  createdAt_greater?: InputMaybe<Scalars['String']['input']>;
  createdAt_lesser?: InputMaybe<Scalars['String']['input']>;
  first?: Scalars['Int']['input'];
  format?: InputMaybe<AnimeFormat>;
  format_in?: InputMaybe<Array<AnimeFormat>>;
  format_not_in?: InputMaybe<Array<AnimeFormat>>;
  id?: InputMaybe<Scalars['Int']['input']>;
  mediaFormat?: InputMaybe<AnimeMediaFormat>;
  mediaFormat_in?: InputMaybe<Array<AnimeMediaFormat>>;
  mediaFormat_not_in?: InputMaybe<Array<AnimeMediaFormat>>;
  name?: InputMaybe<Scalars['String']['input']>;
  name_like?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  season?: InputMaybe<AnimeSeason>;
  season_in?: InputMaybe<Array<AnimeSeason>>;
  season_not_in?: InputMaybe<Array<AnimeSeason>>;
  slug?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<AnimeSort>>;
  updatedAt_greater?: InputMaybe<Scalars['String']['input']>;
  updatedAt_lesser?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<Array<AnimeWhereConditionsInput>>;
  year?: InputMaybe<Scalars['Int']['input']>;
  year_greater?: InputMaybe<Scalars['Int']['input']>;
  year_lesser?: InputMaybe<Scalars['Int']['input']>;
};


/**
 * Represents a collection of related anime.
 *
 * For example, the Monogatari series is the collection of the Bakemonogatari anime and its related productions.
 */
export type SeriesCreatedAtArgs = {
  format?: Scalars['String']['input'];
};


/**
 * Represents a collection of related anime.
 *
 * For example, the Monogatari series is the collection of the Bakemonogatari anime and its related productions.
 */
export type SeriesUpdatedAtArgs = {
  format?: Scalars['String']['input'];
};

export type SeriesAnimeConnection = {
  /** A list of Anime edges. */
  edges: Array<SeriesAnimeEdge>;
  /** A list of Anime resources. Use this if you don\'t care about pivot fields. */
  nodes: Array<Anime>;
  /** Pagination information about the list of edges. */
  pageInfo: PaginationInfo;
};

export type SeriesAnimeEdge = {
  /** The date that the resource was created */
  createdAt: Maybe<Scalars['String']['output']>;
  node: Anime;
  /** The date that the resource was updated */
  updatedAt: Maybe<Scalars['String']['output']>;
};


export type SeriesAnimeEdgeCreatedAtArgs = {
  format?: Scalars['String']['input'];
};


export type SeriesAnimeEdgeUpdatedAtArgs = {
  format?: Scalars['String']['input'];
};

export type SeriesFilterableColumns =
  | 'CREATED_AT'
  | 'ID'
  | 'NAME'
  | 'SLUG'
  | 'UPDATED_AT';

export type SeriesPagination = {
  /** List of items on the current page */
  data: Array<Series>;
  /** Pagination information about the list of items. */
  paginationInfo: PaginationInfo;
};

export type SeriesSort =
  | 'CREATED_AT'
  | 'CREATED_AT_DESC'
  | 'ID'
  | 'ID_DESC'
  | 'NAME'
  | 'NAME_DESC'
  | 'RANDOM'
  | 'UPDATED_AT'
  | 'UPDATED_AT_DESC';

export type SeriesWhereConditionsInput = {
  AND?: InputMaybe<Array<SeriesWhereConditionsInput>>;
  OR?: InputMaybe<Array<SeriesWhereConditionsInput>>;
  field?: InputMaybe<SeriesFilterableColumns>;
  operator?: ComparisonOperator;
  value?: InputMaybe<Scalars['Mixed']['input']>;
};

/**
 * Represents the composition that accompanies an AnimeTheme.
 *
 * For example, Staple Stable is the song for the Bakemonogatari OP1 AnimeTheme.
 */
export type Song = {
  animethemes: Array<AnimeTheme>;
  /** The date that the resource was created */
  createdAt: Maybe<Scalars['String']['output']>;
  /** The primary key of the resource */
  id: Scalars['Int']['output'];
  performances: Array<Performance>;
  resources: SongExternalResourceConnection;
  /** The name of the composition */
  title: Maybe<Scalars['String']['output']>;
  /** The native name of the composition */
  titleNative: Maybe<Scalars['String']['output']>;
  /** The date that the resource was updated */
  updatedAt: Maybe<Scalars['String']['output']>;
};


/**
 * Represents the composition that accompanies an AnimeTheme.
 *
 * For example, Staple Stable is the song for the Bakemonogatari OP1 AnimeTheme.
 */
export type SongAnimethemesArgs = {
  createdAt_greater?: InputMaybe<Scalars['String']['input']>;
  createdAt_lesser?: InputMaybe<Scalars['String']['input']>;
  first?: Scalars['Int']['input'];
  id?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  sequence?: InputMaybe<Scalars['Int']['input']>;
  sequence_greater?: InputMaybe<Scalars['Int']['input']>;
  sequence_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  sequence_lesser?: InputMaybe<Scalars['Int']['input']>;
  sequence_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  slug?: InputMaybe<Scalars['String']['input']>;
  slug_like?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<AnimeThemeSort>>;
  type?: InputMaybe<ThemeType>;
  type_in?: InputMaybe<Array<ThemeType>>;
  type_not_in?: InputMaybe<Array<ThemeType>>;
  updatedAt_greater?: InputMaybe<Scalars['String']['input']>;
  updatedAt_lesser?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<Array<AnimeThemeWhereConditionsInput>>;
};


/**
 * Represents the composition that accompanies an AnimeTheme.
 *
 * For example, Staple Stable is the song for the Bakemonogatari OP1 AnimeTheme.
 */
export type SongCreatedAtArgs = {
  format?: Scalars['String']['input'];
};


/**
 * Represents the composition that accompanies an AnimeTheme.
 *
 * For example, Staple Stable is the song for the Bakemonogatari OP1 AnimeTheme.
 */
export type SongPerformancesArgs = {
  alias?: InputMaybe<Scalars['String']['input']>;
  alias_like?: InputMaybe<Scalars['String']['input']>;
  as?: InputMaybe<Scalars['String']['input']>;
  as_like?: InputMaybe<Scalars['String']['input']>;
  createdAt_greater?: InputMaybe<Scalars['String']['input']>;
  createdAt_lesser?: InputMaybe<Scalars['String']['input']>;
  first?: Scalars['Int']['input'];
  id?: InputMaybe<Scalars['Int']['input']>;
  memberAlias?: InputMaybe<Scalars['String']['input']>;
  memberAlias_like?: InputMaybe<Scalars['String']['input']>;
  memberAs?: InputMaybe<Scalars['String']['input']>;
  memberAs_like?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  relevance?: InputMaybe<Scalars['Int']['input']>;
  relevance_greater?: InputMaybe<Scalars['Int']['input']>;
  relevance_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  relevance_lesser?: InputMaybe<Scalars['Int']['input']>;
  relevance_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  sort?: InputMaybe<Array<PerformanceSort>>;
  updatedAt_greater?: InputMaybe<Scalars['String']['input']>;
  updatedAt_lesser?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<Array<PerformanceWhereConditionsInput>>;
};


/**
 * Represents the composition that accompanies an AnimeTheme.
 *
 * For example, Staple Stable is the song for the Bakemonogatari OP1 AnimeTheme.
 */
export type SongResourcesArgs = {
  createdAt_greater?: InputMaybe<Scalars['String']['input']>;
  createdAt_lesser?: InputMaybe<Scalars['String']['input']>;
  externalId?: InputMaybe<Scalars['Int']['input']>;
  first?: Scalars['Int']['input'];
  id?: InputMaybe<Scalars['Int']['input']>;
  link?: InputMaybe<Scalars['String']['input']>;
  link_like?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  site?: InputMaybe<ResourceSite>;
  site_in?: InputMaybe<Array<ResourceSite>>;
  site_not_in?: InputMaybe<Array<ResourceSite>>;
  updatedAt_greater?: InputMaybe<Scalars['String']['input']>;
  updatedAt_lesser?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<Array<ExternalResourceWhereConditionsInput>>;
};


/**
 * Represents the composition that accompanies an AnimeTheme.
 *
 * For example, Staple Stable is the song for the Bakemonogatari OP1 AnimeTheme.
 */
export type SongUpdatedAtArgs = {
  format?: Scalars['String']['input'];
};

export type SongExternalResourceConnection = {
  /** A list of ExternalResource edges. */
  edges: Array<SongExternalResourceEdge>;
  /** A list of ExternalResource resources. Use this if you don\'t care about pivot fields. */
  nodes: Array<ExternalResource>;
  /** Pagination information about the list of edges. */
  pageInfo: PaginationInfo;
};

export type SongExternalResourceEdge = {
  /** Used to distinguish resources that map to the same resourceable */
  as: Maybe<Scalars['String']['output']>;
  /** The date that the resource was created */
  createdAt: Maybe<Scalars['String']['output']>;
  node: ExternalResource;
  /** The date that the resource was updated */
  updatedAt: Maybe<Scalars['String']['output']>;
};


export type SongExternalResourceEdgeCreatedAtArgs = {
  format?: Scalars['String']['input'];
};


export type SongExternalResourceEdgeUpdatedAtArgs = {
  format?: Scalars['String']['input'];
};

export type SongFilterableColumns =
  | 'CREATED_AT'
  | 'ID'
  | 'TITLE'
  | 'TITLE_NATIVE'
  | 'UPDATED_AT';

export type SongPagination = {
  /** List of items on the current page */
  data: Array<Song>;
  /** Pagination information about the list of items. */
  paginationInfo: PaginationInfo;
};

export type SongSort =
  | 'CREATED_AT'
  | 'CREATED_AT_DESC'
  | 'ID'
  | 'ID_DESC'
  | 'RANDOM'
  | 'TITLE'
  | 'TITLE_DESC'
  | 'TITLE_NATIVE'
  | 'TITLE_NATIVE_DESC'
  | 'UPDATED_AT'
  | 'UPDATED_AT_DESC';

export type SongWhereConditionsInput = {
  AND?: InputMaybe<Array<SongWhereConditionsInput>>;
  OR?: InputMaybe<Array<SongWhereConditionsInput>>;
  field?: InputMaybe<SongFilterableColumns>;
  operator?: ComparisonOperator;
  value?: InputMaybe<Scalars['Mixed']['input']>;
};

export type SortDirection =
  | 'ASC'
  | 'DESC';

/**
 * Represents a company that produces anime.
 *
 * For example, Shaft is the studio that produced the anime Bakemonogatari.
 */
export type Studio = {
  anime: StudioAnimeConnection;
  /** The date that the resource was created */
  createdAt: Maybe<Scalars['String']['output']>;
  /** The primary key of the resource */
  id: Scalars['Int']['output'];
  images: StudioImageConnection;
  /** The primary title of the Studio */
  name: Scalars['String']['output'];
  resources: StudioExternalResourceConnection;
  /** The URL slug & route key of the resource */
  slug: Scalars['String']['output'];
  /** The date that the resource was updated */
  updatedAt: Maybe<Scalars['String']['output']>;
};


/**
 * Represents a company that produces anime.
 *
 * For example, Shaft is the studio that produced the anime Bakemonogatari.
 */
export type StudioAnimeArgs = {
  createdAt_greater?: InputMaybe<Scalars['String']['input']>;
  createdAt_lesser?: InputMaybe<Scalars['String']['input']>;
  first?: Scalars['Int']['input'];
  format?: InputMaybe<AnimeFormat>;
  format_in?: InputMaybe<Array<AnimeFormat>>;
  format_not_in?: InputMaybe<Array<AnimeFormat>>;
  id?: InputMaybe<Scalars['Int']['input']>;
  mediaFormat?: InputMaybe<AnimeMediaFormat>;
  mediaFormat_in?: InputMaybe<Array<AnimeMediaFormat>>;
  mediaFormat_not_in?: InputMaybe<Array<AnimeMediaFormat>>;
  name?: InputMaybe<Scalars['String']['input']>;
  name_like?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  season?: InputMaybe<AnimeSeason>;
  season_in?: InputMaybe<Array<AnimeSeason>>;
  season_not_in?: InputMaybe<Array<AnimeSeason>>;
  slug?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<AnimeSort>>;
  updatedAt_greater?: InputMaybe<Scalars['String']['input']>;
  updatedAt_lesser?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<Array<AnimeWhereConditionsInput>>;
  year?: InputMaybe<Scalars['Int']['input']>;
  year_greater?: InputMaybe<Scalars['Int']['input']>;
  year_lesser?: InputMaybe<Scalars['Int']['input']>;
};


/**
 * Represents a company that produces anime.
 *
 * For example, Shaft is the studio that produced the anime Bakemonogatari.
 */
export type StudioCreatedAtArgs = {
  format?: Scalars['String']['input'];
};


/**
 * Represents a company that produces anime.
 *
 * For example, Shaft is the studio that produced the anime Bakemonogatari.
 */
export type StudioImagesArgs = {
  createdAt_greater?: InputMaybe<Scalars['String']['input']>;
  createdAt_lesser?: InputMaybe<Scalars['String']['input']>;
  facet?: InputMaybe<ImageFacet>;
  first?: Scalars['Int']['input'];
  id?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  path?: InputMaybe<Scalars['String']['input']>;
  path_like?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<ImageableSort>>;
  updatedAt_greater?: InputMaybe<Scalars['String']['input']>;
  updatedAt_lesser?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<Array<ImageWhereConditionsInput>>;
};


/**
 * Represents a company that produces anime.
 *
 * For example, Shaft is the studio that produced the anime Bakemonogatari.
 */
export type StudioResourcesArgs = {
  createdAt_greater?: InputMaybe<Scalars['String']['input']>;
  createdAt_lesser?: InputMaybe<Scalars['String']['input']>;
  externalId?: InputMaybe<Scalars['Int']['input']>;
  first?: Scalars['Int']['input'];
  id?: InputMaybe<Scalars['Int']['input']>;
  link?: InputMaybe<Scalars['String']['input']>;
  link_like?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  site?: InputMaybe<ResourceSite>;
  site_in?: InputMaybe<Array<ResourceSite>>;
  site_not_in?: InputMaybe<Array<ResourceSite>>;
  updatedAt_greater?: InputMaybe<Scalars['String']['input']>;
  updatedAt_lesser?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<Array<ExternalResourceWhereConditionsInput>>;
};


/**
 * Represents a company that produces anime.
 *
 * For example, Shaft is the studio that produced the anime Bakemonogatari.
 */
export type StudioUpdatedAtArgs = {
  format?: Scalars['String']['input'];
};

export type StudioAnimeConnection = {
  /** A list of Anime edges. */
  edges: Array<StudioAnimeEdge>;
  /** A list of Anime resources. Use this if you don\'t care about pivot fields. */
  nodes: Array<Anime>;
  /** Pagination information about the list of edges. */
  pageInfo: PaginationInfo;
};

export type StudioAnimeEdge = {
  /** The date that the resource was created */
  createdAt: Maybe<Scalars['String']['output']>;
  node: Anime;
  /** The date that the resource was updated */
  updatedAt: Maybe<Scalars['String']['output']>;
};


export type StudioAnimeEdgeCreatedAtArgs = {
  format?: Scalars['String']['input'];
};


export type StudioAnimeEdgeUpdatedAtArgs = {
  format?: Scalars['String']['input'];
};

export type StudioExternalResourceConnection = {
  /** A list of ExternalResource edges. */
  edges: Array<StudioExternalResourceEdge>;
  /** A list of ExternalResource resources. Use this if you don\'t care about pivot fields. */
  nodes: Array<ExternalResource>;
  /** Pagination information about the list of edges. */
  pageInfo: PaginationInfo;
};

export type StudioExternalResourceEdge = {
  /** Used to distinguish resources that map to the same resourceable */
  as: Maybe<Scalars['String']['output']>;
  /** The date that the resource was created */
  createdAt: Maybe<Scalars['String']['output']>;
  node: ExternalResource;
  /** The date that the resource was updated */
  updatedAt: Maybe<Scalars['String']['output']>;
};


export type StudioExternalResourceEdgeCreatedAtArgs = {
  format?: Scalars['String']['input'];
};


export type StudioExternalResourceEdgeUpdatedAtArgs = {
  format?: Scalars['String']['input'];
};

export type StudioFilterableColumns =
  | 'CREATED_AT'
  | 'ID'
  | 'NAME'
  | 'SLUG'
  | 'UPDATED_AT';

export type StudioImageConnection = {
  /** A list of Image edges. */
  edges: Array<StudioImageEdge>;
  /** A list of Image resources. Use this if you don\'t care about pivot fields. */
  nodes: Array<Image>;
  /** Pagination information about the list of edges. */
  pageInfo: PaginationInfo;
};

export type StudioImageEdge = {
  /** The date that the resource was created */
  createdAt: Maybe<Scalars['String']['output']>;
  /** Used to sort the images */
  depth: Scalars['Int']['output'];
  node: Image;
  /** The date that the resource was updated */
  updatedAt: Maybe<Scalars['String']['output']>;
};


export type StudioImageEdgeCreatedAtArgs = {
  format?: Scalars['String']['input'];
};


export type StudioImageEdgeUpdatedAtArgs = {
  format?: Scalars['String']['input'];
};

export type StudioPagination = {
  /** List of items on the current page */
  data: Array<Studio>;
  /** Pagination information about the list of items. */
  paginationInfo: PaginationInfo;
};

export type StudioSort =
  | 'CREATED_AT'
  | 'CREATED_AT_DESC'
  | 'ID'
  | 'ID_DESC'
  | 'NAME'
  | 'NAME_DESC'
  | 'RANDOM'
  | 'UPDATED_AT'
  | 'UPDATED_AT_DESC';

export type StudioWhereConditionsInput = {
  AND?: InputMaybe<Array<StudioWhereConditionsInput>>;
  OR?: InputMaybe<Array<StudioWhereConditionsInput>>;
  field?: InputMaybe<StudioFilterableColumns>;
  operator?: ComparisonOperator;
  value?: InputMaybe<Scalars['Mixed']['input']>;
};

/**
 * Represents an alternate title or common abbreviation for an entity.
 *
 * For example, the anime Bakemonogatari has the synonym "Monstory".
 */
export type Synonym = {
  /** The date that the resource was created */
  createdAt: Maybe<Scalars['String']['output']>;
  /** The primary key of the resource */
  id: Scalars['Int']['output'];
  /** The alternate title or common abbreviations */
  text: Scalars['String']['output'];
  /** The type of the synonym */
  type: SynonymType;
  /** The formatted string value of the type field */
  typeLocalized: Scalars['String']['output'];
  /** The date that the resource was updated */
  updatedAt: Maybe<Scalars['String']['output']>;
};


/**
 * Represents an alternate title or common abbreviation for an entity.
 *
 * For example, the anime Bakemonogatari has the synonym "Monstory".
 */
export type SynonymCreatedAtArgs = {
  format?: Scalars['String']['input'];
};


/**
 * Represents an alternate title or common abbreviation for an entity.
 *
 * For example, the anime Bakemonogatari has the synonym "Monstory".
 */
export type SynonymUpdatedAtArgs = {
  format?: Scalars['String']['input'];
};

export type SynonymFilterableColumns =
  | 'CREATED_AT'
  | 'ID'
  | 'TEXT'
  | 'TYPE'
  | 'UPDATED_AT';

export type SynonymPagination = {
  /** List of items on the current page */
  data: Array<Synonym>;
  /** Pagination information about the list of items. */
  paginationInfo: PaginationInfo;
};

export type SynonymSort =
  | 'CREATED_AT'
  | 'CREATED_AT_DESC'
  | 'ID'
  | 'ID_DESC'
  | 'RANDOM'
  | 'TEXT'
  | 'TEXT_DESC'
  | 'UPDATED_AT'
  | 'UPDATED_AT_DESC';

export type SynonymType =
  | 'ENGLISH'
  | 'NATIVE'
  | 'OTHER'
  | 'SHORT';

export type SynonymWhereConditionsInput = {
  AND?: InputMaybe<Array<SynonymWhereConditionsInput>>;
  OR?: InputMaybe<Array<SynonymWhereConditionsInput>>;
  field?: InputMaybe<SynonymFilterableColumns>;
  operator?: ComparisonOperator;
  value?: InputMaybe<Scalars['Mixed']['input']>;
};

/**
 * Represents the group that accompanies a Theme.
 *
 * For example, English Version is the group for english dubbed Theme.
 */
export type ThemeGroup = {
  animethemes: Array<AnimeTheme>;
  /** The date that the resource was created */
  createdAt: Maybe<Scalars['String']['output']>;
  /** The primary key of the resource */
  id: Scalars['Int']['output'];
  /** The name of the group */
  name: Scalars['String']['output'];
  /** The slug of the group */
  slug: Scalars['String']['output'];
  /** The date that the resource was updated */
  updatedAt: Maybe<Scalars['String']['output']>;
};


/**
 * Represents the group that accompanies a Theme.
 *
 * For example, English Version is the group for english dubbed Theme.
 */
export type ThemeGroupAnimethemesArgs = {
  createdAt_greater?: InputMaybe<Scalars['String']['input']>;
  createdAt_lesser?: InputMaybe<Scalars['String']['input']>;
  first?: Scalars['Int']['input'];
  id?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  sequence?: InputMaybe<Scalars['Int']['input']>;
  sequence_greater?: InputMaybe<Scalars['Int']['input']>;
  sequence_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  sequence_lesser?: InputMaybe<Scalars['Int']['input']>;
  sequence_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  slug?: InputMaybe<Scalars['String']['input']>;
  slug_like?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<AnimeThemeSort>>;
  type?: InputMaybe<ThemeType>;
  type_in?: InputMaybe<Array<ThemeType>>;
  type_not_in?: InputMaybe<Array<ThemeType>>;
  updatedAt_greater?: InputMaybe<Scalars['String']['input']>;
  updatedAt_lesser?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<Array<AnimeThemeWhereConditionsInput>>;
};


/**
 * Represents the group that accompanies a Theme.
 *
 * For example, English Version is the group for english dubbed Theme.
 */
export type ThemeGroupCreatedAtArgs = {
  format?: Scalars['String']['input'];
};


/**
 * Represents the group that accompanies a Theme.
 *
 * For example, English Version is the group for english dubbed Theme.
 */
export type ThemeGroupUpdatedAtArgs = {
  format?: Scalars['String']['input'];
};

export type ThemeGroupFilterableColumns =
  | 'CREATED_AT'
  | 'ID'
  | 'NAME'
  | 'SLUG'
  | 'UPDATED_AT';

export type ThemeGroupPagination = {
  /** List of items on the current page */
  data: Array<ThemeGroup>;
  /** Pagination information about the list of items. */
  paginationInfo: PaginationInfo;
};

export type ThemeGroupWhereConditionsInput = {
  AND?: InputMaybe<Array<ThemeGroupWhereConditionsInput>>;
  OR?: InputMaybe<Array<ThemeGroupWhereConditionsInput>>;
  field?: InputMaybe<ThemeGroupFilterableColumns>;
  operator?: ComparisonOperator;
  value?: InputMaybe<Scalars['Mixed']['input']>;
};

export type ThemeType =
  /** Ending */
  | 'ED'
  /** Insert Song */
  | 'IN'
  /** Opening */
  | 'OP';

/** Represents an AnimeThemes account. */
export type User = {
  /** The date that the resource was created */
  createdAt: Maybe<Scalars['String']['output']>;
  /** The primary key of the resource */
  id: Scalars['Int']['output'];
  /** The username of the resource */
  name: Scalars['String']['output'];
  playlists: Array<Playlist>;
  /** The date that the resource was updated */
  updatedAt: Maybe<Scalars['String']['output']>;
};


/** Represents an AnimeThemes account. */
export type UserCreatedAtArgs = {
  format?: Scalars['String']['input'];
};


/** Represents an AnimeThemes account. */
export type UserPlaylistsArgs = {
  createdAt_greater?: InputMaybe<Scalars['String']['input']>;
  createdAt_lesser?: InputMaybe<Scalars['String']['input']>;
  first?: Scalars['Int']['input'];
  id?: InputMaybe<Scalars['String']['input']>;
  id_like?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  name_like?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<PlaylistSort>>;
  updatedAt_greater?: InputMaybe<Scalars['String']['input']>;
  updatedAt_lesser?: InputMaybe<Scalars['String']['input']>;
  visibility?: InputMaybe<PlaylistVisibility>;
  where?: InputMaybe<Array<PlaylistWhereConditionsInput>>;
};


/** Represents an AnimeThemes account. */
export type UserUpdatedAtArgs = {
  format?: Scalars['String']['input'];
};

/**
 * Represents a WebM of an anime theme.
 *
 * For example, the video Bakemonogatari-OP1.webm represents the WebM of the Bakemonogatari OP1 theme.
 */
export type Video = {
  animethemeentries: VideoAnimeThemeEntryConnection;
  audio: Maybe<Audio>;
  /** The basename of the file in storage */
  basename: Scalars['String']['output'];
  /** The date that the resource was created */
  createdAt: Maybe<Scalars['String']['output']>;
  /** The filename of the file in storage */
  filename: Scalars['String']['output'];
  /** The primary key of the resource */
  id: Scalars['Int']['output'];
  /** The URL to stream the file from storage */
  link: Scalars['String']['output'];
  /** Does the video include subtitles of song lyrics? */
  lyrics: Scalars['Boolean']['output'];
  /** The media type of the file in storage */
  mimetype: Scalars['String']['output'];
  /** Is the video creditless? */
  nc: Scalars['Boolean']['output'];
  /** The degree to which the sequence and episode content overlap */
  overlap: VideoOverlap;
  /** The formatted string value of the overlap field */
  overlapLocalized: Scalars['String']['output'];
  /** The path of the file in storage */
  path: Scalars['String']['output'];
  /** The priority value for the video */
  priority: Scalars['Int']['output'];
  /** The frame height of the file in storage */
  resolution: Maybe<Scalars['Int']['output']>;
  /** The size of the file in storage in Bytes */
  size: Scalars['Int']['output'];
  /** Where did this video come from? */
  source: Maybe<VideoSource>;
  /** The formatted string value of the source field */
  sourceLocalized: Maybe<Scalars['String']['output']>;
  /** Does the video include subtitles of dialogue? */
  subbed: Scalars['Boolean']['output'];
  /** The attributes used to distinguish the file within the context of a theme */
  tags: Maybe<Scalars['String']['output']>;
  tracks: Array<PlaylistTrack>;
  /** Is the video an uncensored version of a censored sequence? */
  uncen: Scalars['Boolean']['output'];
  /** The date that the resource was updated */
  updatedAt: Maybe<Scalars['String']['output']>;
  videoscript: Maybe<VideoScript>;
};


/**
 * Represents a WebM of an anime theme.
 *
 * For example, the video Bakemonogatari-OP1.webm represents the WebM of the Bakemonogatari OP1 theme.
 */
export type VideoAnimethemeentriesArgs = {
  createdAt_greater?: InputMaybe<Scalars['String']['input']>;
  createdAt_lesser?: InputMaybe<Scalars['String']['input']>;
  episodes?: InputMaybe<Scalars['String']['input']>;
  episodes_like?: InputMaybe<Scalars['String']['input']>;
  first?: Scalars['Int']['input'];
  id?: InputMaybe<Scalars['Int']['input']>;
  notes?: InputMaybe<Scalars['String']['input']>;
  notes_like?: InputMaybe<Scalars['String']['input']>;
  nsfw?: InputMaybe<Scalars['Boolean']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<AnimeThemeEntrySort>>;
  spoiler?: InputMaybe<Scalars['Boolean']['input']>;
  updatedAt_greater?: InputMaybe<Scalars['String']['input']>;
  updatedAt_lesser?: InputMaybe<Scalars['String']['input']>;
  version?: InputMaybe<Scalars['Int']['input']>;
  version_greater?: InputMaybe<Scalars['Int']['input']>;
  version_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  version_lesser?: InputMaybe<Scalars['Int']['input']>;
  version_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  where?: InputMaybe<Array<AnimeThemeEntryWhereConditionsInput>>;
};


/**
 * Represents a WebM of an anime theme.
 *
 * For example, the video Bakemonogatari-OP1.webm represents the WebM of the Bakemonogatari OP1 theme.
 */
export type VideoCreatedAtArgs = {
  format?: Scalars['String']['input'];
};


/**
 * Represents a WebM of an anime theme.
 *
 * For example, the video Bakemonogatari-OP1.webm represents the WebM of the Bakemonogatari OP1 theme.
 */
export type VideoTracksArgs = {
  createdAt_greater?: InputMaybe<Scalars['String']['input']>;
  createdAt_lesser?: InputMaybe<Scalars['String']['input']>;
  first?: Scalars['Int']['input'];
  id?: InputMaybe<Scalars['String']['input']>;
  id_like?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  position?: InputMaybe<Scalars['Int']['input']>;
  position_greater?: InputMaybe<Scalars['Int']['input']>;
  position_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  position_lesser?: InputMaybe<Scalars['Int']['input']>;
  position_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  sort?: InputMaybe<Array<PlaylistTrackSort>>;
  updatedAt_greater?: InputMaybe<Scalars['String']['input']>;
  updatedAt_lesser?: InputMaybe<Scalars['String']['input']>;
  where?: InputMaybe<Array<PlaylistTrackWhereConditionsInput>>;
};


/**
 * Represents a WebM of an anime theme.
 *
 * For example, the video Bakemonogatari-OP1.webm represents the WebM of the Bakemonogatari OP1 theme.
 */
export type VideoUpdatedAtArgs = {
  format?: Scalars['String']['input'];
};

export type VideoAnimeThemeEntryConnection = {
  /** A list of AnimeThemeEntry edges. */
  edges: Array<VideoAnimeThemeEntryEdge>;
  /** A list of AnimeThemeEntry resources. Use this if you don\'t care about pivot fields. */
  nodes: Array<AnimeThemeEntry>;
  /** Pagination information about the list of edges. */
  pageInfo: PaginationInfo;
};

export type VideoAnimeThemeEntryEdge = {
  /** The date that the resource was created */
  createdAt: Maybe<Scalars['String']['output']>;
  node: AnimeThemeEntry;
  /** The date that the resource was updated */
  updatedAt: Maybe<Scalars['String']['output']>;
};


export type VideoAnimeThemeEntryEdgeCreatedAtArgs = {
  format?: Scalars['String']['input'];
};


export type VideoAnimeThemeEntryEdgeUpdatedAtArgs = {
  format?: Scalars['String']['input'];
};

export type VideoFilterableColumns =
  | 'BASENAME'
  | 'CREATED_AT'
  | 'FILENAME'
  | 'ID'
  | 'LYRICS'
  | 'MIMETYPE'
  | 'NC'
  | 'OVERLAP'
  | 'PATH'
  | 'RESOLUTION'
  | 'SIZE'
  | 'SOURCE'
  | 'SUBBED'
  | 'TAGS'
  | 'UNCEN'
  | 'UPDATED_AT';

export type VideoOverlap =
  | 'NONE'
  | 'OVER'
  | 'TRANS';

export type VideoPagination = {
  /** List of items on the current page */
  data: Array<Video>;
  /** Pagination information about the list of items. */
  paginationInfo: PaginationInfo;
};

/**
 * Represents an encoding script used to produce a video.
 *
 * For example, the 2009/Summer/Bakemonogatari-OP1.txt video script represents the encoding script of the Bakemonogatari-OP1.webm video.
 */
export type VideoScript = {
  /** The date that the resource was created */
  createdAt: Maybe<Scalars['String']['output']>;
  /** The primary key of the resource */
  id: Scalars['Int']['output'];
  /** The URL to download the file from storage */
  link: Scalars['String']['output'];
  /** The path of the file in storage */
  path: Scalars['String']['output'];
  /** The date that the resource was updated */
  updatedAt: Maybe<Scalars['String']['output']>;
  video: Video;
};


/**
 * Represents an encoding script used to produce a video.
 *
 * For example, the 2009/Summer/Bakemonogatari-OP1.txt video script represents the encoding script of the Bakemonogatari-OP1.webm video.
 */
export type VideoScriptCreatedAtArgs = {
  format?: Scalars['String']['input'];
};


/**
 * Represents an encoding script used to produce a video.
 *
 * For example, the 2009/Summer/Bakemonogatari-OP1.txt video script represents the encoding script of the Bakemonogatari-OP1.webm video.
 */
export type VideoScriptUpdatedAtArgs = {
  format?: Scalars['String']['input'];
};

export type VideoScriptFilterableColumns =
  | 'CREATED_AT'
  | 'ID'
  | 'PATH'
  | 'UPDATED_AT';

export type VideoScriptPagination = {
  /** List of items on the current page */
  data: Array<VideoScript>;
  /** Pagination information about the list of items. */
  paginationInfo: PaginationInfo;
};

export type VideoScriptWhereConditionsInput = {
  AND?: InputMaybe<Array<VideoScriptWhereConditionsInput>>;
  OR?: InputMaybe<Array<VideoScriptWhereConditionsInput>>;
  field?: InputMaybe<VideoScriptFilterableColumns>;
  operator?: ComparisonOperator;
  value?: InputMaybe<Scalars['Mixed']['input']>;
};

export type VideoSort =
  | 'BASENAME'
  | 'BASENAME_DESC'
  | 'CREATED_AT'
  | 'CREATED_AT_DESC'
  | 'FILENAME'
  | 'FILENAME_DESC'
  | 'ID'
  | 'ID_DESC'
  | 'RANDOM'
  | 'RESOLUTION'
  | 'RESOLUTION_DESC'
  | 'SIZE'
  | 'SIZE_DESC'
  | 'UPDATED_AT'
  | 'UPDATED_AT_DESC';

export type VideoSource =
  | 'BD'
  | 'DVD'
  | 'LD'
  | 'RAW'
  | 'VHS'
  | 'WEB';

export type VideoWhereConditionsInput = {
  AND?: InputMaybe<Array<VideoWhereConditionsInput>>;
  OR?: InputMaybe<Array<VideoWhereConditionsInput>>;
  field?: InputMaybe<VideoFilterableColumns>;
  operator?: ComparisonOperator;
  value?: InputMaybe<Scalars['Mixed']['input']>;
};

/** Represents the watch history of the authenticated user. */
export type WatchHistory = {
  animethemeentry: AnimeThemeEntry;
  video: Video;
};

export type BracketThemeSummaryCardThemeFragment = (
  { type: ThemeType, sequence: number | null, group: { name: string, slug: string } | null, anime: { slug: string, name: string, images: { nodes: Array<{ ' $fragmentRefs'?: { 'ExtractImagesImageFragment': ExtractImagesImageFragment } }> } }, song: { ' $fragmentRefs'?: { 'SongTitleWithArtistsSongFragment': SongTitleWithArtistsSongFragment } } | null, animethemeentries: Array<(
    { videos: { nodes: Array<{ ' $fragmentRefs'?: { 'CreateVideoSlugVideoFragment': CreateVideoSlugVideoFragment } }> } }
    & { ' $fragmentRefs'?: { 'CreateVideoSlugEntryFragment': CreateVideoSlugEntryFragment } }
  )> }
  & { ' $fragmentRefs'?: { 'CreateVideoSlugThemeFragment': CreateVideoSlugThemeFragment;'ThemeMenuThemeFragment': ThemeMenuThemeFragment } }
) & { ' $fragmentName'?: 'BracketThemeSummaryCardThemeFragment' };

export type VideoButtonAnimeFragment = { slug: string } & { ' $fragmentName'?: 'VideoButtonAnimeFragment' };

export type VideoButtonThemeFragment = { ' $fragmentRefs'?: { 'CreateVideoSlugThemeFragment': CreateVideoSlugThemeFragment } } & { ' $fragmentName'?: 'VideoButtonThemeFragment' };

export type VideoButtonEntryFragment = { ' $fragmentRefs'?: { 'CreateVideoSlugEntryFragment': CreateVideoSlugEntryFragment } } & { ' $fragmentName'?: 'VideoButtonEntryFragment' };

export type VideoButtonVideoFragment = (
  { id: number }
  & { ' $fragmentRefs'?: { 'CreateVideoSlugVideoFragment': CreateVideoSlugVideoFragment;'VideoTagsVideoFragment': VideoTagsVideoFragment } }
) & { ' $fragmentName'?: 'VideoButtonVideoFragment' };

export type AnimeSummaryCardAnimeFragment = { slug: string, name: string, year: number | null, season: AnimeSeason | null, seasonLocalized: string | null, formatLocalized: string | null, animethemes: Array<{ group: { name: string, slug: string } | null }>, images: { nodes: Array<{ ' $fragmentRefs'?: { 'ExtractImagesImageFragment': ExtractImagesImageFragment } }> } } & { ' $fragmentName'?: 'AnimeSummaryCardAnimeFragment' };

export type AnimeSummaryCardAnimeExpandableFragment = { animethemes: Array<(
    { group: { name: string, slug: string } | null }
    & { ' $fragmentRefs'?: { 'ThemeTableThemeFragment': ThemeTableThemeFragment } }
  )> } & { ' $fragmentName'?: 'AnimeSummaryCardAnimeExpandableFragment' };

export type ArtistSummaryCardArtistFragment = { slug: string, name: string, images: { nodes: Array<{ ' $fragmentRefs'?: { 'ExtractImagesImageFragment': ExtractImagesImageFragment } }> } } & { ' $fragmentName'?: 'ArtistSummaryCardArtistFragment' };

export type PlaylistSummaryCardPlaylistFragment = { id: string, name: string, visibilityLocalized: string, tracksCount: number } & { ' $fragmentName'?: 'PlaylistSummaryCardPlaylistFragment' };

export type PlaylistSummaryCardPlaylistWithOwnerFragment = { user: { name: string } } & { ' $fragmentName'?: 'PlaylistSummaryCardPlaylistWithOwnerFragment' };

export type StudioSummaryCardStudioFragment = { slug: string, name: string, images: { nodes: Array<{ ' $fragmentRefs'?: { 'ExtractImagesImageFragment': ExtractImagesImageFragment } }> } } & { ' $fragmentName'?: 'StudioSummaryCardStudioFragment' };

export type ThemeDetailCardThemeFragment = (
  { type: ThemeType, sequence: number | null, group: { name: string, slug: string } | null, anime: (
    { slug: string, name: string }
    & { ' $fragmentRefs'?: { 'VideoButtonAnimeFragment': VideoButtonAnimeFragment } }
  ), song: { ' $fragmentRefs'?: { 'SongTitleSongFragment': SongTitleSongFragment;'PerformancesSongFragment': PerformancesSongFragment } } | null, animethemeentries: Array<(
    { version: number, videos: { nodes: Array<(
        { filename: string, tags: string | null }
        & { ' $fragmentRefs'?: { 'VideoButtonVideoFragment': VideoButtonVideoFragment } }
      )> } }
    & { ' $fragmentRefs'?: { 'ThemeEntryTagsEntryFragment': ThemeEntryTagsEntryFragment;'VideoButtonEntryFragment': VideoButtonEntryFragment } }
  )> }
  & { ' $fragmentRefs'?: { 'ThemeMenuThemeFragment': ThemeMenuThemeFragment;'VideoButtonThemeFragment': VideoButtonThemeFragment } }
) & { ' $fragmentName'?: 'ThemeDetailCardThemeFragment' };

export type ThemeSummaryCardThemeFragment = (
  { type: ThemeType, sequence: number | null, group: { name: string, slug: string } | null, anime: { slug: string, name: string, images: { nodes: Array<{ ' $fragmentRefs'?: { 'ExtractImagesImageFragment': ExtractImagesImageFragment } }> } }, song: (
    { performances: Array<{ alias: string | null, as: string | null, artist: { slug: string, name: string } }> }
    & { ' $fragmentRefs'?: { 'SongTitleSongFragment': SongTitleSongFragment;'PerformancesSongFragment': PerformancesSongFragment } }
  ) | null, animethemeentries: Array<(
    { videos: { nodes: Array<{ ' $fragmentRefs'?: { 'CreateVideoSlugVideoFragment': CreateVideoSlugVideoFragment } }> } }
    & { ' $fragmentRefs'?: { 'CreateVideoSlugEntryFragment': CreateVideoSlugEntryFragment } }
  )> }
  & { ' $fragmentRefs'?: { 'CreateVideoSlugThemeFragment': CreateVideoSlugThemeFragment;'ThemeMenuThemeFragment': ThemeMenuThemeFragment } }
) & { ' $fragmentName'?: 'ThemeSummaryCardThemeFragment' };

export type ThemeSummaryCardArtistFragment = (
  { slug: string }
  & { ' $fragmentRefs'?: { 'PerformancesArtistFragment': PerformancesArtistFragment } }
) & { ' $fragmentName'?: 'ThemeSummaryCardArtistFragment' };

export type ThemeSummaryCardThemeExpandableFragment = { ' $fragmentRefs'?: { 'ThemeTableThemeFragment': ThemeTableThemeFragment } } & { ' $fragmentName'?: 'ThemeSummaryCardThemeExpandableFragment' };

export type VideoSummaryCardVideoFragment = (
  { id: number, basename: string }
  & { ' $fragmentRefs'?: { 'CreateVideoSlugVideoFragment': CreateVideoSlugVideoFragment } }
) & { ' $fragmentName'?: 'VideoSummaryCardVideoFragment' };

export type VideoSummaryCardEntryFragment = (
  { id: number, animetheme: (
    { id: number, type: ThemeType, sequence: number | null, group: { name: string, slug: string } | null, anime: { slug: string, name: string, images: { nodes: Array<{ ' $fragmentRefs'?: { 'ExtractImagesImageFragment': ExtractImagesImageFragment } }> } }, song: { ' $fragmentRefs'?: { 'SongTitleSongFragment': SongTitleSongFragment;'PerformancesSongFragment': PerformancesSongFragment } } | null }
    & { ' $fragmentRefs'?: { 'CreateVideoSlugThemeFragment': CreateVideoSlugThemeFragment } }
  ) }
  & { ' $fragmentRefs'?: { 'CreateVideoSlugEntryFragment': CreateVideoSlugEntryFragment } }
) & { ' $fragmentName'?: 'VideoSummaryCardEntryFragment' };

export type PlaylistAddMutationVariables = Exact<{
  name: Scalars['String']['input'];
  visibility: PlaylistVisibility;
}>;


export type PlaylistAddMutation = { CreatePlaylist: { id: string } };

export type PlaylistEditDialogPlaylistFragment = { id: string, name: string, visibility: PlaylistVisibility } & { ' $fragmentName'?: 'PlaylistEditDialogPlaylistFragment' };

export type PlaylistEditMutationVariables = Exact<{
  id: Scalars['String']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  visibility?: InputMaybe<PlaylistVisibility>;
}>;


export type PlaylistEditMutation = { UpdatePlaylist: { name: string } };

export type PlaylistRemoveDialogPlaylistFragment = (
  { id: string, name: string }
  & { ' $fragmentRefs'?: { 'PlaylistSummaryCardPlaylistFragment': PlaylistSummaryCardPlaylistFragment;'PlaylistRemoveToastPlaylistFragment': PlaylistRemoveToastPlaylistFragment } }
) & { ' $fragmentName'?: 'PlaylistRemoveDialogPlaylistFragment' };

export type PlaylistRemoveMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type PlaylistRemoveMutation = { DeletePlaylist: { message: string } };

export type PlaylistTrackAddDialogVideoFragment = (
  { id: number }
  & { ' $fragmentRefs'?: { 'VideoSummaryCardVideoFragment': VideoSummaryCardVideoFragment } }
) & { ' $fragmentName'?: 'PlaylistTrackAddDialogVideoFragment' };

export type PlaylistTrackAddDialogEntryFragment = (
  { id: number }
  & { ' $fragmentRefs'?: { 'VideoSummaryCardEntryFragment': VideoSummaryCardEntryFragment;'PlaylistTrackAddToastEntryFragment': PlaylistTrackAddToastEntryFragment;'PlaylistTrackRemoveToastEntryFragment': PlaylistTrackRemoveToastEntryFragment } }
) & { ' $fragmentName'?: 'PlaylistTrackAddDialogEntryFragment' };

export type PlaylistTrackAddFormPlaylistQueryVariables = Exact<{
  entryId: Scalars['Mixed']['input'];
  videoId: Scalars['Mixed']['input'];
}>;


export type PlaylistTrackAddFormPlaylistQuery = { me: { playlists: Array<(
      { id: string, tracks: Array<{ ' $fragmentRefs'?: { 'PlaylistTrackAddCardTrackFragment': PlaylistTrackAddCardTrackFragment } }> }
      & { ' $fragmentRefs'?: { 'PlaylistTrackAddCardPlaylistFragment': PlaylistTrackAddCardPlaylistFragment } }
    )> } | null };

export type PlaylistTrackAddCardPlaylistFragment = (
  { id: string }
  & { ' $fragmentRefs'?: { 'PlaylistSummaryCardPlaylistFragment': PlaylistSummaryCardPlaylistFragment;'PlaylistTrackAddToastPlaylistFragment': PlaylistTrackAddToastPlaylistFragment;'PlaylistTrackRemoveToastPlaylistFragment': PlaylistTrackRemoveToastPlaylistFragment } }
) & { ' $fragmentName'?: 'PlaylistTrackAddCardPlaylistFragment' };

export type PlaylistTrackAddCardTrackFragment = { id: string } & { ' $fragmentName'?: 'PlaylistTrackAddCardTrackFragment' };

export type PlaylistTrackAddMutationVariables = Exact<{
  playlistId: Scalars['String']['input'];
  entryId: Scalars['Int']['input'];
  videoId: Scalars['Int']['input'];
}>;


export type PlaylistTrackAddMutation = { CreatePlaylistTrack: { id: string } };

export type PlaylistTrackRemoveMutationVariables = Exact<{
  id: Scalars['String']['input'];
  playlistId: Scalars['String']['input'];
}>;


export type PlaylistTrackRemoveMutation = { DeletePlaylistTrack: { message: string } };

export type PlaylistTrackRemoveDialogPlaylistFragment = (
  { id: string, name: string }
  & { ' $fragmentRefs'?: { 'PlaylistTrackRemoveToastPlaylistFragment': PlaylistTrackRemoveToastPlaylistFragment } }
) & { ' $fragmentName'?: 'PlaylistTrackRemoveDialogPlaylistFragment' };

export type PlaylistTrackRemoveDialogVideoFragment = { ' $fragmentRefs'?: { 'VideoSummaryCardVideoFragment': VideoSummaryCardVideoFragment } } & { ' $fragmentName'?: 'PlaylistTrackRemoveDialogVideoFragment' };

export type PlaylistTrackRemoveDialogEntryFragment = { ' $fragmentRefs'?: { 'VideoSummaryCardEntryFragment': VideoSummaryCardEntryFragment;'PlaylistTrackRemoveToastEntryFragment': PlaylistTrackRemoveToastEntryFragment } } & { ' $fragmentName'?: 'PlaylistTrackRemoveDialogEntryFragment' };

export type FeaturedThemeEntryFragment = (
  { animetheme: (
    { anime: { slug: string, images: { nodes: Array<{ ' $fragmentRefs'?: { 'ExtractImagesImageFragment': ExtractImagesImageFragment } }> } } }
    & { ' $fragmentRefs'?: { 'CreateVideoSlugThemeFragment': CreateVideoSlugThemeFragment } }
  ) }
  & { ' $fragmentRefs'?: { 'VideoSummaryCardEntryFragment': VideoSummaryCardEntryFragment;'CreateVideoSlugEntryFragment': CreateVideoSlugEntryFragment } }
) & { ' $fragmentName'?: 'FeaturedThemeEntryFragment' };

export type FeaturedThemeVideoFragment = (
  { basename: string }
  & { ' $fragmentRefs'?: { 'VideoSummaryCardVideoFragment': VideoSummaryCardVideoFragment;'CreateVideoSlugVideoFragment': CreateVideoSlugVideoFragment } }
) & { ' $fragmentName'?: 'FeaturedThemeVideoFragment' };

export type AnimeThemeFilterThemeFragment = (
  { id: number, type: ThemeType, sequence: number | null, group: { name: string, slug: string } | null }
  & { ' $fragmentRefs'?: { 'ThemeDetailCardThemeFragment': ThemeDetailCardThemeFragment } }
) & { ' $fragmentName'?: 'AnimeThemeFilterThemeFragment' };

export type HomePageMostPopularQueryVariables = Exact<{ [key: string]: never; }>;


export type HomePageMostPopularQuery = { animethemeentryPagination: { data: Array<(
      { videos: { nodes: Array<{ ' $fragmentRefs'?: { 'VideoSummaryCardVideoFragment': VideoSummaryCardVideoFragment } }> } }
      & { ' $fragmentRefs'?: { 'VideoSummaryCardEntryFragment': VideoSummaryCardEntryFragment } }
    )> } };

export type HomePageRecentlyAddedPlaylistsQueryVariables = Exact<{ [key: string]: never; }>;


export type HomePageRecentlyAddedPlaylistsQuery = { playlistPagination: { data: Array<{ ' $fragmentRefs'?: { 'PlaylistSummaryCardPlaylistFragment': PlaylistSummaryCardPlaylistFragment;'PlaylistSummaryCardPlaylistWithOwnerFragment': PlaylistSummaryCardPlaylistWithOwnerFragment } }> } };

export type HomePageRecentlyAddedQueryVariables = Exact<{ [key: string]: never; }>;


export type HomePageRecentlyAddedQuery = { videoPagination: { data: Array<(
      { animethemeentries: { nodes: Array<{ ' $fragmentRefs'?: { 'VideoSummaryCardEntryFragment': VideoSummaryCardEntryFragment } }> } }
      & { ' $fragmentRefs'?: { 'VideoSummaryCardVideoFragment': VideoSummaryCardVideoFragment } }
    )> } };

export type ProfileImageUserFragment = { name: string, email: string } & { ' $fragmentName'?: 'ProfileImageUserFragment' };

export type StudioCoverImageStudioFragment = { images: { nodes: Array<{ ' $fragmentRefs'?: { 'ExtractImagesImageFragment': ExtractImagesImageFragment } }> }, anime: { nodes: Array<{ name: string, images: { nodes: Array<{ ' $fragmentRefs'?: { 'ExtractImagesImageFragment': ExtractImagesImageFragment } }> } }> } } & { ' $fragmentName'?: 'StudioCoverImageStudioFragment' };

export type ThemeMenuThemeFragment = (
  { id: number, type: ThemeType, sequence: number | null, group: { name: string, slug: string } | null, anime: { slug: string, name: string, images: { nodes: Array<{ ' $fragmentRefs'?: { 'ExtractImagesImageFragment': ExtractImagesImageFragment } }> } }, song: { ' $fragmentRefs'?: { 'SongTitleWithArtistsSongFragment': SongTitleWithArtistsSongFragment } } | null, animethemeentries: Array<(
    { id: number, videos: { nodes: Array<(
        { id: number, basename: string, audio: { basename: string } | null }
        & { ' $fragmentRefs'?: { 'CreateVideoSlugVideoFragment': CreateVideoSlugVideoFragment } }
      )> } }
    & { ' $fragmentRefs'?: { 'CreateVideoSlugEntryFragment': CreateVideoSlugEntryFragment } }
  )> }
  & { ' $fragmentRefs'?: { 'CreateVideoSlugThemeFragment': CreateVideoSlugThemeFragment } }
) & { ' $fragmentName'?: 'ThemeMenuThemeFragment' };

export type VideoMenuEntryFragment = (
  { id: number, animetheme: (
    { id: number, type: ThemeType, sequence: number | null, group: { name: string, slug: string } | null, anime: { slug: string, name: string, images: { nodes: Array<{ ' $fragmentRefs'?: { 'ExtractImagesImageFragment': ExtractImagesImageFragment } }> } }, song: { ' $fragmentRefs'?: { 'SongTitleWithArtistsSongFragment': SongTitleWithArtistsSongFragment } } | null }
    & { ' $fragmentRefs'?: { 'CreateVideoSlugThemeFragment': CreateVideoSlugThemeFragment } }
  ) }
  & { ' $fragmentRefs'?: { 'CreateVideoSlugEntryFragment': CreateVideoSlugEntryFragment;'PlaylistTrackAddDialogEntryFragment': PlaylistTrackAddDialogEntryFragment } }
) & { ' $fragmentName'?: 'VideoMenuEntryFragment' };

export type VideoMenuVideoFragment = (
  { id: number, basename: string, audio: { basename: string } | null }
  & { ' $fragmentRefs'?: { 'CreateVideoSlugVideoFragment': CreateVideoSlugVideoFragment;'PlaylistTrackAddDialogVideoFragment': PlaylistTrackAddDialogVideoFragment } }
) & { ' $fragmentName'?: 'VideoMenuVideoFragment' };

export type SeasonNavigationYearFragment = { year: number, seasons: Array<{ season: AnimeSeason, seasonLocalized: string }> | null } & { ' $fragmentName'?: 'SeasonNavigationYearFragment' };

export type SeasonNavigationSeasonFragment = { season: AnimeSeason } & { ' $fragmentName'?: 'SeasonNavigationSeasonFragment' };

export type YearNavigationYearFragment = { year: number, seasons: Array<{ season: AnimeSeason, seasonLocalized: string }> | null } & { ' $fragmentName'?: 'YearNavigationYearFragment' };

export type YearNavigationYearsFragment = { year: number } & { ' $fragmentName'?: 'YearNavigationYearsFragment' };

export type SearchAnimeQueryVariables = Exact<{
  query?: InputMaybe<Scalars['String']['input']>;
  name_like?: InputMaybe<Scalars['String']['input']>;
  season?: InputMaybe<AnimeSeason>;
  year?: InputMaybe<Scalars['Int']['input']>;
  format?: InputMaybe<AnimeFormat>;
  sort?: InputMaybe<Array<AnimeSort> | AnimeSort>;
  page: Scalars['Int']['input'];
}>;


export type SearchAnimeQuery = { animePagination: { data: Array<(
      { slug: string }
      & { ' $fragmentRefs'?: { 'AnimeSummaryCardAnimeFragment': AnimeSummaryCardAnimeFragment;'AnimeSummaryCardAnimeExpandableFragment': AnimeSummaryCardAnimeExpandableFragment } }
    )>, paginationInfo: { hasMorePages: boolean } } };

export type SearchArtistQueryVariables = Exact<{
  query?: InputMaybe<Scalars['String']['input']>;
  name_like?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<ArtistSort> | ArtistSort>;
  page: Scalars['Int']['input'];
}>;


export type SearchArtistQuery = { artistPagination: { data: Array<(
      { slug: string }
      & { ' $fragmentRefs'?: { 'ArtistSummaryCardArtistFragment': ArtistSummaryCardArtistFragment } }
    )>, paginationInfo: { hasMorePages: boolean } } };

export type SearchGlobalQueryVariables = Exact<{
  query: Scalars['String']['input'];
}>;


export type SearchGlobalQuery = { search: { anime: Array<(
      { slug: string }
      & { ' $fragmentRefs'?: { 'AnimeSummaryCardAnimeFragment': AnimeSummaryCardAnimeFragment;'AnimeSummaryCardAnimeExpandableFragment': AnimeSummaryCardAnimeExpandableFragment } }
    )>, animethemes: Array<(
      { id: number, anime: { slug: string } }
      & { ' $fragmentRefs'?: { 'ThemeSummaryCardThemeFragment': ThemeSummaryCardThemeFragment;'ThemeSummaryCardThemeExpandableFragment': ThemeSummaryCardThemeExpandableFragment } }
    )>, artists: Array<(
      { slug: string }
      & { ' $fragmentRefs'?: { 'ArtistSummaryCardArtistFragment': ArtistSummaryCardArtistFragment } }
    )>, series: Array<{ slug: string, name: string }>, studios: Array<{ slug: string, name: string }>, playlists: Array<(
      { id: string }
      & { ' $fragmentRefs'?: { 'PlaylistSummaryCardPlaylistFragment': PlaylistSummaryCardPlaylistFragment;'PlaylistSummaryCardPlaylistWithOwnerFragment': PlaylistSummaryCardPlaylistWithOwnerFragment } }
    )> } };

export type SearchPlaylistQueryVariables = Exact<{
  query?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<PlaylistSort> | PlaylistSort>;
  page: Scalars['Int']['input'];
}>;


export type SearchPlaylistQuery = { playlistPagination: { data: Array<(
      { id: string }
      & { ' $fragmentRefs'?: { 'PlaylistSummaryCardPlaylistFragment': PlaylistSummaryCardPlaylistFragment;'PlaylistSummaryCardPlaylistWithOwnerFragment': PlaylistSummaryCardPlaylistWithOwnerFragment } }
    )>, paginationInfo: { hasMorePages: boolean } } };

export type SearchSeriesQueryVariables = Exact<{
  query?: InputMaybe<Scalars['String']['input']>;
  name_like?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<SeriesSort> | SeriesSort>;
  page: Scalars['Int']['input'];
}>;


export type SearchSeriesQuery = { seriesPagination: { data: Array<{ slug: string, name: string }>, paginationInfo: { hasMorePages: boolean } } };

export type SearchStudioQueryVariables = Exact<{
  query?: InputMaybe<Scalars['String']['input']>;
  name_like?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Array<StudioSort> | StudioSort>;
  page: Scalars['Int']['input'];
}>;


export type SearchStudioQuery = { studioPagination: { data: Array<(
      { slug: string }
      & { ' $fragmentRefs'?: { 'StudioSummaryCardStudioFragment': StudioSummaryCardStudioFragment } }
    )>, paginationInfo: { hasMorePages: boolean } } };

export type SearchThemeQueryVariables = Exact<{
  query?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<ThemeType>;
  sort?: InputMaybe<Array<AnimeThemeSort> | AnimeThemeSort>;
  page: Scalars['Int']['input'];
}>;


export type SearchThemeQuery = { animethemePagination: { data: Array<(
      { slug: string | null }
      & { ' $fragmentRefs'?: { 'ThemeSummaryCardThemeFragment': ThemeSummaryCardThemeFragment;'ThemeSummaryCardThemeExpandableFragment': ThemeSummaryCardThemeExpandableFragment } }
    )>, paginationInfo: { hasMorePages: boolean } } };

export type ThemeTableThemeFragment = (
  { id: number, type: ThemeType, sequence: number | null, anime: { slug: string }, animethemeentries: Array<(
    { version: number, videos: { nodes: Array<{ ' $fragmentRefs'?: { 'CreateVideoSlugVideoFragment': CreateVideoSlugVideoFragment;'VideoTagsVideoFragment': VideoTagsVideoFragment } }> } }
    & { ' $fragmentRefs'?: { 'CreateVideoSlugEntryFragment': CreateVideoSlugEntryFragment;'EpisodeTagEntryFragment': EpisodeTagEntryFragment;'ContentWarningTagsEntryFragment': ContentWarningTagsEntryFragment } }
  )>, song: { ' $fragmentRefs'?: { 'SongTitleSongFragment': SongTitleSongFragment } } | null }
  & { ' $fragmentRefs'?: { 'CreateVideoSlugThemeFragment': CreateVideoSlugThemeFragment } }
) & { ' $fragmentName'?: 'ThemeTableThemeFragment' };

export type ContentWarningTagsEntryFragment = { spoiler: boolean, nsfw: boolean } & { ' $fragmentName'?: 'ContentWarningTagsEntryFragment' };

export type EpisodeTagEntryFragment = { episodes: string | null } & { ' $fragmentName'?: 'EpisodeTagEntryFragment' };

export type ThemeEntryTagsEntryFragment = { ' $fragmentRefs'?: { 'EpisodeTagEntryFragment': EpisodeTagEntryFragment;'ContentWarningTagsEntryFragment': ContentWarningTagsEntryFragment } } & { ' $fragmentName'?: 'ThemeEntryTagsEntryFragment' };

export type VideoTagsVideoFragment = { resolution: number | null, nc: boolean, subbed: boolean, lyrics: boolean, uncen: boolean, source: VideoSource | null, overlap: VideoOverlap } & { ' $fragmentName'?: 'VideoTagsVideoFragment' };

export type PlaylistRemoveToastPlaylistFragment = { id: string, name: string } & { ' $fragmentName'?: 'PlaylistRemoveToastPlaylistFragment' };

export type PlaylistTrackAddToastPlaylistFragment = { id: string, name: string } & { ' $fragmentName'?: 'PlaylistTrackAddToastPlaylistFragment' };

export type PlaylistTrackAddToastEntryFragment = { animetheme: { song: { ' $fragmentRefs'?: { 'SongTitleSongFragment': SongTitleSongFragment } } | null } } & { ' $fragmentName'?: 'PlaylistTrackAddToastEntryFragment' };

export type PlaylistTrackRemoveToastPlaylistFragment = { id: string, name: string } & { ' $fragmentName'?: 'PlaylistTrackRemoveToastPlaylistFragment' };

export type PlaylistTrackRemoveToastEntryFragment = { animetheme: { song: { ' $fragmentRefs'?: { 'SongTitleSongFragment': SongTitleSongFragment } } | null } } & { ' $fragmentName'?: 'PlaylistTrackRemoveToastEntryFragment' };

export type PerformancesSongFragment = { performances: Array<{ alias: string | null, as: string | null, relevance: number, artist: { id: number, slug: string, name: string }, member: { slug: string, name: string } | null }> } & { ' $fragmentName'?: 'PerformancesSongFragment' };

export type PerformancesArtistFragment = { id: number } & { ' $fragmentName'?: 'PerformancesArtistFragment' };

export type SongTitleSongFragment = { title: string | null } & { ' $fragmentName'?: 'SongTitleSongFragment' };

export type SongTitleWithArtistsSongFragment = { ' $fragmentRefs'?: { 'SongTitleSongFragment': SongTitleSongFragment;'PerformancesSongFragment': PerformancesSongFragment } } & { ' $fragmentName'?: 'SongTitleWithArtistsSongFragment' };

export type SongTitleWithArtistsArtistFragment = { ' $fragmentRefs'?: { 'PerformancesArtistFragment': PerformancesArtistFragment } } & { ' $fragmentName'?: 'SongTitleWithArtistsArtistFragment' };

export type VideoPlayerVideoFragment = (
  { basename: string, audio: { basename: string } | null }
  & { ' $fragmentRefs'?: { 'VideoPlayerBarVideoFragment': VideoPlayerBarVideoFragment;'CreateVideoSlugVideoFragment': CreateVideoSlugVideoFragment } }
) & { ' $fragmentName'?: 'VideoPlayerVideoFragment' };

export type VideoPlayerEntryFragment = (
  { animetheme: (
    { anime: { slug: string, images: { nodes: Array<{ ' $fragmentRefs'?: { 'ExtractImagesImageFragment': ExtractImagesImageFragment } }> } } }
    & { ' $fragmentRefs'?: { 'CreateVideoSlugThemeFragment': CreateVideoSlugThemeFragment } }
  ) }
  & { ' $fragmentRefs'?: { 'VideoPlayerBarEntryFragment': VideoPlayerBarEntryFragment;'CreateVideoSlugEntryFragment': CreateVideoSlugEntryFragment } }
) & { ' $fragmentName'?: 'VideoPlayerEntryFragment' };

export type VideoPlayerBarVideoFragment = { __typename: 'Video' } & { ' $fragmentName'?: 'VideoPlayerBarVideoFragment' };

export type VideoPlayerBarEntryFragment = { animetheme: { type: ThemeType, sequence: number | null, song: (
      { performances: Array<{ __typename: 'Performance' }> }
      & { ' $fragmentRefs'?: { 'SongTitleSongFragment': SongTitleSongFragment;'PerformancesSongFragment': PerformancesSongFragment } }
    ) | null, group: { name: string } | null, anime: { slug: string, name: string } } } & { ' $fragmentName'?: 'VideoPlayerBarEntryFragment' };

export type VideoScriptVideoFragment = { videoscript: { link: string } | null } & { ' $fragmentName'?: 'VideoScriptVideoFragment' };

export type UseAuthMeQueryVariables = Exact<{ [key: string]: never; }>;


export type UseAuthMeQuery = { me: (
    { id: number, name: string, email: string, permissions: { nodes: Array<{ name: string }> }, roles: { nodes: Array<{ permissions: { nodes: Array<{ name: string }> } }> } }
    & { ' $fragmentRefs'?: { 'ProfileImageUserFragment': ProfileImageUserFragment } }
  ) | null };

export type RandomGrillQueryVariables = Exact<{ [key: string]: never; }>;


export type RandomGrillQuery = { imagePagination: { data: Array<{ link: string }> } };

export type RandomThemeQueryVariables = Exact<{
  type?: InputMaybe<Array<ThemeType> | ThemeType>;
  format?: InputMaybe<Array<AnimeFormat> | AnimeFormat>;
  animeYearMin?: InputMaybe<Scalars['Int']['input']>;
  animeYearMax?: InputMaybe<Scalars['Int']['input']>;
}>;


export type RandomThemeQuery = { animethemeShuffle: Array<(
    { animethemeentries: Array<(
      { videos: { nodes: Array<{ ' $fragmentRefs'?: { 'VideoSummaryCardVideoFragment': VideoSummaryCardVideoFragment } }> } }
      & { ' $fragmentRefs'?: { 'VideoSummaryCardEntryFragment': VideoSummaryCardEntryFragment } }
    )> }
    & { ' $fragmentRefs'?: { 'ThemeSummaryCardThemeFragment': ThemeSummaryCardThemeFragment;'ThemeSummaryCardThemeExpandableFragment': ThemeSummaryCardThemeExpandableFragment } }
  )> };

export type DocumentPagePageFragment = { name: string, createdAt: string } & { ' $fragmentName'?: 'DocumentPagePageFragment' };

export type DocumentPageQueryVariables = Exact<{
  pageSlug: Scalars['String']['input'];
}>;


export type DocumentPageQuery = { page: (
    { body: string }
    & { ' $fragmentRefs'?: { 'DocumentPagePageFragment': DocumentPagePageFragment } }
  ) };

export type DocumentPageAllQueryVariables = Exact<{ [key: string]: never; }>;


export type DocumentPageAllQuery = { pagePagination: { data: Array<{ slug: string }> } };

export type DumpIndexPageQueryVariables = Exact<{ [key: string]: never; }>;


export type DumpIndexPageQuery = { dumpPagination: { data: Array<{ path: string, link: string, createdAt: string }> } };

export type VideoPageAnimeFragment = (
  { name: string, slug: string, year: number | null, season: AnimeSeason | null, animethemes: Array<(
    { id: number, type: ThemeType, sequence: number | null, song: { title: string | null, performances: Array<{ as: string | null, relevance: number, artist: (
          { id: number }
          & { ' $fragmentRefs'?: { 'ArtistSummaryCardArtistFragment': ArtistSummaryCardArtistFragment } }
        ) }> } | null, group: { slug: string } | null, animethemeentries: Array<(
      { id: number, episodes: string | null, nsfw: boolean, spoiler: boolean, version: number, videos: { nodes: Array<(
          { id: number, basename: string, filename: string, lyrics: boolean, nc: boolean, overlap: VideoOverlap, resolution: number | null, source: VideoSource | null, subbed: boolean, uncen: boolean, tags: string | null, animethemeentries: { nodes: Array<{ animetheme: (
                { anime: { slug: string } }
                & { ' $fragmentRefs'?: { 'ThemeSummaryCardThemeFragment': ThemeSummaryCardThemeFragment } }
              ) }> }, tracks: Array<{ playlist: (
              { id: string }
              & { ' $fragmentRefs'?: { 'PlaylistSummaryCardPlaylistFragment': PlaylistSummaryCardPlaylistFragment;'PlaylistSummaryCardPlaylistWithOwnerFragment': PlaylistSummaryCardPlaylistWithOwnerFragment } }
            ) }> }
          & { ' $fragmentRefs'?: { 'VideoPlayerVideoFragment': VideoPlayerVideoFragment;'VideoScriptVideoFragment': VideoScriptVideoFragment;'CreateVideoSlugVideoFragment': CreateVideoSlugVideoFragment } }
        )> } }
      & { ' $fragmentRefs'?: { 'VideoPlayerEntryFragment': VideoPlayerEntryFragment;'CreateVideoSlugEntryFragment': CreateVideoSlugEntryFragment } }
    )> }
    & { ' $fragmentRefs'?: { 'ThemeSummaryCardThemeFragment': ThemeSummaryCardThemeFragment;'CreateVideoSlugThemeFragment': CreateVideoSlugThemeFragment } }
  )>, images: { nodes: Array<{ ' $fragmentRefs'?: { 'ExtractImagesImageFragment': ExtractImagesImageFragment } }> }, series: { nodes: Array<{ slug: string, name: string }> }, studios: { nodes: Array<(
      { slug: string }
      & { ' $fragmentRefs'?: { 'StudioSummaryCardStudioFragment': StudioSummaryCardStudioFragment } }
    )> } }
  & { ' $fragmentRefs'?: { 'AnimeSummaryCardAnimeFragment': AnimeSummaryCardAnimeFragment } }
) & { ' $fragmentName'?: 'VideoPageAnimeFragment' };

export type VideoPageQueryVariables = Exact<{
  animeSlug: Scalars['String']['input'];
}>;


export type VideoPageQuery = { anime: { ' $fragmentRefs'?: { 'VideoPageAnimeFragment': VideoPageAnimeFragment } } };

export type VideoPageAllQueryVariables = Exact<{ [key: string]: never; }>;


export type VideoPageAllQuery = { animePagination: { data: Array<(
      { slug: string, animethemes: Array<(
        { animethemeentries: Array<(
          { videos: { nodes: Array<{ ' $fragmentRefs'?: { 'CreateVideoSlugVideoFragment': CreateVideoSlugVideoFragment } }> } }
          & { ' $fragmentRefs'?: { 'CreateVideoSlugEntryFragment': CreateVideoSlugEntryFragment } }
        )> }
        & { ' $fragmentRefs'?: { 'CreateVideoSlugThemeFragment': CreateVideoSlugThemeFragment } }
      )> }
      & { ' $fragmentRefs'?: { 'VideoPageAnimeFragment': VideoPageAnimeFragment } }
    )> } };

export type AnimeDetailPageAnimeFragment = { slug: string, name: string, season: AnimeSeason | null, seasonLocalized: string | null, year: number | null, synopsis: string | null, formatLocalized: string | null, synonyms: Array<{ text: string }>, series: { nodes: Array<{ slug: string, name: string }> }, studios: { nodes: Array<{ slug: string, name: string }> }, resources: { edges: Array<{ as: string | null, node: { site: ResourceSite, siteLocalized: string, link: string } }> }, images: { nodes: Array<{ ' $fragmentRefs'?: { 'ExtractImagesImageFragment': ExtractImagesImageFragment } }> }, animethemes: Array<{ ' $fragmentRefs'?: { 'AnimeThemeFilterThemeFragment': AnimeThemeFilterThemeFragment } }> } & { ' $fragmentName'?: 'AnimeDetailPageAnimeFragment' };

export type AnimeDetailPageQueryVariables = Exact<{
  animeSlug: Scalars['String']['input'];
}>;


export type AnimeDetailPageQuery = { anime: { ' $fragmentRefs'?: { 'AnimeDetailPageAnimeFragment': AnimeDetailPageAnimeFragment } } };

export type AnimeDetailPageAllQueryVariables = Exact<{ [key: string]: never; }>;


export type AnimeDetailPageAllQuery = { animePagination: { data: Array<(
      { slug: string }
      & { ' $fragmentRefs'?: { 'AnimeDetailPageAnimeFragment': AnimeDetailPageAnimeFragment } }
    )> } };

export type AnimeIndexPageQueryVariables = Exact<{
  first: Scalars['Int']['input'];
}>;


export type AnimeIndexPageQuery = { animePagination: { data: Array<{ slug: string, name: string }> } };

export type RevalidateApiQueryVariables = Exact<{ [key: string]: never; }>;


export type RevalidateApiQuery = { me: { permissions: { nodes: Array<{ name: string }> }, roles: { nodes: Array<{ permissions: { nodes: Array<{ name: string }> } }> } } | null };

export type ArtistDetailPageArtistFragment = (
  { slug: string, name: string, synonyms: Array<{ text: string }>, performances: Array<{ alias: string | null, as: string | null, song: { id: number, title: string | null, performances: Array<{ alias: string | null, as: string | null, memberAlias: string | null, memberAs: string | null, artist: { slug: string, name: string } }>, animethemes: Array<(
        { id: number, type: ThemeType, sequence: number | null, animethemeentries: Array<{ videos: { nodes: Array<{ id: number }> } }>, group: { name: string, slug: string } | null, anime: { slug: string, name: string, year: number | null, season: AnimeSeason | null }, song: { title: string | null } | null }
        & { ' $fragmentRefs'?: { 'ThemeSummaryCardThemeFragment': ThemeSummaryCardThemeFragment;'ThemeSummaryCardThemeExpandableFragment': ThemeSummaryCardThemeExpandableFragment } }
      )> } }>, memberPerformances: Array<{ alias: string | null, as: string | null, memberAlias: string | null, memberAs: string | null, artist: { slug: string, name: string }, song: { id: number, title: string | null, performances: Array<{ alias: string | null, as: string | null, memberAlias: string | null, memberAs: string | null, artist: { slug: string, name: string } }>, animethemes: Array<(
        { id: number, type: ThemeType, sequence: number | null, animethemeentries: Array<{ videos: { nodes: Array<{ id: number }> } }>, group: { name: string, slug: string } | null, anime: { slug: string, name: string, year: number | null, season: AnimeSeason | null }, song: { title: string | null } | null }
        & { ' $fragmentRefs'?: { 'ThemeSummaryCardThemeFragment': ThemeSummaryCardThemeFragment;'ThemeSummaryCardThemeExpandableFragment': ThemeSummaryCardThemeExpandableFragment } }
      )> } }>, members: { edges: Array<{ alias: string | null, as: string | null, notes: string | null, relevance: number, node: (
        { slug: string, name: string }
        & { ' $fragmentRefs'?: { 'ArtistSummaryCardArtistFragment': ArtistSummaryCardArtistFragment } }
      ) }> }, groups: { edges: Array<{ alias: string | null, as: string | null, notes: string | null, node: { slug: string, name: string } }> }, images: { edges: Array<{ ' $fragmentRefs'?: { 'ExtractMultipleImagesImageArtistEdgeFragment': ExtractMultipleImagesImageArtistEdgeFragment } }> }, resources: { edges: Array<{ as: string | null, node: { link: string, site: ResourceSite, siteLocalized: string } }> } }
  & { ' $fragmentRefs'?: { 'ThemeSummaryCardArtistFragment': ThemeSummaryCardArtistFragment } }
) & { ' $fragmentName'?: 'ArtistDetailPageArtistFragment' };

export type ArtistDetailPageQueryVariables = Exact<{
  artistSlug: Scalars['String']['input'];
}>;


export type ArtistDetailPageQuery = { artist: (
    { information: string | null }
    & { ' $fragmentRefs'?: { 'ArtistDetailPageArtistFragment': ArtistDetailPageArtistFragment } }
  ) };

export type ArtistDetailPageAllQueryVariables = Exact<{ [key: string]: never; }>;


export type ArtistDetailPageAllQuery = { artistPagination: { data: Array<(
      { slug: string, information: string | null }
      & { ' $fragmentRefs'?: { 'ArtistDetailPageArtistFragment': ArtistDetailPageArtistFragment } }
    )> } };

export type ArtistIndexPageQueryVariables = Exact<{
  first: Scalars['Int']['input'];
}>;


export type ArtistIndexPageQuery = { artistPagination: { data: Array<{ slug: string, name: string }> } };

export type DocumentIndexPageQueryVariables = Exact<{ [key: string]: never; }>;


export type DocumentIndexPageQuery = { pagePagination: { data: Array<{ slug: string, name: string, createdAt: string }> } };

export type BracketPageQueryVariables = Exact<{
  themeIds: Scalars['Mixed']['input'];
}>;


export type BracketPageQuery = { animethemePagination: { data: Array<(
      { id: number }
      & { ' $fragmentRefs'?: { 'BracketThemeSummaryCardThemeFragment': BracketThemeSummaryCardThemeFragment } }
    )> } };

export type AnimeAwardsPageThemeFragment = (
  { id: number, type: ThemeType, sequence: number | null, anime: { slug: string, name: string, images: { nodes: Array<{ ' $fragmentRefs'?: { 'ExtractImagesImageFragment': ExtractImagesImageFragment } }> } }, song: { ' $fragmentRefs'?: { 'SongTitleWithArtistsSongFragment': SongTitleWithArtistsSongFragment } } | null }
  & { ' $fragmentRefs'?: { 'CreateVideoSlugThemeFragment': CreateVideoSlugThemeFragment } }
) & { ' $fragmentName'?: 'AnimeAwardsPageThemeFragment' };

export type AnimeAwardPageEntryFragment = (
  { version: number, videos: { nodes: Array<(
      { basename: string, tags: string | null }
      & { ' $fragmentRefs'?: { 'CreateVideoSlugVideoFragment': CreateVideoSlugVideoFragment } }
    )> } }
  & { ' $fragmentRefs'?: { 'CreateVideoSlugEntryFragment': CreateVideoSlugEntryFragment } }
) & { ' $fragmentName'?: 'AnimeAwardPageEntryFragment' };

export type AnimeAwardPageQueryVariables = Exact<{
  themeIds: Scalars['Mixed']['input'];
}>;


export type AnimeAwardPageQuery = { animethemePagination: { data: Array<(
      { id: number, animethemeentries: Array<(
        { version: number }
        & { ' $fragmentRefs'?: { 'AnimeAwardPageEntryFragment': AnimeAwardPageEntryFragment } }
      )> }
      & { ' $fragmentRefs'?: { 'AnimeAwardsPageThemeFragment': AnimeAwardsPageThemeFragment } }
    )> } };

export type HomePageFeaturedThemeFragment = { animethemeentry: { ' $fragmentRefs'?: { 'FeaturedThemeEntryFragment': FeaturedThemeEntryFragment } } | null, video: { ' $fragmentRefs'?: { 'FeaturedThemeVideoFragment': FeaturedThemeVideoFragment } } | null } & { ' $fragmentName'?: 'HomePageFeaturedThemeFragment' };

export type HomePageAnnouncementFragment = { content: string } & { ' $fragmentName'?: 'HomePageAnnouncementFragment' };

export type HomePageQueryVariables = Exact<{ [key: string]: never; }>;


export type HomePageQuery = { currentfeaturedtheme: { ' $fragmentRefs'?: { 'HomePageFeaturedThemeFragment': HomePageFeaturedThemeFragment } } | null, announcementPagination: { data: Array<{ ' $fragmentRefs'?: { 'HomePageAnnouncementFragment': HomePageAnnouncementFragment } }> } };

export type PlaylistDetailPagePlaylistFragment = (
  { id: string, name: string, description: string | null, visibility: PlaylistVisibility, tracksCount: number, user: { name: string } }
  & { ' $fragmentRefs'?: { 'PlaylistEditDialogPlaylistFragment': PlaylistEditDialogPlaylistFragment;'PlaylistTrackRemoveDialogPlaylistFragment': PlaylistTrackRemoveDialogPlaylistFragment } }
) & { ' $fragmentName'?: 'PlaylistDetailPagePlaylistFragment' };

export type PlaylistDetailPageTrackFragment = { id: string, video: (
    { id: number }
    & { ' $fragmentRefs'?: { 'VideoSummaryCardVideoFragment': VideoSummaryCardVideoFragment;'FeaturedThemeVideoFragment': FeaturedThemeVideoFragment;'PlaylistTrackAddDialogVideoFragment': PlaylistTrackAddDialogVideoFragment;'PlaylistTrackRemoveDialogVideoFragment': PlaylistTrackRemoveDialogVideoFragment } }
  ), animethemeentry: (
    { animetheme: { anime: { name: string, year: number | null, season: AnimeSeason | null, images: { nodes: Array<{ ' $fragmentRefs'?: { 'ExtractImagesImageFragment': ExtractImagesImageFragment } }> } }, song: { title: string | null } | null } }
    & { ' $fragmentRefs'?: { 'VideoSummaryCardEntryFragment': VideoSummaryCardEntryFragment;'FeaturedThemeEntryFragment': FeaturedThemeEntryFragment;'PlaylistTrackAddDialogEntryFragment': PlaylistTrackAddDialogEntryFragment;'PlaylistTrackRemoveDialogEntryFragment': PlaylistTrackRemoveDialogEntryFragment } }
  ) } & { ' $fragmentName'?: 'PlaylistDetailPageTrackFragment' };

export type PlaylistDetailPageMeFragment = { name: string } & { ' $fragmentName'?: 'PlaylistDetailPageMeFragment' };

export type PlaylistDetailPagePlaylistQueryVariables = Exact<{
  playlistId: Scalars['String']['input'];
}>;


export type PlaylistDetailPagePlaylistQuery = { playlist: (
    { tracks: Array<(
      { id: string, previous: { id: string } | null, next: { id: string } | null }
      & { ' $fragmentRefs'?: { 'PlaylistDetailPageTrackFragment': PlaylistDetailPageTrackFragment } }
    )> }
    & { ' $fragmentRefs'?: { 'PlaylistDetailPagePlaylistFragment': PlaylistDetailPagePlaylistFragment } }
  ) };

export type PlaylistDetailPageMeQueryVariables = Exact<{ [key: string]: never; }>;


export type PlaylistDetailPageMeQuery = { me: { ' $fragmentRefs'?: { 'PlaylistDetailPageMeFragment': PlaylistDetailPageMeFragment } } | null };

export type PlaylistDetailPageQueryVariables = Exact<{
  playlistId: Scalars['String']['input'];
}>;


export type PlaylistDetailPageQuery = { playlist: (
    { tracks: Array<(
      { id: string, previous: { id: string } | null, next: { id: string } | null }
      & { ' $fragmentRefs'?: { 'PlaylistDetailPageTrackFragment': PlaylistDetailPageTrackFragment } }
    )> }
    & { ' $fragmentRefs'?: { 'PlaylistDetailPagePlaylistFragment': PlaylistDetailPagePlaylistFragment } }
  ), me: { ' $fragmentRefs'?: { 'PlaylistDetailPageMeFragment': PlaylistDetailPageMeFragment } } | null };

export type GalleryPageQueryVariables = Exact<{
  first: Scalars['Int']['input'];
}>;


export type GalleryPageQuery = { grills: { data: Array<{ id: number, link: string }> } };

export type ProfilePageMeFragment = (
  { name: string, email: string, emailVerifiedAt: string, createdAt: string, roles: { nodes: Array<{ name: string, color: string | null, priority: number, default: string }> }, playlists: Array<(
    { id: string }
    & { ' $fragmentRefs'?: { 'PlaylistSummaryCardPlaylistFragment': PlaylistSummaryCardPlaylistFragment;'PlaylistRemoveDialogPlaylistFragment': PlaylistRemoveDialogPlaylistFragment } }
  )> }
  & { ' $fragmentRefs'?: { 'ProfileImageUserFragment': ProfileImageUserFragment } }
) & { ' $fragmentName'?: 'ProfilePageMeFragment' };

export type ProfilePageQueryVariables = Exact<{ [key: string]: never; }>;


export type ProfilePageQuery = { me: { ' $fragmentRefs'?: { 'ProfilePageMeFragment': ProfilePageMeFragment } } | null };

export type SeriesDetailPageSeriesFragment = { slug: string, name: string, anime: { nodes: Array<(
      { name: string, slug: string, year: number | null, season: AnimeSeason | null, animethemes: Array<{ type: ThemeType, sequence: number | null, animethemeentries: Array<{ version: number, videos: { nodes: Array<{ tags: string | null }> } }> }>, images: { nodes: Array<{ ' $fragmentRefs'?: { 'ExtractImagesImageFragment': ExtractImagesImageFragment } }> } }
      & { ' $fragmentRefs'?: { 'AnimeSummaryCardAnimeFragment': AnimeSummaryCardAnimeFragment;'AnimeSummaryCardAnimeExpandableFragment': AnimeSummaryCardAnimeExpandableFragment } }
    )> } } & { ' $fragmentName'?: 'SeriesDetailPageSeriesFragment' };

export type SeriesDetailPageQueryVariables = Exact<{
  seriesSlug: Scalars['String']['input'];
}>;


export type SeriesDetailPageQuery = { series: { ' $fragmentRefs'?: { 'SeriesDetailPageSeriesFragment': SeriesDetailPageSeriesFragment } } };

export type SeriesDetailPageAllQueryVariables = Exact<{ [key: string]: never; }>;


export type SeriesDetailPageAllQuery = { seriesPagination: { data: Array<(
      { slug: string }
      & { ' $fragmentRefs'?: { 'SeriesDetailPageSeriesFragment': SeriesDetailPageSeriesFragment } }
    )> } };

export type SeriesIndexPageQueryVariables = Exact<{
  first: Scalars['Int']['input'];
}>;


export type SeriesIndexPageQuery = { seriesPagination: { data: Array<{ slug: string, name: string }> } };

export type StudioDetailPageStudioFragment = (
  { slug: string, name: string, anime: { nodes: Array<(
      { name: string, slug: string, year: number | null, season: AnimeSeason | null, animethemes: Array<{ type: ThemeType, sequence: number | null, animethemeentries: Array<{ version: number, videos: { nodes: Array<{ tags: string | null }> } }> }>, images: { nodes: Array<{ facet: ImageFacet, link: string }> } }
      & { ' $fragmentRefs'?: { 'AnimeSummaryCardAnimeFragment': AnimeSummaryCardAnimeFragment;'AnimeSummaryCardAnimeExpandableFragment': AnimeSummaryCardAnimeExpandableFragment } }
    )> }, resources: { edges: Array<{ as: string | null, node: { link: string, site: ResourceSite, siteLocalized: string } }> }, images: { nodes: Array<{ ' $fragmentRefs'?: { 'ExtractImagesImageFragment': ExtractImagesImageFragment } }> } }
  & { ' $fragmentRefs'?: { 'StudioCoverImageStudioFragment': StudioCoverImageStudioFragment } }
) & { ' $fragmentName'?: 'StudioDetailPageStudioFragment' };

export type StudioDetailPageQueryVariables = Exact<{
  studioSlug: Scalars['String']['input'];
}>;


export type StudioDetailPageQuery = { studio: { ' $fragmentRefs'?: { 'StudioDetailPageStudioFragment': StudioDetailPageStudioFragment } } };

export type StudioDetailPageAllQueryVariables = Exact<{ [key: string]: never; }>;


export type StudioDetailPageAllQuery = { studioPagination: { data: Array<(
      { slug: string }
      & { ' $fragmentRefs'?: { 'StudioDetailPageStudioFragment': StudioDetailPageStudioFragment } }
    )> } };

export type StudioIndexPageQueryVariables = Exact<{
  first: Scalars['Int']['input'];
}>;


export type StudioIndexPageQuery = { studioPagination: { data: Array<{ slug: string, name: string }> } };

export type SeasonDetailPageYearFragment = (
  { year: number }
  & { ' $fragmentRefs'?: { 'SeasonNavigationYearFragment': SeasonNavigationYearFragment } }
) & { ' $fragmentName'?: 'SeasonDetailPageYearFragment' };

export type SeasonDetailPageSeasonFragment = (
  { season: AnimeSeason, seasonLocalized: string, anime: { data: Array<(
      { slug: string, name: string }
      & { ' $fragmentRefs'?: { 'AnimeSummaryCardAnimeFragment': AnimeSummaryCardAnimeFragment;'AnimeSummaryCardAnimeExpandableFragment': AnimeSummaryCardAnimeExpandableFragment } }
    )> } }
  & { ' $fragmentRefs'?: { 'SeasonNavigationSeasonFragment': SeasonNavigationSeasonFragment } }
) & { ' $fragmentName'?: 'SeasonDetailPageSeasonFragment' };

export type SeasonDetailPageAllQueryVariables = Exact<{ [key: string]: never; }>;


export type SeasonDetailPageAllQuery = { animeyears: Array<{ year: number, seasons: Array<{ season: AnimeSeason }> | null }> };

export type SeasonDetailPageQueryVariables = Exact<{
  year: Scalars['Int']['input'];
  season: AnimeSeason;
}>;


export type SeasonDetailPageQuery = { animeyear: Array<(
    { season: { ' $fragmentRefs'?: { 'SeasonDetailPageSeasonFragment': SeasonDetailPageSeasonFragment } } | null, seasons: Array<{ season: AnimeSeason, seasonLocalized: string }> | null }
    & { ' $fragmentRefs'?: { 'SeasonDetailPageYearFragment': SeasonDetailPageYearFragment;'YearNavigationYearFragment': YearNavigationYearFragment } }
  )>, animeyears: Array<(
    { year: number }
    & { ' $fragmentRefs'?: { 'YearNavigationYearsFragment': YearNavigationYearsFragment } }
  )> };

export type YearDetailPageAllQueryVariables = Exact<{ [key: string]: never; }>;


export type YearDetailPageAllQuery = { animeyears: Array<{ year: number }> };

export type YearDetailPageQueryVariables = Exact<{
  year: Scalars['Int']['input'];
}>;


export type YearDetailPageQuery = { animeyear: Array<(
    { year: number, seasons: Array<{ season: AnimeSeason, seasonLocalized: string, anime: { data: Array<{ ' $fragmentRefs'?: { 'SeasonPreviewAnimeFragment': SeasonPreviewAnimeFragment } }> } }> | null }
    & { ' $fragmentRefs'?: { 'SeasonDetailPageYearFragment': SeasonDetailPageYearFragment;'YearNavigationYearFragment': YearNavigationYearFragment } }
  )>, animeyears: Array<(
    { year: number }
    & { ' $fragmentRefs'?: { 'YearNavigationYearsFragment': YearNavigationYearsFragment } }
  )> };

export type SeasonPreviewAnimeFragment = (
  { slug: string }
  & { ' $fragmentRefs'?: { 'AnimeSummaryCardAnimeFragment': AnimeSummaryCardAnimeFragment;'AnimeSummaryCardAnimeExpandableFragment': AnimeSummaryCardAnimeExpandableFragment } }
) & { ' $fragmentName'?: 'SeasonPreviewAnimeFragment' };

export type YearIndexPageQueryVariables = Exact<{ [key: string]: never; }>;


export type YearIndexPageQuery = { animeyears: Array<{ year: number, seasons: Array<{ season: AnimeSeason, seasonLocalized: string }> | null }> };

export type CreateVideoSlugThemeFragment = { type: ThemeType, sequence: number | null, group: { slug: string } | null } & { ' $fragmentName'?: 'CreateVideoSlugThemeFragment' };

export type CreateVideoSlugEntryFragment = { version: number } & { ' $fragmentName'?: 'CreateVideoSlugEntryFragment' };

export type CreateVideoSlugVideoFragment = { tags: string | null } & { ' $fragmentName'?: 'CreateVideoSlugVideoFragment' };

export type ExtractImagesImageFragment = { link: string, facet: ImageFacet } & { ' $fragmentName'?: 'ExtractImagesImageFragment' };

export type ExtractMultipleImagesImageArtistEdgeFragment = { depth: number, node: { link: string, facet: ImageFacet } } & { ' $fragmentName'?: 'ExtractMultipleImagesImageArtistEdgeFragment' };

export const CreateVideoSlugThemeFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"createVideoSlugTheme"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeTheme"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"sequence"}},{"kind":"Field","name":{"kind":"Name","value":"group"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]}}]} as unknown as DocumentNode<CreateVideoSlugThemeFragment, unknown>;
export const ExtractImagesImageFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"extractImagesImage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Image"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"link"}},{"kind":"Field","name":{"kind":"Name","value":"facet"}}]}}]} as unknown as DocumentNode<ExtractImagesImageFragment, unknown>;
export const SongTitleSongFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SongTitleSong"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Song"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]} as unknown as DocumentNode<SongTitleSongFragment, unknown>;
export const PerformancesSongFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PerformancesSong"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Song"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"performances"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"alias"}},{"kind":"Field","name":{"kind":"Name","value":"as"}},{"kind":"Field","name":{"kind":"Name","value":"relevance"}},{"kind":"Field","name":{"kind":"Name","value":"artist"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"member"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<PerformancesSongFragment, unknown>;
export const SongTitleWithArtistsSongFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SongTitleWithArtistsSong"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Song"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SongTitleSong"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"PerformancesSong"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SongTitleSong"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Song"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PerformancesSong"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Song"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"performances"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"alias"}},{"kind":"Field","name":{"kind":"Name","value":"as"}},{"kind":"Field","name":{"kind":"Name","value":"relevance"}},{"kind":"Field","name":{"kind":"Name","value":"artist"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"member"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<SongTitleWithArtistsSongFragment, unknown>;
export const CreateVideoSlugEntryFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"createVideoSlugEntry"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeThemeEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"version"}}]}}]} as unknown as DocumentNode<CreateVideoSlugEntryFragment, unknown>;
export const CreateVideoSlugVideoFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"createVideoSlugVideo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Video"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tags"}}]}}]} as unknown as DocumentNode<CreateVideoSlugVideoFragment, unknown>;
export const ThemeMenuThemeFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ThemeMenuTheme"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeTheme"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugTheme"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"sequence"}},{"kind":"Field","name":{"kind":"Name","value":"group"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}},{"kind":"Field","name":{"kind":"Name","value":"anime"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"extractImagesImage"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"song"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SongTitleWithArtistsSong"}}]}},{"kind":"Field","name":{"kind":"Name","value":"animethemeentries"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugEntry"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"videos"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugVideo"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"basename"}},{"kind":"Field","name":{"kind":"Name","value":"audio"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"basename"}}]}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SongTitleSong"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Song"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PerformancesSong"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Song"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"performances"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"alias"}},{"kind":"Field","name":{"kind":"Name","value":"as"}},{"kind":"Field","name":{"kind":"Name","value":"relevance"}},{"kind":"Field","name":{"kind":"Name","value":"artist"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"member"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"createVideoSlugTheme"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeTheme"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"sequence"}},{"kind":"Field","name":{"kind":"Name","value":"group"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"extractImagesImage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Image"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"link"}},{"kind":"Field","name":{"kind":"Name","value":"facet"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SongTitleWithArtistsSong"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Song"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SongTitleSong"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"PerformancesSong"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"createVideoSlugEntry"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeThemeEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"version"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"createVideoSlugVideo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Video"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tags"}}]}}]} as unknown as DocumentNode<ThemeMenuThemeFragment, unknown>;
export const BracketThemeSummaryCardThemeFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BracketThemeSummaryCardTheme"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeTheme"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugTheme"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ThemeMenuTheme"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"sequence"}},{"kind":"Field","name":{"kind":"Name","value":"group"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}},{"kind":"Field","name":{"kind":"Name","value":"anime"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"extractImagesImage"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"song"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SongTitleWithArtistsSong"}}]}},{"kind":"Field","name":{"kind":"Name","value":"animethemeentries"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugEntry"}},{"kind":"Field","name":{"kind":"Name","value":"videos"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugVideo"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"createVideoSlugTheme"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeTheme"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"sequence"}},{"kind":"Field","name":{"kind":"Name","value":"group"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"extractImagesImage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Image"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"link"}},{"kind":"Field","name":{"kind":"Name","value":"facet"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SongTitleSong"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Song"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PerformancesSong"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Song"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"performances"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"alias"}},{"kind":"Field","name":{"kind":"Name","value":"as"}},{"kind":"Field","name":{"kind":"Name","value":"relevance"}},{"kind":"Field","name":{"kind":"Name","value":"artist"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"member"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SongTitleWithArtistsSong"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Song"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SongTitleSong"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"PerformancesSong"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"createVideoSlugEntry"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeThemeEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"version"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"createVideoSlugVideo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Video"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tags"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ThemeMenuTheme"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeTheme"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugTheme"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"sequence"}},{"kind":"Field","name":{"kind":"Name","value":"group"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}},{"kind":"Field","name":{"kind":"Name","value":"anime"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"extractImagesImage"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"song"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SongTitleWithArtistsSong"}}]}},{"kind":"Field","name":{"kind":"Name","value":"animethemeentries"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugEntry"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"videos"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugVideo"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"basename"}},{"kind":"Field","name":{"kind":"Name","value":"audio"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"basename"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<BracketThemeSummaryCardThemeFragment, unknown>;
export const PlaylistSummaryCardPlaylistFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlaylistSummaryCardPlaylist"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Playlist"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"visibilityLocalized"}},{"kind":"Field","name":{"kind":"Name","value":"tracksCount"}}]}}]} as unknown as DocumentNode<PlaylistSummaryCardPlaylistFragment, unknown>;
export const PlaylistTrackAddToastPlaylistFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlaylistTrackAddToastPlaylist"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Playlist"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]} as unknown as DocumentNode<PlaylistTrackAddToastPlaylistFragment, unknown>;
export const PlaylistTrackRemoveToastPlaylistFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlaylistTrackRemoveToastPlaylist"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Playlist"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]} as unknown as DocumentNode<PlaylistTrackRemoveToastPlaylistFragment, unknown>;
export const PlaylistTrackAddCardPlaylistFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlaylistTrackAddCardPlaylist"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Playlist"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlaylistSummaryCardPlaylist"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlaylistTrackAddToastPlaylist"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlaylistTrackRemoveToastPlaylist"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlaylistSummaryCardPlaylist"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Playlist"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"visibilityLocalized"}},{"kind":"Field","name":{"kind":"Name","value":"tracksCount"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlaylistTrackAddToastPlaylist"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Playlist"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlaylistTrackRemoveToastPlaylist"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Playlist"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]} as unknown as DocumentNode<PlaylistTrackAddCardPlaylistFragment, unknown>;
export const PlaylistTrackAddCardTrackFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlaylistTrackAddCardTrack"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PlaylistTrack"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]} as unknown as DocumentNode<PlaylistTrackAddCardTrackFragment, unknown>;
export const VideoSummaryCardEntryFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"VideoSummaryCardEntry"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeThemeEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugEntry"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"animetheme"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugTheme"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"sequence"}},{"kind":"Field","name":{"kind":"Name","value":"group"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}},{"kind":"Field","name":{"kind":"Name","value":"anime"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"extractImagesImage"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"song"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SongTitleSong"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"PerformancesSong"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"createVideoSlugEntry"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeThemeEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"version"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"createVideoSlugTheme"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeTheme"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"sequence"}},{"kind":"Field","name":{"kind":"Name","value":"group"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"extractImagesImage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Image"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"link"}},{"kind":"Field","name":{"kind":"Name","value":"facet"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SongTitleSong"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Song"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PerformancesSong"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Song"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"performances"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"alias"}},{"kind":"Field","name":{"kind":"Name","value":"as"}},{"kind":"Field","name":{"kind":"Name","value":"relevance"}},{"kind":"Field","name":{"kind":"Name","value":"artist"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"member"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<VideoSummaryCardEntryFragment, unknown>;
export const PlaylistTrackAddToastEntryFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlaylistTrackAddToastEntry"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeThemeEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"animetheme"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"song"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SongTitleSong"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SongTitleSong"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Song"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]} as unknown as DocumentNode<PlaylistTrackAddToastEntryFragment, unknown>;
export const PlaylistTrackRemoveToastEntryFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlaylistTrackRemoveToastEntry"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeThemeEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"animetheme"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"song"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SongTitleSong"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SongTitleSong"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Song"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]} as unknown as DocumentNode<PlaylistTrackRemoveToastEntryFragment, unknown>;
export const PlaylistTrackAddDialogEntryFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlaylistTrackAddDialogEntry"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeThemeEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"VideoSummaryCardEntry"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlaylistTrackAddToastEntry"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlaylistTrackRemoveToastEntry"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"createVideoSlugEntry"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeThemeEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"version"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"createVideoSlugTheme"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeTheme"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"sequence"}},{"kind":"Field","name":{"kind":"Name","value":"group"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"extractImagesImage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Image"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"link"}},{"kind":"Field","name":{"kind":"Name","value":"facet"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SongTitleSong"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Song"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PerformancesSong"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Song"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"performances"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"alias"}},{"kind":"Field","name":{"kind":"Name","value":"as"}},{"kind":"Field","name":{"kind":"Name","value":"relevance"}},{"kind":"Field","name":{"kind":"Name","value":"artist"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"member"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"VideoSummaryCardEntry"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeThemeEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugEntry"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"animetheme"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugTheme"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"sequence"}},{"kind":"Field","name":{"kind":"Name","value":"group"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}},{"kind":"Field","name":{"kind":"Name","value":"anime"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"extractImagesImage"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"song"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SongTitleSong"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"PerformancesSong"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlaylistTrackAddToastEntry"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeThemeEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"animetheme"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"song"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SongTitleSong"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlaylistTrackRemoveToastEntry"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeThemeEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"animetheme"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"song"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SongTitleSong"}}]}}]}}]}}]} as unknown as DocumentNode<PlaylistTrackAddDialogEntryFragment, unknown>;
export const VideoMenuEntryFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"VideoMenuEntry"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeThemeEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugEntry"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlaylistTrackAddDialogEntry"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"animetheme"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugTheme"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"sequence"}},{"kind":"Field","name":{"kind":"Name","value":"group"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}},{"kind":"Field","name":{"kind":"Name","value":"anime"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"extractImagesImage"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"song"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SongTitleWithArtistsSong"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"createVideoSlugEntry"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeThemeEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"version"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"createVideoSlugTheme"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeTheme"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"sequence"}},{"kind":"Field","name":{"kind":"Name","value":"group"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"extractImagesImage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Image"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"link"}},{"kind":"Field","name":{"kind":"Name","value":"facet"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SongTitleSong"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Song"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PerformancesSong"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Song"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"performances"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"alias"}},{"kind":"Field","name":{"kind":"Name","value":"as"}},{"kind":"Field","name":{"kind":"Name","value":"relevance"}},{"kind":"Field","name":{"kind":"Name","value":"artist"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"member"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"VideoSummaryCardEntry"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeThemeEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugEntry"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"animetheme"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugTheme"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"sequence"}},{"kind":"Field","name":{"kind":"Name","value":"group"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}},{"kind":"Field","name":{"kind":"Name","value":"anime"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"extractImagesImage"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"song"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SongTitleSong"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"PerformancesSong"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlaylistTrackAddToastEntry"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeThemeEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"animetheme"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"song"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SongTitleSong"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlaylistTrackRemoveToastEntry"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeThemeEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"animetheme"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"song"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SongTitleSong"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlaylistTrackAddDialogEntry"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeThemeEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"VideoSummaryCardEntry"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlaylistTrackAddToastEntry"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlaylistTrackRemoveToastEntry"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SongTitleWithArtistsSong"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Song"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SongTitleSong"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"PerformancesSong"}}]}}]} as unknown as DocumentNode<VideoMenuEntryFragment, unknown>;
export const VideoSummaryCardVideoFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"VideoSummaryCardVideo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Video"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"basename"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugVideo"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"createVideoSlugVideo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Video"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tags"}}]}}]} as unknown as DocumentNode<VideoSummaryCardVideoFragment, unknown>;
export const PlaylistTrackAddDialogVideoFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlaylistTrackAddDialogVideo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Video"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"VideoSummaryCardVideo"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"createVideoSlugVideo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Video"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tags"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"VideoSummaryCardVideo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Video"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"basename"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugVideo"}}]}}]} as unknown as DocumentNode<PlaylistTrackAddDialogVideoFragment, unknown>;
export const VideoMenuVideoFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"VideoMenuVideo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Video"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugVideo"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlaylistTrackAddDialogVideo"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"basename"}},{"kind":"Field","name":{"kind":"Name","value":"audio"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"basename"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"createVideoSlugVideo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Video"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tags"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"VideoSummaryCardVideo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Video"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"basename"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugVideo"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlaylistTrackAddDialogVideo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Video"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"VideoSummaryCardVideo"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]} as unknown as DocumentNode<VideoMenuVideoFragment, unknown>;
export const YearNavigationYearFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"YearNavigationYear"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeYear"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"seasons"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"season"}},{"kind":"Field","name":{"kind":"Name","value":"seasonLocalized"}}]}}]}}]} as unknown as DocumentNode<YearNavigationYearFragment, unknown>;
export const YearNavigationYearsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"YearNavigationYears"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeYear"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"year"}}]}}]} as unknown as DocumentNode<YearNavigationYearsFragment, unknown>;
export const PerformancesArtistFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PerformancesArtist"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artist"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]} as unknown as DocumentNode<PerformancesArtistFragment, unknown>;
export const SongTitleWithArtistsArtistFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SongTitleWithArtistsArtist"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artist"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PerformancesArtist"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PerformancesArtist"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artist"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]} as unknown as DocumentNode<SongTitleWithArtistsArtistFragment, unknown>;
export const DocumentPagePageFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"DocumentPagePage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Page"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]} as unknown as DocumentNode<DocumentPagePageFragment, unknown>;
export const AnimeSummaryCardAnimeFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AnimeSummaryCardAnime"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Anime"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"season"}},{"kind":"Field","name":{"kind":"Name","value":"seasonLocalized"}},{"kind":"Field","name":{"kind":"Name","value":"formatLocalized"}},{"kind":"Field","name":{"kind":"Name","value":"animethemes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"group"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"extractImagesImage"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"extractImagesImage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Image"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"link"}},{"kind":"Field","name":{"kind":"Name","value":"facet"}}]}}]} as unknown as DocumentNode<AnimeSummaryCardAnimeFragment, unknown>;
export const ThemeSummaryCardThemeFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ThemeSummaryCardTheme"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeTheme"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugTheme"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ThemeMenuTheme"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"sequence"}},{"kind":"Field","name":{"kind":"Name","value":"group"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}},{"kind":"Field","name":{"kind":"Name","value":"anime"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"extractImagesImage"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"song"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SongTitleSong"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"PerformancesSong"}},{"kind":"Field","name":{"kind":"Name","value":"performances"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"alias"}},{"kind":"Field","name":{"kind":"Name","value":"as"}},{"kind":"Field","name":{"kind":"Name","value":"artist"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"animethemeentries"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugEntry"}},{"kind":"Field","name":{"kind":"Name","value":"videos"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugVideo"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"createVideoSlugTheme"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeTheme"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"sequence"}},{"kind":"Field","name":{"kind":"Name","value":"group"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"extractImagesImage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Image"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"link"}},{"kind":"Field","name":{"kind":"Name","value":"facet"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SongTitleSong"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Song"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PerformancesSong"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Song"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"performances"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"alias"}},{"kind":"Field","name":{"kind":"Name","value":"as"}},{"kind":"Field","name":{"kind":"Name","value":"relevance"}},{"kind":"Field","name":{"kind":"Name","value":"artist"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"member"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SongTitleWithArtistsSong"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Song"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SongTitleSong"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"PerformancesSong"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"createVideoSlugEntry"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeThemeEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"version"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"createVideoSlugVideo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Video"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tags"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ThemeMenuTheme"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeTheme"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugTheme"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"sequence"}},{"kind":"Field","name":{"kind":"Name","value":"group"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}},{"kind":"Field","name":{"kind":"Name","value":"anime"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"extractImagesImage"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"song"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SongTitleWithArtistsSong"}}]}},{"kind":"Field","name":{"kind":"Name","value":"animethemeentries"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugEntry"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"videos"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugVideo"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"basename"}},{"kind":"Field","name":{"kind":"Name","value":"audio"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"basename"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<ThemeSummaryCardThemeFragment, unknown>;
export const ArtistSummaryCardArtistFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ArtistSummaryCardArtist"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artist"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"extractImagesImage"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"extractImagesImage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Image"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"link"}},{"kind":"Field","name":{"kind":"Name","value":"facet"}}]}}]} as unknown as DocumentNode<ArtistSummaryCardArtistFragment, unknown>;
export const VideoPlayerBarEntryFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"VideoPlayerBarEntry"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeThemeEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"animetheme"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"sequence"}},{"kind":"Field","name":{"kind":"Name","value":"song"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SongTitleSong"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"PerformancesSong"}},{"kind":"Field","name":{"kind":"Name","value":"performances"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"group"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"anime"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SongTitleSong"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Song"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PerformancesSong"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Song"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"performances"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"alias"}},{"kind":"Field","name":{"kind":"Name","value":"as"}},{"kind":"Field","name":{"kind":"Name","value":"relevance"}},{"kind":"Field","name":{"kind":"Name","value":"artist"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"member"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<VideoPlayerBarEntryFragment, unknown>;
export const VideoPlayerEntryFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"VideoPlayerEntry"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeThemeEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"VideoPlayerBarEntry"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugEntry"}},{"kind":"Field","name":{"kind":"Name","value":"animetheme"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugTheme"}},{"kind":"Field","name":{"kind":"Name","value":"anime"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"extractImagesImage"}}]}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SongTitleSong"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Song"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PerformancesSong"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Song"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"performances"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"alias"}},{"kind":"Field","name":{"kind":"Name","value":"as"}},{"kind":"Field","name":{"kind":"Name","value":"relevance"}},{"kind":"Field","name":{"kind":"Name","value":"artist"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"member"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"VideoPlayerBarEntry"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeThemeEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"animetheme"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"sequence"}},{"kind":"Field","name":{"kind":"Name","value":"song"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SongTitleSong"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"PerformancesSong"}},{"kind":"Field","name":{"kind":"Name","value":"performances"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"group"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"anime"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"createVideoSlugEntry"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeThemeEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"version"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"createVideoSlugTheme"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeTheme"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"sequence"}},{"kind":"Field","name":{"kind":"Name","value":"group"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"extractImagesImage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Image"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"link"}},{"kind":"Field","name":{"kind":"Name","value":"facet"}}]}}]} as unknown as DocumentNode<VideoPlayerEntryFragment, unknown>;
export const VideoPlayerBarVideoFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"VideoPlayerBarVideo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Video"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}}]}}]} as unknown as DocumentNode<VideoPlayerBarVideoFragment, unknown>;
export const VideoPlayerVideoFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"VideoPlayerVideo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Video"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"VideoPlayerBarVideo"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugVideo"}},{"kind":"Field","name":{"kind":"Name","value":"basename"}},{"kind":"Field","name":{"kind":"Name","value":"audio"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"basename"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"VideoPlayerBarVideo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Video"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"createVideoSlugVideo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Video"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tags"}}]}}]} as unknown as DocumentNode<VideoPlayerVideoFragment, unknown>;
export const VideoScriptVideoFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"VideoScriptVideo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Video"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"videoscript"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"link"}}]}}]}}]} as unknown as DocumentNode<VideoScriptVideoFragment, unknown>;
export const PlaylistSummaryCardPlaylistWithOwnerFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlaylistSummaryCardPlaylistWithOwner"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Playlist"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<PlaylistSummaryCardPlaylistWithOwnerFragment, unknown>;
export const StudioSummaryCardStudioFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"StudioSummaryCardStudio"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Studio"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"extractImagesImage"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"extractImagesImage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Image"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"link"}},{"kind":"Field","name":{"kind":"Name","value":"facet"}}]}}]} as unknown as DocumentNode<StudioSummaryCardStudioFragment, unknown>;
export const VideoPageAnimeFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"VideoPageAnime"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Anime"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AnimeSummaryCardAnime"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"season"}},{"kind":"Field","name":{"kind":"Name","value":"animethemes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ThemeSummaryCardTheme"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugTheme"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"sequence"}},{"kind":"Field","name":{"kind":"Name","value":"song"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"performances"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"artist"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ArtistSummaryCardArtist"}}]}},{"kind":"Field","name":{"kind":"Name","value":"as"}},{"kind":"Field","name":{"kind":"Name","value":"relevance"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"group"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}},{"kind":"Field","name":{"kind":"Name","value":"animethemeentries"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"VideoPlayerEntry"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugEntry"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"episodes"}},{"kind":"Field","name":{"kind":"Name","value":"nsfw"}},{"kind":"Field","name":{"kind":"Name","value":"spoiler"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"videos"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"VideoPlayerVideo"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"VideoScriptVideo"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugVideo"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"basename"}},{"kind":"Field","name":{"kind":"Name","value":"filename"}},{"kind":"Field","name":{"kind":"Name","value":"lyrics"}},{"kind":"Field","name":{"kind":"Name","value":"nc"}},{"kind":"Field","name":{"kind":"Name","value":"overlap"}},{"kind":"Field","name":{"kind":"Name","value":"resolution"}},{"kind":"Field","name":{"kind":"Name","value":"source"}},{"kind":"Field","name":{"kind":"Name","value":"subbed"}},{"kind":"Field","name":{"kind":"Name","value":"uncen"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"animethemeentries"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"animetheme"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ThemeSummaryCardTheme"}},{"kind":"Field","name":{"kind":"Name","value":"anime"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"tracks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"playlist"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlaylistSummaryCardPlaylist"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlaylistSummaryCardPlaylistWithOwner"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"extractImagesImage"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"series"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"studios"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"StudioSummaryCardStudio"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"extractImagesImage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Image"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"link"}},{"kind":"Field","name":{"kind":"Name","value":"facet"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"createVideoSlugTheme"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeTheme"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"sequence"}},{"kind":"Field","name":{"kind":"Name","value":"group"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SongTitleSong"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Song"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PerformancesSong"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Song"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"performances"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"alias"}},{"kind":"Field","name":{"kind":"Name","value":"as"}},{"kind":"Field","name":{"kind":"Name","value":"relevance"}},{"kind":"Field","name":{"kind":"Name","value":"artist"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"member"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SongTitleWithArtistsSong"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Song"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SongTitleSong"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"PerformancesSong"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"createVideoSlugEntry"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeThemeEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"version"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"createVideoSlugVideo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Video"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tags"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ThemeMenuTheme"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeTheme"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugTheme"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"sequence"}},{"kind":"Field","name":{"kind":"Name","value":"group"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}},{"kind":"Field","name":{"kind":"Name","value":"anime"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"extractImagesImage"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"song"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SongTitleWithArtistsSong"}}]}},{"kind":"Field","name":{"kind":"Name","value":"animethemeentries"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugEntry"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"videos"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugVideo"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"basename"}},{"kind":"Field","name":{"kind":"Name","value":"audio"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"basename"}}]}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"VideoPlayerBarEntry"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeThemeEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"animetheme"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"sequence"}},{"kind":"Field","name":{"kind":"Name","value":"song"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SongTitleSong"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"PerformancesSong"}},{"kind":"Field","name":{"kind":"Name","value":"performances"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"group"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"anime"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"VideoPlayerBarVideo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Video"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AnimeSummaryCardAnime"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Anime"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"season"}},{"kind":"Field","name":{"kind":"Name","value":"seasonLocalized"}},{"kind":"Field","name":{"kind":"Name","value":"formatLocalized"}},{"kind":"Field","name":{"kind":"Name","value":"animethemes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"group"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"extractImagesImage"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ThemeSummaryCardTheme"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeTheme"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugTheme"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ThemeMenuTheme"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"sequence"}},{"kind":"Field","name":{"kind":"Name","value":"group"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}},{"kind":"Field","name":{"kind":"Name","value":"anime"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"extractImagesImage"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"song"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SongTitleSong"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"PerformancesSong"}},{"kind":"Field","name":{"kind":"Name","value":"performances"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"alias"}},{"kind":"Field","name":{"kind":"Name","value":"as"}},{"kind":"Field","name":{"kind":"Name","value":"artist"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"animethemeentries"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugEntry"}},{"kind":"Field","name":{"kind":"Name","value":"videos"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugVideo"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ArtistSummaryCardArtist"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artist"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"extractImagesImage"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"VideoPlayerEntry"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeThemeEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"VideoPlayerBarEntry"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugEntry"}},{"kind":"Field","name":{"kind":"Name","value":"animetheme"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugTheme"}},{"kind":"Field","name":{"kind":"Name","value":"anime"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"extractImagesImage"}}]}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"VideoPlayerVideo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Video"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"VideoPlayerBarVideo"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugVideo"}},{"kind":"Field","name":{"kind":"Name","value":"basename"}},{"kind":"Field","name":{"kind":"Name","value":"audio"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"basename"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"VideoScriptVideo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Video"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"videoscript"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"link"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlaylistSummaryCardPlaylist"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Playlist"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"visibilityLocalized"}},{"kind":"Field","name":{"kind":"Name","value":"tracksCount"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlaylistSummaryCardPlaylistWithOwner"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Playlist"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"StudioSummaryCardStudio"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Studio"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"extractImagesImage"}}]}}]}}]}}]} as unknown as DocumentNode<VideoPageAnimeFragment, unknown>;
export const VideoButtonThemeFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"VideoButtonTheme"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeTheme"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugTheme"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"createVideoSlugTheme"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeTheme"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"sequence"}},{"kind":"Field","name":{"kind":"Name","value":"group"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]}}]} as unknown as DocumentNode<VideoButtonThemeFragment, unknown>;
export const VideoButtonAnimeFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"VideoButtonAnime"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Anime"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]} as unknown as DocumentNode<VideoButtonAnimeFragment, unknown>;
export const EpisodeTagEntryFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EpisodeTagEntry"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeThemeEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"episodes"}}]}}]} as unknown as DocumentNode<EpisodeTagEntryFragment, unknown>;
export const ContentWarningTagsEntryFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ContentWarningTagsEntry"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeThemeEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"spoiler"}},{"kind":"Field","name":{"kind":"Name","value":"nsfw"}}]}}]} as unknown as DocumentNode<ContentWarningTagsEntryFragment, unknown>;
export const ThemeEntryTagsEntryFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ThemeEntryTagsEntry"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeThemeEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"EpisodeTagEntry"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContentWarningTagsEntry"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EpisodeTagEntry"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeThemeEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"episodes"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ContentWarningTagsEntry"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeThemeEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"spoiler"}},{"kind":"Field","name":{"kind":"Name","value":"nsfw"}}]}}]} as unknown as DocumentNode<ThemeEntryTagsEntryFragment, unknown>;
export const VideoButtonEntryFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"VideoButtonEntry"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeThemeEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugEntry"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"createVideoSlugEntry"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeThemeEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"version"}}]}}]} as unknown as DocumentNode<VideoButtonEntryFragment, unknown>;
export const VideoTagsVideoFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"VideoTagsVideo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Video"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"resolution"}},{"kind":"Field","name":{"kind":"Name","value":"nc"}},{"kind":"Field","name":{"kind":"Name","value":"subbed"}},{"kind":"Field","name":{"kind":"Name","value":"lyrics"}},{"kind":"Field","name":{"kind":"Name","value":"uncen"}},{"kind":"Field","name":{"kind":"Name","value":"source"}},{"kind":"Field","name":{"kind":"Name","value":"overlap"}}]}}]} as unknown as DocumentNode<VideoTagsVideoFragment, unknown>;
export const VideoButtonVideoFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"VideoButtonVideo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Video"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugVideo"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"VideoTagsVideo"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"createVideoSlugVideo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Video"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tags"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"VideoTagsVideo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Video"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"resolution"}},{"kind":"Field","name":{"kind":"Name","value":"nc"}},{"kind":"Field","name":{"kind":"Name","value":"subbed"}},{"kind":"Field","name":{"kind":"Name","value":"lyrics"}},{"kind":"Field","name":{"kind":"Name","value":"uncen"}},{"kind":"Field","name":{"kind":"Name","value":"source"}},{"kind":"Field","name":{"kind":"Name","value":"overlap"}}]}}]} as unknown as DocumentNode<VideoButtonVideoFragment, unknown>;
export const ThemeDetailCardThemeFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ThemeDetailCardTheme"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeTheme"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ThemeMenuTheme"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"VideoButtonTheme"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"sequence"}},{"kind":"Field","name":{"kind":"Name","value":"group"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}},{"kind":"Field","name":{"kind":"Name","value":"anime"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"VideoButtonAnime"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"song"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SongTitleSong"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"PerformancesSong"}}]}},{"kind":"Field","name":{"kind":"Name","value":"animethemeentries"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ThemeEntryTagsEntry"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"VideoButtonEntry"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"videos"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"VideoButtonVideo"}},{"kind":"Field","name":{"kind":"Name","value":"filename"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"createVideoSlugTheme"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeTheme"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"sequence"}},{"kind":"Field","name":{"kind":"Name","value":"group"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"extractImagesImage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Image"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"link"}},{"kind":"Field","name":{"kind":"Name","value":"facet"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SongTitleSong"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Song"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PerformancesSong"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Song"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"performances"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"alias"}},{"kind":"Field","name":{"kind":"Name","value":"as"}},{"kind":"Field","name":{"kind":"Name","value":"relevance"}},{"kind":"Field","name":{"kind":"Name","value":"artist"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"member"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SongTitleWithArtistsSong"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Song"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SongTitleSong"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"PerformancesSong"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"createVideoSlugEntry"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeThemeEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"version"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"createVideoSlugVideo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Video"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tags"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EpisodeTagEntry"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeThemeEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"episodes"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ContentWarningTagsEntry"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeThemeEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"spoiler"}},{"kind":"Field","name":{"kind":"Name","value":"nsfw"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"VideoTagsVideo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Video"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"resolution"}},{"kind":"Field","name":{"kind":"Name","value":"nc"}},{"kind":"Field","name":{"kind":"Name","value":"subbed"}},{"kind":"Field","name":{"kind":"Name","value":"lyrics"}},{"kind":"Field","name":{"kind":"Name","value":"uncen"}},{"kind":"Field","name":{"kind":"Name","value":"source"}},{"kind":"Field","name":{"kind":"Name","value":"overlap"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ThemeMenuTheme"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeTheme"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugTheme"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"sequence"}},{"kind":"Field","name":{"kind":"Name","value":"group"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}},{"kind":"Field","name":{"kind":"Name","value":"anime"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"extractImagesImage"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"song"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SongTitleWithArtistsSong"}}]}},{"kind":"Field","name":{"kind":"Name","value":"animethemeentries"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugEntry"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"videos"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugVideo"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"basename"}},{"kind":"Field","name":{"kind":"Name","value":"audio"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"basename"}}]}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"VideoButtonTheme"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeTheme"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugTheme"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"VideoButtonAnime"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Anime"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ThemeEntryTagsEntry"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeThemeEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"EpisodeTagEntry"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContentWarningTagsEntry"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"VideoButtonEntry"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeThemeEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugEntry"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"VideoButtonVideo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Video"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugVideo"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"VideoTagsVideo"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]} as unknown as DocumentNode<ThemeDetailCardThemeFragment, unknown>;
export const AnimeThemeFilterThemeFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AnimeThemeFilterTheme"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeTheme"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ThemeDetailCardTheme"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"sequence"}},{"kind":"Field","name":{"kind":"Name","value":"group"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"createVideoSlugTheme"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeTheme"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"sequence"}},{"kind":"Field","name":{"kind":"Name","value":"group"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"extractImagesImage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Image"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"link"}},{"kind":"Field","name":{"kind":"Name","value":"facet"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SongTitleSong"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Song"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PerformancesSong"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Song"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"performances"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"alias"}},{"kind":"Field","name":{"kind":"Name","value":"as"}},{"kind":"Field","name":{"kind":"Name","value":"relevance"}},{"kind":"Field","name":{"kind":"Name","value":"artist"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"member"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SongTitleWithArtistsSong"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Song"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SongTitleSong"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"PerformancesSong"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"createVideoSlugEntry"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeThemeEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"version"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"createVideoSlugVideo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Video"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tags"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ThemeMenuTheme"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeTheme"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugTheme"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"sequence"}},{"kind":"Field","name":{"kind":"Name","value":"group"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}},{"kind":"Field","name":{"kind":"Name","value":"anime"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"extractImagesImage"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"song"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SongTitleWithArtistsSong"}}]}},{"kind":"Field","name":{"kind":"Name","value":"animethemeentries"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugEntry"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"videos"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugVideo"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"basename"}},{"kind":"Field","name":{"kind":"Name","value":"audio"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"basename"}}]}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"VideoButtonTheme"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeTheme"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugTheme"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"VideoButtonAnime"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Anime"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EpisodeTagEntry"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeThemeEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"episodes"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ContentWarningTagsEntry"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeThemeEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"spoiler"}},{"kind":"Field","name":{"kind":"Name","value":"nsfw"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ThemeEntryTagsEntry"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeThemeEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"EpisodeTagEntry"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContentWarningTagsEntry"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"VideoButtonEntry"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeThemeEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugEntry"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"VideoTagsVideo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Video"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"resolution"}},{"kind":"Field","name":{"kind":"Name","value":"nc"}},{"kind":"Field","name":{"kind":"Name","value":"subbed"}},{"kind":"Field","name":{"kind":"Name","value":"lyrics"}},{"kind":"Field","name":{"kind":"Name","value":"uncen"}},{"kind":"Field","name":{"kind":"Name","value":"source"}},{"kind":"Field","name":{"kind":"Name","value":"overlap"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"VideoButtonVideo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Video"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugVideo"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"VideoTagsVideo"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ThemeDetailCardTheme"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeTheme"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ThemeMenuTheme"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"VideoButtonTheme"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"sequence"}},{"kind":"Field","name":{"kind":"Name","value":"group"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}},{"kind":"Field","name":{"kind":"Name","value":"anime"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"VideoButtonAnime"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"song"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SongTitleSong"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"PerformancesSong"}}]}},{"kind":"Field","name":{"kind":"Name","value":"animethemeentries"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ThemeEntryTagsEntry"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"VideoButtonEntry"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"videos"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"VideoButtonVideo"}},{"kind":"Field","name":{"kind":"Name","value":"filename"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}}]}}]}}]}}]}}]} as unknown as DocumentNode<AnimeThemeFilterThemeFragment, unknown>;
export const AnimeDetailPageAnimeFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AnimeDetailPageAnime"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Anime"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"season"}},{"kind":"Field","name":{"kind":"Name","value":"seasonLocalized"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"synopsis"}},{"kind":"Field","name":{"kind":"Name","value":"formatLocalized"}},{"kind":"Field","name":{"kind":"Name","value":"synonyms"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"text"}}]}},{"kind":"Field","name":{"kind":"Name","value":"series"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"studios"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"resources"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"site"}},{"kind":"Field","name":{"kind":"Name","value":"siteLocalized"}},{"kind":"Field","name":{"kind":"Name","value":"link"}}]}},{"kind":"Field","name":{"kind":"Name","value":"as"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"extractImagesImage"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"animethemes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AnimeThemeFilterTheme"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"createVideoSlugTheme"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeTheme"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"sequence"}},{"kind":"Field","name":{"kind":"Name","value":"group"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"extractImagesImage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Image"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"link"}},{"kind":"Field","name":{"kind":"Name","value":"facet"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SongTitleSong"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Song"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PerformancesSong"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Song"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"performances"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"alias"}},{"kind":"Field","name":{"kind":"Name","value":"as"}},{"kind":"Field","name":{"kind":"Name","value":"relevance"}},{"kind":"Field","name":{"kind":"Name","value":"artist"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"member"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SongTitleWithArtistsSong"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Song"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SongTitleSong"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"PerformancesSong"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"createVideoSlugEntry"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeThemeEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"version"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"createVideoSlugVideo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Video"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tags"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ThemeMenuTheme"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeTheme"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugTheme"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"sequence"}},{"kind":"Field","name":{"kind":"Name","value":"group"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}},{"kind":"Field","name":{"kind":"Name","value":"anime"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"extractImagesImage"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"song"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SongTitleWithArtistsSong"}}]}},{"kind":"Field","name":{"kind":"Name","value":"animethemeentries"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugEntry"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"videos"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugVideo"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"basename"}},{"kind":"Field","name":{"kind":"Name","value":"audio"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"basename"}}]}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"VideoButtonTheme"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeTheme"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugTheme"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"VideoButtonAnime"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Anime"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EpisodeTagEntry"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeThemeEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"episodes"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ContentWarningTagsEntry"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeThemeEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"spoiler"}},{"kind":"Field","name":{"kind":"Name","value":"nsfw"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ThemeEntryTagsEntry"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeThemeEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"EpisodeTagEntry"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContentWarningTagsEntry"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"VideoButtonEntry"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeThemeEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugEntry"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"VideoTagsVideo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Video"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"resolution"}},{"kind":"Field","name":{"kind":"Name","value":"nc"}},{"kind":"Field","name":{"kind":"Name","value":"subbed"}},{"kind":"Field","name":{"kind":"Name","value":"lyrics"}},{"kind":"Field","name":{"kind":"Name","value":"uncen"}},{"kind":"Field","name":{"kind":"Name","value":"source"}},{"kind":"Field","name":{"kind":"Name","value":"overlap"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"VideoButtonVideo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Video"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugVideo"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"VideoTagsVideo"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ThemeDetailCardTheme"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeTheme"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ThemeMenuTheme"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"VideoButtonTheme"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"sequence"}},{"kind":"Field","name":{"kind":"Name","value":"group"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}},{"kind":"Field","name":{"kind":"Name","value":"anime"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"VideoButtonAnime"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"song"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SongTitleSong"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"PerformancesSong"}}]}},{"kind":"Field","name":{"kind":"Name","value":"animethemeentries"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ThemeEntryTagsEntry"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"VideoButtonEntry"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"videos"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"VideoButtonVideo"}},{"kind":"Field","name":{"kind":"Name","value":"filename"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AnimeThemeFilterTheme"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeTheme"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ThemeDetailCardTheme"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"sequence"}},{"kind":"Field","name":{"kind":"Name","value":"group"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]}}]} as unknown as DocumentNode<AnimeDetailPageAnimeFragment, unknown>;
export const ThemeSummaryCardArtistFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ThemeSummaryCardArtist"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artist"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PerformancesArtist"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PerformancesArtist"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artist"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]} as unknown as DocumentNode<ThemeSummaryCardArtistFragment, unknown>;
export const ThemeTableThemeFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ThemeTableTheme"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeTheme"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugTheme"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"sequence"}},{"kind":"Field","name":{"kind":"Name","value":"anime"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}},{"kind":"Field","name":{"kind":"Name","value":"animethemeentries"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugEntry"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"EpisodeTagEntry"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContentWarningTagsEntry"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"videos"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugVideo"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"VideoTagsVideo"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"song"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SongTitleSong"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"createVideoSlugTheme"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeTheme"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"sequence"}},{"kind":"Field","name":{"kind":"Name","value":"group"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"createVideoSlugEntry"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeThemeEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"version"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EpisodeTagEntry"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeThemeEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"episodes"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ContentWarningTagsEntry"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeThemeEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"spoiler"}},{"kind":"Field","name":{"kind":"Name","value":"nsfw"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"createVideoSlugVideo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Video"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tags"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"VideoTagsVideo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Video"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"resolution"}},{"kind":"Field","name":{"kind":"Name","value":"nc"}},{"kind":"Field","name":{"kind":"Name","value":"subbed"}},{"kind":"Field","name":{"kind":"Name","value":"lyrics"}},{"kind":"Field","name":{"kind":"Name","value":"uncen"}},{"kind":"Field","name":{"kind":"Name","value":"source"}},{"kind":"Field","name":{"kind":"Name","value":"overlap"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SongTitleSong"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Song"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]} as unknown as DocumentNode<ThemeTableThemeFragment, unknown>;
export const ThemeSummaryCardThemeExpandableFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ThemeSummaryCardThemeExpandable"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeTheme"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ThemeTableTheme"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"createVideoSlugTheme"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeTheme"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"sequence"}},{"kind":"Field","name":{"kind":"Name","value":"group"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"createVideoSlugEntry"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeThemeEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"version"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EpisodeTagEntry"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeThemeEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"episodes"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ContentWarningTagsEntry"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeThemeEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"spoiler"}},{"kind":"Field","name":{"kind":"Name","value":"nsfw"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"createVideoSlugVideo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Video"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tags"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"VideoTagsVideo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Video"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"resolution"}},{"kind":"Field","name":{"kind":"Name","value":"nc"}},{"kind":"Field","name":{"kind":"Name","value":"subbed"}},{"kind":"Field","name":{"kind":"Name","value":"lyrics"}},{"kind":"Field","name":{"kind":"Name","value":"uncen"}},{"kind":"Field","name":{"kind":"Name","value":"source"}},{"kind":"Field","name":{"kind":"Name","value":"overlap"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SongTitleSong"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Song"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ThemeTableTheme"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeTheme"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugTheme"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"sequence"}},{"kind":"Field","name":{"kind":"Name","value":"anime"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}},{"kind":"Field","name":{"kind":"Name","value":"animethemeentries"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugEntry"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"EpisodeTagEntry"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContentWarningTagsEntry"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"videos"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugVideo"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"VideoTagsVideo"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"song"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SongTitleSong"}}]}}]}}]} as unknown as DocumentNode<ThemeSummaryCardThemeExpandableFragment, unknown>;
export const ExtractMultipleImagesImageArtistEdgeFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"extractMultipleImagesImageArtistEdge"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ArtistImageEdge"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"depth"}},{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"link"}},{"kind":"Field","name":{"kind":"Name","value":"facet"}}]}}]}}]} as unknown as DocumentNode<ExtractMultipleImagesImageArtistEdgeFragment, unknown>;
export const ArtistDetailPageArtistFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ArtistDetailPageArtist"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artist"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ThemeSummaryCardArtist"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"synonyms"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"text"}}]}},{"kind":"Field","name":{"kind":"Name","value":"performances"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"alias"}},{"kind":"Field","name":{"kind":"Name","value":"as"}},{"kind":"Field","name":{"kind":"Name","value":"song"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"performances"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"alias"}},{"kind":"Field","name":{"kind":"Name","value":"as"}},{"kind":"Field","name":{"kind":"Name","value":"memberAlias"}},{"kind":"Field","name":{"kind":"Name","value":"memberAs"}},{"kind":"Field","name":{"kind":"Name","value":"artist"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"animethemes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ThemeSummaryCardTheme"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ThemeSummaryCardThemeExpandable"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"sequence"}},{"kind":"Field","name":{"kind":"Name","value":"animethemeentries"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"videos"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"group"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}},{"kind":"Field","name":{"kind":"Name","value":"anime"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"season"}}]}},{"kind":"Field","name":{"kind":"Name","value":"song"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"memberPerformances"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"alias"}},{"kind":"Field","name":{"kind":"Name","value":"as"}},{"kind":"Field","name":{"kind":"Name","value":"memberAlias"}},{"kind":"Field","name":{"kind":"Name","value":"memberAs"}},{"kind":"Field","name":{"kind":"Name","value":"artist"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"song"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"performances"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"alias"}},{"kind":"Field","name":{"kind":"Name","value":"as"}},{"kind":"Field","name":{"kind":"Name","value":"memberAlias"}},{"kind":"Field","name":{"kind":"Name","value":"memberAs"}},{"kind":"Field","name":{"kind":"Name","value":"artist"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"animethemes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ThemeSummaryCardTheme"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ThemeSummaryCardThemeExpandable"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"sequence"}},{"kind":"Field","name":{"kind":"Name","value":"animethemeentries"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"videos"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"group"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}},{"kind":"Field","name":{"kind":"Name","value":"anime"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"season"}}]}},{"kind":"Field","name":{"kind":"Name","value":"song"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"members"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"alias"}},{"kind":"Field","name":{"kind":"Name","value":"as"}},{"kind":"Field","name":{"kind":"Name","value":"notes"}},{"kind":"Field","name":{"kind":"Name","value":"relevance"}},{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ArtistSummaryCardArtist"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"groups"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"alias"}},{"kind":"Field","name":{"kind":"Name","value":"as"}},{"kind":"Field","name":{"kind":"Name","value":"notes"}},{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"extractMultipleImagesImageArtistEdge"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"resources"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"link"}},{"kind":"Field","name":{"kind":"Name","value":"site"}},{"kind":"Field","name":{"kind":"Name","value":"siteLocalized"}}]}},{"kind":"Field","name":{"kind":"Name","value":"as"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PerformancesArtist"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artist"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"createVideoSlugTheme"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeTheme"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"sequence"}},{"kind":"Field","name":{"kind":"Name","value":"group"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"extractImagesImage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Image"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"link"}},{"kind":"Field","name":{"kind":"Name","value":"facet"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SongTitleSong"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Song"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PerformancesSong"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Song"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"performances"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"alias"}},{"kind":"Field","name":{"kind":"Name","value":"as"}},{"kind":"Field","name":{"kind":"Name","value":"relevance"}},{"kind":"Field","name":{"kind":"Name","value":"artist"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"member"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SongTitleWithArtistsSong"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Song"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SongTitleSong"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"PerformancesSong"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"createVideoSlugEntry"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeThemeEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"version"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"createVideoSlugVideo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Video"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tags"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ThemeMenuTheme"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeTheme"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugTheme"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"sequence"}},{"kind":"Field","name":{"kind":"Name","value":"group"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}},{"kind":"Field","name":{"kind":"Name","value":"anime"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"extractImagesImage"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"song"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SongTitleWithArtistsSong"}}]}},{"kind":"Field","name":{"kind":"Name","value":"animethemeentries"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugEntry"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"videos"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugVideo"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"basename"}},{"kind":"Field","name":{"kind":"Name","value":"audio"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"basename"}}]}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EpisodeTagEntry"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeThemeEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"episodes"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ContentWarningTagsEntry"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeThemeEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"spoiler"}},{"kind":"Field","name":{"kind":"Name","value":"nsfw"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"VideoTagsVideo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Video"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"resolution"}},{"kind":"Field","name":{"kind":"Name","value":"nc"}},{"kind":"Field","name":{"kind":"Name","value":"subbed"}},{"kind":"Field","name":{"kind":"Name","value":"lyrics"}},{"kind":"Field","name":{"kind":"Name","value":"uncen"}},{"kind":"Field","name":{"kind":"Name","value":"source"}},{"kind":"Field","name":{"kind":"Name","value":"overlap"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ThemeTableTheme"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeTheme"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugTheme"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"sequence"}},{"kind":"Field","name":{"kind":"Name","value":"anime"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}},{"kind":"Field","name":{"kind":"Name","value":"animethemeentries"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugEntry"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"EpisodeTagEntry"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContentWarningTagsEntry"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"videos"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugVideo"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"VideoTagsVideo"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"song"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SongTitleSong"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ThemeSummaryCardArtist"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artist"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PerformancesArtist"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ThemeSummaryCardTheme"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeTheme"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugTheme"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ThemeMenuTheme"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"sequence"}},{"kind":"Field","name":{"kind":"Name","value":"group"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}},{"kind":"Field","name":{"kind":"Name","value":"anime"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"extractImagesImage"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"song"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SongTitleSong"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"PerformancesSong"}},{"kind":"Field","name":{"kind":"Name","value":"performances"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"alias"}},{"kind":"Field","name":{"kind":"Name","value":"as"}},{"kind":"Field","name":{"kind":"Name","value":"artist"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"animethemeentries"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugEntry"}},{"kind":"Field","name":{"kind":"Name","value":"videos"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugVideo"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ThemeSummaryCardThemeExpandable"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeTheme"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ThemeTableTheme"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ArtistSummaryCardArtist"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artist"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"extractImagesImage"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"extractMultipleImagesImageArtistEdge"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ArtistImageEdge"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"depth"}},{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"link"}},{"kind":"Field","name":{"kind":"Name","value":"facet"}}]}}]}}]} as unknown as DocumentNode<ArtistDetailPageArtistFragment, unknown>;
export const AnimeAwardsPageThemeFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AnimeAwardsPageTheme"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeTheme"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugTheme"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"sequence"}},{"kind":"Field","name":{"kind":"Name","value":"anime"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"extractImagesImage"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"song"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SongTitleWithArtistsSong"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SongTitleSong"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Song"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PerformancesSong"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Song"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"performances"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"alias"}},{"kind":"Field","name":{"kind":"Name","value":"as"}},{"kind":"Field","name":{"kind":"Name","value":"relevance"}},{"kind":"Field","name":{"kind":"Name","value":"artist"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"member"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"createVideoSlugTheme"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeTheme"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"sequence"}},{"kind":"Field","name":{"kind":"Name","value":"group"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"extractImagesImage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Image"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"link"}},{"kind":"Field","name":{"kind":"Name","value":"facet"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SongTitleWithArtistsSong"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Song"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SongTitleSong"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"PerformancesSong"}}]}}]} as unknown as DocumentNode<AnimeAwardsPageThemeFragment, unknown>;
export const AnimeAwardPageEntryFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AnimeAwardPageEntry"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeThemeEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugEntry"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"videos"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugVideo"}},{"kind":"Field","name":{"kind":"Name","value":"basename"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"createVideoSlugEntry"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeThemeEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"version"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"createVideoSlugVideo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Video"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tags"}}]}}]} as unknown as DocumentNode<AnimeAwardPageEntryFragment, unknown>;
export const FeaturedThemeEntryFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FeaturedThemeEntry"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeThemeEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"VideoSummaryCardEntry"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugEntry"}},{"kind":"Field","name":{"kind":"Name","value":"animetheme"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugTheme"}},{"kind":"Field","name":{"kind":"Name","value":"anime"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"extractImagesImage"}}]}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"createVideoSlugEntry"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeThemeEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"version"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"createVideoSlugTheme"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeTheme"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"sequence"}},{"kind":"Field","name":{"kind":"Name","value":"group"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"extractImagesImage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Image"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"link"}},{"kind":"Field","name":{"kind":"Name","value":"facet"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SongTitleSong"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Song"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PerformancesSong"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Song"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"performances"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"alias"}},{"kind":"Field","name":{"kind":"Name","value":"as"}},{"kind":"Field","name":{"kind":"Name","value":"relevance"}},{"kind":"Field","name":{"kind":"Name","value":"artist"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"member"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"VideoSummaryCardEntry"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeThemeEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugEntry"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"animetheme"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugTheme"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"sequence"}},{"kind":"Field","name":{"kind":"Name","value":"group"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}},{"kind":"Field","name":{"kind":"Name","value":"anime"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"extractImagesImage"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"song"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SongTitleSong"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"PerformancesSong"}}]}}]}}]}}]} as unknown as DocumentNode<FeaturedThemeEntryFragment, unknown>;
export const FeaturedThemeVideoFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FeaturedThemeVideo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Video"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"VideoSummaryCardVideo"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugVideo"}},{"kind":"Field","name":{"kind":"Name","value":"basename"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"createVideoSlugVideo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Video"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tags"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"VideoSummaryCardVideo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Video"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"basename"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugVideo"}}]}}]} as unknown as DocumentNode<FeaturedThemeVideoFragment, unknown>;
export const HomePageFeaturedThemeFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"HomePageFeaturedTheme"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FeaturedTheme"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"animethemeentry"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FeaturedThemeEntry"}}]}},{"kind":"Field","name":{"kind":"Name","value":"video"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FeaturedThemeVideo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"createVideoSlugEntry"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeThemeEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"version"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"createVideoSlugTheme"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeTheme"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"sequence"}},{"kind":"Field","name":{"kind":"Name","value":"group"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"extractImagesImage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Image"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"link"}},{"kind":"Field","name":{"kind":"Name","value":"facet"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SongTitleSong"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Song"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PerformancesSong"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Song"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"performances"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"alias"}},{"kind":"Field","name":{"kind":"Name","value":"as"}},{"kind":"Field","name":{"kind":"Name","value":"relevance"}},{"kind":"Field","name":{"kind":"Name","value":"artist"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"member"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"VideoSummaryCardEntry"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeThemeEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugEntry"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"animetheme"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugTheme"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"sequence"}},{"kind":"Field","name":{"kind":"Name","value":"group"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}},{"kind":"Field","name":{"kind":"Name","value":"anime"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"extractImagesImage"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"song"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SongTitleSong"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"PerformancesSong"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"createVideoSlugVideo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Video"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tags"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"VideoSummaryCardVideo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Video"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"basename"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugVideo"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FeaturedThemeEntry"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeThemeEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"VideoSummaryCardEntry"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugEntry"}},{"kind":"Field","name":{"kind":"Name","value":"animetheme"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugTheme"}},{"kind":"Field","name":{"kind":"Name","value":"anime"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"extractImagesImage"}}]}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FeaturedThemeVideo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Video"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"VideoSummaryCardVideo"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugVideo"}},{"kind":"Field","name":{"kind":"Name","value":"basename"}}]}}]} as unknown as DocumentNode<HomePageFeaturedThemeFragment, unknown>;
export const HomePageAnnouncementFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"HomePageAnnouncement"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Announcement"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"content"}}]}}]} as unknown as DocumentNode<HomePageAnnouncementFragment, unknown>;
export const PlaylistEditDialogPlaylistFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlaylistEditDialogPlaylist"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Playlist"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"visibility"}}]}}]} as unknown as DocumentNode<PlaylistEditDialogPlaylistFragment, unknown>;
export const PlaylistTrackRemoveDialogPlaylistFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlaylistTrackRemoveDialogPlaylist"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Playlist"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlaylistTrackRemoveToastPlaylist"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlaylistTrackRemoveToastPlaylist"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Playlist"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]} as unknown as DocumentNode<PlaylistTrackRemoveDialogPlaylistFragment, unknown>;
export const PlaylistDetailPagePlaylistFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlaylistDetailPagePlaylist"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Playlist"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlaylistEditDialogPlaylist"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlaylistTrackRemoveDialogPlaylist"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"visibility"}},{"kind":"Field","name":{"kind":"Name","value":"tracksCount"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlaylistTrackRemoveToastPlaylist"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Playlist"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlaylistEditDialogPlaylist"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Playlist"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"visibility"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlaylistTrackRemoveDialogPlaylist"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Playlist"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlaylistTrackRemoveToastPlaylist"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]} as unknown as DocumentNode<PlaylistDetailPagePlaylistFragment, unknown>;
export const PlaylistTrackRemoveDialogVideoFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlaylistTrackRemoveDialogVideo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Video"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"VideoSummaryCardVideo"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"createVideoSlugVideo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Video"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tags"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"VideoSummaryCardVideo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Video"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"basename"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugVideo"}}]}}]} as unknown as DocumentNode<PlaylistTrackRemoveDialogVideoFragment, unknown>;
export const PlaylistTrackRemoveDialogEntryFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlaylistTrackRemoveDialogEntry"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeThemeEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"VideoSummaryCardEntry"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlaylistTrackRemoveToastEntry"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"createVideoSlugEntry"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeThemeEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"version"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"createVideoSlugTheme"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeTheme"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"sequence"}},{"kind":"Field","name":{"kind":"Name","value":"group"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"extractImagesImage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Image"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"link"}},{"kind":"Field","name":{"kind":"Name","value":"facet"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SongTitleSong"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Song"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PerformancesSong"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Song"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"performances"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"alias"}},{"kind":"Field","name":{"kind":"Name","value":"as"}},{"kind":"Field","name":{"kind":"Name","value":"relevance"}},{"kind":"Field","name":{"kind":"Name","value":"artist"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"member"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"VideoSummaryCardEntry"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeThemeEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugEntry"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"animetheme"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugTheme"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"sequence"}},{"kind":"Field","name":{"kind":"Name","value":"group"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}},{"kind":"Field","name":{"kind":"Name","value":"anime"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"extractImagesImage"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"song"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SongTitleSong"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"PerformancesSong"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlaylistTrackRemoveToastEntry"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeThemeEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"animetheme"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"song"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SongTitleSong"}}]}}]}}]}}]} as unknown as DocumentNode<PlaylistTrackRemoveDialogEntryFragment, unknown>;
export const PlaylistDetailPageTrackFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlaylistDetailPageTrack"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PlaylistTrack"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"video"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"VideoSummaryCardVideo"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"FeaturedThemeVideo"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlaylistTrackAddDialogVideo"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlaylistTrackRemoveDialogVideo"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"animethemeentry"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"VideoSummaryCardEntry"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"FeaturedThemeEntry"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlaylistTrackAddDialogEntry"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlaylistTrackRemoveDialogEntry"}},{"kind":"Field","name":{"kind":"Name","value":"animetheme"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"anime"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"season"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"extractImagesImage"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"song"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"createVideoSlugVideo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Video"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tags"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"VideoSummaryCardVideo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Video"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"basename"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugVideo"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"createVideoSlugEntry"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeThemeEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"version"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"createVideoSlugTheme"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeTheme"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"sequence"}},{"kind":"Field","name":{"kind":"Name","value":"group"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"extractImagesImage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Image"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"link"}},{"kind":"Field","name":{"kind":"Name","value":"facet"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SongTitleSong"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Song"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PerformancesSong"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Song"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"performances"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"alias"}},{"kind":"Field","name":{"kind":"Name","value":"as"}},{"kind":"Field","name":{"kind":"Name","value":"relevance"}},{"kind":"Field","name":{"kind":"Name","value":"artist"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"member"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"VideoSummaryCardEntry"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeThemeEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugEntry"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"animetheme"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugTheme"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"sequence"}},{"kind":"Field","name":{"kind":"Name","value":"group"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}},{"kind":"Field","name":{"kind":"Name","value":"anime"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"extractImagesImage"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"song"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SongTitleSong"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"PerformancesSong"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlaylistTrackAddToastEntry"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeThemeEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"animetheme"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"song"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SongTitleSong"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlaylistTrackRemoveToastEntry"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeThemeEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"animetheme"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"song"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SongTitleSong"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FeaturedThemeVideo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Video"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"VideoSummaryCardVideo"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugVideo"}},{"kind":"Field","name":{"kind":"Name","value":"basename"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlaylistTrackAddDialogVideo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Video"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"VideoSummaryCardVideo"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlaylistTrackRemoveDialogVideo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Video"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"VideoSummaryCardVideo"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FeaturedThemeEntry"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeThemeEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"VideoSummaryCardEntry"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugEntry"}},{"kind":"Field","name":{"kind":"Name","value":"animetheme"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugTheme"}},{"kind":"Field","name":{"kind":"Name","value":"anime"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"extractImagesImage"}}]}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlaylistTrackAddDialogEntry"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeThemeEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"VideoSummaryCardEntry"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlaylistTrackAddToastEntry"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlaylistTrackRemoveToastEntry"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlaylistTrackRemoveDialogEntry"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeThemeEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"VideoSummaryCardEntry"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlaylistTrackRemoveToastEntry"}}]}}]} as unknown as DocumentNode<PlaylistDetailPageTrackFragment, unknown>;
export const PlaylistDetailPageMeFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlaylistDetailPageMe"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Me"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]} as unknown as DocumentNode<PlaylistDetailPageMeFragment, unknown>;
export const ProfileImageUserFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProfileImageUser"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Me"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]} as unknown as DocumentNode<ProfileImageUserFragment, unknown>;
export const PlaylistRemoveToastPlaylistFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlaylistRemoveToastPlaylist"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Playlist"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]} as unknown as DocumentNode<PlaylistRemoveToastPlaylistFragment, unknown>;
export const PlaylistRemoveDialogPlaylistFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlaylistRemoveDialogPlaylist"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Playlist"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlaylistSummaryCardPlaylist"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlaylistRemoveToastPlaylist"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlaylistSummaryCardPlaylist"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Playlist"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"visibilityLocalized"}},{"kind":"Field","name":{"kind":"Name","value":"tracksCount"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlaylistRemoveToastPlaylist"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Playlist"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]} as unknown as DocumentNode<PlaylistRemoveDialogPlaylistFragment, unknown>;
export const ProfilePageMeFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProfilePageMe"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Me"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ProfileImageUser"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"emailVerifiedAt"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"roles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"priority"}},{"kind":"Field","name":{"kind":"Name","value":"default"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"playlists"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"sort"},"value":{"kind":"ListValue","values":[{"kind":"EnumValue","value":"CREATED_AT_DESC"}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlaylistSummaryCardPlaylist"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlaylistRemoveDialogPlaylist"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlaylistSummaryCardPlaylist"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Playlist"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"visibilityLocalized"}},{"kind":"Field","name":{"kind":"Name","value":"tracksCount"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlaylistRemoveToastPlaylist"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Playlist"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProfileImageUser"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Me"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlaylistRemoveDialogPlaylist"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Playlist"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlaylistSummaryCardPlaylist"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlaylistRemoveToastPlaylist"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]} as unknown as DocumentNode<ProfilePageMeFragment, unknown>;
export const AnimeSummaryCardAnimeExpandableFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AnimeSummaryCardAnimeExpandable"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Anime"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"animethemes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ThemeTableTheme"}},{"kind":"Field","name":{"kind":"Name","value":"group"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"createVideoSlugTheme"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeTheme"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"sequence"}},{"kind":"Field","name":{"kind":"Name","value":"group"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"createVideoSlugEntry"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeThemeEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"version"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EpisodeTagEntry"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeThemeEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"episodes"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ContentWarningTagsEntry"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeThemeEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"spoiler"}},{"kind":"Field","name":{"kind":"Name","value":"nsfw"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"createVideoSlugVideo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Video"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tags"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"VideoTagsVideo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Video"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"resolution"}},{"kind":"Field","name":{"kind":"Name","value":"nc"}},{"kind":"Field","name":{"kind":"Name","value":"subbed"}},{"kind":"Field","name":{"kind":"Name","value":"lyrics"}},{"kind":"Field","name":{"kind":"Name","value":"uncen"}},{"kind":"Field","name":{"kind":"Name","value":"source"}},{"kind":"Field","name":{"kind":"Name","value":"overlap"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SongTitleSong"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Song"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ThemeTableTheme"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeTheme"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugTheme"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"sequence"}},{"kind":"Field","name":{"kind":"Name","value":"anime"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}},{"kind":"Field","name":{"kind":"Name","value":"animethemeentries"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugEntry"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"EpisodeTagEntry"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContentWarningTagsEntry"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"videos"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugVideo"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"VideoTagsVideo"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"song"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SongTitleSong"}}]}}]}}]} as unknown as DocumentNode<AnimeSummaryCardAnimeExpandableFragment, unknown>;
export const SeriesDetailPageSeriesFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SeriesDetailPageSeries"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Series"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"anime"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AnimeSummaryCardAnime"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AnimeSummaryCardAnimeExpandable"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"season"}},{"kind":"Field","name":{"kind":"Name","value":"animethemes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"sequence"}},{"kind":"Field","name":{"kind":"Name","value":"animethemeentries"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"videos"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tags"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"extractImagesImage"}}]}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"extractImagesImage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Image"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"link"}},{"kind":"Field","name":{"kind":"Name","value":"facet"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"createVideoSlugTheme"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeTheme"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"sequence"}},{"kind":"Field","name":{"kind":"Name","value":"group"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"createVideoSlugEntry"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeThemeEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"version"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EpisodeTagEntry"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeThemeEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"episodes"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ContentWarningTagsEntry"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeThemeEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"spoiler"}},{"kind":"Field","name":{"kind":"Name","value":"nsfw"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"createVideoSlugVideo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Video"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tags"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"VideoTagsVideo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Video"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"resolution"}},{"kind":"Field","name":{"kind":"Name","value":"nc"}},{"kind":"Field","name":{"kind":"Name","value":"subbed"}},{"kind":"Field","name":{"kind":"Name","value":"lyrics"}},{"kind":"Field","name":{"kind":"Name","value":"uncen"}},{"kind":"Field","name":{"kind":"Name","value":"source"}},{"kind":"Field","name":{"kind":"Name","value":"overlap"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SongTitleSong"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Song"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ThemeTableTheme"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeTheme"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugTheme"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"sequence"}},{"kind":"Field","name":{"kind":"Name","value":"anime"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}},{"kind":"Field","name":{"kind":"Name","value":"animethemeentries"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugEntry"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"EpisodeTagEntry"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContentWarningTagsEntry"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"videos"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugVideo"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"VideoTagsVideo"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"song"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SongTitleSong"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AnimeSummaryCardAnime"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Anime"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"season"}},{"kind":"Field","name":{"kind":"Name","value":"seasonLocalized"}},{"kind":"Field","name":{"kind":"Name","value":"formatLocalized"}},{"kind":"Field","name":{"kind":"Name","value":"animethemes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"group"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"extractImagesImage"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AnimeSummaryCardAnimeExpandable"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Anime"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"animethemes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ThemeTableTheme"}},{"kind":"Field","name":{"kind":"Name","value":"group"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]}}]}}]} as unknown as DocumentNode<SeriesDetailPageSeriesFragment, unknown>;
export const StudioCoverImageStudioFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"StudioCoverImageStudio"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Studio"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"extractImagesImage"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"anime"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"extractImagesImage"}}]}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"extractImagesImage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Image"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"link"}},{"kind":"Field","name":{"kind":"Name","value":"facet"}}]}}]} as unknown as DocumentNode<StudioCoverImageStudioFragment, unknown>;
export const StudioDetailPageStudioFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"StudioDetailPageStudio"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Studio"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"StudioCoverImageStudio"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"anime"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AnimeSummaryCardAnime"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AnimeSummaryCardAnimeExpandable"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"season"}},{"kind":"Field","name":{"kind":"Name","value":"animethemes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"sequence"}},{"kind":"Field","name":{"kind":"Name","value":"animethemeentries"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"videos"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tags"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"facet"}},{"kind":"Field","name":{"kind":"Name","value":"link"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"resources"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"as"}},{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"link"}},{"kind":"Field","name":{"kind":"Name","value":"site"}},{"kind":"Field","name":{"kind":"Name","value":"siteLocalized"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"extractImagesImage"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"extractImagesImage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Image"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"link"}},{"kind":"Field","name":{"kind":"Name","value":"facet"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"createVideoSlugTheme"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeTheme"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"sequence"}},{"kind":"Field","name":{"kind":"Name","value":"group"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"createVideoSlugEntry"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeThemeEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"version"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EpisodeTagEntry"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeThemeEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"episodes"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ContentWarningTagsEntry"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeThemeEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"spoiler"}},{"kind":"Field","name":{"kind":"Name","value":"nsfw"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"createVideoSlugVideo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Video"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tags"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"VideoTagsVideo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Video"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"resolution"}},{"kind":"Field","name":{"kind":"Name","value":"nc"}},{"kind":"Field","name":{"kind":"Name","value":"subbed"}},{"kind":"Field","name":{"kind":"Name","value":"lyrics"}},{"kind":"Field","name":{"kind":"Name","value":"uncen"}},{"kind":"Field","name":{"kind":"Name","value":"source"}},{"kind":"Field","name":{"kind":"Name","value":"overlap"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SongTitleSong"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Song"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ThemeTableTheme"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeTheme"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugTheme"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"sequence"}},{"kind":"Field","name":{"kind":"Name","value":"anime"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}},{"kind":"Field","name":{"kind":"Name","value":"animethemeentries"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugEntry"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"EpisodeTagEntry"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContentWarningTagsEntry"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"videos"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugVideo"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"VideoTagsVideo"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"song"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SongTitleSong"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"StudioCoverImageStudio"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Studio"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"extractImagesImage"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"anime"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"extractImagesImage"}}]}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AnimeSummaryCardAnime"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Anime"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"season"}},{"kind":"Field","name":{"kind":"Name","value":"seasonLocalized"}},{"kind":"Field","name":{"kind":"Name","value":"formatLocalized"}},{"kind":"Field","name":{"kind":"Name","value":"animethemes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"group"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"extractImagesImage"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AnimeSummaryCardAnimeExpandable"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Anime"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"animethemes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ThemeTableTheme"}},{"kind":"Field","name":{"kind":"Name","value":"group"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]}}]}}]} as unknown as DocumentNode<StudioDetailPageStudioFragment, unknown>;
export const SeasonNavigationYearFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SeasonNavigationYear"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeYear"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"seasons"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"season"}},{"kind":"Field","name":{"kind":"Name","value":"seasonLocalized"}}]}}]}}]} as unknown as DocumentNode<SeasonNavigationYearFragment, unknown>;
export const SeasonDetailPageYearFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SeasonDetailPageYear"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeYear"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SeasonNavigationYear"}},{"kind":"Field","name":{"kind":"Name","value":"year"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SeasonNavigationYear"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeYear"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"seasons"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"season"}},{"kind":"Field","name":{"kind":"Name","value":"seasonLocalized"}}]}}]}}]} as unknown as DocumentNode<SeasonDetailPageYearFragment, unknown>;
export const SeasonNavigationSeasonFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SeasonNavigationSeason"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeYearSeason"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"season"}}]}}]} as unknown as DocumentNode<SeasonNavigationSeasonFragment, unknown>;
export const SeasonDetailPageSeasonFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SeasonDetailPageSeason"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeYearSeason"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SeasonNavigationSeason"}},{"kind":"Field","name":{"kind":"Name","value":"season"}},{"kind":"Field","name":{"kind":"Name","value":"seasonLocalized"}},{"kind":"Field","name":{"kind":"Name","value":"anime"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AnimeSummaryCardAnime"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AnimeSummaryCardAnimeExpandable"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"extractImagesImage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Image"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"link"}},{"kind":"Field","name":{"kind":"Name","value":"facet"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"createVideoSlugTheme"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeTheme"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"sequence"}},{"kind":"Field","name":{"kind":"Name","value":"group"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"createVideoSlugEntry"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeThemeEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"version"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EpisodeTagEntry"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeThemeEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"episodes"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ContentWarningTagsEntry"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeThemeEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"spoiler"}},{"kind":"Field","name":{"kind":"Name","value":"nsfw"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"createVideoSlugVideo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Video"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tags"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"VideoTagsVideo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Video"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"resolution"}},{"kind":"Field","name":{"kind":"Name","value":"nc"}},{"kind":"Field","name":{"kind":"Name","value":"subbed"}},{"kind":"Field","name":{"kind":"Name","value":"lyrics"}},{"kind":"Field","name":{"kind":"Name","value":"uncen"}},{"kind":"Field","name":{"kind":"Name","value":"source"}},{"kind":"Field","name":{"kind":"Name","value":"overlap"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SongTitleSong"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Song"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ThemeTableTheme"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeTheme"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugTheme"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"sequence"}},{"kind":"Field","name":{"kind":"Name","value":"anime"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}},{"kind":"Field","name":{"kind":"Name","value":"animethemeentries"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugEntry"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"EpisodeTagEntry"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContentWarningTagsEntry"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"videos"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugVideo"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"VideoTagsVideo"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"song"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SongTitleSong"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SeasonNavigationSeason"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeYearSeason"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"season"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AnimeSummaryCardAnime"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Anime"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"season"}},{"kind":"Field","name":{"kind":"Name","value":"seasonLocalized"}},{"kind":"Field","name":{"kind":"Name","value":"formatLocalized"}},{"kind":"Field","name":{"kind":"Name","value":"animethemes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"group"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"extractImagesImage"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AnimeSummaryCardAnimeExpandable"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Anime"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"animethemes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ThemeTableTheme"}},{"kind":"Field","name":{"kind":"Name","value":"group"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]}}]}}]} as unknown as DocumentNode<SeasonDetailPageSeasonFragment, unknown>;
export const SeasonPreviewAnimeFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SeasonPreviewAnime"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Anime"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AnimeSummaryCardAnime"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AnimeSummaryCardAnimeExpandable"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"extractImagesImage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Image"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"link"}},{"kind":"Field","name":{"kind":"Name","value":"facet"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"createVideoSlugTheme"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeTheme"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"sequence"}},{"kind":"Field","name":{"kind":"Name","value":"group"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"createVideoSlugEntry"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeThemeEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"version"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EpisodeTagEntry"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeThemeEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"episodes"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ContentWarningTagsEntry"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeThemeEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"spoiler"}},{"kind":"Field","name":{"kind":"Name","value":"nsfw"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"createVideoSlugVideo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Video"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tags"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"VideoTagsVideo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Video"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"resolution"}},{"kind":"Field","name":{"kind":"Name","value":"nc"}},{"kind":"Field","name":{"kind":"Name","value":"subbed"}},{"kind":"Field","name":{"kind":"Name","value":"lyrics"}},{"kind":"Field","name":{"kind":"Name","value":"uncen"}},{"kind":"Field","name":{"kind":"Name","value":"source"}},{"kind":"Field","name":{"kind":"Name","value":"overlap"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SongTitleSong"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Song"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ThemeTableTheme"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeTheme"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugTheme"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"sequence"}},{"kind":"Field","name":{"kind":"Name","value":"anime"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}},{"kind":"Field","name":{"kind":"Name","value":"animethemeentries"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugEntry"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"EpisodeTagEntry"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContentWarningTagsEntry"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"videos"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugVideo"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"VideoTagsVideo"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"song"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SongTitleSong"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AnimeSummaryCardAnime"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Anime"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"season"}},{"kind":"Field","name":{"kind":"Name","value":"seasonLocalized"}},{"kind":"Field","name":{"kind":"Name","value":"formatLocalized"}},{"kind":"Field","name":{"kind":"Name","value":"animethemes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"group"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"extractImagesImage"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AnimeSummaryCardAnimeExpandable"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Anime"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"animethemes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ThemeTableTheme"}},{"kind":"Field","name":{"kind":"Name","value":"group"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]}}]}}]} as unknown as DocumentNode<SeasonPreviewAnimeFragment, unknown>;
export const PlaylistAddDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"PlaylistAdd"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"visibility"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PlaylistVisibility"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"CreatePlaylist"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"visibility"},"value":{"kind":"Variable","name":{"kind":"Name","value":"visibility"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<PlaylistAddMutation, PlaylistAddMutationVariables>;
export const PlaylistEditDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"PlaylistEdit"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"visibility"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"PlaylistVisibility"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"UpdatePlaylist"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"visibility"},"value":{"kind":"Variable","name":{"kind":"Name","value":"visibility"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<PlaylistEditMutation, PlaylistEditMutationVariables>;
export const PlaylistRemoveDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"PlaylistRemove"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"DeletePlaylist"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<PlaylistRemoveMutation, PlaylistRemoveMutationVariables>;
export const PlaylistTrackAddFormPlaylistDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PlaylistTrackAddFormPlaylist"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"entryId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Mixed"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"videoId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Mixed"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"playlists"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlaylistTrackAddCardPlaylist"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"tracks"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ListValue","values":[{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"field"},"value":{"kind":"EnumValue","value":"ENTRY_ID"}},{"kind":"ObjectField","name":{"kind":"Name","value":"value"},"value":{"kind":"Variable","name":{"kind":"Name","value":"entryId"}}}]},{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"field"},"value":{"kind":"EnumValue","value":"VIDEO_ID"}},{"kind":"ObjectField","name":{"kind":"Name","value":"value"},"value":{"kind":"Variable","name":{"kind":"Name","value":"videoId"}}}]}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlaylistTrackAddCardTrack"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlaylistSummaryCardPlaylist"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Playlist"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"visibilityLocalized"}},{"kind":"Field","name":{"kind":"Name","value":"tracksCount"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlaylistTrackAddToastPlaylist"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Playlist"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlaylistTrackRemoveToastPlaylist"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Playlist"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlaylistTrackAddCardPlaylist"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Playlist"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlaylistSummaryCardPlaylist"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlaylistTrackAddToastPlaylist"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlaylistTrackRemoveToastPlaylist"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlaylistTrackAddCardTrack"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PlaylistTrack"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]} as unknown as DocumentNode<PlaylistTrackAddFormPlaylistQuery, PlaylistTrackAddFormPlaylistQueryVariables>;
export const PlaylistTrackAddDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"PlaylistTrackAdd"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"playlistId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"entryId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"videoId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"CreatePlaylistTrack"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"playlist"},"value":{"kind":"Variable","name":{"kind":"Name","value":"playlistId"}}},{"kind":"Argument","name":{"kind":"Name","value":"entryId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"entryId"}}},{"kind":"Argument","name":{"kind":"Name","value":"videoId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"videoId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<PlaylistTrackAddMutation, PlaylistTrackAddMutationVariables>;
export const PlaylistTrackRemoveDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"PlaylistTrackRemove"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"playlistId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"DeletePlaylistTrack"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"playlist"},"value":{"kind":"Variable","name":{"kind":"Name","value":"playlistId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<PlaylistTrackRemoveMutation, PlaylistTrackRemoveMutationVariables>;
export const HomePageMostPopularDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"HomePageMostPopular"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"animethemeentryPagination"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"sort"},"value":{"kind":"ListValue","values":[{"kind":"EnumValue","value":"TRACKS_COUNT_DESC"}]}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"10"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"VideoSummaryCardEntry"}},{"kind":"Field","name":{"kind":"Name","value":"videos"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"1"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"VideoSummaryCardVideo"}}]}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"createVideoSlugEntry"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeThemeEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"version"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"createVideoSlugTheme"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeTheme"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"sequence"}},{"kind":"Field","name":{"kind":"Name","value":"group"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"extractImagesImage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Image"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"link"}},{"kind":"Field","name":{"kind":"Name","value":"facet"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SongTitleSong"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Song"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PerformancesSong"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Song"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"performances"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"alias"}},{"kind":"Field","name":{"kind":"Name","value":"as"}},{"kind":"Field","name":{"kind":"Name","value":"relevance"}},{"kind":"Field","name":{"kind":"Name","value":"artist"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"member"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"createVideoSlugVideo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Video"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tags"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"VideoSummaryCardEntry"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeThemeEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugEntry"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"animetheme"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugTheme"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"sequence"}},{"kind":"Field","name":{"kind":"Name","value":"group"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}},{"kind":"Field","name":{"kind":"Name","value":"anime"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"extractImagesImage"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"song"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SongTitleSong"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"PerformancesSong"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"VideoSummaryCardVideo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Video"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"basename"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugVideo"}}]}}]} as unknown as DocumentNode<HomePageMostPopularQuery, HomePageMostPopularQueryVariables>;
export const HomePageRecentlyAddedPlaylistsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"HomePageRecentlyAddedPlaylists"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"playlistPagination"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"sort"},"value":{"kind":"ListValue","values":[{"kind":"EnumValue","value":"CREATED_AT_DESC"}]}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"10"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlaylistSummaryCardPlaylist"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlaylistSummaryCardPlaylistWithOwner"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlaylistSummaryCardPlaylist"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Playlist"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"visibilityLocalized"}},{"kind":"Field","name":{"kind":"Name","value":"tracksCount"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlaylistSummaryCardPlaylistWithOwner"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Playlist"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<HomePageRecentlyAddedPlaylistsQuery, HomePageRecentlyAddedPlaylistsQueryVariables>;
export const HomePageRecentlyAddedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"HomePageRecentlyAdded"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"videoPagination"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"sort"},"value":{"kind":"ListValue","values":[{"kind":"EnumValue","value":"ID_DESC"}]}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"10"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"VideoSummaryCardVideo"}},{"kind":"Field","name":{"kind":"Name","value":"animethemeentries"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"1"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"VideoSummaryCardEntry"}}]}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"createVideoSlugVideo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Video"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tags"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"createVideoSlugEntry"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeThemeEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"version"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"createVideoSlugTheme"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeTheme"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"sequence"}},{"kind":"Field","name":{"kind":"Name","value":"group"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"extractImagesImage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Image"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"link"}},{"kind":"Field","name":{"kind":"Name","value":"facet"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SongTitleSong"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Song"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PerformancesSong"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Song"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"performances"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"alias"}},{"kind":"Field","name":{"kind":"Name","value":"as"}},{"kind":"Field","name":{"kind":"Name","value":"relevance"}},{"kind":"Field","name":{"kind":"Name","value":"artist"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"member"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"VideoSummaryCardVideo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Video"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"basename"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugVideo"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"VideoSummaryCardEntry"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeThemeEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugEntry"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"animetheme"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugTheme"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"sequence"}},{"kind":"Field","name":{"kind":"Name","value":"group"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}},{"kind":"Field","name":{"kind":"Name","value":"anime"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"extractImagesImage"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"song"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SongTitleSong"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"PerformancesSong"}}]}}]}}]}}]} as unknown as DocumentNode<HomePageRecentlyAddedQuery, HomePageRecentlyAddedQueryVariables>;
export const SearchAnimeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SearchAnime"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"query"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name_like"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"season"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeSeason"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"year"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"format"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeFormat"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sort"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeSort"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"animePagination"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"search"},"value":{"kind":"Variable","name":{"kind":"Name","value":"query"}}},{"kind":"Argument","name":{"kind":"Name","value":"name_like"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name_like"}}},{"kind":"Argument","name":{"kind":"Name","value":"season"},"value":{"kind":"Variable","name":{"kind":"Name","value":"season"}}},{"kind":"Argument","name":{"kind":"Name","value":"year"},"value":{"kind":"Variable","name":{"kind":"Name","value":"year"}}},{"kind":"Argument","name":{"kind":"Name","value":"format"},"value":{"kind":"Variable","name":{"kind":"Name","value":"format"}}},{"kind":"Argument","name":{"kind":"Name","value":"sort"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sort"}}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"15"}},{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AnimeSummaryCardAnime"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AnimeSummaryCardAnimeExpandable"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}},{"kind":"Field","name":{"kind":"Name","value":"paginationInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hasMorePages"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"extractImagesImage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Image"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"link"}},{"kind":"Field","name":{"kind":"Name","value":"facet"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"createVideoSlugTheme"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeTheme"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"sequence"}},{"kind":"Field","name":{"kind":"Name","value":"group"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"createVideoSlugEntry"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeThemeEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"version"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EpisodeTagEntry"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeThemeEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"episodes"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ContentWarningTagsEntry"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeThemeEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"spoiler"}},{"kind":"Field","name":{"kind":"Name","value":"nsfw"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"createVideoSlugVideo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Video"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tags"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"VideoTagsVideo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Video"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"resolution"}},{"kind":"Field","name":{"kind":"Name","value":"nc"}},{"kind":"Field","name":{"kind":"Name","value":"subbed"}},{"kind":"Field","name":{"kind":"Name","value":"lyrics"}},{"kind":"Field","name":{"kind":"Name","value":"uncen"}},{"kind":"Field","name":{"kind":"Name","value":"source"}},{"kind":"Field","name":{"kind":"Name","value":"overlap"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SongTitleSong"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Song"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ThemeTableTheme"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeTheme"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugTheme"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"sequence"}},{"kind":"Field","name":{"kind":"Name","value":"anime"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}},{"kind":"Field","name":{"kind":"Name","value":"animethemeentries"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugEntry"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"EpisodeTagEntry"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContentWarningTagsEntry"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"videos"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugVideo"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"VideoTagsVideo"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"song"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SongTitleSong"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AnimeSummaryCardAnime"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Anime"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"season"}},{"kind":"Field","name":{"kind":"Name","value":"seasonLocalized"}},{"kind":"Field","name":{"kind":"Name","value":"formatLocalized"}},{"kind":"Field","name":{"kind":"Name","value":"animethemes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"group"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"extractImagesImage"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AnimeSummaryCardAnimeExpandable"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Anime"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"animethemes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ThemeTableTheme"}},{"kind":"Field","name":{"kind":"Name","value":"group"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]}}]}}]} as unknown as DocumentNode<SearchAnimeQuery, SearchAnimeQueryVariables>;
export const SearchArtistDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SearchArtist"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"query"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name_like"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sort"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ArtistSort"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"artistPagination"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"search"},"value":{"kind":"Variable","name":{"kind":"Name","value":"query"}}},{"kind":"Argument","name":{"kind":"Name","value":"name_like"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name_like"}}},{"kind":"Argument","name":{"kind":"Name","value":"sort"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sort"}}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"15"}},{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ArtistSummaryCardArtist"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}},{"kind":"Field","name":{"kind":"Name","value":"paginationInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hasMorePages"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"extractImagesImage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Image"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"link"}},{"kind":"Field","name":{"kind":"Name","value":"facet"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ArtistSummaryCardArtist"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artist"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"extractImagesImage"}}]}}]}}]}}]} as unknown as DocumentNode<SearchArtistQuery, SearchArtistQueryVariables>;
export const SearchGlobalDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SearchGlobal"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"query"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"search"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"search"},"value":{"kind":"Variable","name":{"kind":"Name","value":"query"}}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"4"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"anime"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AnimeSummaryCardAnime"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AnimeSummaryCardAnimeExpandable"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}},{"kind":"Field","name":{"kind":"Name","value":"animethemes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ThemeSummaryCardTheme"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ThemeSummaryCardThemeExpandable"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"anime"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"artists"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ArtistSummaryCardArtist"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}},{"kind":"Field","name":{"kind":"Name","value":"series"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"studios"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"playlists"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlaylistSummaryCardPlaylist"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlaylistSummaryCardPlaylistWithOwner"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"extractImagesImage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Image"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"link"}},{"kind":"Field","name":{"kind":"Name","value":"facet"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"createVideoSlugTheme"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeTheme"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"sequence"}},{"kind":"Field","name":{"kind":"Name","value":"group"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"createVideoSlugEntry"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeThemeEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"version"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EpisodeTagEntry"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeThemeEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"episodes"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ContentWarningTagsEntry"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeThemeEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"spoiler"}},{"kind":"Field","name":{"kind":"Name","value":"nsfw"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"createVideoSlugVideo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Video"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tags"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"VideoTagsVideo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Video"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"resolution"}},{"kind":"Field","name":{"kind":"Name","value":"nc"}},{"kind":"Field","name":{"kind":"Name","value":"subbed"}},{"kind":"Field","name":{"kind":"Name","value":"lyrics"}},{"kind":"Field","name":{"kind":"Name","value":"uncen"}},{"kind":"Field","name":{"kind":"Name","value":"source"}},{"kind":"Field","name":{"kind":"Name","value":"overlap"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SongTitleSong"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Song"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ThemeTableTheme"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeTheme"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugTheme"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"sequence"}},{"kind":"Field","name":{"kind":"Name","value":"anime"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}},{"kind":"Field","name":{"kind":"Name","value":"animethemeentries"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugEntry"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"EpisodeTagEntry"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContentWarningTagsEntry"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"videos"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugVideo"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"VideoTagsVideo"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"song"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SongTitleSong"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PerformancesSong"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Song"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"performances"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"alias"}},{"kind":"Field","name":{"kind":"Name","value":"as"}},{"kind":"Field","name":{"kind":"Name","value":"relevance"}},{"kind":"Field","name":{"kind":"Name","value":"artist"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"member"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SongTitleWithArtistsSong"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Song"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SongTitleSong"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"PerformancesSong"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ThemeMenuTheme"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeTheme"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugTheme"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"sequence"}},{"kind":"Field","name":{"kind":"Name","value":"group"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}},{"kind":"Field","name":{"kind":"Name","value":"anime"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"extractImagesImage"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"song"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SongTitleWithArtistsSong"}}]}},{"kind":"Field","name":{"kind":"Name","value":"animethemeentries"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugEntry"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"videos"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugVideo"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"basename"}},{"kind":"Field","name":{"kind":"Name","value":"audio"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"basename"}}]}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AnimeSummaryCardAnime"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Anime"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"season"}},{"kind":"Field","name":{"kind":"Name","value":"seasonLocalized"}},{"kind":"Field","name":{"kind":"Name","value":"formatLocalized"}},{"kind":"Field","name":{"kind":"Name","value":"animethemes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"group"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"extractImagesImage"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AnimeSummaryCardAnimeExpandable"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Anime"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"animethemes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ThemeTableTheme"}},{"kind":"Field","name":{"kind":"Name","value":"group"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ThemeSummaryCardTheme"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeTheme"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugTheme"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ThemeMenuTheme"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"sequence"}},{"kind":"Field","name":{"kind":"Name","value":"group"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}},{"kind":"Field","name":{"kind":"Name","value":"anime"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"extractImagesImage"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"song"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SongTitleSong"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"PerformancesSong"}},{"kind":"Field","name":{"kind":"Name","value":"performances"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"alias"}},{"kind":"Field","name":{"kind":"Name","value":"as"}},{"kind":"Field","name":{"kind":"Name","value":"artist"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"animethemeentries"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugEntry"}},{"kind":"Field","name":{"kind":"Name","value":"videos"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugVideo"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ThemeSummaryCardThemeExpandable"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeTheme"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ThemeTableTheme"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ArtistSummaryCardArtist"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artist"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"extractImagesImage"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlaylistSummaryCardPlaylist"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Playlist"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"visibilityLocalized"}},{"kind":"Field","name":{"kind":"Name","value":"tracksCount"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlaylistSummaryCardPlaylistWithOwner"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Playlist"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<SearchGlobalQuery, SearchGlobalQueryVariables>;
export const SearchPlaylistDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SearchPlaylist"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"query"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sort"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PlaylistSort"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"playlistPagination"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"search"},"value":{"kind":"Variable","name":{"kind":"Name","value":"query"}}},{"kind":"Argument","name":{"kind":"Name","value":"sort"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sort"}}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"15"}},{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlaylistSummaryCardPlaylist"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlaylistSummaryCardPlaylistWithOwner"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"paginationInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hasMorePages"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlaylistSummaryCardPlaylist"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Playlist"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"visibilityLocalized"}},{"kind":"Field","name":{"kind":"Name","value":"tracksCount"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlaylistSummaryCardPlaylistWithOwner"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Playlist"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<SearchPlaylistQuery, SearchPlaylistQueryVariables>;
export const SearchSeriesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SearchSeries"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"query"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name_like"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sort"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SeriesSort"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"seriesPagination"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"search"},"value":{"kind":"Variable","name":{"kind":"Name","value":"query"}}},{"kind":"Argument","name":{"kind":"Name","value":"name_like"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name_like"}}},{"kind":"Argument","name":{"kind":"Name","value":"sort"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sort"}}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"15"}},{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"paginationInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hasMorePages"}}]}}]}}]}}]} as unknown as DocumentNode<SearchSeriesQuery, SearchSeriesQueryVariables>;
export const SearchStudioDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SearchStudio"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"query"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name_like"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sort"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"StudioSort"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"studioPagination"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"search"},"value":{"kind":"Variable","name":{"kind":"Name","value":"query"}}},{"kind":"Argument","name":{"kind":"Name","value":"name_like"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name_like"}}},{"kind":"Argument","name":{"kind":"Name","value":"sort"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sort"}}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"15"}},{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"StudioSummaryCardStudio"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}},{"kind":"Field","name":{"kind":"Name","value":"paginationInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hasMorePages"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"extractImagesImage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Image"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"link"}},{"kind":"Field","name":{"kind":"Name","value":"facet"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"StudioSummaryCardStudio"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Studio"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"extractImagesImage"}}]}}]}}]}}]} as unknown as DocumentNode<SearchStudioQuery, SearchStudioQueryVariables>;
export const SearchThemeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SearchTheme"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"query"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"type"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ThemeType"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sort"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeThemeSort"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"animethemePagination"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"search"},"value":{"kind":"Variable","name":{"kind":"Name","value":"query"}}},{"kind":"Argument","name":{"kind":"Name","value":"type"},"value":{"kind":"Variable","name":{"kind":"Name","value":"type"}}},{"kind":"Argument","name":{"kind":"Name","value":"sort"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sort"}}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"15"}},{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ThemeSummaryCardTheme"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ThemeSummaryCardThemeExpandable"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}},{"kind":"Field","name":{"kind":"Name","value":"paginationInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hasMorePages"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"createVideoSlugTheme"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeTheme"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"sequence"}},{"kind":"Field","name":{"kind":"Name","value":"group"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"extractImagesImage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Image"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"link"}},{"kind":"Field","name":{"kind":"Name","value":"facet"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SongTitleSong"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Song"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PerformancesSong"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Song"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"performances"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"alias"}},{"kind":"Field","name":{"kind":"Name","value":"as"}},{"kind":"Field","name":{"kind":"Name","value":"relevance"}},{"kind":"Field","name":{"kind":"Name","value":"artist"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"member"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SongTitleWithArtistsSong"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Song"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SongTitleSong"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"PerformancesSong"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"createVideoSlugEntry"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeThemeEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"version"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"createVideoSlugVideo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Video"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tags"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ThemeMenuTheme"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeTheme"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugTheme"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"sequence"}},{"kind":"Field","name":{"kind":"Name","value":"group"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}},{"kind":"Field","name":{"kind":"Name","value":"anime"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"extractImagesImage"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"song"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SongTitleWithArtistsSong"}}]}},{"kind":"Field","name":{"kind":"Name","value":"animethemeentries"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugEntry"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"videos"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugVideo"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"basename"}},{"kind":"Field","name":{"kind":"Name","value":"audio"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"basename"}}]}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EpisodeTagEntry"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeThemeEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"episodes"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ContentWarningTagsEntry"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeThemeEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"spoiler"}},{"kind":"Field","name":{"kind":"Name","value":"nsfw"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"VideoTagsVideo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Video"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"resolution"}},{"kind":"Field","name":{"kind":"Name","value":"nc"}},{"kind":"Field","name":{"kind":"Name","value":"subbed"}},{"kind":"Field","name":{"kind":"Name","value":"lyrics"}},{"kind":"Field","name":{"kind":"Name","value":"uncen"}},{"kind":"Field","name":{"kind":"Name","value":"source"}},{"kind":"Field","name":{"kind":"Name","value":"overlap"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ThemeTableTheme"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeTheme"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugTheme"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"sequence"}},{"kind":"Field","name":{"kind":"Name","value":"anime"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}},{"kind":"Field","name":{"kind":"Name","value":"animethemeentries"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugEntry"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"EpisodeTagEntry"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContentWarningTagsEntry"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"videos"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugVideo"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"VideoTagsVideo"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"song"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SongTitleSong"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ThemeSummaryCardTheme"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeTheme"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugTheme"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ThemeMenuTheme"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"sequence"}},{"kind":"Field","name":{"kind":"Name","value":"group"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}},{"kind":"Field","name":{"kind":"Name","value":"anime"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"extractImagesImage"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"song"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SongTitleSong"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"PerformancesSong"}},{"kind":"Field","name":{"kind":"Name","value":"performances"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"alias"}},{"kind":"Field","name":{"kind":"Name","value":"as"}},{"kind":"Field","name":{"kind":"Name","value":"artist"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"animethemeentries"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugEntry"}},{"kind":"Field","name":{"kind":"Name","value":"videos"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugVideo"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ThemeSummaryCardThemeExpandable"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeTheme"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ThemeTableTheme"}}]}}]} as unknown as DocumentNode<SearchThemeQuery, SearchThemeQueryVariables>;
export const UseAuthMeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"UseAuthMe"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ProfileImageUser"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"permissions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"roles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"permissions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProfileImageUser"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Me"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]} as unknown as DocumentNode<UseAuthMeQuery, UseAuthMeQueryVariables>;
export const RandomGrillDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"RandomGrill"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"imagePagination"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"facet"},"value":{"kind":"EnumValue","value":"GRILL"}},{"kind":"Argument","name":{"kind":"Name","value":"sort"},"value":{"kind":"ListValue","values":[{"kind":"EnumValue","value":"RANDOM"}]}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"1"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"link"}}]}}]}}]}}]} as unknown as DocumentNode<RandomGrillQuery, RandomGrillQueryVariables>;
export const RandomThemeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"RandomTheme"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"type"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ThemeType"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"format"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeFormat"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"animeYearMin"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"animeYearMax"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"animethemeShuffle"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"type"},"value":{"kind":"Variable","name":{"kind":"Name","value":"type"}}},{"kind":"Argument","name":{"kind":"Name","value":"format"},"value":{"kind":"Variable","name":{"kind":"Name","value":"format"}}},{"kind":"Argument","name":{"kind":"Name","value":"year_gte"},"value":{"kind":"Variable","name":{"kind":"Name","value":"animeYearMin"}}},{"kind":"Argument","name":{"kind":"Name","value":"year_lte"},"value":{"kind":"Variable","name":{"kind":"Name","value":"animeYearMax"}}},{"kind":"Argument","name":{"kind":"Name","value":"spoiler"},"value":{"kind":"BooleanValue","value":false}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"10"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ThemeSummaryCardTheme"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ThemeSummaryCardThemeExpandable"}},{"kind":"Field","name":{"kind":"Name","value":"animethemeentries"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"VideoSummaryCardEntry"}},{"kind":"Field","name":{"kind":"Name","value":"videos"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"VideoSummaryCardVideo"}}]}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"createVideoSlugTheme"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeTheme"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"sequence"}},{"kind":"Field","name":{"kind":"Name","value":"group"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"extractImagesImage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Image"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"link"}},{"kind":"Field","name":{"kind":"Name","value":"facet"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SongTitleSong"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Song"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PerformancesSong"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Song"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"performances"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"alias"}},{"kind":"Field","name":{"kind":"Name","value":"as"}},{"kind":"Field","name":{"kind":"Name","value":"relevance"}},{"kind":"Field","name":{"kind":"Name","value":"artist"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"member"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SongTitleWithArtistsSong"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Song"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SongTitleSong"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"PerformancesSong"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"createVideoSlugEntry"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeThemeEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"version"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"createVideoSlugVideo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Video"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tags"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ThemeMenuTheme"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeTheme"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugTheme"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"sequence"}},{"kind":"Field","name":{"kind":"Name","value":"group"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}},{"kind":"Field","name":{"kind":"Name","value":"anime"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"extractImagesImage"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"song"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SongTitleWithArtistsSong"}}]}},{"kind":"Field","name":{"kind":"Name","value":"animethemeentries"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugEntry"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"videos"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugVideo"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"basename"}},{"kind":"Field","name":{"kind":"Name","value":"audio"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"basename"}}]}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EpisodeTagEntry"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeThemeEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"episodes"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ContentWarningTagsEntry"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeThemeEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"spoiler"}},{"kind":"Field","name":{"kind":"Name","value":"nsfw"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"VideoTagsVideo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Video"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"resolution"}},{"kind":"Field","name":{"kind":"Name","value":"nc"}},{"kind":"Field","name":{"kind":"Name","value":"subbed"}},{"kind":"Field","name":{"kind":"Name","value":"lyrics"}},{"kind":"Field","name":{"kind":"Name","value":"uncen"}},{"kind":"Field","name":{"kind":"Name","value":"source"}},{"kind":"Field","name":{"kind":"Name","value":"overlap"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ThemeTableTheme"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeTheme"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugTheme"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"sequence"}},{"kind":"Field","name":{"kind":"Name","value":"anime"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}},{"kind":"Field","name":{"kind":"Name","value":"animethemeentries"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugEntry"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"EpisodeTagEntry"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContentWarningTagsEntry"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"videos"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugVideo"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"VideoTagsVideo"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"song"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SongTitleSong"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ThemeSummaryCardTheme"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeTheme"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugTheme"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ThemeMenuTheme"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"sequence"}},{"kind":"Field","name":{"kind":"Name","value":"group"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}},{"kind":"Field","name":{"kind":"Name","value":"anime"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"extractImagesImage"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"song"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SongTitleSong"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"PerformancesSong"}},{"kind":"Field","name":{"kind":"Name","value":"performances"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"alias"}},{"kind":"Field","name":{"kind":"Name","value":"as"}},{"kind":"Field","name":{"kind":"Name","value":"artist"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"animethemeentries"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugEntry"}},{"kind":"Field","name":{"kind":"Name","value":"videos"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugVideo"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ThemeSummaryCardThemeExpandable"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeTheme"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ThemeTableTheme"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"VideoSummaryCardEntry"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeThemeEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugEntry"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"animetheme"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugTheme"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"sequence"}},{"kind":"Field","name":{"kind":"Name","value":"group"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}},{"kind":"Field","name":{"kind":"Name","value":"anime"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"extractImagesImage"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"song"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SongTitleSong"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"PerformancesSong"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"VideoSummaryCardVideo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Video"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"basename"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugVideo"}}]}}]} as unknown as DocumentNode<RandomThemeQuery, RandomThemeQueryVariables>;
export const DocumentPageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"DocumentPage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pageSlug"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"page"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"slug"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pageSlug"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"DocumentPagePage"}},{"kind":"Field","name":{"kind":"Name","value":"body"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"DocumentPagePage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Page"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]} as unknown as DocumentNode<DocumentPageQuery, DocumentPageQueryVariables>;
export const DocumentPageAllDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"DocumentPageAll"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pagePagination"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]}}]}}]} as unknown as DocumentNode<DocumentPageAllQuery, DocumentPageAllQueryVariables>;
export const DumpIndexPageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"DumpIndexPage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dumpPagination"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"path"}},{"kind":"Field","name":{"kind":"Name","value":"link"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]}}]} as unknown as DocumentNode<DumpIndexPageQuery, DumpIndexPageQueryVariables>;
export const VideoPageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"VideoPage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"animeSlug"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"anime"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"slug"},"value":{"kind":"Variable","name":{"kind":"Name","value":"animeSlug"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"VideoPageAnime"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"extractImagesImage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Image"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"link"}},{"kind":"Field","name":{"kind":"Name","value":"facet"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AnimeSummaryCardAnime"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Anime"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"season"}},{"kind":"Field","name":{"kind":"Name","value":"seasonLocalized"}},{"kind":"Field","name":{"kind":"Name","value":"formatLocalized"}},{"kind":"Field","name":{"kind":"Name","value":"animethemes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"group"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"extractImagesImage"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"createVideoSlugTheme"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeTheme"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"sequence"}},{"kind":"Field","name":{"kind":"Name","value":"group"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SongTitleSong"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Song"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PerformancesSong"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Song"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"performances"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"alias"}},{"kind":"Field","name":{"kind":"Name","value":"as"}},{"kind":"Field","name":{"kind":"Name","value":"relevance"}},{"kind":"Field","name":{"kind":"Name","value":"artist"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"member"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SongTitleWithArtistsSong"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Song"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SongTitleSong"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"PerformancesSong"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"createVideoSlugEntry"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeThemeEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"version"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"createVideoSlugVideo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Video"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tags"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ThemeMenuTheme"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeTheme"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugTheme"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"sequence"}},{"kind":"Field","name":{"kind":"Name","value":"group"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}},{"kind":"Field","name":{"kind":"Name","value":"anime"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"extractImagesImage"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"song"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SongTitleWithArtistsSong"}}]}},{"kind":"Field","name":{"kind":"Name","value":"animethemeentries"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugEntry"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"videos"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugVideo"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"basename"}},{"kind":"Field","name":{"kind":"Name","value":"audio"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"basename"}}]}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ThemeSummaryCardTheme"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeTheme"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugTheme"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ThemeMenuTheme"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"sequence"}},{"kind":"Field","name":{"kind":"Name","value":"group"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}},{"kind":"Field","name":{"kind":"Name","value":"anime"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"extractImagesImage"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"song"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SongTitleSong"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"PerformancesSong"}},{"kind":"Field","name":{"kind":"Name","value":"performances"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"alias"}},{"kind":"Field","name":{"kind":"Name","value":"as"}},{"kind":"Field","name":{"kind":"Name","value":"artist"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"animethemeentries"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugEntry"}},{"kind":"Field","name":{"kind":"Name","value":"videos"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugVideo"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ArtistSummaryCardArtist"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artist"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"extractImagesImage"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"VideoPlayerBarEntry"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeThemeEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"animetheme"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"sequence"}},{"kind":"Field","name":{"kind":"Name","value":"song"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SongTitleSong"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"PerformancesSong"}},{"kind":"Field","name":{"kind":"Name","value":"performances"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"group"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"anime"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"VideoPlayerEntry"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeThemeEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"VideoPlayerBarEntry"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugEntry"}},{"kind":"Field","name":{"kind":"Name","value":"animetheme"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugTheme"}},{"kind":"Field","name":{"kind":"Name","value":"anime"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"extractImagesImage"}}]}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"VideoPlayerBarVideo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Video"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"VideoPlayerVideo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Video"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"VideoPlayerBarVideo"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugVideo"}},{"kind":"Field","name":{"kind":"Name","value":"basename"}},{"kind":"Field","name":{"kind":"Name","value":"audio"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"basename"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"VideoScriptVideo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Video"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"videoscript"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"link"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlaylistSummaryCardPlaylist"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Playlist"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"visibilityLocalized"}},{"kind":"Field","name":{"kind":"Name","value":"tracksCount"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlaylistSummaryCardPlaylistWithOwner"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Playlist"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"StudioSummaryCardStudio"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Studio"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"extractImagesImage"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"VideoPageAnime"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Anime"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AnimeSummaryCardAnime"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"season"}},{"kind":"Field","name":{"kind":"Name","value":"animethemes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ThemeSummaryCardTheme"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugTheme"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"sequence"}},{"kind":"Field","name":{"kind":"Name","value":"song"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"performances"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"artist"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ArtistSummaryCardArtist"}}]}},{"kind":"Field","name":{"kind":"Name","value":"as"}},{"kind":"Field","name":{"kind":"Name","value":"relevance"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"group"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}},{"kind":"Field","name":{"kind":"Name","value":"animethemeentries"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"VideoPlayerEntry"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugEntry"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"episodes"}},{"kind":"Field","name":{"kind":"Name","value":"nsfw"}},{"kind":"Field","name":{"kind":"Name","value":"spoiler"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"videos"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"VideoPlayerVideo"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"VideoScriptVideo"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugVideo"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"basename"}},{"kind":"Field","name":{"kind":"Name","value":"filename"}},{"kind":"Field","name":{"kind":"Name","value":"lyrics"}},{"kind":"Field","name":{"kind":"Name","value":"nc"}},{"kind":"Field","name":{"kind":"Name","value":"overlap"}},{"kind":"Field","name":{"kind":"Name","value":"resolution"}},{"kind":"Field","name":{"kind":"Name","value":"source"}},{"kind":"Field","name":{"kind":"Name","value":"subbed"}},{"kind":"Field","name":{"kind":"Name","value":"uncen"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"animethemeentries"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"animetheme"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ThemeSummaryCardTheme"}},{"kind":"Field","name":{"kind":"Name","value":"anime"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"tracks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"playlist"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlaylistSummaryCardPlaylist"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlaylistSummaryCardPlaylistWithOwner"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"extractImagesImage"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"series"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"studios"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"StudioSummaryCardStudio"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]}}]}}]} as unknown as DocumentNode<VideoPageQuery, VideoPageQueryVariables>;
export const VideoPageAllDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"VideoPageAll"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"animePagination"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"VideoPageAnime"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"animethemes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugTheme"}},{"kind":"Field","name":{"kind":"Name","value":"animethemeentries"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugEntry"}},{"kind":"Field","name":{"kind":"Name","value":"videos"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugVideo"}}]}}]}}]}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"extractImagesImage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Image"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"link"}},{"kind":"Field","name":{"kind":"Name","value":"facet"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AnimeSummaryCardAnime"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Anime"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"season"}},{"kind":"Field","name":{"kind":"Name","value":"seasonLocalized"}},{"kind":"Field","name":{"kind":"Name","value":"formatLocalized"}},{"kind":"Field","name":{"kind":"Name","value":"animethemes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"group"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"extractImagesImage"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"createVideoSlugTheme"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeTheme"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"sequence"}},{"kind":"Field","name":{"kind":"Name","value":"group"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SongTitleSong"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Song"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PerformancesSong"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Song"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"performances"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"alias"}},{"kind":"Field","name":{"kind":"Name","value":"as"}},{"kind":"Field","name":{"kind":"Name","value":"relevance"}},{"kind":"Field","name":{"kind":"Name","value":"artist"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"member"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SongTitleWithArtistsSong"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Song"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SongTitleSong"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"PerformancesSong"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"createVideoSlugEntry"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeThemeEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"version"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"createVideoSlugVideo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Video"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tags"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ThemeMenuTheme"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeTheme"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugTheme"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"sequence"}},{"kind":"Field","name":{"kind":"Name","value":"group"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}},{"kind":"Field","name":{"kind":"Name","value":"anime"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"extractImagesImage"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"song"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SongTitleWithArtistsSong"}}]}},{"kind":"Field","name":{"kind":"Name","value":"animethemeentries"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugEntry"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"videos"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugVideo"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"basename"}},{"kind":"Field","name":{"kind":"Name","value":"audio"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"basename"}}]}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ThemeSummaryCardTheme"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeTheme"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugTheme"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ThemeMenuTheme"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"sequence"}},{"kind":"Field","name":{"kind":"Name","value":"group"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}},{"kind":"Field","name":{"kind":"Name","value":"anime"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"extractImagesImage"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"song"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SongTitleSong"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"PerformancesSong"}},{"kind":"Field","name":{"kind":"Name","value":"performances"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"alias"}},{"kind":"Field","name":{"kind":"Name","value":"as"}},{"kind":"Field","name":{"kind":"Name","value":"artist"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"animethemeentries"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugEntry"}},{"kind":"Field","name":{"kind":"Name","value":"videos"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugVideo"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ArtistSummaryCardArtist"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artist"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"extractImagesImage"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"VideoPlayerBarEntry"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeThemeEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"animetheme"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"sequence"}},{"kind":"Field","name":{"kind":"Name","value":"song"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SongTitleSong"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"PerformancesSong"}},{"kind":"Field","name":{"kind":"Name","value":"performances"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"group"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"anime"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"VideoPlayerEntry"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeThemeEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"VideoPlayerBarEntry"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugEntry"}},{"kind":"Field","name":{"kind":"Name","value":"animetheme"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugTheme"}},{"kind":"Field","name":{"kind":"Name","value":"anime"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"extractImagesImage"}}]}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"VideoPlayerBarVideo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Video"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"VideoPlayerVideo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Video"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"VideoPlayerBarVideo"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugVideo"}},{"kind":"Field","name":{"kind":"Name","value":"basename"}},{"kind":"Field","name":{"kind":"Name","value":"audio"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"basename"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"VideoScriptVideo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Video"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"videoscript"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"link"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlaylistSummaryCardPlaylist"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Playlist"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"visibilityLocalized"}},{"kind":"Field","name":{"kind":"Name","value":"tracksCount"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlaylistSummaryCardPlaylistWithOwner"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Playlist"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"StudioSummaryCardStudio"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Studio"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"extractImagesImage"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"VideoPageAnime"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Anime"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AnimeSummaryCardAnime"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"season"}},{"kind":"Field","name":{"kind":"Name","value":"animethemes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ThemeSummaryCardTheme"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugTheme"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"sequence"}},{"kind":"Field","name":{"kind":"Name","value":"song"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"performances"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"artist"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ArtistSummaryCardArtist"}}]}},{"kind":"Field","name":{"kind":"Name","value":"as"}},{"kind":"Field","name":{"kind":"Name","value":"relevance"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"group"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}},{"kind":"Field","name":{"kind":"Name","value":"animethemeentries"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"VideoPlayerEntry"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugEntry"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"episodes"}},{"kind":"Field","name":{"kind":"Name","value":"nsfw"}},{"kind":"Field","name":{"kind":"Name","value":"spoiler"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"videos"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"VideoPlayerVideo"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"VideoScriptVideo"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugVideo"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"basename"}},{"kind":"Field","name":{"kind":"Name","value":"filename"}},{"kind":"Field","name":{"kind":"Name","value":"lyrics"}},{"kind":"Field","name":{"kind":"Name","value":"nc"}},{"kind":"Field","name":{"kind":"Name","value":"overlap"}},{"kind":"Field","name":{"kind":"Name","value":"resolution"}},{"kind":"Field","name":{"kind":"Name","value":"source"}},{"kind":"Field","name":{"kind":"Name","value":"subbed"}},{"kind":"Field","name":{"kind":"Name","value":"uncen"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"animethemeentries"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"animetheme"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ThemeSummaryCardTheme"}},{"kind":"Field","name":{"kind":"Name","value":"anime"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"tracks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"playlist"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlaylistSummaryCardPlaylist"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlaylistSummaryCardPlaylistWithOwner"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"extractImagesImage"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"series"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"studios"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"StudioSummaryCardStudio"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]}}]}}]} as unknown as DocumentNode<VideoPageAllQuery, VideoPageAllQueryVariables>;
export const AnimeDetailPageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AnimeDetailPage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"animeSlug"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"anime"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"slug"},"value":{"kind":"Variable","name":{"kind":"Name","value":"animeSlug"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AnimeDetailPageAnime"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"extractImagesImage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Image"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"link"}},{"kind":"Field","name":{"kind":"Name","value":"facet"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"createVideoSlugTheme"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeTheme"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"sequence"}},{"kind":"Field","name":{"kind":"Name","value":"group"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SongTitleSong"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Song"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PerformancesSong"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Song"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"performances"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"alias"}},{"kind":"Field","name":{"kind":"Name","value":"as"}},{"kind":"Field","name":{"kind":"Name","value":"relevance"}},{"kind":"Field","name":{"kind":"Name","value":"artist"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"member"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SongTitleWithArtistsSong"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Song"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SongTitleSong"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"PerformancesSong"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"createVideoSlugEntry"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeThemeEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"version"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"createVideoSlugVideo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Video"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tags"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ThemeMenuTheme"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeTheme"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugTheme"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"sequence"}},{"kind":"Field","name":{"kind":"Name","value":"group"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}},{"kind":"Field","name":{"kind":"Name","value":"anime"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"extractImagesImage"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"song"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SongTitleWithArtistsSong"}}]}},{"kind":"Field","name":{"kind":"Name","value":"animethemeentries"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugEntry"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"videos"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugVideo"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"basename"}},{"kind":"Field","name":{"kind":"Name","value":"audio"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"basename"}}]}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"VideoButtonTheme"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeTheme"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugTheme"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"VideoButtonAnime"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Anime"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EpisodeTagEntry"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeThemeEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"episodes"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ContentWarningTagsEntry"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeThemeEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"spoiler"}},{"kind":"Field","name":{"kind":"Name","value":"nsfw"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ThemeEntryTagsEntry"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeThemeEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"EpisodeTagEntry"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContentWarningTagsEntry"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"VideoButtonEntry"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeThemeEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugEntry"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"VideoTagsVideo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Video"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"resolution"}},{"kind":"Field","name":{"kind":"Name","value":"nc"}},{"kind":"Field","name":{"kind":"Name","value":"subbed"}},{"kind":"Field","name":{"kind":"Name","value":"lyrics"}},{"kind":"Field","name":{"kind":"Name","value":"uncen"}},{"kind":"Field","name":{"kind":"Name","value":"source"}},{"kind":"Field","name":{"kind":"Name","value":"overlap"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"VideoButtonVideo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Video"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugVideo"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"VideoTagsVideo"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ThemeDetailCardTheme"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeTheme"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ThemeMenuTheme"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"VideoButtonTheme"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"sequence"}},{"kind":"Field","name":{"kind":"Name","value":"group"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}},{"kind":"Field","name":{"kind":"Name","value":"anime"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"VideoButtonAnime"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"song"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SongTitleSong"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"PerformancesSong"}}]}},{"kind":"Field","name":{"kind":"Name","value":"animethemeentries"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ThemeEntryTagsEntry"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"VideoButtonEntry"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"videos"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"VideoButtonVideo"}},{"kind":"Field","name":{"kind":"Name","value":"filename"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AnimeThemeFilterTheme"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeTheme"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ThemeDetailCardTheme"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"sequence"}},{"kind":"Field","name":{"kind":"Name","value":"group"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AnimeDetailPageAnime"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Anime"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"season"}},{"kind":"Field","name":{"kind":"Name","value":"seasonLocalized"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"synopsis"}},{"kind":"Field","name":{"kind":"Name","value":"formatLocalized"}},{"kind":"Field","name":{"kind":"Name","value":"synonyms"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"text"}}]}},{"kind":"Field","name":{"kind":"Name","value":"series"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"studios"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"resources"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"site"}},{"kind":"Field","name":{"kind":"Name","value":"siteLocalized"}},{"kind":"Field","name":{"kind":"Name","value":"link"}}]}},{"kind":"Field","name":{"kind":"Name","value":"as"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"extractImagesImage"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"animethemes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AnimeThemeFilterTheme"}}]}}]}}]} as unknown as DocumentNode<AnimeDetailPageQuery, AnimeDetailPageQueryVariables>;
export const AnimeDetailPageAllDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AnimeDetailPageAll"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"animePagination"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AnimeDetailPageAnime"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"extractImagesImage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Image"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"link"}},{"kind":"Field","name":{"kind":"Name","value":"facet"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"createVideoSlugTheme"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeTheme"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"sequence"}},{"kind":"Field","name":{"kind":"Name","value":"group"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SongTitleSong"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Song"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PerformancesSong"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Song"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"performances"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"alias"}},{"kind":"Field","name":{"kind":"Name","value":"as"}},{"kind":"Field","name":{"kind":"Name","value":"relevance"}},{"kind":"Field","name":{"kind":"Name","value":"artist"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"member"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SongTitleWithArtistsSong"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Song"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SongTitleSong"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"PerformancesSong"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"createVideoSlugEntry"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeThemeEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"version"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"createVideoSlugVideo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Video"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tags"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ThemeMenuTheme"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeTheme"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugTheme"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"sequence"}},{"kind":"Field","name":{"kind":"Name","value":"group"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}},{"kind":"Field","name":{"kind":"Name","value":"anime"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"extractImagesImage"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"song"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SongTitleWithArtistsSong"}}]}},{"kind":"Field","name":{"kind":"Name","value":"animethemeentries"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugEntry"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"videos"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugVideo"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"basename"}},{"kind":"Field","name":{"kind":"Name","value":"audio"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"basename"}}]}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"VideoButtonTheme"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeTheme"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugTheme"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"VideoButtonAnime"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Anime"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EpisodeTagEntry"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeThemeEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"episodes"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ContentWarningTagsEntry"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeThemeEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"spoiler"}},{"kind":"Field","name":{"kind":"Name","value":"nsfw"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ThemeEntryTagsEntry"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeThemeEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"EpisodeTagEntry"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContentWarningTagsEntry"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"VideoButtonEntry"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeThemeEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugEntry"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"VideoTagsVideo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Video"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"resolution"}},{"kind":"Field","name":{"kind":"Name","value":"nc"}},{"kind":"Field","name":{"kind":"Name","value":"subbed"}},{"kind":"Field","name":{"kind":"Name","value":"lyrics"}},{"kind":"Field","name":{"kind":"Name","value":"uncen"}},{"kind":"Field","name":{"kind":"Name","value":"source"}},{"kind":"Field","name":{"kind":"Name","value":"overlap"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"VideoButtonVideo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Video"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugVideo"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"VideoTagsVideo"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ThemeDetailCardTheme"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeTheme"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ThemeMenuTheme"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"VideoButtonTheme"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"sequence"}},{"kind":"Field","name":{"kind":"Name","value":"group"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}},{"kind":"Field","name":{"kind":"Name","value":"anime"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"VideoButtonAnime"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"song"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SongTitleSong"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"PerformancesSong"}}]}},{"kind":"Field","name":{"kind":"Name","value":"animethemeentries"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ThemeEntryTagsEntry"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"VideoButtonEntry"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"videos"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"VideoButtonVideo"}},{"kind":"Field","name":{"kind":"Name","value":"filename"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AnimeThemeFilterTheme"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeTheme"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ThemeDetailCardTheme"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"sequence"}},{"kind":"Field","name":{"kind":"Name","value":"group"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AnimeDetailPageAnime"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Anime"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"season"}},{"kind":"Field","name":{"kind":"Name","value":"seasonLocalized"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"synopsis"}},{"kind":"Field","name":{"kind":"Name","value":"formatLocalized"}},{"kind":"Field","name":{"kind":"Name","value":"synonyms"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"text"}}]}},{"kind":"Field","name":{"kind":"Name","value":"series"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"studios"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"resources"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"site"}},{"kind":"Field","name":{"kind":"Name","value":"siteLocalized"}},{"kind":"Field","name":{"kind":"Name","value":"link"}}]}},{"kind":"Field","name":{"kind":"Name","value":"as"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"extractImagesImage"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"animethemes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AnimeThemeFilterTheme"}}]}}]}}]} as unknown as DocumentNode<AnimeDetailPageAllQuery, AnimeDetailPageAllQueryVariables>;
export const AnimeIndexPageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AnimeIndexPage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"animePagination"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"sort"},"value":{"kind":"EnumValue","value":"NAME"}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<AnimeIndexPageQuery, AnimeIndexPageQueryVariables>;
export const RevalidateApiDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"RevalidateApi"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"permissions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"roles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"permissions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<RevalidateApiQuery, RevalidateApiQueryVariables>;
export const ArtistDetailPageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ArtistDetailPage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"artistSlug"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"artist"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"slug"},"value":{"kind":"Variable","name":{"kind":"Name","value":"artistSlug"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ArtistDetailPageArtist"}},{"kind":"Field","name":{"kind":"Name","value":"information"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PerformancesArtist"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artist"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ThemeSummaryCardArtist"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artist"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PerformancesArtist"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"createVideoSlugTheme"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeTheme"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"sequence"}},{"kind":"Field","name":{"kind":"Name","value":"group"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"extractImagesImage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Image"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"link"}},{"kind":"Field","name":{"kind":"Name","value":"facet"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SongTitleSong"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Song"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PerformancesSong"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Song"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"performances"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"alias"}},{"kind":"Field","name":{"kind":"Name","value":"as"}},{"kind":"Field","name":{"kind":"Name","value":"relevance"}},{"kind":"Field","name":{"kind":"Name","value":"artist"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"member"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SongTitleWithArtistsSong"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Song"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SongTitleSong"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"PerformancesSong"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"createVideoSlugEntry"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeThemeEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"version"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"createVideoSlugVideo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Video"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tags"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ThemeMenuTheme"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeTheme"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugTheme"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"sequence"}},{"kind":"Field","name":{"kind":"Name","value":"group"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}},{"kind":"Field","name":{"kind":"Name","value":"anime"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"extractImagesImage"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"song"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SongTitleWithArtistsSong"}}]}},{"kind":"Field","name":{"kind":"Name","value":"animethemeentries"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugEntry"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"videos"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugVideo"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"basename"}},{"kind":"Field","name":{"kind":"Name","value":"audio"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"basename"}}]}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ThemeSummaryCardTheme"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeTheme"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugTheme"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ThemeMenuTheme"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"sequence"}},{"kind":"Field","name":{"kind":"Name","value":"group"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}},{"kind":"Field","name":{"kind":"Name","value":"anime"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"extractImagesImage"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"song"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SongTitleSong"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"PerformancesSong"}},{"kind":"Field","name":{"kind":"Name","value":"performances"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"alias"}},{"kind":"Field","name":{"kind":"Name","value":"as"}},{"kind":"Field","name":{"kind":"Name","value":"artist"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"animethemeentries"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugEntry"}},{"kind":"Field","name":{"kind":"Name","value":"videos"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugVideo"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EpisodeTagEntry"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeThemeEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"episodes"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ContentWarningTagsEntry"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeThemeEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"spoiler"}},{"kind":"Field","name":{"kind":"Name","value":"nsfw"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"VideoTagsVideo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Video"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"resolution"}},{"kind":"Field","name":{"kind":"Name","value":"nc"}},{"kind":"Field","name":{"kind":"Name","value":"subbed"}},{"kind":"Field","name":{"kind":"Name","value":"lyrics"}},{"kind":"Field","name":{"kind":"Name","value":"uncen"}},{"kind":"Field","name":{"kind":"Name","value":"source"}},{"kind":"Field","name":{"kind":"Name","value":"overlap"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ThemeTableTheme"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeTheme"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugTheme"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"sequence"}},{"kind":"Field","name":{"kind":"Name","value":"anime"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}},{"kind":"Field","name":{"kind":"Name","value":"animethemeentries"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugEntry"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"EpisodeTagEntry"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContentWarningTagsEntry"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"videos"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugVideo"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"VideoTagsVideo"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"song"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SongTitleSong"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ThemeSummaryCardThemeExpandable"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeTheme"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ThemeTableTheme"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ArtistSummaryCardArtist"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artist"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"extractImagesImage"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"extractMultipleImagesImageArtistEdge"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ArtistImageEdge"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"depth"}},{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"link"}},{"kind":"Field","name":{"kind":"Name","value":"facet"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ArtistDetailPageArtist"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artist"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ThemeSummaryCardArtist"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"synonyms"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"text"}}]}},{"kind":"Field","name":{"kind":"Name","value":"performances"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"alias"}},{"kind":"Field","name":{"kind":"Name","value":"as"}},{"kind":"Field","name":{"kind":"Name","value":"song"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"performances"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"alias"}},{"kind":"Field","name":{"kind":"Name","value":"as"}},{"kind":"Field","name":{"kind":"Name","value":"memberAlias"}},{"kind":"Field","name":{"kind":"Name","value":"memberAs"}},{"kind":"Field","name":{"kind":"Name","value":"artist"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"animethemes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ThemeSummaryCardTheme"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ThemeSummaryCardThemeExpandable"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"sequence"}},{"kind":"Field","name":{"kind":"Name","value":"animethemeentries"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"videos"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"group"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}},{"kind":"Field","name":{"kind":"Name","value":"anime"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"season"}}]}},{"kind":"Field","name":{"kind":"Name","value":"song"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"memberPerformances"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"alias"}},{"kind":"Field","name":{"kind":"Name","value":"as"}},{"kind":"Field","name":{"kind":"Name","value":"memberAlias"}},{"kind":"Field","name":{"kind":"Name","value":"memberAs"}},{"kind":"Field","name":{"kind":"Name","value":"artist"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"song"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"performances"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"alias"}},{"kind":"Field","name":{"kind":"Name","value":"as"}},{"kind":"Field","name":{"kind":"Name","value":"memberAlias"}},{"kind":"Field","name":{"kind":"Name","value":"memberAs"}},{"kind":"Field","name":{"kind":"Name","value":"artist"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"animethemes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ThemeSummaryCardTheme"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ThemeSummaryCardThemeExpandable"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"sequence"}},{"kind":"Field","name":{"kind":"Name","value":"animethemeentries"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"videos"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"group"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}},{"kind":"Field","name":{"kind":"Name","value":"anime"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"season"}}]}},{"kind":"Field","name":{"kind":"Name","value":"song"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"members"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"alias"}},{"kind":"Field","name":{"kind":"Name","value":"as"}},{"kind":"Field","name":{"kind":"Name","value":"notes"}},{"kind":"Field","name":{"kind":"Name","value":"relevance"}},{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ArtistSummaryCardArtist"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"groups"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"alias"}},{"kind":"Field","name":{"kind":"Name","value":"as"}},{"kind":"Field","name":{"kind":"Name","value":"notes"}},{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"extractMultipleImagesImageArtistEdge"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"resources"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"link"}},{"kind":"Field","name":{"kind":"Name","value":"site"}},{"kind":"Field","name":{"kind":"Name","value":"siteLocalized"}}]}},{"kind":"Field","name":{"kind":"Name","value":"as"}}]}}]}}]}}]} as unknown as DocumentNode<ArtistDetailPageQuery, ArtistDetailPageQueryVariables>;
export const ArtistDetailPageAllDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ArtistDetailPageAll"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"artistPagination"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ArtistDetailPageArtist"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"information"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PerformancesArtist"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artist"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ThemeSummaryCardArtist"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artist"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PerformancesArtist"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"createVideoSlugTheme"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeTheme"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"sequence"}},{"kind":"Field","name":{"kind":"Name","value":"group"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"extractImagesImage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Image"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"link"}},{"kind":"Field","name":{"kind":"Name","value":"facet"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SongTitleSong"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Song"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PerformancesSong"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Song"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"performances"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"alias"}},{"kind":"Field","name":{"kind":"Name","value":"as"}},{"kind":"Field","name":{"kind":"Name","value":"relevance"}},{"kind":"Field","name":{"kind":"Name","value":"artist"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"member"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SongTitleWithArtistsSong"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Song"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SongTitleSong"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"PerformancesSong"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"createVideoSlugEntry"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeThemeEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"version"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"createVideoSlugVideo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Video"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tags"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ThemeMenuTheme"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeTheme"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugTheme"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"sequence"}},{"kind":"Field","name":{"kind":"Name","value":"group"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}},{"kind":"Field","name":{"kind":"Name","value":"anime"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"extractImagesImage"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"song"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SongTitleWithArtistsSong"}}]}},{"kind":"Field","name":{"kind":"Name","value":"animethemeentries"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugEntry"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"videos"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugVideo"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"basename"}},{"kind":"Field","name":{"kind":"Name","value":"audio"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"basename"}}]}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ThemeSummaryCardTheme"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeTheme"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugTheme"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ThemeMenuTheme"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"sequence"}},{"kind":"Field","name":{"kind":"Name","value":"group"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}},{"kind":"Field","name":{"kind":"Name","value":"anime"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"extractImagesImage"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"song"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SongTitleSong"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"PerformancesSong"}},{"kind":"Field","name":{"kind":"Name","value":"performances"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"alias"}},{"kind":"Field","name":{"kind":"Name","value":"as"}},{"kind":"Field","name":{"kind":"Name","value":"artist"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"animethemeentries"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugEntry"}},{"kind":"Field","name":{"kind":"Name","value":"videos"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugVideo"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EpisodeTagEntry"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeThemeEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"episodes"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ContentWarningTagsEntry"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeThemeEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"spoiler"}},{"kind":"Field","name":{"kind":"Name","value":"nsfw"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"VideoTagsVideo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Video"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"resolution"}},{"kind":"Field","name":{"kind":"Name","value":"nc"}},{"kind":"Field","name":{"kind":"Name","value":"subbed"}},{"kind":"Field","name":{"kind":"Name","value":"lyrics"}},{"kind":"Field","name":{"kind":"Name","value":"uncen"}},{"kind":"Field","name":{"kind":"Name","value":"source"}},{"kind":"Field","name":{"kind":"Name","value":"overlap"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ThemeTableTheme"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeTheme"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugTheme"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"sequence"}},{"kind":"Field","name":{"kind":"Name","value":"anime"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}},{"kind":"Field","name":{"kind":"Name","value":"animethemeentries"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugEntry"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"EpisodeTagEntry"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContentWarningTagsEntry"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"videos"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugVideo"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"VideoTagsVideo"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"song"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SongTitleSong"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ThemeSummaryCardThemeExpandable"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeTheme"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ThemeTableTheme"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ArtistSummaryCardArtist"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artist"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"extractImagesImage"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"extractMultipleImagesImageArtistEdge"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ArtistImageEdge"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"depth"}},{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"link"}},{"kind":"Field","name":{"kind":"Name","value":"facet"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ArtistDetailPageArtist"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artist"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ThemeSummaryCardArtist"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"synonyms"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"text"}}]}},{"kind":"Field","name":{"kind":"Name","value":"performances"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"alias"}},{"kind":"Field","name":{"kind":"Name","value":"as"}},{"kind":"Field","name":{"kind":"Name","value":"song"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"performances"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"alias"}},{"kind":"Field","name":{"kind":"Name","value":"as"}},{"kind":"Field","name":{"kind":"Name","value":"memberAlias"}},{"kind":"Field","name":{"kind":"Name","value":"memberAs"}},{"kind":"Field","name":{"kind":"Name","value":"artist"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"animethemes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ThemeSummaryCardTheme"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ThemeSummaryCardThemeExpandable"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"sequence"}},{"kind":"Field","name":{"kind":"Name","value":"animethemeentries"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"videos"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"group"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}},{"kind":"Field","name":{"kind":"Name","value":"anime"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"season"}}]}},{"kind":"Field","name":{"kind":"Name","value":"song"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"memberPerformances"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"alias"}},{"kind":"Field","name":{"kind":"Name","value":"as"}},{"kind":"Field","name":{"kind":"Name","value":"memberAlias"}},{"kind":"Field","name":{"kind":"Name","value":"memberAs"}},{"kind":"Field","name":{"kind":"Name","value":"artist"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"song"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"performances"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"alias"}},{"kind":"Field","name":{"kind":"Name","value":"as"}},{"kind":"Field","name":{"kind":"Name","value":"memberAlias"}},{"kind":"Field","name":{"kind":"Name","value":"memberAs"}},{"kind":"Field","name":{"kind":"Name","value":"artist"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"animethemes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ThemeSummaryCardTheme"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ThemeSummaryCardThemeExpandable"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"sequence"}},{"kind":"Field","name":{"kind":"Name","value":"animethemeentries"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"videos"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"group"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}},{"kind":"Field","name":{"kind":"Name","value":"anime"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"season"}}]}},{"kind":"Field","name":{"kind":"Name","value":"song"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"members"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"alias"}},{"kind":"Field","name":{"kind":"Name","value":"as"}},{"kind":"Field","name":{"kind":"Name","value":"notes"}},{"kind":"Field","name":{"kind":"Name","value":"relevance"}},{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ArtistSummaryCardArtist"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"groups"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"alias"}},{"kind":"Field","name":{"kind":"Name","value":"as"}},{"kind":"Field","name":{"kind":"Name","value":"notes"}},{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"extractMultipleImagesImageArtistEdge"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"resources"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"link"}},{"kind":"Field","name":{"kind":"Name","value":"site"}},{"kind":"Field","name":{"kind":"Name","value":"siteLocalized"}}]}},{"kind":"Field","name":{"kind":"Name","value":"as"}}]}}]}}]}}]} as unknown as DocumentNode<ArtistDetailPageAllQuery, ArtistDetailPageAllQueryVariables>;
export const ArtistIndexPageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ArtistIndexPage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"artistPagination"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"sort"},"value":{"kind":"EnumValue","value":"NAME"}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<ArtistIndexPageQuery, ArtistIndexPageQueryVariables>;
export const DocumentIndexPageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"DocumentIndexPage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pagePagination"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"sort"},"value":{"kind":"EnumValue","value":"CREATED_AT_DESC"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]}}]} as unknown as DocumentNode<DocumentIndexPageQuery, DocumentIndexPageQueryVariables>;
export const BracketPageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"BracketPage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"themeIds"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Mixed"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"animethemePagination"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ListValue","values":[{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"field"},"value":{"kind":"EnumValue","value":"ID"}},{"kind":"ObjectField","name":{"kind":"Name","value":"operator"},"value":{"kind":"EnumValue","value":"IN"}},{"kind":"ObjectField","name":{"kind":"Name","value":"value"},"value":{"kind":"Variable","name":{"kind":"Name","value":"themeIds"}}}]}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"BracketThemeSummaryCardTheme"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"createVideoSlugTheme"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeTheme"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"sequence"}},{"kind":"Field","name":{"kind":"Name","value":"group"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"extractImagesImage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Image"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"link"}},{"kind":"Field","name":{"kind":"Name","value":"facet"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SongTitleSong"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Song"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PerformancesSong"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Song"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"performances"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"alias"}},{"kind":"Field","name":{"kind":"Name","value":"as"}},{"kind":"Field","name":{"kind":"Name","value":"relevance"}},{"kind":"Field","name":{"kind":"Name","value":"artist"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"member"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SongTitleWithArtistsSong"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Song"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SongTitleSong"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"PerformancesSong"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"createVideoSlugEntry"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeThemeEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"version"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"createVideoSlugVideo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Video"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tags"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ThemeMenuTheme"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeTheme"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugTheme"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"sequence"}},{"kind":"Field","name":{"kind":"Name","value":"group"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}},{"kind":"Field","name":{"kind":"Name","value":"anime"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"extractImagesImage"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"song"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SongTitleWithArtistsSong"}}]}},{"kind":"Field","name":{"kind":"Name","value":"animethemeentries"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugEntry"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"videos"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugVideo"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"basename"}},{"kind":"Field","name":{"kind":"Name","value":"audio"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"basename"}}]}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BracketThemeSummaryCardTheme"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeTheme"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugTheme"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ThemeMenuTheme"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"sequence"}},{"kind":"Field","name":{"kind":"Name","value":"group"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}},{"kind":"Field","name":{"kind":"Name","value":"anime"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"extractImagesImage"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"song"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SongTitleWithArtistsSong"}}]}},{"kind":"Field","name":{"kind":"Name","value":"animethemeentries"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugEntry"}},{"kind":"Field","name":{"kind":"Name","value":"videos"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugVideo"}}]}}]}}]}}]}}]} as unknown as DocumentNode<BracketPageQuery, BracketPageQueryVariables>;
export const AnimeAwardPageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AnimeAwardPage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"themeIds"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Mixed"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"animethemePagination"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ListValue","values":[{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"field"},"value":{"kind":"EnumValue","value":"ID"}},{"kind":"ObjectField","name":{"kind":"Name","value":"operator"},"value":{"kind":"EnumValue","value":"IN"}},{"kind":"ObjectField","name":{"kind":"Name","value":"value"},"value":{"kind":"Variable","name":{"kind":"Name","value":"themeIds"}}}]}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AnimeAwardsPageTheme"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"animethemeentries"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AnimeAwardPageEntry"}},{"kind":"Field","name":{"kind":"Name","value":"version"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"createVideoSlugTheme"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeTheme"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"sequence"}},{"kind":"Field","name":{"kind":"Name","value":"group"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"extractImagesImage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Image"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"link"}},{"kind":"Field","name":{"kind":"Name","value":"facet"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SongTitleSong"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Song"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PerformancesSong"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Song"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"performances"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"alias"}},{"kind":"Field","name":{"kind":"Name","value":"as"}},{"kind":"Field","name":{"kind":"Name","value":"relevance"}},{"kind":"Field","name":{"kind":"Name","value":"artist"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"member"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SongTitleWithArtistsSong"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Song"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SongTitleSong"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"PerformancesSong"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"createVideoSlugEntry"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeThemeEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"version"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"createVideoSlugVideo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Video"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tags"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AnimeAwardsPageTheme"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeTheme"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugTheme"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"sequence"}},{"kind":"Field","name":{"kind":"Name","value":"anime"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"extractImagesImage"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"song"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SongTitleWithArtistsSong"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AnimeAwardPageEntry"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeThemeEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugEntry"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"videos"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugVideo"}},{"kind":"Field","name":{"kind":"Name","value":"basename"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}}]}}]}}]}}]} as unknown as DocumentNode<AnimeAwardPageQuery, AnimeAwardPageQueryVariables>;
export const HomePageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"HomePage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"currentfeaturedtheme"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"HomePageFeaturedTheme"}}]}},{"kind":"Field","name":{"kind":"Name","value":"announcementPagination"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"HomePageAnnouncement"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"createVideoSlugEntry"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeThemeEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"version"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"createVideoSlugTheme"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeTheme"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"sequence"}},{"kind":"Field","name":{"kind":"Name","value":"group"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"extractImagesImage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Image"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"link"}},{"kind":"Field","name":{"kind":"Name","value":"facet"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SongTitleSong"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Song"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PerformancesSong"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Song"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"performances"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"alias"}},{"kind":"Field","name":{"kind":"Name","value":"as"}},{"kind":"Field","name":{"kind":"Name","value":"relevance"}},{"kind":"Field","name":{"kind":"Name","value":"artist"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"member"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"VideoSummaryCardEntry"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeThemeEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugEntry"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"animetheme"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugTheme"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"sequence"}},{"kind":"Field","name":{"kind":"Name","value":"group"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}},{"kind":"Field","name":{"kind":"Name","value":"anime"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"extractImagesImage"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"song"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SongTitleSong"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"PerformancesSong"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FeaturedThemeEntry"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeThemeEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"VideoSummaryCardEntry"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugEntry"}},{"kind":"Field","name":{"kind":"Name","value":"animetheme"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugTheme"}},{"kind":"Field","name":{"kind":"Name","value":"anime"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"extractImagesImage"}}]}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"createVideoSlugVideo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Video"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tags"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"VideoSummaryCardVideo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Video"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"basename"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugVideo"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FeaturedThemeVideo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Video"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"VideoSummaryCardVideo"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugVideo"}},{"kind":"Field","name":{"kind":"Name","value":"basename"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"HomePageFeaturedTheme"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FeaturedTheme"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"animethemeentry"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FeaturedThemeEntry"}}]}},{"kind":"Field","name":{"kind":"Name","value":"video"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FeaturedThemeVideo"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"HomePageAnnouncement"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Announcement"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"content"}}]}}]} as unknown as DocumentNode<HomePageQuery, HomePageQueryVariables>;
export const PlaylistDetailPagePlaylistDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PlaylistDetailPagePlaylist"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"playlistId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"playlist"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"playlistId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlaylistDetailPagePlaylist"}},{"kind":"Field","name":{"kind":"Name","value":"tracks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlaylistDetailPageTrack"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"previous"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"next"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlaylistEditDialogPlaylist"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Playlist"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"visibility"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlaylistTrackRemoveToastPlaylist"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Playlist"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlaylistTrackRemoveDialogPlaylist"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Playlist"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlaylistTrackRemoveToastPlaylist"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"createVideoSlugVideo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Video"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tags"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"VideoSummaryCardVideo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Video"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"basename"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugVideo"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FeaturedThemeVideo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Video"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"VideoSummaryCardVideo"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugVideo"}},{"kind":"Field","name":{"kind":"Name","value":"basename"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlaylistTrackAddDialogVideo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Video"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"VideoSummaryCardVideo"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlaylistTrackRemoveDialogVideo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Video"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"VideoSummaryCardVideo"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"createVideoSlugEntry"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeThemeEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"version"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"createVideoSlugTheme"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeTheme"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"sequence"}},{"kind":"Field","name":{"kind":"Name","value":"group"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"extractImagesImage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Image"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"link"}},{"kind":"Field","name":{"kind":"Name","value":"facet"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SongTitleSong"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Song"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PerformancesSong"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Song"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"performances"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"alias"}},{"kind":"Field","name":{"kind":"Name","value":"as"}},{"kind":"Field","name":{"kind":"Name","value":"relevance"}},{"kind":"Field","name":{"kind":"Name","value":"artist"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"member"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"VideoSummaryCardEntry"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeThemeEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugEntry"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"animetheme"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugTheme"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"sequence"}},{"kind":"Field","name":{"kind":"Name","value":"group"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}},{"kind":"Field","name":{"kind":"Name","value":"anime"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"extractImagesImage"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"song"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SongTitleSong"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"PerformancesSong"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FeaturedThemeEntry"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeThemeEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"VideoSummaryCardEntry"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugEntry"}},{"kind":"Field","name":{"kind":"Name","value":"animetheme"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugTheme"}},{"kind":"Field","name":{"kind":"Name","value":"anime"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"extractImagesImage"}}]}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlaylistTrackAddToastEntry"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeThemeEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"animetheme"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"song"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SongTitleSong"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlaylistTrackRemoveToastEntry"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeThemeEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"animetheme"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"song"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SongTitleSong"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlaylistTrackAddDialogEntry"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeThemeEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"VideoSummaryCardEntry"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlaylistTrackAddToastEntry"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlaylistTrackRemoveToastEntry"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlaylistTrackRemoveDialogEntry"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeThemeEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"VideoSummaryCardEntry"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlaylistTrackRemoveToastEntry"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlaylistDetailPagePlaylist"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Playlist"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlaylistEditDialogPlaylist"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlaylistTrackRemoveDialogPlaylist"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"visibility"}},{"kind":"Field","name":{"kind":"Name","value":"tracksCount"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlaylistDetailPageTrack"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PlaylistTrack"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"video"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"VideoSummaryCardVideo"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"FeaturedThemeVideo"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlaylistTrackAddDialogVideo"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlaylistTrackRemoveDialogVideo"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"animethemeentry"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"VideoSummaryCardEntry"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"FeaturedThemeEntry"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlaylistTrackAddDialogEntry"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlaylistTrackRemoveDialogEntry"}},{"kind":"Field","name":{"kind":"Name","value":"animetheme"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"anime"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"season"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"extractImagesImage"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"song"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}}]}}]}}]} as unknown as DocumentNode<PlaylistDetailPagePlaylistQuery, PlaylistDetailPagePlaylistQueryVariables>;
export const PlaylistDetailPageMeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PlaylistDetailPageMe"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlaylistDetailPageMe"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlaylistDetailPageMe"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Me"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]} as unknown as DocumentNode<PlaylistDetailPageMeQuery, PlaylistDetailPageMeQueryVariables>;
export const PlaylistDetailPageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PlaylistDetailPage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"playlistId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"playlist"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"playlistId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlaylistDetailPagePlaylist"}},{"kind":"Field","name":{"kind":"Name","value":"tracks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlaylistDetailPageTrack"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"previous"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"next"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlaylistDetailPageMe"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlaylistEditDialogPlaylist"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Playlist"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"visibility"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlaylistTrackRemoveToastPlaylist"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Playlist"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlaylistTrackRemoveDialogPlaylist"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Playlist"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlaylistTrackRemoveToastPlaylist"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"createVideoSlugVideo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Video"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tags"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"VideoSummaryCardVideo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Video"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"basename"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugVideo"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FeaturedThemeVideo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Video"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"VideoSummaryCardVideo"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugVideo"}},{"kind":"Field","name":{"kind":"Name","value":"basename"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlaylistTrackAddDialogVideo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Video"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"VideoSummaryCardVideo"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlaylistTrackRemoveDialogVideo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Video"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"VideoSummaryCardVideo"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"createVideoSlugEntry"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeThemeEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"version"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"createVideoSlugTheme"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeTheme"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"sequence"}},{"kind":"Field","name":{"kind":"Name","value":"group"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"extractImagesImage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Image"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"link"}},{"kind":"Field","name":{"kind":"Name","value":"facet"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SongTitleSong"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Song"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PerformancesSong"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Song"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"performances"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"alias"}},{"kind":"Field","name":{"kind":"Name","value":"as"}},{"kind":"Field","name":{"kind":"Name","value":"relevance"}},{"kind":"Field","name":{"kind":"Name","value":"artist"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"member"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"VideoSummaryCardEntry"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeThemeEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugEntry"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"animetheme"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugTheme"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"sequence"}},{"kind":"Field","name":{"kind":"Name","value":"group"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}},{"kind":"Field","name":{"kind":"Name","value":"anime"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"extractImagesImage"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"song"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SongTitleSong"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"PerformancesSong"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FeaturedThemeEntry"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeThemeEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"VideoSummaryCardEntry"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugEntry"}},{"kind":"Field","name":{"kind":"Name","value":"animetheme"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugTheme"}},{"kind":"Field","name":{"kind":"Name","value":"anime"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"extractImagesImage"}}]}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlaylistTrackAddToastEntry"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeThemeEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"animetheme"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"song"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SongTitleSong"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlaylistTrackRemoveToastEntry"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeThemeEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"animetheme"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"song"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SongTitleSong"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlaylistTrackAddDialogEntry"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeThemeEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"VideoSummaryCardEntry"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlaylistTrackAddToastEntry"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlaylistTrackRemoveToastEntry"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlaylistTrackRemoveDialogEntry"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeThemeEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"VideoSummaryCardEntry"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlaylistTrackRemoveToastEntry"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlaylistDetailPagePlaylist"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Playlist"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlaylistEditDialogPlaylist"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlaylistTrackRemoveDialogPlaylist"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"visibility"}},{"kind":"Field","name":{"kind":"Name","value":"tracksCount"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlaylistDetailPageTrack"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PlaylistTrack"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"video"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"VideoSummaryCardVideo"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"FeaturedThemeVideo"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlaylistTrackAddDialogVideo"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlaylistTrackRemoveDialogVideo"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"animethemeentry"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"VideoSummaryCardEntry"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"FeaturedThemeEntry"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlaylistTrackAddDialogEntry"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlaylistTrackRemoveDialogEntry"}},{"kind":"Field","name":{"kind":"Name","value":"animetheme"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"anime"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"season"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"extractImagesImage"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"song"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlaylistDetailPageMe"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Me"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]} as unknown as DocumentNode<PlaylistDetailPageQuery, PlaylistDetailPageQueryVariables>;
export const GalleryPageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GalleryPage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"grills"},"name":{"kind":"Name","value":"imagePagination"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"facet"},"value":{"kind":"EnumValue","value":"GRILL"}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"link"}}]}}]}}]}}]} as unknown as DocumentNode<GalleryPageQuery, GalleryPageQueryVariables>;
export const ProfilePageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ProfilePage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ProfilePageMe"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProfileImageUser"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Me"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlaylistSummaryCardPlaylist"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Playlist"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"visibilityLocalized"}},{"kind":"Field","name":{"kind":"Name","value":"tracksCount"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlaylistRemoveToastPlaylist"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Playlist"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlaylistRemoveDialogPlaylist"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Playlist"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlaylistSummaryCardPlaylist"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlaylistRemoveToastPlaylist"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProfilePageMe"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Me"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ProfileImageUser"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"emailVerifiedAt"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"roles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"priority"}},{"kind":"Field","name":{"kind":"Name","value":"default"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"playlists"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"sort"},"value":{"kind":"ListValue","values":[{"kind":"EnumValue","value":"CREATED_AT_DESC"}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlaylistSummaryCardPlaylist"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlaylistRemoveDialogPlaylist"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<ProfilePageQuery, ProfilePageQueryVariables>;
export const SeriesDetailPageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SeriesDetailPage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"seriesSlug"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"series"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"slug"},"value":{"kind":"Variable","name":{"kind":"Name","value":"seriesSlug"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SeriesDetailPageSeries"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"extractImagesImage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Image"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"link"}},{"kind":"Field","name":{"kind":"Name","value":"facet"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AnimeSummaryCardAnime"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Anime"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"season"}},{"kind":"Field","name":{"kind":"Name","value":"seasonLocalized"}},{"kind":"Field","name":{"kind":"Name","value":"formatLocalized"}},{"kind":"Field","name":{"kind":"Name","value":"animethemes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"group"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"extractImagesImage"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"createVideoSlugTheme"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeTheme"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"sequence"}},{"kind":"Field","name":{"kind":"Name","value":"group"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"createVideoSlugEntry"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeThemeEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"version"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EpisodeTagEntry"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeThemeEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"episodes"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ContentWarningTagsEntry"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeThemeEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"spoiler"}},{"kind":"Field","name":{"kind":"Name","value":"nsfw"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"createVideoSlugVideo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Video"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tags"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"VideoTagsVideo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Video"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"resolution"}},{"kind":"Field","name":{"kind":"Name","value":"nc"}},{"kind":"Field","name":{"kind":"Name","value":"subbed"}},{"kind":"Field","name":{"kind":"Name","value":"lyrics"}},{"kind":"Field","name":{"kind":"Name","value":"uncen"}},{"kind":"Field","name":{"kind":"Name","value":"source"}},{"kind":"Field","name":{"kind":"Name","value":"overlap"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SongTitleSong"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Song"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ThemeTableTheme"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeTheme"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugTheme"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"sequence"}},{"kind":"Field","name":{"kind":"Name","value":"anime"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}},{"kind":"Field","name":{"kind":"Name","value":"animethemeentries"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugEntry"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"EpisodeTagEntry"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContentWarningTagsEntry"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"videos"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugVideo"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"VideoTagsVideo"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"song"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SongTitleSong"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AnimeSummaryCardAnimeExpandable"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Anime"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"animethemes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ThemeTableTheme"}},{"kind":"Field","name":{"kind":"Name","value":"group"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SeriesDetailPageSeries"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Series"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"anime"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AnimeSummaryCardAnime"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AnimeSummaryCardAnimeExpandable"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"season"}},{"kind":"Field","name":{"kind":"Name","value":"animethemes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"sequence"}},{"kind":"Field","name":{"kind":"Name","value":"animethemeentries"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"videos"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tags"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"extractImagesImage"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<SeriesDetailPageQuery, SeriesDetailPageQueryVariables>;
export const SeriesDetailPageAllDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SeriesDetailPageAll"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"seriesPagination"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SeriesDetailPageSeries"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"extractImagesImage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Image"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"link"}},{"kind":"Field","name":{"kind":"Name","value":"facet"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AnimeSummaryCardAnime"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Anime"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"season"}},{"kind":"Field","name":{"kind":"Name","value":"seasonLocalized"}},{"kind":"Field","name":{"kind":"Name","value":"formatLocalized"}},{"kind":"Field","name":{"kind":"Name","value":"animethemes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"group"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"extractImagesImage"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"createVideoSlugTheme"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeTheme"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"sequence"}},{"kind":"Field","name":{"kind":"Name","value":"group"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"createVideoSlugEntry"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeThemeEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"version"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EpisodeTagEntry"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeThemeEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"episodes"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ContentWarningTagsEntry"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeThemeEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"spoiler"}},{"kind":"Field","name":{"kind":"Name","value":"nsfw"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"createVideoSlugVideo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Video"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tags"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"VideoTagsVideo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Video"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"resolution"}},{"kind":"Field","name":{"kind":"Name","value":"nc"}},{"kind":"Field","name":{"kind":"Name","value":"subbed"}},{"kind":"Field","name":{"kind":"Name","value":"lyrics"}},{"kind":"Field","name":{"kind":"Name","value":"uncen"}},{"kind":"Field","name":{"kind":"Name","value":"source"}},{"kind":"Field","name":{"kind":"Name","value":"overlap"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SongTitleSong"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Song"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ThemeTableTheme"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeTheme"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugTheme"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"sequence"}},{"kind":"Field","name":{"kind":"Name","value":"anime"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}},{"kind":"Field","name":{"kind":"Name","value":"animethemeentries"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugEntry"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"EpisodeTagEntry"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContentWarningTagsEntry"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"videos"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugVideo"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"VideoTagsVideo"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"song"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SongTitleSong"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AnimeSummaryCardAnimeExpandable"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Anime"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"animethemes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ThemeTableTheme"}},{"kind":"Field","name":{"kind":"Name","value":"group"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SeriesDetailPageSeries"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Series"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"anime"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AnimeSummaryCardAnime"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AnimeSummaryCardAnimeExpandable"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"season"}},{"kind":"Field","name":{"kind":"Name","value":"animethemes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"sequence"}},{"kind":"Field","name":{"kind":"Name","value":"animethemeentries"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"videos"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tags"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"extractImagesImage"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<SeriesDetailPageAllQuery, SeriesDetailPageAllQueryVariables>;
export const SeriesIndexPageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SeriesIndexPage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"seriesPagination"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"sort"},"value":{"kind":"EnumValue","value":"NAME"}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<SeriesIndexPageQuery, SeriesIndexPageQueryVariables>;
export const StudioDetailPageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"StudioDetailPage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"studioSlug"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"studio"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"slug"},"value":{"kind":"Variable","name":{"kind":"Name","value":"studioSlug"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"StudioDetailPageStudio"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"extractImagesImage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Image"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"link"}},{"kind":"Field","name":{"kind":"Name","value":"facet"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"StudioCoverImageStudio"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Studio"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"extractImagesImage"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"anime"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"extractImagesImage"}}]}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AnimeSummaryCardAnime"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Anime"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"season"}},{"kind":"Field","name":{"kind":"Name","value":"seasonLocalized"}},{"kind":"Field","name":{"kind":"Name","value":"formatLocalized"}},{"kind":"Field","name":{"kind":"Name","value":"animethemes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"group"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"extractImagesImage"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"createVideoSlugTheme"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeTheme"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"sequence"}},{"kind":"Field","name":{"kind":"Name","value":"group"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"createVideoSlugEntry"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeThemeEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"version"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EpisodeTagEntry"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeThemeEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"episodes"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ContentWarningTagsEntry"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeThemeEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"spoiler"}},{"kind":"Field","name":{"kind":"Name","value":"nsfw"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"createVideoSlugVideo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Video"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tags"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"VideoTagsVideo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Video"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"resolution"}},{"kind":"Field","name":{"kind":"Name","value":"nc"}},{"kind":"Field","name":{"kind":"Name","value":"subbed"}},{"kind":"Field","name":{"kind":"Name","value":"lyrics"}},{"kind":"Field","name":{"kind":"Name","value":"uncen"}},{"kind":"Field","name":{"kind":"Name","value":"source"}},{"kind":"Field","name":{"kind":"Name","value":"overlap"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SongTitleSong"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Song"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ThemeTableTheme"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeTheme"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugTheme"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"sequence"}},{"kind":"Field","name":{"kind":"Name","value":"anime"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}},{"kind":"Field","name":{"kind":"Name","value":"animethemeentries"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugEntry"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"EpisodeTagEntry"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContentWarningTagsEntry"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"videos"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugVideo"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"VideoTagsVideo"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"song"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SongTitleSong"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AnimeSummaryCardAnimeExpandable"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Anime"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"animethemes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ThemeTableTheme"}},{"kind":"Field","name":{"kind":"Name","value":"group"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"StudioDetailPageStudio"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Studio"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"StudioCoverImageStudio"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"anime"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AnimeSummaryCardAnime"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AnimeSummaryCardAnimeExpandable"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"season"}},{"kind":"Field","name":{"kind":"Name","value":"animethemes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"sequence"}},{"kind":"Field","name":{"kind":"Name","value":"animethemeentries"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"videos"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tags"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"facet"}},{"kind":"Field","name":{"kind":"Name","value":"link"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"resources"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"as"}},{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"link"}},{"kind":"Field","name":{"kind":"Name","value":"site"}},{"kind":"Field","name":{"kind":"Name","value":"siteLocalized"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"extractImagesImage"}}]}}]}}]}}]} as unknown as DocumentNode<StudioDetailPageQuery, StudioDetailPageQueryVariables>;
export const StudioDetailPageAllDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"StudioDetailPageAll"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"studioPagination"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"StudioDetailPageStudio"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"extractImagesImage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Image"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"link"}},{"kind":"Field","name":{"kind":"Name","value":"facet"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"StudioCoverImageStudio"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Studio"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"extractImagesImage"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"anime"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"extractImagesImage"}}]}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AnimeSummaryCardAnime"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Anime"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"season"}},{"kind":"Field","name":{"kind":"Name","value":"seasonLocalized"}},{"kind":"Field","name":{"kind":"Name","value":"formatLocalized"}},{"kind":"Field","name":{"kind":"Name","value":"animethemes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"group"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"extractImagesImage"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"createVideoSlugTheme"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeTheme"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"sequence"}},{"kind":"Field","name":{"kind":"Name","value":"group"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"createVideoSlugEntry"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeThemeEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"version"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EpisodeTagEntry"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeThemeEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"episodes"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ContentWarningTagsEntry"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeThemeEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"spoiler"}},{"kind":"Field","name":{"kind":"Name","value":"nsfw"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"createVideoSlugVideo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Video"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tags"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"VideoTagsVideo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Video"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"resolution"}},{"kind":"Field","name":{"kind":"Name","value":"nc"}},{"kind":"Field","name":{"kind":"Name","value":"subbed"}},{"kind":"Field","name":{"kind":"Name","value":"lyrics"}},{"kind":"Field","name":{"kind":"Name","value":"uncen"}},{"kind":"Field","name":{"kind":"Name","value":"source"}},{"kind":"Field","name":{"kind":"Name","value":"overlap"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SongTitleSong"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Song"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ThemeTableTheme"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeTheme"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugTheme"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"sequence"}},{"kind":"Field","name":{"kind":"Name","value":"anime"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}},{"kind":"Field","name":{"kind":"Name","value":"animethemeentries"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugEntry"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"EpisodeTagEntry"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContentWarningTagsEntry"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"videos"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugVideo"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"VideoTagsVideo"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"song"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SongTitleSong"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AnimeSummaryCardAnimeExpandable"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Anime"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"animethemes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ThemeTableTheme"}},{"kind":"Field","name":{"kind":"Name","value":"group"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"StudioDetailPageStudio"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Studio"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"StudioCoverImageStudio"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"anime"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AnimeSummaryCardAnime"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AnimeSummaryCardAnimeExpandable"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"season"}},{"kind":"Field","name":{"kind":"Name","value":"animethemes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"sequence"}},{"kind":"Field","name":{"kind":"Name","value":"animethemeentries"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"videos"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tags"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"facet"}},{"kind":"Field","name":{"kind":"Name","value":"link"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"resources"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"as"}},{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"link"}},{"kind":"Field","name":{"kind":"Name","value":"site"}},{"kind":"Field","name":{"kind":"Name","value":"siteLocalized"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"extractImagesImage"}}]}}]}}]}}]} as unknown as DocumentNode<StudioDetailPageAllQuery, StudioDetailPageAllQueryVariables>;
export const StudioIndexPageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"StudioIndexPage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"studioPagination"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"sort"},"value":{"kind":"EnumValue","value":"NAME"}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<StudioIndexPageQuery, StudioIndexPageQueryVariables>;
export const SeasonDetailPageAllDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SeasonDetailPageAll"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"animeyears"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"seasons"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"season"}}]}}]}}]}}]} as unknown as DocumentNode<SeasonDetailPageAllQuery, SeasonDetailPageAllQueryVariables>;
export const SeasonDetailPageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SeasonDetailPage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"year"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"season"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeSeason"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"animeyear"},"name":{"kind":"Name","value":"animeyears"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"year"},"value":{"kind":"ListValue","values":[{"kind":"Variable","name":{"kind":"Name","value":"year"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SeasonDetailPageYear"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"YearNavigationYear"}},{"kind":"Field","name":{"kind":"Name","value":"season"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"season"},"value":{"kind":"Variable","name":{"kind":"Name","value":"season"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SeasonDetailPageSeason"}}]}},{"kind":"Field","name":{"kind":"Name","value":"seasons"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"season"}},{"kind":"Field","name":{"kind":"Name","value":"seasonLocalized"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"animeyears"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"YearNavigationYears"}},{"kind":"Field","name":{"kind":"Name","value":"year"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SeasonNavigationYear"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeYear"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"seasons"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"season"}},{"kind":"Field","name":{"kind":"Name","value":"seasonLocalized"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SeasonNavigationSeason"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeYearSeason"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"season"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"extractImagesImage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Image"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"link"}},{"kind":"Field","name":{"kind":"Name","value":"facet"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AnimeSummaryCardAnime"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Anime"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"season"}},{"kind":"Field","name":{"kind":"Name","value":"seasonLocalized"}},{"kind":"Field","name":{"kind":"Name","value":"formatLocalized"}},{"kind":"Field","name":{"kind":"Name","value":"animethemes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"group"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"extractImagesImage"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"createVideoSlugTheme"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeTheme"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"sequence"}},{"kind":"Field","name":{"kind":"Name","value":"group"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"createVideoSlugEntry"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeThemeEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"version"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EpisodeTagEntry"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeThemeEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"episodes"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ContentWarningTagsEntry"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeThemeEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"spoiler"}},{"kind":"Field","name":{"kind":"Name","value":"nsfw"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"createVideoSlugVideo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Video"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tags"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"VideoTagsVideo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Video"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"resolution"}},{"kind":"Field","name":{"kind":"Name","value":"nc"}},{"kind":"Field","name":{"kind":"Name","value":"subbed"}},{"kind":"Field","name":{"kind":"Name","value":"lyrics"}},{"kind":"Field","name":{"kind":"Name","value":"uncen"}},{"kind":"Field","name":{"kind":"Name","value":"source"}},{"kind":"Field","name":{"kind":"Name","value":"overlap"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SongTitleSong"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Song"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ThemeTableTheme"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeTheme"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugTheme"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"sequence"}},{"kind":"Field","name":{"kind":"Name","value":"anime"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}},{"kind":"Field","name":{"kind":"Name","value":"animethemeentries"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugEntry"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"EpisodeTagEntry"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContentWarningTagsEntry"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"videos"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugVideo"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"VideoTagsVideo"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"song"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SongTitleSong"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AnimeSummaryCardAnimeExpandable"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Anime"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"animethemes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ThemeTableTheme"}},{"kind":"Field","name":{"kind":"Name","value":"group"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SeasonDetailPageYear"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeYear"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SeasonNavigationYear"}},{"kind":"Field","name":{"kind":"Name","value":"year"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"YearNavigationYear"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeYear"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"seasons"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"season"}},{"kind":"Field","name":{"kind":"Name","value":"seasonLocalized"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SeasonDetailPageSeason"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeYearSeason"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SeasonNavigationSeason"}},{"kind":"Field","name":{"kind":"Name","value":"season"}},{"kind":"Field","name":{"kind":"Name","value":"seasonLocalized"}},{"kind":"Field","name":{"kind":"Name","value":"anime"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AnimeSummaryCardAnime"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AnimeSummaryCardAnimeExpandable"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"YearNavigationYears"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeYear"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"year"}}]}}]} as unknown as DocumentNode<SeasonDetailPageQuery, SeasonDetailPageQueryVariables>;
export const YearDetailPageAllDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"YearDetailPageAll"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"animeyears"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"year"}}]}}]}}]} as unknown as DocumentNode<YearDetailPageAllQuery, YearDetailPageAllQueryVariables>;
export const YearDetailPageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"YearDetailPage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"year"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"animeyear"},"name":{"kind":"Name","value":"animeyears"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"year"},"value":{"kind":"ListValue","values":[{"kind":"Variable","name":{"kind":"Name","value":"year"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SeasonDetailPageYear"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"YearNavigationYear"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"seasons"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"season"}},{"kind":"Field","name":{"kind":"Name","value":"seasonLocalized"}},{"kind":"Field","name":{"kind":"Name","value":"anime"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"sort"},"value":{"kind":"EnumValue","value":"NAME"}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"3"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"data"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SeasonPreviewAnime"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"animeyears"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"YearNavigationYears"}},{"kind":"Field","name":{"kind":"Name","value":"year"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SeasonNavigationYear"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeYear"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"seasons"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"season"}},{"kind":"Field","name":{"kind":"Name","value":"seasonLocalized"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"extractImagesImage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Image"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"link"}},{"kind":"Field","name":{"kind":"Name","value":"facet"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AnimeSummaryCardAnime"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Anime"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"season"}},{"kind":"Field","name":{"kind":"Name","value":"seasonLocalized"}},{"kind":"Field","name":{"kind":"Name","value":"formatLocalized"}},{"kind":"Field","name":{"kind":"Name","value":"animethemes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"group"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"extractImagesImage"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"createVideoSlugTheme"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeTheme"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"sequence"}},{"kind":"Field","name":{"kind":"Name","value":"group"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"createVideoSlugEntry"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeThemeEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"version"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EpisodeTagEntry"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeThemeEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"episodes"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ContentWarningTagsEntry"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeThemeEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"spoiler"}},{"kind":"Field","name":{"kind":"Name","value":"nsfw"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"createVideoSlugVideo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Video"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tags"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"VideoTagsVideo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Video"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"resolution"}},{"kind":"Field","name":{"kind":"Name","value":"nc"}},{"kind":"Field","name":{"kind":"Name","value":"subbed"}},{"kind":"Field","name":{"kind":"Name","value":"lyrics"}},{"kind":"Field","name":{"kind":"Name","value":"uncen"}},{"kind":"Field","name":{"kind":"Name","value":"source"}},{"kind":"Field","name":{"kind":"Name","value":"overlap"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SongTitleSong"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Song"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ThemeTableTheme"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeTheme"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugTheme"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"sequence"}},{"kind":"Field","name":{"kind":"Name","value":"anime"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}},{"kind":"Field","name":{"kind":"Name","value":"animethemeentries"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugEntry"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"EpisodeTagEntry"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ContentWarningTagsEntry"}},{"kind":"Field","name":{"kind":"Name","value":"version"}},{"kind":"Field","name":{"kind":"Name","value":"videos"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"createVideoSlugVideo"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"VideoTagsVideo"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"song"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SongTitleSong"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AnimeSummaryCardAnimeExpandable"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Anime"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"animethemes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ThemeTableTheme"}},{"kind":"Field","name":{"kind":"Name","value":"group"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SeasonDetailPageYear"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeYear"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SeasonNavigationYear"}},{"kind":"Field","name":{"kind":"Name","value":"year"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"YearNavigationYear"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeYear"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"seasons"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"season"}},{"kind":"Field","name":{"kind":"Name","value":"seasonLocalized"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SeasonPreviewAnime"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Anime"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AnimeSummaryCardAnime"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AnimeSummaryCardAnimeExpandable"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"YearNavigationYears"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnimeYear"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"year"}}]}}]} as unknown as DocumentNode<YearDetailPageQuery, YearDetailPageQueryVariables>;
export const YearIndexPageDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"YearIndexPage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"animeyears"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"seasons"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"season"}},{"kind":"Field","name":{"kind":"Name","value":"seasonLocalized"}}]}}]}}]}}]} as unknown as DocumentNode<YearIndexPageQuery, YearIndexPageQueryVariables>;