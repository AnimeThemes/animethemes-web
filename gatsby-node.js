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

    for (const { filename, basename } of data.allVideo.nodes) {
        createPage({
            path: `/video/${filename}`,
            component: require.resolve("./src/templates/video.js"),
            context: { filename, basename }
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
};
