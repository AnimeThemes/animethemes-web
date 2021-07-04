import createVideoSlug from "./src/utils/createVideoSlug";

const seasonOrder = [ "Winter", "Spring", "Summer", "Fall" ];

export async function createPages({ actions: { createPage }, graphql }) {
    const { data } = await graphql(`
        query {
            allAnime {
                nodes {
                    slug
                    themes {
                        # We can't use fragments in gatsby-node.js, 
                        # so this is mostly a copy of the fragment found in 
                        # createVideoSlug.fragment.js.
                        # (https://stackoverflow.com/a/49351248)
                        slug
                        entries {
                            id
                            version
                            videos {
                                id
                                tags
                            }
                        }
                    }
                }
                groupedByYear: group(field: year) {
                    year: fieldValue
                    nodes {
                        season
                    }
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
            allBracket {
                nodes {
                    slug
                }
            }
        }
    `);

    for (const { slug, themes } of data.allAnime.nodes) {
        createPage({
            path: `/anime/${slug}`,
            component: require.resolve("./src/templates/anime.js"),
            context: { slug }
        });

        for (const theme of themes) {
            for (const entry of theme.entries) {
                for (const video of entry.videos) {
                    const videoSlug = createVideoSlug(theme, entry, video);

                    createPage({
                        path: `/anime/${slug}/${videoSlug}`,
                        component: require.resolve("./src/templates/video.js"),
                        context: { id: video.id, entryId: entry.id }
                    });
                }
            }
        }
    }

    for (const { year, nodes } of data.allAnime.groupedByYear) {
        const yearNumeric = +year;

        // Get unique seasons
        const seasonList = nodes
            .map((node) => node.season)
            .filter((value, index, self) => self.indexOf(value) === index)
            .sort((a, b) => seasonOrder.indexOf(a) - seasonOrder.indexOf(b));

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

    for (const { slug } of data.allBracket.nodes) {
        createPage({
            path: `/bracket/${slug}`,
            component: require.resolve("./src/templates/bracket.js"),
            context: { slug }
        });
    }

    for (const entity of [ null, "anime", "theme", "artist" ]) {
        createPage({
            path: `/search${entity ? `/${entity}` : ``}`,
            component: require.resolve("./src/templates/search.js"),
            context: { entity }
        });
    }
}
