import type { Resolvers } from "@/generated/graphql-resolvers";
import {
    createApiResolver,
    createApiResolverNotNull,
    createApiResolverPaginated,
    INCLUDES,
    transformedResolver,
} from "@/lib/common/animethemes/api";
import type {
    ApiAnimeIndex,
    ApiAnimeShow,
    ApiAnnouncementIndex,
    ApiArtistIndex,
    ApiArtistShow,
    ApiAudioShow,
    ApiDumpIndex,
    ApiEntryShow,
    ApiExternalProfileEntryShow,
    ApiExternalProfileIndex,
    ApiExternalProfileShow,
    ApiFeaturedThemeShow,
    ApiImageIndex,
    ApiPageIndex,
    ApiPageShow,
    ApiPlaylistIndex,
    ApiPlaylistShow,
    ApiPlaylistTrackIndex,
    ApiPlaylistTrackShow,
    ApiSeriesIndex,
    ApiSeriesShow,
    ApiSongShow,
    ApiStudioIndex,
    ApiStudioShow,
    ApiThemeIndex,
    ApiThemeShow,
    ApiUserShow,
    ApiVideoIndex,
    ApiVideoShow,
    ApiYearIndex,
    ApiYearShow,
} from "@/lib/common/animethemes/types";

const resolvers: Resolvers = {
    Query: {
        anime: createApiResolver<ApiAnimeShow>()({
            endpoint: (_, { slug }) => `/anime/${slug}?fields[playlist]=id,name,visibility,tracks_count`,
            extractFromResponse: (response) => response.anime,
        }),
        animeAll: createApiResolverPaginated<ApiAnimeIndex>()({
            endpoint: () => `/anime?fields[playlist]=id,name,visibility,tracks_count`,
            extractFromResponse: (response) => response.anime,
        }),
        theme: createApiResolver<ApiThemeShow>()({
            endpoint: (_, { id }) => `/animetheme/${id}`,
            extractFromResponse: (response) => response.animetheme,
        }),
        themeAll: createApiResolverPaginated<ApiThemeIndex>()({
            endpoint: (_, { orderBy, orderDesc, has }) =>
                `/animetheme?sort=${orderDesc ? "-" : ""}${orderBy}&filter[has]=${has}`,
            extractFromResponse: (response) => response.animethemes,
        }),
        artist: createApiResolver<ApiArtistShow>()({
            endpoint: (_, { slug }) => `/artist/${slug}`,
            extractFromResponse: (response) => response.artist,
        }),
        artistAll: createApiResolverPaginated<ApiArtistIndex>()({
            endpoint: () => `/artist`,
            extractFromResponse: (response) => response.artists,
        }),
        series: createApiResolver<ApiSeriesShow>()({
            endpoint: (_, { slug }) => `/series/${slug}`,
            extractFromResponse: (response) => response.series,
        }),
        seriesAll: createApiResolverPaginated<ApiSeriesIndex>()({
            endpoint: () => `/series`,
            extractFromResponse: (response) => response.series,
        }),
        studio: createApiResolver<ApiStudioShow>()({
            endpoint: (_, { slug }) => `/studio/${slug}`,
            extractFromResponse: (response) => response.studio,
        }),
        studioAll: createApiResolverPaginated<ApiStudioIndex>()({
            endpoint: () => `/studio`,
            extractFromResponse: (response) => response.studios,
        }),
        videoAll: createApiResolverPaginated<ApiVideoIndex>()({
            endpoint: (_, { orderBy, orderDesc }) => `/video?sort=${orderDesc ? "-" : ""}${orderBy}`,
            extractFromResponse: (response) => response.videos,
        }),
        year: (_, { value }) => ({ value }),
        yearAll: createApiResolverNotNull<ApiYearIndex>()({
            endpoint: () => `/animeyear`,
            extractFromResponse: (yearList) => yearList.map((year) => ({ value: year })),
        }),
        season: (_, { year, value }) => ({ value, year: { value: year } }),
        page: createApiResolver<ApiPageShow>()({
            endpoint: (_, { slug }) => `/page/${slug}?fields[page]=id,slug,name,body,created_at`,
            extractFromResponse: (response) => response.page,
        }),
        pageAll: createApiResolverPaginated<ApiPageIndex>()({
            endpoint: () => `/page?fields[page]=id,slug,name,body,created_at`,
            extractFromResponse: (response) => response.pages,
        }),
        imageAll: createApiResolverPaginated<ApiImageIndex>()({
            endpoint: (_, { facet }) => `/image?${facet ? `filter[facet]=${facet}` : ``}`,
            extractFromResponse: (response) => response.images,
        }),
        featuredTheme: createApiResolver<ApiFeaturedThemeShow>()({
            endpoint: () => `/current/featuredtheme`,
            extractFromResponse: (response) => response.featuredtheme,
        }),
        dumpAll: createApiResolverPaginated<ApiDumpIndex>()({
            endpoint: () => `/dump?fields[dump]=id,path,link,created_at`,
            extractFromResponse: (response) => response.dumps,
        }),
        announcementAll: createApiResolverPaginated<ApiAnnouncementIndex>()({
            endpoint: () => `/announcement`,
            extractFromResponse: (response) => response.announcements,
        }),
        playlist: createApiResolver<ApiPlaylistShow>()({
            endpoint: (_, { id }) => `/playlist/${id}?fields[playlist]=id,name,description,visibility,tracks_count`,
            extractFromResponse: (response) => response.playlist,
        }),
        playlistAll: createApiResolverPaginated<ApiPlaylistIndex>()({
            endpoint: (_, { orderBy, orderDesc, onlyNonEmpty }) =>
                `/playlist?sort=${orderDesc ? "-" : ""}${orderBy}&fields[playlist]=id,name,description,visibility,tracks_count${onlyNonEmpty ? "&filter[playlist][tracks_count-gte]=1" : ""}`,
            extractFromResponse: (response) => response.playlists,
        }),
        externalProfile: createApiResolver<ApiExternalProfileShow>()({
            endpoint: (_, { id }) => `/externalprofile/${id}`,
            extractFromResponse: (response) => response.externalprofile,
        }),
        externalProfileAll: createApiResolverPaginated<ApiExternalProfileIndex>()({
            endpoint: (_, { name, site }) =>
                `/externalprofile?filter[externalprofile][name]=${name}&filter[externalprofile][site]=${site}`,
            extractFromResponse: (response) => response.externalprofiles,
        }),
        me: () => ({}),
    },
    UserScopedQuery: {
        user: createApiResolver<ApiUserShow>()({
            endpoint: () => `/me?fields[user]=id,name,email,email_verified_at,created_at`,
            extractFromResponse: (response) => response.user,
        }),
        playlistAll: createApiResolverPaginated<ApiPlaylistIndex>()({
            endpoint: (_, { filterVideoId }) =>
                `/me/playlist?fields[playlist]=id,name,visibility,tracks_count${filterVideoId ? `&filter[track][video_id]=${filterVideoId}` : ``}`,
            extractFromResponse: (response) => response.playlists,
        }),
    },
    Year: {
        seasons: createApiResolverNotNull<ApiYearShow>()({
            endpoint: (year) => `/animeyear/${year.value}`,
            extractFromResponse: (response, year) => Object.keys(response).map((season) => ({ value: season, year })),
        }),
    },
    Season: {
        anime: createApiResolverPaginated<ApiAnimeIndex>()({
            endpoint: (season) => `/anime?filter[year]=${season.year.value}&filter[season]=${season.value}`,
            extractFromResponse: (response) => response.anime,
            type: "Anime",
        }),
    },
    Anime: {
        synonyms: createApiResolverNotNull<ApiAnimeShow<"animesynonyms">>()({
            extractFromParent: (anime) => anime.animesynonyms,
            endpoint: (anime) => `/anime/${anime.slug}`,
            extractFromResponse: (response) => response.anime.animesynonyms,
            type: "Anime",
            baseInclude: INCLUDES.Anime.synonyms,
        }),
        themes: transformedResolver(
            createApiResolverNotNull<ApiAnimeShow<"animethemes">>()({
                extractFromParent: (anime) => anime.animethemes,
                endpoint: (anime) => `/anime/${anime.slug}`,
                extractFromResponse: (response) => response.anime.animethemes,
                type: "Anime",
                baseInclude: INCLUDES.Anime.themes,
            }),
            (themes, anime) => themes.map((theme) => ({ ...theme, anime })),
        ),
        series: createApiResolverNotNull<ApiAnimeShow<"series">>()({
            extractFromParent: (anime) => anime.series,
            endpoint: (anime) => `/anime/${anime.slug}`,
            extractFromResponse: (response) => response.anime.series,
            type: "Anime",
            baseInclude: INCLUDES.Anime.series,
        }),
        studios: createApiResolverNotNull<ApiAnimeShow<"studios">>()({
            extractFromParent: (anime) => anime.studios,
            endpoint: (anime) => `/anime/${anime.slug}`,
            extractFromResponse: (response) => response.anime.studios,
            type: "Anime",
            baseInclude: INCLUDES.Anime.studios,
        }),
        resources: transformedResolver(
            createApiResolverNotNull<ApiAnimeShow<"resources">>()({
                extractFromParent: (anime) => anime.resources,
                endpoint: (anime) => `/anime/${anime.slug}`,
                extractFromResponse: (response) => response.anime.resources,
                type: "Anime",
                baseInclude: INCLUDES.Anime.resources,
            }),
            (resources) => resources.map(({ animeresource, ...resource }) => ({ ...animeresource, ...resource })),
        ),
        images: createApiResolverNotNull<ApiAnimeShow<"images">>()({
            extractFromParent: (anime) => anime.images,
            endpoint: (anime) => `/anime/${anime.slug}`,
            extractFromResponse: (response) => response.anime.images,
            type: "Anime",
            baseInclude: INCLUDES.Anime.images,
        }),
    },
    Theme: {
        sequence: (theme) => theme.sequence || 0,
        song: createApiResolver<ApiThemeShow<"song">>()({
            extractFromParent: (theme) => theme.song,
            endpoint: (theme) => `/animetheme/${theme.id}`,
            extractFromResponse: (response) => response.animetheme.song,
            type: "Theme",
            baseInclude: INCLUDES.Theme.song,
        }),
        group: createApiResolver<ApiThemeShow<"group">>()({
            extractFromParent: (theme) => theme.group,
            endpoint: (theme) => `/animetheme/${theme.id}`,
            extractFromResponse: (response) => response.animetheme.group,
            type: "Theme",
            baseInclude: INCLUDES.Theme.group,
        }),
        anime: createApiResolverNotNull<ApiThemeShow<"anime">>()({
            extractFromParent: (theme) => theme.anime,
            endpoint: (theme) => `/animetheme/${theme.id}`,
            extractFromResponse: (response) => response.animetheme.anime,
            type: "Theme",
            baseInclude: INCLUDES.Theme.anime,
        }),
        entries: createApiResolverNotNull<ApiThemeShow<"animethemeentries">>()({
            extractFromParent: (theme) => theme.animethemeentries,
            endpoint: (theme) => `/animetheme/${theme.id}`,
            extractFromResponse: (response) => response.animetheme.animethemeentries,
            type: "Theme",
            baseInclude: INCLUDES.Theme.entries,
        }),
    },
    Artist: {
        performances: transformedResolver(
            createApiResolverNotNull<ApiArtistShow<"songs">>()({
                extractFromParent: (artist) => artist.songs,
                endpoint: (artist) => `/artist/${artist.slug}`,
                extractFromResponse: (response) => response.artist.songs,
                type: "Artist",
                baseInclude: INCLUDES.Artist.performances,
            }),
            (songs, artist) => songs.map((song) => ({ ...song.artistsong, song, artist })),
        ),
        resources: transformedResolver(
            createApiResolverNotNull<ApiArtistShow<"resources">>()({
                extractFromParent: (artist) => artist.resources,
                endpoint: (artist) => `/artist/${artist.slug}`,
                extractFromResponse: (response) => response.artist.resources,
                type: "Artist",
                baseInclude: INCLUDES.Artist.resources,
            }),
            (resources) => resources.map(({ artistresource, ...resource }) => ({ ...artistresource, ...resource })),
        ),
        images: transformedResolver(
            createApiResolverNotNull<ApiArtistShow<"images">>()({
                extractFromParent: (artist) => artist.images,
                endpoint: (artist) => `/artist/${artist.slug}`,
                extractFromResponse: (response) => response.artist.images,
                type: "Artist",
                baseInclude: INCLUDES.Artist.images,
            }),
            (images) => images.map(({ artistimage, ...image }) => ({ ...artistimage, ...image })),
        ),
        groups: transformedResolver(
            createApiResolverNotNull<ApiArtistShow<"groups">>()({
                extractFromParent: (artist) => artist.groups,
                endpoint: (artist) => `/artist/${artist.slug}`,
                extractFromResponse: (response) => response.artist.groups,
                type: "Artist",
                baseInclude: INCLUDES.Artist.groups,
            }),
            (groups, artist) => groups.map((group) => ({ ...group.artistmember, group, member: artist })),
        ),
        members: transformedResolver(
            createApiResolverNotNull<ApiArtistShow<"members">>()({
                extractFromParent: (artist) => artist.members,
                endpoint: (artist) => `/artist/${artist.slug}`,
                extractFromResponse: (response) => response.artist.members,
                type: "Artist",
                baseInclude: INCLUDES.Artist.members,
            }),
            (members, artist) => members.map((member) => ({ ...member.artistmember, member, group: artist })),
        ),
    },
    Song: {
        themes: createApiResolverNotNull<ApiSongShow<"animethemes">>()({
            extractFromParent: (song) => song.animethemes,
            endpoint: (song) => `/song/${song.id}`,
            extractFromResponse: (response) => response.song.animethemes,
            type: "Song",
            baseInclude: INCLUDES.Song.themes,
        }),
        performances: transformedResolver(
            createApiResolverNotNull<ApiSongShow<"artists">>()({
                extractFromParent: (song) => song.artists,
                endpoint: (song) => `/song/${song.id}`,
                extractFromResponse: (response) => response.song.artists,
                type: "Song",
                baseInclude: INCLUDES.Song.performances,
            }),
            (artists, song) => artists.map((artist) => ({ ...artist.artistsong, artist, song })),
        ),
    },
    Entry: {
        version: (entry) => entry.version || 1,
        videos: createApiResolverNotNull<ApiEntryShow<"videos">>()({
            extractFromParent: (entry) => entry.videos,
            endpoint: (entry) => `/animethemeentry/${entry.id}`,
            extractFromResponse: (response) => response.animethemeentry.videos,
            type: "Entry",
            baseInclude: INCLUDES.Entry.videos,
        }),
        theme: createApiResolverNotNull<ApiEntryShow<"animetheme">>()({
            extractFromParent: (entry) => entry.animetheme,
            endpoint: (entry) => `/animethemeentry/${entry.id}`,
            extractFromResponse: (response) => response.animethemeentry.animetheme,
            type: "Entry",
            baseInclude: INCLUDES.Entry.theme,
        }),
    },
    Video: {
        audio: createApiResolverNotNull<ApiVideoShow<"audio">>()({
            extractFromParent: (video) => video.audio,
            endpoint: (video) => `/video/${video.basename}`,
            extractFromResponse: (response) => response.video.audio,
            type: "Video",
            baseInclude: INCLUDES.Video.audio,
        }),
        script: createApiResolver<ApiVideoShow<"videoscript">>()({
            extractFromParent: (video) => video.videoscript,
            endpoint: (video) => `/video/${video.basename}`,
            extractFromResponse: (response) => response.video.videoscript,
            type: "Video",
            baseInclude: INCLUDES.Video.script,
        }),
        entries: createApiResolverNotNull<ApiVideoShow<"animethemeentries">>()({
            extractFromParent: (video) => video.animethemeentries,
            endpoint: (video) => `/video/${video.basename}`,
            extractFromResponse: (response) => response.video.animethemeentries,
            type: "Video",
            baseInclude: INCLUDES.Video.entries,
        }),
    },
    Audio: {
        videos: createApiResolverNotNull<ApiAudioShow<"videos">>()({
            extractFromParent: (audio) => audio.videos,
            endpoint: (audio) => `/audio/${audio.basename}`,
            extractFromResponse: (response) => response.audio.videos,
            type: "Audio",
            baseInclude: INCLUDES.Audio.videos,
        }),
    },
    Series: {
        anime: createApiResolverNotNull<ApiSeriesShow<"anime">>()({
            extractFromParent: (series) => series.anime,
            endpoint: (series) => `/series/${series.slug}`,
            extractFromResponse: (response) => response.series.anime,
            type: "Series",
            baseInclude: INCLUDES.Series.anime,
        }),
    },
    Studio: {
        anime: createApiResolverNotNull<ApiStudioShow<"anime">>()({
            extractFromParent: (studio) => studio.anime,
            endpoint: (studio) => `/studio/${studio.slug}`,
            extractFromResponse: (response) => response.studio.anime,
            type: "Studio",
            baseInclude: INCLUDES.Studio.anime,
        }),
        resources: transformedResolver(
            createApiResolverNotNull<ApiStudioShow<"resources">>()({
                extractFromParent: (studio) => studio.resources,
                endpoint: (studio) => `/studio/${studio.slug}`,
                extractFromResponse: (response) => response.studio.resources,
                type: "Studio",
                baseInclude: INCLUDES.Studio.resources,
            }),
            (resources) => resources.map(({ studioresource, ...resource }) => ({ ...studioresource, ...resource })),
        ),
        images: createApiResolverNotNull<ApiStudioShow<"images">>()({
            extractFromParent: (studio) => studio.images,
            endpoint: (studio) => `/studio/${studio.slug}`,
            extractFromResponse: (response) => response.studio.images,
            type: "Studio",
            baseInclude: INCLUDES.Studio.images,
        }),
    },
    Performance: {
        artist: (performance) => performance.artist,
        song: (performance) => performance.song,
    },
    FeaturedTheme: {
        entry: createApiResolver<ApiFeaturedThemeShow<"animethemeentry">>()({
            extractFromParent: (featuredTheme) => featuredTheme.animethemeentry,
            endpoint: (featuredTheme) => `/featuredtheme/${featuredTheme.id}`,
            extractFromResponse: (response) => response.featuredtheme.animethemeentry,
            type: "FeaturedTheme",
            baseInclude: INCLUDES.FeaturedTheme.entry,
        }),
        video: createApiResolver<ApiFeaturedThemeShow<"video">>()({
            extractFromParent: (featuredTheme) => featuredTheme.video,
            endpoint: (featuredTheme) => `/featuredtheme/${featuredTheme.id}`,
            extractFromResponse: (response) => response.featuredtheme.video,
            type: "FeaturedTheme",
            baseInclude: INCLUDES.FeaturedTheme.video,
        }),
    },
    VideoOverlap: {
        NONE: "None",
        TRANSITION: "Transition",
        OVER: "Over",
    },
    Playlist: {
        tracks: transformedResolver(
            createApiResolverPaginated<ApiPlaylistTrackIndex>()({
                extractFromParent: (playlist) => playlist.tracks,
                endpoint: (playlist) => `/playlist/${playlist.id}/track`,
                extractFromResponse: (response) => response.tracks,
            }),
            (tracks, playlist) => tracks.map((track) => ({ ...track, playlist })),
        ),
        forward: transformedResolver(
            createApiResolverPaginated<ApiPlaylistTrackIndex>()({
                extractFromParent: (playlist) => playlist.tracks,
                endpoint: (playlist) => `/playlist/${playlist.id}/forward`,
                extractFromResponse: (response) => response.tracks,
            }),
            (tracks, playlist) => tracks.map((track) => ({ ...track, playlist })),
        ),
        user: createApiResolverNotNull<ApiPlaylistShow<"user">>()({
            extractFromParent: (playlist) => playlist.user,
            endpoint: (playlist) => `/playlist/${playlist.id}`,
            extractFromResponse: (response) => response.playlist.user,
            type: "Playlist",
            baseInclude: INCLUDES.Playlist.user,
        }),
    },
    PlaylistTrack: {
        entry: createApiResolverNotNull<ApiPlaylistTrackShow<"animethemeentry">>()({
            extractFromParent: (track) => track.animethemeentry,
            endpoint: (track) => `/playlist/${track.playlist.id}/track/${track.id}`,
            extractFromResponse: (response) => response.track.animethemeentry,
            type: "PlaylistTrack",
            baseInclude: INCLUDES.PlaylistTrack.entry,
        }),
        video: createApiResolverNotNull<ApiPlaylistTrackShow<"video">>()({
            extractFromParent: (track) => track.video,
            endpoint: (track) => `/playlist/${track.playlist.id}/track/${track.id}`,
            extractFromResponse: (response) => response.track.video,
            type: "PlaylistTrack",
            baseInclude: INCLUDES.PlaylistTrack.video,
        }),
    },
    ExternalProfile: {
        entries: createApiResolverNotNull<ApiExternalProfileShow<"externalentries">>()({
            extractFromParent: (externalProfile) => externalProfile.externalentries,
            endpoint: (externalProfile) => `/externalprofile/${externalProfile.id}`,
            extractFromResponse: (response) => response.externalprofile.externalentries,
            type: "ExternalProfile",
            baseInclude: INCLUDES.ExternalProfile.entries,
        }),
    },
    ExternalProfileEntry: {
        anime: createApiResolverNotNull<ApiExternalProfileEntryShow<"anime">>()({
            extractFromParent: (entry) => entry.anime,
            endpoint: (entry) => `/externalprofile/${entry.externalprofile.id}/externalentry/${entry.id}`,
            extractFromResponse: (response) => response.externalentry.anime,
            type: "ExternalProfileEntry",
            baseInclude: INCLUDES.ExternalProfileEntry.anime,
        }),
    },
    UserAuth: {
        roles: createApiResolverNotNull<ApiUserShow<"roles">>()({
            extractFromParent: (user) => user.roles,
            endpoint: () => `/me`,
            extractFromResponse: (response) => response.user.roles,
        }),
    },
};

export default resolvers;
