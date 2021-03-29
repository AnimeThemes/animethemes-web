const { fetchAnimeList } = require("./src/anime");
const { fetchSynonymList } = require("./src/synonym");
const { fetchThemeList } = require("./src/theme");
const { fetchEntryList } = require("./src/entry");
const { fetchVideoList } = require("./src/video");
const { fetchSongList } = require("./src/song");
const { fetchArtistList } = require("./src/artist");
const { fetchSeriesList } = require("./src/series");
const { fetchResourceList } = require("./src/resource");
const { fetchImageList } = require("./src/image");
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
            synonyms: [Synonym] @link(by: "anime.id", from: "id")
            themes: [Theme] @link(by: "anime.id", from: "id")
            
            # See custom resolver below (n-to-n relations cannot be resolved with @link)
            series: [Series]
            resources: [Resource]
            images: [Image]
        }
        
        type Synonym implements Node {
            id: ID!
            text: String!
            anime: Anime! @link(by: "id")
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
            themes: [Theme] @link(by: "song.id", from: "id")
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
            
            # See custom resolver below (n-to-n relations cannot be resolved with @link)
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
        
        type Resource implements Node {
            link: String!
            site: String!
            
            # See custom resolver below (n-to-n relations cannot be resolved with @link)
            anime: [Anime]
            artists: [Artist]
        }
        
        type Image implements Node {
            facet: String!
            link: String!
            
            # See custom resolver below (n-to-n relations cannot be resolved with @link)
            anime: [Anime]
            artists: [Artist]
        }
        
        type Announcement implements Node {
            id: ID!
            content: String!
        }
    `);
};

exports.sourceNodes = async ({ cache, actions, getNodes, createNodeId, createContentDigest, reporter }) => {
    const helpers = {
        ...actions,
        createNodeId,
        createContentDigest
    };

    // const lastFetched = await cache.get("last-fetched");
    //
    // getNodes().filter(isPluginNode).forEach((node) => helpers.touchNode(node));
    //
    // const now = new Date().toISOString().replace("Z", "000");

    const animeList = await fetchAnimeList({ reporter });
    const synonymList = await fetchSynonymList({ reporter });
    const themeList = await fetchThemeList({ reporter });
    const entryList = await fetchEntryList({ reporter });
    const videoList = await fetchVideoList({ reporter });
    const songList = await fetchSongList({ reporter });
    const artistList = await fetchArtistList({ reporter });
    const seriesList = await fetchSeriesList({ reporter });
    const resourceList = await fetchResourceList({ reporter });
    const imageList = await fetchImageList({ reporter });

    for (const anime of animeList) {
        createNodeFromData({
            id: anime.id,
            name: anime.name,
            slug: anime.slug,
            year: anime.year,
            season: anime.season,
            synopsis: anime.synopsis,
            series: anime.series.map((series) => createNodeId(`Series-${series.id}`)),
            themes: anime.themes.map((theme) => createNodeId(`Theme-${theme.id}`)),
            resources: anime.resources.map((resource) => createNodeId(`Resource-${resource.id}`)),
            images: anime.images.map((image) => createNodeId(`Image-${image.id}`))
        }, "Anime", helpers);
    }

    for (const synonym of synonymList) {
        createNodeFromData({
            id: synonym.id,
            text: synonym.text,
            anime: createNodeId(`Anime-${synonym.anime.id}`)
        }, "Synonym", helpers);
    }

    for (const theme of themeList) {
        createNodeFromData({
            id: theme.id,
            slug: theme.slug,
            group: theme.group,
            song: createNodeId(`Song-${theme.song.id}`),
            anime: createNodeId(`Anime-${theme.anime.id}`),
            entries: theme.entries.map((entry) => createNodeId(`Entry-${entry.id}`))
        }, "Theme", helpers);
    }

    for (const entry of entryList) {
        createNodeFromData({
            id: entry.id,
            version: entry.version || 1,
            episodes: entry.episodes,
            nsfw: entry.nsfw,
            spoiler: entry.spoiler,
            theme: createNodeId(`Theme-${entry.theme.id}`),
            videos: entry.videos.map((video) => createNodeId(`Video-${video.id}`))
        }, "Entry", helpers);
    }

    for (const video of videoList) {
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

    for (const song of songList) {
        createNodeFromData({
            id: song.id,
            title: song.title,
            themes: song.themes.map((theme) => createNodeId(`Theme-${theme.id}`)),
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
    }

    for (const artist of artistList) {
        createNodeFromData({
            id: artist.id,
            slug: artist.slug,
            name: artist.name,
            performances: artist.songs.map((song) => createNodeId(`Performance-${song.id}-${artist.id}`)),
            resources: artist.resources.map((resource) => createNodeId(`Resource-${resource.id}`)),
            images: artist.images.map((image) => createNodeId(`Image-${image.id}`))
        }, "Artist", helpers);
    }

    for (const series of seriesList) {
        createNodeFromData({
            id: series.id,
            slug: series.slug,
            name: series.name,
            anime: series.anime.map((anime) => createNodeId(`Anime-${anime.id}`))
        }, "Series", helpers);
    }

    for (const resource of resourceList) {
        createNodeFromData({
            id: resource.id,
            link: resource.link,
            site: resource.site,
            anime: resource.anime.map((anime) => createNodeId(`Anime-${anime.id}`)),
            artists: resource.artists.map((artist) => createNodeId(`Artist-${artist.id}`))
        }, "Resource", helpers);
    }

    for (const image of imageList) {
        createNodeFromData({
            id: image.id,
            facet: image.facet,
            link: image.link,
            anime: image.anime.map((anime) => createNodeId(`Anime-${anime.id}`)),
            artists: image.artists.map((artist) => createNodeId(`Artist-${artist.id}`))
        }, "Image", helpers);
    }

    const announcements = await fetchAnnouncements();

    for (const announcement of announcements) {
        createNodeFromData({
            id: announcement.id,
            content: announcement.content
        }, "Announcement", helpers);
    }

    // await cache.set("last-fetched", now);
};

exports.createResolvers = ({ createResolvers }) => {
    createResolvers({
        Anime: {
            series: {
                resolve(source, args, context) {
                    return context.nodeModel.getNodesByIds({ ids: source.series, type: "Series" });
                }
            },
            images: {
                resolve(source, args, context) {
                    return context.nodeModel.getAllNodes({ type: "Image" }).filter((node) => node.anime.includes(source.id));
                }
            },
            resources: {
                resolve(source, args, context) {
                    return context.nodeModel.getAllNodes({ type: "Resource" }).filter((node) => node.anime.includes(source.id));
                }
            }
        },
        Artist: {
            images: {
                resolve(source, args, context) {
                    return context.nodeModel.getAllNodes({ type: "Resource" }).filter((node) => node.artists.includes(source.id));
                }
            },
            resources: {
                resolve(source, args, context) {
                    return context.nodeModel.getAllNodes({ type: "Resource" }).filter((node) => node.artists.includes(source.id));
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

// function isPluginNode(node) {
//     return node.internal.owner === "gatsby-source-animethemes";
// }
