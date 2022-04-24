import { fetchData } from "lib/server";
import gql from "graphql-tag";
import createVideoSlug from "utils/createVideoSlug";

export default async function handler(req, res) {
    const { secret, id, resource, mode = "page" } = req.query;

    if (secret !== process.env.REVALIDATE_TOKEN) {
        return res.status(401).json({ message: "Invalid token." });
    }

    if (!id) {
        return res.status(400).json({ message: "Invalid id." });
    }

    const paths = [];

    if (mode === "page") {
        paths.push(id);
    } else if (mode === "resource") {
        if (resource === "anime") {
            paths.push(...await getAffectedPathsForAnime(id));
        } else {
            return res.status(400).json({ message: "Invalid resource." });
        }
    } else {
        return res.status(400).json({ message: "Invalid mode." });
    }

    for (const path of paths) {
        await res.unstable_revalidate(path);
    }

    return res.json({ revalidated: true, affectedPaths: paths });
}

async function getAffectedPathsForAnime(animeSlug) {
    const { data } = await fetchData(gql`
        ${createVideoSlug.fragments.theme}
        ${createVideoSlug.fragments.entry}
        ${createVideoSlug.fragments.video}
        
        query($animeSlug: String!) {
            anime(slug: $animeSlug) {
                year
                season
                series {
                    slug
                }
                studios {
                    slug
                }
                themes {
                    ...createVideoSlug_theme
                    song {
                        performances {
                            artist {
                                slug
                            }
                        }
                    }
                    entries {
                        ...createVideoSlug_entry
                        videos {
                            ...createVideoSlug_video
                        }
                    }
                }
            }
        }
    `, { animeSlug });

    return [
        `/anime/${animeSlug}`,
        `/year/${data.anime.year}`,
        `/year/${data.anime.year}/${data.anime.season}`,
        data.anime.series?.map((series) => `/series/${series.slug}`),
        data.anime.studio?.map((studio) => `/studio/${studio.slug}`),
        data.anime.themes?.flatMap((theme) => [
            theme.song.performances?.flatMap((performance) => `/artist/${performance.artist.slug}`),
            theme.entries?.flatMap((entry) => entry.videos?.map((video) => `/anime/${animeSlug}/${createVideoSlug(theme, entry, video)}`)),
        ].flat()),
    ].flat().filter((e) => e);
}
