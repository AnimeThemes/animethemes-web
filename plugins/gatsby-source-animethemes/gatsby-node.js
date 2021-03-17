const { fetchAnimeList } = require("./src/anime");
const { fetchArtistList } = require("./src/artist");
const { fetchSeriesList } = require("./src/series");
const { fetchAnnouncements } = require("./src/announcement");

exports.onPreInit = ({ reporter }) => reporter.info("Loaded gatsby-source-animethemes");

exports.createSchemaCustomization = ({ actions }) => {
    const { createTypes } = actions;
    createTypes(`
        type Anime implements Node {
            id: ID!
            name: String!
            slug: String!
            year: Int!
            season: String
            synopsis: String
            synonyms: [String]
            # See custom resolver below (n-to-n relations cannot be resolved with @link)
            series: [Series]
            themes: [Theme] @link(by: "anime.id", from: "id")
            resources: [Resource]
            images: [Image]
        }
        
        type Theme implements Node {
            id: ID!
            slug: String!
            group: String
            song: Song! @link(by: "id")
            anime: Anime! @link(by: "id")
            entries: [Entry] @link(by: "theme.id", from: "id")
        }

        type Entry implements Node {
            id: ID!
            version: Int
            episodes: String
            nsfw: Boolean!
            spoiler: Boolean!
            theme: Theme! @link(by: "id")
            # See custom resolver below (n-to-n relations cannot be resolved with @link)
            videos: [Video]
        }
        
        type Video implements Node {
            id: ID!
            filename: String!
            basename: String!
            link: String!
            resolution: Int
            nc: Boolean!
            subbed: Boolean!
            lyrics: Boolean!
            uncen: Boolean!
            source: String
            overlap: String
            tags: String
            # See custom resolver below (n-to-n relations cannot be resolved with @link)
            entries: [Entry]
        }
        
        type Song implements Node {
            id: ID!
            title: String!
            theme: Theme! @link(by: "id")
            performances: [Performance] @link(by: "song.id", from: "id")
        }
        
        type Performance implements Node {
            id: ID!
            song: Song! @link(by: "id")
            artist: Artist! @link(by: "id")
            as: String
        }
        
        type Artist implements Node {
            id: ID!
            slug: String!
            name: String!
            performances: [Performance] @link(by: "artist.id", from: "id")
            resources: [Resource]
            images: [Image]
        }
        
        type Series implements Node {
            id: ID!
            slug: String!
            name: String!
            # See custom resolver below (n-to-n relations cannot be resolved with @link)
            anime: [Anime]
        }
        
        type Resource {
            link: String!
            site: String!
        }
        
        type Image {
            facet: String!
            link: String!
        }
        
        type Announcement implements Node {
            id: ID!
            content: String!
        }
    `);
};

exports.sourceNodes = async ({ actions, createNodeId, createContentDigest, reporter }) => {
    const helpers = {
        ...actions,
        createNodeId,
        createContentDigest
    };

    const animeList = await fetchAnimeList({ reporter });
    const videoAggregations = new Map();

    for (const anime of animeList) {
        createNodeFromData({
            id: anime.id,
            name: anime.name,
            slug: anime.slug,
            year: anime.year,
            season: anime.season,
            synopsis: anime.synopsis,
            synonyms: anime.synonyms.map((synonym) => synonym.text),
            series: anime.series.map((series) => createNodeId(`Series-${series.id}`)),
            themes: anime.themes.map((theme) => createNodeId(`Theme-${theme.id}`)),
            resources: anime.resources.map((resource) => ({
                link: resource.link,
                site: resource.site
            })),
            images: anime.images.map((image) => ({
                facet: image.facet,
                link: image.link
            }))
        }, "Anime", helpers);

        for (const theme of anime.themes) {
            const song = theme.song;

            createNodeFromData({
                id: theme.id,
                slug: theme.slug,
                group: theme.group,
                song: createNodeId(`Song-${song.id}`),
                anime: createNodeId(`Anime-${anime.id}`),
                entries: theme.entries.map((entry) => createNodeId(`Entry-${entry.id}`))
            }, "Theme", helpers);

            createNodeFromData({
                id: song.id,
                title: song.title,
                theme: createNodeId(`Theme-${theme.id}`),
                performances: song.artists.map((artist) => createNodeId(`Performance-${song.id}-${artist.id}`))
            }, "Song", helpers);

            for (const artist of song.artists) {
                createNodeFromData({
                    id: `${song.id}-${artist.id}`,
                    song: createNodeId(`Song-${song.id}`),
                    artist: createNodeId(`Artist-${artist.id}`),
                    as: artist.as
                }, "Performance", helpers);
            }

            for (const entry of theme.entries) {
                createNodeFromData({
                    id: entry.id,
                    version: entry.version || 1,
                    episodes: entry.episodes,
                    nsfw: entry.nsfw,
                    spoiler: entry.spoiler,
                    theme: createNodeId(`Theme-${theme.id}`),
                    videos: entry.videos.map((video) => createNodeId(`Video-${video.id}`))
                }, "Entry", helpers);

                for (const video of entry.videos) {
                    // To account for n-to-n relations, we need to aggregate the videos
                    let videoAggregation = videoAggregations.get(video.id);
                    if (!videoAggregation) {
                        videoAggregation = {
                            ...video,
                            entries: []
                        };
                        videoAggregations.set(videoAggregation.id, videoAggregation);
                    }
                    videoAggregation.entries.push(entry);
                }
            }
        }
    }

    for (const video of videoAggregations.values()) {
        createNodeFromData({
            id: video.id,
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
            tags: video.tags,
            entries: video.entries.map((entry) => createNodeId(`Entry-${entry.id}`))
        }, "Video", helpers);
    }

    const artistList = await fetchArtistList({ reporter });

    for (const artist of artistList) {
        createNodeFromData({
            id: artist.id,
            slug: artist.slug,
            name: artist.name,
            performances: artist.songs.map((song) => createNodeId(`Performance-${song.id}-${artist.id}`)),
            resources: artist.resources.map((resource) => ({
                link: resource.link,
                site: resource.site
            })),
            images: artist.images.map((image) => ({
                facet: image.facet,
                link: image.link
            }))
        }, "Artist", helpers);
    }

    const seriesList = await fetchSeriesList({ reporter });

    for (const series of seriesList) {
        createNodeFromData({
            id: series.id,
            slug: series.slug,
            name: series.name,
            anime: series.anime.map((anime) => createNodeId(`Anime-${anime.id}`))
        }, "Series", helpers);
    }

    const announcements = await fetchAnnouncements();

    for (const announcement of announcements) {
        createNodeFromData({
            id: announcement.id,
            content: announcement.content
        }, "Announcement", helpers);
    }
};

exports.createResolvers = ({ createResolvers }) => {
    createResolvers({
        Anime: {
            series: {
                resolve(source, args, context) {
                    return context.nodeModel.getNodesByIds({ ids: source.series, type: "Series" });
                }
            }
        },
        Series: {
            anime: {
                resolve(source, args, context) {
                    return context.nodeModel.getNodesByIds({ ids: source.anime, type: "Anime" });
                }
            }
        },
        Entry: {
            videos: {
                resolve(source, args, context) {
                    return context.nodeModel.getNodesByIds({ ids: source.videos, type: "Video" });
                }
            }
        },
        Video: {
            entries: {
                resolve(source, args, context) {
                    return context.nodeModel.getNodesByIds({ ids: source.entries, type: "Entry" });
                }
            }
        }
    });
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
