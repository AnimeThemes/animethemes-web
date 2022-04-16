const pLimit = require("p-limit");
const { parseResolveInfo } = require("graphql-parse-resolve-info");
const devLog = require("utils/devLog");

const limit = pLimit(5);

const API_BASE_URL = `${process.env.ANIMETHEMES_API_URL}/api`;

const INCLUDES = {
    Anime: {
        synonyms: "animesynonyms",
        themes: "animethemes",
        series: "series",
        studios: "studios",
        resources: "resources",
        images: "images"
    },
    Theme: {
        song: "song",
        anime: "anime",
        entries: "animethemeentries"
    },
    Artist: {
        performances: "songs",
        resources: "resources",
        images: "images",
        groups: "groups",
        members: "members"
    },
    Song: {
        themes: "animethemes",
        performances: "artists"
    },
    Entry: {
        videos: "videos",
        theme: "animetheme"
    },
    Video: {
        entries: "animethemeentries"
    },
    Series: {
        anime: "anime"
    },
    Studio: {
        anime: "anime",
        resources: "resources"
    },
    ResourceWithImages: {
        images: "images"
    },
    Performance: {
        song: "_",
        artist: "_"
    }
};

const ALLOWED_INCLUDES = {
    Anime: [
        "animesynonyms",
        "series",
        "animethemes.song.artists",
        "animethemes.song.artists.images",
        "images",
        "resources",
        "studios",
        "animethemes.animethemeentries.videos.animethemeentries.animetheme.anime",
        "animethemes.animethemeentries.videos.animethemeentries.animetheme.anime.images",
        "animethemes.animethemeentries.videos.animethemeentries.animetheme.animethemeentries.videos",
        "animethemes.animethemeentries.videos.animethemeentries.animetheme.song.artists"
    ],
    Theme: [
        "anime.images",
        "animethemeentries.videos",
        "song.artists"
    ],
    Artist: [
        "songs.animethemes.anime",
        "members",
        "groups",
        "resources",
        "images",
        "songs.artists",
        "songs.animethemes.song",
        "songs.animethemes.song.artists",
        "songs.animethemes.anime.images",
        "songs.animethemes.animethemeentries",
        "songs.animethemes.animethemeentries.videos"
    ],
    Series: [
        "anime",
        "anime.images",
        "anime.animethemes.animethemeentries.videos",
        "anime.animethemes.song"
    ],
    Studio: [
        "anime",
        "anime.images",
        "anime.animethemes.animethemeentries.videos",
        "anime.animethemes.song",
        "resources"
    ],
    Song: [
        "animethemes.anime",
        "artists"
    ],
    Video: [
        "animethemeentries.animetheme.anime"
    ]
};

module.exports = {
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
        counter: () => ({})
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
    Counter: {
        anime: () => 0,
        artist: () => 0,
        series: () => 0,
        studio: () => 0,
        video: () => 0,
        year: () => 0,
        season: () => 0,
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
    BracketCharacter: {
        theme: apiResolver({
            endpoint: (character) => `/animetheme/${character.theme}`,
            extractor: (result) => result.animetheme
        }),
    },
    AnimeListEntry: {
        anime: () => null,
    }
};

function apiResolver(config) {
    const {
        endpoint,
        field,
        extractor = (a) => a,
        transformer = (a) => a,
        pagination = false,
        type: defaultType = null,
        baseInclude = null
    } = config;

    return async (parent, args, context, info) => {
        if (field && parent[field] !== undefined) {
            return transformer(parent[field], parent, args);
        }

        const type = defaultType || info.returnType.name || info.returnType.ofType.name;
        const path = pathToString(info.path);

        if (info.path.prev) {
            devLog.warn(`Deep fetch at: ${path}`);
        }

        let url = `${API_BASE_URL}${endpoint(parent, args)}`;

        const includes = getIncludes(info, baseInclude);
        if (baseInclude) {
            includes.push(baseInclude);
        }
        const allowedIncludes = includes
            // Remove includes that are not allowed by the API
            .filter((include) => ALLOWED_INCLUDES[type]?.find((allowedInclude) => allowedInclude === include || allowedInclude.startsWith(include + ".")))
            // Remove includes which are already included with another include
            .filter((include, _, includes) => !includes.find((otherInclude) => otherInclude.startsWith(include + ".")))
            // Remove duplicates
            .filter((include, index, includes) => includes.lastIndexOf(include) === index);
        const disallowedIncludes = includes.filter((include) => !ALLOWED_INCLUDES[type]?.find((allowedInclude) => allowedInclude === include || allowedInclude.startsWith(include + ".")));

        if (disallowedIncludes.length) {
            devLog.warn(`Disallowed includes for ${url}:`);
            devLog.warn(disallowedIncludes);
            devLog.warn(`Or at least:`);
            devLog.warn(disallowedIncludes.filter((include, _, includes) => !includes.find((otherInclude) => otherInclude.startsWith(include + "."))));
        }

        if (allowedIncludes.length) {
            url += `${url.includes("?") ? "&" : "?"}include=${allowedIncludes.join()}`;
        }

        devLog.info(path + ": " + url);

        return await limit(() => (async () => {
            if (!pagination) {
                const json = await fetchJson(url);

                return transformer(extractor(json, parent, args), parent, args);
            } else {
                devLog.info(`Collecting: ${url}`);
                const results = [];
                let nextUrl = `${url}${url.includes("?") ? "&" : "?"}page[size]=100`;
                while (nextUrl) {
                    const json = await fetchJson(nextUrl);
                    results.push(...transformer(extractor(json, parent, args), parent, args));
                    devLog.info(`Collecting: ${url}, Got ${results.length}`);
                    nextUrl = json.links.next;
                }

                return results;
            }
        })());
    };
}

async function fetchJson(url) {
    const response = await fetch(url, {
        headers: {
            Authorization: `Bearer ${process.env.ANIMETHEMES_API_KEY}`
        }
    });
    if (!response.ok) {
        throw new Error(`API returned with non-ok status code: ${response.status} (${response.statusText})`);
    }
    return await response.json();
}

function pathToString(path) {
    let parts = [];
    for (let part = path; part; part = part.prev) {
        parts.push(part.key);
    }
    return parts.reverse().join(".");
}

function getIncludes(info, baseInclude = null) {
    const infoFragment = parseResolveInfo(info);
    return getIncludesRecursive(infoFragment, baseInclude ? (baseInclude + ".") : "");
}

function getIncludesRecursive(infoFragment, parent = "") {
    const includes = [];

    for (const [type, fields] of Object.entries(infoFragment.fieldsByTypeName)) {
        for (const [fieldName, field] of Object.entries(fields)) {
            if (INCLUDES[type]?.[fieldName]) {
                if (INCLUDES[type][fieldName] === "_") {
                    includes.push(...getIncludesRecursive(field, parent));
                } else {
                    const include = parent + INCLUDES[type][fieldName];
                    includes.push(include);
                    includes.push(...getIncludesRecursive(field, include + "."));
                }
            }
        }
    }

    return includes;
}
