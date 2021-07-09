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

    async function selectAllFrom(table, isPivot = false) {
        let sql = `SELECT * FROM ${table}`;

        if (!isPivot) {
            sql += " WHERE deleted_at IS NULL";
        } else {
            const [ a, b ] = table.split("_");
            sql += ` INNER JOIN ${a} ON (${table}.${a}_id = ${a}.${a}_id) INNER JOIN ${b} ON (${table}.${b}_id = ${b}.${b}_id) WHERE ${a}.deleted_at IS NULL AND ${b}.deleted_at IS NULL`;
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

    for (const synonym of await selectAllFrom("synonym")) {
        createNodeFromData({
            id: synonym.synonym_id,
            idRaw: synonym.synonym_id,
            text: synonym.text,
            anime: createNodeId(`Anime-${synonym.anime_id}`)
        }, "Synonym", helpers);
    }

    for (const theme of await selectAllFrom("theme")) {
        createNodeFromData({
            id: theme.theme_id,
            idRaw: theme.theme_id,
            slug: theme.slug,
            group: theme.group,
            song: createNodeId(`Song-${theme.song_id}`),
            anime: createNodeId(`Anime-${theme.anime_id}`)
        }, "Theme", helpers);
    }

    for (const entry of await selectAllFrom("entry")) {
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

    for (const video of await selectAllFrom("video")) {
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
            // tags: video.tags, TODO: Add tags algorithm
            entries: []
        }, "Video", helpers);
    }

    for (const song of await selectAllFrom("song")) {
        createNodeFromData({
            id: song.song_id,
            idRaw: song.song_id,
            title: song.title
        }, "Song", helpers);
    }

    for (const artist of await selectAllFrom("artist")) {
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

    for (const resource of await selectAllFrom("resource")) {
        createNodeFromData({
            id: resource.resource_id,
            idRaw: resource.resource_id,
            link: resource.link,
            site: resource.site
        }, "Resource", helpers);
    }

    for (const image of await selectAllFrom("image")) {
        createNodeFromData({
            id: image.image_id,
            idRaw: image.image_id,
            facet: image.facet
        }, "Image", helpers);
    }

    try {
        for (const announcement of await selectAllFrom("announcement")) {
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

    for (const performance of await selectAllFrom("artist_song", true)) {
        createNodeFromData({
            id: `${performance.song_id}-${performance.artist_id}`,
            song: createNodeId(`Song-${performance.song_id}`),
            artist: createNodeId(`Artist-${performance.artist_id}`),
            as: performance.as
        }, "Performance", helpers);
    }

    for (const animeSeries of await selectAllFrom("anime_series", true)) {
        createNodeFromData({
            id: `${animeSeries.anime_id}-${animeSeries.series_id}`,
            anime: createNodeId(`Anime-${animeSeries.anime_id}`),
            series: createNodeId(`Series-${animeSeries.series_id}`)
        }, "AnimeSeries", helpers);
    }

    for (const animeResource of await selectAllFrom("anime_resource", true)) {
        createNodeFromData({
            id: `${animeResource.anime_id}-${animeResource.resource_id}`,
            anime: createNodeId(`Anime-${animeResource.anime_id}`),
            resource: createNodeId(`Resource-${animeResource.resource_id}`)
        }, "AnimeResource", helpers);
    }

    for (const animeImage of await selectAllFrom("anime_image", true)) {
        createNodeFromData({
            id: `${animeImage.anime_id}-${animeImage.image_id}`,
            anime: createNodeId(`Anime-${animeImage.anime_id}`),
            image: createNodeId(`Image-${animeImage.image_id}`)
        }, "AnimeImage", helpers);
    }

    for (const artistResource of await selectAllFrom("artist_resource", true)) {
        createNodeFromData({
            id: `${artistResource.artist_id}-${artistResource.resource_id}`,
            artist: createNodeId(`Artist-${artistResource.artist_id}`),
            resource: createNodeId(`Resource-${artistResource.resource_id}`)
        }, "ArtistResource", helpers);
    }

    for (const artistImage of await selectAllFrom("artist_image", true)) {
        createNodeFromData({
            id: `${artistImage.artist_id}-${artistImage.image_id}`,
            artist: createNodeId(`Artist-${artistImage.artist_id}`),
            image: createNodeId(`Image-${artistImage.image_id}`)
        }, "ArtistImage", helpers);
    }

    for (const entryVideo of await selectAllFrom("entry_video", true)) {
        createNodeFromData({
            id: `${entryVideo.entry_id}-${entryVideo.video_id}`,
            entry: createNodeId(`Entry-${entryVideo.entry_id}`),
            video: createNodeId(`Video-${entryVideo.video_id}`)
        }, "EntryVideo", helpers);
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
