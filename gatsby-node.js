// const {fetchAnimeList} = require("./src/api/animeThemes/anime");
// const {fetchArtistList} = require("./src/api/animeThemes/artist");
// const {fetchAnnouncements} = require("./src/api/animeThemes/announcement");
// const seasonOrder = [ "winter", "spring", "summer", "fall" ];

exports.createPages = async ({ actions: { createPage }, graphql }) => {
    const { data } = await graphql(`
        query {
            allAnime {
                nodes {
                    slug   
                }
                groupedByYear: group(field: year) {
                    year: fieldValue
                    nodes {
                        season
                    }
                }
            }
            allVideo {
                nodes {
                    filename
                }
            }
            allSeries {
                nodes {
                    slug
                }
            }
            allArtist {
                nodes {
                    slug
                }
            }
        }
    `);

    for (const { slug } of data.allAnime.nodes) {
        createPage({
            path: `/anime/${slug}`,
            component: require.resolve("./src/templates/anime.js"),
            context: { slug }
        });
    }

    for (const { filename } of data.allVideo.nodes) {
        createPage({
            path: `/video/${filename}`,
            component: require.resolve("./src/templates/video.js"),
            context: { filename }
        });
    }

    for (const { year, nodes } of data.allAnime.groupedByYear) {
        const yearNumeric = +year;

        // Get unique seasons
        const seasonList = nodes.map((node) => node.season).filter((value, index, self) => self.indexOf(value) === index);

        createPage({
            path: `/year/${year}`,
            component: require.resolve("./src/templates/year.js"),
            context: { year: yearNumeric, seasonList }
        });

        for (const season of seasonList) {
            createPage({
                path: `/year/${year}/${season.toLowerCase()}`,
                component: require.resolve("./src/templates/season.js"),
                context: { year: yearNumeric, season, seasonList }
            });
        }
    }

    for (const { slug } of data.allSeries.nodes) {
        createPage({
            path: `/series/${slug}`,
            component: require.resolve("./src/templates/series.js"),
            context: { slug }
        });
    }

    for (const { slug } of data.allArtist.nodes) {
        createPage({
            path: `/artist/${slug}`,
            component: require.resolve("./src/templates/artist.js"),
            context: { slug }
        });
    }

//     // Anime pages
//     animeList.forEach((anime) => {
//         createPage({
//             path: `/anime/${anime.slug}`,
//             component: require.resolve("./src/templates/anime.js"),
//             context: { anime },
//         });
//
//         // Video pages
//         anime.themes.forEach((theme) => theme.entries.forEach((entry) => entry.videos.forEach((video) => {
//             createPage({
//                 path: `/video/${video.filename}`,
//                 component: require.resolve("./src/templates/video.js"),
//                 context: {
//                     video,
//                     anime,
//                     entry,
//                     theme,
//                     layoutContext: {
//                         video: {
//                             ...video,
//                             entry: {
//                                 ...entry,
//                                 theme: {
//                                     ...theme,
//                                     anime
//                                 }
//                             }
//                         }
//                     }
//                 }
//             });
//         })));
//     });
//
//     // Year pages
//     createPage({
//         path: "/year",
//         component: require.resolve("./src/templates/year.js"),
//         context: { yearList }
//     });
//     Object.entries(animeByYear).forEach(([year, seasons]) => {
//         const seasonList = Object.keys(seasons).sort((a, b) => seasonOrder.indexOf(a) - seasonOrder.indexOf(b));
//         createPage({
//             path: `/year/${year}`,
//             component: require.resolve("./src/templates/season.js"),
//             context: { animeList: seasons, year, yearList, seasonList },
//         });
//         Object.entries(seasons).forEach(([season, animeList]) => {
//             createPage({
//                 path: `/year/${year}/${season}`,
//                 component: require.resolve("./src/templates/season.js"),
//                 context: { animeList, year, season, yearList, seasonList },
//             });
//         })
//     });
};
