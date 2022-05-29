import { apiResolver, INCLUDES } from "./api";

const resolvers = {
    Query: {
        anime: apiResolver({
            endpoint: (_, { slug }) => `/anime/${slug}`,
            extractor: (result) => result.anime
        }),
        animeAll: apiResolver({
            endpoint: () => `/anime`,
            extractor: (result) => result.anime,
            pagination: true
        }),
        theme: apiResolver({
            endpoint: (_, { id }) => `/animetheme/${id}`,
            extractor: (result) => result.animetheme
        }),
        themeAll: apiResolver({
            endpoint: (_, { limit, orderBy, orderDesc }) => `/animetheme?sort=${orderDesc ? "-" : ""}${orderBy}&page[size]=${limit}`,
            extractor: (result) => result.animethemes
        }),
        artist: apiResolver({
            endpoint: (_, { slug }) => `/artist/${slug}`,
            extractor: (result) => result.artist
        }),
        artistAll: apiResolver({
            endpoint: () => `/artist`,
            extractor: (result) => result.artists,
            pagination: true
        }),
        series: apiResolver({
            endpoint: (_, { slug }) => `/series/${slug}`,
            extractor: (result) => result.series
        }),
        seriesAll: apiResolver({
            endpoint: () => `/series`,
            extractor: (result) => result.series,
            pagination: true
        }),
        studio: apiResolver({
            endpoint: (_, { slug }) => `/studio/${slug}`,
            extractor: (result) => result.studio
        }),
        studioAll: apiResolver({
            endpoint: () => `/studio`,
            extractor: (result) => result.studios,
            pagination: true
        }),
        year: (_, { value }) => ({ value }),
        yearAll: apiResolver({
            endpoint: () => `/animeyear`,
            transformer: (yearList) => yearList.map((year) => ({ value: year }))
        }),
        season: (_, { year, value }) => ({ value, year: { value: year } }),
        seasonAll: apiResolver({
            endpoint: (_, { year }) => `/animeyear/${year}`,
            extractor: (result) => Object.keys(result),
            transformer: (seasons, _, { year }) => seasons.map((season) => ({ value: season, year: { value: year } }))
        }),
        page: apiResolver({
            endpoint: (_, { slug }) => `/page/${slug}`,
            extractor: (result) => result.page
        }),
        pageAll: apiResolver({
            endpoint: () => `/page`,
            extractor: (result) => result.pages,
            pagination: true
        }),
        featuredTheme: apiResolver({
            endpoint: () => `/config/wiki`,
            extractor: (result) => result.wiki.featured_theme,
            transformer: (featuredTheme) => ({
                animetheme: {
                    ...featuredTheme.animethemeentry.animetheme,
                    animethemeentries: [
                        {
                            ...featuredTheme.animethemeentry,
                            videos: [
                                featuredTheme.video
                            ]
                        }
                    ]
                }
            })
        }),
    },
    Year: {
        seasons: apiResolver({
            endpoint: (year) => `/animeyear/${year.value}`,
            extractor: (result) => Object.keys(result),
            transformer: (seasons, year) => seasons.map((season) => ({ value: season, year }))
        }),
    },
    Season: {
        anime: apiResolver({
            endpoint: (season) => `/anime?filter[year]=${season.year.value}&filter[season]=${season.value}`,
            extractor: (result) => result.anime,
            pagination: true
        }),
    },
    Anime: {
        synonyms: apiResolver({
            endpoint: (anime) => `/anime/${anime.slug}`,
            field: "animesynonyms",
            extractor: (result) => result.anime.animesynonyms,
            type: "Anime",
            baseInclude: INCLUDES.Anime.synonyms
        }),
        themes: apiResolver({
            endpoint: (anime) => `/anime/${anime.slug}`,
            field: "animethemes",
            extractor: (result) => result.anime.animethemes,
            transformer: (themes, anime) => themes.map((theme) => ({ ...theme, anime })),
            type: "Anime",
            baseInclude: INCLUDES.Anime.themes
        }),
        series: apiResolver({
            endpoint: (anime) => `/anime/${anime.slug}`,
            field: "series",
            extractor: (result) => result.anime.series,
            type: "Anime",
            baseInclude: INCLUDES.Anime.series
        }),
        studios: apiResolver({
            endpoint: (anime) => `/anime/${anime.slug}`,
            field: "studios",
            extractor: (result) => result.anime.studios,
            type: "Anime",
            baseInclude: INCLUDES.Anime.studios
        }),
        resources: apiResolver({
            endpoint: (anime) => `/anime/${anime.slug}`,
            field: "resources",
            extractor: (result) => result.anime.resources,
            type: "Anime",
            baseInclude: INCLUDES.Anime.resources
        }),
        images: apiResolver({
            endpoint: (anime) => `/anime/${anime.slug}`,
            field: "images",
            extractor: (result) => result.anime.images,
            type: "Anime",
            baseInclude: INCLUDES.Anime.images
        }),
    },
    Theme: {
        sequence: (theme) => theme.sequence || 0,
        song: apiResolver({
            endpoint: (theme) => `/animetheme/${theme.id}`,
            field: "song",
            extractor: (result) => result.animetheme.song,
            type: "Theme",
            baseInclude: INCLUDES.Theme.song
        }),
        anime: apiResolver({
            endpoint: (theme) => `/animetheme/${theme.id}`,
            field: "anime",
            extractor: (result) => result.animetheme.anime,
            type: "Theme",
            baseInclude: INCLUDES.Theme.anime
        }),
        entries: apiResolver({
            endpoint: (theme) => `/animetheme/${theme.id}`,
            field: "animethemeentries",
            extractor: (result) => result.animetheme.animethemeentries,
            type: "Theme",
            baseInclude: INCLUDES.Theme.entries
        }),
    },
    Artist: {
        performances: apiResolver({
            endpoint: (artist) => `/artist/${artist.slug}`,
            field: "songs",
            extractor: (result) => result.artist.songs,
            transformer: (songs, artist) => songs.map(({ as, ...song }) => ({ as, song, artist })),
            type: "Artist",
            baseInclude: INCLUDES.Artist.performances
        }),
        resources: apiResolver({
            endpoint: (artist) => `/artist/${artist.slug}`,
            field: "resources",
            extractor: (result) => result.artist.resources,
            type: "Artist",
            baseInclude: INCLUDES.Artist.resources
        }),
        images: apiResolver({
            endpoint: (artist) => `/artist/${artist.slug}`,
            field: "images",
            extractor: (result) => result.artist.images,
            type: "Artist",
            baseInclude: INCLUDES.Artist.images
        }),
        groups: apiResolver({
            endpoint: (artist) => `/artist/${artist.slug}`,
            field: "groups",
            extractor: (result) => result.artist.groups,
            transformer: (groups, artist) => groups.map((group) => ({ group, member: artist })),
            type: "Artist",
            baseInclude: INCLUDES.Artist.groups
        }),
        members: apiResolver({
            endpoint: (artist) => `/artist/${artist.slug}`,
            field: "members",
            extractor: (result) => result.artist.members,
            transformer: (members, artist) => members.map((member) => ({ member, group: artist })),
            type: "Artist",
            baseInclude: INCLUDES.Artist.members
        }),
    },
    Song: {
        themes: apiResolver({
            endpoint: (song) => `/song/${song.id}`,
            field: "animethemes",
            extractor: (result) => result.song.animethemes,
            type: "Song",
            baseInclude: INCLUDES.Song.themes
        }),
        performances: apiResolver({
            endpoint: (song) => `/song/${song.id}`,
            field: "artists",
            extractor: (result) => result.song.artists,
            transformer: (artists, song) => artists.map(({ as, ...artist }) => ({ as, artist, song })),
            type: "Song",
            baseInclude: INCLUDES.Song.performances
        }),
    },
    Entry: {
        version: (entry) => entry.version || 1,
        videos: apiResolver({
            endpoint: (entry) => `/animethemeentry/${entry.id}`,
            field: "videos",
            extractor: (result) => result.animethemeentry.videos,
            type: "Entry",
            baseInclude: INCLUDES.Entry.videos
        }),
        theme: apiResolver({
            endpoint: (entry) => `/animethemeentry/${entry.id}`,
            field: "animetheme",
            extractor: (result) => result.animethemeentry.animetheme,
            type: "Entry",
            baseInclude: INCLUDES.Entry.theme
        }),
    },
    Video: {
        entries: apiResolver({
            endpoint: (video) => `/video/${video.basename}`,
            field: "animethemeentries",
            extractor: (result) => result.video.animethemeentries,
            type: "Video",
            baseInclude: INCLUDES.Video.entries
        }),
    },
    Series: {
        anime: apiResolver({
            endpoint: (series) => `/series/${series.slug}`,
            field: "anime",
            extractor: (result) => result.series.anime,
            type: "Series",
            baseInclude: INCLUDES.Series.anime
        }),
    },
    Studio: {
        anime: apiResolver({
            endpoint: (studio) => `/studio/${studio.slug}`,
            field: "anime",
            extractor: (result) => result.studio.anime,
            type: "Studio",
            baseInclude: INCLUDES.Studio.anime
        }),
        resources: apiResolver({
            endpoint: (studio) => `/studio/${studio.slug}`,
            field: "resources",
            extractor: (result) => result.studio.resources,
            type: "Studio",
            baseInclude: INCLUDES.Studio.resources
        }),
    },
    Performance: {
        artist: apiResolver({
            field: "artist"
        }),
        song: apiResolver({
            field: "song"
        }),
    },
    FeaturedTheme: {
        theme: apiResolver({
            endpoint: (featuredTheme) => `/animetheme/${featuredTheme.animetheme.id}`,
            field: "animetheme",
            extractor: (result) => result.animetheme
        }),
    }
};

export default resolvers;
