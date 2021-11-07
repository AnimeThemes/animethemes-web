const mysql = require("mysql2");

module.exports = async ({ actions, createNodeId, createContentDigest, reporter }) => {
    const helpers = {
        ...actions,
        createNodeId,
        createContentDigest
    };

    // TODO: Implement incremental data fetching when pivots have timestamps
    // const lastFetched = await cache.get("last-fetched");

    // getNodes().filter(isPluginNode).forEach((node) => helpers.touchNode(node));

    // const now = new Date();

    const connection = mysql.createConnection({
        host: process.env.DB_HOST || "127.0.0.1",
        port: process.env.DB_PORT || 3306,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE || "animethemes"
    });

    async function query(sql) {
        reporter.info(`Executing query: ${sql}`);
        return new Promise((resolve, reject) => connection.query(sql, (error, results) => {
            if (error) {
                return reject(error);
            }
            reporter.info(`Got ${results.length} results`);
            resolve(results);
        }));
    }

    async function selectAllFrom(table, isPivot = false, tableToA, columnFromA, columnToA, tableToB, columnFromB, columnToB) {
        let sql = `SELECT ${table}.* FROM ${table}`;

        if (!isPivot) {
            sql += " WHERE deleted_at IS NULL";
        } else {
            sql += ` INNER JOIN ${tableToA} AS a ON (${table}.${columnFromA} = a.${columnToA})
                     INNER JOIN ${tableToB} AS b ON (${table}.${columnFromB} = b.${columnToB}) 
                     WHERE a.deleted_at IS NULL AND b.deleted_at IS NULL`;
        }

        return await query(sql);
    }

    for (const anime of await selectAllFrom("anime")) {
        createNodeFromData({
            id: anime.anime_id,
            idRaw: anime.anime_id,
            name: anime.name,
            slug: anime.slug,
            year: anime.year,
            season: anime.season,
            synopsis: anime.synopsis,
            resources: [],
            images: []
        }, "Anime", helpers);
    }

    for (const synonym of await selectAllFrom("anime_synonyms")) {
        createNodeFromData({
            id: synonym.synonym_id,
            idRaw: synonym.synonym_id,
            text: synonym.text,
            anime: createNodeId(`Anime-${synonym.anime_id}`)
        }, "Synonym", helpers);
    }

    for (const theme of await selectAllFrom("anime_themes")) {
        createNodeFromData({
            id: theme.theme_id,
            idRaw: theme.theme_id,
            slug: theme.slug,
            type: theme.type,
            sequence: theme.sequence || 0,
            group: theme.group,
            song: createNodeId(`Song-${theme.song_id}`),
            anime: createNodeId(`Anime-${theme.anime_id}`)
        }, "Theme", helpers);
    }

    for (const entry of await selectAllFrom("anime_theme_entries")) {
        createNodeFromData({
            id: entry.entry_id,
            idRaw: entry.entry_id,
            version: entry.version || 1,
            episodes: entry.episodes,
            nsfw: entry.nsfw,
            spoiler: entry.spoiler,
            theme: createNodeId(`Theme-${entry.theme_id}`),
            videos: []
        }, "Entry", helpers);
    }

    for (const video of await selectAllFrom("videos")) {
        createNodeFromData({
            id: video.video_id,
            idRaw: video.video_id,
            filename: video.filename,
            basename: video.basename,
            link: video.link,
            resolution: video.resolution,
            nc: video.nc,
            subbed: video.subbed,
            lyrics: video.lyrics,
            uncen: video.uncen,
            source: video.source,
            overlap: video.overlap,
            entries: []
        }, "Video", helpers);
    }

    for (const song of await selectAllFrom("songs")) {
        createNodeFromData({
            id: song.song_id,
            idRaw: song.song_id,
            title: song.title
        }, "Song", helpers);
    }

    for (const artist of await selectAllFrom("artists")) {
        createNodeFromData({
            id: artist.artist_id,
            idRaw: artist.artist_id,
            slug: artist.slug,
            name: artist.name,
            resources: [],
            images: []
        }, "Artist", helpers);
    }

    for (const series of await selectAllFrom("series")) {
        createNodeFromData({
            id: series.series_id,
            idRaw: series.series_id,
            slug: series.slug,
            name: series.name
        }, "Series", helpers);
    }

    for (const resource of await selectAllFrom("resources")) {
        createNodeFromData({
            id: resource.resource_id,
            idRaw: resource.resource_id,
            link: resource.link,
            site: resource.site
        }, "Resource", helpers);
    }

    for (const image of await selectAllFrom("images")) {
        createNodeFromData({
            id: image.image_id,
            idRaw: image.image_id,
            facet: image.facet
        }, "Image", helpers);
    }

    for (const studio of await selectAllFrom("studios")) {
        createNodeFromData({
            id: studio.studio_id,
            idRaw: studio.studio_id,
            slug: studio.slug,
            name: studio.name
        }, "Studio", helpers);
    }

    try {
        for (const announcement of await selectAllFrom("announcements")) {
            createNodeFromData({
                id: announcement.announcement_id,
                idRaw: announcement.announcement_id,
                content: announcement.content
            }, "Announcement", helpers);
        }
    } catch (e) {
        reporter.warn("Error while getting announcements. This should only happen on GitHub pages.");
    }

    // Pivot types

    for (const performance of await selectAllFrom(
        "artist_song", true,
        "artists", "artist_id", "artist_id",
        "songs", "song_id", "song_id"
    )) {
        createNodeFromData({
            id: `${performance.song_id}-${performance.artist_id}`,
            song: createNodeId(`Song-${performance.song_id}`),
            artist: createNodeId(`Artist-${performance.artist_id}`),
            as: performance.as
        }, "Performance", helpers);
    }

    for (const artistMember of await selectAllFrom(
        "artist_member", true,
        "artists", "artist_id", "artist_id",
        "artists", "member_id", "artist_id",
    )) {
        createNodeFromData({
            id: `${artistMember.artist_id}-${artistMember.member_id}`,
            group: createNodeId(`Artist-${artistMember.artist_id}`),
            member: createNodeId(`Artist-${artistMember.member_id}`),
            as: artistMember.as
        }, "ArtistMembership", helpers);
    }

    for (const animeSeries of await selectAllFrom(
        "anime_series", true,
        "anime", "anime_id", "anime_id",
        "series", "series_id", "series_id"
    )) {
        createNodeFromData({
            id: `${animeSeries.anime_id}-${animeSeries.series_id}`,
            anime: createNodeId(`Anime-${animeSeries.anime_id}`),
            series: createNodeId(`Series-${animeSeries.series_id}`)
        }, "AnimeSeries", helpers);
    }

    for (const animeResource of await selectAllFrom(
        "anime_resource", true,
        "anime", "anime_id", "anime_id",
        "resources", "resource_id", "resource_id"
    )) {
        createNodeFromData({
            id: `${animeResource.anime_id}-${animeResource.resource_id}`,
            anime: createNodeId(`Anime-${animeResource.anime_id}`),
            resource: createNodeId(`Resource-${animeResource.resource_id}`)
        }, "AnimeResource", helpers);
    }

    for (const animeImage of await selectAllFrom(
        "anime_image", true,
        "anime", "anime_id", "anime_id",
        "images", "image_id", "image_id"
    )) {
        createNodeFromData({
            id: `${animeImage.anime_id}-${animeImage.image_id}`,
            anime: createNodeId(`Anime-${animeImage.anime_id}`),
            image: createNodeId(`Image-${animeImage.image_id}`)
        }, "AnimeImage", helpers);
    }

    for (const artistResource of await selectAllFrom(
        "artist_resource", true,
        "artists", "artist_id", "artist_id",
        "resources", "resource_id", "resource_id"
    )) {
        createNodeFromData({
            id: `${artistResource.artist_id}-${artistResource.resource_id}`,
            artist: createNodeId(`Artist-${artistResource.artist_id}`),
            resource: createNodeId(`Resource-${artistResource.resource_id}`)
        }, "ArtistResource", helpers);
    }

    for (const artistImage of await selectAllFrom(
        "artist_image", true,
        "artists", "artist_id", "artist_id",
        "images", "image_id", "image_id"
    )) {
        createNodeFromData({
            id: `${artistImage.artist_id}-${artistImage.image_id}`,
            artist: createNodeId(`Artist-${artistImage.artist_id}`),
            image: createNodeId(`Image-${artistImage.image_id}`)
        }, "ArtistImage", helpers);
    }

    for (const entryVideo of await selectAllFrom(
        "anime_theme_entry_video", true,
        "anime_theme_entries", "entry_id", "entry_id",
        "videos", "video_id", "video_id"
    )) {
        createNodeFromData({
            id: `${entryVideo.entry_id}-${entryVideo.video_id}`,
            entry: createNodeId(`Entry-${entryVideo.entry_id}`),
            video: createNodeId(`Video-${entryVideo.video_id}`)
        }, "EntryVideo", helpers);
    }

    for (const animeStudio of await selectAllFrom(
        "anime_studio", true,
        "anime", "anime_id", "anime_id",
        "studios", "studio_id", "studio_id"
    )) {
        createNodeFromData({
            id: `${animeStudio.anime_id}-${animeStudio.studio_id}`,
            anime: createNodeId(`Anime-${animeStudio.anime_id}`),
            studio: createNodeId(`Studio-${animeStudio.studio_id}`)
        }, "AnimeStudio", helpers);
    }

    // await cache.set("last-fetched", now);
};

function createNodeFromData(item, nodeType, helpers) {
    const node = {
        ...item,
        id: helpers.createNodeId(`${nodeType}-${item.id}`),
        parent: null,
        children: [],
        internal: {
            type: nodeType,
            content: JSON.stringify(item),
            contentDigest: helpers.createContentDigest(item)
        }
    };

    helpers.createNode(node)

    return node;
}

// function isPluginNode(node) {
//     return node.internal.owner === "gatsby-source-animethemes";
// }
