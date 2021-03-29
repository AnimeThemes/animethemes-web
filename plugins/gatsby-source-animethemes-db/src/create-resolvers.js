const { animeSeason, videoSource, imageFacet, resourceSite, videoOverlap } = require("./enums");

module.exports = ({ createResolvers }) => {
    createResolvers({
        Anime: {
            ...enumResolver({
                season: animeSeason
            }),
            ...pivotResolver({
                series: { type: "AnimeSeries", from: "anime", to: "series" },
                resources: { type: "AnimeResource", from: "anime", to: "resource" },
                images: { type: "AnimeImage", from: "anime", to: "image" }
            })
        },
        Artist: {
            ...pivotResolver({
                resources: { type: "ArtistResource", from: "artist", to: "resource" },
                images: { type: "ArtistImage", from: "artist", to: "image" }
            })
        },
        Entry: {
            ...pivotResolver({
                videos: { type: "EntryVideo", from: "entry", to: "video" }
            })
        },
        Image: {
            ...enumResolver({
                facet: imageFacet
            }),
            link: {
                resolve(source) {
                    return `https://staging.animethemes.moe/image/${source.idRaw}`;
                }
            }
        },
        Resource: {
            ...enumResolver({
                site: resourceSite
            })
        },
        Series: {
            ...pivotResolver({
                anime: { type: "AnimeSeries", from: "series", to: "anime" }
            })
        },
        Video: {
            ...enumResolver({
                overlap: videoOverlap,
                source: videoSource
            }),
            ...pivotResolver({
                entries: { type: "EntryVideo", from: "video", to: "entry" }
            }),
            tags: {
                resolve(source) {
                    const tags = [];

                    if (source.nc) {
                        tags.push("NC");
                    }
                    if (source.source === videoSource.get(2) || source.source === videoSource.get(3)) {
                        tags.push(videoSource.get(source.source));
                    }
                    if (source.resolution && source.resolution !== 720) {
                        tags.push(source.resolution);
                    }

                    if (source.subbed) {
                        tags.push("Subbed");
                    } else if (source.lyrics) {
                        tags.push("Lyrics");
                    }

                    return tags.join("");
                }
            },
            link: {
                resolve(source) {
                    return `https://v.animethemes.moe/${source.basename}`;
                }
            }
        }
    });
};

function enumResolver(propertyToEnumMap) {
    return Object.fromEntries(Object.entries(propertyToEnumMap).map(([ property, enumMap ]) => {
        return [
            property,
            {
                resolve(source) {
                    return enumMap.get(source[property]);
                }
            }
        ];
    }));
}

function pivotResolver(propertyToPivotConfig) {
    return Object.fromEntries(Object.entries(propertyToPivotConfig).map(([ property, pivotConfig ]) => {
        return [
            property,
            {
                resolve(source, args, context) {
                    return context.nodeModel.getAllNodes({ type: pivotConfig.type })
                        .filter((node) => node[pivotConfig.from] === source.id)
                        .map((node) => context.nodeModel.getNodeById({ id: node[pivotConfig.to] }));
                }
            }
        ];
    }));
}
